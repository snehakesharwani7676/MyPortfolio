import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs } from '../../services/api';
import { FaClock, FaEye } from 'react-icons/fa';
import './Blog.css';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await getBlogs();
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="blog-page">
      <div className="blog-header">
        <div className="container">
          <h1>Makeup Blog</h1>
          <p>Tips, trends, and tutorials</p>
        </div>
      </div>

      <div className="container section">
        <div className="blog-grid">
          {blogs.map((blog) => (
            <Link to={`/blog/${blog.slug}`} key={blog._id} className="blog-card">
              {blog.featuredImage && (
                <div className="blog-image">
                  <img src={blog.featuredImage} alt={blog.title} />
                </div>
              )}
              <div className="blog-content">
                <div className="blog-meta">
                  <span><FaClock /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                  <span><FaEye /> {blog.views} views</span>
                </div>
                <h3>{blog.title}</h3>
                <p>{blog.excerpt}</p>
                {blog.tags && blog.tags.length > 0 && (
                  <div className="blog-tags">
                    {blog.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="tag">#{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {blogs.length === 0 && (
          <div className="no-blogs">
            <p>No blog posts available yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
