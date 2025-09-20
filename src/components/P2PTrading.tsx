import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../hooks/useWeb3';

interface Trader {
  id: string;
  address: string;
  name: string;
  rating: number;
  totalTrades: number;
  city: string;
  distance: number;
  isOnline: boolean;
  tokens: {
    symbol: string;
    balance: number;
    price: number;
  }[];
}

interface Trade {
  id: string;
  type: 'buy' | 'sell';
  token: string;
  amount: number;
  price: number;
  trader: string;
  city: string;
  status: 'active' | 'pending' | 'completed';
}

const P2PTrading: React.FC = () => {
  const { account, isConnected, balance } = useWeb3();
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [showCityModal, setShowCityModal] = useState(false);
  const [nearbyTraders, setNearbyTraders] = useState<Trader[]>([]);
  const [activeTrades, setActiveTrades] = useState<Trade[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  const cities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata',
    'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur'
  ];

  const mockTraders: Trader[] = [
    {
      id: '1',
      address: '0x1234...5678',
      name: 'CryptoKing',
      rating: 4.8,
      totalTrades: 156,
      city: selectedCity,
      distance: 2.3,
      isOnline: true,
      tokens: [
        { symbol: 'USDC', balance: 5000, price: 83.50 },
        { symbol: 'ETH', balance: 2.5, price: 250000 }
      ]
    },
    {
      id: '2',
      address: '0x9876...4321',
      name: 'BlockchainBro',
      rating: 4.6,
      totalTrades: 89,
      city: selectedCity,
      distance: 1.8,
      isOnline: true,
      tokens: [
        { symbol: 'USDC', balance: 3200, price: 83.45 },
        { symbol: 'BTC', balance: 0.15, price: 4500000 }
      ]
    },
    {
      id: '3',
      address: '0x5555...7777',
      name: 'DeFiDealer',
      rating: 4.9,
      totalTrades: 234,
      city: selectedCity,
      distance: 3.1,
      isOnline: false,
      tokens: [
        { symbol: 'USDC', balance: 8900, price: 83.48 }
      ]
    }
  ];

  useEffect(() => {
    if (selectedCity) {
      setNearbyTraders(mockTraders);
    }
  }, [selectedCity]);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setShowCityModal(false);
    // In real app, fetch nearby traders based on city
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const startTrade = (trader: Trader, token: string, type: 'buy' | 'sell') => {
    const newTrade: Trade = {
      id: Date.now().toString(),
      type,
      token,
      amount: 100, // Default amount
      price: trader.tokens.find(t => t.symbol === token)?.price || 0,
      trader: trader.name,
      city: trader.city,
      status: 'pending'
    };
    setActiveTrades([...activeTrades, newTrade]);
  };

  if (!isConnected) {
    return (
      <div className="p2p-container">
        <div className="p2p-not-connected">
          <h3>🔒 Connect Wallet to Start P2P Trading</h3>
          <p>Connect your wallet to find nearby traders and start P2P transactions</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p2p-container">
      {/* Header */}
      <div className="p2p-header">
        <h2>🤝 P2P Trading</h2>
        <p>Find nearby traders in your city</p>
      </div>

      {/* USDC Balance Card */}
      <div className="balance-card">
        <div className="balance-header">
          <span>USDC Balance</span>
          <button className="refresh-btn">🔄</button>
        </div>
        <div className="balance-amount">
          <span className="amount">$0.00</span>
          <span className="usd-equivalent">≈ $0.00 USD</span>
        </div>
      </div>

      {/* City Selection */}
      {!selectedCity ? (
        <div className="city-selector">
          <div className="location-icon">📍</div>
          <h3>Add Your City</h3>
          <p>Please select your city to find nearby active traders in your area.</p>
          <button 
            className="select-city-btn"
            onClick={() => setShowCityModal(true)}
          >
            🏢 Select City
          </button>
          <button 
            className="location-btn"
            onClick={getUserLocation}
          >
            📍 Use Current Location
          </button>
        </div>
      ) : (
        <div className="selected-city">
          <span>📍 {selectedCity}</span>
          <button onClick={() => setSelectedCity('')}>Change</button>
        </div>
      )}

      {/* Nearby Traders */}
      {selectedCity && (
        <div className="nearby-traders">
          <h3>🎯 Nearby Traders in {selectedCity}</h3>
          <div className="traders-list">
            {nearbyTraders.map((trader) => (
              <div key={trader.id} className="trader-card">
                <div className="trader-header">
                  <div className="trader-info">
                    <span className="trader-name">{trader.name}</span>
                    <div className="trader-stats">
                      <span className="rating">⭐ {trader.rating}</span>
                      <span className="trades">📊 {trader.totalTrades} trades</span>
                      <span className="distance">📍 {trader.distance}km away</span>
                    </div>
                  </div>
                  <div className={`status ${trader.isOnline ? 'online' : 'offline'}`}>
                    {trader.isOnline ? '🟢 Online' : '🔴 Offline'}
                  </div>
                </div>
                
                <div className="trader-tokens">
                  {trader.tokens.map((token) => (
                    <div key={token.symbol} className="token-offer">
                      <div className="token-info">
                        <span className="token-symbol">{token.symbol}</span>
                        <span className="token-balance">{token.balance.toLocaleString()}</span>
                        <span className="token-price">₹{token.price.toLocaleString()}</span>
                      </div>
                      <div className="trade-buttons">
                        <button 
                          className="buy-btn"
                          onClick={() => startTrade(trader, token.symbol, 'buy')}
                          disabled={!trader.isOnline}
                        >
                          Buy
                        </button>
                        <button 
                          className="sell-btn"
                          onClick={() => startTrade(trader, token.symbol, 'sell')}
                          disabled={!trader.isOnline}
                        >
                          Sell
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Trades */}
      {activeTrades.length > 0 && (
        <div className="active-trades">
          <h3>🔄 Active Trades</h3>
          <div className="trades-list">
            {activeTrades.map((trade) => (
              <div key={trade.id} className="trade-card">
                <div className="trade-info">
                  <span className={`trade-type ${trade.type}`}>
                    {trade.type === 'buy' ? '🟢 BUY' : '🔴 SELL'}
                  </span>
                  <span className="trade-token">{trade.token}</span>
                  <span className="trade-amount">{trade.amount}</span>
                  <span className="trade-price">₹{trade.price.toLocaleString()}</span>
                </div>
                <div className="trade-status">
                  <span className={`status ${trade.status}`}>
                    {trade.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* City Selection Modal */}
      {showCityModal && (
        <div className="modal-overlay">
          <div className="city-modal">
            <div className="modal-header">
              <h3>Select Your City</h3>
              <button 
                className="close-btn"
                onClick={() => setShowCityModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="cities-grid">
              {cities.map((city) => (
                <button
                  key={city}
                  className="city-option"
                  onClick={() => handleCitySelect(city)}
                >
                  📍 {city}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default P2PTrading;