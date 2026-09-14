import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import AppErrorBoundary from './components/AppErrorBoundary';
import { lazyWithRetry } from './utils/lazyWithRetry';
import HomePage from './pages/HomePage';

import './styles/variables.css';
import './styles/global.css';
import './styles/animations.css';
import './styles/light-overrides.css';
import './styles/imageOptimization.css';

const AboutPage = lazyWithRetry(() => import('./pages/AboutPage'));
const ServicesPage = lazyWithRetry(() => import('./pages/ServicesPage'));
const BlogPage = lazyWithRetry(() => import('./pages/BlogPage'));
const BlogDetailPage = lazyWithRetry(() => import('./pages/BlogDetailPage'));
const ContactPage = lazyWithRetry(() => import('./pages/ContactPage'));
const AdminPage = lazyWithRetry(() => import('./pages/AdminPage'));
const TermsPage = lazyWithRetry(() => import('./pages/TermsPage'));
const PrivacyPolicyPage = lazyWithRetry(() => import('./pages/PrivacyPolicyPage'));
const TipPage = lazyWithRetry(() => import('./pages/TipPage'));
const RefundPolicyPage = lazyWithRetry(() => import('./pages/RefundPolicyPage'));
const ThumbnailsPage = lazyWithRetry(() => import('./pages/ThumbnailsPage'));

function App() {
  return (
    <AppErrorBoundary>
      <AuthProvider>
        <ThemeProvider>
          <Router>
            <Suspense fallback={<div className="app-boot-fallback">Loading page...</div>}>
              <Routes>
                <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
                <Route path="/about" element={<MainLayout><AboutPage /></MainLayout>} />
                <Route path="/services" element={<MainLayout><ServicesPage /></MainLayout>} />
                <Route path="/blog" element={<MainLayout><BlogPage /></MainLayout>} />
                <Route path="/blog/:id" element={<MainLayout><BlogDetailPage /></MainLayout>} />
                <Route path="/contact" element={<MainLayout><ContactPage /></MainLayout>} />
                <Route path="/terms-and-conditions" element={<MainLayout><TermsPage /></MainLayout>} />
                <Route path="/privacy-policy" element={<MainLayout><PrivacyPolicyPage /></MainLayout>} />
                <Route path="/refund-policy" element={<MainLayout><RefundPolicyPage /></MainLayout>} />
                <Route path="/tip-us" element={<MainLayout><TipPage /></MainLayout>} />
                <Route path="/thumbnails" element={<MainLayout><ThumbnailsPage /></MainLayout>} />
                <Route path="/admin" element={<AdminLayout><AdminPage /></AdminLayout>} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </AppErrorBoundary>
  );
}

export default App;
