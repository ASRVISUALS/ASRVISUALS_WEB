import React from 'react';
import './LegalPage.css';

export default function RefundPolicyPage() {
  return (
    <main className="legal-page">
      <article className="legal-card">
        <div className="legal-header">
          <p className="legal-kicker">LEGAL</p>
          <h1>Refund Policy</h1>
          <p className="legal-company">ASR Visuals</p>
          <p className="legal-updated">Last Updated: March 29, 2026 | Effective Date: March 29, 2026</p>
        </div>

        <nav className="legal-toc">
          <h2>Quick Navigation</h2>
          <ul>
            <li><a href="#overview">1. Overview</a></li>
            <li><a href="#eligibility">2. Refund Eligibility</a></li>
            <li><a href="#non-refundable">3. Non-Refundable Items</a></li>
            <li><a href="#process">4. Refund Request Process</a></li>
            <li><a href="#revision-policy">5. Revision Policy</a></li>
            <li><a href="#status-tracking">6. Tracking Refund Status</a></li>
            <li><a href="#faq">7. Frequently Asked Questions</a></li>
            <li><a href="#contact">8. Contact Us</a></li>
          </ul>
        </nav>

        <section className="legal-section" id="overview">
          <h2>1. Overview</h2>
          <p>
            At ASR Visuals, we are committed to delivering high-quality digital design services. Because our products are
            digital goods (videos, thumbnails, AI visuals, custom designs) delivered via instant download or generation, we offer
            a limited refund policy. However, we prioritize customer satisfaction through revisions and support.
          </p>
          <p><strong>Refund Window:</strong> 7 days from purchase date</p>
        </section>

        <section className="legal-section" id="eligibility">
          <h2>2. Refund Eligibility</h2>
          <p>Refunds may be granted in the following circumstances:</p>
          <ul>
            <li>
              <strong>System/Technical Error:</strong> If a system error prevented you from receiving your digital file,
              the generation failed to process, or the download link is broken. (Refund eligible: YES)
            </li>
            <li>
              <strong>Duplicate Charge:</strong> If you were accidentally charged twice for the same service within a 24-hour window.
              (Refund eligible: Full refund for duplicate charge only)
            </li>
            <li>
              <strong>Non-Delivery:</strong> If a custom design service was not delivered within the promised timeframe
              (24-48 hours as specified at purchase). (Refund eligible: YES)
            </li>
            <li>
              <strong>Service Unavailable:</strong> If ASR Visuals service was unavailable due to our infrastructure issues,
              preventing you from accessing your purchased product. (Refund eligible: YES)
            </li>
          </ul>
          <p><strong>Refund Timeline:</strong> Approved refunds are processed within 5-10 business days to your original payment method.</p>
        </section>

        <section className="legal-section" id="non-refundable">
          <h2>3. Non-Refundable Items</h2>
          <p>We cannot offer refunds in the following cases:</p>
          <ul>
            <li>
              <strong>Change of Mind:</strong> Once a digital asset has been downloaded, streamed, or accessed, it is considered consumed.
            </li>
            <li>
              <strong>Dissatisfaction with Output Quality:</strong> AI-generated content is subjective. Different users have different
              preferences. We do not refund based on artistic preference. (See Revision Policy instead)
            </li>
            <li>
              <strong>Partial or Full Use:</strong> If you have already used the design for commercial, personal, or public branding purposes.
            </li>
            <li>
              <strong>Feature/Specification Mismatch:</strong> If you misunderstood the product specifications at the time of purchase.
              (Refund eligible: NO, but we offer revisions)
            </li>
            <li>
              <strong>Buyer's Remorse:</strong> Simply changing your mind after downloading or accessing the asset.
            </li>
            <li>
              <strong>Refund Request Beyond 7 Days:</strong> Requests submitted after 7 days from purchase are not eligible.
            </li>
          </ul>
        </section>

        <section className="legal-section" id="process">
          <h2>4. Refund Request Process</h2>
          <p><strong>Step 1: Review the Revision Policy</strong></p>
          <p>Before requesting a refund, consider our revision policy. We offer free revisions for most services.</p>

          <p><strong>Step 2: Submit Your Request</strong></p>
          <p>If you still want to proceed with a refund, contact us within 7 days of purchase with the following information:</p>
          <ul>
            <li>Order ID or Transaction Number</li>
            <li>Date of Purchase</li>
            <li>Detailed reason for refund request (be specific)</li>
            <li>Screenshots or error messages (if applicable)</li>
          </ul>

          <p><strong>Step 3: Communication</strong></p>
          <div className="legal-contact-box">
            <p><strong>Email:</strong> <a href="mailto:asrvisualshelpline@gmail.com">asrvisualshelpline@gmail.com</a></p>
            <p><strong>Subject Line:</strong> Refund Request - [Order ID]</p>
          </div>

          <p><strong>Step 4: Review and Decision</strong></p>
          <p>Our team reviews your request within 3-5 business days. We may:</p>
          <ul>
            <li>Approve your refund immediately</li>
            <li>Offer revisions instead of a refund</li>
            <li>Offer a partial refund for partial use</li>
            <li>Request additional information to verify your claim</li>
            <li>Decline the refund if it falls outside our policy</li>
          </ul>

          <p><strong>Step 5: Refund Processing</strong></p>
          <p>If approved, your refund is processed within 5-10 business days to your original payment method.</p>
        </section>

        <section className="legal-section" id="revision-policy">
          <h2>5. Revision Policy (Our Preferred Alternative)</h2>
          <p>
            We are committed to your satisfaction. Instead of refunds, we offer revisions to ensure your project meets your expectations.
          </p>
          <ul>
            <li><strong>Custom Design Packages:</strong> Unlimited revisions until you are satisfied.</li>
            <li><strong>AI-Generated Visuals:</strong> Free regeneration with improved prompts (up to 3 attempts).</li>
            <li><strong>Video Editing:</strong> Free revision adjustments (color, effects, pacing).</li>
            <li><strong>Platform Errors:</strong> Credit refills equal to the purchase amount for use on future projects.</li>
          </ul>
          <p>
            <strong>Why Choose Revisions?</strong> Revisions maintain your project momentum and ensure the final output matches
            your vision, rather than starting over with a competitor.
          </p>
        </section>

        <section className="legal-section" id="status-tracking">
          <h2>6. Tracking Your Refund Status</h2>
          <p>
            After submitting your refund request, you can track the status via email updates. We commit to transparency:
          </p>
          <ul>
            <li><strong>Day 1-2:</strong> Initial confirmation email acknowledging your request</li>
            <li><strong>Day 3-5:</strong> Review complete; decision email sent (approved/revision offer/additional info needed)</li>
            <li><strong>Day 5-10:</strong> Refund processed (if approved); funds appear in your account</li>
          </ul>
          <p>
            If your refund is declined, we provide a detailed explanation and may offer an alternative solution.
          </p>
        </section>

        <section className="legal-section" id="faq">
          <h2>7. Frequently Asked Questions</h2>

          <details className="legal-faq">
            <summary><strong>Q: What if my download link expires?</strong></summary>
            <p>A: Download links remain active for 30 days post-purchase. If yours has expired, contact us and we will resend it at no cost (no refund needed).</p>
          </details>

          <details className="legal-faq">
            <summary><strong>Q: Can I get a refund if I used the design on my website?</strong></summary>
            <p>A: No. Once used commercially, the product is considered consumed. However, we offer revision services if you are unhappy with the design.</p>
          </details>

          <details className="legal-faq">
            <summary><strong>Q: Do you issue refunds to all payment methods?</strong></summary>
            <p>A: Yes. Refunds are issued to the original payment method. Credit card refunds may take 5-10 business days depending on your bank.</p>
          </details>

          <details className="legal-faq">
            <summary><strong>Q: What if I request a refund after 7 days?</strong></summary>
            <p>A: Late requests are not eligible for refunds per policy. However, contact us to discuss alternative solutions or revision options.</p>
          </details>

          <details className="legal-faq">
            <summary><strong>Q: Are custom service refunds different?</strong></summary>
            <p>A: Custom services follow the same 7-day policy. However, if we failed to deliver within promised timelines, refunds are guaranteed without questions.</p>
          </details>
        </section>

        <section className="legal-section" id="contact">
          <h2>8. Contact Us</h2>
          <p>
            For refund inquiries, technical issues, or to discuss revision options, please reach out:
          </p>
          <div className="legal-contact-box">
            <p><strong>Email:</strong> <a href="mailto:asrvisualshelpline@gmail.com">asrvisualshelpline@gmail.com</a></p>
            <p><strong>Website:</strong> <a href="https://asrvisuals.live" target="_blank" rel="noopener noreferrer">asrvisuals.live</a></p>
            <p><strong>Support Hours:</strong> Monday-Friday, 9 AM - 6 PM IST</p>
            <p><strong>Response Time:</strong> We aim to respond within 24 hours</p>
          </div>
        </section>
      </article>
    </main>
  );
}
