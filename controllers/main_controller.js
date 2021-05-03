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
      "https://scontent-hou1-1.xx.fbcdn.net/v/t1.6435-9/182162048_3761943260526172_6849399484459786889_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=730e14&_nc_ohc=bcwo2p7IO90AX_2bMxC&_nc_ht=scontent-hou1-1.xx&oh=66b18e80287cc602dcf5ccda93b3035e&oe=60B6C7FF";
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
