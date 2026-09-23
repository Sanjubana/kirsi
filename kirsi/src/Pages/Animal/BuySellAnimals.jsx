import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import { Card, Button, BackButton, Skeleton } from '../../components/ui';
import { useLocationContext } from '../../context/LocationContext';
import { calculateDistance } from '../../utils/mapsHelper';
import LocationBar from '../../components/Location/LocationBar';
import DistanceBadge from '../../components/Location/DistanceBadge';
import MapButton from '../../components/Location/MapButton';
import DirectionsButton from '../../components/Location/DirectionsButton';

const baseListings = [
  {
    name: 'High Yielding Sahiwal Breed Cow',
    price: '₹65,000',
    details: 'Milk Yield: 15L/day • 2nd Lactation',
    location: 'Jhalawar',
    address: 'Chowk Lane 4, Jhalawar',
    image: assets.cow,
    tag: 'Available',
    latOffset: 0.052,
    lngOffset: -0.015,
  },
  {
    name: 'Sirohi Breed Healthy Male Goat',
    price: '₹12,000',
    details: 'Weight: 32 kg • Age: 14 months',
    location: 'Jaipur',
    address: 'Mandi Road Sector 2, Jaipur',
    image: assets.goat,
    tag: 'Available',
    latOffset: 0.075,
    lngOffset: 0.062,
  },
  {
    name: 'Premium Murrah Breed Buffalo',
    price: '₹90,000',
    details: 'Milk Yield: 18L/day • 3rd Lactation',
    location: 'Kota',
    address: 'Near Transport Nagar, Kota',
    image: assets.cow,
    tag: 'New',
    latOffset: -0.025,
    lngOffset: 0.038,
  }
];

export default function BuySellAnimals() {
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
  const sortedListings = baseListings.map((item) => {
    const lat = userLat + item.latOffset;
    const lng = userLng + item.lngOffset;
    const distanceValue = calculateDistance(userLat, userLng, lat, lng);
    return {
      ...item,
      distanceValue,
      coords: { latitude: lat, longitude: lng }
    };
  }).sort((a, b) => a.distanceValue - b.distanceValue);

  return (
    <div className="animal-subpage fade-in">
      <div className="animal-header">
        <BackButton label="Back to Animal Care" to="/animal" />
        <div className="animal-title-section">
          <h2>Buy / Sell Livestock</h2>
          <p>Browse healthy farm animals listed by nearby breeders and livestock farmers</p>
        </div>
      </div>

      {/* Location Bar */}
      <LocationBar />

      {loading ? (
        <div className="product-grid">
          <Skeleton type="card" count={3} />
        </div>
      ) : (
        <div className="product-grid">
          {sortedListings.map((item, idx) => (
            <Card key={idx} hoverLift className="product-card">
              <div className="product-card-img-container">
                <img src={item.image} alt={item.name} className="product-card-img" />
                <span className={`product-card-badge available`}>
                  {item.tag}
                </span>
              </div>

              <Card.Body className="product-card-body" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className="product-card-header">
                  <h3 className="product-card-title">{item.name}</h3>
                  <h2 className="product-card-price">{item.price}</h2>
                </div>

                <div style={{ margin: 'var(--space-2xs) 0', fontSize: '0.85rem', color: 'var(--color-text-main)' }}>
                  <p>ℹ️ {item.details}</p>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.82rem', marginTop: '4px' }}>🏠 Address: {item.address}</p>
                </div>

                <div style={{ marginTop: 'auto', marginBottom: 'var(--space-md)' }}>
                  <DistanceBadge distance={item.distanceValue} locationName={item.location} />
                </div>

                <div className="product-card-actions" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <Button 
                      variant="primary" 
                      size="sm" 
                      onClick={() => alert(`Calling seller for ${item.name}`)}
                      leftIcon={<span>📞</span>}
                    >
                      Call Seller
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
                      destLat={item.coords.latitude} 
                      destLng={item.coords.longitude} 
                      destAddress={`${item.address}, India`}
                      label="Map"
                    />
                    <DirectionsButton 
                      userLat={userLat} 
                      userLng={userLng} 
                      destLat={item.coords.latitude} 
                      destLng={item.coords.longitude} 
                      destAddress={`${item.address}, India`}
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
