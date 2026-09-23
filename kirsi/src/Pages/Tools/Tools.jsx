import React from 'react';
import './Tools.css';
import { useNavigate } from 'react-router-dom';
import { Card, BackButton } from '../../components/ui';

const Tools = () => {
  const navigate = useNavigate();

  const toolServices = [
    {
      id: 'buy',
      title: 'Buy Tools',
      description: 'Buy tools from nearby farmers',
      icon: '🛒',
      path: '/buy-tools',
      colorClass: 'buy',
    },
    {
      id: 'sell',
      title: 'Sell Tools',
      description: 'Sell your old or unused tools',
      icon: '⬆️',
      path: '/sell-tools',
      colorClass: 'sell',
    },
    {
      id: 'rent',
      title: 'Rent Tools',
      description: 'Rent tools for short-term use',
      icon: '📅',
      path: '/rent-tools',
      colorClass: 'rent',
    },
    {
      id: 'mechanic',
      title: 'Mechanic Services',
      description: 'Find nearby mechanics',
      icon: '🔧',
      path: '/mechanic',
      colorClass: 'mechanic',
    },
  ];

  return (
    <div className="tools-page fade-in">
      <div className="tools-header">
        <BackButton label="Back" to="/" />
        <div className="tools-title-section">
          <h2>Tools & Equipment</h2>
          <p>Choose a service below to manage your agricultural tools</p>
        </div>
      </div>

      <div className="tools-grid">
        {toolServices.map((service) => (
          <Card
            key={service.id}
            hoverLift
            onClick={() => navigate(service.path)}
            className="tool-card-container"
          >
            <Card.Body className="tool-card-body">
              <div className={`tool-icon-wrapper ${service.colorClass}`}>
                {service.icon}
              </div>
              <div className="tool-card-details">
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

export default Tools;
