import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);
export const getCurrentUser = () => api.get('/auth/me');

// Portfolio
export const getPortfolioItems = (params) => api.get('/portfolio', { params });
export const getPortfolioItem = (id) => api.get(`/portfolio/${id}`);
export const createPortfolioItem = (data) => api.post('/portfolio', data);
export const updatePortfolioItem = (id, data) => api.put(`/portfolio/${id}`, data);
export const deletePortfolioItem = (id) => api.delete(`/portfolio/${id}`);
export const getCategories = () => api.get('/portfolio/stats/categories');

// Bookings
export const createBooking = (data) => api.post('/bookings', data);
export const getBookings = (params) => api.get('/bookings', { params });
export const updateBooking = (id, data) => api.put(`/bookings/${id}`, data);
export const deleteBooking = (id) => api.delete(`/bookings/${id}`);

// Testimonials
export const getTestimonials = () => api.get('/testimonials');
export const getAllTestimonials = () => api.get('/testimonials/all');
export const createTestimonial = (data) => api.post('/testimonials', data);
export const updateTestimonial = (id, data) => api.put(`/testimonials/${id}`, data);
export const deleteTestimonial = (id) => api.delete(`/testimonials/${id}`);

// Services
export const getServices = () => api.get('/services');
export const getAllServices = () => api.get('/services/all');
export const getService = (id) => api.get(`/services/${id}`);
export const createService = (data) => api.post('/services', data);
export const updateService = (id, data) => api.put(`/services/${id}`, data);
export const deleteService = (id) => api.delete(`/services/${id}`);

// Blog
export const getBlogs = () => api.get('/blog');
export const getAllBlogs = () => api.get('/blog/all');
export const getBlog = (slug) => api.get(`/blog/${slug}`);
export const createBlog = (data) => api.post('/blog', data);
export const updateBlog = (id, data) => api.put(`/blog/${id}`, data);
export const deleteBlog = (id) => api.delete(`/blog/${id}`);

// Contact
export const sendContactMessage = (data) => api.post('/contact', data);

export default api;
