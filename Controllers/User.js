const User = require("../Models/User.js");

//Signup
module.exports.signupGET = (req, res) => {
  res.render("User/Signup.ejs");
};

module.exports.signupPOST = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("Success", "Welcome To Wanderlust");
      res.redirect("/Listing");
    });
  } catch (e) {
    req.flash("Error", e.message);
    res.redirect("/signup");
  }
};

//Login
module.exports.loginGET = (req, res) => {
  res.render("User/Login.ejs");
};

module.exports.loginPOST = async (req, res) => {
  req.flash("Success", "Welcome Back To Wanderlust!");
  let redirectUrl = res.locals.redirectUrl || "/Listing";
  res.redirect(redirectUrl);
};

//Logout
module.exports.logoutGET = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("Success", "You're Logged Out!");
    res.redirect("/Listing");
  });
};
