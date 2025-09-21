import React from 'react';
import { useState } from 'react';
import Dashboard from './components/Dashboard';
import Trades from './components/Trades';
import P2PTrading from './components/P2PTrading';
import Profile from './components/Profile';
import BottomNavigation from './components/BottomNavigation';
import { useWeb3 } from './hooks/useWeb3';

interface UserAd {
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
  adType: 'buy' | 'sell';
  token: string;
}

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userAds, setUserAds] = useState<UserAd[]>([]);

  const handleAddUserAd = (newAd: UserAd) => {
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