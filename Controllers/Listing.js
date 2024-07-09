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
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
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
  res.render("Listing/Edit.ejs", { listing });
};

//Update Route
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
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
