import React from "react";
import "./Buytools.css";
import { assets } from "../../assets/assets";
import { FaArrowLeft } from "react-icons/fa";

const tools = [
  {
    name: "Mahindra Panja",
    price: "₹35,000",
    status: "Used",
    distance: "12 km away",
    location: "Shirur",
    image: assets.panja
  },
  {
    name: "Rotavator 7 Feet",
    price: "₹45,000",
    status: "New",
    distance: "8 km away",
    location: "Kharadi",
    image: assets.rotovator1
  },
  {
    name: "Rotovator 5 Feet",
    price: "₹35,000",
    status: "Used",
    distance: "18 km away",
    location: "Alandi",
    image: assets.rotovator2
  },
  {
    name: "Sowing Machine",
    price: "₹50,000",
    status: "New",
    distance: "25 km away",
    location: "Hadapsar",
    image: assets.sowingmachine1
  },
  {
    name: "Thresher ",
    price: "₹1,12,000",
    status: "Used",
    distance: "15 km away",
    location: "Chakan",
    image: assets.thresher1
  },
  {
    name: "Thresher",
    price: "₹1,58,000",
    status: "New",
    distance: "22 km away",
    location: "Baramati",
    image: assets.thresher2
  }
  
];

function BuyTools() {
  return (
    <div className="buytools-page">
        <div className="buytools-header">
            <button className="back-btn" onClick={() => window.history.back()}>
                <FaArrowLeft />
            </button>
            
       <h2 className="section-title">Buy Tools</h2>

      
 </div>
      <div className="tools-grid">

        {tools.map((tool, index) => (
          <div className="tool-card" key={index}>

            <img src={tool.image} alt="" className="tool-img" />

            <div className="tool-info">

              <div className="tool-header">
                <h3>{tool.name}</h3>

                <span className={`badge ${tool.status}`}>
                  {tool.status}
                </span>
              </div>

              <h2 className="price">{tool.price}</h2>

              <p className="location">
                📍 {tool.distance} • {tool.location}
              </p>

              <div className="btn-group">
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

export default BuyTools;