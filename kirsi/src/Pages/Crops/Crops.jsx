// import React from 'react'
import './Crops.css'
import { useNavigate } from 'react-router-dom'

const Crops = () => {
  const navigate = useNavigate()
  return (
    <div className="crops-page">
        <div className="crops-header">
          <span className="back-arrow" onClick={() => navigate(-1)}>←</span>
          <h2>Crop Advisory & Services</h2>
          <p>Choose a service below</p>
        </div>
        <div className="crops-grid">
          
            <div className="crop-card" onClick={() => navigate('/Cropadvisory')}>
              <div className="icon disease">⚠️</div>
              <h3>Crop Disease Help</h3>
              <p>Identify and treat crop diseases with expert guidance</p>
            </div>
            <div className="crop-card" onClick={() => navigate('/experts')}>
                <div className="icon expert">👩‍🌾</div>
                <h3>Talk to Experts</h3>
                <p> Call crop advisor or experts</p>
                </div>
                <div className="crop-card" onClick={() => navigate('/Cropshops')}>
                    <div className="icon shop">🏪</div>
                    <h3>Nearby Agri Shops</h3>
                    <p>Find nearby shops for seeds, fertilizers, pesticides and more</p>
                </div>
                <div className="crop-card" onClick={() => navigate('/crop-info')}>
            <div className="icon info">📚</div>
            <h3>Crop Information</h3>
            <p>Best practice , fertilizer & growth stages</p>

          </div>
        </div>
    </div>
  )

}
export default Crops
