'use client';

import { useState } from 'react';
import { X, Filter } from 'lucide-react';

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

export default function QuickFilter({ isOpen, onClose, onApplyFilters }) {
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [regionOpen, setRegionOpen] = useState(false);

  const handleApply = () => {
    const filters = {
      region: selectedRegion,
      minPrice: minPrice ? parseFloat(minPrice) : null,
      maxPrice: maxPrice ? parseFloat(maxPrice) : null
    };
    onApplyFilters(filters);
    onClose();
  };

  const handleClear = () => {
    setSelectedRegion('All Regions');
    setMinPrice('');
    setMaxPrice('');
  };

  if (!isOpen) return null;

  return (
    <div className="quick-filter-overlay" onClick={onClose}>
      <div className="quick-filter-modal" onClick={(e) => e.stopPropagation()}>
        <div className="quick-filter-header">
          <h3>Quick Filters</h3>
          <button className="quick-filter-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="quick-filter-content">
          {/* Location Filter */}
          <div className="filter-section">
            <label className="filter-label">Location</label>
            <div className="location-selector">
              <button
                className="location-button"
                onClick={() => setRegionOpen(!regionOpen)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>{selectedRegion}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points={regionOpen ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
                </svg>
              </button>
              {regionOpen && (
                <div className="location-dropdown">
                  {ghanaRegions.map((region) => (
                    <button
                      key={region}
                      className={`location-option ${selectedRegion === region ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedRegion(region);
                        setRegionOpen(false);
                      }}
                    >
                      {region}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="filter-section">
            <label className="filter-label">Price Range</label>
            <div className="price-inputs">
              <div className="price-input-group">
                <span className="currency-symbol">₵</span>
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="price-input"
                  min="0"
                />
              </div>
              <span className="price-separator">-</span>
              <div className="price-input-group">
                <span className="currency-symbol">₵</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="price-input"
                  min="0"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="quick-filter-actions">
          <button className="clear-button" onClick={handleClear}>
            Clear All
          </button>
          <button className="apply-button" onClick={handleApply}>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}