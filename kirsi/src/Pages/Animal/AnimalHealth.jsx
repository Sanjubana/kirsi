import React from 'react';
import { Card, BackButton } from '../../components/ui';
import './Animal.css';

const careGuides = [
  {
    title: 'Dairy Cattle Management',
    description: 'Best practices for milk hygiene, daily cattle feeding routines, and cow shelter ventilation.',
    icon: '🐄',
    tips: [
      'Provide clean drinking water 24/7.',
      'Ensure balanced feed with minerals.',
      'Maintain dry bedding to prevent mastitis.'
    ]
  },
  {
    title: 'Poultry Feeding & Care',
    description: 'Chicks brooding guides, poultry nutrition calculations, and viral vaccine schedules.',
    icon: '🐔',
    tips: [
      'Keep brooding temperature optimal.',
      'Feed high-protein starter mash.',
      'Ensure prompt vaccination cycles.'
    ]
  },
  {
    title: 'Goat & Sheep Rearing',
    description: 'Small ruminants grazing practices, deworming calendars, and stall feeding layout designs.',
    icon: '🐐',
    tips: [
      'Vaccinate against PPR disease regularly.',
      'Provide supplementary green fodder.',
      'Perform regular hoof trimming.'
    ]
  }
];

export default function AnimalHealth() {
  return (
    <div className="animal-subpage fade-in">
      <div className="animal-header">
        <BackButton label="Back to Animal Care" to="/animal" />
        <div className="animal-title-section">
          <h2>Animal Health & Care</h2>
          <p>Practical guides and routines to keep your farm livestock healthy and productive</p>
        </div>
      </div>

      <div className="animal-card-grid">
        {careGuides.map((guide, idx) => (
          <Card key={idx} hoverLift className="animal-detail-card">
            <Card.Header className="animal-card-header">
              <div className="animal-card-title-row">
                <span className="animal-card-icon">{guide.icon}</span>
                <h3>{guide.title}</h3>
              </div>
            </Card.Header>
            <Card.Body className="animal-card-body-content">
              <p className="animal-card-description">{guide.description}</p>
              <div className="animal-tips-box">
                <h4>💡 Core Tips:</h4>
                <ul>
                  {guide.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}
