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

    // Get admin credentials from environment variables or use defaults
    const adminEmail = process.env.ADMIN_EMAIL || 'snehakesharwani76@gmail.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Sneha@2025';
    const adminName = process.env.ADMIN_NAME || 'Sneha Kesharwani';

    // Create the single admin user
    const admin = await User.create({
      name: adminName,
      email: adminEmail,
      password: adminPassword, // Will be hashed automatically
      role: 'admin'
    });

    console.log('✅ Admin user created successfully!');
    console.log('-----------------------------------');
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
    console.log('-----------------------------------');
    console.log('⚠️  This is the ONLY admin account. No registration allowed!');
    console.log('💡 Change these credentials in production via .env file');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    process.exit(1);
  }
};

createAdminUser();
