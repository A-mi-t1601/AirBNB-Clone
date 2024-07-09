const express = require("express");
const router = express.Router({ mergeParams: true });
const WrapAsync = require("../Utils/WrapAsync.js");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../Middleware.js");
const reviewController = require("../Controllers/Review.js");

//Create Route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  WrapAsync(reviewController.createReview)
);

//Delete Route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  WrapAsync(reviewController.deleteReview)
);

module.exports = router;
