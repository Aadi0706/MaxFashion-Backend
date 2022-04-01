// Package & Library imports
const express = require("express");
const cors = require("cors");
// const userController = require("./controllers/")

//Path imports
const {
  register,
  login,
  generateToken,
} = require("./controllers/auth.controller");
const mensproductcontroller = require("./controllers/mensproduct.controller");
const productController = require("./controllers/product.controllers");
const cartController = require("./controllers/cart.controllers");
const passport = require("./configs/google-oauth");

const app = express();
app.use(express.json());
app.use(cors());

// Google OAuth- Login & Signup
app.post("/register", register);
app.post("/login", login);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),

  function (req, res) {
    // console.log(req.user)
    const token = generateToken(req.user);
    return res.status(200).send({ user: req.user, token });
  }
);

// Route passing => Controllers
app.use("/products", productController);
// app.use("/users", userController)
app.use("/carts", cartController);
app.use("", productController);
app.use("", mensproductcontroller);

module.exports = app;
