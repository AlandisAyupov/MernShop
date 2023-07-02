const Item = require('../models/itemModel');
const mongoose = require('mongoose');

const getItems = async (req, res) => {
 const items = await Item.find({}).sort({ createdAt: -1 });
 res.status(200).json(items);
}

const getItem = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
   return res.status(404).json({ error: 'No such item' });
  }
 const item = await Item.findById(id);
  if (!item) {
   return res.status(404).json({ error: 'No such item' });
  }
 res.status(200).json(item);
}

const createItem = async (req, res) => {
 const { title, count, description } = req.body;
 let emptyFields = [];
  if (!title) {
   emptyFields.push('title');
  }
  if (!count) {
   emptyFields.push('count');
  }
  if (!description) {
   emptyFields.push('description');
  }
  if (emptyFields.length > 0) {
   return res.status(400).json({ error: 'Please fill in all fields', emptyFields });
  }
  try {
    const item = await Item.create({ title, count, description })
    res.status(200).json(item)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const deleteItem = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such item'})
  }
  const item = await Item.findOneAndDelete({_id: id})
  if(!item) {
    return res.status(400).json({error: 'No such item'})
  }
  res.status(200).json(item)
}

const updateItem = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such item'})
  }
  const item = await Item.findOneAndUpdate({_id: id}, {
    ...req.body
  })
  if (!item) {
    return res.status(400).json({error: 'No such item'})
  }
  res.status(200).json(item)
}

module.exports = {
  getItems,
  getItem,
  createItem,
  deleteItem,
  updateItem
}