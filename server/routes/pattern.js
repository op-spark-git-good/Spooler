const express = require("express");
const router = express.Router();
const { Patterns } = require("../database/models/Pattern");

router.post("/", async (req, res) => {
  try {
    const newPattern = new Patterns(req.body);
    await newPattern.save();
    res.status(201).json(newPattern);
  } catch (err) {
    console.error('Error creating pattern:', err);
    res.status(500).json({ error: 'Failed to create pattern' });
  }
})

module.exports = router;