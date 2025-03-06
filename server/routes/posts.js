const express = require("express");
const router = express.Router();
const { Posts } = require("../database/models/Posts");

// new post
router.post("/", async (req, res) => {
  try {
    const newPost = await Posts.create(req.body);
    res.status(201).json(newPost);
  } catch (err) {
    console.error("err creating post", err);
    res.sendStatus(500);
  }
});

// getting posts
router.get("/", async (req, res) => {
  try {
    const post = await Posts.find()
    res.json(post);
  } catch (err) {
    console.error("err getting posts", err);
    res.sendStatus(500);
  }
});

// deleting posts
router.delete("/:postId", async (req, res) => {
  try {
    const deleted = await Posts.findByIdAndDelete(req.params.postId);
    res.json(deleted);
  } catch (err) {
    console.error("err deleting post", err);
    res.sendStatus(500);
  }
});


module.exports = router;