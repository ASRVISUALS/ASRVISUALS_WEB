import React, { useEffect, useMemo, useState, lazy, Suspense } from 'react';
import api from '../utils/api';
import { safeStorage } from '../utils/safeStorage';
import './AdminPage.css';

const BlogAdmin = lazy(() => import('../components/admin/BlogAdmin'));
const AdminSettingsManager = lazy(() => import('../components/admin/AdminSettingsManager'));
const AdminPagesManager = lazy(() => import('../components/admin/AdminPagesManager'));
const AdminContactsManager = lazy(() => import('../components/admin/AdminContactsManager'));
const AdminPortfolioManager = lazy(() => import('../components/admin/AdminPortfolioManager'));
const AdminWebUpdateManager = lazy(() => import('../components/admin/AdminWebUpdateManager'));

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [statsError, setStatsError] = useState('');
  const token = safeStorage.getItem('token');

  const activePanel = useMemo(() => {
    if (activeTab === 'webupdate') return <AdminWebUpdateManager />;
    if (activeTab === 'pages') return <AdminPagesManager />;
    if (activeTab === 'blog') return <BlogAdmin />;
    if (activeTab === 'portfolio') return <AdminPortfolioManager />;
    if (activeTab === 'contacts') return <AdminContactsManager />;
    if (activeTab === 'settings') return <AdminSettingsManager />;
    return null;
  }, [activeTab]);

  useEffect(() => {
    const fetchStats = async () => {
      if (!token) {
        return;
      }

      try {
        const response = await api.get('/admin/dashboard');
        setStats(response.data?.data?.stats || null);
        setStatsError('');
      } catch (err) {
        setStatsError('Could not load dashboard stats. Verify you are logged in as admin/owner.');
      }
    };

    fetchStats();
  }, [token]);

  if (!token) {
    return (
      <main className="admin-page">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Please login first to manage your website content.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage your content and channels</p>
      </div>

      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Dashboard
        </button>
        <button
          className={`tab-btn ${activeTab === 'webupdate' ? 'active' : ''}`}
          onClick={() => setActiveTab('webupdate')}
        >
          🌐 Web Content
        </button>
        <button
          className={`tab-btn ${activeTab === 'pages' ? 'active' : ''}`}
          onClick={() => setActiveTab('pages')}
        >
          Website Editor
        </button>
        <button
          className={`tab-btn ${activeTab === 'portfolio' ? 'active' : ''}`}
          onClick={() => setActiveTab('portfolio')}
        >
          📹 Videos & Shorts
        </button>
        <button
          className={`tab-btn ${activeTab === 'blog' ? 'active' : ''}`}
          onClick={() => setActiveTab('blog')}
        >
          Blog Management
        </button>
        <button
          className={`tab-btn ${activeTab === 'contacts' ? 'active' : ''}`}
          onClick={() => setActiveTab('contacts')}
        >
          Contact Requests
        </button>
        <button
          className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Site Settings
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'overview' && (
          <section className="settings-section">
            <h2>Overview</h2>
            <p>Website control center for admin and owner users.</p>
            {statsError && <div className="admin-alert admin-alert-error">{statsError}</div>}
            {stats && (
              <div className="admin-stats-grid">
                <div className="admin-stat-item"><strong>{stats.blogs}</strong><span>Blogs</span></div>
                <div className="admin-stat-item"><strong>{stats.portfolios}</strong><span>Portfolios</span></div>
                <div className="admin-stat-item"><strong>{stats.contacts}</strong><span>Contacts</span></div>
                <div className="admin-stat-item"><strong>{stats.unreadContacts}</strong><span>Unread</span></div>
                <div className="admin-stat-item"><strong>{stats.pages}</strong><span>Pages</span></div>
                <div className="admin-stat-item"><strong>{stats.settings}</strong><span>Settings</span></div>
                <div className="admin-stat-item"><strong>{stats.users}</strong><span>Users</span></div>
              </div>
            )}
          </section>
        )}
        {activeTab !== 'overview' && (
          <Suspense fallback={<div className="admin-alert">Loading panel...</div>}>
            {activePanel}
          </Suspense>
        )}
      </div>
    </main>
  );
}
