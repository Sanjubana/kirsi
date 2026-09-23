import React from 'react';
import './Animal.css';
import { useNavigate } from 'react-router-dom';
import { BackButton, Card } from '../../components/ui';

const Animal = () => {
  const navigate = useNavigate();

  return (
    <div className="animal-page fade-in">
      <div className="animal-header">
        <BackButton label="Back" to="/" />
        <div className="animal-title-section">
          <h2>Animal Care & Services</h2>
          <p>Choose a livestock service below for help, consulting, or trading</p>
        </div>
      </div>

      <div className="animal-grid">
        <Card hoverLift className="animal-card" onClick={() => navigate('/animal-health')}>
          <div className="icon health">❤</div>
          <h3>Animal Health & Care</h3>
          <p>Basic care feeding guides, vaccination tips, and livestock management advice</p>
        </Card>

        <Card hoverLift className="animal-card" onClick={() => navigate('/animal-disease')}>
          <div className="icon disease">⚠</div>
          <h3>Animal Disease Help</h3>
          <p>Identify common livestock symptoms, diagnostic guides, and veterinary first-aid</p>
        </Card>

        <Card hoverLift className="animal-card" onClick={() => navigate('/nearby-vets')}>
          <div className="icon vet">🩺</div>
          <h3>Nearby Vets & Doctors</h3>
          <p>Find contact details of certified veterinarians and clinics in your area</p>
        </Card>

        <Card hoverLift className="animal-card" onClick={() => navigate('/buy-sell-animals')}>
          <div className="icon trade">🐄</div>
          <h3>Buy / Sell Animals</h3>
          <p>Local livestock trade marketplace. Buy and sell farm cattle, sheep, and goats</p>
        </Card>
      </div>
    </div>
  );
};

export default Animal;