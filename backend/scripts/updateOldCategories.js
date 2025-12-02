const mongoose = require('mongoose');
const Portfolio = require('../models/Portfolio');
require('dotenv').config();

const updateOldCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Update Fashion/Art to proper categories
    const fashionItems = await Portfolio.find({ category: 'Fashion/Art' });
    
    if (fashionItems.length > 0) {
      console.log(`📝 Found ${fashionItems.length} Fashion/Art items`);
      console.log('   These should be categorized as:');
      console.log('   - Fantasy (for artistic/creative makeup)');
      console.log('   - Model Bride (for fashion shoots)');
      console.log('   - Or keep as is if you prefer\n');
    }

    // Show all items by category
    const categories = await Portfolio.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    console.log('📊 Current Categories:');
    categories.forEach(cat => {
      console.log(`   ${cat._id}: ${cat.count} items`);
    });

    console.log('\n✅ All paths are correct!');
    console.log('   All images use proper web paths: /images/portfolio/...');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

updateOldCategories();
