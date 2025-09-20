import React from 'react';
import { useState } from 'react';

interface CityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCity: (city: string) => void;
}

const CityModal: React.FC<CityModalProps> = ({ isOpen, onClose, onSelectCity }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const indianCities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai',
    'Kolkata', 'Surat', 'Pune', 'Jaipur', 'Lucknow', 'Kanpur',
    'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad',
    'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik',
    'Faridabad', 'Meerut', 'Rajkot', 'Kalyan-Dombivli', 'Vasai-Virar', 'Varanasi',
    'Srinagar', 'Aurangabad', 'Dhanbad', 'Amritsar', 'Navi Mumbai', 'Allahabad',
    'Ranchi', 'Howrah', 'Coimbatore', 'Jabalpur', 'Gwalior', 'Vijayawada',
    'Jodhpur', 'Madurai', 'Raipur', 'Kota', 'Guwahati', 'Chandigarh',
    'Solapur', 'Hubli-Dharwad', 'Tiruchirappalli', 'Bareilly', 'Mysore', 'Tiruppur',
    'Gurgaon', 'Aligarh', 'Jalandhar', 'Bhubaneswar', 'Salem', 'Mira-Bhayandar',
    'Warangal', 'Guntur', 'Bhiwandi', 'Saharanpur', 'Gorakhpur', 'Bikaner',
    'Amravati', 'Noida', 'Jamshedpur', 'Bhilai', 'Cuttack', 'Firozabad',
    'Kochi', 'Nellore', 'Bhavnagar', 'Dehradun', 'Durgapur', 'Asansol',
    'Rourkela', 'Nanded', 'Kolhapur', 'Ajmer', 'Akola', 'Gulbarga',
    'Jamnagar', 'Ujjain', 'Loni', 'Siliguri', 'Jhansi', 'Ulhasnagar',
    'Jammu', 'Sangli-Miraj & Kupwad', 'Mangalore', 'Erode', 'Belgaum', 'Ambattur',
    'Tirunelveli', 'Malegaon', 'Gaya', 'Jalgaon', 'Udaipur', 'Maheshtala'
  ];

  // Filter cities based on search term
  const filteredCities = indianCities.filter(city =>
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
                onChange={(e) => setSearchTerm(e.target.value)}
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
          <div className="cities-grid">
            {indianCities.map((city) => (
              <button
                key={city}
                className="city-option"
                onClick={() => handleCitySelect(city)}
              >
                📍 {city}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityModal;