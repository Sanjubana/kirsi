import React, { useId } from 'react';
import './Input.css';

const Input = React.forwardRef(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className = '',
  disabled = false,
  type = 'text',
  id,
  ...props
}, ref) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const hasError = !!error;

  const wrapperClassNames = [
    'input-wrapper',
    disabled ? 'input-disabled' : '',
    hasError ? 'input-has-error' : '',
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="input-container">
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
        </label>
      )}
      <div className={wrapperClassNames}>
        {leftIcon && <span className="input-icon input-icon-left">{leftIcon}</span>}
        <input
          ref={ref}
          type={type}
          id={inputId}
          disabled={disabled}
          className="input-field"
          {...props}
        />
        {rightIcon && <span className="input-icon input-icon-right">{rightIcon}</span>}
      </div>
      {hasError && <p className="input-message input-error-message">{error}</p>}
      {!hasError && helperText && <p className="input-message input-helper-message">{helperText}</p>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
