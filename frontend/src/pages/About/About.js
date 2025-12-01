import React from 'react';
import { FaAward, FaPalette, FaHeart } from 'react-icons/fa';
import './About.css';

const About = () => {
  const skills = [
    'Bridal & Engagement Makeup',
    'Reception & Glam Makeup',
    'Fantasy & Special Effects',
    'Advanced Hair Styling',
    'Keratin & Rebonding Treatments',
    'Skin Analysis & Facials',
    'Nail Art & Extensions',
    'Professional Waxing',
    'Color Theory & Analysis'
  ];

  const products = [
    'MAC Cosmetics',
    'Huda Beauty',
    'Anastasia Beverly Hills',
    'Urban Decay',
    'NARS',
    'Fenty Beauty',
    'Maybelline',
    'L\'Oréal Professional'
  ];

  return (
    <div className="about-page">
      <div className="about-header">
        <div className="container">
          <h1>About Me</h1>
          <p>Certified Beautician & Makeup Artist | Prayagraj, India</p>
        </div>
      </div>

      <div className="container section">
        <div className="about-intro">
          <div className="about-image">
            <img src="/images/about-me.jpg" alt="Makeup Artist" />
          </div>
          <div className="about-text">
            <h2>Hi, I'm Sneha Kesharwani!</h2>
            <p>
              I'm a certified beautician and makeup artist with formal training from Orane International 
              School and hands-on salon experience. I specialize in bridal makeup, advanced hair styling, 
              skin analysis, and creating elegant transformations for weddings, engagements, and premium events.
            </p>
            <p>
              With a Post Graduate Diploma in Professional Makeup & Aesthetics and Fashion Designer 
              Certification, I bring creativity, precision, and professionalism to every client. 
              My passion is delivering premium beauty experiences that make you feel confident and beautiful 
              on your special day.
            </p>
          </div>
        </div>

        <div className="about-features">
          <div className="feature-card">
            <FaPalette className="feature-icon" />
            <h3>Creative Excellence</h3>
            <p>Specialized in bridal, glam, and fantasy makeup with precision and creativity</p>
          </div>
          <div className="feature-card">
            <FaAward className="feature-icon" />
            <h3>Certified Professional</h3>
            <p>PGDE from Orane International & Fashion Designer Certification</p>
          </div>
          <div className="feature-card">
            <FaHeart className="feature-icon" />
            <h3>Premium Experience</h3>
            <p>Delivering elegant transformations with salon-quality results</p>
          </div>
        </div>

        <div className="about-section">
          <h2>My Skills</h2>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-tag">{skill}</div>
            ))}
          </div>
        </div>

        <div className="about-section">
          <h2>Products I Use</h2>
          <p className="section-subtitle">
            I work with premium, high-quality makeup brands to ensure the best results
          </p>
          <div className="products-grid">
            {products.map((product, index) => (
              <div key={index} className="product-tag">{product}</div>
            ))}
          </div>
        </div>

        <div className="about-section philosophy">
          <h2>My Philosophy</h2>
          <blockquote>
            "I believe in delivering elegant transformations and premium beauty experiences 
            with creativity, precision, and professionalism. Every client deserves to feel 
            confident and beautiful, and I'm passionate about making that happen."
          </blockquote>
        </div>

        <div className="about-section">
          <h2>Education & Training</h2>
          <div className="education-grid">
            <div className="education-card">
              <h3>Post Graduate Diploma in Professional Makeup & Aesthetics</h3>
              <p className="institution">Orane International School</p>
              <p className="description">Comprehensive training in makeup artistry, hair treatments, and skincare services</p>
            </div>
            <div className="education-card">
              <h3>Fashion Designer Certification</h3>
              <p className="institution">Ministry of Skills Development and Entrepreneurship</p>
              <p className="description">Professional certification in fashion design and styling</p>
            </div>
            <div className="education-card">
              <h3>Salon Internship</h3>
              <p className="institution">Professional Salon (6 Months)</p>
              <p className="description">Hands-on training with licensed beauticians, client interaction, and industry best practices</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
