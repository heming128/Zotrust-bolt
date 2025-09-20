import React, { useState } from 'react';

interface PostAdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdCreated: (ad: any) => void;
}

const PostAdModal: React.FC<PostAdModalProps> = ({ isOpen, onClose, onAdCreated }) => {
  const [step, setStep] = useState(1);
  const [adType, setAdType] = useState<'buy' | 'sell'>('buy');
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
      // Create the ad
      const newAd = {
        id: Date.now().toString(),
        name: 'You', // Current user
        rating: 5.0,
        totalTrades: 0,
        isOnline: true,
        branch: 'Individual Trader',
        location: 'Your Location',
        price: parseFloat(price),
        available: parseFloat(amount),
        limit: { 
          min: parseFloat(minLimit), 
          max: parseFloat(maxLimit) 
        },
        paymentMethods: ['UPI Transfer', 'Bank Transfer'],
        adType: adType, // 'buy' or 'sell'
        token: 'USDC'
      };
      
      onAdCreated(newAd);
      onClose();
      
      // Reset form
      setStep(1);
      setAdType('buy');
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

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="post-ad-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="post-ad-header">
          <button className="back-btn" onClick={handleBack}>
            ←
          </button>
          <h2>Post Ad</h2>
          <button className="close-btn" onClick={onClose}>
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
                  CORRECTED: You post a {adType.toUpperCase()} ad to {adType === 'buy' ? 'SELL' : 'BUY'} your 
                  USDT to {adType === 'buy' ? 'buyers' : 'sellers'} who want to {adType === 'buy' ? 'purchase' : 'sell'} USDT
                </span>
              </div>
            </div>

            {/* Asset Selection */}
            <div className="form-section">
              <h4>Asset</h4>
              <div className="asset-selector">
                <div className="asset-info">
                  <div className="asset-icon">U</div>
                  <div className="asset-details">
                    <span className="asset-name">USDT</span>
                    <span className="asset-desc">Tether USD</span>
                  </div>
                </div>
                <div className="asset-price">
                  <span>₹87.06</span>
                  <span className="dropdown-arrow">▼</span>
                </div>
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

            {/* Price Type Preview */}
            <div className="form-section">
              <h4>Price Type <span className="info-icon">ℹ️</span></h4>
              <div className="price-type-preview">
                <div className="price-type-indicator"></div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2 Content */}
        {step === 2 && (
          <div className="step-content">
            {/* Fiat Currency (continued from step 1) */}
            <div className="form-section">
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

            {/* Price Type Selection */}
            <div className="form-section">
              <h4>Price Type <span className="info-icon">ℹ️</span></h4>
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
                  />
                </div>
                
                <div className="market-info">
                  <div className="highest-order">
                    <span className="trend-icon">📈</span>
                    <span>Highest Order Price: ₹95.79</span>
                  </div>
                  <span className="market-diff">-9.1% below market</span>
                </div>

                <div className="quick-price-options">
                  <h5>Quick Price Options</h5>
                  <div className="price-option-buttons">
                    <button 
                      className="price-option-btn"
                      onClick={() => setPrice('95.79')}
                    >
                      Market Price (₹95.79)
                    </button>
                    <button 
                      className="price-option-btn"
                      onClick={() => setPrice('96.75')}
                    >
                      +1% (₹96.75)
                    </button>
                    <button 
                      className="price-option-btn"
                      onClick={() => setPrice('97.71')}
                    >
                      +2% (₹97.71)
                    </button>
                  </div>
                </div>

                <div className="price-warning">
                  <span className="warning-icon">⚠️</span>
                  <span className="warning-text">
                    Your price is significantly below market. This may attract sellers quickly.
                  </span>
                </div>
              </div>
            </div>

            {/* Amount Section */}
            <div className="form-section">
              <h4>Amount (USDC)</h4>
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
              <h4>Order Limits</h4>
              <div className="limits-section">
                <div className="limit-input">
                  <label>Minimum (₹)</label>
                  <input 
                    type="number" 
                    value={minLimit} 
                    onChange={(e) => setMinLimit(e.target.value)}
                    className="limit-input-field"
                  />
                </div>
                <div className="limit-input">
                  <label>Maximum (₹)</label>
                  <input 
                    type="number" 
                    value={maxLimit} 
                    onChange={(e) => setMaxLimit(e.target.value)}
                    className="limit-input-field"
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