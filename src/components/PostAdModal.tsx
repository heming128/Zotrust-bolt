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
        name: userProfile?.name || 'Anonymous User',
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
        adType: adType,
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
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }} onClick={handleClose}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '15px',
        width: '100%',
        maxWidth: '400px',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
      }} onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px',
          borderBottom: '1px solid #eee'
        }}>
          <button 
            onClick={handleBack}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              padding: '5px'
            }}
          >
            ←
          </button>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>
            Post Ad
          </h2>
          <button 
            onClick={handleClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              padding: '5px'
            }}
          >
            ✕
          </button>
        </div>

        {/* Progress */}
        <div style={{ padding: '20px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '10px'
          }}>
            <span style={{ fontSize: '14px', color: '#666' }}>Step {step} of 2</span>
          </div>
          <div style={{
            width: '100%',
            height: '4px',
            backgroundColor: '#f0f0f0',
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${(step / 2) * 100}%`,
              height: '100%',
              backgroundColor: '#4CAF50',
              transition: 'width 0.3s ease'
            }}></div>
          </div>
        </div>

        {/* Step 1 Content */}
        {step === 1 && (
          <div style={{ padding: '0 20px 20px' }}>
            {/* Ad Type Selection */}
            <div style={{ marginBottom: '25px' }}>
              <h3 style={{ margin: '0 0 15px 0', fontSize: '16px' }}>I want to post an ad to</h3>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                <button 
                  onClick={() => setAdType('buy')}
                  style={{
                    flex: 1,
                    padding: '15px',
                    border: adType === 'buy' ? '2px solid #4CAF50' : '1px solid #ddd',
                    borderRadius: '10px',
                    backgroundColor: adType === 'buy' ? '#e8f5e8' : 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <span style={{ fontSize: '20px' }}>📈</span>
                  <span style={{ fontWeight: 'bold' }}>Buy</span>
                </button>
                <button 
                  onClick={() => setAdType('sell')}
                  style={{
                    flex: 1,
                    padding: '15px',
                    border: adType === 'sell' ? '2px solid #f44336' : '1px solid #ddd',
                    borderRadius: '10px',
                    backgroundColor: adType === 'sell' ? '#ffebee' : 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <span style={{ fontSize: '20px' }}>📉</span>
                  <span style={{ fontWeight: 'bold' }}>Sell</span>
                </button>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px'
              }}>
                <span>✅</span>
                <span style={{ fontSize: '14px', color: '#666' }}>
                  You want to {adType.toUpperCase()} {selectedToken} {adType === 'buy' ? 'from sellers' : 'to buyers'}
                </span>
              </div>
            </div>

            {/* Asset Selection */}
            <div style={{ marginBottom: '25px' }}>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', fontWeight: 'bold' }}>Asset</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  onClick={() => setSelectedToken('USDC')}
                  style={{
                    padding: '15px',
                    border: selectedToken === 'USDC' ? '2px solid #2196F3' : '1px solid #ddd',
                    borderRadius: '10px',
                    backgroundColor: selectedToken === 'USDC' ? '#e3f2fd' : 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ fontSize: '20px' }}>🔵</div>
                    <div>
                      <div style={{ fontWeight: 'bold' }}>USDC</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>USD Coin</div>
                    </div>
                  </div>
                  <div style={{ fontWeight: 'bold' }}>₹87.06</div>
                </button>
                
                <button
                  onClick={() => setSelectedToken('USDT')}
                  style={{
                    padding: '15px',
                    border: selectedToken === 'USDT' ? '2px solid #4CAF50' : '1px solid #ddd',
                    borderRadius: '10px',
                    backgroundColor: selectedToken === 'USDT' ? '#e8f5e8' : 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ fontSize: '20px' }}>🟢</div>
                    <div>
                      <div style={{ fontWeight: 'bold' }}>USDT</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>Tether USD</div>
                    </div>
                  </div>
                  <div style={{ fontWeight: 'bold' }}>₹87.15</div>
                </button>
              </div>
            </div>

            {/* Fiat Currency */}
            <div style={{ marginBottom: '25px' }}>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', fontWeight: 'bold' }}>With Fiat</h4>
              <div style={{
                padding: '15px',
                border: '1px solid #ddd',
                borderRadius: '10px',
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ fontSize: '20px' }}>🇮🇳</div>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>INR</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>Indian Rupee</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ fontWeight: 'bold' }}>₹</span>
                  <span style={{ fontSize: '12px', color: '#666' }}>▼</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2 Content */}
        {step === 2 && (
          <div style={{ padding: '0 20px 20px' }}>
            {/* Price Type Selection */}
            <div style={{ marginBottom: '25px' }}>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', fontWeight: 'bold' }}>Price Type</h4>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <button 
                  onClick={() => setPriceType('fixed')}
                  style={{
                    flex: 1,
                    padding: '12px',
                    border: priceType === 'fixed' ? '2px solid #2196F3' : '1px solid #ddd',
                    borderRadius: '8px',
                    backgroundColor: priceType === 'fixed' ? '#e3f2fd' : 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px'
                  }}
                >
                  <span>🔒</span>
                  Fixed Price
                </button>
                <button 
                  onClick={() => setPriceType('market')}
                  style={{
                    flex: 1,
                    padding: '12px',
                    border: priceType === 'market' ? '2px solid #2196F3' : '1px solid #ddd',
                    borderRadius: '8px',
                    backgroundColor: priceType === 'market' ? '#e3f2fd' : 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px'
                  }}
                >
                  <span>📊</span>
                  Market Price
                </button>
              </div>
              <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                You will set a fixed price for your trades
              </p>
            </div>

            {/* Your Price */}
            <div style={{ marginBottom: '25px' }}>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', fontWeight: 'bold' }}>Your Price</h4>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '12px',
                backgroundColor: 'white'
              }}>
                <span style={{ marginRight: '8px', fontWeight: 'bold' }}>₹</span>
                <input 
                  type="number" 
                  value={price} 
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="87.06"
                  style={{
                    border: 'none',
                    outline: 'none',
                    flex: 1,
                    fontSize: '16px'
                  }}
                />
              </div>
              <div style={{
                marginTop: '8px',
                padding: '8px',
                backgroundColor: '#f8f9fa',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>📈</span>
                <span style={{ fontSize: '12px', color: '#666' }}>Market Price: ₹87.06</span>
              </div>
            </div>

            {/* Amount Section */}
            <div style={{ marginBottom: '25px' }}>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', fontWeight: 'bold' }}>
                Amount ({selectedToken})
              </h4>
              <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Limits Section */}
            <div style={{ marginBottom: '25px' }}>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', fontWeight: 'bold' }}>
                Order Limits (₹)
              </h4>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', color: '#666', marginBottom: '5px', display: 'block' }}>
                    Minimum
                  </label>
                  <input 
                    type="number" 
                    value={minLimit} 
                    onChange={(e) => setMinLimit(e.target.value)}
                    placeholder="500"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '16px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', color: '#666', marginBottom: '5px', display: 'block' }}>
                    Maximum
                  </label>
                  <input 
                    type="number" 
                    value={maxLimit} 
                    onChange={(e) => setMaxLimit(e.target.value)}
                    placeholder="5000"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '16px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Continue Button */}
        <div style={{ padding: '20px', borderTop: '1px solid #eee' }}>
          <button 
            onClick={handleContinue}
            style={{
              width: '100%',
              padding: '15px',
              border: 'none',
              borderRadius: '10px',
              backgroundColor: '#4CAF50',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            {step === 1 ? 'Continue →' : 'Create Ad'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostAdModal;