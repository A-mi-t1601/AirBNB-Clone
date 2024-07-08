module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("Error", "You Must Be Logged In For Any Changes!");
    return res.redirect("/login");
  }
  next();
};
