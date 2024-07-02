const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./Models/Listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const WrapAsync = require("./Utils/WrapAsync.js");
const ExpressError = require("./Utils/ExpressError.js");
const { ListingSchema } = require("./Schema.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("View engine", "ejs");
app.set("Views", path.join(__dirname, "Views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/Public")));

app.get("/", (req, res) => {
  res.send("Hi, I'm Root");
});

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
app.get(
  "/Listing",
  WrapAsync(async (req, res) => {
    const allListing = await Listing.find({});
    res.render("./Listing/Index.ejs", { allListing });
  })
);

//New Route
app.get("/Listing/New", (req, res) => {
  res.render("Listing/New.ejs");
});

//Show Route
app.get(
  "/Listing/:id",
  WrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("Listing/Show.ejs", { listing });
  })
);

//Create Route
app.post(
  "/Listing",
  validateListing,
  WrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/Listing");
  })
);

//Edit Route
app.get(
  "/Listing/:id/Edit",
  WrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("Listing/Edit.ejs", { listing });
    // try {
    //   let { id } = req.params;
    //   const listing = await Listing.findById(id);
    //   res.render("Listing/Edit.ejs", { listing });
    // } catch (err) {
    //   console.log(err);
    // }
  })
);

//Update Route
app.put(
  "/Listing/:id",
  validateListing,
  WrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/Listing/${id}`);
  })
);

//Delete Route
app.delete(
  "/Listing/:id",
  WrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/Listing");
  })
);

// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My New Villa",
//     description: "By The Beach",
//     price: 1200,
//     location: "Calangute Goa",
//     country: "India",
//   });

//   await sampleListing.save();
//   console.log("Sample Was Saved");
//   res.send("Successful Testing");
// });

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something Went Wrong!" } = err;
  res.status(statusCode).render("Error.ejs", { message });
  // res.status(statusCode).send(message);
});

app.listen(1608, () => {
  console.log("Server Is Listening To Port 1608");
});
