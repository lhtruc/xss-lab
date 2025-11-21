// routes/users.route.js
import express from "express";
import userModel from "../models/user.model.js";

const router = express.Router();

// login page
router.get("/login", (req, res) => {
  res.render("vwUsers/login", { title: "Login" });
});

// handle login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await userModel.validate(username, password);

  if (user) {
    req.session.user = { id: user.id, username: user.username, role: user.role };
    res.redirect("/blogs");
  } else {
    res.render("vwUsers/login", { error: "Invalid username or password" });
  }
});

// logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/users/login");
  });
});

// register page (optional)
router.get("/register", (req, res) => {
  res.render("vwUsers/register", { title: "Register" });
});

// handle register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    await userModel.create({ username, pass: password });
    res.redirect("/users/login");
  } catch (err) {
    res.render("vwUsers/register", { error: "Username already exists" });
  }
});

export default router;
