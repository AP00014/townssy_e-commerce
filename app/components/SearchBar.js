'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Menu from './Menu';
import DesktopNav from './DesktopNav';
import Logo from './Logo';
import { searchProducts, getSearchSuggestions } from '../utils/searchProducts';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸', authenticated: true },
];

export default function SearchBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Always English
  const searchInputRef = useRef(null);
  const searchBarRef = useRef(null);
  const dropdownRef = useRef(null);
  const languageDropdownRef = useRef(null);
  const languageIconRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });
  const router = useRouter();

  // Debounce search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsSearching(true);
      setShowDropdown(true); // Show dropdown immediately when searching starts
      try {
        // Get suggestions and search results in parallel
        const [suggestionList, results] = await Promise.all([
          getSearchSuggestions(searchQuery),
          searchProducts(searchQuery, 5)
        ]);
        
        setSuggestions(suggestionList);
        setSearchResults(results);
        
        // Keep dropdown open if we have results or if search is still active
        setShowDropdown(true);
      } catch (error) {
        console.error('Error fetching search data:', error);
        setSuggestions([]);
        setSearchResults([]);
        // Still show dropdown to display error/empty state
        setShowDropdown(true);
      } finally {
        setIsSearching(false);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close search dropdown
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }

      // Close language dropdown
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target) &&
        !event.target.closest('.language-icon-wrapper')
      ) {
        setShowLanguageDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Set language preference to English (always authenticated)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedLanguage', 'en');
      document.documentElement.lang = 'en';
    }
  }, []);

  // Calculate dropdown position when it opens
  useEffect(() => {
    if (showLanguageDropdown && languageIconRef.current) {
      const rect = languageIconRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right
      });
    }
  }, [showLanguageDropdown]);

  const handleLanguageSelect = (languageCode) => {
    // Only English is available, so just close the dropdown
    setShowLanguageDropdown(false);
  };

  const currentLanguage = LANGUAGES[0]; // Always English

  const handleSearch = (query = searchQuery) => {
    if (!query.trim()) return;
    
    setShowDropdown(false);
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };

  const handleResultClick = (productId) => {
    setShowDropdown(false);
    router.push(`/product/${productId}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  return (
    <>
      <div className="search-bar-container sticky-header">
        <Logo />
        <div className="search-bar-wrapper" ref={searchBarRef}>
          <div className="search-bar">
            <button
              type="button"
              className="search-icon-button"
              onClick={() => handleSearch()}
              aria-label="Search"
            >
              <svg 
                className="search-icon" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search products..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => {
                if (suggestions.length > 0 || searchResults.length > 0) {
                  setShowDropdown(true);
                }
              }}
              onKeyDown={handleKeyDown}
            />
            {searchQuery && (
              <svg 
                className="clear-icon" 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#999999" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                onClick={() => {
                  setSearchQuery('');
                  setShowDropdown(false);
                }}
                style={{ cursor: 'pointer' }}
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            )}
            <div className="language-icon-wrapper" ref={languageIconRef} style={{ position: 'relative' }}>
              <svg 
                className="language-icon" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#999999" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                style={{ cursor: 'pointer' }}
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              
              {/* Language Dropdown */}
              {showLanguageDropdown && (
                <div 
                  className="language-dropdown" 
                  ref={languageDropdownRef}
                  style={{
                    top: `${dropdownPosition.top}px`,
                    right: `${dropdownPosition.right}px`
                  }}
                >
                  <div className="language-dropdown-header">
                    <span>Current Language</span>
                  </div>
                  <div className="language-list">
                    {LANGUAGES.map((language) => (
                      <div
                        key={language.code}
                        className={`language-item active authenticated ${selectedLanguage === language.code ? 'current' : ''}`}
                        onClick={() => handleLanguageSelect(language.code)}
                      >
                        <span className="language-flag">{language.flag}</span>
                        <span className="language-name">{language.name}</span>
                        {language.authenticated && (
                          <span className="authenticated-badge" title="Authenticated">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                              <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                          </span>
                        )}
                        {selectedLanguage === language.code && (
                          <svg className="active-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="language-footer">
                    <span className="language-note">English is the current and only available language</span>
                  </div>
                </div>
              )}
            </div>
            <div className="menu-icon" onClick={() => setIsMenuOpen(true)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </div>
          </div>
          
          {/* Autocomplete Dropdown */}
          {showDropdown && searchQuery.trim() && (
            <div className="search-dropdown" ref={dropdownRef}>
              {/* Suggestions */}
              {suggestions.length > 0 && (
                <div className="search-suggestions">
                  <div className="dropdown-section-header">Suggestions</div>
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="suggestion-item"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999999" strokeWidth="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                      </svg>
                      <span>{suggestion}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="search-results">
                  <div className="dropdown-section-header">Products</div>
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      className="search-result-item"
                      onClick={() => handleResultClick(product.id)}
                    >
                      <img 
                        src={product.image || '/placeholder-product.jpg'} 
                        alt={product.title}
                        className="result-image"
                        onError={(e) => {
                          e.target.src = '/placeholder-product.jpg';
                        }}
                      />
                      <div className="result-info">
                        <div className="result-title">{product.title}</div>
                        {product.category && (
                          <div className="result-category">{product.category.name}</div>
                        )}
                        <div className="result-price">
                          ${product.currentPrice.toFixed(2)}
                          {product.originalPrice && (
                            <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* No Results Message */}
              {suggestions.length === 0 && searchResults.length === 0 && (
                <div className="dropdown-no-results">
                  <p>No results found for "{searchQuery}"</p>
                </div>
              )}

              {/* View All Results */}
              {searchQuery.trim() && (suggestions.length > 0 || searchResults.length > 0) && (
                <div 
                  className="view-all-results"
                  onClick={() => handleSearch()}
                >
                  View all results for "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>
        <DesktopNav />
      </div>
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}

