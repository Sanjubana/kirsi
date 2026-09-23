import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button, Card, BackButton, Input } from '../../components/ui';
import './login.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const { user, login } = useAuth();

  const [loginMode, setLoginMode] = useState('password'); // password or otp
  const [identifier, setIdentifier] = useState(''); // Email or Mobile Number
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // OTP specific state
  const [otpSent, setOtpSent] = useState(false);
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Redirect authenticated users
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleOtpChange = (e, index) => {
    const val = e.target.value;
    if (isNaN(val)) return;

    const newOtp = [...otpValues];
    newOtp[index] = val.substring(val.length - 1);
    setOtpValues(newOtp);

    // Focus next input
    if (val !== '' && index < 5) {
      const nextInput = e.target.nextSibling || e.target.parentNode.children[index + 1];
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      const newOtp = [...otpValues];
      if (otpValues[index]) {
        newOtp[index] = '';
        setOtpValues(newOtp);
      } else if (index > 0) {
        newOtp[index - 1] = '';
        setOtpValues(newOtp);
        const prevInput = e.target.previousSibling || e.target.parentNode.children[index - 1];
        prevInput?.focus();
      }
      e.preventDefault();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split('');
      setOtpValues(newOtp);
      // Focus the last input
      const container = e.target.parentNode;
      const inputs = container.querySelectorAll('input');
      inputs[5]?.focus();
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!identifier.trim()) {
      newErrors.identifier = 'Mobile number or email is required.';
    } else if (identifier.includes('@')) {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(identifier)) {
        newErrors.identifier = 'Please enter a valid email address.';
      }
    } else {
      // Validate phone format
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(identifier)) {
        newErrors.identifier = 'Please enter a valid 10-digit mobile number.';
      }
    }

    if (loginMode === 'password') {
      if (!password) {
        newErrors.password = 'Password is required.';
      } else if (password.length < 4) {
        newErrors.password = 'Password must be at least 4 characters.';
      }
    } else if (loginMode === 'otp' && otpSent) {
      const otpCode = otpValues.join('');
      if (otpCode.length < 6) {
        newErrors.otp = 'Please enter the complete 6-digit OTP.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = (e) => {
    if (e) e.preventDefault();
    // Validate mobile/email
    const newErrors = {};
    if (!identifier.trim()) {
      newErrors.identifier = 'Mobile number is required for OTP login.';
      setErrors(newErrors);
      return;
    }
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(identifier) && !identifier.includes('@')) {
      newErrors.identifier = 'Please enter a valid 10-digit mobile number.';
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
    }, 1000);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      if (loginMode === 'password') {
        await login(identifier, 'password', password, rememberMe);
      } else {
        await login(identifier, 'otp', otpValues.join(''), rememberMe);
      }
      navigate('/');
    } catch (err) {
      setErrors({ form: 'Login failed. Please verify details.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (loginMode === 'otp' && !otpSent) {
      handleSendOtp(e);
    } else {
      handleSubmit(e);
    }
  };

  // SVGs for eye icon toggle
  const eyeIcon = (
    <button
      type="button"
      onClick={handleTogglePasswordVisibility}
      className="password-toggle-btn"
      aria-label="Toggle password visibility"
    >
      {showPassword ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="eye-svg">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 19c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="eye-svg">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )}
    </button>
  );

  return (
    <div className="login-page-container fade-in">
      <div className="login-left-panel">
        <div className="login-overlay">
          <div className="login-brand" onClick={() => navigate('/')}>
            <span className="brand-logo">🌱</span>
            <span className="brand-name">FarmConnect</span>
          </div>
          <div className="login-hero-content">
            <h1>Welcome Back! 👨‍🌾</h1>
            <p>Empowering farmers with smart digital tools, peer networks, and advisory services.</p>
            <div className="login-perks">
              <div className="perk-item">🌾 Access localized crop advice</div>
              <div className="perk-item">🚜 Buy/rent farming machinery</div>
              <div className="perk-item">💬 Connect with agronomy experts</div>
            </div>
          </div>
        </div>
      </div>

      <div className="login-right-panel">
        <div className="login-header-back">
          <BackButton label="Back to Home" to="/" />
        </div>

        <Card className="login-card">
          <Card.Header className="login-card-header">
            <h2>Login to Your Account</h2>
            <p>Enter your credentials to manage your farm profile</p>
          </Card.Header>
          <Card.Body className="login-card-body">
            {errors.form && <div className="login-alert-danger">{errors.form}</div>}

            <div className="login-tab-headers">
              <button
                type="button"
                className={`login-tab-btn ${loginMode === 'otp' ? 'active' : ''}`}
                onClick={() => {
                  setLoginMode('otp');
                  setOtpSent(false);
                  setErrors({});
                }}
              >
                OTP Verification
              </button>
              <button
                type="button"
                className={`login-tab-btn ${loginMode === 'password' ? 'active' : ''}`}
                onClick={() => {
                  setLoginMode('password');
                  setErrors({});
                }}
              >
                Password Login
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="login-form">
              <Input
                label="Mobile Number or Email"
                placeholder="e.g. 9876543210 or name@email.com"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                error={errors.identifier}
                disabled={isLoading || (loginMode === 'otp' && otpSent)}
                leftIcon={<span>👤</span>}
              />

              {loginMode === 'password' && (
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your account password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                  disabled={isLoading}
                  leftIcon={<span>🔒</span>}
                  rightIcon={eyeIcon}
                />
              )}

              {loginMode === 'otp' && otpSent && (
                <div className="otp-input-section">
                  <label className="otp-input-label">Enter 6-digit OTP code sent to your device</label>
                  <div className="otp-box-container">
                    {otpValues.map((data, index) => (
                      <input
                        className="otp-field-input"
                        type="text"
                        name="otp"
                        maxLength="1"
                        key={index}
                        value={data}
                        autoFocus={index === 0}
                        onChange={(e) => handleOtpChange(e, index)}
                        onKeyDown={(e) => handleOtpKeyDown(e, index)}
                        onPaste={handleOtpPaste}
                        onFocus={(e) => e.target.select()}
                        disabled={isLoading}
                      />
                    ))}
                  </div>
                  {errors.otp && <p className="otp-error-text">{errors.otp}</p>}
                  <div className="otp-resend-row">
                    <span>Didn't receive code?</span>
                    <button type="button" className="otp-resend-btn" onClick={handleSendOtp}>Resend OTP</button>
                  </div>
                </div>
              )}

              {loginMode === 'password' && (
                <div className="remember-forgot-row">
                  <label className="remember-me-checkbox">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      disabled={isLoading}
                    />
                    <span>Remember Me</span>
                  </label>
                  <div className="forgot-password-link">
                    <Link to="/forgot-password">Forgot Password?</Link>
                  </div>
                </div>
              )}

              {loginMode === 'otp' && !otpSent ? (
                <Button
                  type="submit"
                  variant="primary"
                  className="login-submit-btn"
                  isLoading={isLoading}
                >
                  Send OTP Code
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="primary"
                  className="login-submit-btn"
                  isLoading={isLoading}
                >
                  Verify & Sign In
                </Button>
              )}
            </form>

            <div className="login-divider">
              <span>OR</span>
            </div>

            <div className="login-signup-prompt">
              <span>New to FarmConnect? </span>
              <Link to="/signup" className="signup-link">Create an Account</Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}