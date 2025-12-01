import React, { useState } from 'react';
import { sendContactMessage } from '../../services/api';
import { toast } from 'react-toastify';
import { FaEnvelope, FaMapMarkerAlt, FaInstagram, FaFacebook } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await sendContactMessage(formData);
      toast.success(response.data.message);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <div className="container">
          <h1>Get In Touch</h1>
          <p>Let's create your perfect look for your special day</p>
        </div>
      </div>

      <div className="container section">
        <div className="contact-content">
          <div className="contact-info-section">
            <h2>Contact Information</h2>
            <p>Feel free to reach out through any of these channels</p>

            <div className="contact-details">
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <div>
                  <h4>Email</h4>
                  <p>snehakesharwani76@gmail.com</p>
                </div>
              </div>

              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <div>
                  <h4>Location</h4>
                  <p>Prayagraj, India</p>
                </div>
              </div>

              <div className="contact-item">
                <FaInstagram className="contact-icon" />
                <div>
                  <h4>Instagram</h4>
                  <p>@sneha_kesharwani13</p>
                </div>
              </div>
            </div>

            <div className="social-section">
              <h3>Follow Me on Social Media</h3>
              <div className="social-icons">
                <a href="https://www.instagram.com/sneha_kesharwani13" target="_blank" rel="noopener noreferrer" title="@sneha_kesharwani13">
                  <FaInstagram />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook">
                  <FaFacebook />
                </a>
              </div>
              <p style={{ marginTop: '15px', color: '#666' }}>@sneha_kesharwani13</p>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Send a Message</h2>
            
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name *"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email *"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject *"
                required
              />
            </div>

            <div className="form-group">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                placeholder="Your Message *"
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
