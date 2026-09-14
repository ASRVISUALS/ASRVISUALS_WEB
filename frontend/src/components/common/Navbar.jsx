import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo64 from '../../assets/images/asr-logo-64.webp';
import logo128 from '../../assets/images/asr-logo-128.webp';
import logo192 from '../../assets/images/asr-logo-192.webp';
import { routes } from '../../routes';
import { usePageTransition } from '../../hooks/usePageTransition';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHiddenOnScroll, setIsHiddenOnScroll] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { transitionTo } = usePageTransition();
  const location = useLocation();
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isOpen]);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;
      const hasPassedThreshold = currentScrollY > 120;
      const isBlogRoute = location.pathname === routes.BLOG || location.pathname.startsWith('/blog/');

      if (isOpen || isBlogRoute) {
        setIsHiddenOnScroll(false);
      } else {
        setIsHiddenOnScroll(hasPassedThreshold && isScrollingDown);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, [isOpen, location.pathname]);

  useEffect(() => {
    setIsOpen(false);
    setIsHiddenOnScroll(false);
    lastScrollY.current = window.scrollY || 0;
  }, [location.pathname]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const closeMenu = () => setIsOpen(false);

  const handleGetInTouch = (e) => {
    e.preventDefault();
    closeMenu();
    transitionTo(routes.CONTACT);
  };

  return (
    <>
      <nav className={`navbar ${isHiddenOnScroll && !isOpen ? 'navbar-hidden' : ''} ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className={`navbar-shell ${isScrolled ? 'is-scrolled' : ''}`}>
          <div className="navbar-container">
            <Link to={routes.HOME} className="navbar-logo" onClick={closeMenu}>
              <img
                src={logo64}
                srcSet={`${logo64} 64w, ${logo128} 128w, ${logo192} 192w`}
                sizes="(max-width: 900px) 48px, (max-width: 1280px) 56px, 64px"
                alt="ASR Visuals"
                className="logo-image"
                width="64"
                height="64"
                loading="eager"
                decoding="async"
                fetchpriority="high"
              />
              <span className="brand-text">ASR VISUALS</span>
            </Link>

            <button
              className="navbar-toggle"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
              aria-controls="primary-navigation"
            >
              {isOpen ? (
                <span className="navbar-close-icon">x</span>
              ) : (
                <span className="navbar-menu-icon">
                  <span className="hamburger-line" />
                  <span className="hamburger-line" />
                  <span className="hamburger-line" />
                </span>
              )}
            </button>

            <ul id="primary-navigation" className={`navbar-menu ${isOpen ? 'active' : ''}`}>
              <li>
                <NavLink to={routes.HOME} onClick={closeMenu}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to={routes.ABOUT} onClick={closeMenu}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to={routes.SERVICES} onClick={closeMenu}>
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink to={routes.BLOG} onClick={closeMenu}>
                  Blog
                </NavLink>
              </li>
              <li className="navbar-cta-item-mobile">
                <button
                  onClick={handleGetInTouch}
                  className="navbar-cta asr-btn asr-btn-primary"
                >
                  Get in Touch
                </button>
              </li>
            </ul>

            <div className="navbar-actions">
              <button
                onClick={handleGetInTouch}
                className="navbar-cta asr-btn asr-btn-primary"
              >
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isOpen && (
        <button
          type="button"
          className="navbar-overlay active"
          aria-label="Close navigation menu"
          onClick={closeMenu}
        />
      )}
    </>
  );
}
