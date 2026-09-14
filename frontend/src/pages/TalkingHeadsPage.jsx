import React from 'react';
import { Link } from 'react-router-dom';
import WorkVideoPanel from '../components/home/WorkVideoPanel';
import { getWorkItemsByCategory } from '../data/workData';
import '../pages/CategoryPage.css';

export default function TalkingHeadsPage() {
  const categoryItems = getWorkItemsByCategory('Talking Heads');
  const videos = categoryItems.filter((item) => item.mediaType === 'Video');
  const shorts = categoryItems.filter((item) => item.mediaType === 'Shorts');

  return (
    <main className="category-page">
      <section className="category-hero">
        <div className="category-hero-content">
          <Link to="/services#our-work" className="category-back-link">← Back to Our Work</Link>
          <h1>Talking Heads</h1>
          <p>Thought-leadership and founder content engineered for engagement and authority.</p>
        </div>
      </section>

      <section className="category-description">
        <div className="description-content">
          <h2>Why Talking Heads Content Matters</h2>
          <p>
            Talking heads content builds trust and authority through authentic, face-to-face connection. Whether it's 
            founder insights, expert perspectives, or thought-leadership moments, we edit these pieces to maximize 
            watch time, comments, and shares. The focus is on presence, pacing, and emotional resonance.
          </p>
          <div className="description-highlights">
            <div className="highlight-item">
              <span className="highlight-label">Presence Maximized</span>
              <span className="highlight-desc">Authentic framing that builds viewer connection</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-label">Comment-Driven</span>
              <span className="highlight-desc">Pacing and messaging designed to spark conversation</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-label">Authority Built</span>
              <span className="highlight-desc">Edit structure that reinforces expertise and vision</span>
            </div>
          </div>
        </div>
      </section>

      <div className="category-container">
        <WorkVideoPanel
          videos={videos}
          shorts={shorts}
          panelTitle=""
        />
      </div>

      <section className="category-navigation">
        <Link to="/work/saas-explainers" className="asr-btn asr-btn-primary">View SaaS Explainers →</Link>
        <Link to="/work/others" className="asr-btn asr-btn-ghost">View Others →</Link>
      </section>
    </main>
  );
}
