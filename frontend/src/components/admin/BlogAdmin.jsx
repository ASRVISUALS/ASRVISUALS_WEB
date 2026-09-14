import React, { useState, useEffect, useCallback } from 'react';
import './BlogAdmin.css';
import api from '../../utils/api';

export default function BlogAdmin() {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'editing-tips',
    image: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchBlogs = useCallback(async () => {
    try {
      const response = await api.get('/blogs');
      setBlogs(response.data?.data?.blogs || []);
    } catch (err) {
      setError('Failed to fetch blogs');
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (editingId) {
        await api.patch(`/blogs/${editingId}`, formData);
      } else {
        await api.post('/blogs', formData);
      }

      setSuccess(editingId ? 'Blog updated successfully!' : 'Blog created successfully!');
      setFormData({ title: '', excerpt: '', content: '', category: 'editing-tips', image: '' });
      setEditingId(null);
      fetchBlogs();
    } catch (err) {
      setError(err.message || 'Error saving blog');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog) => {
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt || '',
      content: blog.content,
      category: blog.category || 'editing-tips',
      image: blog.image || ''
    });
    setEditingId(blog._id);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    try {
      await api.delete(`/blogs/${id}`);
      setSuccess('Blog deleted successfully!');
      fetchBlogs();
    } catch (err) {
      setError('Failed to delete blog');
    }
  };

  return (
    <div className="blog-admin">
      <h1>Blog Management</h1>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit} className="blog-form">
        <h2>{editingId ? 'Edit Blog Post' : 'Create New Blog Post'}</h2>

        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            placeholder="Blog post title"
          />
        </div>

        <div className="form-group">
          <label>Excerpt</label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleInputChange}
            placeholder="Short summary of the blog post"
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>Content *</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            required
            placeholder="Full blog post content"
            rows="10"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleInputChange}>
              <option value="editing-tips">Editing Tips</option>
              <option value="growth-strategy">Growth Strategy</option>
              <option value="case-study">Case Study</option>
              <option value="tools-review">Tools Review</option>
              <option value="tutorials">Tutorials</option>
              <option value="video editing company">Video Editing Company</option>
              <option value="vfx services">VFX Services</option>
              <option value="youtube video editing">YouTube Video Editing</option>
              <option value="wedding video editing">Wedding Video Editing</option>
              <option value="post production">Post Production</option>
              <option value="workflow systems">Workflow Systems</option>
              <option value="color grading">Color Grading</option>
              <option value="audio post production">Audio Post Production</option>
              <option value="creator growth">Creator Growth</option>
            </select>
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? 'Saving...' : editingId ? 'Update Post' : 'Create Post'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({ title: '', excerpt: '', content: '', category: 'editing-tips', image: '' });
              }}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="blogs-list">
        <h2>Blog Posts ({blogs.length})</h2>
        {blogs.length === 0 ? (
          <p>No blog posts yet.</p>
        ) : (
          <table className="blog-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map(blog => (
                <tr key={blog._id}>
                  <td className="title-cell">{blog.title}</td>
                  <td><span className="category-badge">{blog.category || 'uncategorized'}</span></td>
                  <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                  <td className="actions-cell">
                    <button onClick={() => handleEdit(blog)} className="btn-small btn-edit">Edit</button>
                    <button onClick={() => handleDelete(blog._id)} className="btn-small btn-delete">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
