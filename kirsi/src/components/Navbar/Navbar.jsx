import React, { useState } from "react";
import './Navbar.css';
import { useNavigate, useLocation } from "react-router-dom";
import { assets } from '../../assets/assets.js';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  
  // State for mobile menu toggle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Derive active menu item from path
  const getActiveMenu = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path.startsWith('/about')) return 'About us';
    if (
      path.startsWith('/tools') || 
      path.startsWith('/buy-tools') || 
      path.startsWith('/sell-tools') || 
      path.startsWith('/rent-tools') || 
      path.startsWith('/mechanic') ||
      path.startsWith('/register-mechanic')
    ) return 'tools';
    if (
      path.startsWith('/crops') || 
      path.startsWith('/buy-crops') ||
      path.startsWith('/sell-crops') ||
      path.startsWith('/experts') || 
      path.startsWith('/crop-shops') || 
      path.startsWith('/crop-advisory') ||
      path.startsWith('/crop-info')
    ) return 'Crop';
    if (
      path.startsWith('/animal') ||
      path.startsWith('/nearby-vets') ||
      path.startsWith('/buy-sell-animals')
    ) return 'Animal';
    return '';
  };

  const activeMenu = getActiveMenu();

  const handleNav = (name, path) => {
    navigate(path);
    setIsMobileMenuOpen(false); // Close mobile menu on click
  };

  const handleMobileLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  const getRoleEmoji = (role) => {
    switch (role) {
      case 'Farmer': return '👨‍🌾';
      case 'Mechanic': return '🛠️';
      case 'Shopkeeper': return '🛍️';
      case 'Advisor': return '🧠';
      default: return '👤';
    }
  };

  return (
    <nav className="navbar-container">
      <div className="navbar">
        <img 
          src={assets.logo} 
          alt="kirsi" 
          className="navbar-logo" 
          onClick={() => handleNav("home", "/")}
          style={{ cursor: 'pointer' }}
        />

        {/* Desktop Menu */}
        <ul className="navbar-menu">
          <li onClick={() => handleNav("home", "/")} className={activeMenu === "home" ? "active" : ""}>Home</li>
          <li onClick={() => handleNav("About us", "/about")} className={activeMenu === "About us" ? "active" : ""}>About us</li>
          <li onClick={() => handleNav("tools", "/tools")} className={activeMenu === "tools" ? "active" : ""}>Tools</li>
          <li onClick={() => handleNav("Crop", "/crops")} className={activeMenu === "Crop" ? "active" : ""}>Crop</li>
          <li onClick={() => handleNav("Animal", "/animal")} className={activeMenu === "Animal" ? "active" : ""}>Animal</li>
        </ul>

        {/* Desktop User Section */}
        <div className="navbar-right">
          {user ? (
            <div className="navbar-user-profile">
              <div className="user-avatar-badge" title={`${user.role}: ${user.name}`}>
                <span className="avatar-emoji">{getRoleEmoji(user.role)}</span>
                <div className="user-info-text">
                  <span className="user-profile-name">{user.name}</span>
                  <span className="user-profile-role">{user.role}</span>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button 
              variant="primary" 
              size="md" 
              onClick={() => handleNav("Login", "/login")}
            >
              Login / Signup
            </Button>
          )}
        </div>

        {/* Hamburger Icon */}
        <button 
          className={`navbar-hamburger ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`navbar-mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul>
          <li onClick={() => handleNav("home", "/")} className={activeMenu === "home" ? "active" : ""}>Home</li>
          <li onClick={() => handleNav("About us", "/about")} className={activeMenu === "About us" ? "active" : ""}>About us</li>
          <li onClick={() => handleNav("tools", "/tools")} className={activeMenu === "tools" ? "active" : ""}>Tools</li>
          <li onClick={() => handleNav("Crop", "/crops")} className={activeMenu === "Crop" ? "active" : ""}>Crop</li>
          <li onClick={() => handleNav("Animal", "/animal")} className={activeMenu === "Animal" ? "active" : ""}>Animal</li>
        </ul>
        <div className="navbar-mobile-user-section">
          {user ? (
            <div className="mobile-user-card">
              <div className="mobile-user-info">
                <span className="mobile-avatar">{getRoleEmoji(user.role)}</span>
                <div className="mobile-text">
                  <span className="mobile-name">{user.name}</span>
                  <span className="mobile-role">{user.role}</span>
                </div>
              </div>
              <Button variant="outline" className="mobile-logout-btn" onClick={handleMobileLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button 
              variant="primary" 
              className="mobile-login-btn"
              onClick={() => handleNav("Login", "/login")}
            >
              Login / Signup
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="navbar-mobile-backdrop" 
          onClick={() => setIsMobileMenuOpen(false)} 
        />
      )}
    </nav>
  );
}

export default Navbar;