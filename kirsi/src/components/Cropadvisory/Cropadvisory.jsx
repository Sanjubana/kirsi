import React from "react";
import "./Cropadvisory.css";
import { FaCamera, FaExclamationTriangle } from "react-icons/fa";
import { Card, Button, BackButton } from "../ui";

const CropAdvisory = () => {
  return (
    <div className="cropadvisory-page fade-in">
      <div className="cropadvisory-header">
        <BackButton label="Back to Crops" to="/crops" />
        <div className="cropadvisory-title-section">
          <h2>Crop Disease Advisory</h2>
          <p>Identify and treat crop diseases with AI-powered tools and expert guidance</p>
        </div>
      </div>

      <div className="location-bar">
        <div className="location-bar-left">
          <span>📍</span>
          <span>Showing nearby services near <b>Pune</b></span>
        </div>
        <Button variant="text" size="sm" onClick={() => alert('Location selection coming soon!')}>
          Change location
        </Button>
      </div>

      <div className="advisory-options-grid">
        <Card hoverLift className="advisory-option-card">
          <Card.Body className="advisory-option-body">
            <div className="advisory-icon-circle green">
              <FaCamera />
            </div>
            <h3>Upload Crop Photo</h3>
            <p>Take a photo of affected leaves or plant parts for automated analysis</p>
          </Card.Body>
        </Card>

        <Card hoverLift className="advisory-option-card">
          <Card.Body className="advisory-option-body">
            <div className="advisory-icon-circle yellow">
              <FaExclamationTriangle />
            </div>
            <h3>Select Symptoms</h3>
            <p>Choose from a list of common crop disease symptoms for diagnosis</p>
          </Card.Body>
        </Card>
      </div>

      <Card className="upload-section-card">
        <Card.Header className="upload-card-header">
          <h3>📸 Upload Crop Photo for Analysis</h3>
        </Card.Header>
        <Card.Body className="upload-card-body">
          <div
            className="upload-drop-box"
            onClick={() => document.getElementById('crop-photo-input').click()}
          >
            <div className="upload-icon-area">⬆</div>
            <p className="upload-main-text">Click to upload or drag and drop</p>
            <span className="upload-hint">Take a clear photo of affected leaves or plant parts</span>
            <input id="crop-photo-input" type="file" accept="image/*" hidden />
          </div>

          <Button
            variant="primary"
            className="analyze-btn"
            leftIcon={<span>🔬</span>}
            onClick={() => alert('Photo analysis coming soon!')}
          >
            Analyze Photo
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CropAdvisory;