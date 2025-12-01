const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { protect, adminOnly } = require('../middleware/auth');
const nodemailer = require('nodemailer');

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Send notification email
const sendBookingNotification = async (booking) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `New Booking: ${booking.makeupType}`,
    html: `
      <h2>New Booking Received</h2>
      <p><strong>Client:</strong> ${booking.clientName}</p>
      <p><strong>Email:</strong> ${booking.email}</p>
      <p><strong>Makeup Type:</strong> ${booking.makeupType}</p>
      <p><strong>Event Date:</strong> ${new Date(booking.eventDate).toLocaleDateString()}</p>
      <p><strong>Event Time:</strong> ${booking.eventTime}</p>
      <p><strong>Location:</strong> ${booking.location || 'N/A'}</p>
      <p><strong>Message:</strong> ${booking.message || 'N/A'}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Email send error:', error);
  }
};

// Create booking (public)
router.post('/', async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    
    // Send notification
    await sendBookingNotification(booking);

    res.status(201).json({
      message: 'Booking created successfully! We will contact you soon.',
      booking
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all bookings (admin only)
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};
    const bookings = await Booking.find(query).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single booking
router.get('/:id', protect, adminOnly, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update booking status (admin only)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete booking (admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
