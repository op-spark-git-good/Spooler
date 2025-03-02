const express = require("express");
const notionsRouter = express.Router();
const { Notions } = require("../database/models/Notions");

notionsRouter.get('/', (req, res) => {
  Notions.find()
    .then((notionsArray) => {
      res.status(200).send(notionsArray)
    })
    .catch((err) => {
      console.error('Could not add Notions:', err)
      res.sendStatus(500)
    })
})
module.exports = notionsRouter;