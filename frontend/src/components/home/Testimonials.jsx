import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Testimonials.css';
import Abhijit from '../../assets/images/clients/Abhijit-400.webp';
import BunMuska from '../../assets/images/clients/BunMuska.jpg';
import Ongrow from '../../assets/images/clients/Ongrow.jpg';

export default function Testimonials() {
  const vimeoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const hideTimeoutRef = useRef(null);

  const resetHideTimer = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    hideTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 2500);
  }, []);

  const handleVideoToggle = useCallback(() => {
    if (vimeoRef.current && vimeoRef.current.contentWindow) {
      if (isVideoPlaying) {
        vimeoRef.current.contentWindow.postMessage(JSON.stringify({ method: 'pause' }), '*');
        setIsVideoPlaying(false);
        setShowControls(true);
        if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      } else {
        vimeoRef.current.contentWindow.postMessage(JSON.stringify({ method: 'play' }), '*');
        setIsVideoPlaying(true);
        setShowControls(true);
        resetHideTimer();
      }
    }
  }, [isVideoPlaying, resetHideTimer]);

  const handleWrapperTap = () => {
    if (!isVideoPlaying) {
      handleVideoToggle();
    } else {
      if (!showControls) {
        setShowControls(true);
        resetHideTimer();
      } else {
        handleVideoToggle();
      }
    }
  };

  const handleMouseMove = () => {
    if (isVideoPlaying) {
      setShowControls(true);
      resetHideTimer();
    }
  };

  const handleMouseLeave = () => {
    if (isVideoPlaying) {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      setShowControls(false);
    }
  };

  useEffect(() => {
    const handleMessage = (event) => {
      try {
        let data = event.data;
        if (typeof data === 'string') {
          data = JSON.parse(data);
        }
        if (data) {
          if (data.event === 'play') {
            setIsVideoPlaying(true);
          } else if (data.event === 'pause' || data.event === 'finish' || data.event === 'ended') {
            setIsVideoPlaying(false);
            setShowControls(true);
            if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
          }
        }
      } catch {
        // ignore non-json messages
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  const testimonials = [
    {
      name: 'Abhijit',
      role: 'Creator',
      quote:
        'Thanks to ASR Visuals, especially Sachin, for the great video editing and scripting service. I really loved it. Recently, one of our social justice videos exploded online and was displayed on national media. I have no words to express it.',
      image: Abhijit
    },
    {
      name: 'Bun Muska Media',
      role: 'Media Agency',
      quote:
        "Working with Sachin was an absolute pleasure. I'm thrilled to see him scaling his own venture and have no doubt it will be a huge success. Highly recommended!",
      image: BunMuska
    },
    {
      name: 'Ongrow Media',
      role: 'Media Agency',
      quote:
        "Working with Sachin! completely transformed our social media presence. Their grasp on short-form content is unmatched—the editing is crisp, the hooks are engaging, and our audience retention has skyrocketed. I must recommend to take a look.",
      image: Ongrow
    }
  ];

  const loopTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials-container">
        <div style={{ textAlign: 'center', marginBottom: '0.8rem' }}>
          <span className="home-eyebrow">TESTIMONIALS</span>
        </div>
        <h2>What Clients Say After Working With ASR Visuals</h2>
        <p className="testimonials-intro">
          Trusted by one of the biggest companies and international creators.
        </p>

        <div className="testimonials-slider" aria-label="Testimonials slider">
          <div className="testimonials-track" role="list">
            {loopTestimonials.map((item, index) => (
              <article
                key={`${item.name}-${index}`}
                className="testimonial-card"
                role="listitem"
                aria-hidden={index >= testimonials.length}
              >
                <div className="testimonial-head">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="testimonial-avatar"
                    width="72"
                    height="72"
                    loading="lazy"
                    decoding="async"
                  />
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.role}</p>
                  </div>
                </div>
                <p className="testimonial-quote">"{item.quote}"</p>
              </article>
            ))}
          </div>
        </div>

        <div className="video-testimonial-section">
          <div className="video-testimonial-container">
            <div 
              className="video-wrapper"
              onClick={handleWrapperTap}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <iframe 
                src="https://player.vimeo.com/video/1226930160?title=0&byline=0&portrait=0&badge=0&controls=0&api=1" 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                allow="autoplay; fullscreen; picture-in-picture" 
                allowFullScreen
                title="Bun Muska Media - Prab Singh Testimonial"
                ref={vimeoRef}
              ></iframe>
              <div className="video-touch-overlay" aria-hidden="true" />
              <button 
                type="button"
                className={`video-play-btn ${isVideoPlaying ? 'playing' : ''} ${showControls ? 'is-visible' : 'is-hidden'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleVideoToggle();
                }}
                aria-label={isVideoPlaying ? 'Pause video' : 'Play video'}
              >
                {isVideoPlaying ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                )}
              </button>
            </div>
            <div className="video-testimonial-info">
              <h3>Prab Singh</h3>
              <p>Founder, Bun Muska Media</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
