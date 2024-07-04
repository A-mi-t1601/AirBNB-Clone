const express = require("express");
const router = express.Router({ mergeParams: true });
const WrapAsync = require("../Utils/WrapAsync.js");
const ExpressError = require("../Utils/ExpressError.js");
const { reviewSchema } = require("../Schema.js");
const Review = require("../Models/Review.js");
const Listing = require("../Models/Listing.js");

//Validate Review Server Side
const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//POST Review Route
router.post(
  "/",
  validateReview,
  WrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    listing.review.push(newReview);
    await newReview.save();
    await listing.save();
    res.redirect(`/Listing/${listing._id}`);
  })
);

//Delete Review Route
router.delete(
  "/:reviewId",
  WrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { review: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/Listing/${id}`);
  })
);

module.exports = router;
