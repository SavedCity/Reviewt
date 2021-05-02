const express = require("express");
const router = express.Router();
const Author = require("../models/authors.js");

// INDEX ========================================
router.get("/", (req, res) => {
  Author.find({}, (err, foundAuthors) => {
    res.render("authors/authors.ejs", {
      authors: foundAuthors,
    });
  });
});

router.get("/", (req, res) => {
  res.render("authors/authors.ejs");
});

// NEW ========================================
router.get("/new", (req, res) => {
  res.render("authors/new-author.ejs");
});

router.post("/", (req, res) => {
  Author.create(req.body, (err, createdAuthor) => {
    res.redirect("/authors");
  });
});

// SHOW ========================================
router.get("/:id", (req, res) => {
  Author.findById(req.params.id, (err, foundAuthor) => {
    res.render("authors/show-author.ejs", {
      author: foundAuthor,
    });
  });
});

// EDIT ========================================
router.get("/:id/edit", (req, res) => {
  Author.findById(req.params.id, (err, foundAuthor) => {
    res.render("authors/edit-author.ejs", {
      author: foundAuthor,
    });
  });
});
router.put("/:id", (req, res) => {
  Author.findByIdAndUpdate(req.params.id, req.body, () => {
    res.redirect("/authors");
  });
});

// DELETE ========================================
router.delete("/:id", (req, res) => {
  Author.findByIdAndRemove(req.params.id, () => {
    res.redirect("/authors");
  });
});

module.exports = router;
