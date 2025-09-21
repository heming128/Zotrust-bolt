import React, { useState } from 'react';
import './App.css';

// Simple Error Boundary
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.error('Error caught by boundary:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App Error Details:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '2rem', 
          textAlign: 'center',
          fontFamily: 'Arial, sans-serif',
          background: '#fff',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚨</div>
          <h1 style={{ color: '#dc2626', marginBottom: '1rem' }}>App Error</h1>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            {this.state.error?.message || 'Unknown error'}
          </p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '1rem 2rem',
              background: '#4f46e5',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600'
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Simple Dashboard Component
const SimpleDashboard: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState('0.00');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [showCityModal, setShowCityModal] = useState(false);
  const [selectedToken, setSelectedToken] = useState<'USDC' | 'USDT'>('USDC');
  const [isConnecting, setIsConnecting] = useState(false);

  const cities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata',
    'Pune', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur'
  ];

  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      
      if (typeof window !== 'undefined' && window.ethereum) {
        // Real Web3 connection
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
          setBalance('1,250.50'); // Mock balance for now
        }
      } else {
        // Mock connection for testing
        setAccount('0x1234...5678');
        setIsConnected(true);
        setBalance('1,250.50');
      }
    } catch (error) {
      console.error('Connection error:', error);
      alert('Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAccount(null);
    setBalance('0.00');
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setShowCityModal(false);
    try {
      localStorage.setItem('selectedCity', city);
    } catch (error) {
      console.error('Storage error:', error);
    }
  };

  // Load saved city on mount
  React.useEffect(() => {
    try {
      const savedCity = localStorage.getItem('selectedCity');
      if (savedCity) {
        setSelectedCity(savedCity);
      }
    } catch (error) {
      console.error('Storage error:', error);
    }
  }, []);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const nearbyTraders = [
    { name: 'Priya Sharma', rating: 4.9, trades: 180, price: 87.06, available: 750 },
    { name: 'Rahul Kumar', rating: 4.8, trades: 156, price: 87.15, available: 1200 },
    { name: 'Amit Singh', rating: 4.7, trades: 234, price: 87.25, available: 950 },
    { name: 'Sneha Patel', rating: 4.9, trades: 298, price: 86.95, available: 2000 }
  ];

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
          <button 
            className="connect-btn-small" 
            onClick={connectWallet}
            disabled={isConnecting}
          >
            {isConnecting ? 'Connecting...' : 'Connect'}
          </button>
        </div>
      ) : (
        <div className="wallet-connected-card">
          <div className="wallet-icon">
            <span>✅</span>
          </div>
          <div className="connect-content">
            <h3>Wallet Connected</h3>
            <p>{account ? formatAddress(account) : 'Connected'}</p>
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
            {isConnected ? `${balance} ${selectedToken}` : `0.00 ${selectedToken}`}
          </span>
          <span className="usd-equivalent">
            ≈ ${isConnected ? balance : '0.00'} USD
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
            {nearbyTraders.map((trader, index) => (
              <div key={index} className="trader-ad-card">
                <div className="trader-header">
                  <div className="trader-info">
                    <div className="trader-name-section">
                      <span className="trader-name">{trader.name}</span>
                      <div className="trader-rating">
                        <span className="star">⭐</span>
                        <span className="rating-value">{trader.rating}</span>
                        <span className="trades-count">({trader.trades})</span>
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
                      📉 Selling {selectedToken}
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
                    <div className="price-value">₹{trader.price.toFixed(2)}</div>
                  </div>
                  <div className="available-section">
                    <div className="available-label">Available</div>
                    <div className="available-value">{trader.available.toFixed(2)} {selectedToken}</div>
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
                    Buy {selectedToken}
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
      </div>

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
            
            <div className="modal-content">
              <p className="modal-description">
                Choose your city to find nearby traders in your area
              </p>
              
              <div className="cities-grid">
                {cities.map((city) => (
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
      )}
    </div>
  );
};

// Other Simple Components
const SimpleTrades: React.FC = () => (
  <div className="trades-container">
    <div className="trades-not-connected">
      <div className="not-connected-icon">📊</div>
      <h3>Trading History</h3>
      <p>Your trading history will appear here</p>
    </div>
  </div>
);

const SimpleP2P: React.FC = () => (
  <div className="p2p-trading-container">
    <div className="empty-traders">
      <div className="empty-icon">🤝</div>
      <h3>P2P Trading</h3>
      <p>P2P trading features coming soon</p>
    </div>
  </div>
);

const SimpleWallet: React.FC = () => (
  <div className="wallet-section">
    <h2>💳 Wallet</h2>
    <p>Advanced wallet features coming soon</p>
  </div>
);

const SimpleProfile: React.FC = () => (
  <div className="profile-container">
    <div className="profile-not-connected">
      <div className="not-connected-icon">👤</div>
      <h3>Profile</h3>
      <p>User profile features coming soon</p>
    </div>
  </div>
);

// Bottom Navigation
const BottomNavigation: React.FC<{
  activeTab: string;
  onTabChange: (tab: string) => void;
}> = ({ activeTab, onTabChange }) => {
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
    try {
      switch (activeTab) {
        case 'dashboard':
          return <SimpleDashboard />;
        case 'trades':
          return <SimpleTrades />;
        case 'p2p':
          return <SimpleP2P />;
        case 'wallet':
          return <SimpleWallet />;
        case 'profile':
          return <SimpleProfile />;
        default:
          return <SimpleDashboard />;
      }
    } catch (error) {
      console.error('Error rendering content:', error);
      return (
        <div style={{ 
          padding: '2rem', 
          textAlign: 'center',
          background: '#fff',
          borderRadius: '15px',
          margin: '1rem'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚠️</div>
          <h3>Content Error</h3>
          <p>Please try switching tabs</p>
        </div>
      );
    }
  };

  return (
    <ErrorBoundary>
      <div className="App">
        <header className="app-header">
          <div className="header-content">
            <h1>ZedTrust Dashboard</h1>
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
    </ErrorBoundary>
  );
}

export default App;