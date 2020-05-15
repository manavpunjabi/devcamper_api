const express = require("express");
const {
  getBootcamp,
  getBootcamps,
  getBootcampsInRadius,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  bootcampImageUpload,
} = require("../controllers/bootcamps");

// include other resource routers
const courseRouter = require("./courses");

const router = express.Router();

// Re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter);

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

router.route("/:id/image").put(bootcampImageUpload);

router.route("/").get(getBootcamps).post(createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
