import React from 'react';
import './Loader.css';

const Loader = ({
  variant = 'spinner',
  size = 'md',
  color = 'primary',
  // Skeleton-specific props
  width,
  height,
  shape = 'rect', // 'rect' | 'circle' | 'text'
  className = '',
  ...props
}) => {
  if (variant === 'skeleton') {
    const skeletonStyle = {
      width: width || (shape === 'circle' ? '48px' : '100%'),
      height: height || (shape === 'text' ? '16px' : shape === 'circle' ? '48px' : '100px'),
      ...props.style
    };

    const skeletonClassNames = [
      'skeleton',
      `skeleton-${shape}`,
      className
    ]
      .filter(Boolean)
      .join(' ');

    return <div className={skeletonClassNames} style={skeletonStyle} {...props} />;
  }

  // Spinner variant
  const spinnerClassNames = [
    'spinner',
    `spinner-${size}`,
    `spinner-${color}`,
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={spinnerClassNames} role="status" {...props}>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;
