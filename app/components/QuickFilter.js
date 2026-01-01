'use client';

import { useState, useEffect } from 'react';
import { X, Filter, Loader2 } from 'lucide-react';
import { fetchRegionsWithProducts } from '../utils/fetchRegionsWithProducts';

export default function QuickFilter({ isOpen, onClose, onApplyFilters, selectedCategoryFilter = null }) {
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [regionOpen, setRegionOpen] = useState(false);
  const [regions, setRegions] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loadingRegions, setLoadingRegions] = useState(false);

  const handleApply = () => {
    const filters = {
      region: selectedRegion,
      minPrice: minPrice ? parseFloat(minPrice) : null,
      maxPrice: maxPrice ? parseFloat(maxPrice) : null
    };
    onApplyFilters(filters);
    onClose();
  };

  // Fetch regions when modal opens or category filter changes
  useEffect(() => {
    if (isOpen) {
      fetchRegions();
    }
  }, [isOpen, selectedCategoryFilter]);

  const fetchRegions = async () => {
    try {
      setLoadingRegions(true);
      const categoryId = selectedCategoryFilter?.id || null;
      const data = await fetchRegionsWithProducts(categoryId);
      setRegions(data.regions || []);
      setLocations(data.locations || []);
    } catch (error) {
      console.error('Error fetching regions:', error);
    } finally {
      setLoadingRegions(false);
    }
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
            {selectedCategoryFilter && (
              <div style={{ 
                fontSize: '12px', 
                color: '#64748b', 
                marginBottom: '8px',
                fontStyle: 'italic'
              }}>
                Filtered by: {selectedCategoryFilter.name}
              </div>
            )}
            <div className="location-selector">
              <button
                className="location-button"
                onClick={() => setRegionOpen(!regionOpen)}
                disabled={loadingRegions}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>{selectedRegion}</span>
                {loadingRegions ? (
                  <Loader2 size={14} className="spinner" style={{ animation: 'spin 1s linear infinite' }} />
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points={regionOpen ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
                  </svg>
                )}
              </button>
              {regionOpen && (
                <div className="location-dropdown">
                  <button
                    className={`location-option ${selectedRegion === 'All Regions' ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedRegion('All Regions');
                      setRegionOpen(false);
                    }}
                  >
                    <span>All Regions</span>
                  </button>
                  {loadingRegions ? (
                    <div style={{ padding: '20px', textAlign: 'center' }}>
                      <Loader2 size={20} className="spinner" style={{ animation: 'spin 1s linear infinite', margin: '0 auto' }} />
                      <p style={{ marginTop: '8px', fontSize: '12px', color: '#64748b' }}>Loading locations...</p>
                    </div>
                  ) : regions.length === 0 && locations.length === 0 ? (
                    <div style={{ padding: '20px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
                      No locations found
                    </div>
                  ) : (
                    <>
                      {/* Regions */}
                      {regions.length > 0 && (
                        <>
                          <div style={{ 
                            padding: '8px 12px', 
                            fontSize: '11px', 
                            fontWeight: '600', 
                            color: '#64748b',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            Regions
                          </div>
                          {regions.map((region) => (
                            <button
                              key={region.name}
                              className={`location-option ${selectedRegion === region.name ? 'active' : ''}`}
                              onClick={() => {
                                setSelectedRegion(region.name);
                                setRegionOpen(false);
                              }}
                            >
                              <span>{region.name}</span>
                              <span style={{ 
                                fontSize: '12px', 
                                color: '#64748b',
                                marginLeft: 'auto',
                                fontWeight: '500'
                              }}>
                                {region.count} {region.count === 1 ? 'product' : 'products'}
                              </span>
                            </button>
                          ))}
                        </>
                      )}
                      {/* Locations (Cities) */}
                      {locations.length > 0 && (
                        <>
                          <div style={{ 
                            padding: '8px 12px', 
                            fontSize: '11px', 
                            fontWeight: '600', 
                            color: '#64748b',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            marginTop: regions.length > 0 ? '8px' : '0',
                            borderTop: regions.length > 0 ? '1px solid #e5e7eb' : 'none',
                            paddingTop: regions.length > 0 ? '12px' : '8px'
                          }}>
                            Cities
                          </div>
                          {locations.map((location) => (
                            <button
                              key={location.name}
                              className={`location-option ${selectedRegion === location.name ? 'active' : ''}`}
                              onClick={() => {
                                setSelectedRegion(location.name);
                                setRegionOpen(false);
                              }}
                            >
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                                <span>{location.name}</span>
                                {location.region && (
                                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>{location.region}</span>
                                )}
                              </div>
                              <span style={{ 
                                fontSize: '12px', 
                                color: '#64748b',
                                marginLeft: 'auto',
                                fontWeight: '500'
                              }}>
                                {location.count} {location.count === 1 ? 'product' : 'products'}
                              </span>
                            </button>
                          ))}
                        </>
                      )}
                    </>
                  )}
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