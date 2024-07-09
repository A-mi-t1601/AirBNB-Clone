const express = require("express");
const router = express.Router();
const WrapAsync = require("../Utils/WrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../Middleware.js");
const listingController = require("../Controllers/Listing.js");

//Index Route
router.get("/", WrapAsync(listingController.index));

//New Route
router.get("/New", isLoggedIn, listingController.renderNewForm);

//Show Route
router.get("/:id", WrapAsync(listingController.showListing));

//Create Route
router.post(
  "/",
  isLoggedIn,
  validateListing,
  WrapAsync(listingController.createListing)
);

//Edit Route
router.get(
  "/:id/Edit",
  isLoggedIn,
  isOwner,
  WrapAsync(listingController.renderEditForm)
);

//Update Route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  WrapAsync(listingController.updateListing)
);

//Delete Route
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  WrapAsync(listingController.deleteListing)
);

module.exports = router;
