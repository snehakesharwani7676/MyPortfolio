import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBookings, getPortfolioItems, getAllTestimonials } from '../../services/api';
import { FaImages, FaCalendar, FaStar, FaSignOutAlt } from 'react-icons/fa';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    portfolioCount: 0,
    bookingsCount: 0,
    testimonialsCount: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);
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
              <button className="action-btn">Upload Portfolio</button>
              <button className="action-btn">Manage Bookings</button>
              <button className="action-btn">Add Service</button>
              <button className="action-btn">Create Blog Post</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
