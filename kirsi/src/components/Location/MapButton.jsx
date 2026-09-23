import React from 'react';
import { Button } from '../ui';
import { FaMapMarkerAlt } from 'react-icons/fa';

export default function MapButton({ destLat, destLng, destAddress, label = "Open in Google Maps", size = "sm", variant = "outline", className = "" }) {
  const handleClick = (e) => {
    e.stopPropagation();
    let url = '';
    if (destLat && destLng) {
      url = `https://www.google.com/maps/search/?api=1&query=${destLat},${destLng}`;
    } else if (destAddress) {
      url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destAddress)}`;
    } else {
      url = `https://www.google.com/maps`;
    }
    window.open(url, '_blank');
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      leftIcon={<FaMapMarkerAlt />}
      className={`map-button ${className}`}
    >
      {label}
    </Button>
  );
}
