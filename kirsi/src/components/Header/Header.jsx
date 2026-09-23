import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui'
import './Header.css'

const Header = () => {
  const navigate = useNavigate()

  return (
    <div className='header'>
        <div className='header-content'>
            <h1>Smart Platform for Farmers & Villages</h1>
            <p> Buy tools, get crop advice, check weather updates , connect with experts and more!</p>
            <div className="header-actions">
              <Button 
                variant="primary" 
                size="lg" 
                onClick={() => navigate('/signup')}
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => navigate('/login')}
                className="header-login-btn"
              >
                Login
              </Button>
            </div>
        </div>
    </div>
  )
}

export default Header
