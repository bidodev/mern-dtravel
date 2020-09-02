/**
 * Module dependencies.
 */
const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, 'The product name is required'],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'The description is required'],
    trim: true,
  },
  country: String,
  continent: String,
  type: String,
  difficulty: String,
  price: {
    type: Number,
    required: [true, 'The price is required'],
  },
  cover: {
    type: Object,
    default: {},
  },
  imgs: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
