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
  console.log(req)
  try {
    const newProject = await Projects.create(req.body);
    res.status(201)
      .send({id: newProject.id});
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

//delete a project
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Projects.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res
        .status(404)
        .send({ error: "Delete request: Project not found" });
    }
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

//update projects
router.put("/:id", async (req, res) => {
  try {
    const updated = await Projects.findByIdAndUpdate(req.params.id, req.body);
    if (!updated) {
      return res
        .status(404)
        .send({ error: "Update request: Project not found" });
    }
    res.status(200).send(updated);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
