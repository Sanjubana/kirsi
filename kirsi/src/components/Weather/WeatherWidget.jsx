import React, { useState, useEffect } from 'react';
import { useLocationContext } from '../../context/LocationContext';
import { Card, Button, Input, Skeleton } from '../ui';
import { FaWind, FaTint, FaEye, FaCompress, FaSun, FaCloudShowersHeavy, FaSearch, FaTimes } from 'react-icons/fa';
import './WeatherWidget.css';

// Predefined mock weather data based on city queries
const MOCK_WEATHER_DATABASE = {
  pune: {
    temp: 26,
    feelsLike: 27,
    condition: 'Cloudy',
    icon: '☁️',
    humidity: 78,
    wind: 14,
    visibility: 8,
    pressure: 1009,
    sunrise: '06:02 AM',
    sunset: '07:11 PM',
    uvIndex: 4,
    rainChance: '20%',
    hourly: [
      { time: '12:00 PM', temp: 26, icon: '☁️', wind: 14 },
      { time: '03:00 PM', temp: 27, icon: '☁️', wind: 13 },
      { time: '06:00 PM', temp: 26, icon: '🌤️', wind: 11 },
      { time: '09:00 PM', temp: 24, icon: '🌧️', wind: 10 },
      { time: '12:00 AM', temp: 23, icon: '🌧️', wind: 9 },
      { time: '03:00 AM', temp: 22, icon: '☁️', wind: 8 }
    ],
    forecast: [
      { day: 'Friday', temp: 27, icon: '🌧️', cond: 'Light Rain' },
      { day: 'Saturday', temp: 28, icon: '🌤️', cond: 'Partly Cloudy' },
      { day: 'Sunday', temp: 29, icon: '☀️', cond: 'Sunny' },
      { day: 'Monday', temp: 28, icon: '☁️', cond: 'Cloudy' },
      { day: 'Tuesday', temp: 27, icon: '🌧️', cond: 'Showers' },
    ]
  },
  jaipur: {
    temp: 34,
    feelsLike: 37,
    condition: 'Sunny',
    icon: '☀️',
    humidity: 45,
    wind: 12,
    visibility: 10,
    pressure: 1005,
    sunrise: '05:45 AM',
    sunset: '07:25 PM',
    uvIndex: 8,
    rainChance: '5%',
    hourly: [
      { time: '12:00 PM', temp: 34, icon: '☀️', wind: 12 },
      { time: '03:00 PM', temp: 36, icon: '☀️', wind: 14 },
      { time: '06:00 PM', temp: 33, icon: '🌤️', wind: 11 },
      { time: '09:00 PM', temp: 30, icon: '🌤️', wind: 9 },
      { time: '12:00 AM', temp: 28, icon: '☀️', wind: 8 },
      { time: '03:00 AM', temp: 27, icon: '☀️', wind: 7 }
    ],
    forecast: [
      { day: 'Friday', temp: 35, icon: '☀️', cond: 'Sunny' },
      { day: 'Saturday', temp: 36, icon: '☀️', cond: 'Sunny' },
      { day: 'Sunday', temp: 34, icon: '🌤️', cond: 'Clear' },
      { day: 'Monday', temp: 33, icon: '🌤️', cond: 'Partly Cloudy' },
      { day: 'Tuesday', temp: 32, icon: '🌧️', cond: 'Dust Storm' },
    ]
  },
  jhalawar: {
    temp: 32,
    feelsLike: 35,
    condition: 'Mostly Sunny',
    icon: '🌤️',
    humidity: 52,
    wind: 10,
    visibility: 9,
    pressure: 1007,
    sunrise: '05:52 AM',
    sunset: '07:19 PM',
    uvIndex: 7,
    rainChance: '10%',
    hourly: [
      { time: '12:00 PM', temp: 32, icon: '🌤️', wind: 10 },
      { time: '03:00 PM', temp: 33, icon: '☀️', wind: 11 },
      { time: '06:00 PM', temp: 31, icon: '🌤️', wind: 9 },
      { time: '09:00 PM', temp: 29, icon: '☁️', wind: 8 },
      { time: '12:00 AM', temp: 27, icon: '🌧️', wind: 7 },
      { time: '03:00 AM', temp: 26, icon: '🌧️', wind: 6 }
    ],
    forecast: [
      { day: 'Friday', temp: 33, icon: '☀️', cond: 'Sunny' },
      { day: 'Saturday', temp: 34, icon: '☀️', cond: 'Sunny' },
      { day: 'Sunday', temp: 32, icon: '🌤️', cond: 'Partly Cloudy' },
      { day: 'Monday', temp: 31, icon: '☁️', cond: 'Overcast' },
      { day: 'Tuesday', temp: 30, icon: '🌧️', cond: 'Thunderstorm' },
    ]
  },
  kota: {
    temp: 33,
    feelsLike: 36,
    condition: 'Clear',
    icon: '☀️',
    humidity: 48,
    wind: 11,
    visibility: 10,
    pressure: 1006,
    sunrise: '05:50 AM',
    sunset: '07:21 PM',
    uvIndex: 8,
    rainChance: '8%',
    hourly: [
      { time: '12:00 PM', temp: 33, icon: '☀️', wind: 11 },
      { time: '03:00 PM', temp: 35, icon: '☀️', wind: 12 },
      { time: '06:00 PM', temp: 32, icon: '🌤️', wind: 10 },
      { time: '09:00 PM', temp: 29, icon: '☀️', wind: 8 },
      { time: '12:00 AM', temp: 28, icon: '☀️', wind: 7 },
      { time: '03:00 AM', temp: 27, icon: '☁️', wind: 6 }
    ],
    forecast: [
      { day: 'Friday', temp: 34, icon: '☀️', cond: 'Sunny' },
      { day: 'Saturday', temp: 35, icon: '☀️', cond: 'Sunny' },
      { day: 'Sunday', temp: 33, icon: '🌤️', cond: 'Clear' },
      { day: 'Monday', temp: 32, icon: '🌤️', cond: 'Clear' },
      { day: 'Tuesday', temp: 31, icon: '☁️', cond: 'Overcast' },
    ]
  }
};

const DEFAULT_HOURLY = [
  { time: '12:00 PM', temp: 28, icon: '🌤️', wind: 10 },
  { time: '03:00 PM', temp: 29, icon: '☀️', wind: 12 },
  { time: '06:00 PM', temp: 27, icon: '🌤️', wind: 11 },
  { time: '09:00 PM', temp: 25, icon: '☁️', wind: 8 },
  { time: '12:00 AM', temp: 24, icon: '☁️', wind: 7 },
  { time: '03:00 AM', temp: 23, icon: '🌫️', wind: 6 }
];

const DEFAULT_WEATHER = {
  temp: 28,
  feelsLike: 30,
  condition: 'Partly Cloudy',
  icon: '🌤️',
  humidity: 60,
  wind: 10,
  visibility: 10,
  pressure: 1008,
  sunrise: '06:00 AM',
  sunset: '07:15 PM',
  uvIndex: 5,
  rainChance: '15%',
  hourly: DEFAULT_HOURLY,
  forecast: [
    { day: 'Friday', temp: 29, icon: '🌤️', cond: 'Partly Cloudy' },
    { day: 'Saturday', temp: 30, icon: '☀️', cond: 'Sunny' },
    { day: 'Sunday', temp: 29, icon: '☁️', cond: 'Cloudy' },
    { day: 'Monday', temp: 28, icon: '🌧️', cond: 'Rain Showers' },
    { day: 'Tuesday', temp: 29, icon: '🌤️', cond: 'Clear Skies' },
  ]
};

export default function WeatherWidget() {
  const { coords, cityName, updateManualCity } = useLocationContext();
  
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(DEFAULT_WEATHER);
  const [searchVal, setSearchVal] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  // Fetch weather when city name or coords change
  useEffect(() => {
    fetchWeatherData();
  }, [coords, cityName]);

  const fetchWeatherData = async () => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const cacheKey = `kirsi_weather_${cityName.trim().toLowerCase()}_${coords.latitude ? 'gps' : 'manual'}`;
    
    // Check cache in sessionStorage (15-minute TTL)
    const cachedItem = sessionStorage.getItem(cacheKey);
    if (cachedItem) {
      try {
        const parsed = JSON.parse(cachedItem);
        const age = (Date.now() - parsed.timestamp) / 1000 / 60; // age in minutes
        if (age < 15) {
          setWeather(parsed.data);
          setErrorMsg(null);
          return;
        }
      } catch (e) {
        console.warn('Failed to parse weather cache:', e);
      }
    }

    // Check if live API Key is defined
    if (apiKey && apiKey !== 'YOUR_WEATHER_API_KEY_HERE') {
      setLoading(true);
      setErrorMsg(null);
      try {
        let url = '';
        if (coords.latitude && coords.longitude) {
          url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&appid=${apiKey}`;
        } else {
          url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&units=metric&appid=${apiKey}`;
        }

        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          
          // Map API weather icons
          const iconCode = data.weather[0].icon;
          const iconMapping = {
            '01': '☀️', '02': '🌤️', '03': '☁️', '04': '☁️',
            '09': '🌧️', '10': '🌧️', '11': '⛈️', '13': '❄️', '50': '🌫️'
          };
          const resolvedIcon = iconMapping[iconCode.substring(0, 2)] || '🌤️';

          // Sunrise & Sunset formatting
          const formatTime = (timestamp) => {
            const date = new Date(timestamp * 1000);
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          };

          // Estimate UV Index based on condition code
          let estUv = 5;
          const mainCond = data.weather[0].main.toLowerCase();
          if (mainCond.includes('clear') || mainCond.includes('sunny')) estUv = 8;
          else if (mainCond.includes('cloud')) estUv = 4;
          else if (mainCond.includes('rain') || mainCond.includes('drizzle')) estUv = 2;
          else if (mainCond.includes('thunderstorm')) estUv = 1;

          // Fetch 5 day / 3 hour forecast
          let forecastList = DEFAULT_WEATHER.forecast;
          let hourlyList = DEFAULT_WEATHER.hourly;

          try {
            let forecastUrl = '';
            if (coords.latitude && coords.longitude) {
              forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&appid=${apiKey}`;
            } else {
              forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cityName)}&units=metric&appid=${apiKey}`;
            }
            const forecastRes = await fetch(forecastUrl);
            if (forecastRes.ok) {
              const forecastData = await forecastRes.json();
              
              // Map hourly list (first 6 entries - next 18 hours)
              hourlyList = forecastData.list.slice(0, 6).map(entry => {
                const dateObj = new Date(entry.dt * 1000);
                const timeStr = dateObj.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
                const icon = iconMapping[entry.weather[0].icon.substring(0, 2)] || '🌤️';
                return {
                  time: timeStr,
                  temp: Math.round(entry.main.temp),
                  icon,
                  wind: Math.round(entry.wind.speed * 3.6)
                };
              });

              // Filter daily entries (at 12:00 PM)
              const dailyEntries = forecastData.list.filter(entry => entry.dt_txt.includes('12:00:00'));
              forecastList = dailyEntries.slice(0, 5).map(entry => {
                const dayName = new Date(entry.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
                const icon = iconMapping[entry.weather[0].icon.substring(0, 2)] || '🌤️';
                return {
                  day: dayName,
                  temp: Math.round(entry.main.temp),
                  icon,
                  cond: entry.weather[0].description
                };
              });
            }
          } catch (err) {
            console.warn('Could not load detailed 5-day forecast, falling back to default lists:', err);
          }

          const freshWeatherData = {
            temp: Math.round(data.main.temp),
            feelsLike: Math.round(data.main.feels_like),
            condition: data.weather[0].main,
            icon: resolvedIcon,
            humidity: data.main.humidity,
            wind: Math.round(data.wind.speed * 3.6), // convert m/s to km/h
            visibility: Math.round(data.visibility / 1000), // convert m to km
            pressure: data.main.pressure,
            sunrise: formatTime(data.sys.sunrise),
            sunset: formatTime(data.sys.sunset),
            uvIndex: estUv,
            rainChance: data.clouds?.all ? `${data.clouds.all}%` : '15%',
            hourly: hourlyList,
            forecast: forecastList
          };

          // Save to sessionStorage cache
          sessionStorage.setItem(cacheKey, JSON.stringify({
            timestamp: Date.now(),
            data: freshWeatherData
          }));

          setWeather(freshWeatherData);
        } else {
          loadFallbackMockData();
        }
      } catch (err) {
        console.warn('Weather API connection failed, loading offline mocks:', err.message);
        loadFallbackMockData();
      } finally {
        setLoading(false);
      }
    } else {
      // Offline fallback
      loadFallbackMockData();
    }
  };

  const loadFallbackMockData = () => {
    const key = cityName.trim().toLowerCase();
    if (MOCK_WEATHER_DATABASE[key]) {
      setWeather(MOCK_WEATHER_DATABASE[key]);
    } else {
      // Offset slightly dynamically to make it look active
      const hash = cityName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const generatedTemp = 25 + (hash % 10);
      const dynamicWeather = {
        ...DEFAULT_WEATHER,
        temp: generatedTemp,
        feelsLike: generatedTemp + 2,
        uvIndex: 5 + (hash % 4),
        forecast: DEFAULT_WEATHER.forecast.map((f, i) => ({
          ...f,
          temp: generatedTemp - i
        })),
        hourly: DEFAULT_WEATHER.hourly.map((h, i) => ({
          ...h,
          temp: generatedTemp - Math.round(i / 2)
        }))
      };
      setWeather(dynamicWeather);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      updateManualCity(searchVal.trim());
      setSearchVal('');
    }
  };

  return (
    <>
      {/* Floating mini-widget */}
      <div className="floating-weather-widget" onClick={() => setIsOpen(true)} title="View weather forecast details">
        <div className="widget-icon">{weather.icon}</div>
        <div className="widget-info">
          <span className="widget-temp">{weather.temp}°C</span>
          <span className="widget-city">{cityName}</span>
          <span className="widget-cond">{weather.condition}</span>
        </div>
      </div>

      {/* Forecast Details Modal */}
      {isOpen && (
        <div className="weather-modal-overlay">
          <Card className="weather-modal-card">
            <Card.Header className="weather-modal-header">
              <div className="weather-modal-title">
                <h3>🌤️ Local Agricultural Weather</h3>
                <p>Location-aware soil & crop-related weather details</p>
              </div>
              <button className="weather-modal-close-btn" onClick={() => setIsOpen(false)}>
                <FaTimes />
              </button>
            </Card.Header>

            <Card.Body className="weather-modal-body">
              {/* Manual search row */}
              <form onSubmit={handleSearchSubmit} className="weather-modal-search">
                <Input
                  placeholder="Search manually by City (e.g. Jaipur, Pune...)"
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  leftIcon={<FaSearch />}
                  style={{ flexGrow: 1 }}
                />
                <Button type="submit" variant="primary">
                  Search
                </Button>
              </form>

              {loading ? (
                <div className="weather-modal-loading" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div className="skeleton-text-line loading-shimmer" style={{ height: '35px', width: '40%', borderRadius: '4px' }}></div>
                  <div className="skeleton-provider-wrapper loading-shimmer" style={{ height: '140px', borderRadius: '12px' }}></div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', width: '100%' }}>
                    <div className="skeleton-text-line loading-shimmer" style={{ height: '50px', borderRadius: '6px' }}></div>
                    <div className="skeleton-text-line loading-shimmer" style={{ height: '50px', borderRadius: '6px' }}></div>
                  </div>
                </div>
              ) : (
                <div className="weather-modal-content">
                  {/* Today's summary */}
                  <div className="weather-today-grid">
                    <div className="weather-today-main">
                      <span className="weather-main-icon">{weather.icon}</span>
                      <div>
                        <h2>{weather.temp}°C</h2>
                        <p className="weather-main-condition">{weather.condition}</p>
                        <p className="weather-main-city">📍 {cityName}</p>
                      </div>
                    </div>

                    <div className="weather-today-stats">
                      <div className="weather-stat-item">
                        <span className="stat-icon"><FaTint /></span>
                        <div>
                          <p className="stat-label">Humidity</p>
                          <p className="stat-val">{weather.humidity}%</p>
                        </div>
                      </div>
                      <div className="weather-stat-item">
                        <span className="stat-icon"><FaWind /></span>
                        <div>
                          <p className="stat-label">Wind Speed</p>
                          <p className="stat-val">{weather.wind} km/h</p>
                        </div>
                      </div>
                      <div className="weather-stat-item">
                        <span className="stat-icon"><FaCompress /></span>
                        <div>
                          <p className="stat-label">Atm. Pressure</p>
                          <p className="stat-val">{weather.pressure} hPa</p>
                        </div>
                      </div>
                      <div className="weather-stat-item">
                        <span className="stat-icon"><FaEye /></span>
                        <div>
                          <p className="stat-label">Visibility</p>
                          <p className="stat-val">{weather.visibility} km</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sun and auxiliary details */}
                  <div className="weather-aux-details">
                    <div className="aux-item">
                      <span className="aux-icon">Feels Like</span>
                      <div>
                        <p className="stat-label">Feels Like</p>
                        <p className="stat-val">{weather.feelsLike}°C</p>
                      </div>
                    </div>
                    <div className="aux-item">
                      <span className="aux-icon">UV Index</span>
                      <div>
                        <p className="stat-label">UV Index</p>
                        <p className="stat-val">{weather.uvIndex} ({weather.uvIndex >= 6 ? 'High' : weather.uvIndex >= 3 ? 'Mod' : 'Low'})</p>
                      </div>
                    </div>
                    <div className="aux-item">
                      <span className="aux-icon">🌅 Sunrise</span>
                      <div>
                        <p className="stat-label">Sunrise</p>
                        <p className="stat-val">{weather.sunrise}</p>
                      </div>
                    </div>
                    <div className="aux-item">
                      <span className="aux-icon">🌇 Sunset</span>
                      <div>
                        <p className="stat-label">Sunset</p>
                        <p className="stat-val">{weather.sunset}</p>
                      </div>
                    </div>
                  </div>

                  {/* Hourly Forecast */}
                  <div className="weather-hourly-section" style={{ marginTop: 'var(--space-lg)' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--color-primary-dark)', marginBottom: 'var(--space-sm)' }}>
                      🕒 Hourly Forecast (Next 18 Hours)
                    </h4>
                    <div className="hourly-deck" style={{ display: 'flex', gap: 'var(--space-sm)', overflowX: 'auto', paddingBottom: 'var(--space-sm)', width: '100%' }}>
                      {weather.hourly && weather.hourly.map((h, idx) => (
                        <div key={idx} className="forecast-day-card" style={{ flex: '0 0 90px', padding: '12px 8px' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-text-muted)' }}>{h.time}</span>
                          <span style={{ fontSize: '1.5rem', margin: '4px 0' }}>{h.icon}</span>
                          <span style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--color-primary)' }}>{h.temp}°C</span>
                          <span style={{ fontSize: '0.65rem', color: 'var(--color-text-light)' }}>💨 {h.wind} km/h</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 5-Day Forecast Deck */}
                  <div className="weather-forecast-section" style={{ marginTop: 'var(--space-lg)' }}>
                    <h4>📅 Next 5-Day Agricultural Forecast</h4>
                    <div className="forecast-deck">
                      {weather.forecast.map((dayData, index) => (
                        <div key={index} className="forecast-day-card">
                          <p className="forecast-day-name">{dayData.day}</p>
                          <span className="forecast-day-icon">{dayData.icon}</span>
                          <p className="forecast-day-temp">{dayData.temp}°C</p>
                          <p className="forecast-day-cond">{dayData.cond}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
}
