const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
  },
  content: {
    type: String,
    required: [true, 'Please provide content'],
  },
  excerpt: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    enum: [
      'editing-tips',
      'growth-strategy',
      'case-study',
      'tools-review',
      'tutorials',
      'video editing company',
      'vfx services',
      'youtube video editing',
      'wedding video editing',
      'post production',
      'workflow systems',
      'color grading',
      'audio post production',
      'creator growth'
    ],
    default: 'editing-tips',
  },
  image: String,
  published: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Blog', blogSchema);
