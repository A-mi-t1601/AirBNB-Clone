const express = require("express");
const router = express.Router();
const Listing = require("../Models/Listing.js");
const WrapAsync = require("../Utils/WrapAsync.js");
const ExpressError = require("../Utils/ExpressError.js");
const { ListingSchema } = require("../Schema.js");

//Validate Listing Server Side
const validateListing = (req, res, next) => {
  let { error } = ListingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//Index Route
router.get(
  "/",
  WrapAsync(async (req, res) => {
    const allListing = await Listing.find({});
    res.render("./Listing/Index.ejs", { allListing });
  })
);

//New Route
router.get("/New", (req, res) => {
  res.render("Listing/New.ejs");
});

//Show Route
router.get(
  "/:id",
  WrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("review");
    res.render("Listing/Show.ejs", { listing });
  })
);

//Create Route
router.post(
  "/",
  validateListing,
  WrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/Listing");
  })
);

//Edit Route
router.get(
  "/:id/Edit",
  WrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("Listing/Edit.ejs", { listing });
  })
);

//Update Route
router.put(
  "/:id",
  validateListing,
  WrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/Listing/${id}`);
  })
);

//Delete Route
router.delete(
  "/:id",
  WrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/Listing");
  })
);

module.exports = router;
