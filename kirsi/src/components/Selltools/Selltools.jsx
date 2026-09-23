import React, { useState, useEffect } from "react";
import "./Selltools.css";
import { FaCamera, FaStore } from "react-icons/fa";
import { Card, Button, BackButton, Input, Skeleton } from "../ui";
import { useLocationContext } from "../../context/LocationContext";
import { calculateDistance } from "../../utils/mapsHelper";
import LocationBar from "../Location/LocationBar";
import DistanceBadge from "../Location/DistanceBadge";
import MapButton from "../Location/MapButton";
import DirectionsButton from "../Location/DirectionsButton";

const baseToolBuyers = [
  {
    id: "tb_1",
    name: "Maharashtra Agro Industry Dealers",
    location: "Shirur",
    address: "Shirur Bypass Road, Mandi Yard",
    buyerType: "Authorized Dealer",
    interestedIn: "Tractors, Harvesters & Rotavators",
    latOffset: 0.052,
    lngOffset: -0.015,
  },
  {
    id: "tb_2",
    name: "Kharadi Farming Equipment Resellers",
    location: "Kharadi",
    address: "Opposite Shell Fuel Station, Kharadi Bypass",
    buyerType: "Used Machinery Dealer",
    interestedIn: "Ploughs, Seeders, Threshers",
    latOffset: 0.075,
    lngOffset: 0.062,
  },
  {
    id: "tb_3",
    name: "Chakan Farmers Cooperative Society",
    location: "Chakan",
    address: "Cooperative Building, Talegaon Chowk, Chakan",
    buyerType: "Cooperative Buyer",
    interestedIn: "All farm implements & tools",
    latOffset: 0.115,
    lngOffset: -0.068,
  }
];

const SellTools = () => {
  const { coords, cityName } = useLocationContext();
  const [loading, setLoading] = useState(true);
  const [condition, setCondition] = useState("used");
  const [formData, setFormData] = useState({ toolName: '', price: '', contact: '' });
  const [errors, setErrors] = useState({});

  const userLat = coords.latitude || 18.5204;
  const userLng = coords.longitude || 73.8567;

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [coords, cityName]);

  // Process and sort buyers by distance
  const sortedBuyers = baseToolBuyers.map((item) => {
    const lat = userLat + item.latOffset;
    const lng = userLng + item.lngOffset;
    const distanceValue = calculateDistance(userLat, userLng, lat, lng);
    return {
      ...item,
      distanceValue,
      coords: { latitude: lat, longitude: lng }
    };
  }).sort((a, b) => a.distanceValue - b.distanceValue);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.toolName.trim()) newErrors.toolName = 'Tool name is required.';
    if (!formData.price) newErrors.price = 'Price is required.';
    if (!formData.contact.trim()) newErrors.contact = 'Contact number is required.';
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    alert('Your tool has been listed for sale!');
    setFormData({ toolName: '', price: '', contact: '' });
  };

  return (
    <div className="selltools-page fade-in">
      <div className="selltools-header">
        <BackButton label="Back to Tools" to="/tools" />
        <h2>Sell Tools & Equipment</h2>
        <p>List your unused tools and reach thousands of nearby farmers</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-lg)', marginTop: 'var(--space-md)' }}>
        {/* Left column: Posting Form */}
        <Card className="sell-form-card" style={{ height: 'fit-content' }}>
          <Card.Header className="sell-form-card-header">
            <h3>List Your Tool for Sale</h3>
            <p>Fill in the details below to post your tool listing</p>
          </Card.Header>
          <Card.Body className="sell-form-card-body">
            <form onSubmit={handleSubmit} className="sell-form">
              <div className="photo-upload-section">
                <label className="photo-upload-label">Upload Photos (Max 4)</label>
                <div className="photo-grid">
                  {[1, 2, 3, 4].map((num) => (
                    <label key={num} className="photo-box" htmlFor={`photo-${num}`}>
                      <FaCamera className="camera-icon" />
                      <span>Photo {num}</span>
                      <input id={`photo-${num}`} type="file" accept="image/*" hidden />
                    </label>
                  ))}
                </div>
              </div>

              <Input
                label="Tool Name *"
                name="toolName"
                placeholder="e.g., Mahindra Tractor, Rotavator"
                value={formData.toolName}
                onChange={handleChange}
                error={errors.toolName}
              />

              <Input
                label="Price (₹) *"
                name="price"
                type="number"
                placeholder="e.g., 50000"
                value={formData.price}
                onChange={handleChange}
                error={errors.price}
                leftIcon={<span>₹</span>}
              />

              <div className="condition-section">
                <label className="condition-label">Condition *</label>
                <div className="condition-options">
                  <label className={`condition-chip ${condition === 'new' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      value="new"
                      checked={condition === "new"}
                      onChange={() => setCondition("new")}
                      hidden
                    />
                    ✨ New
                  </label>
                  <label className={`condition-chip ${condition === 'used' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      value="used"
                      checked={condition === "used"}
                      onChange={() => setCondition("used")}
                      hidden
                    />
                    🔩 Used
                  </label>
                </div>
              </div>

              <Input
                label="Your Location"
                value={cityName}
                disabled
                helperText="Your current location will be shown to buyers."
                leftIcon={<span>📍</span>}
              />

              <Input
                label="Contact Number *"
                name="contact"
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                value={formData.contact}
                onChange={handleChange}
                error={errors.contact}
                leftIcon={<span>📞</span>}
              />

              <Button type="submit" variant="primary" className="sell-submit-btn" style={{ width: '100%' }}>
                Post for Sale
              </Button>
            </form>
          </Card.Body>
        </Card>

        {/* Right column: Location bar & nearby stores/buyers */}
        <div>
          {/* Location Bar */}
          <LocationBar />

          <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: 'var(--space-md)', color: 'var(--color-primary-dark)' }}>
            💼 Nearby Tool Buyers & Shops
          </h3>

          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <Skeleton type="provider" count={3} />
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              {sortedBuyers.map((buyer) => (
                <Card key={buyer.id} hoverLift>
                  <Card.Body className="provider-card-body" style={{ padding: 'var(--space-md)' }}>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <div className="provider-card-avatar shop" style={{ width: '42px', height: '42px', fontSize: '1.1rem', flexShrink: 0 }}>
                        <FaStore />
                      </div>
                      <div style={{ flexGrow: 1 }}>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--color-text-main)' }}>{buyer.name}</h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: '600', marginTop: '2px' }}>
                          🔧 Interested in: {buyer.interestedIn}
                        </p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                          Type: <strong>{buyer.buyerType}</strong>
                        </p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', marginTop: '4px' }}>
                          🏠 Address: {buyer.address}
                        </p>

                        <div style={{ marginTop: '6px' }}>
                          <DistanceBadge distance={buyer.distanceValue} locationName={buyer.location} />
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: 'var(--space-sm)', display: 'flex', gap: '8px' }}>
                      <Button
                        variant="primary"
                        size="sm"
                        style={{ flexGrow: 2 }}
                        onClick={() => alert(`Sending inventory list to ${buyer.name}...`)}
                      >
                        Contact Store
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
};

export default SellTools;
