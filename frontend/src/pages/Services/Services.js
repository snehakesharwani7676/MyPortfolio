import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getServices } from '../../services/api';
import { FaClock, FaCheck } from 'react-icons/fa';
import './Services.css';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await getServices();
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="services-page">
      <div className="services-header">
        <div className="container">
          <h1>Our Services</h1>
          <p>Professional makeup services for every occasion</p>
        </div>
      </div>

      <div className="container section">
        <div className="services-grid">
          {services.map((service) => (
            <div key={service._id} className="service-card">
              <span className="service-category-badge">{service.category}</span>
              {service.images && service.images[0] && (
                <div className="service-image">
                  <img src={service.images[0]} alt={service.name} />
                </div>
              )}
              <div className="service-content">
                <h3>{service.name}</h3>
                <p className="service-description">{service.description}</p>
                
                <div className="service-details">
                  {service.duration && (
                    <div className="service-duration">
                      <FaClock /> {service.duration}
                    </div>
                  )}
                </div>

                {service.includes && service.includes.length > 0 && (
                  <div className="service-includes">
                    <h4>What's Included:</h4>
                    <ul>
                      {service.includes.map((item, index) => (
                        <li key={index}>
                          <FaCheck /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Link to="/booking" className="btn btn-primary">
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {services.length === 0 && (
          <div className="no-services">
            <p>No services available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
