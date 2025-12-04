import React, { useEffect, useState } from 'react';
import { getPortfolioItems } from '../../services/api';
import './ClientWorkHistory.css';

const ClientWorkHistory = () => {
  const [workHistory, setWorkHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkHistory();
  }, []);

  const fetchWorkHistory = async () => {
    try {
      const response = await getPortfolioItems();
      // Filter items that have client information
      const clientWork = response.data.filter(item => item.clientName);
      setWorkHistory(clientWork);
    } catch (error) {
      console.error('Error fetching work history:', error);
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
    <div className="client-work-page">
      <div className="client-work-header">
        <div className="container">
          <h1>Client Work History</h1>
          <p>Real transformations, real stories, real results</p>
        </div>
      </div>

      <div className="container section">
        {workHistory.map((work, index) => (
          <div key={work._id} className={`work-item ${index % 2 === 0 ? 'left' : 'right'}`}>
            <div className="work-content">
              <div className="work-info">
                <span className="work-number">#{workHistory.length - index}</span>
                <h2>{work.title}</h2>
                <div className="work-meta">
                  <span className="category-badge">{work.category}</span>
                </div>
                
                {work.description && (
                  <div className="work-story">
                    <h3>The Story</h3>
                    <p>{work.description}</p>
                  </div>
                )}

                {work.tags && work.tags.length > 0 && (
                  <div className="work-tags">
                    {work.tags.map((tag, i) => (
                      <span key={i} className="tag">#{tag}</span>
                    ))}
                  </div>
                )}
              </div>

              <div className="work-images">
                <div className="work-gallery">
                  {work.images.slice(0, 3).map((img, i) => (
                    <img key={i} src={img.url} alt={`${work.title} ${i + 1}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        {workHistory.length === 0 && (
          <div className="no-work">
            <p>No client work history available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientWorkHistory;
