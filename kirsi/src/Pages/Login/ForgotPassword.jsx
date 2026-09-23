import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, BackButton, Input } from '../../components/ui';
import './ForgotPassword.css';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!identifier.trim()) {
      setError('Please enter your mobile number or email address.');
      return;
    }

    if (identifier.includes('@')) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(identifier)) {
        setError('Please enter a valid email address.');
        return;
      }
    } else {
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(identifier)) {
        setError('Please enter a valid 10-digit mobile number.');
        return;
      }
    }

    setIsLoading(true);
    // Simulate recovery email/SMS trigger
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="forgot-page-container fade-in">
      <div className="forgot-left-panel">
        <div className="forgot-overlay">
          <div className="forgot-brand" onClick={() => navigate('/')}>
            <span className="brand-logo">🌱</span>
            <span className="brand-name">FarmConnect</span>
          </div>
          <div className="forgot-hero-content">
            <h1>Account Recovery 🔒</h1>
            <p>Don't worry! It happens. Enter your registered details and we'll help you secure your farm profile.</p>
          </div>
        </div>
      </div>

      <div className="forgot-right-panel">
        <div className="forgot-header-back">
          <BackButton label="Back to Login" to="/login" />
        </div>

        <Card className="forgot-card">
          <Card.Header className="forgot-card-header">
            <h2>Reset Your Password</h2>
            <p>Get a recovery link or OTP code sent to your registered device</p>
          </Card.Header>
          <Card.Body className="forgot-card-body">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="forgot-form">
                <Input
                  label="Mobile Number or Email Address"
                  placeholder="e.g. 9876543210 or name@email.com"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  error={error}
                  disabled={isLoading}
                  leftIcon={<span>👤</span>}
                  helperText="We will send a reset link or verification code to this address/number."
                />

                <Button
                  type="submit"
                  variant="primary"
                  className="forgot-submit-btn"
                  isLoading={isLoading}
                >
                  Send Recovery Link
                </Button>
              </form>
            ) : (
              <div className="forgot-success-state">
                <div className="success-icon">✉️</div>
                <h3>Check Your Device</h3>
                <p>
                  A recovery link and 6-digit security code has been sent to{' '}
                  <strong>{identifier}</strong>. Please follow the instructions to reset your password.
                </p>
                <Button
                  variant="outline"
                  className="forgot-back-btn"
                  onClick={() => navigate('/login')}
                >
                  Back to Login
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
