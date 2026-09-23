import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.css';

const BackButton = ({
  to,
  fallback = '/',
  label = 'Back',
  className = '',
  onClick,
  ...props
}) => {
  const navigate = useNavigate();

  const handleGoBack = (e) => {
    if (onClick) {
      onClick(e);
      if (e.defaultPrevented) return;
    }

    if (to) {
      navigate(to);
    } else if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };

  return (
    <button
      type="button"
      className={`back-button ${className}`}
      onClick={handleGoBack}
      {...props}
    >
      <span className="back-button-icon">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
      </span>
      <span className="back-button-text">{label}</span>
    </button>
  );
};

export default BackButton;
