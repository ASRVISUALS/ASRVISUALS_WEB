import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './ThumbnailsPage.css';

// Importing thumbnails
import beforeImg from '../assets/images/Before-800.webp';
import afterImg from '../assets/images/After-800.webp';
import irlThumbnail from '../assets/images/irl-thumbnail-2-800.webp';
import marketThumbnail from '../assets/images/Market-thumbnail-800.webp';
import thumbnail1 from '../assets/images/Thumbnail1-800.webp';
import tradingThumbnail from '../assets/images/trading-thumbnail-800.webp';
import tradingWithoutMoney from '../assets/images/trading-withoud-money-800.webp';
import vlogingThumbnail from '../assets/images/vloging-thumbnail-800.webp';
import financeThumbnail from '../assets/images/finance-thumbnail-800.webp';
import adolfHitlerThumbnail from '../assets/images/adolf-hitler-Thumbnail-800.webp';

const fallbackThumbnail = thumbnail1;

const thumbnails = [
  { src: irlThumbnail, alt: '1. Food Challenge: $5 vs $5,000 Burger Comparison' },
  { src: marketThumbnail, alt: '2. Grocery Receipt Cost Comparison' },
  { src: thumbnail1, alt: '3. Mindset Coach: Escaping the Corporate Trap - Part 2' },
  { src: tradingThumbnail, alt: '4. LinkedIn Growth: 52,320+ Followers Strategy' },
  { src: tradingWithoutMoney, alt: '5. Gold + Crypto US Session Live Trading' },
  { src: vlogingThumbnail, alt: '6. Australia Travel Vlogging Series' },
  { src: financeThumbnail, alt: '7. PayPal Revenue: $2,895.00 Dashboard' },
  { src: adolfHitlerThumbnail, alt: '8. Historical Timeline: 1915 vs 1934 Comparison' },
];

export default function ThumbnailsPage() {
  const [lightboxImage, setLightboxImage] = useState(null);
  const cloneCount = Math.min(2, thumbnails.length);
  const totalSlides = Math.max(1, thumbnails.length + cloneCount * 2);
  const [activeIndex, setActiveIndex] = useState(cloneCount);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const [isAutoPlayPaused, setIsAutoPlayPaused] = useState(false);
  const touchStartX = useRef(0);

  const loopSlides = useMemo(() => {
    if (thumbnails.length === 0) {
      return [];
    }

    const leadingClones = thumbnails.slice(-cloneCount);
    const trailingClones = thumbnails.slice(0, cloneCount);

    return [...leadingClones, ...thumbnails, ...trailingClones];
  }, [cloneCount]);

  const activeDotIndex = ((activeIndex - cloneCount) % thumbnails.length + thumbnails.length) % thumbnails.length;

  const openLightbox = (image) => {
    setLightboxImage(image);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  useEffect(() => {
    if (!lightboxImage) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeLightbox();
      }
    };

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [lightboxImage]);

  useEffect(() => {
    if (isAutoPlayPaused || thumbnails.length <= 1) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setIsTransitionEnabled(true);
      setActiveIndex((prev) => prev + 1);
    }, 3200);

    return () => {
      window.clearInterval(timer);
    };
  }, [isAutoPlayPaused]);

  const goNext = () => {
    setIsTransitionEnabled(true);
    setActiveIndex((prev) => prev + 1);
  };

  const goPrev = () => {
    setIsTransitionEnabled(true);
    setActiveIndex((prev) => prev - 1);
  };

  const jumpToSlide = (index) => {
    setIsTransitionEnabled(true);
    setActiveIndex(index + cloneCount);
  };

  const handleTrackTransitionEnd = () => {
    // Defer state update to avoid blocking UI
    requestAnimationFrame(() => {
      if (activeIndex < cloneCount) {
        setIsTransitionEnabled(false);
        setActiveIndex((prev) => prev + thumbnails.length);
        return;
      }

      if (activeIndex >= thumbnails.length + cloneCount) {
        setIsTransitionEnabled(false);
        setActiveIndex((prev) => prev - thumbnails.length);
      }
    });
  };

  const onTouchStart = (event) => {
    // Only track swipes on the carousel, not on buttons
    if (event.target.closest('.thumbnails-nav-btn') || event.target.closest('button')) {
      return;
    }
    // Use passive event listener - store immediately for minimal lag
    if (event.touches && event.touches[0]) {
      touchStartX.current = event.touches[0].clientX;
    }
  };

  const onTouchEnd = (event) => {
    // Only handle swipes from the carousel itself
    if (!touchStartX.current || event.target.closest('button')) {
      return;
    }

    // Defer expensive calculations to not block UI
    requestAnimationFrame(() => {
      const swipeDistance = event.changedTouches[0].clientX - touchStartX.current;
      const minSwipeDistance = Math.min(50, window.innerWidth * 0.15);

      if (Math.abs(swipeDistance) < minSwipeDistance) {
        return;
      }

      if (swipeDistance > 0) {
        goPrev();
        return;
      }

      goNext();
    });
  };

  return (
    <main className="thumbnails-page">
      <section className="thumbnails-hero">
        <p className="thumbnails-eyebrow">Thumbnail Optimization Case</p>
        <h1>High-Click Thumbnails That Lift CTR</h1>
        <p className="thumbnails-subtitle">
          A direct before and after breakdown of how strategic design decisions turn impressions into clicks.
        </p>
      </section>

      <section className="thumbnails-case-section" aria-label="Before and after thumbnail comparison">
        <h2>Case Study Snapshot</h2>
        <p className="thumbnails-section-lead">From low-clarity visuals to high-contrast, high-intent thumbnail systems.</p>

        <section className="before-after-row">
          <div className="before-col">
            <button
              type="button"
              className="thumbnail-preview-trigger"
              onClick={() => openLightbox({ src: beforeImg, alt: 'Before Thumbnail' })}
              aria-label="Open before thumbnail preview"
            >
              <img
                src={beforeImg}
                alt="Before Thumbnail"
                className="before-after-img"
                width="800"
                height="640"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </button>
            <div className="before-after-label before">Before</div>
          </div>
          <div className="after-col">
            <button
              type="button"
              className="thumbnail-preview-trigger"
              onClick={() => openLightbox({ src: afterImg, alt: 'After Thumbnail' })}
              aria-label="Open after thumbnail preview"
            >
              <img src={afterImg} alt="After Thumbnail" className="before-after-img" width="800" height="640" loading="lazy" decoding="async" />
            </button>
            <div className="before-after-label after">After</div>
          </div>
        </section>

        <div className="thumbnails-uplift-pill" role="note" aria-label="Click-through rate uplift">
          3.0% to 9.3% CTR | 125% increase
        </div>
      </section>

      <section className="thumbnails-gallery-section" aria-label="Additional thumbnails showcase">
        <h2>More Thumbnail Examples</h2>
        <p className="thumbnails-section-lead">Designed for clarity at a glance, mobile visibility, and stronger click intent.</p>

        <div
          className="thumbnails-carousel"
          onMouseEnter={() => setIsAutoPlayPaused(true)}
          onMouseLeave={() => setIsAutoPlayPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          aria-label="Thumbnail slider"
        >
          <button
            type="button"
            className="thumbnails-nav-btn prev"
            onClick={goPrev}
            aria-label="Show previous thumbnail"
          >
            <span aria-hidden="true">&lt;</span>
          </button>

          <div className="thumbnails-viewport">
            <section
              className="thumbnails-track"
              style={{
                '--slides-count': totalSlides,
                transform: `translateX(-${(activeIndex * 100) / totalSlides}%)`,
                transition: isTransitionEnabled ? 'transform 0.28s cubic-bezier(0.22, 0.61, 0.36, 1)' : 'none',
              }}
              onTransitionEnd={handleTrackTransitionEnd}
            >
              {loopSlides.map((thumb, idx) => (
                <div className="thumbnails-slide" key={`${thumb.alt}-${idx}`}>
                  <div className="thumbnails-page-card">
                    <button
                      type="button"
                      className="thumbnail-preview-trigger"
                      onClick={() => openLightbox(thumb)}
                      aria-label={`Open ${thumb.alt} preview`}
                    >
                      <img
                        src={thumb.src}
                        alt={thumb.alt}
                        className="thumbnails-page-img"
                        width="800"
                        height="450"
                        loading={idx === cloneCount ? 'eager' : 'lazy'}
                        decoding="async"
                        fetchPriority={idx === cloneCount ? 'high' : 'auto'}
                        onError={(event) => {
                          event.currentTarget.src = fallbackThumbnail;
                        }}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </section>
          </div>

          <button
            type="button"
            className="thumbnails-nav-btn next"
            onClick={goNext}
            aria-label="Show next thumbnail"
          >
            <span aria-hidden="true">&gt;</span>
          </button>
        </div>

        <div className="thumbnails-dots" role="tablist" aria-label="Select thumbnail">
          {thumbnails.map((thumb, idx) => (
            <button
              key={thumb.alt}
              type="button"
              className={`thumbnails-dot ${activeDotIndex === idx ? 'is-active' : ''}`}
              onClick={() => jumpToSlide(idx)}
              aria-label={`Go to ${thumb.alt}`}
            />
          ))}
        </div>

        <div className="thumbnails-actions">
          <a href="https://cal.com/asrvisuals/30min" target="_blank" rel="noreferrer" className="asr-btn asr-btn-primary">
            Book a Free Strategy Call
          </a>
          <Link to="/contact" className="asr-btn asr-btn-ghost">Discuss Your Channel</Link>
        </div>
      </section>

      {lightboxImage && (
        <div className="thumbnail-lightbox" role="dialog" aria-modal="true" aria-label="Thumbnail preview" onClick={closeLightbox}>
          <div className="thumbnail-lightbox-content" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="thumbnail-lightbox-close"
              onClick={closeLightbox}
              aria-label="Close thumbnail preview"
            >
              x
            </button>
            <img src={lightboxImage.src} alt={lightboxImage.alt} className="thumbnail-lightbox-image" />
            <p className="thumbnail-lightbox-caption">{lightboxImage.alt}</p>
          </div>
        </div>
      )}
    </main>
  );
}
