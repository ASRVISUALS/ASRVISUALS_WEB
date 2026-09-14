import React, { useEffect, useMemo, useState, useCallback } from 'react';
import api from '../../utils/api';

const CONTACT_STATUS = ['new', 'read', 'responded'];

export default function AdminContactsManager() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadContacts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/contact');
      const rows = response.data?.data?.contacts || [];
      rows.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setContacts(rows);
      setError('');

      if (selectedContact?._id) {
        const refreshed = rows.find((item) => item._id === selectedContact._id);
        if (refreshed) {
          setSelectedContact(refreshed);
        }
      }
    } catch (err) {
      setError('Failed to load contact requests.');
    } finally {
      setLoading(false);
    }
  }, [selectedContact?._id]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const counts = useMemo(() => {
    return contacts.reduce(
      (acc, row) => {
        acc.total += 1;
        acc[row.status] = (acc[row.status] || 0) + 1;
        return acc;
      },
      { total: 0, new: 0, read: 0, responded: 0 }
    );
  }, [contacts]);

  const openContact = async (id) => {
    try {
      const response = await api.get(`/contact/${id}`);
      const row = response.data?.data?.contact || null;
      if (row) {
        setSelectedContact(row);
      }
    } catch (err) {
      setError('Failed to load contact detail.');
    }
  };

  const updateStatus = async (id, status) => {
    try {
      setError('');
      setSuccess('');
      await api.patch(`/contact/${id}/status`, { status });
      setSuccess(`Status updated to ${status}.`);
      await loadContacts();
      if (selectedContact?._id === id) {
        await openContact(id);
      }
    } catch (err) {
      setError('Failed to update status.');
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm('Delete this request permanently?')) {
      return;
    }

    try {
      setError('');
      setSuccess('');
      await api.delete(`/contact/${id}`);
      setSuccess('Contact request deleted.');
      if (selectedContact?._id === id) {
        setSelectedContact(null);
      }
      await loadContacts();
    } catch (err) {
      setError('Failed to delete contact request.');
    }
  };

  if (loading) {
    return <div className="admin-panel-card">Loading contact requests...</div>;
  }

  return (
    <section className="admin-panel-card">
      <div className="admin-panel-head">
        <h2>Contact Requests</h2>
        <p>Review all submissions, open each person detail, and track response status.</p>
      </div>

      {error && <div className="admin-alert admin-alert-error">{error}</div>}
      {success && <div className="admin-alert admin-alert-success">{success}</div>}

      <div className="admin-stats-grid">
        <div className="admin-stat-item"><strong>{counts.total}</strong><span>Total</span></div>
        <div className="admin-stat-item"><strong>{counts.new}</strong><span>New</span></div>
        <div className="admin-stat-item"><strong>{counts.read}</strong><span>Read</span></div>
        <div className="admin-stat-item"><strong>{counts.responded}</strong><span>Responded</span></div>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Service</th>
              <th>Status</th>
              <th>Submitted</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.services?.[0] || '-'}</td>
                <td>
                  <span className={`status-badge status-${contact.status}`}>{contact.status}</span>
                </td>
                <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
                <td className="admin-actions-row">
                  <button type="button" className="admin-btn admin-btn-secondary" onClick={() => openContact(contact._id)}>
                    View
                  </button>
                  <button type="button" className="admin-btn admin-btn-danger" onClick={() => deleteContact(contact._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedContact && (
        <article className="contact-detail-card">
          <h3>Contact Detail: {selectedContact.name}</h3>
          <p><strong>Email:</strong> {selectedContact.email}</p>
          <p><strong>YouTube Link:</strong> <a href={selectedContact.youtubeLink} target="_blank" rel="noreferrer">{selectedContact.youtubeLink}</a></p>
          <p><strong>Services:</strong> {(selectedContact.services || []).join(', ') || '-'}</p>
          <p><strong>Project Description:</strong></p>
          <p>{selectedContact.projectDescription}</p>

          <div className="admin-actions-row">
            {CONTACT_STATUS.map((status) => (
              <button
                key={status}
                type="button"
                className={`admin-btn ${selectedContact.status === status ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
                onClick={() => updateStatus(selectedContact._id, status)}
              >
                Mark {status}
              </button>
            ))}
          </div>
        </article>
      )}
    </section>
  );
}
