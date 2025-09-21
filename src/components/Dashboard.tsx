import React from 'react';
import { useWeb3 } from '../hooks/useWeb3';

const Dashboard: React.FC = () => {
  const { 
    account, 
    isConnected, 
    balance, 
    tokenBalances, 
    isLoadingBalances,
    connectWallet, 
    disconnectWallet,
    refreshTokenBalances 
  } = useWeb3();

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ margin: '0 0 10px 0', color: '#333', fontSize: '24px', fontWeight: 'bold' }}>
          Dashboard
        </h2>
        <p style={{ margin: '0', color: '#666', fontSize: '16px' }}>
          Welcome to ZedTrust Web3 DApp
        </p>
      </div>

      {/* Wallet Connection Card */}
      {!isConnected ? (
        <div style={{
          backgroundColor: '#fff',
          padding: '25px',
          borderRadius: '15px',
          marginBottom: '20px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              backgroundColor: '#e3f2fd',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}>
              💳
            </div>
            <div>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
                Connect Wallet
              </h3>
              <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
                Connect to start trading and access Web3 features
              </p>
            </div>
          </div>
          <button 
            onClick={connectWallet}
            style={{
              padding: '12px 24px',
              border: 'none',
              borderRadius: '10px',
              backgroundColor: '#4CAF50',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            🔗 Connect
          </button>
        </div>
      ) : (
        <div style={{
          backgroundColor: '#fff',
          padding: '25px',
          borderRadius: '15px',
          marginBottom: '20px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              backgroundColor: '#e8f5e8',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}>
              ✅
            </div>
            <div>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
                Wallet Connected
              </h3>
              <p style={{ margin: '0', color: '#666', fontSize: '14px', fontFamily: 'monospace' }}>
                {account?.slice(0, 6)}...{account?.slice(-4)}
              </p>
            </div>
          </div>
          <button 
            onClick={disconnectWallet}
            style={{
              padding: '12px 24px',
              border: 'none',
              borderRadius: '10px',
              backgroundColor: '#f44336',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            🔌 Disconnect
          </button>
        </div>
      )}

      {/* ETH Balance Card */}
      {isConnected && (
        <div style={{
          backgroundColor: '#fff',
          padding: '25px',
          borderRadius: '15px',
          marginBottom: '20px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '15px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '24px' }}>⚡</span>
              <h3 style={{ margin: '0', fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
                ETH Balance
              </h3>
            </div>
            <button 
              onClick={refreshTokenBalances}
              disabled={isLoadingBalances}
              style={{
                padding: '8px 12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                backgroundColor: 'white',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              {isLoadingBalances ? '⏳' : '🔄'}
            </button>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '5px'
            }}>
              {balance ? `${parseFloat(balance).toFixed(4)} ETH` : '0.0000 ETH'}
            </div>
            <div style={{ fontSize: '16px', color: '#666' }}>
              ≈ ${balance ? (parseFloat(balance) * 2500).toFixed(2) : '0.00'} USD
            </div>
          </div>
        </div>
      )}

      {/* USDC Balance Card */}
      {isConnected && (
        <div style={{
          backgroundColor: '#fff',
          padding: '25px',
          borderRadius: '15px',
          marginBottom: '20px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '15px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '24px' }}>🔵</span>
              <h3 style={{ margin: '0', fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
                USDC Balance
              </h3>
            </div>
            <button 
              onClick={refreshTokenBalances}
              disabled={isLoadingBalances}
              style={{
                padding: '8px 12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                backgroundColor: 'white',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              {isLoadingBalances ? '⏳' : '🔄'}
            </button>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '5px'
            }}>
              {isLoadingBalances ? 'Loading...' : `${tokenBalances.USDC} USDC`}
            </div>
            <div style={{ fontSize: '16px', color: '#666' }}>
              ≈ ${isLoadingBalances ? '0.00' : tokenBalances.USDC} USD
            </div>
          </div>
        </div>
      )}

      {/* USDT Balance Card */}
      {isConnected && (
        <div style={{
          backgroundColor: '#fff',
          padding: '25px',
          borderRadius: '15px',
          marginBottom: '20px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '15px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '24px' }}>🟢</span>
              <h3 style={{ margin: '0', fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
                USDT Balance
              </h3>
            </div>
            <button 
              onClick={refreshTokenBalances}
              disabled={isLoadingBalances}
              style={{
                padding: '8px 12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                backgroundColor: 'white',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              {isLoadingBalances ? '⏳' : '🔄'}
            </button>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '5px'
            }}>
              {isLoadingBalances ? 'Loading...' : `${tokenBalances.USDT} USDT`}
            </div>
            <div style={{ fontSize: '16px', color: '#666' }}>
              ≈ ${isLoadingBalances ? '0.00' : tokenBalances.USDT} USD
            </div>
          </div>
        </div>
      )}

      {/* Welcome Section */}
      <div style={{
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '15px',
        marginBottom: '20px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          backgroundColor: '#e3f2fd',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '40px',
          margin: '0 auto 20px'
        }}>
          🚀
        </div>
        <h2 style={{
          margin: '0 0 10px 0',
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#333'
        }}>
          Welcome to ZedTrust
        </h2>
        <p style={{
          margin: '0 0 25px 0',
          fontSize: '16px',
          color: '#666',
          lineHeight: '1.5'
        }}>
          Your Web3 DApp for secure P2P trading with TrustWallet and MetaMask integration
        </p>
        
        {!isConnected && (
          <button 
            onClick={connectWallet}
            style={{
              padding: '15px 30px',
              border: 'none',
              borderRadius: '12px',
              backgroundColor: '#4CAF50',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '18px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              margin: '0 auto'
            }}
          >
            🔗 Connect Wallet
          </button>
        )}
      </div>

      {/* Features Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '20px'
      }}>
        <div style={{
          backgroundColor: '#fff',
          padding: '25px',
          borderRadius: '15px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '40px', marginBottom: '15px' }}>🤝</div>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
            P2P Trading
          </h3>
          <p style={{ margin: '0', fontSize: '14px', color: '#666', lineHeight: '1.4' }}>
            Trade directly with other users securely
          </p>
        </div>

        <div style={{
          backgroundColor: '#fff',
          padding: '25px',
          borderRadius: '15px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '40px', marginBottom: '15px' }}>💳</div>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
            Multi-Wallet
          </h3>
          <p style={{ margin: '0', fontSize: '14px', color: '#666', lineHeight: '1.4' }}>
            TrustWallet, MetaMask, and more
          </p>
        </div>

        <div style={{
          backgroundColor: '#fff',
          padding: '25px',
          borderRadius: '15px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '40px', marginBottom: '15px' }}>🔒</div>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
            Secure
          </h3>
          <p style={{ margin: '0', fontSize: '14px', color: '#666', lineHeight: '1.4' }}>
            Your keys, your crypto, your control
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;