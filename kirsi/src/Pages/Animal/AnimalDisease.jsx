import React, { useState } from 'react';
import { Card, Input, BackButton } from '../../components/ui';
import './Animal.css';

const diseases = [
  {
    name: 'Foot and Mouth Disease (FMD)',
    livestock: 'Cows, Buffaloes, Pigs, Goats',
    symptoms: 'High fever, blisters in mouth and on hooves, salivation, limping.',
    prevention: 'Regular vaccination every 6 months. Segregate affected animals immediately.',
    treatment: 'Clean wounds with potassium permanganate solution. Apply antiseptic ointment.'
  },
  {
    name: 'Mastitis',
    livestock: 'Milking Cows, Buffaloes, Goats',
    symptoms: 'Swollen and painful udder, watery or clotted milk, reduced yield.',
    prevention: 'Maintain clean, dry bedding. Clean udders before and after milking.',
    treatment: 'Consult a vet for intramammary antibiotic infusions and anti-inflammatories.'
  },
  {
    name: 'Black Quarter (BQ)',
    livestock: 'Young Cattle, Sheep',
    symptoms: 'Sudden lameness, painful swelling on thighs, crackling sound on rubbing, fever.',
    prevention: 'Annual pre-monsoon vaccination in endemic areas.',
    treatment: 'Requires high-dose penicillin therapy under vet supervision in early stages.'
  }
];

export default function AnimalDisease() {
  const [query, setQuery] = useState('');

  const filteredDiseases = diseases.filter(
    (d) =>
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.livestock.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="animal-subpage fade-in">
      <div className="animal-header">
        <BackButton label="Back to Animal Care" to="/animal" />
        <div className="animal-title-section">
          <h2>Animal Disease Help</h2>
          <p>Identify common livestock diseases, read symptom checklists, and review treatment guides</p>
        </div>
      </div>

      <div className="animal-search-bar">
        <Input
          placeholder="Search by disease or animal name (FMD, Cow, Goats...)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          leftIcon={<span>🔍</span>}
        />
      </div>

      <div className="animal-card-grid">
        {filteredDiseases.length === 0 ? (
          <div className="animal-empty-state">
            <span>🩺</span>
            <p>No diseases matched your search query.</p>
          </div>
        ) : (
          filteredDiseases.map((d, idx) => (
            <Card key={idx} hoverLift className="animal-detail-card disease-card">
              <Card.Header className="animal-card-header">
                <div>
                  <h3 className="disease-title">{d.name}</h3>
                  <span className="disease-animal-tag">📋 Livestock: {d.livestock}</span>
                </div>
              </Card.Header>
              <Card.Body className="animal-card-body-content">
                <div className="disease-info-section">
                  <p><strong>⚠️ Symptoms:</strong> {d.symptoms}</p>
                  <p><strong>🛡️ Prevention:</strong> {d.prevention}</p>
                  <p><strong>🧪 First Aid/Treatment:</strong> {d.treatment}</p>
                </div>
              </Card.Body>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
