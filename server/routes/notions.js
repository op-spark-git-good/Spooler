const express = require("express");
const notionsRouter = express.Router();
const { Notions } = require("../database/models/Notions");
const getBarcodeInfobySearch = require('../barcode')


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
notionsRouter.get('/search', async (req, res) => {
  const { query } = req.query

  // console.log(keyword, 'keyword')
  // if (keyword)
  try {
    const searchApi = await getBarcodeInfobySearch(query)

    res.json(searchApi)

  }
  catch (err) {
    res.status(500).send(`search BarcodeSpider API ${err}`);
  }
})

module.exports = notionsRouter;