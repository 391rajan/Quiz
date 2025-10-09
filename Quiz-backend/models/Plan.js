const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  duration: {
    type: String,
    enum: ['monthly', 'yearly'],
    required: true
  }
});

module.exports = mongoose.model('Plan', planSchema);