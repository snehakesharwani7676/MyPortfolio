const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Bridal', 'Engagement', 'Glam', 'Reception', 'Fashion/Art', 'Profile Shoot']
  },
  images: [{
    url: String,
    caption: String,
    isBefore: Boolean // for before-after slider
  }],
  clientName: String,
  eventDate: Date,
  description: String,
  tags: [String],
  featured: {
    type: Boolean,
    default: false
  },
  beforeImage: String,
  afterImage: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
