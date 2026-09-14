import React from 'react';
import { Link } from 'react-router-dom';
import WorkVideoPanel from '../components/home/WorkVideoPanel';
import { getWorkItemsByCategory } from '../data/workData';
import '../pages/CategoryPage.css';

export default function OthersPage() {
  const categoryItems = getWorkItemsByCategory('Others');
  const videos = categoryItems.filter((item) => item.mediaType === 'Video');
  const shorts = categoryItems.filter((item) => item.mediaType === 'Shorts');

  return (
    <main className="category-page">
      <section className="category-hero">
        <div className="category-hero-content">
          <Link to="/services#our-work" className="category-back-link">← Back to Our Work</Link>
          <h1>Other Works</h1>
          <p>Diverse portfolio of specialized content and creative experiments.</p>
        </div>
      </section>

      <section className="category-description">
        <div className="description-content">
          <h2>Beyond Categories: Our Creative Range</h2>
          <p>
            Not everything fits neatly into a single bucket. Our "Other Works" portfolio showcases specialized projects, 
            creative experiments, and unique content formats that don't fit traditional categories. From social proof cuts 
            to custom integrations, this is where we push creative boundaries while maintaining our core principles: 
            clarity, conversion focus, and real results.
          </p>
          <div className="description-highlights">
            <div className="highlight-item">
              <span className="highlight-label">Creative Flexibility</span>
              <span className="highlight-desc">Custom formats built for your unique goals</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-label">Experimental Focus</span>
              <span className="highlight-desc">Testing new ideas and frameworks constantly</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-label">Results-Oriented</span>
              <span className="highlight-desc">Every piece designed to move the needle on your KPIs</span>
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
        <Link to="/work/talking-heads" className="asr-btn asr-btn-ghost">View Talking Heads →</Link>
      </section>
    </main>
  );
}
