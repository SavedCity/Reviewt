const express = require("express");
const Review = require("../models/items-schema.js");
const User = require("../models/signin-schema.js");
const Reviews = require("../models/reviews.js");
const product = express.Router();
const bcrypt = require("bcrypt");
const defaultImg = "../images/logo.png";

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
    req.body.img = defaultImg;
  }
  if (req.body.star === "1") {
    req.body.star = "★☆☆☆☆";
  } else if (req.body.star === "2") {
    req.body.star = "★★☆☆☆";
  } else if (req.body.star === "3") {
    req.body.star = "★★★☆☆";
  } else if (req.body.star === "4") {
    req.body.star = "★★★★☆";
  } else if (req.body.star === "5") {
    req.body.star = "★★★★★";
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
  User.find({}, (err, found) => {
    res.render("profile.ejs", {
      profile: req.session.currentUser,
      user: found,
    });
  });
});

// ===============================
// ======== ALL USERS ============
// ===============================
product.get("/users", (req, res) => {
  User.find({}, (err, findAll) => {
    Review.find({}, (err, findReview) => {
      res.render("all-users.ejs", {
        user: findAll,
        currentUser: req.session.currentUser,
        review: findReview,
      });
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
    Review.find({}, (err, findReview) => {
      res.render("users-show.ejs", {
        profile: found,
        user: req.session.currentUser,
        review: findReview,
      });
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
// ======== EDIT USER ============
// ===============================
product.get("/users/:id/edit", (req, res) => {
  User.findById(req.params.id, (err, found) => {
    res.render("edit-users.ejs", {
      user: found,
      currentUser: req.session.currentUser,
    });
  });
});

// ===============================
// ======== INDEX ================
// ===============================
product.get("/", authenticated, (req, res) => {
  User.find({}, (err, allUsers) => {
    Review.find({}, (err, findAll) => {
      res.render("index.ejs", {
        review: findAll,
        currentUser: req.session.currentUser,
        user: allUsers,
      });
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
product.put("/users/:id", (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  User.findByIdAndUpdate(req.params.id, req.body, (err, update) => {
    if (err) {
      console.log(err);
    } else {
      console.log(update);
      res.redirect("/main/show/" + req.params.id);
    }
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
  if (req.body.star === "1") {
    req.body.star = "★☆☆☆☆";
  } else if (req.body.star === "2") {
    req.body.star = "★★☆☆☆";
  } else if (req.body.star === "3") {
    req.body.star = "★★★☆☆";
  } else if (req.body.star === "4") {
    req.body.star = "★★★★☆";
  } else if (req.body.star === "5") {
    req.body.star = "★★★★★";
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
