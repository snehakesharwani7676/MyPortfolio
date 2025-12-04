import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPortfolioItems } from '../../services/api';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './Portfolio.css';

const HairPortfolio = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState([]);

  const categories = [
    'All', 'Hair-do Gallery', 'Keratin', 'Rebonding', 
    'Botox', 'Smoothening', 'Anti-Hairfall Treatment', 
    'Anti-Dandruff Treatment', 'Global Hair Color with Highlights'
  ];

  useEffect(() => {
    fetchPortfolio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    filterItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, portfolioItems]);

  const fetchPortfolio = async () => {
    try {
      const response = await getPortfolioItems();
      // Filter only hair categories
      const hairItems = response.data.filter(item => 
        categories.includes(item.category)
      );
      setPortfolioItems(hairItems);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      setPortfolioItems([]);
    } finally {
      setLoading(false);
    }
  };

  const filterItems = () => {
    if (selectedCategory === 'All') {
      setFilteredItems(portfolioItems);
    } else {
      setFilteredItems(portfolioItems.filter(item => item.category === selectedCategory));
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const openLightbox = (item, index) => {
    const images = item.images.map(img => img.url);
    setLightboxImages(images);
    setPhotoIndex(index);
    setLightboxOpen(true);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="portfolio-page">
      <div className="portfolio-header">
        <div className="container">
          <h1>Hair Portfolio</h1>
          <p>Professional hair treatments and styling services</p>
        </div>
      </div>

      <div className="container">
        <div className="portfolio-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              <span>{category}</span>
            </button>
          ))}
        </div>

        <div className="portfolio-grid">
          {filteredItems.map((item) => (
            <div key={item._id} className="portfolio-item">
              <div className="portfolio-image" onClick={() => openLightbox(item, 0)}>
                <img 
                  src={item.afterImage || item.images[0]?.url} 
                  alt={item.title}
                />
                <div className="portfolio-overlay">
                  <div className="portfolio-info">
                    <h3>{item.title}</h3>
                    {item.clientName && <p className="client-name">{item.clientName}</p>}
                    <p className="category-tag">{item.category}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="no-results">
            <p>No portfolio items found in this category.</p>
          </div>
        )}
      </div>

      {lightboxOpen && (
        <Lightbox
          mainSrc={lightboxImages[photoIndex]}
          nextSrc={lightboxImages[(photoIndex + 1) % lightboxImages.length]}
          prevSrc={lightboxImages[(photoIndex + lightboxImages.length - 1) % lightboxImages.length]}
          onCloseRequest={() => setLightboxOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + lightboxImages.length - 1) % lightboxImages.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % lightboxImages.length)
          }
        />
      )}
    </div>
  );
};

export default HairPortfolio;
