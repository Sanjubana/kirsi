import './Herosec.css'
import { useNavigate } from 'react-router-dom'
import heroImage from '../../assets/crop.jpeg'

const About = () => {
  const navigate = useNavigate()

  return (
    <div className="about-page">
      
    
      <div className="about-header">
        <div className="logo">
          🌱 <span>FarmConnect</span>
        </div>

        <button 
          className="back-btn"
          onClick={() => navigate('/')}
        >
          ← Back to Home
        </button>
      </div>

     
      <div 
        className="hero-section"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="overlay"></div>

        <div className="hero-content">
          <h1>
            Empowering Farmers with <br />
            Smart Technology
          </h1>

          <p>
            Connecting villages with tools, knowledge, and opportunities.
          </p>

          <div className="hero-buttons">
            <button className="join-btn">🌱 Join Us</button>
            <button className="learn-btn">Learn More</button>
          </div>
        </div>
      </div>

     

    </div>
  )
}

export default About