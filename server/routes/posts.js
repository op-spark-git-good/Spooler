const express = require("express");
const router = express.Router();
const { Posts } = require("../database/models/Posts");

router.post("/", async (req, res) => {
  try {
    const newPost = await Posts.create(req.body);
    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;