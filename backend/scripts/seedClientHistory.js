const mongoose = require('mongoose');
const Portfolio = require('../models/Portfolio');
require('dotenv').config();

const clientHistoryData = [
  // Bridal Work
  {
    title: 'Traditional Bridal Makeup - Priya\'s Wedding',
    category: 'Bridal',
    clientName: 'Priya Sharma',
    eventDate: new Date('2024-11-15'),
    description: 'Complete bridal makeup package for a traditional Indian wedding. Created a timeless look with HD makeup, intricate eye details, and perfect contouring. The bride wanted a classic red and gold theme that complemented her lehenga beautifully.',
    images: [{ url: '/images/portfolio/bridal/BRmakeup1.jpg', caption: 'Final bridal look' }],
    beforeImage: '/images/portfolio/bridal/BRmakeup1.jpg',
    afterImage: '/images/portfolio/bridal/BRmakeup1.jpg',
    tags: ['bridal', 'traditional', 'HD makeup', 'wedding'],
    featured: true
  },
  {
    title: 'Modern Bridal Look - Anjali\'s Big Day',
    category: 'Bridal',
    clientName: 'Anjali Verma',
    eventDate: new Date('2024-10-20'),
    description: 'Contemporary bridal makeup with soft glam aesthetics. Used airbrush technique for flawless base, subtle smokey eyes, and nude lips. The bride preferred a natural yet glamorous look that lasted throughout the 12-hour celebration.',
    images: [{ url: '/images/portfolio/bridal/BRmakeup2.jpg', caption: 'Soft glam bridal makeup' }],
    beforeImage: '/images/portfolio/bridal/BRmakeup2.jpg',
    afterImage: '/images/portfolio/bridal/BRmakeup2.jpg',
    tags: ['bridal', 'modern', 'airbrush', 'soft glam'],
    featured: true
  },
  {
    title: 'Royal Bridal Transformation',
    category: 'Bridal',
    clientName: 'Riya Singh',
    eventDate: new Date('2024-12-01'),
    description: 'Regal bridal makeup for a palace wedding. Heavy yet elegant makeup with dramatic eyes, perfect winged liner, and bold lips. Incorporated traditional jewelry styling and dupatta draping for the complete royal look.',
    images: [{ url: '/images/portfolio/bridal/BRmakeup3.jpg', caption: 'Royal bridal elegance' }],
    beforeImage: '/images/portfolio/bridal/BRmakeup3.jpg',
    afterImage: '/images/portfolio/bridal/BRmakeup3.jpg',
    tags: ['bridal', 'royal', 'traditional', 'heavy makeup'],
    featured: true
  },

  // Engagement Work
  {
    title: 'Elegant Engagement Look - Neha\'s Ceremony',
    category: 'Engagement',
    clientName: 'Neha Gupta',
    eventDate: new Date('2024-09-10'),
    description: 'Sophisticated engagement makeup with rose gold tones. Created a romantic look with dewy skin, soft pink lips, and shimmery eyes. The makeup was designed to photograph beautifully under both natural and artificial lighting.',
    images: [{ url: '/images/portfolio/engagement/ENmakeup1.jpg', caption: 'Rose gold engagement look' }],
    beforeImage: '/images/portfolio/engagement/ENmakeup1.jpg',
    afterImage: '/images/portfolio/engagement/ENmakeup1.jpg',
    tags: ['engagement', 'rose gold', 'romantic', 'dewy'],
    featured: true
  },
  {
    title: 'Chic Engagement Makeup',
    category: 'Engagement',
    clientName: 'Kavya Mishra',
    eventDate: new Date('2024-11-05'),
    description: 'Modern and chic engagement makeup for an evening ceremony. Used bronze and copper tones to complement the client\'s outfit. Added subtle highlighter for that perfect glow in photos.',
    images: [{ url: '/images/portfolio/engagement/ENmakeup2.jpg', caption: 'Bronze engagement makeup' }],
    beforeImage: '/images/portfolio/engagement/ENmakeup2.jpg',
    afterImage: '/images/portfolio/engagement/ENmakeup2.jpg',
    tags: ['engagement', 'bronze', 'modern', 'evening'],
    featured: false
  },

  // Glam Makeup Work
  {
    title: 'Party Glam - Simran\'s Birthday Bash',
    category: 'Glam',
    clientName: 'Simran Patel',
    eventDate: new Date('2024-10-15'),
    description: 'Bold and glamorous party makeup for a milestone birthday celebration. Created a stunning look with cut crease eyeshadow, dramatic lashes, and glossy lips. The makeup stayed flawless throughout the night.',
    images: [{ url: '/images/portfolio/glam/GLmakeup1.jpg', caption: 'Party glam perfection' }],
    beforeImage: '/images/portfolio/glam/GLmakeup1.jpg',
    afterImage: '/images/portfolio/glam/GLmakeup1.jpg',
    tags: ['glam', 'party', 'bold', 'dramatic'],
    featured: true
  },
  {
    title: 'Festival Glam Look',
    category: 'Glam',
    clientName: 'Divya Yadav',
    eventDate: new Date('2024-11-12'),
    description: 'Festive glam makeup for Diwali celebration. Used vibrant colors, shimmer, and traditional elements. Created a perfect balance between traditional and contemporary makeup styles.',
    images: [{ url: '/images/portfolio/glam/GLmakeup2.jpg', caption: 'Festival glam' }],
    beforeImage: '/images/portfolio/glam/GLmakeup2.jpg',
    afterImage: '/images/portfolio/glam/GLmakeup2.jpg',
    tags: ['glam', 'festival', 'diwali', 'traditional'],
    featured: false
  },

  // Reception Work
  {
    title: 'Reception Evening Look',
    category: 'Reception',
    clientName: 'Pooja Tiwari',
    eventDate: new Date('2024-10-25'),
    description: 'Glamorous reception makeup for an evening celebration. Created a sophisticated look with smokey eyes, nude lips, and perfect contouring. The makeup was designed to look stunning under party lights.',
    images: [{ url: '/images/portfolio/reception/RCmakeup1.jpg', caption: 'Reception glam' }],
    beforeImage: '/images/portfolio/reception/RCmakeup1.jpg',
    afterImage: '/images/portfolio/reception/RCmakeup1.jpg',
    tags: ['reception', 'evening', 'smokey eyes', 'glamorous'],
    featured: true
  },
  {
    title: 'Elegant Reception Makeup',
    category: 'Reception',
    clientName: 'Sakshi Dubey',
    eventDate: new Date('2024-11-20'),
    description: 'Elegant and timeless reception makeup. Focused on flawless skin, defined features, and a classic red lip. The look was sophisticated yet modern, perfect for the grand reception venue.',
    images: [{ url: '/images/portfolio/reception/RCmakeup2.jpg', caption: 'Classic reception elegance' }],
    beforeImage: '/images/portfolio/reception/RCmakeup2.jpg',
    afterImage: '/images/portfolio/reception/RCmakeup2.jpg',
    tags: ['reception', 'elegant', 'classic', 'red lip'],
    featured: false
  },

  // Fashion/Art Work
  {
    title: 'Editorial Fashion Shoot',
    category: 'Fashion/Art',
    clientName: 'Megha Srivastava',
    eventDate: new Date('2024-09-20'),
    description: 'Creative editorial makeup for a fashion magazine photoshoot. Experimented with bold colors, graphic liner, and artistic elements. The look was avant-garde yet wearable, perfect for high-fashion photography.',
    images: [{ url: '/images/portfolio/fashion/FAmakeup1.jpg', caption: 'Editorial fashion makeup' }],
    beforeImage: '/images/portfolio/fashion/FAmakeup1.jpg',
    afterImage: '/images/portfolio/fashion/FAmakeup1.jpg',
    tags: ['fashion', 'editorial', 'creative', 'photoshoot'],
    featured: true
  },
  {
    title: 'Artistic Makeup Creation',
    category: 'Fashion/Art',
    clientName: 'Portfolio Work',
    eventDate: new Date('2024-10-05'),
    description: 'Fantasy and artistic makeup for portfolio building. Created an ethereal look with unconventional color combinations and intricate details. This piece showcases creativity and technical skills.',
    images: [{ url: '/images/portfolio/fashion/FAmakeup2.jpg', caption: 'Artistic makeup art' }],
    beforeImage: '/images/portfolio/fashion/FAmakeup2.jpg',
    afterImage: '/images/portfolio/fashion/FAmakeup2.jpg',
    tags: ['art', 'fantasy', 'creative', 'portfolio'],
    featured: false
  },

  // Additional Bridal Work
  {
    title: 'Destination Wedding Bridal Makeup',
    category: 'Bridal',
    clientName: 'Isha Agarwal',
    eventDate: new Date('2024-11-28'),
    description: 'Bridal makeup for a destination wedding in Goa. Created a tropical-inspired look with warm tones, waterproof products, and long-lasting formula to withstand humidity and beach conditions.',
    images: [{ url: '/images/portfolio/bridal/BRmakeup4.jpg', caption: 'Destination wedding bride' }],
    beforeImage: '/images/portfolio/bridal/BRmakeup4.jpg',
    afterImage: '/images/portfolio/bridal/BRmakeup4.jpg',
    tags: ['bridal', 'destination wedding', 'waterproof', 'beach'],
    featured: false
  },

  // Glam Work
  {
    title: 'New Year Party Glam',
    category: 'Glam',
    clientName: 'Tanvi Sharma',
    eventDate: new Date('2024-12-31'),
    description: 'Stunning New Year party makeup with metallic accents and shimmer. Created a show-stopping look with glitter, bold lips, and dramatic eyes perfect for the celebration.',
    images: [{ url: '/images/portfolio/glam/GLmakeup5.jpg', caption: 'New Year glam' }],
    beforeImage: '/images/portfolio/glam/GLmakeup5.jpg',
    afterImage: '/images/portfolio/glam/GLmakeup5.jpg',
    tags: ['glam', 'party', 'metallic', 'new year'],
    featured: false
  }
];

const seedClientHistory = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Update existing portfolio items with client information
    console.log('📝 Adding client work history...');
    
    let updatedCount = 0;
    for (const clientWork of clientHistoryData) {
      // Find portfolio item by image URL and update with client info
      const result = await Portfolio.findOneAndUpdate(
        { 'images.url': clientWork.images[0].url },
        {
          $set: {
            clientName: clientWork.clientName,
            eventDate: clientWork.eventDate,
            description: clientWork.description,
            beforeImage: clientWork.beforeImage,
            afterImage: clientWork.afterImage,
            tags: clientWork.tags
          }
        },
        { new: true }
      );
      
      if (result) {
        updatedCount++;
      }
    }

    console.log(`✅ Updated ${updatedCount} portfolio items with client information`);

    console.log('\n📊 Client Work History Summary:');
    const clientWorks = await Portfolio.find({ clientName: { $exists: true, $ne: null } });
    console.log(`   Total client projects: ${clientWorks.length}`);
    
    const byCategory = await Portfolio.aggregate([
      { $match: { clientName: { $exists: true, $ne: null } } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    byCategory.forEach(cat => {
      console.log(`   ${cat._id}: ${cat.count} client projects`);
    });

    console.log('\n🎉 Client work history seeded successfully!');
    console.log('🌐 Visit http://localhost:3000/client-work to see your work history');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding client history:', error);
    process.exit(1);
  }
};

seedClientHistory();
