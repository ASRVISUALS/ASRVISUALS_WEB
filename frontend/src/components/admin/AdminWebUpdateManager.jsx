import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

const QUICK_SECTIONS = {
  hero_title: { label: 'Hero Title', type: 'text', placeholder: 'Main headline on homepage' },
  hero_subtitle: { label: 'Hero Subtitle', type: 'text', placeholder: 'Tagline below hero' },
  about_short: { label: 'About Summary', type: 'textarea', placeholder: 'Brief description for about section' },
  services_intro: { label: 'Services Intro', type: 'textarea', placeholder: 'Introduction text for services page' },
  contact_message: { label: 'Contact Message', type: 'text', placeholder: 'Message on contact page' },
  footer_tagline: { label: 'Footer Tagline', type: 'text', placeholder: 'Short tagline in footer' },
  company_address: { label: 'Company Address', type: 'textarea', placeholder: 'Your business address' },
  company_email: { label: 'Company Email', type: 'text', placeholder: 'contact@example.com' },
  company_phone: { label: 'Company Phone', type: 'text', placeholder: '+1 (555) 123-4567' },
};

export default function AdminWebUpdateManager() {
  const [updates, setUpdates] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeSection, setActiveSection] = useState('hero_title');

  useEffect(() => {
    const loadUpdates = async () => {
      try {
        setLoading(true);
        const response = await api.get('/admin/settings');
        const data = response.data?.data?.settings || {};
        
        const quickSettings = {};
        Object.keys(QUICK_SECTIONS).forEach((key) => {
          quickSettings[key] = data[key] || '';
        });
        
        setUpdates(quickSettings);
        setError('');
      } catch (err) {
        setError('Failed to load website settings.');
      } finally {
        setLoading(false);
      }
    };

    loadUpdates();
  }, []);

  const handleChange = (key, value) => {
    setUpdates((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveSection = async (key) => {
    try {
      setSaving(true);
      setError('');
      setSuccess('');

      const value = updates[key] || '';
      await api.put(`/admin/settings/${encodeURIComponent(key)}`, { value });
      setSuccess(`✓ ${QUICK_SECTIONS[key].label} updated!`);
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(`Failed to save: ${QUICK_SECTIONS[key].label}`);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAll = async () => {
    try {
      setSaving(true);
      setError('');
      setSuccess('');

      for (const key of Object.keys(updates)) {
        const value = updates[key] || '';
        await api.put(`/admin/settings/${encodeURIComponent(key)}`, { value });
      }

      setSuccess('✓ All website content updated successfully!');
      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      setError('Failed to update website content.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="admin-panel-card">Loading website content...</div>;
  }

  return (
    <section className="admin-panel-card admin-web-update">
      <div className="admin-panel-head">
        <h2>🌐 Website Content Editor</h2>
        <p>Update homepage and key website sections easily</p>
      </div>

      {error && <div className="admin-alert admin-alert-error">{error}</div>}
      {success && <div className="admin-alert admin-alert-success">{success}</div>}

      <div className="web-update-container">
        {/* Section Tabs */}
        <div className="web-update-sections">
          {Object.entries(QUICK_SECTIONS).map(([key, config]) => (
            <button
              key={key}
              className={`web-section-tab ${activeSection === key ? 'active' : ''}`}
              onClick={() => setActiveSection(key)}
            >
              {config.label}
            </button>
          ))}
        </div>

        {/* Editor */}
        <div className="web-update-editor">
          {activeSection && QUICK_SECTIONS[activeSection] && (
            <div className="web-update-field">
              <label>{QUICK_SECTIONS[activeSection].label}</label>
              {QUICK_SECTIONS[activeSection].type === 'textarea' ? (
                <textarea
                  rows="6"
                  placeholder={QUICK_SECTIONS[activeSection].placeholder}
                  value={updates[activeSection] || ''}
                  onChange={(e) => handleChange(activeSection, e.target.value)}
                  className="web-update-textarea"
                />
              ) : (
                <input
                  type="text"
                  placeholder={QUICK_SECTIONS[activeSection].placeholder}
                  value={updates[activeSection] || ''}
                  onChange={(e) => handleChange(activeSection, e.target.value)}
                  className="web-update-input"
                />
              )}
              <div className="web-update-actions">
                <button
                  type="button"
                  className="admin-btn admin-btn-primary"
                  onClick={() => handleSaveSection(activeSection)}
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save This Section'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Save All Button */}
      <div className="web-update-footer">
        <button
          type="button"
          className="admin-btn admin-btn-success"
          onClick={handleSaveAll}
          disabled={saving}
        >
          {saving ? 'Updating...' : '💾 Save All Changes'}
        </button>
      </div>

      <style>{`
        .admin-web-update {
          max-width: 100%;
        }

        .web-update-container {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 20px;
          margin-top: 20px;
        }

        .web-update-sections {
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-right: 2px solid #e0e0e0;
          padding-right: 15px;
          max-height: 400px;
          overflow-y: auto;
        }

        .web-section-tab {
          padding: 10px 12px;
          background: #f5f5f5;
          border: 1px solid #ddd;
          border-radius: 5px;
          cursor: pointer;
          text-align: left;
          font-size: 13px;
          transition: all 0.2s;
        }

        .web-section-tab:hover {
          background: #efefef;
          border-color: #999;
        }

        .web-section-tab.active {
          background: #25395d;
          color: white;
          border-color: #25395d;
          font-weight: 600;
        }

        .web-update-editor {
          padding: 10px;
        }

        .web-update-field label {
          display: block;
          font-weight: 600;
          margin-bottom: 8px;
          color: #222;
        }

        .web-update-input,
        .web-update-textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-family: inherit;
          font-size: 14px;
          resize: vertical;
        }

        .web-update-input:focus,
        .web-update-textarea:focus {
          outline: none;
          border-color: #25395d;
          box-shadow: 0 0 0 2px rgba(37, 57, 93, 0.1);
        }

        .web-update-actions {
          margin-top: 12px;
          display: flex;
          gap: 10px;
        }

        .web-update-footer {
          margin-top: 20px;
          padding-top: 15px;
          border-top: 2px solid #e0e0e0;
          text-align: right;
        }

        .admin-btn-success {
          background: linear-gradient(135deg, #11a836, #0d8c2b);
          color: white;
          padding: 12px 24px;
          font-size: 15px;
          font-weight: 600;
        }

        .admin-btn-success:hover:not(:disabled) {
          background: linear-gradient(135deg, #0d8c2b, #0a6f21);
        }

        @media (max-width: 900px) {
          .web-update-container {
            grid-template-columns: 1fr;
            gap: 15px;
          }

          .web-update-sections {
            border-right: none;
            border-bottom: 2px solid #e0e0e0;
            padding-right: 0;
            padding-bottom: 15px;
            flex-direction: row;
            flex-wrap: wrap;
            max-height: none;
          }

          .web-section-tab {
            flex: 1;
            min-width: 120px;
          }
        }
      `}</style>
    </section>
  );
}
