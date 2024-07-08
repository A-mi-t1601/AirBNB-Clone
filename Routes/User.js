const express = require("express");
const router = express.Router();
const User = require("../Models/User.js");
const WrapAsync = require("../Utils/WrapAsync");
const passport = require("passport");

// Sign Up
router.get("/signup", (req, res) => {
  res.render("User/Signup.ejs");
});

router.post(
  "/signup",
  WrapAsync(async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      req.flash("Success", "Welcome To Wanderlust");
      res.redirect("/Listing");
    } catch (e) {
      req.flash("Error", e.message);
      res.redirect("/signup");
    }
  })
);

// Login
router.get("/login", (req, res) => {
  res.render("User/Login.ejs");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("Success", "Welcome Back To Wanderlust!");
    res.redirect("/Listing");
  }
);

// Logout
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("Success", "You're Logged Out!");
    res.redirect("/Listing");
  });
});

module.exports = router;
