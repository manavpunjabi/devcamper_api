const crypto = require("crypto");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const asyncHandler = require("../middleware/async");

// @desc    Register User
// @route   POST /api/v1/auth/register
// @acccess Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  //   Create User
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  // Using 'user' and not 'User' as it needs to pertain to the particular user and not the model
  sendTokenResponse(user, 200, res);
});

// @desc    Login User
// @route   POST /api/v1/auth/login
// @acccess Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //   Validation
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }
  //   Check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }
  //   Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // Using 'user' and not 'User' as it needs to pertain to the particular user and not the model
  sendTokenResponse(user, 200, res);
  //   isko hi break-up karke method banaya hai
  // user object to call method, status code and res object
  // const token=user.getSignedJWTToken();
  //res.status(200).json({ success: true, token });
});

// @desc    Logout / Clear Cookie
// @route   GET /api/v1/auth/logout
// @acccess Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ success: true, data: {} });
});

// @desc    Get current logged in user
// @route   POST /api/v1/auth/me
// @acccess Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, data: user });
});

// @desc    Update user details
// @route   PUT /api/v1/auth/updatedetails
// @acccess Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  // making separate object with details to be updated otherwise user can update password/roles
  // using this, this route will only allow updating name and email
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
  };
  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: user });
});

// @desc    Update password
// @route   PUT /api/v1/auth/updatepassword
// @acccess Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  if (req.body.currentPassword === req.body.newPassword) {
    return next(
      new ErrorResponse("Old password and new password cannot be the same", 400)
    );
  }
  const user = await User.findById(req.user.id).select("+password");
  // Check old password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse("Password is incorrect", 401));
  }
  // If old password matches, set new password
  user.password = req.body.newPassword;
  await user.save();
  sendTokenResponse(user, 200, res);
});

// @desc   Forogt Password
// @route   POST /api/v1/auth/forgotpassword
// @acccess Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }
  // Get reset token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/resetpassword/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has requested the reset of your account password. Please make a PUT request to :\n\n ${resetURL}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password reset token",
      message,
    });
    res.status(200).json({ success: true, data: "Email sent" });
  } catch (err) {
    console.error(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorResponse("Error in sending email", 500));
  }

  //res.status(200).json({ success: true, data: user });
});

// @desc    Reset password
// @route   PUT /api/v1/auth/resetpassword/:resettoken
// @acccess Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ErrorResponse("Invalid token", 400));
  }

  // Set new password if token is valid
  // undefined= no value=empty
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  // same as login/register
  sendTokenResponse(user, 200, res);
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJWTToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};
