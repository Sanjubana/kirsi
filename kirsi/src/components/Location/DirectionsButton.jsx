import React from 'react';
import { Button } from '../ui';
import { FaLocationArrow } from 'react-icons/fa';

export default function DirectionsButton({ userLat, userLng, destLat, destLng, destAddress, label = "Get Directions", size = "sm", variant = "primary", className = "" }) {
  const handleClick = (e) => {
    e.stopPropagation();
    let url = '';
    if (userLat && userLng && destLat && destLng) {
      url = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${destLat},${destLng}&travelmode=driving`;
    } else if (destLat && destLng) {
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
      leftIcon={<FaLocationArrow />}
      className={`directions-button ${className}`}
    >
      {label}
    </Button>
  );
}
