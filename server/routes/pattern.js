const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const { Patterns } = require("../database/models/Pattern");

// Get all patterns
router.get('/', async (req, res) => {
  try {
    const patterns = await Patterns.find({});
    res.json(patterns);  // Ensure MongoDB returns `_id`
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
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
    res.status(500).send({ error: 'Failed to fetch pattern' });
  }
});

//create new pattern
router.post("/", async (req, res) => {
  try {
    const newPattern = new Patterns(req.body);
    await newPattern.save();
    res.status(201).send(newPattern);
  } catch (err) {
    console.error('Error creating pattern:', err);
    res.status(500).send({ error: 'Failed to create pattern' });
  }
})


// PUT /patterns/:id - Update a pattern
// Update a pattern (PUT /patterns/:id)
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const updatedPattern = await Patterns.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedPattern) {
      return res.status(404).json({ error: "Pattern not found" });
    }

    res.json(updatedPattern);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
});




// DELETE /patterns/:id - Delete a pattern
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (!id || id === "undefined") {
      return res.status(400).json({ error: "Invalid ID provided" });
  }

  try {
      const deletedPattern = await Patterns.findByIdAndDelete(id);
      if (!deletedPattern) {
          return res.status(404).json({ error: "Pattern not found" });
      }
      res.json({ message: "Pattern deleted successfully" });
  } catch (error) {
      res.status(500).json({ error: "Server error", details: error.message });
  }
});



module.exports = router;