import React from 'react';
import './Skeleton.css';

export default function Skeleton({ type = "text", count = 1, className = "" }) {
  const renderItems = () => {
    const items = [];
    for (let i = 0; i < count; i++) {
      if (type === "card") {
        items.push(
          <div key={i} className={`skeleton-card-wrapper ${className}`}>
            <div className="skeleton-image loading-shimmer"></div>
            <div className="skeleton-content">
              <div className="skeleton-title loading-shimmer"></div>
              <div className="skeleton-line loading-shimmer"></div>
              <div className="skeleton-line short loading-shimmer"></div>
              <div className="skeleton-button loading-shimmer"></div>
            </div>
          </div>
        );
      } else if (type === "provider") {
        items.push(
          <div key={i} className={`skeleton-provider-wrapper ${className}`}>
            <div className="skeleton-avatar loading-shimmer"></div>
            <div className="skeleton-content" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="skeleton-title loading-shimmer" style={{ width: '60%' }}></div>
              <div className="skeleton-line loading-shimmer" style={{ width: '90%' }}></div>
              <div className="skeleton-line short loading-shimmer" style={{ width: '40%' }}></div>
            </div>
          </div>
        );
      } else {
        items.push(
          <div key={i} className={`skeleton-text-line loading-shimmer ${className}`}></div>
        );
      }
    }
    return items;
  };

  return <>{renderItems()}</>;
}
