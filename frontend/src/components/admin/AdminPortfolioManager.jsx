import React, { useCallback, useEffect, useState } from 'react';
import api from '../../utils/api';
import { uploadFileToFirebase, fetchYouTubeOEmbed } from '../../utils/mediaUpload';
import { isFirebaseConfigured } from '../../utils/firebase';

const emptyForm = {
  title: '',
  description: '',
  image: '',
  videoUrl: '',
  category: 'development',
  technologies: '',
  link: ''
};

const CATEGORY_OPTIONS = ['design', 'development', 'marketing', 'branding'];

const mapPortfolioToForm = (item) => ({
  title: item.title || '',
  description: item.description || '',
  image: item.image || '',
  videoUrl: item.videoUrl || '',
  category: item.category || 'development',
  technologies: Array.isArray(item.technologies) ? item.technologies.join(', ') : '',
  link: item.link || ''
});

export default function AdminPortfolioManager() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [workEvents, setWorkEvents] = useState([]);

  const loadPortfolios = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/portfolio');
      const rows = response.data?.data?.portfolios || [];
      rows.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setItems(rows);
      setError('');
    } catch (err) {
      setError('Failed to load portfolio items.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPortfolios();
  }, [loadPortfolios]);

  useEffect(() => {
    const handleWorkPanelEvent = (event) => {
      const detail = event?.detail || {};

      setWorkEvents((prev) => {
        const next = [
          {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            time: new Date().toISOString(),
            action: detail.action || 'unknown',
            category: detail.category || '-',
            title: detail.title || '-',
            videoId: detail.video_id || '-'
          },
          ...prev
        ];

        return next.slice(0, 30);
      });
    };

    window.addEventListener('asr:work-panel', handleWorkPanelEvent);
    return () => {
      window.removeEventListener('asr:work-panel', handleWorkPanelEvent);
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError('');
      setSuccess('');

      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        image: form.image.trim(),
        videoUrl: form.videoUrl.trim(),
        category: form.category,
        technologies: form.technologies
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),
        link: form.link.trim()
      };

      if (editingId) {
        await api.patch(`/portfolio/${editingId}`, payload);
        setSuccess('Portfolio/video item updated.');
      } else {
        await api.post('/portfolio', payload);
        setSuccess('Portfolio/video item created.');
      }

      resetForm();
      await loadPortfolios();
    } catch (err) {
      setError('Failed to save portfolio item. Check required fields and URL values.');
    } finally {
      setSaving(false);
    }
  };

  const handleUpload = async (field, file, folder) => {
    if (!file) {
      setError('Choose a file before upload.');
      return;
    }

    try {
      setUploadingField(field);
      setError('');
      setSuccess('');
      const url = await uploadFileToFirebase(file, folder);
      setForm((prev) => ({ ...prev, [field]: url }));
      setSuccess(`${field === 'image' ? 'Image' : 'Video'} uploaded successfully.`);
    } catch (err) {
      setError(err.message || 'Upload failed.');
    } finally {
      setUploadingField('');
    }
  };

  const handleAutoFillVideoInfo = async () => {
    try {
      if (!form.videoUrl.trim()) {
        setError('Add a YouTube video URL first.');
        return;
      }
      setSaving(true);
      setError('');
      const details = await fetchYouTubeOEmbed(form.videoUrl.trim());
      setForm((prev) => ({
        ...prev,
        title: prev.title.trim() ? prev.title : (details.title || prev.title),
        image: prev.image.trim() ? prev.image : (details.thumbnail_url || prev.image)
      }));
      setSuccess('Video details fetched from YouTube API.');
    } catch (err) {
      setError(err.message || 'Could not fetch video details.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setForm(mapPortfolioToForm(item));
    setError('');
    setSuccess('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this portfolio/video item permanently?')) {
      return;
    }

    try {
      await api.delete(`/portfolio/${id}`);
      setSuccess('Portfolio/video item deleted.');
      if (editingId === id) {
        resetForm();
      }
      await loadPortfolios();
    } catch (err) {
      setError('Failed to delete portfolio item.');
    }
  };

  if (loading) {
    return <div className="admin-panel-card">Loading portfolio items...</div>;
  }

  return (
    <section className="admin-panel-card">
      <div className="admin-panel-head">
        <h2>Video and Portfolio Manager</h2>
        <p>Add videos, reels, and portfolio projects with direct links for the website.</p>
      </div>

      {error && <div className="admin-alert admin-alert-error">{error}</div>}
      {success && <div className="admin-alert admin-alert-success">{success}</div>}

      <div className="admin-alert admin-alert-success" style={{ display: isFirebaseConfigured() ? 'block' : 'none' }}>
        Firebase upload is enabled. You can upload image/video files directly.
      </div>
      {!isFirebaseConfigured() && (
        <div className="admin-alert admin-alert-error">
          Firebase upload is not configured yet. Add Firebase env vars to enable media upload.
        </div>
      )}

      <form className="admin-page-form" onSubmit={handleSubmit}>
        <div className="admin-form-grid-two">
          <div>
            <label htmlFor="portfolio-title">Title</label>
            <input id="portfolio-title" name="title" value={form.title} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="portfolio-category">Category</label>
            <select id="portfolio-category" name="category" value={form.category} onChange={handleChange}>
              {CATEGORY_OPTIONS.map((item) => (
                <option value={item} key={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="portfolio-description">Description</label>
          <textarea
            id="portfolio-description"
            name="description"
            rows="3"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="admin-form-grid-two">
          <div>
            <label htmlFor="portfolio-image">Thumbnail/Image URL</label>
            <input id="portfolio-image" name="image" type="url" value={form.image} onChange={handleChange} required />
            <div className="admin-upload-row">
              <input
                id="portfolio-image-file"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleUpload('image', file, 'portfolio/images');
                  }
                }}
                disabled={!isFirebaseConfigured() || saving || uploadingField === 'image'}
              />
            </div>
          </div>
          <div>
            <label htmlFor="portfolio-video">Video URL</label>
            <input id="portfolio-video" name="videoUrl" type="url" value={form.videoUrl} onChange={handleChange} placeholder="https://youtube.com/watch?v=..." />
            <div className="admin-actions-row" style={{ marginTop: '0.4rem' }}>
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                onClick={handleAutoFillVideoInfo}
                disabled={saving || uploadingField === 'video'}
              >
                Fetch Video Metadata
              </button>
            </div>
            <div className="admin-upload-row">
              <input
                id="portfolio-video-file"
                type="file"
                accept="video/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleUpload('videoUrl', file, 'portfolio/videos');
                  }
                }}
                disabled={!isFirebaseConfigured() || saving || uploadingField === 'video'}
              />
            </div>
          </div>
        </div>

        <div className="admin-form-grid-two">
          <div>
            <label htmlFor="portfolio-link">Project Link</label>
            <input id="portfolio-link" name="link" type="url" value={form.link} onChange={handleChange} placeholder="https://..." />
          </div>
          <div>
            <label htmlFor="portfolio-tech">Technologies (comma separated)</label>
            <input id="portfolio-tech" name="technologies" value={form.technologies} onChange={handleChange} placeholder="Premiere Pro, After Effects" />
          </div>
        </div>

        <div className="admin-actions-row">
          <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
            {saving ? 'Saving...' : editingId ? 'Update Item' : 'Add Item'}
          </button>
          {editingId && (
            <button type="button" className="admin-btn admin-btn-secondary" onClick={resetForm}>
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Video</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td>{item.videoUrl ? 'Yes' : 'No'}</td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="admin-actions-row">
                    <button type="button" className="admin-btn admin-btn-secondary" onClick={() => handleEdit(item)}>
                      Edit
                    </button>
                    <button type="button" className="admin-btn admin-btn-danger" onClick={() => handleDelete(item._id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="admin-work-events" aria-live="polite">
        <div className="admin-work-events-head">
          <div>
            <h3>Work Panel Live Events</h3>
            <p>Tracks category clicks, play clicks, and YouTube outbound clicks from the public Work panel.</p>
          </div>
          <button
            type="button"
            className="admin-btn admin-btn-secondary"
            onClick={() => setWorkEvents([])}
            disabled={!workEvents.length}
          >
            Clear Events
          </button>
        </div>

        {!workEvents.length ? (
          <p className="admin-work-events-empty">No events yet. Open Services {'->'} Our Work and interact with videos.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table admin-table-compact">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Action</th>
                  <th>Category</th>
                  <th>Video ID</th>
                  <th>Title</th>
                </tr>
              </thead>
              <tbody>
                {workEvents.map((event) => (
                  <tr key={event.id}>
                    <td>{new Date(event.time).toLocaleTimeString()}</td>
                    <td>{event.action}</td>
                    <td>{event.category}</td>
                    <td>{event.videoId}</td>
                    <td>{event.title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </section>
  );
}
