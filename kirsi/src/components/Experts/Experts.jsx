import React from "react";
import "./Experts.css";
import { Card, Button, BackButton } from "../ui";

const advisors = [
  {
    id: 1,
    name: "Rahul Patil",
    specialty: "Crop Disease Expert",
    experience: "12 years",
    distance: "6 km away",
    location: "Shirur",
    available: true,
  },
  {
    id: 2,
    name: "Amit Deshmukh",
    specialty: "Soil & Fertilizer Advisor",
    experience: "9 years",
    distance: "10 km away",
    location: "Kharadi",
    available: true,
  },
  {
    id: 3,
    name: "Sanjay Kulkarni",
    specialty: "Afim farming expert",
    experience: "15 years",
    distance: "4 km away",
    location: "Hadapsar",
    available: false,
  },
];

export default function ExpertsList() {
  return (
    <div className="experts-page fade-in">
      <div className="experts-header">
        <BackButton label="Back to Crops" to="/crops" />
        <div className="experts-title-section">
          <h2>Crop Advisors & Experts</h2>
          <p>Find trusted advisors for better crop yield and expert consultation</p>
        </div>
      </div>

      <div className="location-bar">
        <div className="location-bar-left">
          <span>📍</span>
          <span>Showing results near <b>Pune</b> within 50 km</span>
        </div>
        <Button variant="text" size="sm" onClick={() => alert('Location selection coming soon!')}>
          Change location
        </Button>
      </div>

      <div className="provider-grid">
        {advisors.map((advisor) => (
          <Card key={advisor.id} hoverLift className="provider-card">
            <Card.Body className="provider-card-body">
              <div className="provider-card-top">
                <div className="provider-card-avatar">
                  {advisor.name.charAt(0)}
                </div>
                {advisor.available && (
                  <span className="provider-card-badge">
                    ✅ Available Now
                  </span>
                )}
              </div>

              <div className="provider-card-details">
                <h3 className="provider-card-name">{advisor.name}</h3>
                <p className="provider-card-specialty">🌱 {advisor.specialty}</p>
                <p className="provider-card-meta">
                  Experience: <strong>{advisor.experience}</strong>
                </p>
                <p className="provider-card-location">
                  📍 {advisor.distance} • {advisor.location}
                </p>
              </div>

              <Button
                variant="primary"
                className="provider-card-action"
                leftIcon={<span>📞</span>}
                onClick={() => alert(`Calling ${advisor.name}...`)}
              >
                Call Advisor
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}
