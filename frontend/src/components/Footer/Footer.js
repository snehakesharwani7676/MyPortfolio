import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaYoutube, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Sneha Kesharwani</h3>
            <p>Certified Beautician & Makeup Artist</p>
            <p style={{ marginTop: '10px', fontSize: '0.95rem' }}>Creating elegant transformations for weddings, engagements, and premium events.</p>
            <div className="social-links">
              <a href="https://www.instagram.com/sneha_kesharwani13" target="_blank" rel="noopener noreferrer" title="Follow on Instagram">
                <FaInstagram />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Follow on Facebook">
                <FaFacebook />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" title="Subscribe on YouTube">
                <FaYoutube />
              </a>
            </div>
            <p style={{ marginTop: '10px', fontSize: '0.9rem', color: '#ccc' }}>@sneha_kesharwani13</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/client-work">Client Work</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li>Bridal Makeup</li>
              <li>Engagement Makeup</li>
              <li>Glam Makeup</li>
              <li>Reception Look</li>
              <li>Fashion/Art Makeup</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <p><FaEnvelope /> <a href="mailto:snehakesharwani76@gmail.com">snehakesharwani76@gmail.com</a></p>
              <p><FaMapMarkerAlt /> Prayagraj, India</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Sneha Kesharwani - Makeup Artist. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/admin/login">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
