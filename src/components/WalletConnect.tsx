import React from 'react';
import { useWeb3 } from '../hooks/useWeb3';

const WalletConnect: React.FC = () => {
  const { 
    account, 
    chainId, 
    balance, 
    isConnected, 
    isConnecting, 
    error, 
    connectWallet, 
    disconnectWallet 
  } = useWeb3();

  const getNetworkName = (chainId: number | null) => {
    switch (chainId) {
      case 1: return 'Ethereum Mainnet';
      case 56: return 'BSC Mainnet';
      case 137: return 'Polygon';
      case 5: return 'Goerli Testnet';
      case 97: return 'BSC Testnet';
      default: return `Chain ID: ${chainId}`;
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (isConnected && account) {
    return (
      <div className="wallet-connected">
        <div className="wallet-info">
          <div className="account-info">
            <div className="account-address">
              <span className="address-label">Account:</span>
              <span className="address-value">{formatAddress(account)}</span>
            </div>
            <div className="network-info">
              <span className="network-label">Network:</span>
              <span className="network-value">{getNetworkName(chainId)}</span>
            </div>
            <div className="balance-info">
              <span className="balance-label">Balance:</span>
              <span className="balance-value">{parseFloat(balance || '0').toFixed(4)} ETH</span>
            </div>
          </div>
          <button 
            className="disconnect-btn"
            onClick={disconnectWallet}
          >
            Disconnect
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="wallet-connect">
      <div className="connect-container">
        <h3>Connect Your Wallet</h3>
        <p>Connect with TrustWallet, MetaMask, or any Web3 wallet</p>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <button 
          className="connect-btn"
          onClick={connectWallet}
          disabled={isConnecting}
        >
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
        
        <div className="supported-wallets">
          <p>Supported wallets:</p>
          <div className="wallet-icons">
            <span>🦊 MetaMask</span>
            <span>🛡️ TrustWallet</span>
            <span>🌈 Rainbow</span>
            <span>💙 Coinbase</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletConnect;