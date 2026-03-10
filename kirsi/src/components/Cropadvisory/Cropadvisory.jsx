import React from "react";
import "./Cropadvisory.css";
import { FaCamera, FaExclamationTriangle, FaMicrophone } from "react-icons/fa";

const CropAdvisory = () => {
  return (
    <div className="advisory-container">

      <div className="advisory-header">
        <button onClick={() => window.history.back()} className="back-btn">
          ←
        </button>
        <h2>Crop Advisory</h2>
        <p>Identify and solve crop diseases</p>
      </div>

      <div className="location-bar">
        <span>📍 Showing nearby services near Pune</span>
        <button>Change location</button>
      </div>

      
      <div className="options-container">

        <div className="option-card upload">
          <div className="icon-circle green">
            <FaCamera />
          </div>
          <h3>Upload Crop Photo</h3>
          <p>Take a photo of affected leaves or plant</p>
        </div>

        <div className="option-card symptoms">
          <div className="icon-circle yellow">
            <FaExclamationTriangle />
          </div>
          <h3>Select Symptoms</h3>
          <p>Choose from common disease symptoms</p>
        </div>

      </div>

    
      <div className="upload-section">

        <h3>Upload Crop Photo</h3>

        <div className="upload-box">
          <div className="upload-icon">⬆</div>
          <p>Click to upload or drag and drop</p>
          <span>Take a clear photo of affected leaves or plant parts</span>
        </div>

        <button className="analyze-btn">Analyze Photo</button>

      </div>

    

    </div>
  );
};

export default CropAdvisory;