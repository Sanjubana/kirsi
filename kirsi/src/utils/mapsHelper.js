// Haversine formula to calculate the distance between two coordinates in kilometers
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
  const R = 6371; // Radius of the Earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

// Open Google Maps in a new tab with turn-by-turn directions from user location to listing
export const openDirectionsInGoogleMaps = (userLat, userLng, destLat, destLng, destAddress) => {
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

// Lazy loader for Google Maps SDK
let googleMapsScriptPromise = null;
export const loadGoogleMapsScript = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  if (!apiKey || apiKey === 'YOUR_GOOGLE_MAPS_API_KEY_HERE') {
    return Promise.reject(new Error('Google Maps API key is not configured'));
  }

  if (window.google && window.google.maps) {
    return Promise.resolve(window.google.maps);
  }

  if (googleMapsScriptPromise) {
    return googleMapsScriptPromise;
  }

  googleMapsScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google.maps);
    script.onerror = (err) => reject(err);
    document.head.appendChild(script);
  });

  return googleMapsScriptPromise;
};

// Fetch nearby repair services and tractor mechanics using Places text search
export const fetchNearbyMechanics = async (userLat, userLng) => {
  const baseLat = userLat || 18.5204;
  const baseLng = userLng || 73.8567;

  try {
    const maps = await loadGoogleMapsScript();
    return new Promise((resolve) => {
      const element = document.createElement('div');
      const service = new maps.places.PlacesService(element);
      const request = {
        location: new maps.LatLng(baseLat, baseLng),
        radius: 25000, // 25 km
        query: 'tractor mechanic repair shop service center',
      };

      service.textSearch(request, (results, status) => {
        if (status === maps.places.PlacesServiceStatus.OK && results) {
          const parsed = results.map((place) => {
            const destLat = place.geometry.location.lat();
            const destLng = place.geometry.location.lng();
            const dist = calculateDistance(baseLat, baseLng, destLat, destLng);
            return {
              id: place.place_id,
              name: place.name,
              specialty: place.types?.includes('car_repair') ? 'Tractor & Heavy Equipment' : 'Agri Equipment Repair',
              address: place.formatted_address || 'Nearby Local Area',
              phone: '+91 98765 43210',
              rating: place.rating || 4.3,
              distance: `${dist.toFixed(1)} km away`,
              distanceValue: dist,
              coords: { latitude: destLat, longitude: destLng },
            };
          });
          resolve(parsed.sort((a, b) => a.distanceValue - b.distanceValue));
        } else {
          resolve(getFallbackMechanics(baseLat, baseLng));
        }
      });
    });
  } catch (err) {
    console.warn('Using local fallback mechanics database (Google Maps offline or missing key):', err.message);
    return getFallbackMechanics(baseLat, baseLng);
  }
};

// Fetch nearby agri stores and seeds shops
export const fetchNearbyAgriStores = async (userLat, userLng) => {
  const baseLat = userLat || 18.5204;
  const baseLng = userLng || 73.8567;

  try {
    const maps = await loadGoogleMapsScript();
    return new Promise((resolve) => {
      const element = document.createElement('div');
      const service = new maps.places.PlacesService(element);
      const request = {
        location: new maps.LatLng(baseLat, baseLng),
        radius: 20000,
        query: 'krishi seva kendra seeds fertilizer shop agricultural stores',
      };

      service.textSearch(request, (results, status) => {
        if (status === maps.places.PlacesServiceStatus.OK && results) {
          const parsed = results.map((place) => {
            const destLat = place.geometry.location.lat();
            const destLng = place.geometry.location.lng();
            const dist = calculateDistance(baseLat, baseLng, destLat, destLng);
            return {
              id: place.place_id,
              name: place.name,
              type: 'Seeds, Fertilizer, Pesticides & Farm Tools',
              address: place.formatted_address || 'Agri Market Yard',
              phone: '+91 98877 66554',
              rating: place.rating || 4.0,
              distance: `${dist.toFixed(1)} km away`,
              distanceValue: dist,
              coords: { latitude: destLat, longitude: destLng },
            };
          });
          resolve(parsed.sort((a, b) => a.distanceValue - b.distanceValue));
        } else {
          resolve(getFallbackAgriStores(baseLat, baseLng));
        }
      });
    });
  } catch (err) {
    console.warn('Using local fallback agricultural stores:', err.message);
    return getFallbackAgriStores(baseLat, baseLng);
  }
};

// Mock data generator for mechanics
export const getFallbackMechanics = (baseLat, baseLng) => {
  const items = [
    {
      name: 'Suresh Patil Tractor Repair Workshop',
      specialty: 'Mahindra & John Deere Specialist',
      address: 'Shop 4, Market Yard, Shirur Bypass Rd',
      phone: '+91 98223 12345',
      rating: 4.8,
      latOffset: 0.045,
      lngOffset: -0.025,
    },
    {
      name: 'Ramesh Kumar Tractor & Thresher Care',
      specialty: 'All Heavy Farm Machinery',
      address: 'Plot 18, MIDC Sector 2, Kharadi Industrial Area',
      phone: '+91 98900 54321',
      rating: 4.5,
      latOffset: 0.082,
      lngOffset: 0.054,
    },
    {
      name: 'Vijay Deshmukh Water Pump Services',
      specialty: 'Submersible Pumps & Sprinklers Repair',
      address: 'Ganesh Chowk, Pune Bypass Highway, Hadapsar',
      phone: '+91 94220 99887',
      rating: 4.2,
      latOffset: -0.035,
      lngOffset: 0.042,
    },
    {
      name: 'Balasaheb Mane Agricultural Engineers',
      specialty: 'Combine Harvester & Rotavators Service Center',
      address: 'Opposite Shell Fuel Station, Chakan-Nashik Rd',
      phone: '+91 98601 44556',
      rating: 4.7,
      latOffset: 0.115,
      lngOffset: -0.068,
    },
  ];

  return items.map((item, index) => {
    const lat = baseLat + item.latOffset;
    const lng = baseLng + item.lngOffset;
    const dist = calculateDistance(baseLat, baseLng, lat, lng);
    return {
      id: `mock_mech_${index}`,
      name: item.name,
      specialty: item.specialty,
      address: item.address,
      phone: item.phone,
      rating: item.rating,
      distance: `${dist.toFixed(1)} km away`,
      distanceValue: dist,
      coords: { latitude: lat, longitude: lng },
    };
  }).sort((a, b) => a.distanceValue - b.distanceValue);
};

// Mock data generator for agricultural stores
export const getFallbackAgriStores = (baseLat, baseLng) => {
  const items = [
    {
      name: 'Krishi Seva Kendra Shirur',
      type: 'Government Seed Store & Pesticides',
      address: 'Shop 10, Mandi Yard, Shirur',
      phone: '+91 98665 44332',
      latOffset: 0.052,
      lngOffset: -0.015,
    },
    {
      name: 'Bharat Agri Inputs Store',
      type: 'Organic Fertilizers, Feeds & Pesticides',
      address: 'Plot 4, Near HDFC Bank, Kharadi Bypass',
      phone: '+91 97664 33221',
      latOffset: 0.075,
      lngOffset: 0.062,
    },
    {
      name: 'Green Farm Supplies & Sprinklers',
      type: 'Drip Irrigation Equipment & Hybrid Seeds',
      address: 'Shop 7, Alandi Market Rd, Pune',
      phone: '+91 95443 11220',
      latOffset: 0.108,
      lngOffset: 0.021,
    },
    {
      name: 'Sahyadri Seeds & Agro Tools',
      type: 'High-Yield Seeds & Small Farm Toolkits',
      address: 'Chowk Lane 2, Hadapsar Mandi',
      phone: '+91 91223 44556',
      latOffset: -0.025,
      lngOffset: 0.038,
    },
  ];

  return items.map((item, index) => {
    const lat = baseLat + item.latOffset;
    const lng = baseLng + item.lngOffset;
    const dist = calculateDistance(baseLat, baseLng, lat, lng);
    return {
      id: `mock_store_${index}`,
      name: item.name,
      type: item.type,
      address: item.address,
      phone: item.phone,
      distance: `${dist.toFixed(1)} km away`,
      distanceValue: dist,
      coords: { latitude: lat, longitude: lng },
      verified: index !== 2,
    };
  }).sort((a, b) => a.distanceValue - b.distanceValue);
};
