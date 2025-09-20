import React from 'react';
import { useState } from 'react';
import Dashboard from './components/Dashboard';
import P2PTrading from './components/P2PTrading';
import BottomNavigation from './components/BottomNavigation';
import { useWeb3 } from './hooks/useWeb3';
import './App.css';

function App() {
  const { isConnected } = useWeb3();
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'p2p':
        return <P2PTrading />;
      case 'trades':
        return (
          <div className="trades-section">
            <h2>📊 Trading History</h2>
            <p>Your trading history will appear here</p>
          </div>
        );
      case 'wallet':
        return (
          <div className="wallet-section">
            <h2>💳 Wallet</h2>
            <p>Wallet features coming soon</p>
          </div>
        );
      case 'profile':
        return (
          <div className="profile-section">
            <h2>👤 Profile</h2>
            <p>Profile settings coming soon</p>
          </div>
        );
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