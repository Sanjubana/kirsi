import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button, Card, BackButton, Input } from '../../components/ui';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const { user, signup } = useAuth();

  // Multi-step signup state
  const [showOtpScreen, setShowOtpScreen] = useState(false);

  // Form field states
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    village: '',
    district: '',
    password: '',
    confirmPassword: '',
    role: 'Farmer', // Default role
  });

  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const districtsList = [
    { value: 'jhalawar', label: 'Jhalawar' },
    { value: 'kota', label: 'Kota' },
    { value: 'jaipur', label: 'Jaipur' },
    { value: 'udaipur', label: 'Udaipur' },
  ];

  const rolesList = [
    { id: 'Farmer', label: 'Farmer', emoji: '👨‍🌾', description: 'Access advice & buy tools' },
    { id: 'Mechanic', label: 'Mechanic', emoji: '🛠️', description: 'Offer repair services' },
    { id: 'Shopkeeper', label: 'Shopkeeper', emoji: '🛍️', description: 'Sell items to farmers' },
    { id: 'Advisor', label: 'Advisor', emoji: '🧠', description: 'Consult with farmers' },
  ];

  // Redirect authenticated users
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleRoleSelect = (roleId) => {
    setFormData((prev) => ({ ...prev, role: roleId }));
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
      const container = e.target.parentNode;
      const inputs = container.querySelectorAll('input');
      inputs[5]?.focus();
    }
  };

  const validatePasswordStrength = (pwd) => {
    if (pwd.length < 6) return 'Password must be at least 6 characters.';
    if (!/[A-Z]/.test(pwd)) return 'Must contain at least one uppercase letter.';
    if (!/[a-z]/.test(pwd)) return 'Must contain at least one lowercase letter.';
    if (!/[0-9]/.test(pwd)) return 'Must contain at least one number.';
    if (!/[^A-Za-z0-9]/.test(pwd)) return 'Must contain at least one special character.';
    return null;
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full Name is required.';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters.';
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Mobile Number is required.';
    } else if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.village.trim()) {
      newErrors.village = 'Village name is required.';
    }

    if (!formData.district) {
      newErrors.district = 'Please select your district.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else {
      const pwdError = validatePasswordStrength(formData.password);
      if (pwdError) newErrors.password = pwdError;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!validateStep1()) return;

    setIsLoading(true);
    setErrors({});
    setTimeout(() => {
      setIsLoading(false);
      setShowOtpScreen(true);
    }, 1200);
  };

  const handleVerifyAndRegister = async (e) => {
    e.preventDefault();
    const otpCode = otpValues.join('');
    
    if (otpCode.length < 6) {
      setErrors({ otp: 'Please enter the complete 6-digit verification code.' });
      return;
    }

    setIsLoading(true);
    setErrors({});
    try {
      await signup(formData, true); // Persist session by default on signup
      navigate('/');
    } catch (err) {
      setErrors({ form: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const eyeIcon = (show, toggle) => (
    <button
      type="button"
      onClick={() => toggle(!show)}
      className="password-toggle-btn"
      aria-label="Toggle password visibility"
    >
      {show ? (
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
    <div className="signup-page-container fade-in">
      <div className="signup-left-panel">
        <div className="signup-overlay">
          <div className="signup-brand" onClick={() => navigate('/')}>
            <span className="brand-logo">🌱</span>
            <span className="brand-name">FarmConnect</span>
          </div>

          <div className="signup-hero-content">
            <h1>Join Our Farmer Community 👨‍🌾</h1>
            <p>Connect with thousands of agro-professionals to exchange tools, advisory, and services.</p>

            <ul className="signup-features-list">
              <li>✔ Free digital crop advisory services</li>
              <li>✔ Connect with certified farming experts</li>
              <li>✔ Rent/buy tools directly at great rates</li>
              <li>✔ Build your professional digital identity</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="signup-right-panel">
        <div className="signup-header-back">
          <BackButton label="Back to Home" to="/" />
        </div>

        <Card className="signup-card">
          <Card.Header className="signup-card-header">
            <h2>Create Your Account</h2>
            <p>Join the digital revolution in modern farming</p>
          </Card.Header>

          <Card.Body className="signup-card-body">
            {errors.form && <div className="signup-alert-danger">{errors.form}</div>}

            {!showOtpScreen ? (
              <form onSubmit={handleSendOtp} className="signup-form">
                <div className="signup-row-2col">
                  <Input
                    label="Full Name *"
                    name="name"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={errors.name}
                    disabled={isLoading}
                    leftIcon={<span>👤</span>}
                  />

                  <Input
                    label="Mobile Number *"
                    name="phone"
                    placeholder="10-digit phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    error={errors.phone}
                    disabled={isLoading}
                    leftIcon={<span>📞</span>}
                  />
                </div>

                <div className="signup-row-2col">
                  <Input
                    label="Email Address *"
                    name="email"
                    type="email"
                    placeholder="e.g. name@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    disabled={isLoading}
                    leftIcon={<span>📧</span>}
                  />

                  <Input
                    label="Village Name *"
                    name="village"
                    placeholder="Enter village"
                    value={formData.village}
                    onChange={handleInputChange}
                    error={errors.village}
                    disabled={isLoading}
                    leftIcon={<span>🏡</span>}
                  />
                </div>

                <div className="select-container">
                  <label className="select-label">District *</label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className={`select-field ${errors.district ? 'select-field-error' : ''}`}
                  >
                    <option value="">Select your district</option>
                    {districtsList.map((dist) => (
                      <option key={dist.value} value={dist.value}>
                        {dist.label}
                      </option>
                    ))}
                  </select>
                  {errors.district && <p className="select-error-text">{errors.district}</p>}
                </div>

                <div className="signup-row-2col">
                  <Input
                    label="Password *"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min 6 characters"
                    value={formData.password}
                    onChange={handleInputChange}
                    error={errors.password}
                    disabled={isLoading}
                    leftIcon={<span>🔒</span>}
                    rightIcon={eyeIcon(showPassword, setShowPassword)}
                  />

                  <Input
                    label="Confirm Password *"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Re-enter password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    error={errors.confirmPassword}
                    disabled={isLoading}
                    leftIcon={<span>🔒</span>}
                    rightIcon={eyeIcon(showConfirmPassword, setShowConfirmPassword)}
                  />
                </div>

                <div className="role-selector-section">
                  <label className="role-selector-label">I am a *</label>
                  <div className="role-grid">
                    {rolesList.map((role) => (
                      <div
                        key={role.id}
                        onClick={() => !isLoading && handleRoleSelect(role.id)}
                        className={`role-item-card ${formData.role === role.id ? 'active' : ''}`}
                      >
                        <span className="role-emoji">{role.emoji}</span>
                        <div className="role-meta">
                          <span className="role-name">{role.label}</span>
                          <span className="role-desc">{role.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="signup-submit-btn"
                  isLoading={isLoading}
                >
                  Send Verification OTP
                </Button>
              </form>
            ) : (
              // STEP 2: OTP VERIFICATION
              <form onSubmit={handleVerifyAndRegister} className="signup-form">
                <div className="otp-verification-header">
                  <h3>Verify Your Mobile Number</h3>
                  <p>We've sent a 6-digit security code to <strong>+91 {formData.phone}</strong>.</p>
                </div>

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
                  <button type="button" className="otp-resend-btn" onClick={handleSendOtp}>
                    Resend Code
                  </button>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="signup-submit-btn"
                  isLoading={isLoading}
                >
                  Verify & Create Account
                </Button>

                <button
                  type="button"
                  onClick={() => setShowOtpScreen(false)}
                  className="otp-back-link-btn"
                  disabled={isLoading}
                >
                  ← Back to details edit
                </button>
              </form>
            )}

            <div className="signup-divider">
              <span>OR</span>
            </div>

            <div className="signup-login-prompt">
              <span>Already have an account? </span>
              <Link to="/login" className="login-link">Sign In</Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Signup;