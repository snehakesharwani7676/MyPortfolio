const mongoose = require('mongoose');
const Portfolio = require('../models/Portfolio');
require('dotenv').config();

const cleanupBrokenImages = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Get all portfolio items
    const allItems = await Portfolio.find();
    console.log(`📊 Total portfolio items: ${allItems.length}\n`);

    let deletedCount = 0;
    let fixedCount = 0;

    for (const item of allItems) {
      const imageUrl = item.images[0]?.url || item.afterImage || '';
      
      // Check if it's a broken path
      const isBroken = 
        imageUrl.includes('C:\\') || 
        imageUrl.includes('Users\\') ||
        imageUrl.includes('drive.google.com/file/d/') || // Wrong Google Drive format
        imageUrl === '';

      if (isBroken) {
        console.log(`❌ Deleting broken item: "${item.title}"`);
        console.log(`   Path: ${imageUrl}`);
        await Portfolio.deleteOne({ _id: item._id });
        deletedCount++;
      } else {
        // Fix relative paths if needed
        let needsUpdate = false;
        let newUrl = imageUrl;

        // Ensure path starts with /
        if (!imageUrl.startsWith('/') && !imageUrl.startsWith('http')) {
          newUrl = '/' + imageUrl;
          needsUpdate = true;
        }

        if (needsUpdate) {
          item.images = [{ url: newUrl, caption: item.title }];
          item.afterImage = newUrl;
          await item.save();
          console.log(`✅ Fixed path: "${item.title}"`);
          console.log(`   Old: ${imageUrl}`);
          console.log(`   New: ${newUrl}`);
          fixedCount++;
        }
      }
    }

    console.log('\n📊 Cleanup Summary:');
    console.log(`   ❌ Deleted: ${deletedCount} broken items`);
    console.log(`   ✅ Fixed: ${fixedCount} items`);
    console.log(`   ✓ Remaining: ${allItems.length - deletedCount} items`);

    // Show remaining items
    const remaining = await Portfolio.find();
    console.log('\n📋 Remaining Portfolio Items:');
    remaining.forEach((item, index) => {
      console.log(`${index + 1}. ${item.title} (${item.category})`);
      console.log(`   URL: ${item.images[0]?.url || item.afterImage}`);
    });

    console.log('\n🎉 Cleanup complete!');
    console.log('🔄 Refresh your browser to see the changes.');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

cleanupBrokenImages();
