import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { getPortfolioItems, getTestimonials } from '../../services/api';
import { FaStar } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const [featuredWorks, setFeaturedWorks] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [portfolioRes, testimonialsRes] = await Promise.all([
        getPortfolioItems({ featured: true }),
        getTestimonials()
      ]);
      setFeaturedWorks(portfolioRes.data.slice(0, 5));
      setTestimonials(testimonialsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Set empty arrays so the page still renders
      setFeaturedWorks([]);
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { name: 'Bridal Makeup', image: '/images/portfolio/bridal/BRmakeup1.jpg', link: '/portfolio?category=Bridal' },
    { name: 'Engagement', image: '/images/portfolio/engagement/ENmakeup1.jpg', link: '/portfolio?category=Engagement' },
    { name: 'Glam Makeup', image: '/images/portfolio/glam/GLmakeup1.jpg', link: '/portfolio?category=Glam' },
    { name: 'Reception', image: '/images/portfolio/reception/RCmakeup1.jpg', link: '/portfolio?category=Reception' },
    { name: 'Fashion/Art', image: '/images/portfolio/fashion/FAmakeup1.jpg', link: '/portfolio?category=Fashion/Art' }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          loop
          className="hero-slider"
        >
          <SwiperSlide>
            <div className="hero-slide" style={{ backgroundImage: 'url(/images/hero/hero1.png)' }}>
              <div className="hero-content">
                <h1>Sneha Kesharwani</h1>
                <p>Certified Beautician & Makeup Artist</p>
                <p style={{ fontSize: '1.2rem', marginTop: '10px' }}>Bridal • Glam • Fashion Makeup</p>
                <div className="hero-buttons">
                  <Link to="/portfolio" className="btn btn-primary">View Portfolio</Link>
                  <Link to="/contact" className="btn btn-outline">Contact Me</Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="hero-slide" style={{ backgroundImage: 'url(/images/hero/hero2.png)' }}>
              <div className="hero-content">
                <h1>Transform Your Look</h1>
                <p>Professional Makeup for Weddings & Special Events</p>
                <p style={{ fontSize: '1.1rem', marginTop: '10px', opacity: '0.95' }}>Prayagraj, India</p>
                <div className="hero-buttons">
                  <Link to="/services" className="btn btn-primary">Our Services</Link>
                  <Link to="/contact" className="btn btn-outline">Book Now</Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Categories Section */}
      <section className="section categories-section">
        <div className="container">
          <h2 className="section-title">Our Specialties</h2>
          <div className="categories-grid">
            {categories.map((category, index) => (
              <Link to={category.link} key={index} className="category-card">
                <div className="category-image">
                  <img src={category.image} alt={category.name} />
                  <div className="category-overlay">
                    <h3>{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work */}
      {!loading && featuredWorks.length > 0 && (
        <section className="section featured-section">
          <div className="container">
            <h2 className="section-title">Featured Work</h2>
            <div className="featured-grid">
              {featuredWorks.map((work) => (
                <div key={work._id} className="featured-card">
                  <img src={work.afterImage || work.images[0]?.url} alt={work.title} />
                  <div className="featured-info">
                    <h3>{work.title}</h3>
                    <p>{work.category}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center" style={{ marginTop: '40px' }}>
              <Link to="/portfolio" className="btn btn-primary">View All Work</Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {!loading && testimonials.length > 0 && (
        <section className="section testimonials-section">
          <div className="container">
            <h2 className="section-title">What Clients Say</h2>
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              autoplay={{ delay: 4000 }}
              pagination={{ clickable: true }}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
              }}
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial._id}>
                  <div className="testimonial-card">
                    {testimonial.clientImage && (
                      <img src={testimonial.clientImage} alt={testimonial.clientName} />
                    )}
                    <div className="rating">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                    <p className="review">"{testimonial.review}"</p>
                    <h4>{testimonial.clientName}</h4>
                    <p className="makeup-type">{testimonial.makeupType}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Transform Your Look?</h2>
          <p>Book your appointment today and let's create magic together!</p>
          <Link to="/booking" className="btn btn-primary">Book Now</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
