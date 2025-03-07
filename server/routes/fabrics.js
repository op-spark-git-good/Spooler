const { Router } = require("express");
const { Fabrics } = require("../database");

const fabricsRouter = Router();

// helper func: just an error handler to cut a step in half
//NOTE: BROKEN: cannot define res..
// const errCatch = (attempt, err) => {
  // console.error(`Failed to ${attempt}`, err);
  // res.sendStatus(500);
// };

// Create a get request handler to take in all of the fabric documents from the database
fabricsRouter.get("/", (req, res) => {
  Fabrics.find()
    .then((entries) => {
      res.status(200).send(entries);
    })
    .catch((err) => {
      console.error("Failed to get fabrics", err);
      res.sendStatus(500);
    });
});

// set a POSt request handler to send in new fabrics to the database
fabricsRouter.post("/", (req, res) => {
  const { info } = req.body;
  Fabrics.create(info).then((fabric) => {
    if (fabric) {
      res.status(201).send(fabric);
    } else {
      res.status(404).send("Something went wrong");
    }
  }).catch((err => {
    console.error("Failed to save fabric", err);
    res.sendStatus(500);
  }))
})

// PUT request to replace given fabric with new form info
fabricsRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const { info } = req.body;
  Fabrics.findByIdAndUpdate(id, info).then((result) => {
    if (result) {
      res.sendStatus(200);
    } else {
      res.status(404).send("Unable to perform fabric request");
    }
  }).catch((err) => {
    console.error("failed to update fabric", err);
    res.sendStatus(500);
  })
});

// Set request to delete by id
fabricsRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  Fabrics.findByIdAndDelete(id).then((result) => {
    if (result) {
      res.sendStatus(200);
    } else {
      res.status(404).send("Unable to perform fabric request");
    }
  }).catch((err) => {
    console.error("failed to delete fabric", err);
    res.sendStatus(500);
  })
})


module.exports = fabricsRouter;
