const mongoose = require('mongoose');
const Portfolio = require('../models/Portfolio');
require('dotenv').config();

const fixGoogleDriveLink = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find the portfolio item with the broken link
    const oldUrl = 'https://drive.google.com/file/d/1F2U7OTKcTA7YPi0ka7RY8sVaDzHkkl2w/view?usp=drive_link';
    const newUrl = 'https://drive.google.com/uc?export=view&id=1F2U7OTKcTA7YPi0ka7RY8sVaDzHkkl2w';

    // Update portfolio items with the old URL
    const result = await Portfolio.updateMany(
      {
        $or: [
          { 'images.url': oldUrl },
          { afterImage: oldUrl },
          { beforeImage: oldUrl }
        ]
      },
      {
        $set: {
          'images.$[elem].url': newUrl,
          afterImage: newUrl
        }
      },
      {
        arrayFilters: [{ 'elem.url': oldUrl }]
      }
    );

    console.log(`✅ Updated ${result.modifiedCount} portfolio items`);

    // Also update any items with the title "Sneha"
    const snehaItem = await Portfolio.findOne({ title: 'Sneha' });
    if (snehaItem) {
      snehaItem.images = [{ url: newUrl, caption: 'Sneha' }];
      snehaItem.afterImage = newUrl;
      await snehaItem.save();
      console.log('✅ Fixed Sneha portfolio item');
    }

    console.log('\n🎉 Google Drive link fixed!');
    console.log('🔄 Refresh your browser to see the changes');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error fixing link:', error);
    process.exit(1);
  }
};

fixGoogleDriveLink();
