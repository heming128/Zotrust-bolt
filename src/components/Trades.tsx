import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../hooks/useWeb3';

interface Trade {
  id: string;
  type: 'buy' | 'sell';
  token: 'USDC' | 'USDT';
  amount: number;
  price: number;
  counterparty: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  timestamp: Date;
  txHash?: string;
}

interface TradingStats {
  totalVolume: number;
  successRate: number;
  totalTrades: number;
  favoriteAgent: string;
}

const Trades: React.FC = () => {
  const { account, isConnected } = useWeb3();
  const [activeFilter, setActiveFilter] = useState<'today' | 'week' | 'month' | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock trading statistics
  const tradingStats: TradingStats = {
    totalVolume: 8250.00,
    successRate: 83.3,
    totalTrades: 6,
    favoriteAgent: 'CryptoExchange Pro'
  };

  // Mock trades data
  const allTrades: Trade[] = [
    {
      id: 'TXN00123',
      type: 'buy',
      token: 'USDC',
      amount: 1250.00,
      price: 87.06,
      counterparty: '0x742d...b804',
      status: 'completed',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      txHash: '0x123...abc'
    },
    {
      id: 'TXN00124',
      type: 'sell',
      token: 'USDC',
      amount: 850.00,
      price: 87.15,
      counterparty: '0x956a...c123',
      status: 'completed',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      txHash: '0x456...def'
    },
    {
      id: 'TXN00125',
      type: 'buy',
      token: 'USDT',
      amount: 2000.00,
      price: 87.25,
      counterparty: '0x123a...d567',
      status: 'in_progress',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    },
    {
      id: 'TXN00126',
      type: 'sell',
      token: 'USDT',
      amount: 500.00,
      price: 86.95,
      counterparty: '0x789b...e890',
      status: 'pending',
      timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
    }
  ];

  const getFilteredTrades = () => {
    const now = new Date();
    let filtered = allTrades;

    // Filter by time period
    switch (activeFilter) {
      case 'today':
        filtered = allTrades.filter(trade => {
          const tradeDate = new Date(trade.timestamp);
          return tradeDate.toDateString() === now.toDateString();
        });
        break;
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        filtered = allTrades.filter(trade => trade.timestamp >= weekAgo);
        break;
      case 'month':
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        filtered = allTrades.filter(trade => trade.timestamp >= monthAgo);
        break;
      default:
        filtered = allTrades;
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(trade => 
        trade.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trade.counterparty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trade.token.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const getStatusColor = (status: Trade['status']) => {
    switch (status) {
      case 'completed': return '#16a34a';
      case 'in_progress': return '#f59e0b';
      case 'pending': return '#6b7280';
      case 'cancelled': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: Trade['status']) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in_progress': return 'In Progress';
      case 'pending': return 'Pending';
      case 'cancelled': return 'Cancelled';
      default: return 'Unknown';
    }
  };

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      return `${diffDays}d ago`;
    }
  };

  const filteredTrades = getFilteredTrades();
  const liveTrades = filteredTrades.filter(trade => trade.status === 'pending' || trade.status === 'in_progress');
  const completedTrades = filteredTrades.filter(trade => trade.status === 'completed');

  if (!isConnected) {
    return (
      <div className="trades-container">
        <div className="trades-not-connected">
          <div className="not-connected-icon">🔒</div>
          <h3>Wallet Not Connected</h3>
          <p>Please connect your wallet to view your trading history</p>
        </div>
      </div>
    );
  }

  return (
    <div className="trades-container">
      {/* Search Bar */}
      <div className="trades-search">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search trades, amounts, ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="trades-search-input"
          />
        </div>
      </div>

      {/* Time Filter Tabs */}
      <div className="time-filter-tabs">
        {(['today', 'week', 'month', 'all'] as const).map((filter) => (
          <button
            key={filter}
            className={`filter-tab ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter === 'all' ? 'All Time' : filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {/* Trading Statistics Card */}
      <div className="trading-statistics-card">
        <div className="stats-header">
          <div className="stats-icon">📊</div>
          <div className="stats-title">
            <h3>Trading Statistics</h3>
            <p>Your trading performance overview</p>
          </div>
        </div>
        
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <div className="stat-label">Total Volume</div>
              <div className="stat-value">${tradingStats.totalVolume.toLocaleString()}</div>
            </div>
          </div>
          
          <div className="stat-item">
            <div className="stat-icon">📈</div>
            <div className="stat-content">
              <div className="stat-label">Success Rate</div>
              <div className="stat-value success-rate">{tradingStats.successRate}%</div>
            </div>
          </div>
          
          <div className="stat-item">
            <div className="stat-icon">🔄</div>
            <div className="stat-content">
              <div className="stat-label">Total Trades</div>
              <div className="stat-value">{tradingStats.totalTrades}</div>
            </div>
          </div>
          
          <div className="stat-item">
            <div className="stat-icon">⭐</div>
            <div className="stat-content">
              <div className="stat-label">Favorite Agent</div>
              <div className="stat-value favorite-agent">{tradingStats.favoriteAgent}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Trades Section */}
      {liveTrades.length > 0 && (
        <div className="trades-section">
          <h3 className="section-title">
            <span className="live-indicator">🔴</span>
            Live Trades ({liveTrades.length})
          </h3>
          <div className="trades-list">
            {liveTrades.map((trade) => (
              <div key={trade.id} className="trade-card live-trade">
                <div className="trade-header">
                  <div className="trade-type-badge">
                    <span className={`trade-type ${trade.type}`}>
                      {trade.type === 'buy' ? '📈' : '📉'} {trade.type.toUpperCase()} {trade.token}
                    </span>
                  </div>
                  <div 
                    className="trade-status"
                    style={{ color: getStatusColor(trade.status) }}
                  >
                    <span className="status-dot" style={{ backgroundColor: getStatusColor(trade.status) }}></span>
                    {getStatusText(trade.status)}
                  </div>
                </div>
                
                <div className="trade-details">
                  <div className="trade-id">ID: {trade.id}</div>
                  <div className="trade-time">{getTimeAgo(trade.timestamp)}</div>
                </div>
                
                <div className="trade-info">
                  <div className="trade-amount">
                    <div className="amount-label">Amount</div>
                    <div className="amount-value">${trade.amount.toFixed(2)} {trade.token}</div>
                  </div>
                  <div className="trade-counterparty">
                    <div className="counterparty-label">Counterparty</div>
                    <div className="counterparty-value">{trade.counterparty}</div>
                  </div>
                </div>
                
                <div className="trade-actions">
                  <button className="action-btn primary">View Details</button>
                  <button className="action-btn secondary">Contact</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed Trades Section */}
      <div className="trades-section">
        <h3 className="section-title">
          ✅ Completed Trades ({completedTrades.length})
        </h3>
        <div className="trades-list">
          {completedTrades.map((trade) => (
            <div key={trade.id} className="trade-card completed-trade">
              <div className="trade-header">
                <div className="trade-type-badge">
                  <span className={`trade-type ${trade.type}`}>
                    {trade.type === 'buy' ? '📈' : '📉'} {trade.type.toUpperCase()} {trade.token}
                  </span>
                </div>
                <div 
                  className="trade-status"
                  style={{ color: getStatusColor(trade.status) }}
                >
                  <span className="status-dot" style={{ backgroundColor: getStatusColor(trade.status) }}></span>
                  {getStatusText(trade.status)}
                </div>
              </div>
              
              <div className="trade-details">
                <div className="trade-id">ID: {trade.id}</div>
                <div className="trade-time">{getTimeAgo(trade.timestamp)}</div>
              </div>
              
              <div className="trade-info">
                <div className="trade-amount">
                  <div className="amount-label">Amount</div>
                  <div className="amount-value">${trade.amount.toFixed(2)} {trade.token}</div>
                </div>
                <div className="trade-counterparty">
                  <div className="counterparty-label">Counterparty</div>
                  <div className="counterparty-value">{trade.counterparty}</div>
                </div>
              </div>
              
              <div className="trade-actions">
                <button className="action-btn primary">View Details</button>
                {trade.txHash && (
                  <button className="action-btn secondary">View TX</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredTrades.length === 0 && (
        <div className="empty-trades">
          <div className="empty-icon">📊</div>
          <h3>No Trades Found</h3>
          <p>
            {searchTerm 
              ? `No trades found matching "${searchTerm}"`
              : 'You haven\'t made any trades yet. Start trading to see your history here.'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default Trades;