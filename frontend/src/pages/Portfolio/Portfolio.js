import React from 'react';
import { Link } from 'react-router-dom';
import './Portfolio.css';

const Portfolio = () => {
  const portfolioCategories = [
    {
      title: 'Makeup Portfolio',
      description: 'Bridal, Engagement, Glam, Fantasy & More',
      image: '/images/portfolio/bridal/BRmakeup1.jpg',
      link: '/portfolio/makeup',
      gradient: 'linear-gradient(135deg, #d4a574 0%, #c49563 100%)'
    },
    {
      title: 'Hair Portfolio',
      description: 'Keratin, Rebonding, Styling & Treatments',
      image: '/images/portfolio/bridal/BRmakeup2.jpg',
      link: '/portfolio/hair',
      gradient: 'linear-gradient(135deg, #c49563 0%, #b8845f 100%)'
    },
    {
      title: 'Skin & Nails Portfolio',
      description: 'Facials, Nail Art, Manicure & More',
      image: '/images/portfolio/bridal/BRmakeup3.jpg',
      link: '/portfolio/skin-nails',
      gradient: 'linear-gradient(135deg, #b8845f 0%, #a67350 100%)'
    }
  ];

  return (
    <div className="portfolio-page">
      <div className="portfolio-header">
        <div className="container">
          <h1>Portfolio</h1>
          <p>Explore my work across Makeup, Hair, and Skin Care</p>
        </div>
      </div>

      <div className="container section">
        <div className="portfolio-categories-grid">
          {portfolioCategories.map((category, index) => (
            <Link 
              to={category.link} 
              key={index} 
              className="portfolio-category-card"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="category-card-image">
                <img src={category.image} alt={category.title} />
                <div className="category-card-overlay" style={{ background: category.gradient }}>
                  <div className="category-card-content">
                    <h2>{category.title}</h2>
                    <p>{category.description}</p>
                    <span className="view-portfolio-btn">View Portfolio →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
