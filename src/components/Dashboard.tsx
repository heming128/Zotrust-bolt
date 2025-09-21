import React from 'react';
import CityModal from './CityModal';

interface TraderAd {
  id: string;
  name: string;
  rating: number;
  totalTrades: number;
  isOnline: boolean;
  adType: 'buy' | 'sell';
  token: 'USDT' | 'USDC';
  price: number;
  available: number;
  limit: {
    min: number;
    max: number;
  };
  paymentMethods: string[];
  location: string;
  distance: string;
}

const Dashboard: React.FC = () => {
  const { 
    account, 
    isConnected, 
    balance, 
    tokenBalances, 
    isLoadingBalances,
    connectWallet, 
    disconnectWallet,
    refreshTokenBalances 
  } = {};
  const [selectedCity, setSelectedCity] = React.useState<string | null>(null);
  const [showCityModal, setShowCityModal] = React.useState(false);
  const [selectedToken, setSelectedToken] = React.useState<'USDC' | 'USDT'>('USDC');

  // Mock data for nearby traders based on selected city
  const getNearbyTraders = (city: string): TraderAd[] => {
    const baseTraders: TraderAd[] = [
      {
        id: '1',
        name: 'Priya Sharma',
        rating: 4.9,
        totalTrades: 180,
        isOnline: true,
        adType: 'sell',
        token: 'USDT',
        price: 87.06,
        available: 750.00,
        limit: { min: 3500, max: 6000 },
        paymentMethods: ['UPI Transfer', 'Bank Transfer'],
        location: `${city} Central`,
        distance: '2.5 km'
      },
      {
        id: '2',
        name: 'Rahul Kumar',
        rating: 4.8,
        totalTrades: 156,
        isOnline: true,
        adType: 'buy',
        token: 'USDC',
        price: 87.15,
        available: 1200.00,
        limit: { min: 2000, max: 8000 },
        paymentMethods: ['UPI Transfer', 'IMPS'],
        location: `${city} East`,
        distance: '3.2 km'
      },
      {
        id: '3',
        name: 'Amit Singh',
        rating: 4.7,
        totalTrades: 234,
        isOnline: false,
        adType: 'sell',
        token: 'USDT',
        price: 87.25,
        available: 950.00,
        limit: { min: 5000, max: 10000 },
        paymentMethods: ['Bank Transfer', 'UPI Transfer'],
        location: `${city} West`,
        distance: '4.1 km'
      },
      {
        id: '4',
        name: 'Sneha Patel',
        rating: 4.9,
        totalTrades: 298,
        isOnline: true,
        adType: 'buy',
        token: 'USDT',
        price: 86.95,
        available: 2000.00,
        limit: { min: 1000, max: 15000 },
        paymentMethods: ['UPI Transfer', 'PhonePe', 'GPay'],
        location: `${city} South`,
        distance: '1.8 km'
      }
    ];
    
    return baseTraders;
  };

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

  const nearbyTraders = selectedCity ? getNearbyTraders(selectedCity) : [];

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
          <button 
            className="refresh-button"
            onClick={refreshTokenBalances}
            disabled={isLoadingBalances}
          >
            <span>{isLoadingBalances ? '⏳' : '🔄'}</span>
          </button>
        </div>
        <div className="balance-amount">
          <span className="main-amount">
            {isLoadingBalances ? 'Loading...' : `${tokenBalances[selectedToken]} ${selectedToken}`}
          </span>
          <span className="usd-equivalent">
            ≈ ${isLoadingBalances ? '0.00' : tokenBalances[selectedToken]} USD
          </span>
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

      {/* Nearby Traders Section */}
      {selectedCity && nearbyTraders.length > 0 && (
        <div className="nearby-traders-section">
          <div className="section-header">
            <h3>Nearby Traders in {selectedCity}</h3>
            <span className="traders-count">{nearbyTraders.length} active ads</span>
          </div>
          
          <div className="traders-grid">
            {nearbyTraders.map((trader) => (
              <div key={trader.id} className="trader-ad-card">
                <div className="trader-header">
                  <div className="trader-info">
                    <div className="trader-name-section">
                      <span className="trader-name">{trader.name}</span>
                      <div className="trader-rating">
                        <span className="star">⭐</span>
                        <span className="rating-value">{trader.rating}</span>
                        <span className="trades-count">({trader.totalTrades})</span>
                      </div>
                    </div>
                    <div className={`online-status ${trader.isOnline ? 'online' : 'offline'}`}>
                      <span className="status-dot"></span>
                      {trader.isOnline ? 'Online' : 'Offline'}
                    </div>
                  </div>
                </div>

                <div className="ad-details">
                  <div className="ad-type-badge">
                    <span className={`ad-type ${trader.adType}`}>
                      {trader.adType === 'buy' ? '📈 Buying' : '📉 Selling'} {trader.token}
                    </span>
                  </div>
                  
                  <div className="location-distance">
                    <span className="location">📍 {trader.location}</span>
                    <span className="distance">{trader.distance} away</span>
                  </div>
                </div>

                <div className="trading-info">
                  <div className="price-section">
                    <div className="price-label">Price</div>
                    <div className="price-value">₹{trader.price.toFixed(2)}</div>
                  </div>
                  <div className="available-section">
                    <div className="available-label">Available</div>
                    <div className="available-value">{trader.available.toFixed(2)} {trader.token}</div>
                  </div>
                </div>

                <div className="payment-methods">
                  <span className="payment-label">Payment:</span>
                  <div className="payment-tags">
                    {trader.paymentMethods.slice(0, 2).map((method, index) => (
                      <span key={index} className="payment-tag">{method}</span>
                    ))}
                    {trader.paymentMethods.length > 2 && (
                      <span className="payment-tag more">+{trader.paymentMethods.length - 2}</span>
                    )}
                  </div>
                </div>

                <div className="action-buttons">
                  <button className={`trade-btn ${trader.adType === 'buy' ? 'sell-to-buyer' : 'buy-from-seller'}`}>
                    {trader.adType === 'buy' ? `Sell ${trader.token}` : `Buy ${trader.token}`}
                  </button>
                  <button className="message-btn">💬</button>
                </div>
              </div>
            ))}
          </div>
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