import "./Cropshops.css";
import { FaArrowLeft, FaMapMarkerAlt, FaPhoneAlt, FaStore } from "react-icons/fa";

const advisors = [
  {
    name: "Krishi Seva Kendra Shirur",
    type: "Seeds, Fertilizer, Pesticides",
    distance: "8 km away • Shirur",
    verified: true,
  },
  {
    name: "Bharat Agri Store",
    type: "All Agriculture Products",
    distance: "12 km away • Kharadi",
    verified: true,
  },
  {
    name: "Green Farm Suppliers",
    type: "Organic Fertilizers & Seeds",
    distance: "15 km away • Alandi",
    verified: false,
  },
  {
    name: "Sahyadri Seeds & Chemicals",
    type: "Seeds & Pesticides",
    distance: "20 km away • Hadapsar",
    verified: true,
  },
];

export default function Cropshops() {
  return (
    <div className="advisor-page">
  
      <div className="advisor-header">
        <FaArrowLeft className="back-icon" />
        <div>
          <h1>Crop Advisory</h1>
          <p>Find trusted agriculture shops</p>
        </div>
      </div>

     
      <div className="location-bar">
        <div>
          <FaMapMarkerAlt /> Showing nearby services near <b>Pune</b> within 50 km
        </div>
        <span className="change-location">Change location</span>
      </div>

      
      <div className="advisor-title">
        <h2>Nearby Agriculture Shops</h2>
        <p>Find trusted Krishi Seva Kendras and agri shops near you</p>
      </div>

      <div className="advisor-grid">
        {advisors.map((item, index) => (
          <div className="advisor-card" key={index}>
            <div className="card-top">
              <div className="avatar yellow">
                <FaStore />
              </div>

              <div className="info">
                <h3>{item.name}</h3>
                <p className="type">{item.type}</p>
              </div>

              {item.verified && (
                <span className="status verified">✔ Verified</span>
              )}
            </div>

            <div className="distance">
              <FaMapMarkerAlt /> {item.distance}
            </div>

            <button className="call-btn">
              <FaPhoneAlt /> Call Shop
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
