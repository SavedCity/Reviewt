const express = require("express");
const Review = require("../models/items-schema.js");
const User = require("../models/signin-schema.js");
const Reviews = require("../models/reviews.js");
const product = express.Router();

// ===== AUTHENTICATION ==========
// ===============================
const authenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next();
  } else {
    res.redirect("/sessions/signin");
  }
};

// ===============================
// ======== INDEX ================
// ===============================
product.get("/", authenticated, (req, res) => {
  Review.find({}, (err, findAll) => {
    res.render("index.ejs", {
      review: findAll,
      currentUser: req.session.currentUser,
    });
  });
});

// // ===============================
// // ======== PROFILE ==============
// // ===============================
// product.get("/myprofile", (req, res) => {
//   User.find({}, (err, findUser) => {
//     res.render('profile.ejs', {
//       profile: findUser
//     })
//   })
// });

// ===============================
// ======== PROFILE ==============
// ===============================
product.get("/myprofile", (req, res) => {
  res.render("profile.ejs", {
    profile: req.session.currentUser,
  });
});

// ===============================
// ======== NEW ==================
// ===============================
product.get("/new", (req, res) => {
  res.render("new.ejs");
});

product.post("/", (req, res) => {
  if (req.body.recommend === "on") {
    req.body.recommend = "Yes";
  } else {
    req.body.recommend = "No";
  }
  Review.create(req.body, (err, createdReview) => {
    console.log(createdReview);
    res.redirect("/");
  });
});

// Review.create(Reviews, (err, created) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(created);
//   }
// });

module.exports = product;
