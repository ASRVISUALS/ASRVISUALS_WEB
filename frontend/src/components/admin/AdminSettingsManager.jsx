import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const stringifySettingValue = (value) => {
  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'string') {
    return value;
  }

  try {
    return JSON.stringify(value, null, 2);
  } catch (err) {
    return String(value);
  }
};

const parseSettingValue = (valueText) => {
  if (valueText.trim() === '') {
    return '';
  }

  try {
    return JSON.parse(valueText);
  } catch (err) {
    return valueText;
  }
};

export default function AdminSettingsManager() {
  const [settings, setSettings] = useState({});
  const [drafts, setDrafts] = useState({});
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState('');
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadSettings = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/settings');
      const data = response.data?.data?.settings || {};
      setSettings(data);

      const nextDrafts = {};
      Object.entries(data).forEach(([key, value]) => {
        nextDrafts[key] = stringifySettingValue(value);
      });
      setDrafts(nextDrafts);
      setError('');
    } catch (err) {
      setError('Failed to load settings. Please verify you are logged in as admin/owner.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const saveSetting = async (key, valueText) => {
    try {
      setSavingKey(key);
      setError('');
      setSuccess('');

      const value = parseSettingValue(valueText);
      await api.put(`/admin/settings/${encodeURIComponent(key)}`, { value });
      setSuccess(`Saved setting: ${key}`);
      await loadSettings();
    } catch (err) {
      setError(`Failed to save setting: ${key}`);
    } finally {
      setSavingKey('');
    }
  };

  const createSetting = async () => {
    const key = newKey.trim();
    if (!key) {
      setError('Please enter a setting key.');
      return;
    }

    await saveSetting(key, newValue);
    setNewKey('');
    setNewValue('');
  };

  if (loading) {
    return <div className="admin-panel-card">Loading settings...</div>;
  }

  return (
    <section className="admin-panel-card">
      <div className="admin-panel-head">
        <h2>Website Settings</h2>
        <p>Edit global settings used across the site (text, links, config blobs).</p>
      </div>

      {error && <div className="admin-alert admin-alert-error">{error}</div>}
      {success && <div className="admin-alert admin-alert-success">{success}</div>}

      <div className="admin-create-grid">
        <input
          type="text"
          placeholder="New setting key (example: instagram_url)"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
        />
        <textarea
          rows="3"
          placeholder="Value (plain text or JSON)"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
        <button type="button" className="admin-btn admin-btn-primary" onClick={createSetting}>
          Add Setting
        </button>
      </div>

      <div className="admin-settings-list">
        {Object.keys(settings).length === 0 ? (
          <p>No settings yet. Add your first global setting above.</p>
        ) : (
          Object.keys(settings)
            .sort((a, b) => a.localeCompare(b))
            .map((key) => (
              <div key={key} className="admin-setting-item">
                <label htmlFor={`setting-${key}`}>{key}</label>
                <textarea
                  id={`setting-${key}`}
                  rows="3"
                  value={drafts[key] || ''}
                  onChange={(e) => setDrafts((prev) => ({ ...prev, [key]: e.target.value }))}
                />
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary"
                  onClick={() => saveSetting(key, drafts[key] || '')}
                  disabled={savingKey === key}
                >
                  {savingKey === key ? 'Saving...' : 'Save'}
                </button>
              </div>
            ))
        )}
      </div>
    </section>
  );
}
