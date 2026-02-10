import './Animal.css'
import { useNavigate } from 'react-router-dom'

const Animal = () => {
  const navigate = useNavigate()

  return (
    <div className="animal-page">
      <div className="animal-header">
        <span className="back-arrow" onClick={() => navigate(-1)}>←</span>
        <div>
          <h2>Animal Care & Services</h2>
          <p>Choose a service below</p>
        </div>
      </div>

      <div className="animal-grid">
        <div className="animal-card" onClick={() => navigate('/animal-health')}>
          <div className="icon health">❤</div>
          <h3>Animal Health & Care</h3>
          <p>Basic care, feeding, and health tips</p>
        </div>

        <div className="animal-card" onClick={() => navigate('/animal-disease')}>
          <div className="icon disease">⚠</div>
          <h3>Animal Disease Help</h3>
          <p>Identify animal diseases and solutions</p>
        </div>

        <div className="animal-card" onClick={() => navigate('/nearby-vets')}>
          <div className="icon vet">🩺</div>
          <h3>Nearby Vets & Doctors</h3>
          <p>Find veterinarians near you</p>
        </div>

        <div className="animal-card" onClick={() => navigate('/buy-sell-animals')}>
          <div className="icon trade">🐄</div>
          <h3>Buy / Sell Animals</h3>
          <p>Buy or sell livestock easily</p>
        </div>
      </div>
    </div>
  )
}

export default Animal