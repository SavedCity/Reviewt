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
  res.render("new.ejs", {
    currentUser: req.session.currentUser,
  });
});

product.post("/", (req, res) => {
  if (req.body.recommend === "on") {
    req.body.recommend = "✓";
  } else {
    req.body.recommend = "✕";
  }
  if (req.body.img === "") {
    req.body.img =
      "https://scontent-dfw5-2.xx.fbcdn.net/v/t1.6435-9/180681393_3756872271033271_7305764011755706092_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=730e14&_nc_ohc=2ikBQH88CSMAX8xQHuB&_nc_ht=scontent-dfw5-2.xx&oh=cdf35c5c82e148fb9e80bdcb72ddd915&oe=60B4D071";
  }
  Review.create(req.body, (err, createdReview) => {
    if (createdReview === undefined) {
      res.redirect("/main/new");
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
// ======== ALL USERS ============
// ===============================
product.get("/users", (req, res) => {
  User.find({}, (err, findAll) => {
    res.render("all-users.ejs", {
      user: findAll,
      currentUser: req.session.currentUser,
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
      user: req.session.currentUser,
    });
  });
});
// ===============================
// ======== USERS SHOW ===========
// ===============================
product.get("/show/:id", (req, res) => {
  User.findById(req.params.id, (err, found) => {
    res.render("users-show.ejs", {
      profile: found,
      user: req.session.currentUser,
    });
  });
});

// ===============================
// ======== EDIT =================
// ===============================
product.get("/:id/edit", (req, res) => {
  Review.findById(req.params.id, (err, foundReview) => {
    res.render("edit.ejs", {
      item: foundReview,
      currentUser: req.session.currentUser,
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
    req.body.recommend = "✓";
  } else {
    req.body.recommend = "✕";
  }
  Review.findByIdAndUpdate(req.params.id, req.body, (err, update) => {
    if (err) {
      console.log(err);
    } else {
      console.log(update);
      res.redirect("/main/" + req.params.id);
    }
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
