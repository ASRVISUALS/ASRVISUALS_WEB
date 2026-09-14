import React from 'react';
import './LegalPage.css';

export default function PrivacyPolicyPage() {
  return (
    <main className="legal-page">
      <article className="legal-card">
        <div className="legal-header">
          <p className="legal-kicker">LEGAL</p>
          <h1>Privacy Policy</h1>
          <p className="legal-company">ASR Visuals</p>
          <p className="legal-updated">Last Updated: March 29, 2026 | Effective Date: March 29, 2026</p>
        </div>

        <nav className="legal-toc">
          <h2>Quick Navigation</h2>
          <ul>
            <li><a href="#information-collected">1. Information We Collect</a></li>
            <li><a href="#data-usage">2. How We Use Your Data</a></li>
            <li><a href="#data-security">3. Data Security</a></li>
            <li><a href="#retention">4. Data Retention</a></li>
            <li><a href="#third-party">5. Third-Party Services</a></li>
            <li><a href="#compliance">6. Compliance &amp; Your Rights</a></li>
            <li><a href="#contact">7. Contact Us</a></li>
          </ul>
        </nav>

        <section className="legal-section" id="information-collected">
          <h2>1. Information We Collect</h2>
          <p>We collect minimal data necessary to provide you with exceptional design services:</p>
          <ul>
            <li><strong>Personal Information:</strong> Name, email address, phone number (optional), and billing details (processed via secure third-party payment gateways).</li>
            <li><strong>Design Data:</strong> Prompts, text, specifications, and inputs you provide for generating visuals, thumbnails, or custom designs.</li>
            <li><strong>Technical Data:</strong> IP addresses, browser type, device information, pages visited, referral source, and interaction patterns.</li>
          </ul>
        </section>

        <section className="legal-section" id="data-usage">
          <h2>2. How We Use Your Data</h2>
          <p>Your data is used strictly for:</p>
          <ul>
            <li>Delivering your purchased digital assets and services.</li>
            <li>Processing payments and sending transaction receipts.</li>
            <li>Maintaining the security of your account and our platform.</li>
            <li>Providing customer support and responding to inquiries.</li>
            <li>Improving our AI tools, platform features, and user experience.</li>
            <li>Sending transactional emails and essential service updates.</li>
            <li>Complying with legal obligations and resolving disputes.</li>
          </ul>
          <p><strong>We do NOT:</strong> Sell, rent, or trade your personal information to third parties for marketing purposes.</p>
        </section>

        <section className="legal-section" id="data-security">
          <h2>3. Data Security</h2>
          <p>ASR Visuals takes data security seriously. We implement industry-standard security measures:</p>
          <ul>
            <li>End-to-end encryption for data in transit using TLS/SSL protocols.</li>
            <li>Encrypted storage of sensitive information in secure databases.</li>
            <li>Regular security audits and vulnerability assessments.</li>
            <li>Restricted access to personal data (limited to authorized personnel only).</li>
            <li>Secure third-party payment processors compliant with PCI-DSS standards.</li>
          </ul>
          <p>While we implement robust security measures, no system is 100% secure. We encourage you to use strong passwords and protect your account credentials.</p>
        </section>

        <section className="legal-section" id="retention">
          <h2>4. Data Retention</h2>
          <p>We retain your personal data for as long as necessary to provide our services and fulfill legal obligations:</p>
          <ul>
            <li><strong>Active Users:</strong> Your account data is retained while your account is active.</li>
            <li><strong>Inactive Accounts:</strong> Upon account deletion, we retain your data for 30 days (allowing recovery), then permanently delete it.</li>
            <li><strong>Transaction Records:</strong> Kept for 7 years for tax and compliance purposes.</li>
            <li><strong>Design Data:</strong> Retained for your reference during active projects; deleted per your request.</li>
          </ul>
        </section>

        <section className="legal-section" id="third-party">
          <h2>5. Third-Party Services</h2>
          <p>We use trusted third-party services to enhance our platform. These providers have their own privacy policies:</p>
          <ul>
            <li><strong>Payment Processors:</strong> Stripe, Razorpay (handle payment information securely).</li>
            <li><strong>Analytics:</strong> Google Analytics (tracks site usage and user behavior).</li>
            <li><strong>Cloud Services:</strong> AWS, Cloudinary (store and deliver media assets).</li>
            <li><strong>Email Services:</strong> SendGrid, Brevo (send transactional emails).</li>
          </ul>
          <p>We only share necessary data with these providers and require them to maintain strict confidentiality.</p>
        </section>

        <section className="legal-section" id="compliance">
          <h2>6. Compliance &amp; Your Rights</h2>
          <p><strong>Your Privacy Rights:</strong></p>
          <ul>
            <li><strong>Access:</strong> You have the right to access all personal data we hold about you.</li>
            <li><strong>Rectification:</strong> You can request corrections to inaccurate or incomplete data.</li>
            <li><strong>Deletion:</strong> You can request deletion of your account and associated data (Right to be Forgotten).</li>
            <li><strong>Portability:</strong> You can request your data in a portable format.</li>
            <li><strong>Opt-Out:</strong> You can unsubscribe from marketing communications at any time.</li>
            <li><strong>Objection:</strong> You can object to certain data processing activities.</li>
          </ul>
          <p>If you are located in the EU/EEA or India, your data is processed in accordance with applicable privacy regulations including GDPR and relevant Indian data protection laws.</p>
        </section>

        <section className="legal-section" id="contact">
          <h2>7. Contact Us</h2>
          <p>For questions, concerns, or to exercise your privacy rights, please contact us:</p>
          <div className="legal-contact-box">
            <p><strong>Email:</strong> <a href="mailto:asrvisualshelpline@gmail.com">asrvisualshelpline@gmail.com</a></p>
            <p><strong>Website:</strong> <a href="https://asrvisuals.live" target="_blank" rel="noopener noreferrer">asrvisuals.live</a></p>
            <p><strong>Response Time:</strong> We aim to respond to all privacy inquiries within 10 business days.</p>
          </div>
        </section>
      </article>
    </main>
  );
}
