import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Footer from '../components/common/Footer';

export default function AdminLayout({ children }) {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location.pathname]);

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <nav className="admin-nav">
          <ul>
            <li><Link to="/admin">Dashboard</Link></li>
            <li><Link to="/">View Website</Link></li>
            <li><Link to="/contact">Contact Page</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="admin-content">
        {children}
      </main>
      <Footer />
    </div>
  );
}
