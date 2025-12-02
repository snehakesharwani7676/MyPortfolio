const mongoose = require('mongoose');
const Portfolio = require('../models/Portfolio');
require('dotenv').config();

const checkPortfolioItems = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Get all portfolio items
    const items = await Portfolio.find().sort({ createdAt: -1 }).limit(5);
    
    console.log('📊 Recent Portfolio Items:\n');
    items.forEach((item, index) => {
      console.log(`${index + 1}. ${item.title}`);
      console.log(`   Category: ${item.category}`);
      console.log(`   Image URL: ${item.images[0]?.url || 'No image'}`);
      console.log(`   After Image: ${item.afterImage || 'None'}`);
      console.log(`   Created: ${item.createdAt}`);
      console.log('');
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

checkPortfolioItems();
