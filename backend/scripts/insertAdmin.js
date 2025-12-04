const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const insertAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Define User schema inline
    const userSchema = new mongoose.Schema({
      name: String,
      email: { type: String, unique: true, lowercase: true },
      password: String,
      role: { type: String, enum: ['admin', 'user'], default: 'user' },
      createdAt: { type: Date, default: Date.now }
    });

    const User = mongoose.model('User', userSchema);

    // Delete existing admin
    await User.deleteMany({ role: 'admin' });
    console.log('🗑️  Cleared existing admin users');

    // Hash password manually
    const hashedPassword = await bcrypt.hash('Sneha@91', 10);

    // Insert admin directly
    const admin = await User.create({
      name: 'Sneha Kesharwani',
      email: 'snehakesharwani76@gmail.com',
      password: hashedPassword,
      role: 'admin'
    });

    console.log('✅ Admin user created successfully!');
    console.log('-----------------------------------');
    console.log('Email: snehakesharwani76@gmail.com');
    console.log('Password: Sneha@91');
    console.log('-----------------------------------');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

insertAdmin();
