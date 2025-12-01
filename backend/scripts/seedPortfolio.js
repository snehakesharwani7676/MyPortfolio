const mongoose = require('mongoose');
const Portfolio = require('../models/Portfolio');
require('dotenv').config();

const portfolioData = [
  // Bridal Makeup
  { title: 'Bridal Makeup 1', category: 'Bridal', images: [{ url: '/images/portfolio/bridal/BRmakeup1.jpg' }], featured: true },
  { title: 'Bridal Makeup 2', category: 'Bridal', images: [{ url: '/images/portfolio/bridal/BRmakeup2.jpg' }], featured: true },
  { title: 'Bridal Makeup 3', category: 'Bridal', images: [{ url: '/images/portfolio/bridal/BRmakeup3.jpg' }] },
  { title: 'Bridal Makeup 4', category: 'Bridal', images: [{ url: '/images/portfolio/bridal/BRmakeup4.jpg' }] },
  { title: 'Bridal Makeup 5', category: 'Bridal', images: [{ url: '/images/portfolio/bridal/BRmakeup5.jpg' }] },
  { title: 'Bridal Makeup 6', category: 'Bridal', images: [{ url: '/images/portfolio/bridal/BRmakeup6.jpg' }] },
  { title: 'Bridal Makeup 7', category: 'Bridal', images: [{ url: '/images/portfolio/bridal/BRmakeup7.jpg' }] },
  { title: 'Bridal Makeup 8', category: 'Bridal', images: [{ url: '/images/portfolio/bridal/BRmakeup8.jpg' }] },
  { title: 'Bridal Traditional 1', category: 'Bridal', images: [{ url: '/images/portfolio/bridal/BRTmakeup1.jpg' }] },
  { title: 'Bridal Traditional 2', category: 'Bridal', images: [{ url: '/images/portfolio/bridal/BRTmakeup2.jpg' }] },

  // Engagement Makeup
  { title: 'Engagement Makeup 1', category: 'Engagement', images: [{ url: '/images/portfolio/engagement/ENmakeup1.jpg' }], featured: true },
  { title: 'Engagement Makeup 2', category: 'Engagement', images: [{ url: '/images/portfolio/engagement/ENmakeup2.jpg' }] },
  { title: 'Engagement Makeup 3', category: 'Engagement', images: [{ url: '/images/portfolio/engagement/ENmakeup3.jpg' }] },
  { title: 'Engagement Makeup 4', category: 'Engagement', images: [{ url: '/images/portfolio/engagement/ENmakeup4.jpg' }] },

  // Glam Makeup
  { title: 'Glam Makeup 1', category: 'Glam', images: [{ url: '/images/portfolio/glam/GLmakeup1.jpg' }], featured: true },
  { title: 'Glam Makeup 2', category: 'Glam', images: [{ url: '/images/portfolio/glam/GLmakeup2.jpg' }] },
  { title: 'Glam Makeup 3', category: 'Glam', images: [{ url: '/images/portfolio/glam/Glmakeup3.jpg' }] },
  { title: 'Glam Makeup 4', category: 'Glam', images: [{ url: '/images/portfolio/glam/GLmakeup4.jpg' }] },
  { title: 'Glam Makeup 5', category: 'Glam', images: [{ url: '/images/portfolio/glam/GLmakeup5.jpg' }] },
  { title: 'Glam Makeup 6', category: 'Glam', images: [{ url: '/images/portfolio/glam/GLmakeup6.jpg' }] },
  { title: 'Glam Makeup 7', category: 'Glam', images: [{ url: '/images/portfolio/glam/GLmakeup7.jpg' }] },
  { title: 'Glam Makeup 8', category: 'Glam', images: [{ url: '/images/portfolio/glam/GLmakeup8.jpg' }] },
  { title: 'Glam Makeup 9', category: 'Glam', images: [{ url: '/images/portfolio/glam/GLmakeup9.jpg' }] },
  { title: 'Glam Makeup 10', category: 'Glam', images: [{ url: '/images/portfolio/glam/Glmakeup10.jpg' }] },
  { title: 'Glam Makeup 11', category: 'Glam', images: [{ url: '/images/portfolio/glam/GLmakeup11.jpg' }] },

  // Reception Makeup
  { title: 'Reception Makeup 1', category: 'Reception', images: [{ url: '/images/portfolio/reception/RCmakeup1.jpg' }], featured: true },
  { title: 'Reception Makeup 2', category: 'Reception', images: [{ url: '/images/portfolio/reception/RCmakeup2.jpg' }] },
  { title: 'Reception Makeup 3', category: 'Reception', images: [{ url: '/images/portfolio/reception/RCmakeup3.jpg' }] },
  { title: 'Reception Makeup 4', category: 'Reception', images: [{ url: '/images/portfolio/reception/RCmakeup4.jpg' }] },
  { title: 'Reception Makeup 5', category: 'Reception', images: [{ url: '/images/portfolio/reception/RCmakeup5.jpg' }] },

  // Fashion/Art Makeup
  { title: 'Fashion Makeup 1', category: 'Fashion/Art', images: [{ url: '/images/portfolio/fashion/FAmakeup1.jpg' }], featured: true },
  { title: 'Fashion Makeup 2', category: 'Fashion/Art', images: [{ url: '/images/portfolio/fashion/FAmakeup2.jpg' }] },
  { title: 'Fashion Makeup 3', category: 'Fashion/Art', images: [{ url: '/images/portfolio/fashion/FAmakeup3.jpg' }] },
  { title: 'Fashion Makeup 4', category: 'Fashion/Art', images: [{ url: '/images/portfolio/fashion/FAmakeup4.jpg' }] },
  { title: 'Fashion Makeup 5', category: 'Fashion/Art', images: [{ url: '/images/portfolio/fashion/FAmakeup5.jpg' }] }
];

const seedPortfolio = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing portfolio
    await Portfolio.deleteMany({});
    console.log('🗑️  Cleared existing portfolio');

    // Insert new portfolio items
    await Portfolio.insertMany(portfolioData);
    console.log('✅ Added 37 portfolio items');

    console.log('\n📊 Portfolio Summary:');
    const categories = await Portfolio.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    categories.forEach(cat => {
      console.log(`   ${cat._id}: ${cat.count} images`);
    });

    console.log('\n🎉 Portfolio seeded successfully!');
    console.log('🌐 Visit http://localhost:3000/portfolio to see your images');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding portfolio:', error);
    process.exit(1);
  }
};

seedPortfolio();
