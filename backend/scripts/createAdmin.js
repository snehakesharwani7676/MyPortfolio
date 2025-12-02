const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/makeup-portfolio');
    console.log('✅ Connected to MongoDB');

    // Delete any existing admin users first
    await User.deleteMany({ role: 'admin' });
    console.log('🗑️  Cleared existing admin users');

    // Create the single admin user
    const admin = await User.create({
      name: 'Sneha Kesharwani',
      email: 'sneha@gmail.com',
      password: 'sneha123', // Will be hashed automatically
      role: 'admin'
    });

    console.log('✅ Admin user created successfully!');
    console.log('-----------------------------------');
    console.log('Email: sneha@gmail.com');
    console.log('Password: sneha123');
    console.log('-----------------------------------');
    console.log('⚠️  This is the ONLY admin account. No registration allowed!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    process.exit(1);
  }
};

createAdminUser();
