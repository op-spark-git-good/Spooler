const express = require("express");
const router = express.Router();
const { Posts } = require("../database/models/Posts");

// new post
router.post("/", async (req, res) => {
  try {
    const newPost = await Posts.create(req.body);
    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// getting posts
router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find().populate("ownerId", "name");
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});


module.exports = router;