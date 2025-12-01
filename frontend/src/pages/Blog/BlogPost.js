import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlog } from '../../services/api';
import { FaClock, FaEye, FaArrowLeft } from 'react-icons/fa';
import './BlogPost.css';

const BlogPost = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const response = await getBlog(slug);
      setBlog(response.data);
    } catch (error) {
      console.error('Error fetching blog:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  if (!blog) {
    return (
      <div className="container" style={{ marginTop: '150px', textAlign: 'center' }}>
        <h2>Blog post not found</h2>
        <Link to="/blog" className="btn btn-primary">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="blog-post-page">
      <div className="container">
        <Link to="/blog" className="back-link">
          <FaArrowLeft /> Back to Blog
        </Link>

        <article className="blog-post">
          {blog.featuredImage && (
            <div className="post-image">
              <img src={blog.featuredImage} alt={blog.title} />
            </div>
          )}

          <div className="post-header">
            <h1>{blog.title}</h1>
            <div className="post-meta">
              <span><FaClock /> {new Date(blog.createdAt).toLocaleDateString()}</span>
              <span><FaEye /> {blog.views} views</span>
              {blog.author && <span>By {blog.author.name}</span>}
            </div>
            {blog.tags && blog.tags.length > 0 && (
              <div className="post-tags">
                {blog.tags.map((tag, i) => (
                  <span key={i} className="tag">#{tag}</span>
                ))}
              </div>
            )}
          </div>

          <div className="post-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
        </article>
      </div>
    </div>
  );
};

export default BlogPost;
