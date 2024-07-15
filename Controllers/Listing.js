const Listing = require("../Models/Listing.js");

//Index Route
module.exports.index = async (req, res) => {
  const allListing = await Listing.find({});
  res.render("./Listing/Index.ejs", { allListing });
};

//New Route
module.exports.renderNewForm = (req, res) => {
  res.render("Listing/New.ejs");
};

//Show Route
module.exports.showListing = async (req, res) => {
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
};

//Create Route
module.exports.createListing = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  await newListing.save();
  req.flash("Success", "New Listing Created!");
  res.redirect("/Listing");
};

//Edit Route
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("Error", "Listing Doesn't Exist!");
    res.redirect("/Listing");
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/Upload", "/Upload/w_250");
  res.render("Listing/Edit.ejs", { listing, originalImageUrl });
};

//Update Route
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("Success", "Listing Updated!");
  res.redirect(`/Listing/${id}`);
};

//Delete Route
module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("Success", "Listing Deleted!");
  res.redirect("/Listing");
};