const { Router } = require('express');
const { Fabrics } = require('../database/models/Fabrics.js');

const fabricsRouter = Router();

// helper func: just an error handler to cut a step in half
  const errCatch = (attempt, err) => {
    console.err(`Failed to ${attempt}`, err);
    res.sendStatus(500);
  }


// Create a get request to take in all of the fabric documents from the database
fabricsRouter.get('/', (req, res) => {
  Fabrics.find().then((data) => {
    console.log(data);
    // res.status(200).send(data);
  }).catch((err) => errCatch('get fabrics', err));
});

module.exports = fabricsRouter;
