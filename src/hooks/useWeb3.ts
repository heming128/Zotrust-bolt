import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';

// Safe window check
const isClient = typeof window !== 'undefined';

// ERC-20 Token Contract ABI (minimal)
const ERC20_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)'
];

// Token contract addresses
const TOKEN_ADDRESSES = {
  // Ethereum Mainnet
  1: {
    USDC: '0xA0b86a33E6441b8435b662303c0f479c7e2f9f0D',
    USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7'
  },
  // BSC Mainnet
  56: {
    USDC: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
    USDT: '0x55d398326f99059fF775485246999027B3197955'
  },
  // Polygon
  137: {
    USDC: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    USDT: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F'
  },
  // Goerli Testnet (for testing)
  5: {
    USDC: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
    USDT: '0x509Ee0d083DdF8AC028f2a56731412edD63223B9'
  },
  // BSC Testnet
  97: {
    USDC: '0x64544969ed7EBf5f083679233325356EbE738930',
    USDT: '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd'
  }
};

interface Web3State {
  account: string | null;
  chainId: number | null;
  balance: string | null;
  provider: ethers.BrowserProvider | null;
  isConnected: boolean;
  isConnecting: boolean;
  tokenBalances: {
    USDC: string;
    USDT: string;
  };
  isLoadingBalances: boolean;
}

export const useWeb3 = () => {
  const [web3State, setWeb3State] = useState<Web3State>({
    account: null,
    chainId: null,
    balance: null,
    provider: null,
    isConnected: false,
    isConnecting: false,
    tokenBalances: {
      USDC: '0.00',
      USDT: '0.00'
    },
    isLoadingBalances: false,
  });

  const [error, setError] = useState<string | null>(null);

  // Fetch token balances
  const fetchTokenBalances = useCallback(async (provider: ethers.BrowserProvider, account: string, chainId: number) => {
    if (!isClient) return;
    
    try {
      setWeb3State(prev => ({ ...prev, isLoadingBalances: true }));
      
      const tokenAddresses = TOKEN_ADDRESSES[chainId as keyof typeof TOKEN_ADDRESSES];
      if (!tokenAddresses) {
        console.log(`Network ${chainId} not supported for token balances`);
        setWeb3State(prev => ({ 
          ...prev, 
          tokenBalances: { USDC: '0.00', USDT: '0.00' },
          isLoadingBalances: false 
        }));
        return;
      }

      console.log(`Fetching token balances for chain ${chainId}:`, tokenAddresses);
      
      const usdcContract = new ethers.Contract(tokenAddresses.USDC, ERC20_ABI, provider);
      const usdtContract = new ethers.Contract(tokenAddresses.USDT, ERC20_ABI, provider);

      const [usdcBalance, usdtBalance, usdcDecimals, usdtDecimals] = await Promise.all([
        usdcContract.balanceOf(account),
        usdtContract.balanceOf(account),
        usdcContract.decimals(),
        usdtContract.decimals()
      ]);

      const formattedUSDC = ethers.formatUnits(usdcBalance, usdcDecimals);
      const formattedUSDT = ethers.formatUnits(usdtBalance, usdtDecimals);

      console.log('Token balances fetched:', {
        USDC: formattedUSDC,
        USDT: formattedUSDT,
        chainId
      });

      setWeb3State(prev => ({
        ...prev,
        tokenBalances: {
          USDC: parseFloat(formattedUSDC).toFixed(2),
          USDT: parseFloat(formattedUSDT).toFixed(2)
        },
        isLoadingBalances: false
      }));
    } catch (err) {
      console.error('Error fetching token balances:', err);
      // Show actual error in console for debugging
      console.error('Chain ID:', chainId);
      console.error('Account:', account);
      setWeb3State(prev => ({ 
        ...prev, 
        tokenBalances: { USDC: '0.00', USDT: '0.00' },
        isLoadingBalances: false 
      }));
    }
  }, []);

  // Check if wallet is already connected
  useEffect(() => {
    if (isClient && window.ethereum) {
      checkConnection();
    }
  }, [isClient]);

  const checkConnection = async () => {
    if (!isClient || !window.ethereum) return;
    
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.listAccounts();
      
      if (accounts.length > 0) {
        const network = await provider.getNetwork();
        const balance = await provider.getBalance(accounts[0]);
        const chainId = Number(network.chainId);
        
        setWeb3State({
          account: accounts[0].address,
          chainId,
          balance: ethers.formatEther(balance),
          provider,
          isConnected: true,
          isConnecting: false,
          tokenBalances: { USDC: '0.00', USDT: '0.00' },
          isLoadingBalances: false,
        });
        
        // Fetch token balances
        fetchTokenBalances(provider, accounts[0].address, chainId);
      }
    } catch (err) {
      console.error('Error checking connection:', err);
      setError(null); // Don't show error for auto-check
    }
  };

  const connectWallet = useCallback(async () => {
    if (!isClient || !window.ethereum) {
      setError('No active wallet found');
      return;
    }

    setWeb3State(prev => ({ ...prev, isConnecting: true }));
    setError(null);

    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const account = await signer.getAddress();
      const network = await provider.getNetwork();
      const balance = await provider.getBalance(account);
      const chainId = Number(network.chainId);

      console.log('Wallet connected:', {
        account,
        chainId,
        network: network.name,
        balance: ethers.formatEther(balance)
      });

      setWeb3State({
        account,
        chainId,
        balance: ethers.formatEther(balance),
        provider,
        isConnected: true,
        isConnecting: false,
        tokenBalances: { USDC: '0.00', USDT: '0.00' },
        isLoadingBalances: false,
      });

      // Fetch token balances
      setTimeout(() => {
        fetchTokenBalances(provider, account, chainId);
      }, 1000); // Small delay to ensure connection is stable

      // Listen for account changes
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet');
      setWeb3State(prev => ({ ...prev, isConnecting: false }));
      console.error('Wallet connection error:', err);
    }
  }, [fetchTokenBalances, isClient]);

  const disconnectWallet = useCallback(() => {
    setWeb3State({
      account: null,
      chainId: null,
      balance: null,
      provider: null,
      isConnected: false,
      isConnecting: false,
      tokenBalances: { USDC: '0.00', USDT: '0.00' },
      isLoadingBalances: false,
    });
    setError(null);

    // Remove listeners
    if (isClient && window.ethereum) {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    }
  }, [isClient]);

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

  // Refresh token balances
  const refreshTokenBalances = useCallback(() => {
    if (web3State.provider && web3State.account && web3State.chainId) {
      fetchTokenBalances(web3State.provider, web3State.account, web3State.chainId);
    }
  }, [web3State.provider, web3State.account, web3State.chainId, fetchTokenBalances]);

  const switchNetwork = async (chainId: number) => {
    if (!isClient || !window.ethereum) return;

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
      const signer = await web3State.provider.getSigner();
      const tx = await signer.sendTransaction({
        to,
        value: ethers.parseEther(value),
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
    refreshTokenBalances,
  };
};