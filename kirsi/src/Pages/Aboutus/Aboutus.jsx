import React from 'react';
import { useNavigate } from 'react-router-dom';
import farmerImage from '../../assets/farmer.jpeg';
import tractorImage from '../../assets/tractor.jpeg';
import { Button } from '../../components/ui';
import { 
  FaTools, 
  FaLeaf, 
  FaPaw, 
  FaMapMarkerAlt, 
  FaMicrophone, 
  FaPhoneAlt, 
  FaUsers, 
  FaUserPlus 
} from 'react-icons/fa';
import './Aboutus.css';

export default function Aboutus() {
  const navigate = useNavigate();

  return (
    <div className="about-page fade-in">
      {/* Hero Section */}
      <div 
        className="hero-section"
        style={{ backgroundImage: `url('${tractorImage}')` }}
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
            <Button 
              variant="primary" 
              size="lg" 
              className="join-btn"
              onClick={() => navigate('/signup')}
            >
              🌱 Join Us
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="learn-btn"
              onClick={() => navigate('/login')}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="mission-container">
        <div className="mission-content">
          <div className="mission-image">
            <img
              src={farmerImage}
              alt="Farmer"
            />
          </div>

          <div className="mission-text">
            <h1>Our Mission</h1>
            <p className="mission-description">
              Our mission is to simplify farming life by connecting farmers with
              nearby buyers, sellers, mechanics, and agricultural experts. We aim
              to build a digital bridge between rural communities and modern
              solutions.
            </p>

            <div className="feature-list">
              <div className="feature-item">
                <div className="icon"><FaTools /></div>
                <div>
                  <h3>Buy & Sell Farming Tools</h3>
                  <p>Easy marketplace for equipment and tools</p>
                </div>
              </div>

              <div className="feature-item-c">
                <div className="icon"><FaLeaf /></div>
                <div>
                  <h3>Crop Disease Support</h3>
                  <p>Get expert advice and solutions</p>
                </div>
              </div>

              <div className="feature-item-a">
                <div className="icon"><FaPaw /></div>
                <div>
                  <h3>Animal Care Services</h3>
                  <p>Veterinary support management</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="icon"><FaMapMarkerAlt /></div>
                <div>
                  <h3>Nearby Location-Based Services</h3>
                  <p>Find services within 50-100km radius</p>
                </div>
              </div>
            </div>
          </div> 
        </div>
      </div>

      {/* Offers Section */}
      <section className="offer-section">
        <h2 className="offer-heading">What We Offer</h2>

        <div className="offer-cards">
          <div className="offer-card">
            <div className="icon-box">
              <FaTools />
            </div>
            <h3>Tools Marketplace</h3>
            <p>
              Buy, Sell, Rent farming equipment near your location. 
              Connect with sellers and mechanics in your area.
            </p>
          </div>

          <div className="offer-card">
            <div className="icon-box">
              <FaLeaf />
            </div>
            <h3>Crop Advisory</h3>
            <p>
              Get pesticide guidance, crop disease advice & connect 
              with Krishi experts for better yields.
            </p>
          </div>

          <div className="offer-card">
            <div className="icon-box">
              <FaPaw />
            </div>
            <h3>Animal Care</h3>
            <p>
              Animal health services including veterinary support 
              and livestock care management.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-section">
        <h2 className="why-heading">Why Choose Us</h2>

        <div className="why-grid">
          <div className="why-card">
            <div className="why-icon">
              <FaMapMarkerAlt />
            </div>
            <div>
              <h3>Location-Based Services</h3>
              <p>
                Find farmers, mechanics, vets, and services within 50–100km 
                radius of your location.
              </p>
            </div>
          </div>

          <div className="why-card">
            <div className="why-icon">
              <FaMicrophone />
            </div>
            <div>
              <h3>Voice Assistance for Easy Access</h3>
              <p>
                Use voice commands in Hindi or English to navigate 
                and find what you need quickly.
              </p>
            </div>
          </div>

          <div className="why-card">
            <div className="why-icon">
              <FaPhoneAlt />
            </div>
            <div>
              <h3>Direct Call to Experts</h3>
              <p>
                Instantly connect with agricultural advisors, vets, 
                and mechanics via phone.
              </p>
            </div>
          </div>

          <div className="why-card">
            <div className="why-icon">
              <FaUsers />
            </div>
            <div>
              <h3>Trusted Rural Community Network</h3>
              <p>
                Join a growing network of verified farmers, sellers, 
                and service providers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="vision-section">
        <div className="vision-overlay">
          <h2>Building a Stronger Rural Economy</h2>
          <p>
            We believe in empowering farmers through technology. Our vision is
            to make every village digitally connected, informed, and economically
            strong. By bridging the gap between tradition and innovation, we're
            creating opportunities for sustainable growth and prosperity in rural
            communities.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Join Our Growing Farmer Community Today</h2>

        <div className="cta-buttons">
          <Button 
            variant="primary" 
            size="lg" 
            onClick={() => navigate('/signup')}
            leftIcon={<FaUserPlus />}
          >
            Create Free Account
          </Button>

          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => navigate('/tools')}
            leftIcon={<FaTools />}
            className="cta-btn-outline-override"
          >
            Explore Tools
          </Button>
        </div>
      </section>
    </div>
  );
}
