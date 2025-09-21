import React, { useState } from 'react';
import './App.css';

// Simple Dashboard Component
const Dashboard = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [showCityModal, setShowCityModal] = useState(false);
  const [selectedToken, setSelectedToken] = useState('USDC');

  const cities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata',
    'Pune', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur'
  ];

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        setAccount(accounts[0]);
        setIsConnected(true);
      } else {
        alert('Please install MetaMask!');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAccount('');
  };

  const selectCity = (city) => {
    setSelectedCity(city);
    setShowCityModal(false);
  };

  return (
    <div className="dashboard-container">
      {/* Connect Wallet Card */}
      {!isConnected ? (
        <div className="connect-wallet-card">
          <div className="wallet-icon">
            <span>💳</span>
          </div>
          <div className="connect-content">
            <h3>Connect Wallet</h3>
            <p>Connect to start trading</p>
          </div>
          <button className="connect-btn-small" onClick={connectWallet}>
            Connect
          </button>
        </div>
      ) : (
        <div className="wallet-connected-card">
          <div className="wallet-icon">
            <span>✅</span>
          </div>
          <div className="connect-content">
            <h3>Wallet Connected</h3>
            <p>{account.slice(0, 6)}...{account.slice(-4)}</p>
          </div>
          <button className="disconnect-btn-small" onClick={disconnectWallet}>
            Disconnect
          </button>
        </div>
      )}

      {/* Token Balance Card */}
      <div className="token-balance-card">
        <div className="balance-header">
          <div className="balance-title-section">
            <span className="balance-title">{selectedToken} Balance</span>
            <div className="token-selector-dropdown">
              <button 
                className="token-selector-btn"
                onClick={() => setSelectedToken(selectedToken === 'USDC' ? 'USDT' : 'USDC')}
              >
                <span className="token-icon">
                  {selectedToken === 'USDC' ? '🔵' : '🟢'}
                </span>
                <span className="token-name">{selectedToken}</span>
                <span className="dropdown-arrow">⌄</span>
              </button>
            </div>
          </div>
          <button className="refresh-button">
            <span>🔄</span>
          </button>
        </div>
        <div className="balance-amount">
          <span className="main-amount">
            {isConnected ? '1,250.00' : '0.00'} {selectedToken}
          </span>
          <span className="usd-equivalent">
            ≈ ${isConnected ? '1,250.00' : '0.00'} USD
          </span>
        </div>
      </div>

      {/* City Selection */}
      {!selectedCity ? (
        <div className="add-city-card">
          <div className="location-pin">
            <span>📍</span>
          </div>
          <div className="city-content">
            <h3>Add Your City</h3>
            <p>Please select your city to find nearby active traders in your area.</p>
          </div>
          <button 
            className="select-city-button"
            onClick={() => setShowCityModal(true)}
          >
            <span>🏢</span>
            Select City
          </button>
        </div>
      ) : (
        <div className="selected-city-card">
          <div className="city-info">
            <div className="city-icon">
              <span>📍</span>
            </div>
            <div className="city-details">
              <h3>Your City</h3>
              <p>{selectedCity}</p>
            </div>
          </div>
          <button 
            className="change-city-button"
            onClick={() => setShowCityModal(true)}
          >
            Change
          </button>
        </div>
      )}

      {/* Nearby Traders */}
      {selectedCity && isConnected && (
        <div className="nearby-traders-section">
          <div className="section-header">
            <h3>Nearby Traders in {selectedCity}</h3>
            <span className="traders-count">4 active ads</span>
          </div>
          
          <div className="traders-grid">
            <div className="trader-ad-card">
              <div className="trader-header">
                <div className="trader-info">
                  <div className="trader-name-section">
                    <span className="trader-name">Priya Sharma</span>
                    <div className="trader-rating">
                      <span className="star">⭐</span>
                      <span className="rating-value">4.9</span>
                      <span className="trades-count">(180)</span>
                    </div>
                  </div>
                  <div className="online-status online">
                    <span className="status-dot"></span>
                    Online
                  </div>
                </div>
              </div>

              <div className="ad-details">
                <div className="ad-type-badge">
                  <span className="ad-type sell">
                    📉 Selling USDT
                  </span>
                </div>
                
                <div className="location-distance">
                  <span className="location">📍 {selectedCity} Central</span>
                  <span className="distance">2.5 km away</span>
                </div>
              </div>

              <div className="trading-info">
                <div className="price-section">
                  <div className="price-label">Price</div>
                  <div className="price-value">₹87.06</div>
                </div>
                <div className="available-section">
                  <div className="available-label">Available</div>
                  <div className="available-value">750.00 USDT</div>
                </div>
              </div>

              <div className="payment-methods">
                <span className="payment-label">Payment:</span>
                <div className="payment-tags">
                  <span className="payment-tag">UPI Transfer</span>
                  <span className="payment-tag">Bank Transfer</span>
                </div>
              </div>

              <div className="action-buttons">
                <button className="trade-btn buy-from-seller">
                  Buy USDT
                </button>
                <button className="message-btn">💬</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* City Modal */}
      {showCityModal && (
        <div className="modal-overlay" onClick={() => setShowCityModal(false)}>
          <div className="city-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Select Your City</h3>
              <button className="close-btn" onClick={() => setShowCityModal(false)}>
                ✕
              </button>
            </div>
            
            <div className="cities-grid">
              {cities.map((city) => (
                <button
                  key={city}
                  className="city-option"
                  onClick={() => selectCity(city)}
                >
                  📍 {city}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Simple Tab Components
const Trades = () => (
  <div className="trades-container">
    <div className="trades-not-connected">
      <div className="not-connected-icon">📊</div>
      <h3>Trading History</h3>
      <p>Your trading statistics and history will appear here</p>
    </div>
  </div>
);

const P2PTrading = () => (
  <div className="p2p-container">
    <div className="p2p-not-connected">
      <div className="not-connected-icon">🤝</div>
      <h3>P2P Trading</h3>
      <p>Buy and sell crypto directly with other users</p>
    </div>
  </div>
);

const Wallet = () => (
  <div className="wallet-section">
    <div className="trades-not-connected">
      <div className="not-connected-icon">💳</div>
      <h3>Wallet</h3>
      <p>Manage your wallet and transactions</p>
    </div>
  </div>
);

const Profile = () => (
  <div className="profile-section">
    <div className="trades-not-connected">
      <div className="not-connected-icon">👤</div>
      <h3>Profile</h3>
      <p>Manage your profile and settings</p>
    </div>
  </div>
);

// Bottom Navigation
const BottomNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'trades', label: 'Trades', icon: '📊' },
    { id: 'p2p', label: 'P2P', icon: '🤝' },
    { id: 'wallet', label: 'Wallet', icon: '💳' },
    { id: 'profile', label: 'Profile', icon: '👤' }
  ];

  return (
    <div className="bottom-navigation">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          <span className="nav-icon">{tab.icon}</span>
          <span className="nav-label">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

// Main App Component
function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'trades':
        return <Trades />;
      case 'p2p':
        return <P2PTrading />;
      case 'wallet':
        return <Wallet />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1>ZedTrust DApp</h1>
          <div className="header-icons">
            <span>🔔</span>
            <span>👤</span>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          {renderContent()}
        </div>
      </main>

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;