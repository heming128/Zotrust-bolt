import React from 'react';
import { useWeb3 } from '../hooks/useWeb3';

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
  } = useWeb3();

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
            <span className="balance-title">USDC Balance</span>
          </div>
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
            {isLoadingBalances ? 'Loading...' : `${tokenBalances.USDC} USDC`}
          </span>
          <span className="usd-equivalent">
            ≈ ${isLoadingBalances ? '0.00' : tokenBalances.USDC} USD
          </span>
        </div>
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
    </div>
  );
};

export default Dashboard;