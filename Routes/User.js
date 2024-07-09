const express = require("express");
const router = express.Router();
const WrapAsync = require("../Utils/WrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../Middleware.js");
const userController = require("../Controllers/User.js");

//Signup
router.get("/signup", userController.signupGET);

router.post("/signup", WrapAsync(userController.signupPOST));

//Login
router.get("/login", userController.loginGET);

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.loginPOST
);

//Logout
router.get("/logout", userController.logoutGET);

module.exports = router;
