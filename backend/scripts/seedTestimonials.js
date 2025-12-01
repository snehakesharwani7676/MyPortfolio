const mongoose = require('mongoose');
const Testimonial = require('../models/Testimonial');
require('dotenv').config();

const testimonialsData = [
  {
    clientName: 'Priya Sharma',
    rating: 5,
    review: 'Sneha did an amazing job on my bridal makeup! I felt like a princess on my wedding day. Her attention to detail and professionalism is outstanding. Highly recommended!',
    makeupType: 'Bridal Makeup',
    isApproved: true
  },
  {
    clientName: 'Anjali Verma',
    rating: 5,
    review: 'Best makeup artist in Prayagraj! My engagement makeup was flawless and lasted the entire event. Sneha is so talented and understanding. Thank you!',
    makeupType: 'Engagement Makeup',
    isApproved: true
  },
  {
    clientName: 'Riya Singh',
    rating: 5,
    review: 'I loved my glam makeup for the party! Sneha understood exactly what I wanted and delivered beyond expectations. The makeup was perfect for photos too!',
    makeupType: 'Glam Makeup',
    isApproved: true
  },
  {
    clientName: 'Neha Gupta',
    rating: 5,
    review: 'Sneha is a true professional! My reception makeup was stunning and I received so many compliments. She made me feel confident and beautiful.',
    makeupType: 'Reception Makeup',
    isApproved: true
  },
  {
    clientName: 'Kavya Mishra',
    rating: 5,
    review: 'Amazing experience! The bridal makeup was exactly what I dreamed of. Sneha is patient, skilled, and very creative. Worth every penny!',
    makeupType: 'Bridal Makeup',
    isApproved: true
  },
  {
    clientName: 'Simran Patel',
    rating: 5,
    review: 'I got my hair keratin treatment done and the results are fantastic! My hair is so smooth and manageable now. Highly recommend Sneha for hair services!',
    makeupType: 'Keratin Treatment',
    isApproved: true
  },
  {
    clientName: 'Divya Yadav',
    rating: 5,
    review: 'The fantasy makeup for my photoshoot was incredible! Sneha is so creative and brought my vision to life. The photos turned out amazing!',
    makeupType: 'Fantasy Makeup',
    isApproved: true
  },
  {
    clientName: 'Pooja Tiwari',
    rating: 5,
    review: 'Best facial experience ever! My skin was glowing after the treatment. Sneha uses quality products and her technique is excellent.',
    makeupType: 'Facial Treatment',
    isApproved: true
  },
  {
    clientName: 'Sakshi Dubey',
    rating: 5,
    review: 'My engagement makeup was perfect! Natural yet glamorous. Sneha listened to all my preferences and created the perfect look. Thank you so much!',
    makeupType: 'Engagement Makeup',
    isApproved: true
  },
  {
    clientName: 'Megha Srivastava',
    rating: 5,
    review: 'Loved the nail art! So creative and beautiful. Sneha has amazing skills and the designs lasted for weeks. Will definitely come back!',
    makeupType: 'Nail Art',
    isApproved: true
  }
];

const seedTestimonials = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing testimonials
    await Testimonial.deleteMany({});
    console.log('🗑️  Cleared existing testimonials');

    // Insert new testimonials
    await Testimonial.insertMany(testimonialsData);
    console.log('✅ Added 10 client testimonials');

    console.log('\n⭐ All testimonials have 5-star ratings!');
    console.log('🎉 Testimonials seeded successfully!');
    console.log('🌐 Visit http://localhost:3000 to see testimonials on homepage');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding testimonials:', error);
    process.exit(1);
  }
};

seedTestimonials();
