const express = require("express");
const router = express.Router();
const WrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  // Index Route
  .get(WrapAsync(listingController.index))
  // Create Route
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    WrapAsync(listingController.createListing)
  );

// New Route
router.get("/New", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  // Show Route
  .get(WrapAsync(listingController.showListing))
  // Update Route
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    WrapAsync(listingController.updateListing)
  )
  // Delete Route
  .delete(isLoggedIn, isOwner, WrapAsync(listingController.deleteListing));

// Edit Route
router.get(
  "/:id/Edit",
  isLoggedIn,
  isOwner,
  WrapAsync(listingController.renderEditForm)
);

module.exports = router;
