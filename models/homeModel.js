const mongoose = require('mongoose');

const backgroundsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The name is required'],
  },
  description: {
    type: String,
    required: [true, 'The description is required'],
    trim: true,
  },
  url: {
    type: String,
    required: [true, 'The url is required'],
  },
});
const Home = mongoose.model('Background', backgroundsSchema);

module.exports = Home;
