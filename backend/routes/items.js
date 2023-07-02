const express = require('express');
const {
  getItems,
  getItem,
  createItem,
  deleteItem,
  updateItem
} = require('../controllers/itemControllers');

const router = express.Router();

router.get('/', getItems);

router.get('/:id', getItem);

router.post('/', createItem);

router.delete('/:id', deleteItem);

router.patch('/:id', updateItem);

module.exports = router;