import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo64 from '../../assets/images/asr-logo-64.webp';
import logo128 from '../../assets/images/asr-logo-128.webp';
import logo192 from '../../assets/images/asr-logo-192.webp';
import logo400 from '../../assets/images/asr-logo-400.webp';
import { routes } from '../../routes';
import { usePageTransition } from '../../hooks/usePageTransition';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { transitionTo } = usePageTransition();

  const handleGetInTouch = (e) => {
    e.preventDefault();
    transitionTo(routes.CONTACT);
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <section className="footer-contact-band">
          <div className="contact-band-left">
            <p>ASR Visuals Location:</p>
            <div className="address-info">
              <span className="address-icon" aria-hidden="true">📍</span>
              <p>
                ASR Visuals, Second Floor, Plot No. 208B, Phase 8B, Dwarka, Sector 13, Delhi 110078
              </p>
            </div>
          </div>
          <div className="contact-band-right">
            <p>Ready to transform your content?</p>
            <h3>Get in Touch</h3>
            <button 
              onClick={handleGetInTouch} 
              className="asr-btn asr-btn-light"
            >
              Click here
            </button>
          </div>
        </section>

        <div className="footer-main-grid">
          <section className="footer-brand-col">
            <div className="footer-logo-wrap">
              <img
                src={logo400}
                srcSet={`${logo64} 64w, ${logo128} 128w, ${logo192} 192w, ${logo400} 400w`}
                sizes="(max-width: 480px) 110px, (max-width: 640px) 130px, (max-width: 900px) 150px, 176px"
                alt="ASR Visuals logo"
                width="176"
                height="176"
                loading="lazy"
                decoding="async"
                fetchpriority="low"
              />
            </div>
            <p>
              ASR Visuals is a Post Production and Graphic Studio proudly partnering
              with international institutions, growing businesses, and rising creators worldwide.
            </p>
          </section>

          <section className="footer-links-col">
            <h4>Useful Links</h4>
            <ul>
              <li><Link to={routes.HOME}>Home</Link></li>
              <li><Link to={routes.BLOG}>Blogs</Link></li>
              <li><Link to={routes.SERVICES}>Services</Link></li>
              <li><Link to={routes.TERMS}>Terms & Conditions</Link></li>
              <li><Link to={routes.PRIVACY}>Privacy Policy</Link></li>
              <li><Link to={routes.REFUND}>Refund Policy</Link></li>
            </ul>
          </section>

          <section className="footer-social-col">
            <h4>Follow Us</h4>
            <div className="social-row">
              <a href="https://www.instagram.com/asr_visuals_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" aria-label="Instagram">IG</a>
              <a href="https://www.linkedin.com/in/asr-visuals-8a2312381?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer" aria-label="LinkedIn">IN</a>
              <a href="https://x.com/VisualsAsr83268" target="_blank" rel="noreferrer" aria-label="X">X</a>
            </div>
          </section>

          <section className="footer-contact-col">
            <h4>Contact Info</h4>
            <p>
              <a href="mailto:asrvisualshelpline@gmail.com">asrvisualshelpline@gmail.com</a>
            </p>
          </section>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} ASR Visuals. Built for creators, teams, and businesses worldwide.</p>
          <p>
            <Link to={routes.TERMS}>Terms</Link> | <Link to={routes.PRIVACY}>Privacy</Link> | <Link to={routes.REFUND}>Refund</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
