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
notionsRouter.post('/', (req, res) => {
  const { item } = req.body;
  const { title, image, color, brand, upc } = item;
  Notions.create({ title, image, color, brand, upc })

    .then((savedItem) => {
      // Send a response back with the created item
      res.status(201).json({ message: 'Item added successfully!', item: savedItem });
    })
    .catch((err) => {
      // Handle any errors that occur during the find or create process
      console.error('Error:', err);
      res.status(500).json({ message: 'Failed to add item to Notion Stash.', error: err.message });
    });
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