import React, { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Trades from './components/Trades';
import P2PTrading from './components/P2PTrading';
import Profile from './components/Profile';
import BottomNavigation from './components/BottomNavigation';

// Simple Wallet Component for fallback
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

// Main App Component with Error Boundary
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
  const [userAds, setUserAds] = useState<any[]>([]);

  const handleAddUserAd = (newAd: any) => {
    setUserAds(prev => [...prev, newAd]);
  };

  const renderContent = () => {
    try {
      switch (activeTab) {
        case 'dashboard':
          return <Dashboard />;
        case 'trades':
          return <Trades />;
        case 'p2p':
          return (
            <P2PTrading 
              userAds={userAds}
              onAddUserAd={handleAddUserAd}
            />
          );
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
    </ErrorBoundary>
  );
}

export default App;