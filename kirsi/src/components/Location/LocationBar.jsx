import React, { useState } from 'react';
import { useLocationContext } from '../../context/LocationContext';
import { Button, Input } from '../ui';
import { FaMapMarkerAlt, FaLocationArrow } from 'react-icons/fa';
import './Location.css';

export default function LocationBar({ className = "" }) {
  const { coords, cityName, locationStatus, requestLocation, updateManualCity } = useLocationContext();
  const [manualCityInput, setManualCityInput] = useState('');

  const handleManualLocationSubmit = (e) => {
    e.preventDefault();
    if (manualCityInput.trim()) {
      updateManualCity(manualCityInput.trim());
      setManualCityInput('');
    }
  };

  return (
    <div className={`location-bar-reusable ${className}`}>
      <div className="location-bar-main">
        <div className="location-bar-info">
          <FaMapMarkerAlt className="location-marker-icon" />
          <span className="location-text">
            Showing results near <strong>{cityName}</strong>
            {coords.latitude && (
              <span className="location-coords">
                {' '}({coords.latitude.toFixed(4)}, {coords.longitude.toFixed(4)})
              </span>
            )}
          </span>
        </div>
        
        {locationStatus !== 'granted' ? (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={requestLocation} 
            leftIcon={<FaLocationArrow />}
            className="share-location-btn"
          >
            Share GPS Location
          </Button>
        ) : (
          <span className="live-location-badge">
            🟢 Live GPS Active
          </span>
        )}
      </div>

      {locationStatus === 'denied' && (
        <form onSubmit={handleManualLocationSubmit} className="manual-location-form">
          <Input
            placeholder="Change City (e.g. Jaipur, Pune, Kota...)"
            value={manualCityInput}
            onChange={(e) => setManualCityInput(e.target.value)}
            className="manual-location-input"
            size="sm"
          />
          <Button type="submit" variant="secondary" size="sm" className="manual-location-btn">
            Update Location
          </Button>
        </form>
      )}
    </div>
  );
}
