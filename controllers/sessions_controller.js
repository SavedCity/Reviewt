const bcrypt = require("bcrypt");
const express = require("express");
const sessions = express.Router();
const User = require("../models/signin-schema.js");

sessions.get("/signin", (req, res) => {
  res.render("../usersession/login.ejs", {
    currentUser: req.session.currentUser,
  });
});

sessions.post("/", (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) {
      console.log(err);
      res.send("THE DB HAD AN ERROR!");
    } else if (!foundUser) {
      res.send('<a href="/sessions/signin"> THE USER WAS NOT FOUND! </a>');
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser;
        res.redirect("/main");
      } else {
        res.send('<a href="/sessions/signin"> PASSWORD DOES NOT MATCH! </a>');
      }
    }
  });
});

sessions.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/sessions/signin");
  });
});

module.exports = sessions;
