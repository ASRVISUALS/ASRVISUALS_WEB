import React from 'react';
import { Link } from 'react-router-dom';
import WorkVideoPanel from '../components/home/WorkVideoPanel';
import { getWorkItemsByCategory } from '../data/workData';
import '../pages/CategoryPage.css';

export default function SaaSExplainersPage() {
  const categoryItems = getWorkItemsByCategory('SaaS Explainers');
  const videos = categoryItems.filter((item) => item.mediaType === 'Video');
  const shorts = categoryItems.filter((item) => item.mediaType === 'Shorts');

  return (
    <main className="category-page">
      <section className="category-hero">
        <div className="category-hero-content">
          <Link to="/services#our-work" className="category-back-link">← Back to Our Work</Link>
          <h1>SaaS Explainers</h1>
          <p>Product-focused videos and shorts engineered for clarity and conversion.</p>
        </div>
      </section>

      <section className="category-description">
        <div className="description-content">
          <h2>What Are SaaS Explainers?</h2>
          <p>
            SaaS explainers are purpose-built videos that break down complex products into digestible, compelling stories. 
            We focus on benefit-first messaging, visual hierarchy, and retention-optimized pacing to help your audience 
            understand exactly why your solution matters—and why they should act now.
          </p>
          <div className="description-highlights">
            <div className="highlight-item">
              <span className="highlight-label">Hook-First Structure</span>
              <span className="highlight-desc">Immediate value prop in the first 3 seconds</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-label">Problem-Solution Flow</span>
              <span className="highlight-desc">Clear narrative arc that guides viewers to action</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-label">Retention-Optimized</span>
              <span className="highlight-desc">Every beat engineered for watch-through and engagement</span>
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
        <Link to="/work/talking-heads" className="asr-btn asr-btn-primary">View Talking Heads →</Link>
        <Link to="/work/others" className="asr-btn asr-btn-ghost">View Others →</Link>
      </section>
    </main>
  );
}
