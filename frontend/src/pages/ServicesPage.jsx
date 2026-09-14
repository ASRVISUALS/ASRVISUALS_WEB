import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import './ServicesPage.css';
import CaseStudy1 from '../assets/images/clients/short form case study-800.webp';
import OurWork from '../components/home/OurWork';

const serviceMetrics = [
  { value: '150+', label: 'Active creator and brand partners' },
  { value: '1500+', label: 'Videos delivered across formats' },
  { value: '48-72h', label: 'Typical turnaround for first cut' },
  { value: '98%', label: 'Client Satisfaction' }
];

const serviceClusters = [
  {
    title: 'YouTube and Long-Form Editing',
    points: [
      'Hook-first openers and retention structure',
      'Narrative clean-up, pacing, and visual hierarchy',
      'Episode formats for podcast and interview content'
    ]
  },
  {
    title: 'Short-Form and Reels Engine',
    points: [
      'Platform-native edits for Instagram, YouTube, and TikTok',
      'Caption, motion, and beat sync optimized for watch-through',
      'Bulk short-form production for content calendars'
    ]
  },
  {
    title: 'Thumbnail and Creative Packaging',
    points: [
      'CTR-focused thumbnail design systems',
      'Visual experimentation with style-safe variations',
      'Title-visual alignment for stronger click intent'
    ]
  },
  {
    title: 'Content Operations and Support',
    points: [
      'Dedicated point of contact and project management',
      'Revision workflow with transparent feedback loops',
      'Repurposing strategy to scale from one source asset'
    ]
  }
];

const whyUs = [
  'Fixed turnaround commitments with realistic scope planning.',
  'Collaborative edits aligned with your brand voice and audience behavior.',
  'Process-led quality control across delivery formats and platforms.',
  'Growth lens on every output, not just visual cleanup.'
];

export default function ServicesPage() {
  const location = useLocation();
  const isWorkView = location.hash === '#our-work';
  return (
    <main className="services-page">
      <section className="services-hero">
        <div className="services-hero-content">
          <h1>{isWorkView ? 'Our Work' : 'Services'}</h1>
          <p>
            {isWorkView
              ? 'Case studies and performance-focused delivery examples from ASR Visuals.'
              : 'Everything you need for short form growth, thumbnail optimization, and social media management.'}
          </p>
          <div className="services-hero-actions">
            {isWorkView ? (
              <Link to="/services" className="asr-btn asr-btn-primary">View Services Content</Link>
            ) : (
              <>
                <a href="#services-list" className="asr-btn asr-btn-primary">Explore Services</a>
                <a href="#our-work" className="asr-btn asr-btn-ghost">Check Our Work</a>
              </>
            )}
          </div>
        </div>
      </section>

      <div className="services-container">
        {!isWorkView && (
          <>
            <section className="services-metrics" aria-label="Service performance metrics">
              {serviceMetrics.map((item) => (
                <article key={item.label} className="services-metric-card">
                  <strong>{item.value}</strong>
                  <p>{item.label}</p>
                </article>
              ))}
            </section>

            <section className="services-intro" id="services-list">
              <h2>What We Provide</h2>
              <p>
                At ASR Visuals, we combine the strongest patterns used by top video agencies:
                clear positioning, transparent process, and conversion-focused creative execution.
                Everything is designed to help you scale content without sacrificing quality.
              </p>
            </section>

            <section className="services-clusters" aria-labelledby="services-clusters-title">
              <div className="section-head-row">
                <h2 id="services-clusters-title">Our service architecture</h2>
                <p>Built for creators, brands, and teams with recurring content needs.</p>
              </div>
              <div className="services-clusters-grid">
                {serviceClusters.map((cluster) => (
                  <article key={cluster.title} className="service-cluster-card">
                    <h3>{cluster.title}</h3>
                    <ul>
                      {cluster.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            {/* The Three Pillars Section */}
            <section className="three-pillars">
              <h2>The Three Pillars</h2>
              <div className="pillars-grid">
                <div className="pillar-card">
                  <div className="pillar-number">1</div>
                  <h3>The "ROI-First" Approach (Commerce)</h3>
                  <p className="pillar-tagline">Every edit is a business decision.</p>
                  <p className="pillar-description">
                    Why a 10% increase in retention equals a 30% increase in revenue. 
                    We don't just edit; we audit your business goals first.
                  </p>
                </div>
                <div className="pillar-card">
                  <div className="pillar-number">2</div>
                  <h3>The "Systematized Creative" (Engineering)</h3>
                  <p className="pillar-tagline">Technical workflow meets creativity.</p>
                  <p className="pillar-description">
                    How we use Engineering principles to streamline video production. 
                    Our 'AR' workflow ensures fast delivery without losing quality.
                  </p>
                </div>
                <div className="pillar-card">
                  <div className="pillar-number">3</div>
                  <h3>Data-Driven Storytelling</h3>
                  <p className="pillar-tagline">Most editors guess. You use data.</p>
                  <p className="pillar-description">
                    Most agencies guess what people like. We analyze heatmaps and drop-off points 
                    to re-engineer your content for the algorithm.
                  </p>
                </div>
              </div>
            </section>

            {/* Case Studies Section */}
            <section className="case-studies-section">
              <h2>Proven Results</h2>
              <p className="case-studies-intro">Real clients. Real growth. Real impact.</p>
              <div className="case-studies-grid">
                <div className="case-study-card">
                  <div className="case-study-image">
                    <img
                      src={CaseStudy1}
                      alt="Script-First Strategy Case Study"
                      width="800"
                      height="450"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="case-study-content">
                    <span className="client-name">Viral Content Strategy</span>
                    <h3>The Right Script Hits Harder Than Heavy Production</h3>
                    <p className="case-description">
                      This reel crossed 300,000+ views organically with almost zero editing. How? 
                      Deep audience research, a hyper-targeted script, and flawless timing. 
                      We capitalized on a trending conversation at the exact right moment, 
                      proving that a calculated message always cuts through the noise.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="services-why-us" aria-labelledby="services-why-us-title">
              <div className="section-head-row">
                <h2 id="services-why-us-title">Why teams choose ASR Visuals</h2>
              </div>
              <div className="services-why-grid">
                {whyUs.map((line) => (
                  <article key={line} className="services-why-card">
                    <p>{line}</p>
                  </article>
                ))}
              </div>
            </section>

          </>
        )}

        {isWorkView && (
          <section className="portfolio-merged" id="our-work">
            <OurWork />
          </section>
        )}

        {!isWorkView && (
          <>
            <section className="services-process">
              <h2>Our Process</h2>
              <div className="process-steps">
                <div className="step">
                  <div className="step-number">1</div>
                  <h4>Discovery Call</h4>
                  <p>We understand your goals, audience, and vision.</p>
                </div>
                <div className="step">
                  <div className="step-number">2</div>
                  <h4>Strategy Plan</h4>
                  <p>We build a focused growth and production plan.</p>
                </div>
                <div className="step">
                  <div className="step-number">3</div>
                  <h4>Execution</h4>
                  <p>Professional editing and design with hook-first approach.</p>
                </div>
                <div className="step">
                  <div className="step-number">4</div>
                  <h4>Launch & Scale</h4>
                  <p>We optimize performance for continuous growth.</p>
                </div>
              </div>
            </section>

            <section className="pricing-cta">
              <h2>Ready to Build Your Content Engine?</h2>
              <p>Work with ASR Visuals for performance-focused creative execution.</p>
              <div className="cta-buttons">
                <a href="#our-work" className="asr-btn asr-btn-ghost">Revisit Our Work</a>
                <Link to="/contact" className="asr-btn asr-btn-primary">Start Your Project</Link>
              </div>
            </section>
          </>
        )}

        {isWorkView && (
          <section className="pricing-cta">
            <h2>Need the same execution for your brand?</h2>
            <p>Go back to services or start your project directly.</p>
            <div className="cta-buttons">
              <Link to="/services" className="asr-btn asr-btn-ghost">View Services</Link>
              <Link to="/contact" className="asr-btn asr-btn-primary">Start Your Project</Link>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
