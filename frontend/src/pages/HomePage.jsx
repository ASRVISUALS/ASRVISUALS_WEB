import React, { useEffect, useState, Suspense } from 'react';
import { Link } from 'react-router-dom';

import './HomePage.css';
import HeroSection from '../components/home/HeroSection';
import { lazyWithRetry } from '../utils/lazyWithRetry';

const Clients = lazyWithRetry(() => import('../components/home/Clients'));
const Testimonials = lazyWithRetry(() => import('../components/home/Testimonials'));

const trustStats = [
  { value: '30+', label: 'Active creator and brand partners' },
  { value: '1500+', label: 'Videos delivered across formats' },
  { value: '48-72h', label: 'Typical turnaround for first cut' },
  { value: '4+', label: 'Years of collective editing expertise' }
];

const capabilityCards = [
  {
    title: 'Short-Form Editing',
    description: 'High-retention reels, shorts, and vertical cuts built for scroll-stopping hooks and stronger completion rates.'
  },
  {
    title: 'Long-Form Story Editing',
    description: 'Narrative pacing, visual rhythm, and structure tuned to improve watch-time and keep audiences engaged longer.'
  },
  {
    title: 'Channel Growth Ops',
    description: 'Editorial planning, publishing support, and content repurposing systems to scale output without chaos.'
  }
];

const processSteps = [
  {
    title: 'Brief and Goal Mapping',
    description: 'We audit your audience, positioning, and targets before touching the timeline.'
  },
  {
    title: 'Story and Structure Pass',
    description: 'Hooks, pacing, graphics, and narrative beats are designed around retention behavior.'
  },
  {
    title: 'Delivery and Feedback Loop',
    description: 'You receive review-ready exports, with fast revision cycles and clear communication.'
  },
  {
    title: 'Scale with Performance Insights',
    description: 'We convert learnings into repeatable content systems for predictable growth.'
  }
];

const growthWorkCategories = [
  {
    id: '01',
    title: 'SaaS Explainers',
    detail: 'Product education edits built for conversion clarity and trust.'
  },
  {
    id: '02',
    title: 'Talking Heads',
    detail: 'Niche working cuts and high-retention edits for short form and long form.'
  },
  {
    id: '03',
    title: 'Social Media Management',
    detail: 'Calendar-led publishing and optimization workflows for steady growth.'
  }
];

export default function HomePage() {
  const [showDeferredSections, setShowDeferredSections] = useState(false);

  useEffect(() => {
    const activateDeferredSections = () => setShowDeferredSections(true);

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(activateDeferredSections, { timeout: 1200 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(activateDeferredSections, 700);
    return () => window.clearTimeout(timeoutId);
  }, []);

  // Add structured data for SEO
  useEffect(() => {
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "ASR Visuals",
      "url": "https://asrvisuals.live",
      "description": "Psychology-backed short form editing, thumbnail systems, and social media management built to increase visibility, click-through rate, and audience retention.",
      "image": "https://asrvisuals.live/asr-logo.png",
      "sameAs": [
        "https://youtube.com/@asrvisuals",
        "https://instagram.com/asrvisuals"
      ],
      "contact": {
        "@type": "ContactPoint",
        "telephone": "+1-XXXX-XXXXXX",
        "contactType": "Customer Service",
        "email": "asrvisualshelpline@gmail.com"
      }
    };

    const script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.innerHTML = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      if (script && document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <main className="home-page">
      <HeroSection />

      <section className="home-proof-strip" aria-label="ASR Visuals performance highlights">
        <div className="container">
          <div className="home-proof-grid">
            {trustStats.map((item) => (
              <article key={item.label} className="home-proof-card">
                <strong>{item.value}</strong>
                <p>{item.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-capabilities" aria-labelledby="capabilities-title">
        <div className="container">
          <div className="home-section-head">
            <span className="home-eyebrow">What we do</span>
            <h2 id="capabilities-title">A complete post-production growth stack</h2>
            <p>
              Borrowing the best from top agency playbooks, built for seamless
              workflow, polished visuals, and real impact.
            </p>
          </div>
          <div className="home-capabilities-grid">
            {capabilityCards.map((card) => (
              <article key={card.title} className="home-capability-card">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
          <div className="home-capabilities-cta">
            <Link to="/services" className="asr-btn asr-btn-ghost">View detailed services</Link>
          </div>
        </div>
      </section>

      {/* Our Work Section - Categories Only */}
      <section className="our-work-home-section">
        <div className="container">
          <div className="work-panel">
            <span className="home-eyebrow">SEE OUR EXECUTION</span>
            <h2>Work categories we execute for growth-focused teams</h2>
            <p className="work-panel-subtitle">
              Delivering high-retention video content that turns viewers into loyal followers and scales your brand.
            </p>
            <div className="home-work-categories-grid">
              {growthWorkCategories.map((item) => (
                <Link
                  key={item.id}
                  to="/services#our-work"
                  className="home-work-category-box"
                  aria-label={`View ${item.title} category work`}
                >
                  <span className="home-work-category-index">{item.id}</span>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </Link>
              ))}
            </div>
            <div className="work-cta-row">
              <div className="work-cta-note">
                See detailed examples and individual videos in the dedicated work section.
              </div>
              <Link to="/services#our-work" className="asr-btn asr-btn-primary">
                See Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="home-process" aria-labelledby="home-process-title">
        <div className="container">
          <div className="home-section-head">
            <span className="home-eyebrow">How we work</span>
            <h2 id="home-process-title">Our Workflow</h2>
            <p>
              Built to keep everything super easy.
            </p>
          </div>
          <div className="home-process-grid">
            {processSteps.map((step, index) => (
              <article key={step.title} className="home-process-card">
                <span className="step-badge">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="home-deferred-section home-deferred-section-testimonials">
        {showDeferredSections ? (
          <Suspense fallback={<div className="home-deferred-placeholder" aria-hidden="true" />}>
            <Testimonials />
          </Suspense>
        ) : (
          <div className="home-deferred-placeholder" aria-hidden="true" />
        )}
      </div>

      <div className="home-deferred-section home-deferred-section-clients">
        {showDeferredSections ? (
          <Suspense fallback={<div className="home-deferred-placeholder" aria-hidden="true" />}>
            <Clients />
          </Suspense>
        ) : (
          <div className="home-deferred-placeholder" aria-hidden="true" />
        )}
      </div>

      <section className="home-final-cta">
        <div className="container">
          <div className="home-final-cta-inner">
            <h2>Ready to scale with a dedicated editing partner?</h2>
            <p>
              Share your goals, target platforms, and content frequency.
              We will come back with a practical delivery plan.
            </p>
            <div className="home-final-cta-actions">
              <Link to="/contact" className="asr-btn asr-btn-primary">Start your project</Link>
              <Link to="/services#our-work" className="asr-btn asr-btn-ghost">Review our case work</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
