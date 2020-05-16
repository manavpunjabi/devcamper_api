const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
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
