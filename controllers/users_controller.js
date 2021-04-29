const bcrypt = require("bcrypt");
const express = require("express");
const users = express.Router();
const User = require("../models/signin-schema.js");

users.get("/signup", (req, res) => {
  res.render("../usersession/signup.ejs", {
    currentUser: req.session.currentUser,
  });
});

users.post("/", (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  User.create(req.body, (err, createdUser) => {
    if (createdUser === undefined) {
      console.log(createdUser);
      res.redirect("/users/signup");
    } else {
      console.log(createdUser);
      res.redirect("/");
    }
  });
});

module.exports = users;
