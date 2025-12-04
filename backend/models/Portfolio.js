const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      // Makeup Portfolio
      'Bridal', 'Engagement', 'Reception', 'Glam', 'Self Makeup', 'Teen Makeup', 
      'Fantasy', 'Bronze Tan', 'Modern Bride', 'Airbrush Makeup',
      // Hair Portfolio
      'Hair-do Gallery', 'Keratin', 'Rebonding', 'Botox', 'Smoothening',
      'Anti-Hairfall Treatment', 'Anti-Dandruff Treatment', 'Global Hair Color with Highlights',
      // Skin/Nails Portfolio
      'Nail Art', 'Nail Extension', 'Facials', 'Manicure-Pedicure', 'Waxing',
      'Machinery Facial', 'High Frequency Treatment', 'Galvanic Treatment',
      'Ultrasonic Treatment', 'Hydra Facial', 'Phytic Facial'
    ]
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
