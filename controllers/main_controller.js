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
    if (createdReview === undefined) {
      res.redirect("/new");
    } else {
      console.log(createdReview);
      res.redirect("/main");
    }
  });
});

// ===============================
// ======== PROFILE ==============
// ===============================
product.get("/profile", (req, res) => {
  res.render("profile.ejs", {
    profile: req.session.currentUser,
  });
});

// ===============================
// ======== EDIT =================
// ===============================
product.get("/:id/edit", (req, res) => {
  Review.findById(req.params.id, (err, foundReview) => {
    res.render("edit.ejs", {
      item: foundReview,
    });
  });
});

// ===============================
// ======== SHOW =================
// ===============================
product.get("/:id", (req, res) => {
  Review.findById(req.params.id, (err, foundReview) => {
    res.render("show.ejs", {
      item: foundReview,
    });
  });
});
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
// ===============================
// ======== DELETE ===============
// ===============================
product.delete("/:id", (req, res) => {
  Review.findByIdAndDelete(req.params.id, (err, remove) => {
    if (err) {
      console.log(err);
    } else {
      console.log(remove);
    }
    res.redirect("/main");
  });
});

// ===============================
// ======== UPDATE ===============
// ===============================
product.put("/:id", (req, res) => {
  if (req.body.recommend === "on") {
    req.body.recommend = "Yes";
  } else {
    req.body.recommend = "No";
  }
  Review.findByIdAndUpdate(req.params.id, req.body, (err, update) => {
    res.redirect("/main/" + req.params.id);
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
