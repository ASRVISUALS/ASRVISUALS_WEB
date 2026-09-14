import React from 'react';
import './LegalPage.css';

export default function TermsPage() {
  return (
    <main className="legal-page">
      <article className="legal-card">
        <div className="legal-header">
          <p className="legal-kicker">LEGAL</p>
          <h1>Terms of Service</h1>
          <p className="legal-company">ASR Visuals</p>
          <p className="legal-updated">Effective Date: March 29, 2026 | Last Updated: March 29, 2026</p>
        </div>

        <nav className="legal-toc">
          <h2>Quick Navigation</h2>
          <ul>
            <li><a href="#acceptance">1. Acceptance of Terms</a></li>
            <li><a href="#services">2. Services Provided</a></li>
            <li><a href="#intellectual-property">3. Intellectual Property</a></li>
            <li><a href="#user-responsibilities">4. User Responsibilities</a></li>
            <li><a href="#payments">5. Payments &amp; Billing</a></li>
            <li><a href="#liability">6. Limitation of Liability</a></li>
            <li><a href="#termination">7. Termination</a></li>
            <li><a href="#governing-law">8. Governing Law</a></li>
            <li><a href="#contact">9. Contact Information</a></li>
          </ul>
        </nav>

        <section className="legal-section" id="acceptance">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using ASR Visuals (asrvisuals.live), you agree to be bound by these Terms of Service. If you do not agree
            to all the terms, please do not use our services. ASR Visuals reserves the right to modify these terms at any time, with
            changes effective immediately upon posting.
          </p>
        </section>

        <section className="legal-section" id="services">
          <h2>2. Services Provided</h2>
          <p>
            ASR Visuals provides digital design services, including but not limited to video editing, AI-generated visuals,
            thumbnail creation, social media content, and branding assets. These services are provided on an "as-is" basis.
            We reserve the right to modify or discontinue any part of the service with notice to users.
          </p>
        </section>

        <section className="legal-section" id="intellectual-property">
          <h2>3. Intellectual Property &amp; Ownership</h2>
          <ul>
            <li>
              <strong>Custom Designs:</strong> Upon full payment, you own the final agreed-upon design delivered by ASR Visuals.
            </li>
            <li>
              <strong>AI-Generated Content:</strong> Ownership of AI-generated content is subject to the underlying model licensing.
              ASR Visuals grants you a non-exclusive, worldwide license to use AI-generated assets for personal and commercial
              projects unless otherwise specified.
            </li>
            <li>
              <strong>Platform Assets:</strong> All website code, UI design, original graphics, software, and platform technology
              remain the exclusive property of ASR Visuals and are protected by copyright.
            </li>
          </ul>
        </section>

        <section className="legal-section" id="user-responsibilities">
          <h2>4. User Responsibilities</h2>
          <p>You agree not to use our services for:</p>
          <ul>
            <li>Generating content that is illegal, defamatory, hateful, or infringes on intellectual property rights of others.</li>
            <li>Attempting to reverse-engineer, decompile, or scrape our design tools or website.</li>
            <li>Misrepresenting your identity, credentials, or payment information.</li>
            <li>Circumventing security measures or accessing unauthorized areas of our platform.</li>
            <li>Harassing, abusing, or threatening ASR Visuals team members or other users.</li>
          </ul>
        </section>

        <section className="legal-section" id="payments">
          <h2>5. Payments &amp; Billing</h2>
          <p>
            All payments are processed securely through third-party payment providers (e.g., Stripe, Razorpay). By providing
            payment information, you authorize us to charge your account. Prices and availability are subject to change without
            notice, except that price changes will not affect orders already processed. Refunds are subject to our Refund Policy.
          </p>
        </section>

        <section className="legal-section" id="liability">
          <h2>6. Limitation of Liability</h2>
          <p>
            ASR Visuals provides the platform and services "as is" without warranties of any kind. To the maximum extent permitted
            by law, ASR Visuals is not liable for indirect, incidental, special, consequential, or punitive damages arising from your
            use or inability to use the service, even if we have been advised of the possibility of such damages.
          </p>
        </section>

        <section className="legal-section" id="termination">
          <h2>7. Termination</h2>
          <p>
            ASR Visuals reserves the right to suspend or terminate your account and access immediately, without prior notice, if we
            believe you have violated these Terms or engaged in illegal activity. Upon termination, your right to use the service ceases.
            Termination does not relieve you of outstanding payment obligations.
          </p>
        </section>

        <section className="legal-section" id="governing-law">
          <h2>8. Governing Law &amp; Dispute Resolution</h2>
          <p>
            These Terms are governed by and construed in accordance with the laws of India, without regard to its conflict of law principles.
            Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts in India.
          </p>
        </section>

        <section className="legal-section" id="contact">
          <h2>9. Contact Information</h2>
          <p>
            For questions or concerns regarding these Terms of Service, please contact us at:
          </p>
          <div className="legal-contact-box">
            <p><strong>Email:</strong> <a href="mailto:asrvisualshelpline@gmail.com">asrvisualshelpline@gmail.com</a></p>
            <p><strong>Website:</strong> <a href="https://asrvisuals.live" target="_blank" rel="noopener noreferrer">asrvisuals.live</a></p>
          </div>
        </section>
      </article>
    </main>
  );
}
