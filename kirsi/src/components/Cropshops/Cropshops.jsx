import React from "react";
import "./Cropshops.css";
import { FaMapMarkerAlt, FaPhoneAlt, FaStore } from "react-icons/fa";
import { Card, Button, BackButton } from "../ui";

const shops = [
  {
    name: "Krishi Seva Kendra Shirur",
    type: "Seeds, Fertilizer, Pesticides",
    distance: "8 km away • Shirur",
    verified: true,
  },
  {
    name: "Bharat Agri Store",
    type: "All Agriculture Products",
    distance: "12 km away • Kharadi",
    verified: true,
  },
  {
    name: "Green Farm Suppliers",
    type: "Organic Fertilizers & Seeds",
    distance: "15 km away • Alandi",
    verified: false,
  },
  {
    name: "Sahyadri Seeds & Chemicals",
    type: "Seeds & Pesticides",
    distance: "20 km away • Hadapsar",
    verified: true,
  },
];

export default function Cropshops() {
  return (
    <div className="cropshops-page fade-in">
      <div className="cropshops-header">
        <BackButton label="Back to Crops" to="/crops" />
        <div className="cropshops-title-section">
          <h2>Nearby Agri Shops</h2>
          <p>Find trusted Krishi Seva Kendras and agriculture shops near you</p>
        </div>
      </div>

      <div className="location-bar">
        <div className="location-bar-left">
          <FaMapMarkerAlt />
          <span>Showing shops near <b>Pune</b> within 50 km</span>
        </div>
        <Button variant="text" size="sm" onClick={() => alert('Location selection coming soon!')}>
          Change location
        </Button>
      </div>

      <div className="provider-grid">
        {shops.map((shop, index) => (
          <Card key={index} hoverLift className="provider-card">
            <Card.Body className="provider-card-body">
              <div className="provider-card-top">
                <div className="provider-card-avatar shop">
                  <FaStore />
                </div>
                {shop.verified && (
                  <span className="provider-card-badge">✔ Verified</span>
                )}
              </div>

              <div className="provider-card-details">
                <h3 className="provider-card-name">{shop.name}</h3>
                <p className="provider-card-specialty shop">{shop.type}</p>
                <p className="provider-card-location">
                  <FaMapMarkerAlt /> {shop.distance}
                </p>
              </div>

              <Button
                variant="primary"
                className="provider-card-action"
                leftIcon={<FaPhoneAlt />}
                onClick={() => alert(`Calling ${shop.name}...`)}
              >
                Call Shop
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}
