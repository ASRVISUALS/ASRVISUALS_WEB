import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import './HeroSection.css';
import { routes } from '../../routes';

const serviceRows = [
  { id: 'saas', label: 'SaaS Video', color: 'red' },
  { id: 'podcast', label: 'Podcast', color: 'orange' },
  { id: 'linkedin', label: 'LinkedIn Video', color: 'gradient' },
];

const waveformBars = Array.from({ length: 64 }, (_, index) => ({
  index,
  height: 0.42 + ((Math.sin(index * 1.71) + 1) / 2) * 0.58,
}));

function MagneticButton({ children, to, ...props }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });
  const handleMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - bounds.left - bounds.width / 2) * 0.12);
    y.set((event.clientY - bounds.top - bounds.height / 2) * 0.12);
  };
  const reset = () => { x.set(0); y.set(0); };
  const Component = to ? Link : 'a';

  return (
    <motion.div style={{ x: springX, y: springY }} className="magnetic-button-wrap">
      <Component {...props} to={to} onMouseMove={handleMove} onMouseLeave={reset}>
        {children}
      </Component>
    </motion.div>
  );
}

export default function HeroSection() {
  const heroRef = useRef(null);
  const [activeService, setActiveService] = useState(null);
  const [timecode, setTimecode] = useState('00:14:32');
  const cursorX = useMotionValue(50);
  const cursorY = useMotionValue(45);
  const tiltX = useSpring(useTransform(cursorY, [0, 100], [2, -2]), { stiffness: 120, damping: 18 });
  const tiltY = useSpring(useTransform(cursorX, [0, 100], [-2, 2]), { stiffness: 120, damping: 18 });
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start end', 'end start'] });
  const headlineY = useTransform(scrollYProgress, [0, 0.3, 0.82, 1], [40, 0, 0, -80]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.3, 0.82, 1], [0, 1, 1, 0.2]);
  const deckY = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [80, 0, 0, -120]);
  const deckRotate = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [-6, 0, 0, 2]);
  const deckScale = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.92, 1, 1, 1.06]);
  const waveformScale = useTransform(scrollYProgress, [0.2, 0.6], [0.3, 1.2]);
  const playhead = useTransform(scrollYProgress, [0.4, 1], ['0%', '100%']);
  const glowScale = useTransform(scrollYProgress, [0, 1], [0.3, 0.6]);
  const cursorLeft = useTransform(cursorX, [0, 100], ['0%', '100%']);
  const cursorTop = useTransform(cursorY, [0, 100], ['0%', '100%']);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimecode((current) => {
        const [hours, minutes, seconds] = current.split(':').map(Number);
        const total = hours * 3600 + minutes * 60 + seconds + 1;
        return [Math.floor(total / 3600), Math.floor((total % 3600) / 60), total % 60]
          .map((value) => String(value).padStart(2, '0')).join(':');
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const handlePointerMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    cursorX.set(((event.clientX - bounds.left) / bounds.width) * 100);
    cursorY.set(((event.clientY - bounds.top) / bounds.height) * 100);
  };

  return (
    <section ref={heroRef} className="hero-section" id="home" onMouseMove={handlePointerMove}>
      <div className="hero-noise" aria-hidden="true" />
      <motion.div className="hero-glow hero-glow-right" aria-hidden="true" style={{ scale: glowScale }} />
      <motion.div className="hero-cursor-glow" aria-hidden="true" style={{ left: cursorLeft, top: cursorTop }} />
      <div className="hero-container">
        <motion.div className="hero-content" style={{ opacity: headlineOpacity }}>
          <motion.div className="hero-copy" style={{ y: headlineY }}>
            <p className="hero-kicker"><span className="kicker-dot" aria-hidden="true" /> We Help Creators</p>
            <h1 className="hero-title">
              <span className="title-line">Turn Ideas Into</span>
              <span className="title-line title-highlight">High-Impact</span>
              <span className="title-line">Visual Content</span>
            </h1>
            <p className="hero-subtitle">Psychology-backed short form editing, thumbnail systems, and social media management — built to increase visibility, click-through rate, and audience retention.</p>
            <div className="hero-buttons">
              <MagneticButton href="https://cal.com/asrvisuals/30min" target="_blank" rel="noreferrer" className="asr-btn asr-btn-primary">
                <span>Book Free Strategy Call</span><span className="cta-arrow" aria-hidden="true">→</span>
              </MagneticButton>
              <MagneticButton to={routes.SERVICES_WORK} className="asr-btn asr-btn-secondary"><span>See Our Work</span></MagneticButton>
            </div>
          </motion.div>

          <motion.div className="hero-visual" style={{ y: deckY, rotate: deckRotate, scale: deckScale }}>
            <div className="service-chips" aria-label="Services">
              {serviceRows.map((service, index) => (
                <motion.button key={service.id} type="button" className={`service-chip service-chip-${service.id} ${activeService === service.id ? 'is-active' : ''}`} onMouseEnter={() => setActiveService(service.id)} onMouseLeave={() => setActiveService(null)} animate={{ y: [0, -6, 0] }} transition={{ duration: 4 + index, repeat: Infinity, ease: 'easeInOut', delay: index * 0.15 }}>
                  <span className={`service-dot ${service.color}`} /><span>{service.label}</span>
                </motion.button>
              ))}
            </div>
            <motion.div className="studio-deck-wrap" style={{ rotateX: tiltX, rotateY: tiltY }}>
              <div className="studio-deck">
                <div className="deck-header">
                  <div className="window-dots" aria-hidden="true"><span /><span /><span /></div>
                  <span className="deck-file">asrvisuals.live</span>
                  <span className="deck-live"><span className="record-dot" /> LIVE</span>
                  <span className="deck-timecode">{timecode}</span>
                </div>
                <div className="deck-content">
                  <div className="waveform-stage" aria-label="Live reactive audio waveform">
                    <motion.div className="waveform-bars" style={{ scaleY: waveformScale }}>
                      {waveformBars.map((bar) => <span key={bar.index} className={`wave-bar ${activeService ? `wave-region-${activeService}` : ''}`} style={{ '--bar-height': bar.height, '--bar-delay': `${bar.index * 0.03}s` }} />)}
                    </motion.div>
                    <motion.div className="deck-playhead" style={{ left: playhead }}><span /></motion.div>
                  </div>
                  <div className={`deck-row deck-row-video ${activeService === 'saas' ? 'is-highlighted' : ''}`}><span className="row-label"><b>V1</b> VIDEO</span><span className="clip clip-a" /><span className="clip clip-b" /><span className="clip clip-c" /></div>
                  <div className={`deck-row deck-row-audio ${activeService === 'podcast' ? 'is-highlighted' : ''}`}><span className="row-label"><b>A1</b> AUDIO</span><span className="audio-line" /><span className="audio-line short" /></div>
                  <div className={`deck-row deck-row-fx ${activeService === 'linkedin' ? 'is-highlighted' : ''}`}><span className="row-label"><b>FX</b> LAYER</span><span className="fx-block" /><span className="fx-block small" /><span className="fx-block" /></div>
                </div>
                <div className="deck-scanline" aria-hidden="true" />
              </div>
            </motion.div>
            <div className="telemetry-chip"><span className="record-dot" /> REC <b>{timecode}</b> · 4K60</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
