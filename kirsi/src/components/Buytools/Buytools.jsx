import React, { useState, useEffect } from "react";
import "./Buytools.css";
import { assets } from "../../assets/assets";
import { Card, Button, BackButton, Skeleton } from "../ui";
import { useLocationContext } from "../../context/LocationContext";
import { calculateDistance } from "../../utils/mapsHelper";
import LocationBar from "../Location/LocationBar";
import DistanceBadge from "../Location/DistanceBadge";
import MapButton from "../Location/MapButton";
import DirectionsButton from "../Location/DirectionsButton";

const baseToolsList = [
  {
    name: "Mahindra Panja (Five Tine Harvester)",
    price: "₹35,000",
    status: "Used",
    location: "Shirur",
    phone: "+91 98765 01001",
    address: "Market Yard Chowk, Shirur",
    image: assets.panja,
    latOffset: 0.045,
    lngOffset: -0.025
  },
  {
    name: "Rotavator 7 Feet (Shaktiman)",
    price: "₹45,000",
    status: "New",
    location: "Kharadi",
    phone: "+91 98765 01002",
    address: "MIDC Sector 4, Kharadi",
    image: assets.rotovator1,
    latOffset: 0.062,
    lngOffset: 0.054
  },
  {
    name: "Rotavator 5 Feet (Sonalika)",
    price: "₹35,000",
    status: "Used",
    location: "Alandi",
    phone: "+91 98765 01003",
    address: "Dehu-Alandi Road, Alandi",
    image: assets.rotovator2,
    latOffset: 0.108,
    lngOffset: 0.021
  },
  {
    name: "Sowing Machine 9 Row",
    price: "₹50,000",
    status: "New",
    location: "Hadapsar",
    phone: "+91 98765 01004",
    address: "Mandi Road, Hadapsar",
    image: assets.sowingmachine1,
    latOffset: -0.025,
    lngOffset: 0.038
  },
  {
    name: "Mahindra Wheat Thresher",
    price: "₹1,12,000",
    status: "Used",
    location: "Chakan",
    phone: "+91 98765 01005",
    address: "Pune Bypass Road, Chakan",
    image: assets.thresher1,
    latOffset: 0.115,
    lngOffset: -0.068
  },
  {
    name: "Standard Paddy Thresher",
    price: "₹1,58,000",
    status: "New",
    location: "Baramati",
    phone: "+91 98765 01006",
    address: "Indapur Road, Baramati",
    image: assets.thresher2,
    latOffset: -0.185,
    lngOffset: 0.214
  }
];

function BuyTools() {
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

  // Process and sort tools by distance
  const sortedTools = baseToolsList.map((tool) => {
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
    <div className="buytools-page fade-in">
      <div className="buytools-header">
        <BackButton label="Back to Tools" to="/tools" />
        <h2 className="section-title">Buy Tools & Equipment</h2>
        <p className="section-subtitle">Buy machinery directly from nearby farmers at best prices</p>
      </div>

      {/* Location Bar */}
      <LocationBar />

      {loading ? (
        <div className="product-grid">
          <Skeleton type="card" count={6} />
        </div>
      ) : (
        <div className="product-grid">
          {sortedTools.map((tool, index) => (
            <Card key={index} hoverLift className="product-card">
              <div className="product-card-img-container">
                <img src={tool.image} alt={tool.name} className="product-card-img" />
                <span className={`product-card-badge ${tool.status.toLowerCase()}`}>
                  {tool.status}
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
                      onClick={() => alert(`Calling seller at ${tool.phone} for ${tool.name}`)}
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

export default BuyTools;