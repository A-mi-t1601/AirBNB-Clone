const express = require("express");
const router = express.Router();
const Listing = require("../Models/Listing.js");
const WrapAsync = require("../Utils/WrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../Middleware.js");

//Index Route
router.get(
  "/",
  WrapAsync(async (req, res) => {
    const allListing = await Listing.find({});
    res.render("./Listing/Index.ejs", { allListing });
  })
);

//New Route
router.get("/New", isLoggedIn, (req, res) => {
  res.render("Listing/New.ejs");
});

//Show Route
router.get(
  "/:id",
  WrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
      .populate({
        path: "review",
        populate: {
          path: "author",
        },
      })
      .populate("owner");
    if (!listing) {
      req.flash("Error", "Listing Doesn't Exist!");
      res.redirect("/Listing");
    }
    console.log(listing);
    res.render("Listing/Show.ejs", { listing });
  })
);

//Create Route
router.post(
  "/",
  isLoggedIn,
  validateListing,
  WrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("Success", "New Listing Created!");
    res.redirect("/Listing");
  })
);

//Edit Route
router.get(
  "/:id/Edit",
  isLoggedIn,
  isOwner,
  WrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("Error", "Listing Doesn't Exist!");
      res.redirect("/Listing");
    }
    res.render("Listing/Edit.ejs", { listing });
  })
);

//Update Route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  WrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("Success", "Listing Updated!");
    res.redirect(`/Listing/${id}`);
  })
);

//Delete Route
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  WrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("Success", "Listing Deleted!");
    res.redirect("/Listing");
  })
);

module.exports = router;
