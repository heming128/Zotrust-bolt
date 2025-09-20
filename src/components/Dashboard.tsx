import React from 'react';
import { useWeb3 } from '../hooks/useWeb3';

const Dashboard: React.FC = () => {
  const { account, isConnected, balance, connectWallet } = useWeb3();

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
          <div className="connected-indicator">
            <span className="green-dot"></span>
          </div>
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
        {!isConnected && (
          <button className="connect-wallet-btn" onClick={connectWallet}>
            <span>🔗</span>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
};

export default Dashboard;