const express = require("express");
const router = express.Router();
const WrapAsync = require("../Utils/WrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../Middleware.js");
const userController = require("../Controllers/User.js");

//Signup
router
  .route("/signup")
  .get(userController.signupGET)
  .post(WrapAsync(userController.signupPOST));

//Login
router
  .route("/login")
  .get(userController.loginGET)
  .post(
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
