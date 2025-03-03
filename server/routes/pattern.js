const express = require("express");
const router = express.Router();
const { Patterns } = require("../database/models/Pattern");

// Get all patterns
router.get('/', async (req, res) => {
  try {
    const patterns = await Patterns.find();
    res.status(200).send(patterns);
  } catch (err) {
    console.error('Error fetching patterns:', err);
    res.status(500).send({ error: 'Failed to fetch patterns' });
  }
});

// Get a specific pattern by ID
router.get('/:id', async (req, res) => {
  try {
    const pattern = await Patterns.findById(req.params.id);
    if (!pattern) {
      return res.status(404).send({ error: 'Pattern not found' });
    }
    res.status(200).send(pattern);
  } catch (err) {
    console.error('Error fetching pattern:', err);
    res.status(500).json({ error: 'Failed to fetch pattern' });
  }
});

//create new pattern
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