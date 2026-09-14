import React from 'react';
import { Link } from 'react-router-dom';
import './BeforeAfterThumbnails.css';
import Before from '../../assets/images/Before-800.webp';
import After from '../../assets/images/After-800.webp';

export default function BeforeAfterThumbnails() {
  return (
    <section className="before-after-section">
      <div className="section-header">
        <h2>Thumbnail Optimization Case</h2>
      </div>

      <div className="case-grid">
        <div className="case-cards">
          <div className="case-card before">
            <div className="card-label">Before</div>
            <img src={Before} alt="Before design" width="800" height="640" loading="lazy" decoding="async" />
          </div>

          <div className="case-card after">
            <div className="card-label">After</div>
            <img src={After} alt="After design" width="800" height="640" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>

      <div className="thumbnails-link-wrap">
        <Link to="/thumbnails" className="asr-btn asr-btn-primary thumbnails-link-btn">
          See Thumbnails
        </Link>
      </div>
    </section>
  );
}
