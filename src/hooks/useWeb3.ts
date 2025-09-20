import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';

interface Web3State {
  account: string | null;
  chainId: number | null;
  balance: string | null;
  provider: ethers.providers.Web3Provider | null;
  isConnected: boolean;
  isConnecting: boolean;
}

export const useWeb3 = () => {
  const [web3State, setWeb3State] = useState<Web3State>({
    account: null,
    chainId: null,
    balance: null,
    provider: null,
    isConnected: false,
    isConnecting: false,
  });

  const [error, setError] = useState<string | null>(null);

  // Check if wallet is already connected
  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();
        
        if (accounts.length > 0) {
          const network = await provider.getNetwork();
          const balance = await provider.getBalance(accounts[0]);
          
          setWeb3State({
            account: accounts[0],
            chainId: network.chainId,
            balance: ethers.utils.formatEther(balance),
            provider,
            isConnected: true,
            isConnecting: false,
          });
        }
      }
    } catch (err) {
      console.error('Error checking connection:', err);
    }
  };

  const connectWallet = useCallback(async () => {
    if (typeof window.ethereum === 'undefined') {
      setError('Please install MetaMask or use TrustWallet DApp browser!');
      return;
    }

    setWeb3State(prev => ({ ...prev, isConnecting: true }));
    setError(null);

    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const account = await signer.getAddress();
      const network = await provider.getNetwork();
      const balance = await provider.getBalance(account);

      setWeb3State({
        account,
        chainId: network.chainId,
        balance: ethers.utils.formatEther(balance),
        provider,
        isConnected: true,
        isConnecting: false,
      });

      // Listen for account changes
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet');
      setWeb3State(prev => ({ ...prev, isConnecting: false }));
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setWeb3State({
      account: null,
      chainId: null,
      balance: null,
      provider: null,
      isConnected: false,
      isConnecting: false,
    });
    setError(null);

    // Remove listeners
    if (window.ethereum) {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    }
  }, []);

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      disconnectWallet();
    } else {
      checkConnection();
    }
  };

  const handleChainChanged = () => {
    checkConnection();
  };

  const switchNetwork = async (chainId: number) => {
    if (!window.ethereum) return;

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
    } catch (err: any) {
      if (err.code === 4902) {
        // Network not added to wallet
        setError('Please add this network to your wallet first');
      } else {
        setError(err.message);
      }
    }
  };

  const sendTransaction = async (to: string, value: string) => {
    if (!web3State.provider || !web3State.account) {
      throw new Error('Wallet not connected');
    }

    try {
      const signer = web3State.provider.getSigner();
      const tx = await signer.sendTransaction({
        to,
        value: ethers.utils.parseEther(value),
      });

      return tx;
    } catch (err: any) {
      throw new Error(err.message || 'Transaction failed');
    }
  };

  return {
    ...web3State,
    error,
    connectWallet,
    disconnectWallet,
    switchNetwork,
    sendTransaction,
  };
};