import React, { useState } from "react";
import "./SellTools.css";
import { FaMapMarkerAlt, FaCamera , FaArrowLeft } from "react-icons/fa";

const SellTools = () => {
  const [condition, setCondition] = useState("used");

  return (
    <div className="sell-container">

     
      <div className="page-header">
        
        <button className="back-btn" onClick={() => window.history.back()}>
          <FaArrowLeft />
        </button>
        
        <h1>Tools & Equipment</h1>  
        <p>Sell your tools to nearby farmers</p>
      </div>

     
      <div className="location-bar">
        <div>
          <FaMapMarkerAlt /> 
          <span> Showing results near <b>Pune</b> Within 50 km</span>
        </div>
        <button className="change-location">Change location</button>
      </div>

      
      <div className="form-card">
        <h2>Sell Your Tools</h2>
        <p className="form-subtitle">
          Fill in the details below to list your tool for sale
        </p>

      
        <div className="form-group">
          <label>Upload Photos (Max 4)</label>
          <div className="photo-grid">
            {[1,2,3,4].map((num) => (
              <div key={num} className="photo-box">
                <FaCamera />
                <span>Photo {num}</span>
                <input type="file" />
              </div>
            ))}
          </div>
        </div>

       
        <div className="form-group">
          <label>Tool Name</label>
          <input 
            type="text" 
            placeholder="e.g., Mahindra Tractor, Rotavator"
          />
        </div>

      
        <div className="form-group">
          <label>Price (₹)</label>
          <input 
            type="number" 
            placeholder="e.g., 50000"
          />
        </div>

        
        <div className="form-group">
          <label>Condition</label>
          <div className="radio-group">
            <label>
              <input 
                type="radio"
                value="new"
                checked={condition === "new"}
                onChange={() => setCondition("new")}
              />
              New
            </label>

            <label>
              <input 
                type="radio"
                value="used"
                checked={condition === "used"}
                onChange={() => setCondition("used")}
              />
              Used
            </label>
          </div>
        </div>

        
        <div className="form-group">
          <label>Location</label>
          <input type="text" value="Pune" readOnly />
          <small>Your current location will be shown to buyers</small>
        </div>

       
        <div className="form-group">
          <label>Contact Number</label>
          <input 
            type="tel" 
            placeholder="+91 XXXXX XXXXX"
          />
        </div>

        
        <button className="submit-btn">
          Post for Sale
        </button>
      </div>
    </div>
  );
};

export default SellTools;
