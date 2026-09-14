const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
  },
  youtubeLink: {
    type: String,
    required: [true, 'Please provide a YouTube channel link'],
    match: [/^(https?:\/\/)?(www\.)?youtube\.com\/.+/, 'Please provide a valid YouTube link'],
  },
  projectDescription: {
    type: String,
    required: [true, 'Please provide a project description'],
  },
  services: {
    type: [String],
    enum: [
      'Reaction Video Editing',
      'Podcast Video Editing',
      'Thumbnail Designing',
      'Shorts/Reel Video Editing',
      'Youtube Channel Management'
    ],
    required: [true, 'Please select at least one service'],
  },
  subject: {
    type: String,
    default: 'General Inquiry',
  },
  phone: String,
  message: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['new', 'read', 'responded'],
    default: 'new',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Contact', contactSchema);
