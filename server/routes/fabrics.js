const { Router } = require("express");
const { Fabrics } = require("../database");

const fabricsRouter = Router();

// helper func: just an error handler to cut a step in half
//NOTE: BROKEN: cannot define res..
// const errCatch = (attempt, err) => {
  // console.error(`Failed to ${attempt}`, err);
  // res.sendStatus(500);
// };

// Create a get request to take in all of the fabric documents from the database
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

module.exports = fabricsRouter;
