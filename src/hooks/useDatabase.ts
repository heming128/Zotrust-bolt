import { useState, useEffect } from 'react';
import { dbFunctions, type User, type Ad, type Trade } from '../lib/supabase';
import { useWeb3 } from './useWeb3';

export const useDatabase = () => {
  const { account } = useWeb3();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize user when wallet connects
  useEffect(() => {
    if (account) {
      initializeUser();
    } else {
      setUser(null);
    }
  }, [account]);

  const initializeUser = async () => {
    if (!account) return;

    try {
      setLoading(true);
      let userData = await dbFunctions.getUser(account);
      
      if (!userData) {
        // Create new user if doesn't exist
        userData = await dbFunctions.createUser(account, {
          name: '',
          mobile: '',
          is_verified: false,
          city: '',
          rating: 5.0,
          total_trades: 0
        });
      }
      
      setUser(userData);
    } catch (err: any) {
      setError(err.message);
      console.error('Error initializing user:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (profileData: Partial<User>) => {
    if (!account || !user) return null;

    try {
      setLoading(true);
      const updatedUser = await dbFunctions.updateUser(account, profileData);
      setUser(updatedUser);
      return updatedUser;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createAd = async (adData: Omit<Ad, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'user'>) => {
    if (!user) throw new Error('User not found');

    try {
      setLoading(true);
      const newAd = await dbFunctions.createAd(user.id, adData);
      return newAd;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getAds = async (filters: {
    adType?: 'buy' | 'sell';
    token?: 'USDC' | 'USDT';
    location?: string;
  } = {}) => {
    try {
      setLoading(true);
      const ads = await dbFunctions.getAds(filters);
      return ads;
    } catch (err: any) {
      setError(err.message);
      return []; // Return empty array on error
    } finally {
      setLoading(false);
    }
  };

  const getUserTrades = async () => {
    if (!account) return [];

    try {
      setLoading(true);
      const trades = await dbFunctions.getUserTrades(account);
      return trades;
    } catch (err: any) {
      setError(err.message);
      return []; // Return empty array on error
    } finally {
      setLoading(false);
    }
  };

  const createTrade = async (tradeData: Omit<Trade, 'id' | 'created_at' | 'updated_at' | 'buyer' | 'seller' | 'ad'>) => {
    try {
      setLoading(true);
      const newTrade = await dbFunctions.createTrade(tradeData);
      return newTrade;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getCities = async (searchTerm?: string) => {
    try {
      const cities = await dbFunctions.getCities(searchTerm);
      return cities;
    } catch (err: any) {
      setError(err.message);
      // Return fallback cities on error
      const fallbackCities = [
        { id: '1', name: 'Mumbai', state: 'Maharashtra', country: 'India', is_active: true, trader_count: 0, created_at: '' },
        { id: '2', name: 'Delhi', state: 'Delhi', country: 'India', is_active: true, trader_count: 0, created_at: '' },
        { id: '3', name: 'Bangalore', state: 'Karnataka', country: 'India', is_active: true, trader_count: 0, created_at: '' },
        { id: '4', name: 'Hyderabad', state: 'Telangana', country: 'India', is_active: true, trader_count: 0, created_at: '' },
        { id: '5', name: 'Chennai', state: 'Tamil Nadu', country: 'India', is_active: true, trader_count: 0, created_at: '' },
        { id: '6', name: 'Kolkata', state: 'West Bengal', country: 'India', is_active: true, trader_count: 0, created_at: '' },
        { id: '7', name: 'Pune', state: 'Maharashtra', country: 'India', is_active: true, trader_count: 0, created_at: '' },
        { id: '8', name: 'Ahmedabad', state: 'Gujarat', country: 'India', is_active: true, trader_count: 0, created_at: '' }
      ];
      
      if (searchTerm) {
        return fallbackCities.filter(city => 
          city.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      return fallbackCities;
    }
  };

  return {
    user,
    loading,
    error,
    updateUserProfile,
    createAd,
    getAds,
    getUserTrades,
    createTrade,
    getCities,
    clearError: () => setError(null)
  };
};