import React, { createContext, useState, useEffect, useContext } from 'react';

const LocationContext = createContext(null);

const CITY_COORDINATES = {
  jaipur: { latitude: 26.9124, longitude: 75.7873 },
  pune: { latitude: 18.5204, longitude: 73.8567 },
  jhalawar: { latitude: 24.5973, longitude: 76.1610 },
  kota: { latitude: 25.1825, longitude: 75.8396 },
  udaipur: { latitude: 24.5854, longitude: 73.7125 },
  delhi: { latitude: 28.6139, longitude: 77.2090 },
  mumbai: { latitude: 19.0760, longitude: 72.8777 },
  shirur: { latitude: 18.8268, longitude: 74.3768 },
  kharadi: { latitude: 18.5510, longitude: 73.9377 },
  alandi: { latitude: 18.6749, longitude: 73.8967 },
  hadapsar: { latitude: 18.5089, longitude: 73.9259 },
  chakan: { latitude: 18.7562, longitude: 73.8540 },
  baramati: { latitude: 18.1506, longitude: 74.5779 },
};

export const LocationContextProvider = ({ children }) => {
  const [coords, setCoords] = useState({ latitude: null, longitude: null });
  const [cityName, setCityName] = useState('Pune');
  const [locationStatus, setLocationStatus] = useState('prompt'); // 'prompt', 'granted', 'denied'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize location on mount
  useEffect(() => {
    // Check if we have a manually stored city in localStorage
    const savedCity = localStorage.getItem('kirsi_manual_city');
    if (savedCity) {
      setCityName(savedCity);
      const normalizedCity = savedCity.trim().toLowerCase();
      if (CITY_COORDINATES[normalizedCity]) {
        setCoords(CITY_COORDINATES[normalizedCity]);
      } else {
        setCoords(CITY_COORDINATES['pune']); // Fallback coords
      }
      setLocationStatus('denied'); // treat manual as fallback denied status
      setLoading(false);
    } else {
      // Try to ask for browser location automatically
      requestBrowserLocation(true); // silent first check
    }
  }, []);

  const requestBrowserLocation = (isSilent = false) => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ latitude, longitude });
        setLocationStatus('granted');
        setError(null);
        
        // Reverse geocode latitude and longitude to get City Name
        try {
          const fetchedCity = await reverseGeocode(latitude, longitude);
          if (fetchedCity) {
            setCityName(fetchedCity);
            localStorage.setItem('kirsi_manual_city', fetchedCity);
          }
        } catch (err) {
          console.error('Failed to geocode location:', err);
        }
        setLoading(false);
      },
      (err) => {
        console.warn('Geolocation permission denied or failed:', err.message);
        setLocationStatus('denied');
        if (!isSilent) {
          setError('Location access denied. Please select your city manually below.');
        }
        
        // Use Pune coordinates as default if nothing is in local storage
        const savedCity = localStorage.getItem('kirsi_manual_city');
        if (!savedCity) {
          setCityName('Pune');
          setCoords(CITY_COORDINATES['pune']);
        }
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  const reverseGeocode = async (lat, lon) => {
    // We can query OpenWeatherMap's Geocoding or standard open API if weather key is loaded.
    // As a bulletproof fallback, let's use the free OpenStreetMap Nominatim API, which does not require an API key!
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`,
        { headers: { 'User-Agent': 'KirsiFarmerPlatform' } }
      );
      if (response.ok) {
        const data = await response.json();
        const city = data.address.city || data.address.town || data.address.village || data.address.state_district;
        return city;
      }
    } catch (e) {
      console.warn('Nominatim reverse geocoding failed, trying OpenWeatherMap...', e);
    }

    // Try OpenWeatherMap Geocoding API if key exists
    const weatherKey = import.meta.env.VITE_WEATHER_API_KEY;
    if (weatherKey && weatherKey !== 'YOUR_WEATHER_API_KEY_HERE') {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${weatherKey}`
        );
        if (response.ok) {
          const data = await response.json();
          if (data && data[0]) {
            return data[0].name;
          }
        }
      } catch (err) {
        console.error('OpenWeather Geocode failed:', err);
      }
    }
    return null;
  };

  const updateManualCity = (city) => {
    if (!city || !city.trim()) return;
    const trimmedCity = city.trim();
    setCityName(trimmedCity);
    localStorage.setItem('kirsi_manual_city', trimmedCity);
    
    // Resolve mock coordinates for the city
    const normalized = trimmedCity.toLowerCase();
    if (CITY_COORDINATES[normalized]) {
      setCoords(CITY_COORDINATES[normalized]);
      setError(null);
    } else {
      // Offset coords slightly around Pune to keep distances realistic
      const hash = trimmedCity.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const latOffset = (hash % 100) / 1000;
      const lonOffset = ((hash * 7) % 100) / 1000;
      setCoords({
        latitude: 18.5204 + latOffset,
        longitude: 73.8567 + lonOffset
      });
      setError(null);
    }
  };

  return (
    <LocationContext.Provider
      value={{
        coords,
        cityName,
        locationStatus,
        loading,
        error,
        requestLocation: () => requestBrowserLocation(false),
        updateManualCity,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocationContext must be used within LocationContextProvider');
  }
  return context;
};
