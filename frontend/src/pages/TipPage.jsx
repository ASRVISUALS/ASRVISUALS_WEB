import React from 'react';
import { Link } from 'react-router-dom';
import './LegalPage.css';

export default function TipPage() {
  return (
    <main className="tip-page">
      <article className="tip-card">
        <p className="legal-kicker">SUPPORT</p>
        <h1>Tip ASR Visuals</h1>
        <p>
          If you like our free insights and creative work, you can support us with a small tip.
          Thank you for helping us keep creating high-quality resources for creators and brands.
        </p>

        <div className="tip-option">
          <strong>UPI Tip Option</strong>
          <p>
            Use your UPI app and pay to: <b>asrvisualshelpline@okaxis</b>
          </p>
          <p>
            If this UPI ID needs to be changed, update it in this page before redeploy.
          </p>
        </div>

        <div className="tip-contact">
          <a className="tip-btn tip-btn-primary" href="mailto:asrvisualshelpline@gmail.com?subject=Tip%20Support%20for%20ASR%20Visuals">
            Confirm Tip by Email
          </a>
          <Link className="tip-btn tip-btn-secondary" to="/contact">
            Contact Team
          </Link>
        </div>
      </article>
    </main>
  );
}
