import React from 'react';
import WalletConnect from './components/WalletConnect';
import DAppInterface from './components/DAppInterface';
import { useWeb3 } from './hooks/useWeb3';
import './App.css';

function App() {
  const { isConnected } = useWeb3();

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1>🔐 ZedTrust DApp</h1>
          <p>Web3 Application for TrustWallet & MetaMask</p>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <WalletConnect />
          {isConnected && <DAppInterface />}
        </div>
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <p>🌐 Compatible with TrustWallet DApp Browser</p>
          <div className="compatibility-badges">
            <span className="badge">TrustWallet ✅</span>
            <span className="badge">MetaMask ✅</span>
            <span className="badge">Web3 Ready ✅</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;