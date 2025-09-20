import React, { useState } from 'react';
import { useWeb3 } from '../hooks/useWeb3';

const DAppInterface: React.FC = () => {
  const { 
    account, 
    isConnected, 
    sendTransaction, 
    switchNetwork,
    chainId 
  } = useWeb3();

  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [error, setError] = useState('');

  const handleSendTransaction = async () => {
    if (!recipient || !amount) {
      setError('Please fill all fields');
      return;
    }

    setIsLoading(true);
    setError('');
    setTxHash('');

    try {
      const tx = await sendTransaction(recipient, amount);
      setTxHash(tx.hash);
      setRecipient('');
      setAmount('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwitchNetwork = async (targetChainId: number) => {
    try {
      await switchNetwork(targetChainId);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (!isConnected) {
    return (
      <div className="dapp-interface">
        <div className="not-connected">
          <h3>🔒 Wallet Not Connected</h3>
          <p>Please connect your wallet to use DApp features</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dapp-interface">
      <div className="dapp-header">
        <h2>🚀 ZedTrust DApp</h2>
        <p>Web3 enabled application ready for TrustWallet</p>
      </div>

      <div className="network-switcher">
        <h4>Switch Network:</h4>
        <div className="network-buttons">
          <button 
            onClick={() => handleSwitchNetwork(1)}
            className={chainId === 1 ? 'active' : ''}
          >
            Ethereum
          </button>
          <button 
            onClick={() => handleSwitchNetwork(56)}
            className={chainId === 56 ? 'active' : ''}
          >
            BSC
          </button>
          <button 
            onClick={() => handleSwitchNetwork(137)}
            className={chainId === 137 ? 'active' : ''}
          >
            Polygon
          </button>
        </div>
      </div>

      <div className="transaction-form">
        <h4>Send Transaction:</h4>
        <div className="form-group">
          <label>Recipient Address:</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="0x..."
            className="address-input"
          />
        </div>
        
        <div className="form-group">
          <label>Amount (ETH):</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.01"
            step="0.001"
            className="amount-input"
          />
        </div>

        <button 
          onClick={handleSendTransaction}
          disabled={isLoading || !recipient || !amount}
          className="send-btn"
        >
          {isLoading ? 'Sending...' : 'Send Transaction'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          ❌ {error}
        </div>
      )}

      {txHash && (
        <div className="success-message">
          ✅ Transaction sent! 
          <br />
          <a 
            href={`https://etherscan.io/tx/${txHash}`} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            View on Etherscan
          </a>
        </div>
      )}

      <div className="dapp-features">
        <h4>🎯 DApp Features:</h4>
        <ul>
          <li>✅ TrustWallet Compatible</li>
          <li>✅ Multi-chain Support</li>
          <li>✅ Secure Transactions</li>
          <li>✅ Real-time Balance</li>
          <li>✅ Network Switching</li>
        </ul>
      </div>
    </div>
  );
};

export default DAppInterface;