import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaScrewdriverWrench, FaTractor, FaPhone, FaStar } from "react-icons/fa6";
import "./Mechanic.css";
import { Card, Button, BackButton, Skeleton } from "../ui";
import { useLocationContext } from "../../context/LocationContext";
import { fetchNearbyMechanics } from "../../utils/mapsHelper";
import LocationBar from "../Location/LocationBar";
import DistanceBadge from "../Location/DistanceBadge";
import MapButton from "../Location/MapButton";
import DirectionsButton from "../Location/DirectionsButton";

export default function MechanicServices() {
  const navigate = useNavigate();
  const { coords, cityName } = useLocationContext();
  const [mechanicsList, setMechanicsList] = useState([]);
  const [loadingList, setLoadingList] = useState(true);

  const userLat = coords.latitude || 18.5204;
  const userLng = coords.longitude || 73.8567;

  useEffect(() => {
    const loadMechanics = async () => {
      setLoadingList(true);
      const list = await fetchNearbyMechanics(coords.latitude, coords.longitude);
      setMechanicsList(list);
      setLoadingList(false);
    };
    loadMechanics();
  }, [coords]);

  return (
    <div className="mechanic-page fade-in">
      <div className="mechanic-header">
        <BackButton label="Back to Tools" to="/tools" />
        <div className="mechanic-title-row">
          <div>
            <h2>Mechanic Services</h2>
            <p>Find trusted tractor & farm equipment mechanics near you</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<FaScrewdriverWrench />}
            onClick={() => navigate('/register-mechanic')}
          >
            Register as Mechanic
          </Button>
        </div>
      </div>

      {/* Reusable location bar */}
      <LocationBar />

      {loadingList ? (
        <div className="provider-grid">
          <Skeleton type="provider" count={4} />
        </div>
      ) : (
        <div className="provider-grid">
          {mechanicsList.map((mechanic) => (
            <Card key={mechanic.id} hoverLift className="provider-card">
              <Card.Body className="provider-card-body" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className="provider-card-top">
                  <div className="provider-card-avatar">
                    <FaTractor />
                  </div>
                  <span className="provider-card-badge" style={{ backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary-hover)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <FaStar style={{ color: 'var(--color-accent)' }} /> {mechanic.rating.toFixed(1)}
                  </span>
                </div>

                <div className="provider-card-details" style={{ flexGrow: 1 }}>
                  <h3 className="provider-card-name">{mechanic.name}</h3>
                  <p className="provider-card-specialty">
                    <FaScrewdriverWrench /> {mechanic.specialty}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: '6px 0' }}>
                    🏠 Address: {mechanic.address}
                  </p>
                  
                  <div style={{ marginTop: '8px', marginBottom: '12px' }}>
                    <DistanceBadge distance={mechanic.distanceValue} />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto', width: '100%' }}>
                  <Button
                    variant="primary"
                    className="provider-card-action"
                    leftIcon={<FaPhone />}
                    onClick={() => alert(`Calling mechanic at ${mechanic.phone}...`)}
                    style={{ margin: 0, width: '100%' }}
                  >
                    Call Mechanic
                  </Button>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', width: '100%' }}>
                    <MapButton 
                      destLat={mechanic.coords.latitude} 
                      destLng={mechanic.coords.longitude} 
                      destAddress={`${mechanic.address}, India`}
                      label="Map"
                    />
                    <DirectionsButton 
                      userLat={userLat} 
                      userLng={userLng} 
                      destLat={mechanic.coords.latitude} 
                      destLng={mechanic.coords.longitude} 
                      destAddress={`${mechanic.address}, India`}
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
