import React, { useState } from 'react';
import './App.css';

// Simple components without external dependencies
const Dashboard = () => {
  return (
    <div className="dashboard-container">
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
        <p>Your Web3 P2P Trading Platform</p>
      </div>

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

      <div className="token-balance-card">
        <div className="balance-header">
          <div className="balance-title-section">
            <span className="balance-title">USDC Balance</span>
          </div>
        </div>
        <div className="balance-amount">
          <span className="main-amount">0.00 USDC</span>
          <span className="usd-equivalent">≈ $0.00 USD</span>
        </div>
      </div>

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
    </div>
  );
};

const Trades = () => {
  return (
    <div className="trades-container">
      <div className="trades-not-connected">
        <div className="not-connected-icon">📊</div>
        <h3>Trading History</h3>
        <p>Your trading history will appear here</p>
      </div>
    </div>
  );
};

const P2PTrading = () => {
  return (
    <div className="p2p-container">
      <div className="p2p-header">
        <h2>P2P Trading</h2>
        <p>Buy and sell crypto with other users</p>
      </div>
      <div className="p2p-not-connected">
        <div className="not-connected-icon">🤝</div>
        <h3>P2P Trading</h3>
        <p>Connect wallet to start P2P trading</p>
      </div>
    </div>
  );
};

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="profile-not-connected">
        <div className="not-connected-icon">👤</div>
        <h3>User Profile</h3>
        <p>Connect wallet to access profile settings</p>
      </div>
    </div>
  );
};

const Wallet = () => {
  return (
    <div className="wallet-section">
      <h2>💳 Wallet</h2>
      <p>Wallet features coming soon</p>
    </div>
  );
};

const BottomNavigation = ({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) => {
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