import React, { useState } from 'react';
import './App.css';

// Simple Dashboard Component - No external dependencies
const Dashboard: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [showCityModal, setShowCityModal] = useState(false);

  const handleConnect = () => {
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setShowCityModal(false);
  };

  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad'];

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
          <button className="connect-btn-small" onClick={handleConnect}>
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
            <p>0x1234...5678</p>
          </div>
          <button className="disconnect-btn-small" onClick={handleDisconnect}>
            Disconnect
          </button>
        </div>
      )}

      {/* USDC Balance Card */}
      <div className="token-balance-card">
        <div className="balance-header">
          <div className="balance-title-section">
            <span className="balance-title">USDC Balance</span>
          </div>
          <button className="refresh-button">
            <span>🔄</span>
          </button>
        </div>
        <div className="balance-amount">
          <span className="main-amount">
            {isConnected ? '1,250.00 USDC' : '0.00 USDC'}
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
            {[
              { name: 'Priya Sharma', rating: 4.9, trades: 180, price: 87.06, available: 750 },
              { name: 'Rahul Kumar', rating: 4.8, trades: 156, price: 87.15, available: 1200 },
              { name: 'Amit Singh', rating: 4.7, trades: 234, price: 87.25, available: 950 },
              { name: 'Sneha Patel', rating: 4.9, trades: 298, price: 86.95, available: 2000 }
            ].map((trader, index) => (
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
                      📉 Selling USDC
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
                    <div className="available-value">{trader.available.toFixed(2)} USDC</div>
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
                    Buy USDC
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

// Simple Trades Component
const Trades: React.FC = () => {
  return (
    <div className="trades-container">
      <div className="trades-not-connected">
        <div className="not-connected-icon">📊</div>
        <h3>Trading History</h3>
        <p>Your trading history will appear here</p>
        
        <div style={{ marginTop: '2rem' }}>
          <div className="trading-statistics-card">
            <div className="stats-header">
              <div className="stats-icon">📊</div>
              <div className="stats-title">
                <h3>Trading Statistics</h3>
                <p>Your trading performance overview</p>
              </div>
            </div>
            
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-icon">💰</div>
                <div className="stat-content">
                  <div className="stat-label">Total Volume</div>
                  <div className="stat-value">$8,250</div>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-icon">📈</div>
                <div className="stat-content">
                  <div className="stat-label">Success Rate</div>
                  <div className="stat-value success-rate">83.3%</div>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-icon">🔄</div>
                <div className="stat-content">
                  <div className="stat-label">Total Trades</div>
                  <div className="stat-value">6</div>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-icon">⭐</div>
                <div className="stat-content">
                  <div className="stat-label">Rating</div>
                  <div className="stat-value">4.9</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple P2P Component
const P2PTrading: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [selectedToken, setSelectedToken] = useState<'USDC' | 'USDT'>('USDC');

  return (
    <div className="p2p-trading-container">
      {/* Header with Buy/Sell Tabs */}
      <div className="p2p-header">
        <div className="trading-tabs">
          <button 
            className={`tab-btn ${activeTab === 'buy' ? 'active buy' : ''}`}
            onClick={() => setActiveTab('buy')}
          >
            <span className="tab-icon">📈</span>
            <div>
              <div className="tab-title">Buy {selectedToken}</div>
              <div className="tab-subtitle">Find sellers</div>
            </div>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'sell' ? 'active sell' : ''}`}
            onClick={() => setActiveTab('sell')}
          >
            <span className="tab-icon">📉</span>
            <div>
              <div className="tab-title">Sell {selectedToken}</div>
              <div className="tab-subtitle">Find buyers</div>
            </div>
          </button>
        </div>
      </div>

      {/* Market Overview */}
      <div className="market-overview-card">
        <div className="market-header">
          <span className="market-title">Market Overview</span>
          <div className="token-selector">
            <button 
              className="token-selector-btn"
              onClick={() => setSelectedToken(selectedToken === 'USDC' ? 'USDT' : 'USDC')}
            >
              <span className="token-icon">{selectedToken === 'USDC' ? '🔵' : '🟢'}</span>
              <span>{selectedToken}</span>
              <span className="dropdown-arrow">▼</span>
            </button>
          </div>
        </div>
        
        <div className="market-stats">
          <div className="stat-item">
            <div className="stat-label">📈 Best Buy Price</div>
            <div className="stat-value buy-price">₹87.99</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">📉 Best Sell Price</div>
            <div className="stat-value sell-price">₹88.35</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">📊 24h Volume</div>
            <div className="stat-value">₹10.02Cr</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">📋 Active Orders</div>
            <div className="stat-value">1,547</div>
          </div>
        </div>
      </div>

      {/* Trading Controls */}
      <div className="trading-controls">
        <div className="control-buttons">
          <button className="payment-btn">
            Payment <span className="dropdown-arrow">▼</span>
          </button>
          <button className="amount-btn">Amount</button>
          <button className="post-ad-btn">+ Post Ad</button>
        </div>
      </div>

      {/* Empty State */}
      <div className="empty-traders">
        <div className="empty-icon">🔍</div>
        <h3>No {activeTab === 'buy' ? 'Sellers' : 'Buyers'} Found</h3>
        <p>
          {activeTab === 'buy' 
            ? `No one is selling ${selectedToken} right now.` 
            : `No one is buying ${selectedToken} right now.`
          }
        </p>
        <button className="post-ad-btn">
          + Post Your Ad
        </button>
      </div>
    </div>
  );
};

// Simple Wallet Component
const SimpleWallet: React.FC = () => {
  return (
    <div className="wallet-section">
      <h2>💳 Wallet</h2>
      <p>Advanced wallet features coming soon</p>
      <div style={{ 
        background: '#f9fafb', 
        padding: '2rem', 
        borderRadius: '15px',
        textAlign: 'center',
        marginTop: '1rem'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
        <h3>Coming Soon</h3>
        <p>Advanced wallet management features will be available here</p>
      </div>
    </div>
  );
};

// Simple Profile Component
const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    mobile: '+91 9876543210',
    isVerified: true
  });

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-avatar">
          <span className="avatar-icon">👤</span>
        </div>
        <div className="profile-info">
          <h2>Your Profile</h2>
          <p className="wallet-address">0x1234...5678</p>
        </div>
        {profile.isVerified && (
          <div className="verification-badge">
            <span className="verified-icon">✅</span>
            <span>Verified</span>
          </div>
        )}
      </div>

      {/* Profile Form */}
      <div className="profile-form-card">
        <div className="form-header">
          <h3>Personal Information</h3>
          <button className="edit-btn" onClick={() => setIsEditing(!isEditing)}>
            <span>✏️</span>
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>

        <div className="profile-form">
          <div className="form-group">
            <label>Full Name</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="profile-input"
              />
            ) : (
              <div className="profile-display">{profile.name}</div>
            )}
          </div>

          <div className="form-group">
            <label>Mobile Number</label>
            {isEditing ? (
              <input
                type="tel"
                value={profile.mobile}
                onChange={(e) => setProfile({...profile, mobile: e.target.value})}
                className="profile-input"
              />
            ) : (
              <div className="profile-display">
                {profile.mobile}
                {profile.isVerified && (
                  <div className="verification-status">
                    <span className="verified-text">✅ Verified</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Trading Stats */}
      <div className="trading-stats-card">
        <h3>Trading Statistics</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-value">12</div>
            <div className="stat-label">Total Trades</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">95%</div>
            <div className="stat-label">Success Rate</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">3</div>
            <div className="stat-label">Active Ads</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">Pro</div>
            <div className="stat-label">Trader Level</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Bottom Navigation Component
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

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App Error:', error, errorInfo);
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
          <h1 style={{ color: '#dc2626', marginBottom: '1rem' }}>Something went wrong</h1>
          <p style={{ color: '#666', marginBottom: '2rem' }}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button 
            onClick={() => {
              this.setState({ hasError: false, error: undefined });
              window.location.reload();
            }}
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

// Main App Component
function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    try {
      switch (activeTab) {
        case 'dashboard':
          return <Dashboard />;
        case 'trades':
          return <Trades />;
        case 'p2p':
          return <P2PTrading />;
        case 'wallet':
          return <SimpleWallet />;
        case 'profile':
          return <Profile />;
        default:
          return <Dashboard />;
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
          <h3>Content Loading Error</h3>
          <p>Please try switching tabs or refresh the page</p>
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