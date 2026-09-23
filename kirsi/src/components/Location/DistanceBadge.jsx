import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import './Location.css';

export default function DistanceBadge({ distance, locationName, className = "" }) {
  const formattedDistance = typeof distance === 'number' 
    ? `${distance.toFixed(1)} km away` 
    : distance;

  if (!formattedDistance && !locationName) return null;

  return (
    <span className={`distance-badge ${className}`}>
      <FaMapMarkerAlt className="badge-marker-icon" />
      {formattedDistance && <span className="badge-distance">{formattedDistance}</span>}
      {formattedDistance && locationName && <span className="badge-divider">•</span>}
      {locationName && <span className="badge-location">{locationName}</span>}
    </span>
  );
}
