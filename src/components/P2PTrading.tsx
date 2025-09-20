import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../hooks/useWeb3';
import PostAdModal from './PostAdModal';

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
  const [selectedToken, setSelectedToken] = useState('USDC');
  const [selectedPayment, setSelectedPayment] = useState('Payment');
  const [amount, setAmount] = useState('');
  const [showTraderDetails, setShowTraderDetails] = useState(false);
  const [selectedTrader, setSelectedTrader] = useState<Trader | null>(null);
  const [showPostAdModal, setShowPostAdModal] = useState(false);

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
      token: 'USDC'
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
      token: 'USDC'
    }
  ];

  // Filter traders based on active tab
  // If user is on "buy" tab, show "sell" ads (users who want to sell)
  // If user is on "sell" tab, show "buy" ads (users who want to buy)
  const getFilteredTraders = () => {
    const allTraders = [...baseTraders, ...userAds];
    const targetAdType = activeTab === 'buy' ? 'sell' : 'buy';
    return allTraders.filter(trader => trader.adType === targetAdType);
  };

  const traders = getFilteredTraders();

  const handleTraderClick = (trader: Trader) => {
    setSelectedTrader(trader);
    setShowTraderDetails(true);
  };

  const handleAdCreated = (newAd: Trader) => {
    if (onAddUserAd) {
      onAddUserAd(newAd);
    }
  };
  return (
    <div className="p2p-trading-container">
      {/* Header with Buy/Sell Tabs */}
      <div className="p2p-header">
        <div className="trading-tabs">
          <button 
            className={`tab-btn ${activeTab === 'buy' ? 'active buy' : ''}`}
            onClick={() => setActiveTab('buy')}
          >
            <span className="tab-icon">📈</span>
            <div>
              <div className="tab-title">Buy USDC</div>
              <div className="tab-subtitle">Find sellers</div>
            </div>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'sell' ? 'active sell' : ''}`}
            onClick={() => setActiveTab('sell')}
          >
            <span className="tab-icon">📉</span>
            <div>
              <div className="tab-title">Sell USDC</div>
              <div className="tab-subtitle">Find buyers</div>
            </div>
          </button>
        </div>
      </div>

      {/* Market Overview Card */}
      <div className="market-overview-card">
        <div className="market-header">
          <span className="market-title">Market Overview</span>
          <div className="token-selector">
            <span>USDC</span>
            <span className="dropdown-arrow">▼</span>
          </div>
        </div>
        
        <div className="market-stats">
          <div className="stat-item">
            <div className="stat-label">📈 Best Buy Price</div>
            <div className="stat-value buy-price">₹{marketData.bestBuyPrice}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">📉 Best Sell Price</div>
            <div className="stat-value sell-price">₹{marketData.bestSellPrice}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">📊 24h Volume</div>
            <div className="stat-value">₹{marketData.volume24h}Cr</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">📋 Active Orders</div>
            <div className="stat-value">{marketData.activeOrders.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Trading Controls */}
      <div className="trading-controls">
        <div className="control-buttons">
          <button className="payment-btn">
            {selectedPayment} <span className="dropdown-arrow">▼</span>
          </button>
          <button className="amount-btn">Amount</button>
          <button 
            className="post-ad-btn"
            onClick={() => setShowPostAdModal(true)}
          >
            + Post Ad
          </button>
        </div>
        
        <div className="buy-sell-buttons">
          <button className={`trade-btn buy-btn ${activeTab === 'buy' ? 'active' : ''}`}>
            Buy USDC
          </button>
          <button className={`trade-btn sell-btn ${activeTab === 'sell' ? 'active' : ''}`}>
            Sell USDC
          </button>
        </div>
      </div>

      {/* Traders List */}
      <div className="traders-grid">
        {traders.map((trader) => (
          <div 
            key={trader.id} 
            className="trader-ad-card"
            onClick={() => handleTraderClick(trader)}
          >
            <div className="trader-header">
              <div className="trader-info">
                <div className="trader-name-section">
                  <span className="trader-name">{trader.name}</span>
                  <div className="trader-rating">
                    <span className="star">⭐</span>
                    <span className="rating-value">{trader.rating}</span>
                    <span className="trades-count">({trader.totalTrades})</span>
                  </div>
                </div>
                <div className={`online-status ${trader.isOnline ? 'online' : 'offline'}`}>
                  <span className="status-dot"></span>
                  {trader.isOnline ? 'Online' : 'Offline'}
                </div>
              </div>
            </div>

            <div className="ad-details">
              <div className="ad-type-badge">
                <span className={`ad-type ${trader.adType}`}>
                  {trader.adType === 'buy' ? '📈 Buying' : '📉 Selling'} {trader.token || 'USDC'}
                </span>
              </div>
              
              <div className="location-distance">
                <span className="location">📍 {trader.location}</span>
                <span className="distance">2.5 km away</span>
              </div>
            </div>

            <div className="trader-details">
            </div>

            <div className="trading-info">
              <div className="price-section">
                <div className="price-label">Price</div>
                <div className="price-value">₹{trader.price.toFixed(2)}</div>
              </div>
              <div className="available-section">
                <div className="available-label">Available</div>
                <div className="available-value">{trader.available.toFixed(2)} USDC</div>
              </div>
            </div>

            <div className="payment-methods">
              <span className="payment-label">Payment:</span>
              <div className="payment-tags">
                {trader.paymentMethods.slice(0, 2).map((method, index) => (
                  <span key={index} className="payment-tag">{method}</span>
                ))}
                {trader.paymentMethods.length > 2 && (
                  <span className="payment-tag more">+{trader.paymentMethods.length - 2}</span>
                )}
              </div>
            </div>

            <div className="action-buttons">
              <button className={`trade-btn ${trader.adType === 'buy' ? 'sell-to-buyer' : 'buy-from-seller'}`}>
                {trader.adType === 'buy' ? `Sell ${trader.token || 'USDC'}` : `Buy ${trader.token || 'USDC'}`}
              </button>
              <button className="message-btn">💬</button>
            </div>
          </div>
        ))}
      </div>

      {/* Trader Details Modal */}
      {showTraderDetails && selectedTrader && (
        <div className="modal-overlay" onClick={() => setShowTraderDetails(false)}>
          <div className="trader-details-modal" onClick={(e) => e.stopPropagation()}>
            <div key={selectedTrader.id} className="trader-ad-card">
              <div className="trader-header">
                <div className="trader-info">
                  <div className="trader-name-section">
                    <span className="trader-name">{selectedTrader.name}</span>
                    <div className="trader-rating">
                      <span className="star">⭐</span>
                      <span className="rating-value">{selectedTrader.rating}</span>
                      <span className="trades-count">({selectedTrader.totalTrades})</span>
                    </div>
                  </div>
                  <div className={`online-status ${selectedTrader.isOnline ? 'online' : 'offline'}`}>
                    <span className="status-dot"></span>
                    {selectedTrader.isOnline ? 'Online' : 'Offline'}
                  </div>
                </div>
              </div>

              <div className="ad-details">
                <div className="ad-type-badge">
                  <span className={`ad-type ${selectedTrader.adType}`}>
                    {selectedTrader.adType === 'buy' ? '📈 Buying' : '📉 Selling'} {selectedTrader.token || 'USDC'}
                  </span>
                </div>
                
                <div className="location-distance">
                  <span className="location">📍 {selectedTrader.location}</span>
                  <span className="distance">2.5 km away</span>
                </div>
              </div>

              <div className="trading-info">
                <div className="price-section">
                  <div className="price-label">Price</div>
                  <div className="price-value">₹{selectedTrader.price.toFixed(2)}</div>
                </div>
                <div className="available-section">
                  <div className="available-label">Available</div>
                  <div className="available-value">{selectedTrader.available.toFixed(2)} {selectedTrader.token || 'USDC'}</div>
                </div>
              </div>

              <div className="payment-methods">
                <span className="payment-label">Payment:</span>
                <div className="payment-tags">
                  {selectedTrader.paymentMethods.slice(0, 2).map((method, index) => (
                    <span key={index} className="payment-tag">{method}</span>
                  ))}
                  {selectedTrader.paymentMethods.length > 2 && (
                    <span className="payment-tag more">+{selectedTrader.paymentMethods.length - 2}</span>
                  )}
                </div>
              </div>

              <div className="action-buttons">
                <button className={`trade-btn ${selectedTrader.adType === 'buy' ? 'sell-to-buyer' : 'buy-from-seller'}`}>
                  {selectedTrader.adType === 'buy' ? `Sell ${selectedTrader.token || 'USDC'}` : `Buy ${selectedTrader.token || 'USDC'}`}
                </button>
                <button className="message-btn">💬</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Post Ad Modal */}
      <PostAdModal 
        isOpen={showPostAdModal}
        onClose={() => setShowPostAdModal(false)}
        onAdCreated={handleAdCreated}
      />
    </div>
  );
};

export default P2PTrading;