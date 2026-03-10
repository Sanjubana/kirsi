import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaLocationDot, FaScrewdriverWrench, FaCircleCheck, FaTractor, FaPhone } from "react-icons/fa6";
import "./Mechanic.css";

const mechanics = [
  {
    id: 1,
    name: "Suresh Patil",
    specialty: "Tractor & Heavy Equipment",
    experience: "15 years",
    distance: "8 km away",
    location: "Shirur",
    available: true,
  },
  {
    id: 2,
    name: "Ramesh Kumar",
    specialty: "All Farm Equipment",
    experience: "10 years",
    distance: "12 km away",
    location: "Kharadi",
    available: true,
  },
  {
    id: 3,
    name: "Vijay Deshmukh",
    specialty: "Water Pump Specialist",
    experience: "8 years",
    distance: "5 km away",
    location: "Hadapsar",
    available: false,
  },
];

export default function MechanicServices() {
  const navigate = useNavigate();
  
  return (
    <div className="mechanic-page">
   
      <div className="page-header">
      <button className="back-btn" onClick={() => window.history.back()}>
                <FaArrowLeft />
              </button>
        <div>
          <h1>Tools & Equipment</h1>
          <p>Find mechanics near you</p>
        </div>
      </div>

      <div className="location-banner">
        <div>
          <FaLocationDot />
          Showing results near <strong>Pune</strong> within 50 km
        </div>
        <span className="change-location">Change location</span>
      </div>

      <div className="section-header">
        <div>
          <h2>Mechanic Services</h2>
          <p>Find trusted mechanics near you</p>
        </div>
        <button className="register-btn" onClick={() => navigate('/register-mechanic')}>
          <FaScrewdriverWrench />
          Register as Mechanic
        </button>
      </div>

      
      <div className="card-grid">
        {mechanics.map((mechanic) => (
          <div key={mechanic.id} className="mechanic-card">
            <div className="card-top">
              <div className="avatar">
                {mechanic.name.charAt(0)}
              </div>

              {mechanic.available && (
                <span className="available-badge">
                  <FaCircleCheck />
                  Available Now
                </span>
              )}
            </div>

            <h3>{mechanic.name}</h3>
            <p className="specialty">
              <FaTractor />
              {mechanic.specialty}
            </p>
            <p className="experience">
              Experience: {mechanic.experience}
            </p>
            <p className="distance">
              <FaLocationDot />
              {mechanic.distance} • {mechanic.location}
            </p>

            <button className="call-btn">
              <FaPhone />
              Call Mechanic
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
