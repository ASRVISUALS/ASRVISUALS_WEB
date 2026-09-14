import React from 'react';
import './Testimonials.css';
import Abhijit from '../../assets/images/clients/Abhijit-400.webp';
import Andrew from '../../assets/images/clients/Andrew-400.webp';
import Damon from '../../assets/images/clients/Damon-400.webp';
import GlobalOpportunities from '../../assets/images/clients/Global Opportunities-400.webp';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Abhijit',
      role: 'Creator',
      quote:
        'Thanks to ASR Visuals, especially Sachin, for the great video editing and scripting service. I really loved it. Recently, one of our social justice videos exploded online and was displayed on national media. I have no words to express it.',
      image: Abhijit
    },
    {
      name: 'Global Opportunities',
      role: 'Rashi, Ireland Country Head',
      quote:
        "Hi, I'm Rashi, the Ireland Country Head at Global Opportunities. I've had a fantastic experience working with ASR Visuals over the past 4 months. Their turnaround times are consistent, and their management of our social Instagram page has been completely seamless and hassle-free. Highly recommended!",
      image: GlobalOpportunities
    },
    {
      name: 'Andrew',
      role: 'International Creator',
      quote:
        "I've been working with ASR Visuals for 15 days. Zero delays, and I absolutely love the quality. I definitely recommend them to anyone needing solid work.",
      image: Andrew
    },
    {
      name: 'Damon',
      role: 'Creator',
      quote:
        "Hey man! I'm Damon McLean. I've had a fantastic experience working with ASR Visuals every single time. I got the work on time with great quality, credit to Amit.",
      image: Damon
    }
  ];

  const loopTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials-container">
        <p className="testimonials-kicker">Testimonials</p>
        <h2>What Clients Say After Working With ASR Visuals</h2>
        <p className="testimonials-intro">
          From creator brands to international teams, our partners choose us for growth-focused execution and repeatable quality.
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
      </div>
    </section>
  );
}
