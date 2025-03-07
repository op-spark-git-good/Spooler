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
      res.status(201).send({ message: 'Item added successfully!', item: savedItem });
    })
    .catch((err) => {
      // Handle any errors that occur during the find or create process
      console.error('Error:', err);
      res.status(500).send({ message: 'Failed to add item to Notion Stash.', error: err.message });
    });
})

notionsRouter.get('/search', (req, res) => {
  const { query } = req.query;

  getBarcodeInfobySearch(query)
    .then((searchApi) => {
      res.send(searchApi);
    })
    .catch((err) => {
      res.status(500).send(`Search BarcodeSpider API Error: ${err}`);
    });
});
notionsRouter.delete('/:id', (req, res) => {
  const { id } = req.params
  Notions.findByIdAndDelete(id)
    .then((deletedDocument) => {
      console.log(deletedDocument)
      res.sendStatus(200)

    })
    .catch((err) => {
      console.error('Could not delete document:', err)
      res.sendStatus(500)
    })
})
notionsRouter.put('/:id', (req, res) => {
  const { item } = req.body;
  const { id } = req.params;

  Notions.findOneAndReplace({ _id: id }, item, { new: true })
    .then((updatedNotion) => {
      if (!updatedNotion) {
        return res.status(404).send('Document not found');
      }

      res.status(200).send('Notion Document updated successfully');
    })
    .catch((err) => {
      console.error('There was a problem updating the Notion document:', err);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = notionsRouter;