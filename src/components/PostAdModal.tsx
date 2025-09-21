import React, { useState } from 'react';
import { useWeb3 } from '../hooks/useWeb3';

interface PostAdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdCreated: (ad: any) => void;
}

const PostAdModal: React.FC<PostAdModalProps> = ({ isOpen, onClose, onAdCreated }) => {
  const { account } = useWeb3();
  const [step, setStep] = useState(1);
  const [adType, setAdType] = useState<'buy' | 'sell'>('buy');
  const [selectedToken, setSelectedToken] = useState<'USDC' | 'USDT'>('USDC');
  const [priceType, setPriceType] = useState<'fixed' | 'market'>('fixed');
  const [price, setPrice] = useState('87.06');
  const [amount, setAmount] = useState('1000');
  const [minLimit, setMinLimit] = useState('500');
  const [maxLimit, setMaxLimit] = useState('5000');

  if (!isOpen) return null;

  const handleContinue = () => {
    if (step === 1) {
      setStep(2);
    } else {
      // Get user profile from localStorage
      const savedProfile = account ? localStorage.getItem(`profile_${account}`) : null;
      const userProfile = savedProfile ? JSON.parse(savedProfile) : null;
      
      // Create the ad
      const newAd = {
        id: Date.now().toString(),
        name: userProfile?.name || 'Anonymous User', // Use profile name or fallback
        rating: 5.0,
        totalTrades: 0,
        isOnline: true,
        branch: userProfile?.isVerified ? 'Verified Trader' : 'Individual Trader',
        location: 'Your Location',
        price: parseFloat(price),
        available: parseFloat(amount),
        limit: { 
          min: parseFloat(minLimit), 
          max: parseFloat(maxLimit) 
        },
        paymentMethods: ['UPI Transfer', 'Bank Transfer'],
        adType: adType, // 'buy' or 'sell'
        token: selectedToken
      };
      
      onAdCreated(newAd);
      onClose();
      
      // Reset form
      setStep(1);
      setAdType('buy');
      setSelectedToken('USDC');
      setPriceType('fixed');
      setPrice('87.06');
      setAmount('1000');
      setMinLimit('500');
      setMaxLimit('5000');
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else {
      onClose();
    }
  };

  const handleClose = () => {
    // Reset form when closing
    setStep(1);
    setAdType('buy');
    setSelectedToken('USDC');
    setPriceType('fixed');
    setPrice('87.06');
    setAmount('1000');
    setMinLimit('500');
    setMaxLimit('5000');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="post-ad-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="post-ad-header">
          <button className="back-btn" onClick={handleBack}>
            ←
          </button>
          <h2>Post Ad</h2>
          <button className="close-btn" onClick={handleClose}>
            ✕
          </button>
        </div>

        {/* Progress */}
        <div className="progress-indicator">
          <span className="progress-text">Step {step} of 2</span>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(step / 2) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1 Content */}
        {step === 1 && (
          <div className="step-content">
            {/* Ad Type Selection */}
            <div className="ad-type-section">
              <h3>I want to post an ad to</h3>
              <div className="ad-type-buttons">
                <button 
                  className={`ad-type-btn buy-btn ${adType === 'buy' ? 'active' : ''}`}
                  onClick={() => setAdType('buy')}
                >
                  <span className="btn-icon">📈</span>
                  Buy
                </button>
                <button 
                  className={`ad-type-btn sell-btn ${adType === 'sell' ? 'active' : ''}`}
                  onClick={() => setAdType('sell')}
                >
                  <span className="btn-icon">📉</span>
                  Sell
                </button>
              </div>
              <div className="ad-type-info">
                <span className="check-icon">✅</span>
                <span className="info-text">
                  You want to {adType.toUpperCase()} {selectedToken} {adType === 'buy' ? 'from sellers' : 'to buyers'}
                </span>
              </div>
            </div>

            {/* Asset Selection */}
            <div className="form-section">
              <h4>Asset</h4>
              <div className="token-selection-grid">
                <button
                  type="button"
                  className={`token-selection-btn ${selectedToken === 'USDC' ? 'active' : ''}`}
                  onClick={() => setSelectedToken('USDC')}
                >
                  <div className="token-icon usdc">🔵</div>
                  <div className="token-info">
                    <span className="token-name">USDC</span>
                    <span className="token-desc">USD Coin</span>
                  </div>
                  <div className="token-price">₹87.06</div>
                </button>
                
                <button
                  type="button"
                  className={`token-selection-btn ${selectedToken === 'USDT' ? 'active' : ''}`}
                  onClick={() => setSelectedToken('USDT')}
                >
                  <div className="token-icon usdt">🟢</div>
                  <div className="token-info">
                    <span className="token-name">USDT</span>
                    <span className="token-desc">Tether USD</span>
                  </div>
                  <div className="token-price">₹87.15</div>
                </button>
              </div>
            </div>

            {/* Fiat Currency */}
            <div className="form-section">
              <h4>With Fiat</h4>
              <div className="fiat-selector">
                <div className="fiat-info">
                  <div className="fiat-icon">🇮🇳</div>
                  <div className="fiat-details">
                    <span className="fiat-name">INR</span>
                    <span className="fiat-desc">Indian Rupee</span>
                  </div>
                </div>
                <div className="fiat-symbol">
                  <span>₹</span>
                  <span className="dropdown-arrow">▼</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2 Content */}
        {step === 2 && (
          <div className="step-content">
            {/* Price Type Selection */}
            <div className="form-section">
              <h4>Price Type</h4>
              <div className="price-type-buttons">
                <button 
                  className={`price-type-btn ${priceType === 'fixed' ? 'active' : ''}`}
                  onClick={() => setPriceType('fixed')}
                >
                  <span className="lock-icon">🔒</span>
                  Fixed Price
                </button>
                <button 
                  className={`price-type-btn ${priceType === 'market' ? 'active' : ''}`}
                  onClick={() => setPriceType('market')}
                >
                  <span className="chart-icon">📊</span>
                  Market Price
                </button>
              </div>
              <p className="price-type-desc">
                You will set a fixed price for your trades
              </p>
            </div>

            {/* Your Price */}
            <div className="form-section">
              <h4>Your Price</h4>
              <div className="price-input-section">
                <div className="price-input">
                  <span className="currency-symbol">₹</span>
                  <input 
                    type="number" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)}
                    className="price-value"
                    placeholder="87.06"
                  />
                </div>
                
                <div className="market-info">
                  <div className="highest-order">
                    <span className="trend-icon">📈</span>
                    <span>Market Price: ₹87.06</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Amount Section */}
            <div className="form-section">
              <h4>Amount ({selectedToken})</h4>
              <div className="amount-input-section">
                <input 
                  type="number" 
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)}
                  className="amount-input-field"
                  placeholder="Enter amount"
                />
              </div>
            </div>

            {/* Limits Section */}
            <div className="form-section">
              <h4>Order Limits (₹)</h4>
              <div className="limits-section">
                <div className="limit-input">
                  <label>Minimum</label>
                  <input 
                    type="number" 
                    value={minLimit} 
                    onChange={(e) => setMinLimit(e.target.value)}
                    className="limit-input-field"
                    placeholder="500"
                  />
                </div>
                <div className="limit-input">
                  <label>Maximum</label>
                  <input 
                    type="number" 
                    value={maxLimit} 
                    onChange={(e) => setMaxLimit(e.target.value)}
                    className="limit-input-field"
                    placeholder="5000"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Continue Button */}
        <button className="continue-btn" onClick={handleContinue}>
          {step === 1 ? 'Continue →' : 'Create Ad'}
        </button>
      </div>
    </div>
  );
};

export default PostAdModal;