const ErrorResponse = require("../utils/errorResponse");
const Bootcamp = require("../models/Bootcamp");
const geocoder = require("../utils/geocoder");
const asyncHandler = require("../middleware/async");
const path = require("path");

// @desc    Get all Bootcamps
// @route   GET /api/v1/bootcamps
// @acccess Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query;
  // Making copy of req.query
  const reqQuery = {
    ...req.query,
  };
  // Excluding fielding
  const removeFields = ["select", "sort", "page", "limit"];
  // Loop through removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  console.log(reqQuery);

  // Creating query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt,$lte, etc)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );
  // Finding resource
  query = Bootcamp.find(JSON.parse(queryStr)).populate("courses");

  // SELECT Fields

  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 5;

  const startIndex = (page - 1) * limit;

  const endIndex = page * limit;
  const total = await Bootcamp.countDocuments();
  query = query.skip(startIndex).limit(limit);

  // Executing query
  const bootcamps = await query;
  // Pagination result
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }
  res.status(200).json({
    success: true,
    count: bootcamps.length,
    pagination,
    data: bootcamps,
  });
});

// @desc    Get single Bootcamp
// @route   GET /api/v1/bootcamps/:id
// @acccess Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: bootcamp });
});

// @desc    Create new Bootcamp
// @route   POST /api/v1/bootcamps
// @acccess Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});

// @desc    Update Bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @acccess Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: bootcamp });
});

// @desc    Delete Bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @acccess Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  // using remove instead of findbyidanddelete to trigger remove middle (pre) to also delete courses of respective bootcamp
  bootcamp.remove();
  res.status(200).json({ success: true, data: {} });
});

// @desc    Get bootcamps within a radius
// @route   GET /api/v1/bootcamps/radius/:zipcode/:distance
// @acccess Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;
  // Get lat and lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calculate radius(using radians)
  // Divide dist by radius of earth
  // Earth Radius=6378 kms
  const radius = distance / 6378;
  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });
  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
});

// @desc    Upload image for bootcamp
// @route   PUT /api/v1/bootcamps/:id/image
// @acccess Private
exports.bootcampImageUpload = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Verifying image type
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image`, 404));
  }
  // Check file size
  if (file.size > process.env.MAX_FILE_UPLOAD_SIZE) {
    return next(
      new ErrorResponse(
        `Images cannot be larger than ${process.env.MAX_FILE_UPLOAD_SIZE} `,
        404
      )
    );
  }
  // Renaming file
  file.name = `image_${bootcamp._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Error uploading image`, 500));
    }
    await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });
    res.status(200).json({ success: true, data: file.name });
  });
});
