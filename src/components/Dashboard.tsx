import React from 'react';
import { useWeb3 } from '../hooks/useWeb3';
import CityModal from './CityModal';

const Dashboard: React.FC = () => {
  const { account, isConnected, balance, connectWallet, disconnectWallet } = useWeb3();
  const [selectedCity, setSelectedCity] = React.useState<string | null>(null);
  const [showCityModal, setShowCityModal] = React.useState(false);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    localStorage.setItem('selectedCity', city);
  };

  // Load saved city on component mount
  React.useEffect(() => {
    const savedCity = localStorage.getItem('selectedCity');
    if (savedCity) {
      setSelectedCity(savedCity);
    }
  }, []);

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
            <p>{account?.slice(0, 6)}...{account?.slice(-4)}</p>
          </div>
          <button className="disconnect-btn-small" onClick={disconnectWallet}>
            Disconnect
          </button>
        </div>
      )}

      {/* USDC Balance Card */}
      <div className="usdc-balance-card">
        <div className="balance-header">
          <span className="balance-title">USDC Balance</span>
          <button className="refresh-button">
            <span>🔄</span>
          </button>
        </div>
        <div className="balance-amount">
          <span className="main-amount">$0.00</span>
          <span className="usd-equivalent">≈ $0.00 USD</span>
        </div>
      </div>

      {/* Add Your City Card */}
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

      {/* Welcome Section */}
      <div className="welcome-section">
        <div className="welcome-content">
          <div className="welcome-icon">
            <span>💳</span>
          </div>
          <div className="welcome-text">
            <h2>Welcome to</h2>
            <h2 className="brand-name">ZedTrust Web3</h2>
          </div>
        </div>
        {!isConnected && (
          <button className="connect-wallet-btn" onClick={connectWallet}>
            <span>🔗</span>
            Connect Wallet
          </button>
        )}
        {isConnected && (
          <div className="wallet-status">
            <div className="connected-info">
              <span className="status-icon">✅</span>
              <span>Wallet Connected</span>
            </div>
            <button className="disconnect-wallet-btn" onClick={disconnectWallet}>
              <span>🔌</span>
              Disconnect Wallet
            </button>
          </div>
        )}
      </div>

      {/* City Selection Modal */}
      <CityModal 
        isOpen={showCityModal}
        onClose={() => setShowCityModal(false)}
        onSelectCity={handleCitySelect}
      />
    </div>
  );
};

export default Dashboard;