const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

// Create Route
module.exports.createReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  listing.review.push(newReview);
  await newReview.save();
  await listing.save();
  req.flash("Success", "New Review Created!");
  res.redirect(`/Listing/${listing._id}`);
};

// Delete Route
module.exports.deleteReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { review: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("Success", "Review Deleted!");
  res.redirect(`/Listing/${id}`);
};
