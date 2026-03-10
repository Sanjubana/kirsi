import React, { useState } from "react";
import "./rentalTools.css";
import { FaArrowLeft } from "react-icons/fa";
import { assets } from "../../assets/assets";
const tools = [
  {
    name: "Tractor with Driver",
    price: "₹3500/day",
    distance: "10 km away • Shirur",
    tag: "Used",
    image: assets.tractor,
  },
  {
    name: "Rotavator",
    price: "₹1500/day",
    distance: "14 km away • Kharadi",
    tag: "New",
    image: assets.rotovator1,
  },
  {
    name: "thresher",
    price: "₹5000/day",
    distance: "20 km away • Alandi",
    tag: "Used",
    image: assets.thresher1,
  },
];

export default function RentalTools() {
  return (
    <div className="tools-page">
   
      <div className="tools-header">
        <button className="back-btn" onClick={() => window.history.back()}>
                  <FaArrowLeft />
                </button>

        <h1>Tools & Equipment</h1>
        <p>Rent tools for short-term use</p>
      </div>

    
      <div className="location-bar">
        <span>📍 Showing results near Jaipur within 50 km</span>
        <button className="change-location">Change location</button>
      </div>

    
      <h2 className="section-title">Available for Rent</h2>

    
      <div className="card-grid">
        {tools.map((tool, index) => (
          <div className="tool-card" key={index}>
            <img src={tool.image} alt={tool.name} />

            <div className="tool-body">
              <div className="tool-top">
                <h3>{tool.name}</h3>
                <span className={`tag ${tool.tag.toLowerCase()}`}>
                  {tool.tag}
                </span>
              </div>

              <p className="price">{tool.price}</p>
              <p className="distance">📍 {tool.distance}</p>

              <div className="action-row">
                <button className="call-btn">📞 Call</button>
                <button className="whatsapp-btn">💬 WhatsApp</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
