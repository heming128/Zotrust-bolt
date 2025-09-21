import React, { useState } from 'react';
import { useWeb3 } from '../hooks/useWeb3';

interface TradeRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (tradeData: any) => void;
  trader: any;
  action: 'buy' | 'sell';
  selectedToken: 'USDC' | 'USDT';
}

const TradeRequestModal: React.FC<TradeRequestModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  trader, 
  action, 
  selectedToken 
}) => {
  const { account } = useWeb3();
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI Transfer');
  const [message, setMessage] = useState('');
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
    
    const tradeData = {
      amount: amountNum,
      paymentMethod,
      message: message.trim(),
      timestamp: new Date().toISOString(),
      userAddress: account
    };

    try {
      await onSubmit(tradeData);
    } catch (error) {
      console.error('Trade request error:', error);
    } finally {
      setIsSubmitting(false);
      // Reset form
      setAmount('');
      setMessage('');
    }
  };

  const handleClose = () => {
    setAmount('');
    setMessage('');
    onClose();
  };

  const totalValue = amount ? (parseFloat(amount) * trader.price).toFixed(2) : '0.00';
  const tokenAmount = amount ? (parseFloat(amount) / trader.price).toFixed(6) : '0.000000';

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="trade-request-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="trade-request-header">
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
        <div className="trader-info-section">
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
            <div className={`online-status ${trader.isOnline ? 'online' : 'offline'}`}>
              <span className="status-dot"></span>
              {trader.isOnline ? 'Online' : 'Offline'}
            </div>
          </div>
        </div>

        {/* Trade Details */}
        <div className="trade-details-section">
          <div className="trade-type-info">
            <div className="trade-action">
              <span className={`action-badge ${action}`}>
                {action === 'buy' ? '📈 Buying' : '📉 Selling'} {selectedToken}
              </span>
            </div>
            <div className="price-info">
              <span className="price-label">Price:</span>
              <span className="price-value">₹{trader.price.toFixed(2)}</span>
            </div>
          </div>

          <div className="limit-info">
            <span className="limit-text">
              Limit: ₹{trader.limit.min.toLocaleString()} - ₹{trader.limit.max.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Amount Input */}
        <div className="amount-section">
          <h4>Enter Amount (₹)</h4>
          <div className="amount-input-wrapper">
            <span className="currency-symbol">₹</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount in INR"
              className="amount-input"
              min={trader.limit.min}
              max={trader.limit.max}
            />
          </div>
          
          {amount && (
            <div className="calculation-info">
              <div className="calc-row">
                <span>You will {action}:</span>
                <span className="token-amount">{tokenAmount} {selectedToken}</span>
              </div>
              <div className="calc-row">
                <span>Total value:</span>
                <span className="total-value">₹{totalValue}</span>
              </div>
            </div>
          )}
        </div>

        {/* Payment Method */}
        <div className="payment-section">
          <h4>Payment Method</h4>
          <div className="payment-methods">
            {trader.paymentMethods.map((method: string, index: number) => (
              <button
                key={index}
                className={`payment-method-btn ${paymentMethod === method ? 'active' : ''}`}
                onClick={() => setPaymentMethod(method)}
              >
                {method}
              </button>
            ))}
          </div>
        </div>

        {/* Message */}
        <div className="message-section">
          <h4>Message (Optional)</h4>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Add a message for the trader..."
            className="message-input"
            rows={3}
          />
        </div>

        {/* Submit Button */}
        <button 
          className="submit-trade-btn"
          onClick={handleSubmit}
          disabled={isSubmitting || !amount}
        >
          {isSubmitting ? 'Sending Request...' : `Send ${action === 'buy' ? 'Buy' : 'Sell'} Request`}
        </button>

        {/* Terms */}
        <div className="terms-section">
          <p className="terms-text">
            By proceeding, you agree to trade with {trader.name} at the specified terms.
            This will create a trade request that the other party can accept or decline.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TradeRequestModal;