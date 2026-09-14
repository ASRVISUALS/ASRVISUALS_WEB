import React from 'react';
import './Statistics.css';

const stats = [
  { value: '100+', label: 'Creators Served' },
  { value: '5M+', label: 'Subscribers Gained' },
  { value: '3.4B+', label: 'Views Received' },
  { value: '100M+', label: 'Followers Gained' }
];

export default function Statistics() {
  return (
    <section className="statistics-section">
      <div className="statistics-container">
        <div className="statistics-header">
          <h2>Numbers That Prove It Works</h2>
        </div>
        <div className="statistics-grid">
          {stats.map((stat) => (
            <div className="statistics-card" key={stat.label}>
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
