import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../hooks/useWeb3';
import PostAdModal from './PostAdModal';
import TradeRequestModal from './TradeRequestModal';

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
  const [selectedPayment, setSelectedPayment] = useState('Payment');
  const [amount, setAmount] = useState('');
  const [showTraderDetails, setShowTraderDetails] = useState(false);
  const [selectedTrader, setSelectedTrader] = useState<Trader | null>(null);
  const [showPostAdModal, setShowPostAdModal] = useState(false);
  const [showTokenDropdown, setShowTokenDropdown] = useState(false);
  const [showMarketStats, setShowMarketStats] = useState(false);
  const [showTradeRequestModal, setShowTradeRequestModal] = useState(false);
  const [selectedTraderForTrade, setSelectedTraderForTrade] = useState<Trader | null>(null);
  const [tradeAction, setTradeAction] = useState<'buy' | 'sell'>('buy');
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [selectedTraderForAmount, setSelectedTraderForAmount] = useState<Trader | null>(null);
  const [amountAction, setAmountAction] = useState<'buy' | 'sell'>('buy');

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
  // If user wants to "buy", show "sell" ads (people selling to you)
  // If user wants to "sell", show "buy" ads (people buying from you)
  const getFilteredTraders = () => {
    const allTraders = [...baseTraders, ...userAds];
    const targetAdType = activeTab === 'buy' ? 'sell' : 'buy';
    return allTraders.filter(trader => 
      trader.adType === targetAdType && trader.token === selectedToken
    );
  };

  const traders = getFilteredTraders();

  const handleTraderClick = (trader: Trader) => {
    setSelectedTrader(trader);
    setShowTraderDetails(true);
  };

  const handleTradeClick = (trader: Trader, action: 'buy' | 'sell') => {
    setSelectedTraderForAmount(trader);
    setAmountAction(action);
    setShowAmountModal(true);
  };

  const handleTradeRequestSubmit = (tradeData: any) => {
    // Here you would normally send the trade request to backend
    console.log('Trade Request Submitted:', {
      trader: selectedTraderForTrade,
      action: tradeAction,
      ...tradeData
    });
    
    // Show success message
    alert(`Trade request sent to ${selectedTraderForTrade?.name}!`);
    setShowTradeRequestModal(false);
    setSelectedTraderForTrade(null);
  };

  const handleAmountSubmit = (amount: string, paymentMethod: string) => {
    // Close amount modal and open trade request modal with pre-filled data
    setShowAmountModal(false);
    setSelectedTraderForTrade(selectedTraderForAmount);
    setTradeAction(amountAction);
    setShowTradeRequestModal(true);
  };
  const handleAdCreated = async (newAd: Trader) => {
    if (onAddUserAd) {
      onAddUserAd(newAd);
    }
  };

  const handlePostAdClick = () => {
    setShowPostAdModal(true);
  };

  const handleTokenSelect = (token: 'USDC' | 'USDT') => {
    setSelectedToken(token);
    setShowTokenDropdown(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showTokenDropdown && !target.closest('.token-selector')) {
        setShowTokenDropdown(false);
      }
    };

    if (showTokenDropdown) {
      document.addEventListener('click', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showTokenDropdown]);

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
              <div className="tab-title">Buy {selectedToken}</div>
              <div className="tab-subtitle">Find sellers</div>
            </div>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'sell' ? 'active sell' : ''}`}
            onClick={() => setActiveTab('sell')}
          >
            <span className="tab-icon">📉</span>
            <div>
              <div className="tab-title">Sell {selectedToken}</div>
              <div className="tab-subtitle">Find buyers</div>
            </div>
          </button>
        </div>
      </div>

      {/* Market Overview Card */}
      <div className="market-overview-card">
        <div className="market-header">
          <button 
            className="market-overview-btn"
            onClick={() => setShowMarketStats(!showMarketStats)}
          >
            <span className="market-title">Market Overview</span>
            <span className={`overview-arrow ${showMarketStats ? 'open' : ''}`}>▼</span>
          </button>
          <div className="token-selector" style={{ position: 'relative' }}>
            <button 
              type="button"
              className="token-selector-btn" 
              onClick={(e) => {
                e.stopPropagation();
                setShowTokenDropdown(!showTokenDropdown);
              }}
            >
              <span className="token-icon">{selectedToken === 'USDC' ? '🔵' : '🟢'}</span>
              <span>{selectedToken}</span>
              <span className="dropdown-arrow">▼</span>
            </button>

            {showTokenDropdown && (
              <div className="token-dropdown">
                <button
                  type="button"
                  className={`token-option ${selectedToken === 'USDC' ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTokenSelect('USDC');
                  }}
                >
                  <span className="token-icon">🔵</span>
                  <div className="token-details">
                    <span className="token-name">USDC</span>
                    <span className="token-desc">USD Coin</span>
                  </div>
                </button>
                <button
                  type="button"
                  className={`token-option ${selectedToken === 'USDT' ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTokenSelect('USDT');
                  }}
                >
                  <span className="token-icon">🟢</span>
                  <div className="token-details">
                    <span className="token-name">USDT</span>
                    <span className="token-desc">Tether USD</span>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
        
        {showMarketStats && (
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
        )}
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
            onClick={handlePostAdClick}
          >
            + Post Ad
          </button>
        </div>
        
        <div className="buy-sell-buttons">
          <button 
            className={`trade-btn buy-btn ${activeTab === 'buy' ? 'active' : ''}`}
            onClick={() => setActiveTab('buy')}
          >
            Buy {selectedToken}
          </button>
          <button 
            className={`trade-btn sell-btn ${activeTab === 'sell' ? 'active' : ''}`}
            onClick={() => setActiveTab('sell')}
          >
            Sell {selectedToken}
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
                <div className="available-value">{trader.available.toFixed(2)} {trader.token || 'USDC'}</div>
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
              <button 
                className={`trade-btn ${trader.adType === 'buy' ? 'sell-to-buyer' : 'buy-from-seller'}`}
                onClick={() => handleTradeClick(trader, trader.adType === 'buy' ? 'sell' : 'buy')}
              >
                {trader.adType === 'buy' ? `Sell ${trader.token || 'USDC'}` : `Buy ${trader.token || 'USDC'}`}
              </button>
              <button className="message-btn">💬</button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State when no traders found */}
      {traders.length === 0 && (
        <div className="empty-traders">
          <div className="empty-icon">🔍</div>
          <h3>No {activeTab === 'buy' ? 'Sellers' : 'Buyers'} Found</h3>
          <p>
            {activeTab === 'buy' 
              ? `No one is selling ${selectedToken} right now.` 
              : `No one is buying ${selectedToken} right now.`
            }
          </p>
          <button 
            className="post-ad-btn"
            onClick={handlePostAdClick}
          >
            + Post Your Ad
          </button>
        </div>
      )}

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
                <button 
                  className={`trade-btn ${selectedTrader.adType === 'buy' ? 'sell-to-buyer' : 'buy-from-seller'}`}
                  onClick={() => handleTradeClick(selectedTrader, selectedTrader.adType === 'buy' ? 'sell' : 'buy')}
                >
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
        selectedToken={selectedToken}
      />

      {/* Trade Request Modal */}
      <TradeRequestModal 
        isOpen={showTradeRequestModal}
        onClose={() => setShowTradeRequestModal(false)}
        onSubmit={handleTradeRequestSubmit}
        trader={selectedTraderForTrade}
        action={tradeAction}
        selectedToken={selectedToken}
      />

      {/* Amount Input Modal */}
      <AmountInputModal 
        isOpen={showAmountModal}
        onClose={() => setShowAmountModal(false)}
        onSubmit={handleAmountSubmit}
        trader={selectedTraderForAmount}
        action={amountAction}
        selectedToken={selectedToken}
      />
    </div>
  );
};

// Amount Input Modal Component
interface AmountInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: string, paymentMethod: string) => void;
  trader: any;
  action: 'buy' | 'sell';
  selectedToken: 'USDC' | 'USDT';
}

const AmountInputModal: React.FC<AmountInputModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  trader, 
  action, 
  selectedToken 
}) => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI Transfer');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !trader) return null;

  const handleSubmit = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const amountNum = parseFloat(amount);
    if (amountNum < trader.limit.min || amountNum > trader.limit.max) {
      alert(`Amount must be between ₹${trader.limit.min} and ₹${trader.limit.max}`);
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit(amount, paymentMethod);
      // Reset form
      setAmount('');
    } catch (error) {
      console.error('Amount submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setAmount('');
    onClose();
  };

  const tokenAmount = amount ? (parseFloat(amount) / trader.price).toFixed(6) : '0.000000';
  const totalValue = amount ? parseFloat(amount).toFixed(2) : '0.00';

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="amount-input-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="amount-modal-header">
          <button className="back-btn" onClick={handleClose}>
            ←
          </button>
          <h2>
            {action === 'buy' ? 'Buy' : 'Sell'} {selectedToken}
          </h2>
          <button className="close-btn" onClick={handleClose}>
            ✕
          </button>
        </div>

        {/* Trader Info */}
        <div className="trader-info-card">
          <div className="trader-avatar">
            <span className="avatar-icon">👤</span>
          </div>
          <div className="trader-details">
            <h3>{trader.name}</h3>
            <div className="trader-rating">
              <span className="star">⭐</span>
              <span>{trader.rating}</span>
              <span className="trades-count">({trader.totalTrades} trades)</span>
            </div>
            <div className="price-display">
              Price: <span className="price-value">₹{trader.price.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Amount Input Section */}
        <div className="amount-input-section">
          <h3>Enter Amount</h3>
          <div className="amount-input-wrapper">
            <span className="currency-symbol">₹</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount in INR"
              className="amount-input-field"
              min={trader.limit.min}
              max={trader.limit.max}
            />
          </div>
          
          <div className="limit-display">
            Limit: ₹{trader.limit.min.toLocaleString()} - ₹{trader.limit.max.toLocaleString()}
          </div>
          
          {amount && (
            <div className="calculation-display">
              <div className="calc-row">
                <span>You will {action}:</span>
                <span className="token-amount">{tokenAmount} {selectedToken}</span>
              </div>
              <div className="calc-row total-row">
                <span>Total:</span>
                <span className="total-value">₹{totalValue}</span>
              </div>
            </div>
          )}
        </div>

        {/* Payment Method Selection */}
        <div className="payment-method-section">
          <h4>Payment Method</h4>
          <div className="payment-methods-grid">
            {trader.paymentMethods.map((method: string, index: number) => (
              <button
                key={index}
                className={`payment-method-option ${paymentMethod === method ? 'active' : ''}`}
                onClick={() => setPaymentMethod(method)}
              >
                {method}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button 
          className="buy-request-btn"
          onClick={handleSubmit}
          disabled={isSubmitting || !amount}
        >
          {isSubmitting ? 'Processing...' : `Send ${action === 'buy' ? 'Buy' : 'Sell'} Request`}
        </button>
      </div>
    </div>
  );
};
export default P2PTrading;