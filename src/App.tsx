import React, { useState } from 'react';
import WalletConnect from './components/WalletConnect';
import DAppInterface from './components/DAppInterface';
import BottomNavigation from './components/BottomNavigation';
import Dashboard from './components/Dashboard';
import P2PTrading from './components/P2PTrading';
import Trades from './components/Trades';
import Profile from './components/Profile';
import './App.css';

interface Trader {
  id: string;
  name: string;
  rating: number;
  totalTrades: number;
  isOnline: boolean;
  branch: string;
  location: string;
  price: number;
  available: number;
  limit: {
    min: number;
    max: number;
  };
  paymentMethods: string[];
  adType?: 'buy' | 'sell';
  token?: string;
}

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userAds, setUserAds] = useState<Trader[]>([]);

  const handleAddUserAd = (newAd: Trader) => {
    setUserAds(prev => [...prev, newAd]);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'trades':
        return <Trades />;
      case 'p2p':
        return <P2PTrading userAds={userAds} onAddUserAd={handleAddUserAd} />;
      case 'wallet':
        return (
          <div className="wallet-section">
            <WalletConnect />
            <DAppInterface />
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
          <h1>ZedTrust DApp</h1>
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