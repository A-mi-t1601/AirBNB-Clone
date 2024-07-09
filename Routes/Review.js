const express = require("express");
const router = express.Router({ mergeParams: true });
const WrapAsync = require("../Utils/WrapAsync.js");
const Review = require("../Models/Review.js");
const Listing = require("../Models/Listing.js");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../Middleware.js");

//POST Review Route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  WrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.review.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("Success", "New Review Created!");
    res.redirect(`/Listing/${listing._id}`);
  })
);

//Delete Review Route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  WrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { review: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("Success", "Review Deleted!");
    res.redirect(`/Listing/${id}`);
  })
);

module.exports = router;
