import React from 'react';
import { useState } from 'react';

interface CityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCity: (city: string) => void;
}

const CityModal: React.FC<CityModalProps> = ({ isOpen, onClose, onSelectCity }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const allCities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 
    'Pune', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur',
    'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad',
    'Patna', 'Vadodara'
  ];

  // Filter cities based on search term
  const filteredCities = allCities.filter(city =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCitySelect = (city: string) => {
    onSelectCity(city);
    setSearchTerm(''); // Clear search when closing
    onClose();
  };

  const handleClose = () => {
    setSearchTerm(''); // Clear search when closing
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="city-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Select Your City</h3>
          <button className="close-btn" onClick={handleClose}>
            ✕
          </button>
        </div>
        
        <div className="modal-content">
          <p className="modal-description">
            Choose your city to find nearby traders in your area
          </p>
          
          <div className="search-container">
            <div className="search-input-wrapper">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search cities..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
                className="city-search-input"
              />
              {searchTerm && (
                <button 
                  className="clear-search-btn"
                  onClick={() => setSearchTerm('')}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
          
          {filteredCities.length === 0 ? (
            <div className="no-results">
              <span className="no-results-icon">🏙️</span>
              <p>No cities found matching "{searchTerm}"</p>
              <p className="no-results-suggestion">Try searching with a different term</p>
            </div>
          ) : (
            <>
              <div className="results-count">
                {searchTerm && (
                  <p className="search-results-text">
                    Found {filteredCities.length} cities matching "{searchTerm}"
                  </p>
                )}
              </div>
              
              <div className="cities-grid">
                {filteredCities.map((city) => (
                  <button
                    key={city}
                    className="city-option"
                    onClick={() => handleCitySelect(city)}
                  >
                    📍 {city}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CityModal;