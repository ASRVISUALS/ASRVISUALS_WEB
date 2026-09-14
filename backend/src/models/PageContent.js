const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    trim: true,
  },
  heading: String,
  subheading: String,
  content: String,
  image: String,
  ctaText: String,
  ctaUrl: String,
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
}, {
  _id: false,
});

const pageContentSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  seo: {
    title: String,
    description: String,
    keywords: [String],
  },
  sections: {
    type: [sectionSchema],
    default: [],
  },
  published: {
    type: Boolean,
    default: true,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('PageContent', pageContentSchema);
