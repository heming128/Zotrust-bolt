import React, { useState } from 'react';
import { useWeb3 } from '../hooks/useWeb3';
import CityModal from './CityModal';

const Dashboard: React.FC = () => {
  const { 
    account, 
    isConnected, 
    balance, 
    tokenBalances, 
    isLoadingBalances,
    connectWallet, 
    refreshTokenBalances 
  } = useWeb3();

  const [showCityModal, setShowCityModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
  };

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f5f7fa',
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '25px'
      }}>
        <h1 style={{
          margin: 0,
          fontSize: '24px',
          fontWeight: '600',
          color: '#1a1a1a'
        }}>
          ZoTrust Dashboard
        </h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <span style={{ fontSize: '20px' }}>🔔</span>
          <span style={{ fontSize: '20px' }}>👤</span>
        </div>
      </div>

      {/* Connect Wallet Card */}
      {!isConnected && (
        <div style={{
          backgroundColor: '#4a6cf7',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '20px',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}>
          <div style={{
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
            width: '48px',
            height: '48px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px'
          }}>
            💳
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '600' }}>
              Connect Wallet
            </h3>
            <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>
              Connect to start trading
            </p>
          </div>
        </div>
      )}

      {/* USDC Balance Card */}
      <div style={{
        backgroundColor: '#4a6cf7',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '20px',
        color: 'white',
        position: 'relative'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px'
        }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '500' }}>
            USDC Balance
          </h3>
          <button 
            onClick={refreshTokenBalances}
            disabled={isLoadingBalances}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '8px',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            {isLoadingBalances ? '⏳' : '🔄'}
          </button>
        </div>
        
        <div style={{ textAlign: 'left' }}>
          <div style={{
            fontSize: '36px',
            fontWeight: '700',
            marginBottom: '4px'
          }}>
            ${isLoadingBalances ? '0.00' : tokenBalances.USDC}
          </div>
          <div style={{
            fontSize: '16px',
            opacity: 0.8
          }}>
            ≈ ${isLoadingBalances ? '0.00' : (parseFloat(tokenBalances.USDC) * 1.00).toFixed(2)} USD
          </div>
        </div>
      </div>

      {/* Add Your City Card */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '20px',
        textAlign: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          backgroundColor: '#4a6cf7',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
          fontSize: '24px'
        }}>
          <span style={{ color: 'white' }}>📍</span>
        </div>
        
        <h3 style={{
          margin: '0 0 8px 0',
          fontSize: '20px',
          fontWeight: '600',
          color: '#1a1a1a'
        }}>
          {selectedCity || 'Add Your City'}
        </h3>
        
        <p style={{
          margin: '0 0 20px 0',
          fontSize: '14px',
          color: '#666',
          lineHeight: '1.4'
        }}>
          Please select your city to find nearby active traders in your area.
        </p>
        
        <button
          onClick={() => setShowCityModal(true)}
          style={{
            backgroundColor: '#4a6cf7',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            margin: '0 auto'
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'scale(0.98)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          🏢 Select City
        </button>
      </div>

      {/* Welcome Section */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '100px',
          height: '100px',
          backgroundColor: '#e8f2ff',
          borderRadius: '50%',
          opacity: 0.5
        }}></div>
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '12px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#4a6cf7',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              💳
            </div>
            <div>
              <h3 style={{
                margin: 0,
                fontSize: '18px',
                fontWeight: '600',
                color: '#1a1a1a'
              }}>
                Welcome to
              </h3>
            </div>
          </div>
          
          <h2 style={{
            margin: '0 0 16px 0',
            fontSize: '24px',
            fontWeight: '700',
            color: '#4a6cf7'
          }}>
            ZedTrust Web3
          </h2>
          
          {!isConnected && (
            <button
              onClick={connectWallet}
              style={{
                backgroundColor: '#00d4aa',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              🔗 Connect Wallet
            </button>
          )}
        </div>
      </div>

      {/* City Modal */}
      <CityModal
        isOpen={showCityModal}
        onClose={() => setShowCityModal(false)}
        onSelectCity={handleCitySelect}
      />
    </div>
  );
};

export default Dashboard;