import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BlogPage.css';
import api from '../utils/api';
import { fallbackBlogs } from '../data/fallbackBlogs';
import { withMinBlogContent } from '../utils/blogContent';

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await api.get('/blogs');
      const liveBlogs = response.data?.data?.blogs || [];

      const byId = new Map();
      liveBlogs.forEach((blog) => {
        if (blog && blog._id) {
          byId.set(blog._id, blog);
        }
      });

      for (const post of fallbackBlogs) {
        if (byId.size >= 30) {
          break;
        }
        if (!byId.has(post._id)) {
          byId.set(post._id, post);
        }
      }

      setBlogs(Array.from(byId.values()).map((blog) => withMinBlogContent(blog, 300)));
      setError(null);
    } catch (err) {
      setBlogs(fallbackBlogs.map((blog) => withMinBlogContent(blog, 300)));
      setError(null);
      console.error('Blog fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const blogSource = blogs;

  const categories = ['all', ...new Set(blogSource.map((blog) => (blog.category || 'uncategorized').toLowerCase()))];
  const filteredBlogs = blogSource.filter((blog) => {
    const category = (blog.category || 'uncategorized').toLowerCase();
    const title = (blog.title || '').toLowerCase();
    const excerpt = (blog.excerpt || blog.content || '').toLowerCase();
    const query = searchTerm.trim().toLowerCase();

    const categoryMatch = selectedCategory === 'all' || selectedCategory === category;
    const searchMatch = !query || title.includes(query) || excerpt.includes(query);

    return categoryMatch && searchMatch;
  });

  const featuredBlog = filteredBlogs[0] || null;
  const blogList = featuredBlog ? filteredBlogs.slice(1) : filteredBlogs;

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

  const renderReadLink = (blog) => (
    <Link to={`/blog/${blog._id}`} className="read-more">
      Read Article →
    </Link>
  );

  return (
    <main className="blog-page">
      <section className="blog-hero">
        <div className="blog-shell blog-hero-shell">
          <div className="blog-hero-grid">
            <div className="blog-hero-content">
              <p className="blog-kicker">ASR Visuals Blog</p>
              <h1>Our Blogs</h1>
              <p>
                At ASR Visuals, every frame tells a story. Explore practical insights on video editing,
                post-production systems, creator growth workflows, and visual storytelling that helps teams scale.
              </p>
              <div className="blog-hero-actions">
                <Link to="/contact" className="asr-btn asr-btn-primary">Hire Now</Link>
                <a href="#latest-articles" className="asr-btn asr-btn-ghost">Browse Articles</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-layout" id="latest-articles">
        <div className="blog-shell blog-grid-layout">
          <aside className="blog-sidebar">
            <div className="sidebar-card">
              <h3>Search</h3>
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search blog posts"
                aria-label="Search blog posts"
              />
            </div>

            <div className="sidebar-card">
              <h3>Categories</h3>
              <ul>
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sidebar-card">
              <h3>Quick Links</h3>
              <ul className="plain-links">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/services">Our Services</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>
          </aside>

          <div className="blog-main">
            <div className="articles-headline">
              <h2>Latest Insights</h2>
              <p>Video editing, VFX, and creator systems to improve consistency and content quality.</p>
            </div>

            <div className="mobile-category-slider" aria-label="Filter blogs by category">
              <button
                type="button"
                className={`category-chip ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                All
              </button>
              {categories
                .filter((cat) => cat !== 'all')
                .map((cat) => (
                  <button
                    type="button"
                    key={`mobile-${cat}`}
                    className={`category-chip ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
            </div>

            {loading && <div className="loading">Loading blog posts...</div>}
            {error && <div className="error-message">{error}</div>}

            {!loading && !error && featuredBlog && (
              <article className="featured-post-card">
                {featuredBlog.image && (
                  <div className="featured-post-image">
                    <img src={featuredBlog.image} alt={featuredBlog.title} loading="eager" decoding="async" fetchPriority="high" />
                  </div>
                )}
                <div className="featured-post-content">
                  <span className="featured-badge">Featured</span>
                  <div className="featured-meta">
                    <span>{formatDate(featuredBlog.createdAt)}</span>
                    <span className="blog-category">{featuredBlog.category || 'uncategorized'}</span>
                  </div>
                  <h3>{featuredBlog.title}</h3>
                  <p>{featuredBlog.excerpt || featuredBlog.content?.substring(0, 220)}...</p>
                  {renderReadLink(featuredBlog)}
                </div>
              </article>
            )}

            {!loading && !error && blogSource.length > 0 && blogList.length === 0 && (
              <div className="no-posts">
                <p>No additional blog posts found for this filter.</p>
              </div>
            )}

            {!loading && !error && blogList.length > 0 && (
              <div className="blog-cards-grid">
                {blogList.map((blog, index) => (
                  <article key={blog._id} className="blog-card">
                    {blog.image && (
                      <div className="blog-image">
                        <img src={blog.image} alt={blog.title} loading="lazy" decoding="async" />
                      </div>
                    )}
                    <div className="blog-content">
                      <div className="blog-meta">
                        <span className="blog-index">#{String(index + 2).padStart(2, '0')}</span>
                        <span className="blog-date">{formatDate(blog.createdAt)}</span>
                        <span className="blog-category">{blog.category || 'uncategorized'}</span>
                      </div>
                      <h3 className="blog-title">{blog.title}</h3>
                      <p className="blog-excerpt">{blog.excerpt || blog.content?.substring(0, 150)}...</p>
                      {renderReadLink(blog)}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="blog-cta-section">
        <div className="blog-shell blog-cta-shell">
          <h2>Need Consistent, High-Quality Video Editing?</h2>
          <p>Partner with ASR Visuals to scale your content output without compromising quality.</p>
          <Link to="/contact" className="asr-btn asr-btn-primary">Contact ASR Visuals</Link>
        </div>
      </section>
    </main>
  );
}
