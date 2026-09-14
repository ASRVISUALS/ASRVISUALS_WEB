import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Services.css';
import { routes } from '../../routes';
import Thumbnail1 from '../../assets/images/portfolio/Thumbnail1-800.webp';
import FinanceThumbnail from '../../assets/images/finance-thumbnail-800.webp';
import HeroTeam from '../../assets/images/image1-800.webp';

const servicesData = [
  {
    id: 1,
    title: 'V Series',
    description: 'Long-form style edits and storytelling-led content examples from our main video projects.',
    image: Thumbnail1
  },
  {
    id: 2,
    title: 'Shorts',
    description: 'High-retention short-form edits optimized for YouTube Shorts, Reels, and short attention windows.',
    image: FinanceThumbnail
  },
  {
    id: 3,
    title: 'Performance Case Studies',
    description: 'Before/after examples that show measurable creative improvements across content packaging.',
    image: HeroTeam
  }
];

export default function Services() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = servicesData.length;

  const handlePrev = (e) => {
    e.preventDefault();
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.preventDefault();
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (isPaused) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    }, 4300);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isPaused, totalSlides]);

  return (
    <section className="services-section" id="services">
      <div className="services-container">
        <div className="services-header">
          <p className="services-kicker">Content Categories</p>
          <h2>Browse Our Work By Category</h2>
          <p>
            Explore category-wise examples from our Work page and jump directly to the videos that match your goals.
          </p>
        </div>

        <div className="services-panel">
          <p className="services-panel-label">Open Our Work Categories</p>

          <div
            className="services-slider"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocusCapture={() => setIsPaused(true)}
            onBlurCapture={() => setIsPaused(false)}
            aria-label="Services categories slider"
          >
            <button
              type="button"
              className="services-cursor services-cursor-left"
              onClick={handlePrev}
              aria-label="Previous service category"
            >
              &#8249;
            </button>

            <div className="services-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {servicesData.map((service) => (
                <article key={service.id} className="service-card">
                  <div className="service-media">
                    <img src={service.image} alt={service.title} width="800" height="533" loading="lazy" decoding="async" />
                  </div>
                  <h3>{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                </article>
              ))}
            </div>

            <button
              type="button"
              className="services-cursor services-cursor-right"
              onClick={handleNext}
              aria-label="Next service category"
            >
              &#8250;
            </button>
          </div>

          <div className="services-dots" role="tablist" aria-label="Select service category">
            {servicesData.map((service, index) => (
              <button
                key={`${service.title}-dot`}
                type="button"
                className={`services-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setCurrentSlide(index); }}
                role="tab"
                aria-selected={index === currentSlide}
                aria-label={`Show ${service.title}`}
              />
            ))}
          </div>

          <div className="services-cta-row">
            <Link to={routes.SERVICES_WORK} className="asr-btn asr-btn-primary">
              View Category-wise Work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
