const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    // Allow localhost and Netlify domains
    if (
      origin.includes('localhost') ||
      origin.includes('netlify.app') ||
      origin === process.env.FRONTEND_URL
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/makeup-portfolio')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/portfolio', require('./routes/portfolio'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/services', require('./routes/services'));
app.use('/api/blog', require('./routes/blog'));
app.use('/api/contact', require('./routes/contact'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Setup admin endpoint
app.get('/api/setup-admin', async (req, res) => {
  try {
    const User = require('./models/User');
    
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      return res.json({ 
        message: 'Admin already exists', 
        email: existingAdmin.email,
        created: existingAdmin.createdAt
      });
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'snehakesharwani76@gmail.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Sneha@91';
    
    const admin = await User.create({
      name: process.env.ADMIN_NAME || 'Sneha Kesharwani',
      email: adminEmail,
      password: adminPassword,
      role: 'admin'
    });

    res.json({ 
      success: true, 
      message: 'Admin created successfully',
      email: admin.email,
      password: adminPassword,
      note: 'Password is hashed in database'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
