const mongoose = require('mongoose');
const { execSync } = require('child_process');
require('dotenv').config();

const seedAll = async () => {
  try {
    console.log('🌱 Starting complete database seeding...\n');

    // Run all seed scripts
    console.log('📸 Seeding Portfolio...');
    execSync('node scripts/seedPortfolio.js', { stdio: 'inherit' });
    
    console.log('\n💼 Seeding Services...');
    execSync('node scripts/seedServices.js', { stdio: 'inherit' });
    
    console.log('\n⭐ Seeding Testimonials...');
    execSync('node scripts/seedTestimonials.js', { stdio: 'inherit' });
    
    console.log('\n📝 Seeding Blog Posts...');
    execSync('node scripts/seedBlogs.js', { stdio: 'inherit' });

    console.log('\n\n✅ ========================================');
    console.log('✅  ALL DATA SEEDED SUCCESSFULLY!');
    console.log('✅ ========================================\n');
    
    console.log('📊 Summary:');
    console.log('   ✓ 37 Portfolio Images');
    console.log('   ✓ 21 Services');
    console.log('   ✓ 10 Client Testimonials');
    console.log('   ✓ 5 Blog Posts');
    console.log('\n🌐 Your website is now fully populated!');
    console.log('🌐 Visit: http://localhost:3000\n');

  } catch (error) {
    console.error('❌ Error during seeding:', error.message);
    process.exit(1);
  }
};

seedAll();
