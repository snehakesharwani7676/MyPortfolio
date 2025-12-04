import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBookings, getPortfolioItems, getAllTestimonials } from '../../services/api';
import { FaImages, FaCalendar, FaStar, FaSignOutAlt, FaUpload, FaEye, FaTrash, FaList } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    portfolioCount: 0,
    bookingsCount: 0,
    testimonialsCount: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [showAllBookings, setShowAllBookings] = useState(false);
  const [showPortfolioManager, setShowPortfolioManager] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadData, setUploadData] = useState({
    category: 'Bridal',
    imageUrl: '',
    clientName: '',
    description: ''
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchDashboardData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      const [portfolioRes, bookingsRes, testimonialsRes] = await Promise.all([
        getPortfolioItems(),
        getBookings(),
        getAllTestimonials()
      ]);

      setStats({
        portfolioCount: portfolioRes.data.length,
        bookingsCount: bookingsRes.data.length,
        testimonialsCount: testimonialsRes.data.length
      });

      setPortfolioItems(portfolioRes.data);
      setAllBookings(bookingsRes.data);
      setRecentBookings(bookingsRes.data.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  const handleDeletePortfolio = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/portfolio/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        toast.success('Portfolio item deleted successfully!');
        fetchDashboardData();
      } else {
        toast.error('Failed to delete portfolio item');
      }
    } catch (error) {
      toast.error('Error deleting portfolio item');
      console.error(error);
    }
  };

  // Function to convert Google Drive links automatically
  const convertGoogleDriveLink = (url) => {
    // Check if it's a Google Drive link
    if (url.includes('drive.google.com')) {
      // Extract FILE_ID from various Google Drive URL formats
      let fileId = null;
      
      // Format 1: https://drive.google.com/file/d/FILE_ID/view
      // eslint-disable-next-line no-useless-escape
      const match1 = url.match(/\/file\/d\/([^\/]+)/);
      if (match1) {
        fileId = match1[1];
      }
      
      // Format 2: https://drive.google.com/open?id=FILE_ID
      const match2 = url.match(/[?&]id=([^&]+)/);
      if (match2) {
        fileId = match2[1];
      }
      
      // If we found a FILE_ID, convert to direct link
      if (fileId) {
        // Remove any query parameters from fileId
        fileId = fileId.split('?')[0];
        const directLink = `https://drive.google.com/uc?export=view&id=${fileId}`;
        toast.info('Google Drive link auto-converted! ✨');
        return directLink;
      }
    }
    
    // Return original URL if not Google Drive or already in correct format
    return url;
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    
    if (!uploadData.imageUrl) {
      toast.error('Please provide an image URL');
      return;
    }

    // Automatically convert Google Drive links
    let convertedUrl = convertGoogleDriveLink(uploadData.imageUrl);
    
    // Auto-fix: Add leading slash if missing for local paths
    if (convertedUrl.startsWith('images/')) {
      convertedUrl = '/' + convertedUrl;
      toast.info('Auto-fixed: Added leading slash to path');
    }
    
    // Auto-fix: Replace spaces with dashes in filename
    if (convertedUrl.includes(' ')) {
      convertedUrl = convertedUrl.replace(/ /g, '-');
      toast.info('Auto-fixed: Replaced spaces with dashes in filename');
    }

    try {
      const token = localStorage.getItem('token');
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      
      // Generate unique title with timestamp
      const timestamp = Date.now();
      const uniqueTitle = uploadData.clientName 
        ? `${uploadData.category} - ${uploadData.clientName}`
        : `${uploadData.category} - ${timestamp}`;
      
      const response = await fetch(`${API_URL}/portfolio`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: uniqueTitle,
          category: uploadData.category,
          images: [{ url: convertedUrl, caption: uploadData.category }],
          clientName: uploadData.clientName,
          description: uploadData.description,
          afterImage: convertedUrl,
          featured: false
        })
      });

      if (response.ok) {
        toast.success('Portfolio item added successfully!');
        setShowUploadModal(false);
        setUploadData({
          category: 'Bridal',
          imageUrl: '',
          clientName: '',
          description: ''
        });
        fetchDashboardData();
      } else {
        const errorData = await response.json();
        toast.error(`Failed: ${errorData.message || 'Unknown error'}`);
        console.error('Upload error:', errorData);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      console.error('Upload exception:', error);
    }
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div className="container">
          <h1>Admin Dashboard</h1>
          <button onClick={handleLogout} className="btn btn-outline">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      <div className="container">
        <div className="stats-grid">
          <div className="stat-card">
            <FaImages className="stat-icon" />
            <h3>{stats.portfolioCount}</h3>
            <p>Portfolio Items</p>
          </div>

          <div className="stat-card">
            <FaCalendar className="stat-icon" />
            <h3>{stats.bookingsCount}</h3>
            <p>Total Bookings</p>
          </div>

          <div className="stat-card">
            <FaStar className="stat-icon" />
            <h3>{stats.testimonialsCount}</h3>
            <p>Testimonials</p>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="dashboard-section">
            <h2>Recent Bookings</h2>
            <div className="bookings-table">
              {recentBookings.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Client</th>
                      <th>Makeup Type</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((booking) => (
                      <tr key={booking._id}>
                        <td>{booking.clientName}</td>
                        <td>{booking.makeupType}</td>
                        <td>{new Date(booking.eventDate).toLocaleDateString()}</td>
                        <td>
                          <span className={`status-badge ${booking.status}`}>
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="no-data">No bookings yet</p>
              )}
            </div>
          </div>

          <div className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="action-buttons">
              <button className="action-btn" onClick={() => setShowUploadModal(true)}>
                <FaUpload /> Upload Portfolio Image
              </button>
              <button className="action-btn" onClick={() => setShowAllBookings(!showAllBookings)}>
                <FaEye /> {showAllBookings ? 'Hide' : 'View'} All Bookings
              </button>
              <button className="action-btn" onClick={() => setShowPortfolioManager(!showPortfolioManager)}>
                <FaList /> {showPortfolioManager ? 'Hide' : 'Manage'} Portfolio
              </button>
            </div>
          </div>

          {showPortfolioManager && (
            <div className="dashboard-section full-width">
              <h2>Manage Portfolio ({portfolioItems.length} items)</h2>
              <div className="portfolio-manager">
                {portfolioItems.length > 0 ? (
                  <div className="portfolio-grid-manager">
                    {portfolioItems.map((item) => (
                      <div key={item._id} className="portfolio-item-card">
                        <div className="portfolio-item-image">
                          <img src={item.afterImage || item.images[0]?.url} alt={item.title} />
                        </div>
                        <div className="portfolio-item-info">
                          <h4>{item.title}</h4>
                          <span className="category-badge">{item.category}</span>
                          {item.clientName && <p className="client-name">Client: {item.clientName}</p>}
                          <button 
                            className="btn-delete" 
                            onClick={() => handleDeletePortfolio(item._id, item.title)}
                          >
                            <FaTrash /> Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-data">No portfolio items yet</p>
                )}
              </div>
            </div>
          )}

          {showAllBookings && (
            <div className="dashboard-section">
              <h2>All Bookings ({allBookings.length})</h2>
              <div className="bookings-table">
                {allBookings.length > 0 ? (
                  <table>
                    <thead>
                      <tr>
                        <th>Client</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Makeup Type</th>
                        <th>Event Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allBookings.map((booking) => (
                        <tr key={booking._id}>
                          <td>{booking.clientName}</td>
                          <td>{booking.email}</td>
                          <td>{booking.phone}</td>
                          <td>{booking.makeupType}</td>
                          <td>{new Date(booking.eventDate).toLocaleDateString()}</td>
                          <td>
                            <span className={`status-badge ${booking.status}`}>
                              {booking.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="no-data">No bookings yet</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="modal-overlay" onClick={() => setShowUploadModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Upload Portfolio Image</h2>
            <form onSubmit={handleUploadSubmit}>
              <div className="form-group">
                <label>Category *</label>
                <select
                  value={uploadData.category}
                  onChange={(e) => setUploadData({...uploadData, category: e.target.value})}
                  required
                >
                  <optgroup label="Makeup Portfolio">
                    <option value="Bridal">Bridal</option>
                    <option value="Engagement">Engagement</option>
                    <option value="Glam">Glam</option>
                    <option value="Reception">Reception</option>
                    <option value="Self Makeup">Self Makeup</option>
                    <option value="Teen Makeup">Teen Makeup</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Bronze Tan">Bronze Tan</option>
                    <option value="Modern Bride">Modern Bride</option>
                    <option value="Airbrush Makeup">Airbrush Makeup</option>
                  </optgroup>
                  <optgroup label="Hair Portfolio">
                    <option value="Hair-do Gallery">Hair-do Gallery</option>
                    <option value="Keratin">Keratin</option>
                    <option value="Rebonding">Rebonding</option>
                    <option value="Botox">Botox</option>
                    <option value="Smoothening">Smoothening</option>
                    <option value="Anti-Hairfall Treatment">Anti-Hairfall Treatment</option>
                    <option value="Anti-Dandruff Treatment">Anti-Dandruff Treatment</option>
                    <option value="Global Hair Color with Highlights">Global Hair Color with Highlights</option>
                  </optgroup>
                  <optgroup label="Skin & Nails Portfolio">
                    <option value="Nail Art">Nail Art</option>
                    <option value="Nail Extension">Nail Extension</option>
                    <option value="Facials">Facials</option>
                    <option value="Manicure-Pedicure">Manicure-Pedicure</option>
                    <option value="Waxing">Waxing</option>
                    <option value="Machinery Facial">Machinery Facial</option>
                    <option value="High Frequency Treatment">High Frequency Treatment</option>
                    <option value="Galvanic Treatment">Galvanic Treatment</option>
                    <option value="Ultrasonic Treatment">Ultrasonic Treatment</option>
                    <option value="Hydra Facial">Hydra Facial</option>
                    <option value="Phytic Facial">Phytic Facial</option>
                  </optgroup>
                </select>
              </div>

              <div className="form-group">
                <label>Image Path *</label>
                <input
                  type="text"
                  value={uploadData.imageUrl}
                  onChange={(e) => setUploadData({...uploadData, imageUrl: e.target.value})}
                  required
                  placeholder="/images/portfolio/bridal/BRmakeup1.jpg"
                />
                <div style={{ 
                  marginTop: '12px', 
                  padding: '15px', 
                  background: '#f0f9ff', 
                  border: '1px solid #0ea5e9',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  lineHeight: '1.8'
                }}>
                  <strong style={{ color: '#0369a1', display: 'block', marginBottom: '8px' }}>
                    📁 How to Upload Local Images:
                  </strong>
                  <ol style={{ margin: '0', paddingLeft: '20px', color: '#0c4a6e' }}>
                    <li><strong>Step 1:</strong> Copy your image to:<br/>
                        <code style={{ background: '#e0f2fe', padding: '2px 6px', borderRadius: '3px' }}>
                          frontend/public/images/portfolio/[category]/
                        </code>
                    </li>
                    <li style={{ marginTop: '8px' }}><strong>Step 2:</strong> Use web path here:<br/>
                        <code style={{ background: '#e0f2fe', padding: '2px 6px', borderRadius: '3px' }}>
                          /images/portfolio/[category]/filename.jpg
                        </code>
                    </li>
                  </ol>
                  <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #bae6fd' }}>
                    <strong style={{ color: '#059669' }}>✅ Example:</strong><br/>
                    File location: <code style={{ background: '#e0f2fe', padding: '2px 6px' }}>frontend/public/images/portfolio/bridal/myimage.jpg</code><br/>
                    Enter here: <code style={{ background: '#dcfce7', padding: '2px 6px' }}>/images/portfolio/bridal/myimage.jpg</code>
                  </div>
                  <div style={{ marginTop: '10px', color: '#dc2626' }}>
                    <strong>❌ Don't use:</strong> C:\Users\...\image.jpg
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Client Name</label>
                <input
                  type="text"
                  value={uploadData.clientName}
                  onChange={(e) => setUploadData({...uploadData, clientName: e.target.value})}
                  placeholder="Client's name (optional)"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={uploadData.description}
                  onChange={(e) => setUploadData({...uploadData, description: e.target.value})}
                  placeholder="Brief description of the work..."
                  rows="3"
                />
              </div>

              <div className="modal-buttons">
                <button type="submit" className="btn btn-primary">Upload</button>
                <button type="button" className="btn btn-outline" onClick={() => setShowUploadModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
