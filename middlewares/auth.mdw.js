// middleware/authUser.js
export function authUser(req, res, next) {
  if (req.session && req.session.user) {
    req.user = req.session.user;
    next();
  } else {
    res.redirect("/users/login");
  }
}