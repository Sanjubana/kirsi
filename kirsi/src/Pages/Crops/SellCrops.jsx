import React, { useState, useEffect } from 'react';
import { Card, Button, BackButton, Input, Skeleton } from '../../components/ui';
import { useLocationContext } from '../../context/LocationContext';
import { calculateDistance } from '../../utils/mapsHelper';
import { FaStore } from 'react-icons/fa';
import LocationBar from '../../components/Location/LocationBar';
import DistanceBadge from '../../components/Location/DistanceBadge';
import MapButton from '../../components/Location/MapButton';
import DirectionsButton from '../../components/Location/DirectionsButton';
import './Crops.css';

const baseCropBuyers = [
  {
    id: 'buyer_1',
    company: 'Reliance Fresh Agro Procurement',
    requirement: 'Wheat & Potatoes (Bulk purchase)',
    minQuantity: '2,000 kg',
    priceOffer: '₹2,350 / quintal',
    city: 'Shirur',
    address: 'Shirur Bypass Yard, Maharashtra',
    latOffset: 0.052,
    lngOffset: -0.015,
  },
  {
    id: 'buyer_2',
    company: 'Shetkari Sahakari Grahak Mandi',
    requirement: 'Basmati Rice, pulses & Legumes',
    minQuantity: '5,000 kg',
    priceOffer: '₹6,700 / quintal',
    city: 'Kharadi',
    address: 'Kharadi Wholesale Market, Pune',
    latOffset: 0.075,
    lngOffset: 0.062,
  },
  {
    id: 'buyer_3',
    company: 'Organic Grain Distributors Ltd',
    requirement: 'Soybeans & Mustard Seeds',
    minQuantity: '1,000 kg',
    priceOffer: '₹5,400 / quintal',
    city: 'Hadapsar',
    address: 'Hadapsar Junction Market, Pune',
    latOffset: -0.025,
    lngOffset: 0.038,
  }
];

export default function SellCrops() {
  const { coords, cityName } = useLocationContext();
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({ cropName: '', quantity: '', expectedPrice: '', contact: '' });
  const [formSuccess, setFormSuccess] = useState(false);

  const userLat = coords.latitude || 18.5204;
  const userLng = coords.longitude || 73.8567;

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [coords, cityName]);

  // Process buyers list with distance relative to current coords
  const processedBuyers = baseCropBuyers.map((item) => {
    const lat = userLat + item.latOffset;
    const lng = userLng + item.lngOffset;
    const distanceValue = calculateDistance(userLat, userLng, lat, lng);
    return {
      ...item,
      distanceValue,
      coords: { latitude: lat, longitude: lng }
    };
  }).sort((a, b) => a.distanceValue - b.distanceValue);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.cropName || !formData.quantity || !formData.expectedPrice) {
      alert('Please fill out all required fields');
      return;
    }
    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setFormData({ cropName: '', quantity: '', expectedPrice: '', contact: '' });
      alert('Your harvest offer has been successfully published to nearby buyers!');
    }, 1500);
  };

  return (
    <div className="crops-page fade-in">
      <div className="crops-header">
        <BackButton label="Back to Crops" to="/crops" />
        <div className="crops-title-section">
          <h2>Sell Crops & Offers</h2>
          <p>Post your harvest details and find nearby wholesale commodity buyers</p>
        </div>
      </div>

      <div className="grid-2-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-lg)' }}>
        {/* Left Side: Submit Harvesting Form */}
        <Card style={{ height: 'fit-content' }}>
          <Card.Header>
            <h3>List Your Harvest for Sale</h3>
            <p>Enter crop specs to receive bids from nearby merchants</p>
          </Card.Header>
          <Card.Body>
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <Input
                label="Crop Type / Name *"
                name="cropName"
                placeholder="e.g. Sonalika Wheat, Desi Chickpeas"
                value={formData.cropName}
                onChange={handleInputChange}
              />
              <Input
                label="Quantity Available (kg/quintal) *"
                name="quantity"
                placeholder="e.g. 500 kg or 10 Quintal"
                value={formData.quantity}
                onChange={handleInputChange}
              />
              <Input
                label="Expected Price (₹) *"
                name="expectedPrice"
                placeholder="e.g. 2100 per Quintal"
                value={formData.expectedPrice}
                onChange={handleInputChange}
                leftIcon={<span>₹</span>}
              />
              <Input
                label="Contact Mobile Number"
                name="contact"
                placeholder="e.g. 9876543210"
                value={formData.contact}
                onChange={handleInputChange}
                leftIcon={<span>📞</span>}
              />

              <Button type="submit" variant="primary" style={{ marginTop: 'var(--space-xs)' }}>
                Publish Harvest Offer
              </Button>
            </form>
          </Card.Body>
        </Card>

        {/* Right Side: Nearby Wholesaler Requirements */}
        <div>
          {/* Reusable Location selection bar */}
          <LocationBar />

          <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: 'var(--space-md)', color: 'var(--color-primary-dark)' }}>
            💼 Nearby Bulk Buyers & Requirements
          </h3>

          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <Skeleton type="provider" count={3} />
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              {processedBuyers.map((buyer) => (
                <Card key={buyer.id} hoverLift>
                  <Card.Body className="provider-card-body" style={{ padding: 'var(--space-md)' }}>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <div className="provider-card-avatar shop" style={{ width: '42px', height: '42px', fontSize: '1.1rem', flexShrink: 0 }}>
                        <FaStore />
                      </div>
                      <div style={{ flexGrow: 1 }}>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--color-text-main)' }}>{buyer.company}</h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: '600', marginTop: '2px' }}>
                          🌾 Requires: {buyer.requirement}
                        </p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                          Min Quantity: <strong>{buyer.minQuantity}</strong> • Offer: <strong>{buyer.priceOffer}</strong>
                        </p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', marginTop: '4px' }}>
                          🏠 Address: {buyer.address}
                        </p>
                        
                        <div style={{ marginTop: '6px' }}>
                          <DistanceBadge distance={buyer.distanceValue} locationName={buyer.city} />
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: 'var(--space-sm)', display: 'flex', gap: '8px' }}>
                      <Button
                        variant="primary"
                        size="sm"
                        style={{ flexGrow: 2 }}
                        onClick={() => alert(`Sending bid specs to ${buyer.company}...`)}
                      >
                        Submit Price Quote
                      </Button>
                      <MapButton 
                        destLat={buyer.coords.latitude} 
                        destLng={buyer.coords.longitude} 
                        destAddress={`${buyer.address}, India`}
                        label="Map"
                        style={{ flexGrow: 1 }}
                      />
                      <DirectionsButton 
                        userLat={userLat} 
                        userLng={userLng} 
                        destLat={buyer.coords.latitude} 
                        destLng={buyer.coords.longitude} 
                        destAddress={`${buyer.address}, India`}
                        label="Directions"
                        style={{ flexGrow: 1 }}
                      />
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
