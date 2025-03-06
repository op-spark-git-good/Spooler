const express = require("express");
const router = express.Router();
const { Projects } = require("../database/models/Projects");

// get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Projects.find();
    res.status(200).send(projects);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// create new project on post
router.post("/", async (req, res) => {
  try {
    const newProject = await Projects.create(req.body);
    res.status(201).json(newProject);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
