import React from 'react';
import './Clients.css';
import Abhijit from '../../assets/images/clients/Abhijit-400.webp';
import Andrew from '../../assets/images/clients/Andrew-400.webp';
import Anushasan from '../../assets/images/clients/Anushasan-400.webp';
import CarveGym from '../../assets/images/clients/Carve Gym-400.webp';
import DetailingDaddy from '../../assets/images/clients/Detailing daddy-400.webp';
import GlobalOpportunities from '../../assets/images/clients/Global Opportunities-400.webp';
import Jugmugg from '../../assets/images/clients/Jugmugg-400.webp';
import Vault from '../../assets/images/clients/Vault-400.webp';
import Vedantam from '../../assets/images/clients/Vedantam-400.webp';
import Velinna from '../../assets/images/clients/Velinna-400.webp';

export default function Clients() {
  const clients = [
    { name: 'Abhijit', image: Abhijit },
    { name: 'Andrew', image: Andrew },
    { name: 'Anushasan', image: Anushasan },
    { name: 'Carve Gym', image: CarveGym },
    { name: 'Detailing Daddy', image: DetailingDaddy },
    { name: 'Global Opportunities', image: GlobalOpportunities },
    { name: 'Jugmugg', image: Jugmugg },
    { name: 'Vault', image: Vault },
    { name: 'Vedantam', image: Vedantam },
    { name: 'Velinna', image: Velinna },
  ];

  const loopClients = [...clients, ...clients];

  return (
    <section className="clients-section">
      <div className="clients-container">
        <div className="clients-header">
          <h2>Trusted by Creators and Brands Growing Across YouTube and Instagram</h2>
          <p>From emerging creators to established businesses building personal brands.</p>
        </div>

        <div className="clients-slider screenshot-style" aria-label="Our clients slider">
          <div className="clients-track screenshot-track" role="list">
            {loopClients.map((client, index) => (
              <article
                key={`${client.name}-${index}`}
                className="client-card screenshot-card"
                role="listitem"
                aria-hidden={index >= clients.length}
              >
                <img
                  src={client.image}
                  alt={client.name}
                  className="client-image"
                  width="90"
                  height="90"
                  loading="lazy"
                  decoding="async"
                />
                <h3>{client.name}</h3>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
