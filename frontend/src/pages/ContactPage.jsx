import React, { useEffect, useState } from 'react';
import './ContactPage.css';

const INSTAGRAM_LINK = 'https://www.instagram.com/asr_visuals_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==';
const X_LINK = 'https://x.com/VisualsAsr83268';

const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSdQEI2sNxC7JP5g2o6zPv9Xu9AxVqFjMawFUeAEOZVieFvUOw/formResponse';
const GOOGLE_FORM_ENTRIES = {
  name: 'entry.2005620554',
  email: 'entry.1045781291',
  youtubeLink: 'entry.1065046570',
  phoneNumber: 'entry.1166974658',
  services: 'entry.344106121',
  projectDescription: 'entry.839337160'
};

const processExpectations = [
  {
    title: 'Share your requirement',
    detail: 'Tell us your goals, style references, and delivery frequency.'
  },
  {
    title: 'Get a practical plan',
    detail: 'We respond with suggestions and workflow structure.'
  },
  {
    title: 'Start production',
    detail: 'Editing, review, revisions, final draft.'
  }
];

const quickFaq = [
  {
    question: 'What is your average turnaround time?',
    answer: 'Most projects receive their first cut in 48-72 hours depending on scope.'
  },
  {
    question: 'Can you handle recurring monthly content?',
    answer: 'Yes, we do.'
  },
  {
    question: 'Do you support urgent requests?',
    answer: 'Yes, mention urgency in your brief and we will prioritize accordingly.'
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    youtubeLink: '',
    phoneNumber: '',
    projectDescription: '',
    services: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Add LocalBusiness structured data for SEO
  useEffect(() => {
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "ASR Visuals",
      "description": "Professional video editing and content creation service for creators and brands",
      "url": "https://asrvisuals.live",
      "telephone": "+1-XXXX-XXXXXX",
      "email": "asrvisualshelpline@gmail.com",
      "areaServed": "Worldwide",
      "serviceType": ["Video Editing", "Thumbnail Design", "Social Media Management"],
      "priceRange": "$$$",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "availableLanguage": "English",
        "email": "asrvisualshelpline@gmail.com"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Main St",
        "addressLocality": "City",
        "addressRegion": "State",
        "postalCode": "00000",
        "addressCountry": "IN"
      },
      "sameAs": [
        "https://youtube.com/@asrvisuals",
        "https://instagram.com/asr_visuals",
        "https://x.com/VisualsAsr83268"
      ]
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        services: checked
          ? [...prev.services, value]
          : prev.services.filter((service) => service !== value)
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.services.length === 0) {
      setError('✕ Please select at least one service.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const payload = new URLSearchParams();
      payload.append(GOOGLE_FORM_ENTRIES.name, formData.name);
      payload.append(GOOGLE_FORM_ENTRIES.email, formData.email);
      payload.append(GOOGLE_FORM_ENTRIES.youtubeLink, formData.youtubeLink);
      payload.append(GOOGLE_FORM_ENTRIES.phoneNumber, formData.phoneNumber);
      payload.append(GOOGLE_FORM_ENTRIES.projectDescription, formData.projectDescription);
      formData.services.forEach((service) => {
        payload.append(GOOGLE_FORM_ENTRIES.services, service);
      });

      await fetch(GOOGLE_FORM_ACTION, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: payload.toString()
      });

      setSuccess('✓ Message sent successfully! We will get back to you within 24 hours.');
      setFormData({
        name: '',
        email: '',
        youtubeLink: '',
        phoneNumber: '',
        projectDescription: '',
        services: []
      });
    } catch (submitError) {
      setError('✕ Something went wrong while sending your details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="contact-page">
      <section className="contact-hero-lite">
        <div className="container">
          <span className="contact-eyebrow">FORM FILLING</span>
          <h1>Tell us what you need. We will handle the execution.</h1>
        </div>
      </section>

      <section className="contact-section">
        <div className="container contact-layout">
          <aside className="contact-side-panel">
            <h2>What happens after you submit?</h2>
            <div className="contact-process-list">
              {processExpectations.map((item, index) => (
                <article key={item.title} className="contact-process-item">
                  <span className="contact-step-dot">0{index + 1}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="contact-social-links">
              <a href={INSTAGRAM_LINK} target="_blank" rel="noreferrer">Instagram</a>
              <a href={X_LINK} target="_blank" rel="noreferrer">X</a>
            </div>
          </aside>

          <div className="contact-form-container">
            <h2 className="contact-form-title">Drop your requirements here</h2>
            <p className="contact-form-subtitle">
              We'll review your project and get back to you with suggestions, pricing, and next steps - usually within 24 hours.
            </p>

            {success && <div className="alert alert-success">{success}</div>}
            {error && <div className="alert alert-error">{error}</div>}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name/Company Name <span className="required">*</span></label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter Your Name/Company Name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Your Email <span className="required">*</span></label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter Your Email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="youtubeLink">YouTube Channel Link <span className="required">*</span></label>
                  <input
                    type="url"
                    id="youtubeLink"
                    name="youtubeLink"
                    value={formData.youtubeLink}
                    onChange={handleInputChange}
                    placeholder="Enter Link Here"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number <span className="required">*</span></label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter Phone Number"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="projectDescription">About Your Project <span className="required">*</span></label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleInputChange}
                  placeholder="Tell Us About Your Project"
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label className="contact-services-label">I Need <span className="required">*</span></label>
                <div className="services-list">
                  <label className="service-checkbox">
                    <input
                      type="checkbox"
                      name="services"
                      value="Reaction Video Editing"
                      checked={formData.services.includes('Reaction Video Editing')}
                      onChange={handleInputChange}
                    />
                    <span>Reaction Video Editing</span>
                  </label>
                  <label className="service-checkbox">
                    <input
                      type="checkbox"
                      name="services"
                      value="Podcast Video Editing"
                      checked={formData.services.includes('Podcast Video Editing')}
                      onChange={handleInputChange}
                    />
                    <span>Podcast Video Editing</span>
                  </label>
                  <label className="service-checkbox">
                    <input
                      type="checkbox"
                      name="services"
                      value="Thumbnail Designing"
                      checked={formData.services.includes('Thumbnail Designing')}
                      onChange={handleInputChange}
                    />
                    <span>Thumbnail Designing</span>
                  </label>
                  <label className="service-checkbox">
                    <input
                      type="checkbox"
                      name="services"
                      value="Shorts/Reel Video Editing"
                      checked={formData.services.includes('Shorts/Reel Video Editing')}
                      onChange={handleInputChange}
                    />
                    <span>Shorts/Reel Video Editing</span>
                  </label>
                  <label className="service-checkbox">
                    <input
                      type="checkbox"
                      name="services"
                      value="Youtube Channel Management"
                      checked={formData.services.includes('Youtube Channel Management')}
                      onChange={handleInputChange}
                    />
                    <span>Youtube Channel Management</span>
                  </label>
                </div>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Sending...' : 'Submit'}
              </button>
            </form>

          </div>
        </div>
      </section>

      <section className="contact-faq-lite">
        <div className="container">
          <h2>Quick answers before we begin</h2>
          <div className="contact-faq-grid">
            {quickFaq.map((item) => (
              <article key={item.question} className="contact-faq-card">
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
