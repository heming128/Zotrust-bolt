import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../hooks/useWeb3';
import PostAdModal from './PostAdModal';
import CityModal from './CityModal';

interface MarketData {
  bestBuyPrice: number;
  bestSellPrice: number;
  volume24h: number;
  activeOrders: number;
}

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

interface P2PTradingProps {
  userAds?: Trader[];
  onAddUserAd?: (ad: Trader) => void;
}

const P2PTrading: React.FC<P2PTradingProps> = ({ userAds = [], onAddUserAd }) => {
  const { account, isConnected } = useWeb3();
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [selectedToken, setSelectedToken] = useState<'USDC' | 'USDT'>('USDC');
  const [showPostAdModal, setShowPostAdModal] = useState(false);
  const [showCityModal, setShowCityModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Mumbai');

  const marketData: MarketData = {
    bestBuyPrice: 87.99,
    bestSellPrice: 88.35,
    volume24h: 10.02,
    activeOrders: 1547
  };

  const baseTraders: Trader[] = [
    {
      id: '1',
      name: 'Priya Sharma',
      rating: 4.9,
      totalTrades: 180,
      isOnline: true,
      branch: 'Agent Branch',
      location: 'TrustMaster — Bandra West | Andheri East',
      price: 87.06,
      available: 750.00,
      limit: { min: 3500, max: 6000 },
      paymentMethods: ['UPI Transfer', 'Bank Transfer'],
      adType: 'sell',
      token: 'USDC'
    },
    {
      id: '2',
      name: 'Rahul Kumar',
      rating: 4.8,
      totalTrades: 156,
      isOnline: true,
      branch: 'Agent Branch',
      location: 'CryptoHub — Mumbai Central | Dadar',
      price: 87.15,
      available: 1200.00,
      limit: { min: 2000, max: 8000 },
      paymentMethods: ['UPI Transfer', 'IMPS'],
      adType: 'sell',
      token: 'USDT'
    },
    {
      id: '3',
      name: 'Amit Singh',
      rating: 4.7,
      totalTrades: 234,
      isOnline: false,
      branch: 'Agent Branch',
      location: 'BlockTrade — Powai | Vikhroli',
      price: 87.25,
      available: 950.00,
      limit: { min: 5000, max: 10000 },
      paymentMethods: ['Bank Transfer', 'UPI Transfer'],
      adType: 'buy',
      token: 'USDT'
    },
    {
      id: '4',
      name: 'Sneha Patel',
      rating: 4.9,
      totalTrades: 298,
      isOnline: true,
      branch: 'Agent Branch',
      location: 'CryptoTrade — Andheri | Bandra',
      price: 86.95,
      available: 2000.00,
      limit: { min: 1000, max: 15000 },
      paymentMethods: ['UPI Transfer', 'PhonePe', 'GPay'],
      adType: 'buy',
      token: 'USDC'
    }
  ];

  // Filter traders based on active tab
  const getFilteredTraders = () => {
    const allTraders = [...baseTraders, ...userAds];
    const targetAdType = activeTab === 'buy' ? 'sell' : 'buy';
    return allTraders.filter(trader => 
      trader.adType === targetAdType && trader.token === selectedToken
    );
  };

  const traders = getFilteredTraders();

  const handleTradeClick = (trader: Trader, action: 'buy' | 'sell') => {
    if (!isConnected) {
      alert('Please connect your wallet first!');
      return;
    }
    
    // Simple alert with trader info
    alert(`🎯 Trade Request\n\nTrader: ${trader.name}\nAction: ${action.toUpperCase()} ${selectedToken}\nPrice: ₹${trader.price}\nAvailable: ${trader.available} ${selectedToken}\nLimit: ₹${trader.limit.min} - ₹${trader.limit.max}\n\n✅ Trade request would be sent!`);
  };

  const handleAdCreated = (newAd: Trader) => {
    if (onAddUserAd) {
      onAddUserAd(newAd);
    }
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ margin: '0 0 10px 0', color: '#333' }}>P2P Trading</h2>
        <p style={{ margin: '0', color: '#666' }}>Trade directly with other users</p>
      </div>

      {/* Buy/Sell Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '20px',
        backgroundColor: '#fff',
        padding: '10px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <button 
          onClick={() => setActiveTab('buy')}
          style={{
            flex: 1,
            padding: '15px',
            border: 'none',
            borderRadius: '8px',
            backgroundColor: activeTab === 'buy' ? '#4CAF50' : '#f0f0f0',
            color: activeTab === 'buy' ? 'white' : '#333',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          📈 Buy {selectedToken}
        </button>
        <button 
          onClick={() => setActiveTab('sell')}
          style={{
            flex: 1,
            padding: '15px',
            border: 'none',
            borderRadius: '8px',
            backgroundColor: activeTab === 'sell' ? '#f44336' : '#f0f0f0',
            color: activeTab === 'sell' ? 'white' : '#333',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          📉 Sell {selectedToken}
        </button>
      </div>

      {/* Token Selection */}
      <div style={{ 
        backgroundColor: '#fff',
        padding: '15px',
        borderRadius: '10px',
        marginBottom: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h4 style={{ margin: '0 0 10px 0' }}>Select Token:</h4>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setSelectedToken('USDC')}
            style={{
              padding: '10px 20px',
              border: selectedToken === 'USDC' ? '2px solid #2196F3' : '1px solid #ddd',
              borderRadius: '8px',
              backgroundColor: selectedToken === 'USDC' ? '#e3f2fd' : 'white',
              cursor: 'pointer'
            }}
          >
            🔵 USDC
          </button>
          <button
            onClick={() => setSelectedToken('USDT')}
            style={{
              padding: '10px 20px',
              border: selectedToken === 'USDT' ? '2px solid #4CAF50' : '1px solid #ddd',
              borderRadius: '8px',
              backgroundColor: selectedToken === 'USDT' ? '#e8f5e8' : 'white',
              cursor: 'pointer'
            }}
          >
            🟢 USDT
          </button>
        </div>
      </div>

      {/* City Selection */}
      <div style={{ 
        backgroundColor: '#fff',
        padding: '15px',
        borderRadius: '10px',
        marginBottom: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h4 style={{ margin: '0 0 10px 0' }}>Location:</h4>
        <button
          onClick={() => setShowCityModal(true)}
          style={{
            padding: '10px 20px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          📍 {selectedCity}
        </button>
      </div>

      {/* Post Ad Button */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setShowPostAdModal(true)}
          style={{
            width: '100%',
            padding: '15px',
            border: 'none',
            borderRadius: '10px',
            backgroundColor: '#FF9800',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          + Post Your Ad
        </button>
      </div>

      {/* Traders List */}
      <div>
        <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>
          Available {activeTab === 'buy' ? 'Sellers' : 'Buyers'} ({traders.length})
        </h3>
        
        {traders.length === 0 ? (
          <div style={{
            backgroundColor: '#fff',
            padding: '40px',
            borderRadius: '10px',
            textAlign: 'center',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>🔍</div>
            <h3>No {activeTab === 'buy' ? 'Sellers' : 'Buyers'} Found</h3>
            <p>No one is {activeTab === 'buy' ? 'selling' : 'buying'} {selectedToken} in {selectedCity} right now.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {traders.map((trader) => (
              <div key={trader.id} style={{
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                {/* Trader Header */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '15px'
                }}>
                  <div>
                    <h4 style={{ margin: '0 0 5px 0' }}>{trader.name}</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span>⭐ {trader.rating}</span>
                      <span>({trader.totalTrades} trades)</span>
                      <span style={{ 
                        color: trader.isOnline ? '#4CAF50' : '#999',
                        fontWeight: 'bold'
                      }}>
                        {trader.isOnline ? '🟢 Online' : '⚫ Offline'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Trading Info */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '15px',
                  marginBottom: '15px'
                }}>
                  <div>
                    <div style={{ color: '#666', fontSize: '14px' }}>Price</div>
                    <div style={{ fontWeight: 'bold', fontSize: '18px' }}>₹{trader.price.toFixed(2)}</div>
                  </div>
                  <div>
                    <div style={{ color: '#666', fontSize: '14px' }}>Available</div>
                    <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{trader.available} {trader.token}</div>
                  </div>
                </div>

                {/* Limits */}
                <div style={{ marginBottom: '15px' }}>
                  <div style={{ color: '#666', fontSize: '14px' }}>Limits</div>
                  <div>₹{trader.limit.min.toLocaleString()} - ₹{trader.limit.max.toLocaleString()}</div>
                </div>

                {/* Payment Methods */}
                <div style={{ marginBottom: '15px' }}>
                  <div style={{ color: '#666', fontSize: '14px', marginBottom: '5px' }}>Payment Methods</div>
                  <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                    {trader.paymentMethods.map((method, index) => (
                      <span key={index} style={{
                        backgroundColor: '#f0f0f0',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px'
                      }}>
                        {method}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleTradeClick(trader, trader.adType === 'buy' ? 'sell' : 'buy')}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: 'none',
                    borderRadius: '8px',
                    backgroundColor: trader.adType === 'buy' ? '#f44336' : '#4CAF50',
                    color: 'white',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  {trader.adType === 'buy' ? `Sell ${trader.token}` : `Buy ${trader.token}`}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <PostAdModal 
        isOpen={showPostAdModal}
        onClose={() => setShowPostAdModal(false)}
        onAdCreated={handleAdCreated}
      />

      <CityModal
        isOpen={showCityModal}
        onClose={() => setShowCityModal(false)}
        onSelectCity={handleCitySelect}
      />
    </div>
  );
};

export default P2PTrading;