'use client';

import { useState } from 'react';

const ghanaRegions = [
  'All Regions',
  'Ahafo',
  'Ashanti',
  'Bono',
  'Bono East',
  'Central',
  'Eastern',
  'Greater Accra',
  'North East',
  'Northern',
  'Oti',
  'Savannah',
  'Upper East',
  'Upper West',
  'Volta',
  'Western',
  'Western North'
];

export default function LocationFilter({ variant = 'desktop' }) {
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [isOpen, setIsOpen] = useState(false);

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    setIsOpen(false);
    // Here you would typically dispatch an action or call a callback
    // to filter products by the selected region
  };

  if (variant === 'mobile') {
    return (
      <div className="location-filter-mobile">
        <div className="location-filter-header">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span className="location-filter-label">Location</span>
        </div>
        <div className="location-filter-selector">
          <button
            className="location-filter-button"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>{selectedRegion}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points={isOpen ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
            </svg>
          </button>
          {isOpen && (
            <div className="location-filter-dropdown">
              {ghanaRegions.map((region) => (
                <button
                  key={region}
                  className={`location-filter-option ${selectedRegion === region ? 'active' : ''}`}
                  onClick={() => handleRegionSelect(region)}
                >
                  {region}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Desktop variant
  return (
    <div className="location-filter-desktop">
      <button
        className="location-filter-button"
        onClick={() => setIsOpen(!isOpen)}
        title="Filter by location"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        <span className="location-text">{selectedRegion}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points={isOpen ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
        </svg>
      </button>
      {isOpen && (
        <div className="location-filter-dropdown">
          {ghanaRegions.map((region) => (
            <button
              key={region}
              className={`location-filter-option ${selectedRegion === region ? 'active' : ''}`}
              onClick={() => handleRegionSelect(region)}
            >
              {region}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}