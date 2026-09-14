import React, { useEffect, useState, useCallback } from 'react';
import api from '../../utils/api';

const emptyPage = {
  slug: '',
  title: '',
  published: true,
  seoTitle: '',
  seoDescription: '',
  seoKeywords: '',
  sectionsJson: '[]'
};

const mapPageToForm = (page) => ({
  slug: page.slug || '',
  title: page.title || '',
  published: page.published !== false,
  seoTitle: page.seo?.title || '',
  seoDescription: page.seo?.description || '',
  seoKeywords: (page.seo?.keywords || []).join(', '),
  sectionsJson: JSON.stringify(page.sections || [], null, 2)
});

export default function AdminPagesManager() {
  const [pages, setPages] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState('');
  const [form, setForm] = useState(emptyPage);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadPages = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/pages');
      const rows = response.data?.data?.pages || [];
      setPages(rows);

      if (!selectedSlug && rows.length > 0) {
        setSelectedSlug(rows[0].slug);
        setForm(mapPageToForm(rows[0]));
      }

      if (selectedSlug) {
        const active = rows.find((item) => item.slug === selectedSlug);
        if (active) {
          setForm(mapPageToForm(active));
        }
      }

      setError('');
    } catch (err) {
      setError('Failed to load pages.');
    } finally {
      setLoading(false);
    }
  }, [selectedSlug]);

  useEffect(() => {
    loadPages();
  }, [loadPages]);

  const handleChoosePage = (slug) => {
    const page = pages.find((item) => item.slug === slug);
    if (!page) {
      return;
    }

    setSelectedSlug(slug);
    setForm(mapPageToForm(page));
    setSuccess('');
    setError('');
  };

  const handleCreateNew = () => {
    setSelectedSlug('');
    setForm(emptyPage);
    setSuccess('');
    setError('');
  };

  const addSectionBlock = () => {
    try {
      const parsed = JSON.parse(form.sectionsJson || '[]');
      if (!Array.isArray(parsed)) {
        throw new Error('Sections must be an array');
      }

      const nextIndex = parsed.length + 1;
      parsed.push({
        key: `section-${nextIndex}`,
        heading: `Section ${nextIndex}`,
        content: ''
      });

      setForm((prev) => ({
        ...prev,
        sectionsJson: JSON.stringify(parsed, null, 2)
      }));
      setError('');
    } catch (err) {
      setError('Sections JSON is invalid. Fix JSON before adding a section block.');
    }
  };

  const handleDeletePage = async () => {
    const slug = form.slug.trim().toLowerCase();
    if (!slug) {
      setError('Choose a page first before deleting.');
      return;
    }

    if (!window.confirm(`Delete page ${slug}? This cannot be undone.`)) {
      return;
    }

    try {
      setSaving(true);
      setError('');
      setSuccess('');
      await api.delete(`/admin/pages/${encodeURIComponent(slug)}`);
      setSuccess(`Page deleted: ${slug}`);
      setSelectedSlug('');
      setForm(emptyPage);
      await loadPages();
    } catch (err) {
      setError('Failed to delete page.');
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();

    const slug = form.slug.trim().toLowerCase();
    if (!slug) {
      setError('Page slug is required.');
      return;
    }

    let sections = [];
    try {
      const parsed = JSON.parse(form.sectionsJson || '[]');
      if (!Array.isArray(parsed)) {
        throw new Error('Sections must be an array');
      }
      sections = parsed;
    } catch (err) {
      setError('Sections JSON is invalid. Please provide a valid JSON array.');
      return;
    }

    try {
      setSaving(true);
      setError('');
      setSuccess('');

      const payload = {
        title: form.title || slug,
        published: form.published,
        seo: {
          title: form.seoTitle,
          description: form.seoDescription,
          keywords: form.seoKeywords
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean)
        },
        sections
      };

      await api.put(`/admin/pages/${encodeURIComponent(slug)}`, payload);
      setSelectedSlug(slug);
      setSuccess(`Page saved: ${slug}`);
      await loadPages();
    } catch (err) {
      setError('Failed to save page.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="admin-panel-card">Loading page content...</div>;
  }

  return (
    <section className="admin-panel-card">
      <div className="admin-panel-head">
        <h2>Complete Website Editor</h2>
        <p>Edit every page slug, SEO fields, and all page sections in one place.</p>
      </div>

      {error && <div className="admin-alert admin-alert-error">{error}</div>}
      {success && <div className="admin-alert admin-alert-success">{success}</div>}

      <div className="admin-pages-toolbar">
        <label htmlFor="page-selector">Select page</label>
        <select
          id="page-selector"
          value={selectedSlug}
          onChange={(e) => handleChoosePage(e.target.value)}
        >
          <option value="">Create new page</option>
          {pages.map((page) => (
            <option key={page.slug} value={page.slug}>
              {page.slug}
            </option>
          ))}
        </select>
        <button type="button" className="admin-btn admin-btn-secondary" onClick={handleCreateNew}>
          New Page
        </button>
      </div>

      <form className="admin-page-form" onSubmit={handleSave}>
        <div className="admin-form-grid-two">
          <div>
            <label htmlFor="page-slug">Page slug</label>
            <input
              id="page-slug"
              type="text"
              value={form.slug}
              onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
              placeholder="home"
              required
            />
          </div>
          <div>
            <label htmlFor="page-title">Title</label>
            <input
              id="page-title"
              type="text"
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Home"
            />
          </div>
        </div>

        <div className="admin-form-grid-two">
          <div>
            <label htmlFor="page-seo-title">SEO title</label>
            <input
              id="page-seo-title"
              type="text"
              value={form.seoTitle}
              onChange={(e) => setForm((prev) => ({ ...prev, seoTitle: e.target.value }))}
            />
          </div>
          <div>
            <label htmlFor="page-seo-keywords">SEO keywords (comma separated)</label>
            <input
              id="page-seo-keywords"
              type="text"
              value={form.seoKeywords}
              onChange={(e) => setForm((prev) => ({ ...prev, seoKeywords: e.target.value }))}
            />
          </div>
        </div>

        <div>
          <label htmlFor="page-seo-description">SEO description</label>
          <textarea
            id="page-seo-description"
            rows="3"
            value={form.seoDescription}
            onChange={(e) => setForm((prev) => ({ ...prev, seoDescription: e.target.value }))}
          />
        </div>

        <div>
          <div className="admin-sections-label-row">
            <label htmlFor="page-sections">Sections JSON</label>
            <button
              type="button"
              className="admin-btn admin-btn-secondary"
              onClick={addSectionBlock}
            >
              Add Section Block
            </button>
          </div>
          <textarea
            id="page-sections"
            rows="14"
            value={form.sectionsJson}
            onChange={(e) => setForm((prev) => ({ ...prev, sectionsJson: e.target.value }))}
          />
        </div>

        <label className="admin-checkbox-row" htmlFor="page-published">
          <input
            id="page-published"
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm((prev) => ({ ...prev, published: e.target.checked }))}
          />
          Published
        </label>

        <div className="admin-actions-row">
          <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
            {saving ? 'Saving page...' : 'Save Page'}
          </button>
          {!!selectedSlug && (
            <button
              type="button"
              className="admin-btn admin-btn-danger"
              onClick={handleDeletePage}
              disabled={saving}
            >
              Delete Page
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
