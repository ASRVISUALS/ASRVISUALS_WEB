import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import './AboutPage.css';

export default function AboutPage() {
  const values = useMemo(() => [
    {
      icon: '01',
      title: 'Precision Editing',
      description: 'Every second is intentional. We edit for story clarity, retention, and measurable business impact.'
    },
    {
      icon: '02',
      title: 'Structured Speed',
      description: 'Reliable turnaround windows powered by process-led production, not rushed output.'
    },
    {
      icon: '03',
      title: 'Creative Excellence',
      description: 'Creative direction, motion language, and pacing designed around platform behavior.'
    },
    {
      icon: '04',
      title: 'Partnership Mindset',
      description: 'We work as an extension of your team with transparent communication and revision loops.'
    }
  ], []);

  const process = useMemo(() => [
    {
      title: 'Audit and alignment',
      description: 'We map your audience, goals, and publishing rhythm before execution starts.'
    },
    {
      title: 'Creative production',
      description: 'Editing, motion, audio, and design systems are executed using a repeatable quality framework.'
    },
    {
      title: 'Review and scale',
      description: 'We capture feedback, optimize outputs, and build recurring systems for weekly consistency.'
    }
  ], []);

  const founders = useMemo(() => [
    {
      name: 'Sachin Rana',
      role: 'Founder & Strategic Lead',
      edgeTitle: 'The Commerce Edge',
      description: 'With a background in Strategic Commerce, Sachin ensures that every visual asset we produce is a calculated business investment, not just an expense. He specializes in market analysis, conversion optimization, and high-level ROI tracking. Sachin\'s mission is to ensure that your content does not just get views - it drives revenue.'
    },
    {
      name: 'Amit Kumar Rana',
      role: 'Co-Founder & Technical Lead',
      edgeTitle: 'The Engineering Edge',
      description: 'As an Engineering specialist, Amit brings technical precision to the creative world. From managing secure database applications to architecting AI-integrated workflows, he treats your brand identity like a high-performance machine. He builds high-retention frameworks and secure digital assets that traditional creative shops simply cannot replicate.'
    }
  ], []);

  return (
    <main className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About <span>ASR Visuals</span></h1>
          <p className="hero-subtitle">
            A post-production partner for creators and brands building serious content engines.
          </p>
        </div>
      </section>

      <section className="about-signature" aria-labelledby="about-signature-title">
        <div className="about-signature-shell">
          <div className="signature-grid">
            <article className="signature-main">
              <p className="signature-kicker">The Fusion of Two Worlds</p>
              <h2 id="about-signature-title">About ASR Visuals: Precision Meets Strategy</h2>
              <p>
                At ASR Visuals, we do not just make videos. We build Revenue Engines.
              </p>
              <p>
                Our agency was born from a unique realization: most creative agencies are built by artists who focus on aesthetics, but they lack the technical systems to scale or the business strategy to convert. We bridge that gap by merging two distinct disciplines into one powerhouse partnership.
              </p>
            </article>

            <aside className="signature-why">
              <h3>Why We Are Different</h3>
              <p>
                While other agencies focus on looking pretty, we focus on performance. We treat your YouTube channel or brand identity as a system to be optimized. We are obsessed with the 3-second hook, the 70% retention rate, and the final conversion.
              </p>
              <p>
                Our background allows us to handle complex, high-stakes visual projects with a level of technical security and business strategy that is rare in the creative industry.
              </p>
            </aside>
          </div>

          <div className="section-header founders-header">
            <h2>Meet the Founders</h2>
            <p>Commerce strategy and engineering precision in one execution team.</p>
          </div>

          <div className="founders-grid">
            {founders.map((founder) => (
              <article key={founder.name} className="founder-card">
                <p className="founder-role">{founder.role}</p>
                <h3>{founder.name}</h3>
                <p className="founder-edge">{founder.edgeTitle}</p>
                <p>{founder.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-process" aria-labelledby="about-process-title">
        <div className="section-header">
          <h2 id="about-process-title">How We Work</h2>
          <p>Simple, transparent, and designed for long-term content scale.</p>
        </div>
        <div className="about-process-grid">
          {process.map((item, idx) => (
            <article key={item.title} className="about-process-card">
              <span className="process-badge">0{idx + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="section-header">
          <h2>Our Values</h2>
          <p>What drives every edit, every day</p>
        </div>
        <div className="values-grid">
          {values.map((value, idx) => (
            <div key={idx} className="value-card">
              <div className="value-icon">{value.icon}</div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-section">
        <div className="section-header">
          <h2>Why Choose ASR Visuals?</h2>
        </div>
        <div className="why-grid">
          <div className="why-item">
            <h3>Performance-Led Creative</h3>
            <p>We prioritize watch-time, retention, and conversion outcomes in every edit.</p>
          </div>
          <div className="why-item">
            <h3>Proven Delivery Systems</h3>
            <p>Repeatable frameworks reduce chaos and increase publishing reliability.</p>
          </div>
          <div className="why-item">
            <h3>Platform Expertise</h3>
            <p>Native execution for YouTube, Reels, Shorts, and podcast-led content formats.</p>
          </div>
          <div className="why-item">
            <h3>Dedicated Collaboration</h3>
            <p>Direct communication and feedback loops with clear accountability.</p>
          </div>
          <div className="why-item">
            <h3>Predictable Turnaround</h3>
            <p>Timelines are planned upfront and maintained through a structured pipeline.</p>
          </div>
          <div className="why-item">
            <h3>Continuous Optimization</h3>
            <p>We refine output using real performance signals and evolving audience behavior.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <h2>Build Your Content Engine With Us</h2>
        <p>Explore our service stack or start your project with a focused execution plan.</p>
        <div className="about-cta-actions">
          <Link to="/services" className="asr-btn asr-btn-primary">View Services</Link>
          <Link to="/contact" className="asr-btn asr-btn-ghost">Start Project</Link>
        </div>
      </section>
    </main>
  );
}
