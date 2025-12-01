import React, { useState } from 'react';
import { createBooking } from '../../services/api';
import { toast } from 'react-toastify';
import { FaCalendar, FaClock } from 'react-icons/fa';
import './Booking.css';

const Booking = () => {
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    makeupType: '',
    eventDate: '',
    eventTime: '',
    location: '',
    message: '',
    referenceImage: ''
  });
  const [loading, setLoading] = useState(false);

  const makeupTypes = [
    'Bridal',
    'Engagement',
    'Glam',
    'Reception',
    'Party',
    'Fashion/Art',
    'Photoshoot'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await createBooking(formData);
      toast.success(response.data.message);
      
      // Reset form
      setFormData({
        clientName: '',
        email: '',
        makeupType: '',
        eventDate: '',
        eventTime: '',
        location: '',
        message: '',
        referenceImage: ''
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-header">
        <div className="container">
          <h1>Book Your Appointment</h1>
          <p>Let's create something beautiful together</p>
        </div>
      </div>

      <div className="container">
        <div className="booking-content">
          <div className="booking-info">
            <h2>Why Book With Us?</h2>
            <ul>
              <li>✨ Professional makeup artistry</li>
              <li>💄 High-quality products (MAC, Huda Beauty, etc.)</li>
              <li>📸 Perfect for photos and videos</li>
              <li>⏰ Punctual and reliable service</li>
              <li>💝 Personalized consultation</li>
              <li>🎨 Creative and trendy looks</li>
            </ul>

            <div className="booking-steps">
              <h3>Booking Process</h3>
              <div className="step">
                <span className="step-number">1</span>
                <p>Fill out the booking form</p>
              </div>
              <div className="step">
                <span className="step-number">2</span>
                <p>We'll contact you within 24 hours</p>
              </div>
              <div className="step">
                <span className="step-number">3</span>
                <p>Confirm your appointment</p>
              </div>
              <div className="step">
                <span className="step-number">4</span>
                <p>Get ready to look stunning!</p>
              </div>
            </div>
          </div>

          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label>Makeup Type *</label>
              <select
                name="makeupType"
                value={formData.makeupType}
                onChange={handleChange}
                required
              >
                <option value="">Select makeup type</option>
                {makeupTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label><FaCalendar /> Event Date *</label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="form-group">
                <label><FaClock /> Event Time *</label>
                <input
                  type="time"
                  name="eventTime"
                  value={formData.eventTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Event location (optional)"
              />
            </div>

            <div className="form-group">
              <label>Reference Image URL (Optional)</label>
              <input
                type="url"
                name="referenceImage"
                value={formData.referenceImage || ''}
                onChange={handleChange}
                placeholder="Paste image URL or Instagram link"
              />
              <small style={{ color: '#666', fontSize: '0.85rem' }}>
                You can share an Instagram post link or image URL as reference
              </small>
            </div>

            <div className="form-group">
              <label>Additional Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Tell us about your preferences, skin concerns, or any special requests..."
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Submitting...' : 'Book Appointment'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;
