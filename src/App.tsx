import React, { useState } from 'react';
import './App.css';

// Simple Dashboard Component
const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      {/* Connect Wallet Card */}
      <div className="connect-wallet-card">
        <div className="wallet-icon">
          <span>💳</span>
        </div>
        <div className="connect-content">
          <h3>Connect Wallet</h3>
          <p>Connect to start trading</p>
        </div>
        <button className="connect-btn-small">
          Connect
        </button>
      </div>

      {/* Token Balance Card */}
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
          <span className="main-amount">0.00 USDC</span>
          <span className="usd-equivalent">≈ $0.00 USD</span>
        </div>
      </div>

      {/* Add City Card */}
      <div className="add-city-card">
        <div className="location-pin">
          <span>📍</span>
        </div>
        <div className="city-content">
          <h3>Add Your City</h3>
          <p>Please select your city to find nearby active traders in your area.</p>
        </div>
        <button className="select-city-button">
          <span>🏢</span>
          Select City
        </button>
      </div>

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
        <button className="connect-wallet-btn">
          <span>🔗</span>
          Connect Wallet
        </button>
      </div>
    </div>
  );
};

// Simple Trades Component
const Trades: React.FC = () => {
  return (
    <div className="trades-container">
      <div className="trades-not-connected">
        <div className="not-connected-icon">🔒</div>
        <h3>Wallet Not Connected</h3>
        <p>Please connect your wallet to view your trading history</p>
      </div>
    </div>
  );
};

// Simple P2P Component
const P2PTrading: React.FC = () => {
  return (
    <div className="p2p-trading-container">
      <div className="p2p-header">
        <div className="trading-tabs">
          <button className="tab-btn active buy">
            <span className="tab-icon">📈</span>
            <div>
              <div className="tab-title">Buy USDC</div>
              <div className="tab-subtitle">Find sellers</div>
            </div>
          </button>
          <button className="tab-btn">
            <span className="tab-icon">📉</span>
            <div>
              <div className="tab-title">Sell USDC</div>
              <div className="tab-subtitle">Find buyers</div>
            </div>
          </button>
        </div>
      </div>

      <div className="empty-traders">
        <div className="empty-icon">🔍</div>
        <h3>No Sellers Found</h3>
        <p>No one is selling USDC right now.</p>
        <button className="post-ad-btn">
          + Post Your Ad
        </button>
      </div>
    </div>
  );
};

// Simple Profile Component
const Profile: React.FC = () => {
  return (
    <div className="profile-container">
      <div className="profile-not-connected">
        <div className="not-connected-icon">🔒</div>
        <h3>Wallet Not Connected</h3>
        <p>Please connect your wallet to access profile settings</p>
      </div>
    </div>
  );
};

// Bottom Navigation Component
const BottomNavigation: React.FC<{ activeTab: string; onTabChange: (tab: string) => void }> = ({ 
  activeTab, 
  onTabChange 
}) => {
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
        return (
          <div className="wallet-section">
            <h2>💳 Wallet</h2>
            <p>Wallet features coming soon</p>
          </div>
        );
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
          <h1>ZoTrust Dashboard</h1>
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