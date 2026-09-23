import React from 'react';
import './Crops.css';
import { useNavigate } from 'react-router-dom';
import { Card, BackButton } from '../../components/ui';

const cropServices = [
  {
    id: 'advisory',
    title: 'Crop Disease Help',
    description: 'Identify and treat crop diseases with expert guidance',
    icon: '⚠️',
    path: '/crop-advisory',
    colorClass: 'disease',
  },
  {
    id: 'experts',
    title: 'Talk to Experts',
    description: 'Call crop advisors and agriculture professionals',
    icon: '👩‍🌾',
    path: '/experts',
    colorClass: 'expert',
  },
  {
    id: 'shops',
    title: 'Nearby Agri Shops',
    description: 'Find nearby shops for seeds, fertilizers, and pesticides',
    icon: '🏪',
    path: '/crop-shops',
    colorClass: 'shop',
  },
  {
    id: 'buy-crops',
    title: 'Buy Crops',
    description: 'Purchase agricultural harvests directly from local farmers',
    icon: '🌾',
    path: '/buy-crops',
    colorClass: 'expert',
  },
  {
    id: 'sell-crops',
    title: 'Sell Crops',
    description: 'List your crop yield to connect with wholesale food buyers',
    icon: '⬆️',
    path: '/sell-crops',
    colorClass: 'shop',
  },
  {
    id: 'info',
    title: 'Crop Information',
    description: 'Best practices, fertilizer guides & growth stages',
    icon: '📚',
    path: '/crop-info',
    colorClass: 'info',
  },
];

const Crops = () => {
  const navigate = useNavigate();

  return (
    <div className="crops-page fade-in">
      <div className="crops-header">
        <BackButton label="Back" to="/" />
        <div className="crops-title-section">
          <h2>Crop Advisory & Services</h2>
          <p>Choose a service below to help manage your crops</p>
        </div>
      </div>

      <div className="crops-grid">
        {cropServices.map((service) => (
          <Card
            key={service.id}
            hoverLift
            onClick={() => navigate(service.path)}
            className="crop-card-container"
          >
            <Card.Body className="crop-card-body">
              <div className={`crop-icon-wrapper ${service.colorClass}`}>
                {service.icon}
              </div>
              <div className="crop-card-details">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Crops;
