import React, { useState, useEffect } from "react";
import "./RentalTools.css";
import { assets } from "../../assets/assets";
import { Card, Button, BackButton, Skeleton } from "../ui";
import { useLocationContext } from "../../context/LocationContext";
import { calculateDistance } from "../../utils/mapsHelper";
import LocationBar from "../Location/LocationBar";
import DistanceBadge from "../Location/DistanceBadge";
import MapButton from "../Location/MapButton";
import DirectionsButton from "../Location/DirectionsButton";

const toolsList = [
  {
    name: "Tractor with Driver",
    price: "₹3,500 / day",
    location: "Shirur",
    address: "Shirur Town Hall Bypass, Shirur",
    phone: "9876500001",
    tag: "Used",
    image: assets.tractor,
    latOffset: 0.045,
    lngOffset: -0.025,
  },
  {
    name: "Rotavator",
    price: "₹1,500 / day",
    location: "Kharadi",
    address: "Kharadi Bypass Circle, Kharadi",
    phone: "9876500002",
    tag: "New",
    image: assets.rotovator1,
    latOffset: 0.062,
    lngOffset: 0.054,
  },
  {
    name: "Thresher",
    price: "₹5,000 / day",
    location: "Alandi",
    address: "Near Alandi Temple Chowk, Alandi",
    phone: "9876500003",
    tag: "Used",
    image: assets.thresher1,
    latOffset: 0.108,
    lngOffset: 0.021,
  },
];

export default function RentalTools() {
  const { coords, cityName } = useLocationContext();
  const [loading, setLoading] = useState(true);

  const userLat = coords.latitude || 18.5204;
  const userLng = coords.longitude || 73.8567;

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [coords, cityName]);

  // Process and sort by distance
  const sortedRentalTools = toolsList.map((tool) => {
    const lat = userLat + tool.latOffset;
    const lng = userLng + tool.lngOffset;
    const distanceValue = calculateDistance(userLat, userLng, lat, lng);
    return {
      ...tool,
      distanceValue,
      coords: { latitude: lat, longitude: lng }
    };
  }).sort((a, b) => a.distanceValue - b.distanceValue);

  return (
    <div className="rentaltools-page fade-in">
      <div className="rentaltools-header">
        <BackButton label="Back to Tools" to="/tools" />
        <h2 className="section-title">Rent Tools & Equipment</h2>
        <p className="section-subtitle">Rent tools for short-term use from nearby farms</p>
      </div>

      {/* Location Bar */}
      <LocationBar />

      {loading ? (
        <div className="product-grid">
          <Skeleton type="card" count={3} />
        </div>
      ) : (
        <div className="product-grid">
          {sortedRentalTools.map((tool, index) => (
            <Card key={index} hoverLift className="product-card">
              <div className="product-card-img-container">
                <img src={tool.image} alt={tool.name} className="product-card-img" />
                <span className={`product-card-badge ${tool.tag.toLowerCase()}`}>
                  {tool.tag}
                </span>
              </div>

              <Card.Body className="product-card-body" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className="product-card-header">
                  <h3 className="product-card-title">{tool.name}</h3>
                  <h2 className="product-card-price">{tool.price}</h2>
                </div>

                <div style={{ margin: 'var(--space-2xs) 0', fontSize: '0.85rem', color: 'var(--color-text-main)' }}>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.82rem' }}>🏠 <strong>Address:</strong> {tool.address}</p>
                </div>

                <div style={{ marginTop: 'auto', marginBottom: 'var(--space-md)' }}>
                  <DistanceBadge distance={tool.distanceValue} locationName={tool.location} />
                </div>

                <div className="product-card-actions" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <Button 
                      variant="primary" 
                      size="sm" 
                      onClick={() => alert(`Calling owner for renting ${tool.name}`)}
                      leftIcon={<span>📞</span>}
                    >
                      Call
                    </Button>
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      onClick={() => window.open('https://wa.me/', '_blank')}
                      leftIcon={<span>💬</span>}
                      className="whatsapp-btn"
                    >
                      WhatsApp
                    </Button>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <MapButton 
                      destLat={tool.coords.latitude} 
                      destLng={tool.coords.longitude} 
                      destAddress={`${tool.address}, India`}
                      label="Map"
                    />
                    <DirectionsButton 
                      userLat={userLat} 
                      userLng={userLng} 
                      destLat={tool.coords.latitude} 
                      destLng={tool.coords.longitude} 
                      destAddress={`${tool.address}, India`}
                      label="Directions"
                    />
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
