const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  image: {
    type: String,
    required: [true, 'Please provide an image'],
  },
  category: {
    type: String,
    enum: ['design', 'development', 'marketing', 'branding'],
    required: true,
  },
  technologies: [String],
  link: String,
  videoUrl: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
