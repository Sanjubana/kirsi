import React, { useState, useEffect } from 'react';
import { Card, BackButton, Skeleton } from '../../components/ui';
import { useLocationContext } from '../../context/LocationContext';
import { calculateDistance } from '../../utils/mapsHelper';
import LocationBar from '../../components/Location/LocationBar';
import DistanceBadge from '../../components/Location/DistanceBadge';
import MapButton from '../../components/Location/MapButton';
import DirectionsButton from '../../components/Location/DirectionsButton';
import './Crops.css';

const baseCropListings = [
  {
    id: 'crop_s1',
    farmer: 'Rajesh Patil',
    crop: 'Premium Wheat (Sonalika)',
    quantity: '500 kg',
    price: '₹2,200 / quintal',
    city: 'Shirur',
    address: 'Plot 42, Mandi Yard, Shirur',
    latOffset: 0.035,
    lngOffset: -0.015,
  },
  {
    id: 'crop_s2',
    farmer: 'Devendra Singh',
    crop: 'Organic Basmati Rice',
    quantity: '1,200 kg',
    price: '₹6,500 / quintal',
    city: 'Kharadi',
    address: 'Ghar No 12, Grant Road, Kharadi',
    latOffset: 0.062,
    lngOffset: 0.054,
  },
  {
    id: 'crop_s3',
    farmer: 'Sohan Lal Mandi',
    crop: 'Long Staple Cotton',
    quantity: '800 kg',
    price: '₹7,200 / quintal',
    city: 'Hadapsar',
    address: 'Shop 104, Gadital Bypass, Hadapsar',
    latOffset: -0.025,
    lngOffset: 0.038,
  },
  {
    id: 'crop_s4',
    farmer: 'Ramesh Chaudhary',
    crop: 'Fresh Tomatoes (Local Red)',
    quantity: '300 kg',
    price: '₹1,500 / crate',
    city: 'Chakan',
    address: 'Near Talegaon Chowk, Chakan',
    latOffset: 0.115,
    lngOffset: -0.068,
  }
];

export default function BuyCrops() {
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

  // Process listings with distance relative to current coords
  const processedListings = baseCropListings.map((item) => {
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
    <div className="crops-page fade-in">
      <div className="crops-header">
        <BackButton label="Back to Crops" to="/crops" />
        <div className="crops-title-section">
          <h2>Buy Crops Marketplace</h2>
          <p>Purchase fresh farm harvests directly from nearby food growers</p>
        </div>
      </div>

      {/* Reusable Location selection header */}
      <LocationBar />

      {loading ? (
        <div className="product-grid" style={{ marginTop: 'var(--space-md)' }}>
          <Skeleton type="card" count={4} />
        </div>
      ) : (
        <div className="product-grid" style={{ marginTop: 'var(--space-md)' }}>
          {processedListings.map((item) => (
            <Card key={item.id} hoverLift className="product-card" style={{ minHeight: '380px' }}>
              <Card.Body className="product-card-body" style={{ padding: 'var(--space-lg)', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary-hover)', padding: '4px 8px', borderRadius: '4px', fontWeight: '700', textTransform: 'uppercase' }}>
                    🌾 Crop For Sale
                  </span>
                  <h3 className="product-card-title" style={{ marginTop: '6px', fontSize: '1.2rem' }}>
                    {item.crop}
                  </h3>
                </div>

                <div style={{ margin: 'var(--space-xs) 0', fontSize: '0.9rem', color: 'var(--color-text-main)' }}>
                  <p>👩‍🌾 <strong>Farmer:</strong> {item.farmer}</p>
                  <p>📦 <strong>Stock Available:</strong> {item.quantity}</p>
                  <p>💰 <strong>Expected Price:</strong> <span style={{ color: 'var(--color-primary)', fontWeight: '700' }}>{item.price}</span></p>
                  <p style={{ marginTop: '6px', color: 'var(--color-text-muted)', fontSize: '0.82rem' }}>🏠 <strong>Address:</strong> {item.address}</p>
                </div>

                <div style={{ marginTop: 'auto', marginBottom: 'var(--space-md)' }}>
                  <DistanceBadge distance={item.distanceValue} locationName={item.city} />
                </div>

                <div className="product-card-actions" style={{ gridTemplateColumns: '1fr 1fr', gap: '8px', width: '100%' }}>
                  <MapButton 
                    destLat={item.coords.latitude} 
                    destLng={item.coords.longitude} 
                    destAddress={`${item.address}, India`}
                  />
                  <DirectionsButton 
                    userLat={userLat} 
                    userLng={userLng} 
                    destLat={item.coords.latitude} 
                    destLng={item.coords.longitude} 
                    destAddress={`${item.address}, India`}
                  />
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
