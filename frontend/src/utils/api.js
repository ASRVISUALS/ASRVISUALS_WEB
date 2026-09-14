import axios from 'axios';
import { safeStorage } from './safeStorage';

const getDefaultApiBase = () => {
  if (typeof window === 'undefined') {
    return 'http://localhost:5001';
  }

  const host = window.location.hostname;
  if (host === 'localhost' || host === '127.0.0.1') {
    return 'http://localhost:5001';
  }

  return window.location.origin;
};

const normalizeApiBase = (rawUrl) => {
  const sanitized = (rawUrl || '').replace(/\/+$/, '');
  if (!sanitized) {
    return `${getDefaultApiBase()}/api`;
  }
  return sanitized.endsWith('/api') ? sanitized : `${sanitized}/api`;
};

export const API_BASE_URL = normalizeApiBase(process.env.REACT_APP_API_URL || '');

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 12000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = safeStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
