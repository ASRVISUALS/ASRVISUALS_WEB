import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './PageTransition.css';

export const PageTransitionContext = React.createContext();

export default function PageTransition({ children }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const hasHashTarget = Boolean(location.hash);
    setIsTransitioning(true);

    if (!hasHashTarget) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }

    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 150);

    if (hasHashTarget) {
      const scrollToHash = setTimeout(() => {
        const elementId = location.hash.replace('#', '');
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
      }, 300);

      return () => {
        clearTimeout(timer);
        clearTimeout(scrollToHash);
      };
    }

    return () => clearTimeout(timer);
  }, [location.pathname, location.hash]);

  // Add scroll listener to prevent any unwanted scroll restoration
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Disable browser's scroll restoration
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
    }
  }, []);

  return (
    <PageTransitionContext.Provider value={{ isTransitioning, setIsTransitioning }}>
      {isTransitioning && <div className="page-transition-overlay"></div>}
      <div className={`page-content ${isTransitioning ? 'transitioning-out' : 'transitioning-in'}`}>
        {children}
      </div>
    </PageTransitionContext.Provider>
  );
}
