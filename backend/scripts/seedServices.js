const mongoose = require('mongoose');
const Service = require('../models/Service');
require('dotenv').config();

const servicesData = [
  // Makeup Services
  {
    name: 'Bridal Makeup',
    description: 'Complete bridal makeup package with HD makeup, hair styling, and draping. Perfect for your special day with long-lasting, photo-ready results.',
    startingPrice: 8000,
    duration: '3-4 hours',
    includes: ['HD Makeup', 'Hair Styling', 'Draping', 'False Lashes', 'Touch-up Kit', 'Pre-bridal Consultation'],
    category: 'Makeup',
    isActive: true
  },
  {
    name: 'Engagement Makeup',
    description: 'Elegant and sophisticated makeup for your engagement ceremony. Soft glam look that photographs beautifully.',
    startingPrice: 5000,
    duration: '2-3 hours',
    includes: ['Makeup Application', 'Hair Styling', 'Accessories Setting', 'Touch-ups'],
    category: 'Makeup',
    isActive: true
  },
  {
    name: 'Reception Makeup',
    description: 'Glamorous makeup for reception parties. Bold and stunning look that lasts all night.',
    startingPrice: 6000,
    duration: '2-3 hours',
    includes: ['Full Makeup', 'Hair Styling', 'Shimmer & Glow', 'Setting Spray'],
    category: 'Makeup',
    isActive: true
  },
  {
    name: 'Glam Makeup',
    description: 'Party-ready glam makeup for any special occasion. Bold eyes, perfect contour, and flawless finish.',
    startingPrice: 3500,
    duration: '1.5-2 hours',
    includes: ['Full Face Makeup', 'Contouring', 'Highlighting', 'Lip Color'],
    category: 'Makeup',
    isActive: true
  },
  {
    name: 'Self Makeup',
    description: 'Natural and elegant makeup for everyday occasions or professional events.',
    startingPrice: 2000,
    duration: '1 hour',
    includes: ['Basic Makeup', 'Natural Look', 'Light Contouring'],
    category: 'Makeup',
    isActive: true
  },
  {
    name: 'Teen Makeup',
    description: 'Age-appropriate, fresh and natural makeup for teenagers. Perfect for parties and special occasions.',
    startingPrice: 1500,
    duration: '45 minutes',
    includes: ['Light Makeup', 'Natural Colors', 'Skin-friendly Products'],
    category: 'Makeup',
    isActive: true
  },
  {
    name: 'Fantasy Makeup',
    description: 'Creative and artistic makeup for photoshoots, fashion shows, and themed events.',
    startingPrice: 4000,
    duration: '2-3 hours',
    includes: ['Creative Design', 'Special Effects', 'Body Art', 'Photography Ready'],
    category: 'Makeup',
    isActive: true
  },
  {
    name: 'Bronze Makeup',
    description: 'Warm-toned bronze makeup perfect for evening events and parties.',
    startingPrice: 3000,
    duration: '1.5 hours',
    includes: ['Bronze Tones', 'Shimmer', 'Contouring', 'Warm Glow'],
    category: 'Makeup',
    isActive: true
  },
  {
    name: 'Model Bride Makeup',
    description: 'High-fashion bridal makeup for photoshoots and portfolio work. Editorial style with perfect finish.',
    startingPrice: 10000,
    duration: '4-5 hours',
    includes: ['HD Makeup', 'Airbrush', 'Hair Styling', 'Multiple Looks', 'Touch-ups'],
    category: 'Makeup',
    isActive: true
  },

  // Hair Services
  {
    name: 'Bridal Hair Styling',
    description: 'Complete bridal hair styling with intricate designs, accessories setting, and long-lasting hold.',
    startingPrice: 4000,
    duration: '2-3 hours',
    includes: ['Hair Wash', 'Styling', 'Accessories Setting', 'Hair Spray'],
    category: 'Hair',
    isActive: true
  },
  {
    name: 'Hair-do Gallery Styling',
    description: 'Creative and trendy hairstyles for any occasion. From buns to braids to open hairstyles.',
    startingPrice: 2000,
    duration: '1-2 hours',
    includes: ['Styling', 'Setting', 'Hair Accessories'],
    category: 'Hair',
    isActive: true
  },
  {
    name: 'Keratin Treatment',
    description: 'Professional keratin treatment for smooth, frizz-free, and manageable hair.',
    startingPrice: 6000,
    duration: '3-4 hours',
    includes: ['Hair Analysis', 'Keratin Application', 'Blow Dry', 'After-care Products'],
    category: 'Hair',
    isActive: true
  },
  {
    name: 'Hair Rebonding',
    description: 'Permanent hair straightening treatment for silky smooth and straight hair.',
    startingPrice: 5000,
    duration: '4-5 hours',
    includes: ['Hair Wash', 'Rebonding Treatment', 'Straightening', 'Serum'],
    category: 'Hair',
    isActive: true
  },
  {
    name: 'Hair Botox Treatment',
    description: 'Deep conditioning treatment that repairs damaged hair and adds shine.',
    startingPrice: 4500,
    duration: '2-3 hours',
    includes: ['Hair Analysis', 'Botox Application', 'Steam Treatment', 'Blow Dry'],
    category: 'Hair',
    isActive: true
  },
  {
    name: 'Hair Smoothening',
    description: 'Semi-permanent smoothening treatment for manageable and smooth hair.',
    startingPrice: 5500,
    duration: '3-4 hours',
    includes: ['Hair Wash', 'Smoothening Treatment', 'Blow Dry', 'Serum'],
    category: 'Hair',
    isActive: true
  },

  // Skin & Nails Services
  {
    name: 'Facial Treatment',
    description: 'Professional facial treatment for glowing and healthy skin. Customized for your skin type.',
    startingPrice: 1500,
    duration: '1 hour',
    includes: ['Cleansing', 'Exfoliation', 'Massage', 'Mask', 'Moisturizing'],
    category: 'Skin',
    isActive: true
  },
  {
    name: 'Nail Art',
    description: 'Creative and trendy nail art designs for any occasion.',
    startingPrice: 800,
    duration: '45 minutes',
    includes: ['Nail Shaping', 'Design Application', 'Top Coat', 'Nail Care'],
    category: 'Nails',
    isActive: true
  },
  {
    name: 'Nail Extension',
    description: 'Professional nail extensions with gel or acrylic for long-lasting beautiful nails.',
    startingPrice: 2000,
    duration: '1.5-2 hours',
    includes: ['Extension Application', 'Shaping', 'Polish', 'Design (optional)'],
    category: 'Nails',
    isActive: true
  },
  {
    name: 'Manicure & Pedicure',
    description: 'Complete hand and foot care with nail shaping, cuticle care, and polish.',
    startingPrice: 1200,
    duration: '1.5 hours',
    includes: ['Soaking', 'Scrubbing', 'Massage', 'Nail Polish', 'Moisturizing'],
    category: 'Skin',
    isActive: true
  },
  {
    name: 'Waxing Services',
    description: 'Professional waxing services for smooth and hair-free skin.',
    startingPrice: 500,
    duration: '30-60 minutes',
    includes: ['Full Body/Partial', 'Pre-wax Treatment', 'Post-wax Care', 'Soothing Gel'],
    category: 'Skin',
    isActive: true
  }
];

const seedServices = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing services
    await Service.deleteMany({});
    console.log('🗑️  Cleared existing services');

    // Insert new services
    await Service.insertMany(servicesData);
    console.log('✅ Added 21 services');

    console.log('\n📊 Services Summary:');
    const categories = await Service.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    categories.forEach(cat => {
      console.log(`   ${cat._id}: ${cat.count} services`);
    });

    console.log('\n🎉 Services seeded successfully!');
    console.log('🌐 Visit http://localhost:3000/services to see all services');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding services:', error);
    process.exit(1);
  }
};

seedServices();
