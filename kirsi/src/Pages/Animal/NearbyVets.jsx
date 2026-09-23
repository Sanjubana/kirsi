import React, { useState, useEffect } from 'react';
import { Card, Button, BackButton, Skeleton } from '../../components/ui';
import { useLocationContext } from '../../context/LocationContext';
import { calculateDistance } from '../../utils/mapsHelper';
import { FaPhoneAlt, FaUserMd } from 'react-icons/fa';
import LocationBar from '../../components/Location/LocationBar';
import DistanceBadge from '../../components/Location/DistanceBadge';
import MapButton from '../../components/Location/MapButton';
import DirectionsButton from '../../components/Location/DirectionsButton';

const baseVets = [
  {
    name: 'Dr. Ramesh Sharma',
    specialty: 'Livestock & Cattle Specialist',
    experience: '10 years',
    location: 'Shirur',
    address: 'Near Mandi Gate, Shirur Bypass',
    phone: '9876500001',
    latOffset: 0.045,
    lngOffset: -0.025,
  },
  {
    name: 'Dr. Priya Deshmukh',
    specialty: 'Poultry Care Expert',
    experience: '7 years',
    location: 'Kharadi',
    address: 'Shop 5, Grant Road Circle, Kharadi',
    phone: '9876500002',
    latOffset: 0.062,
    lngOffset: 0.054,
  },
  {
    name: 'Dr. Anil Kulkarni',
    specialty: 'General Veterinary Surgeon',
    experience: '14 years',
    location: 'Alandi',
    address: 'Dehu Road Highway crossing, Alandi',
    phone: '9876500003',
    latOffset: 0.108,
    lngOffset: 0.021,
  }
];

export default function NearbyVets() {
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
  const sortedVets = baseVets.map((vet) => {
    const lat = userLat + vet.latOffset;
    const lng = userLng + vet.lngOffset;
    const distanceValue = calculateDistance(userLat, userLng, lat, lng);
    return {
      ...vet,
      distanceValue,
      coords: { latitude: lat, longitude: lng }
    };
  }).sort((a, b) => a.distanceValue - b.distanceValue);

  return (
    <div className="animal-subpage fade-in">
      <div className="animal-header">
        <BackButton label="Back to Animal Care" to="/animal" />
        <div className="animal-title-section">
          <h2>Nearby Vets & Doctors</h2>
          <p>Find and call qualified veterinarians in your region for immediate animal support</p>
        </div>
      </div>

      {/* Location Bar */}
      <LocationBar />

      {loading ? (
        <div className="provider-grid">
          <Skeleton type="provider" count={3} />
        </div>
      ) : (
        <div className="provider-grid">
          {sortedVets.map((vet, idx) => (
            <Card key={idx} hoverLift className="provider-card">
              <Card.Body className="provider-card-body" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className="provider-card-top">
                  <div className="provider-card-avatar">
                    <FaUserMd />
                  </div>
                  <span className="provider-card-badge">✅ Available</span>
                </div>

                <div className="provider-card-details" style={{ flexGrow: 1 }}>
                  <h3 className="provider-card-name">{vet.name}</h3>
                  <p className="provider-card-specialty">🩺 {vet.specialty}</p>
                  <p className="provider-card-meta">
                    Experience: <strong>{vet.experience}</strong>
                  </p>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', marginTop: '4px' }}>
                    🏠 Address: {vet.address}
                  </p>
                  
                  <div style={{ marginTop: '8px', marginBottom: '12px' }}>
                    <DistanceBadge distance={vet.distanceValue} locationName={vet.location} />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', marginTop: 'auto' }}>
                  <Button
                    variant="primary"
                    className="provider-card-action"
                    leftIcon={<FaPhoneAlt />}
                    onClick={() => alert(`Calling ${vet.name} at +91 ${vet.phone}...`)}
                    style={{ width: '100%' }}
                  >
                    Call Vet Doctor
                  </Button>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', width: '100%' }}>
                    <MapButton 
                      destLat={vet.coords.latitude} 
                      destLng={vet.coords.longitude} 
                      destAddress={`${vet.address}, India`}
                      label="Map"
                    />
                    <DirectionsButton 
                      userLat={userLat} 
                      userLng={userLng} 
                      destLat={vet.coords.latitude} 
                      destLng={vet.coords.longitude} 
                      destAddress={`${vet.address}, India`}
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
