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

// get post
router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find();
    const formPosts = posts.map((post) => ({
      _id: post._id,
      title: post.title,
      author: post.author,
      content: post.content,
    }));
    res.json(formPosts);
  } catch (err) {
    console.error("err getting posts", err);
    res.sendStatus(500);
  }
});

// delete post
router.delete("/:postId", async (req, res) => {
  try {
    const deleted = await Posts.findByIdAndDelete(req.params.postId);
    res.json(deleted);
  } catch (err) {
    console.error("err deleting post", err);
    res.sendStatus(500);
  }
});

// update post
router.put("/:postId", async (req, res) => {
  try {
    const updatedPost = await Posts.findByIdAndUpdate(
      req.params.postId,
      req.body,
      { new: true }
    );
    res.json(updatedPost);
  } catch (err) {
    console.error("err updating post", err);
    res.sendStatus(500);
  }
});

// like post
router.put("/:postId/like", async (req, res) => {
  try {
    const { userId } = req.body;
    const post = await Posts.findById(req.params.postId);
    // already liked
    const liked = post.likes.includes(userId);
    if (liked) {
      // unlike
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      // like
      post.likes.push(userId);
    }
    await post.save();
    res.json(post);
  } catch (err) {
    console.error("err liking post", err);
    res.sendStatus(500);
  }
});

module.exports = router;
