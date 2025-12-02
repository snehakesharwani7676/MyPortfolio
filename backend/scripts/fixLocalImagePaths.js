const mongoose = require('mongoose');
const Portfolio = require('../models/Portfolio');
require('dotenv').config();

const fixLocalImagePaths = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Find the item with Windows path
    const item = await Portfolio.findOne({ title: 'sneha kesh' });
    
    if (item) {
      console.log('Found item with wrong path:');
      console.log('Old URL:', item.images[0]?.url);
      
      // Update with correct web path
      item.images = [{ url: '/images/portfolio/bridal/prolifeheropic.jpg', caption: 'sneha kesh' }];
      item.afterImage = '/images/portfolio/bridal/prolifeheropic.jpg';
      await item.save();
      
      console.log('New URL:', item.images[0]?.url);
      console.log('\n✅ Fixed! Refresh your browser to see the image.');
    } else {
      console.log('Item not found');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

fixLocalImagePaths();
