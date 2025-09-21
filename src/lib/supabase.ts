import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface User {
  id: string
  wallet_address: string
  name: string
  mobile: string
  is_verified: boolean
  city: string
  rating: number
  total_trades: number
  created_at: string
  updated_at: string
}

export interface Ad {
  id: string
  user_id: string
  ad_type: 'buy' | 'sell'
  token: 'USDC' | 'USDT'
  price: number
  available_amount: number
  min_limit: number
  max_limit: number
  payment_methods: string[]
  location: string
  is_active: boolean
  created_at: string
  updated_at: string
  user?: User
}

export interface Trade {
  id: string
  buyer_id: string
  seller_id: string
  ad_id: string
  token: 'USDC' | 'USDT'
  amount: number
  price: number
  total_value: number
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  tx_hash: string
  payment_method: string
  created_at: string
  updated_at: string
  buyer?: User
  seller?: User
  ad?: Ad
}

export interface City {
  id: string
  name: string
  state: string
  country: string
  is_active: boolean
  trader_count: number
  created_at: string
}

// Database Functions
export const dbFunctions = {
  // User functions
  async createUser(walletAddress: string, userData: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .insert({
        wallet_address: walletAddress,
        ...userData
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getUser(walletAddress: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('wallet_address', walletAddress)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  async updateUser(walletAddress: string, userData: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .update({
        ...userData,
        updated_at: new Date().toISOString()
      })
      .eq('wallet_address', walletAddress)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Ad functions
  async createAd(userId: string, adData: Omit<Ad, 'id' | 'user_id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('ads')
      .insert({
        user_id: userId,
        ...adData
      })
      .select(`
        *,
        user:users(*)
      `)
      .single()
    
    if (error) throw error
    return data
  },

  async getAds(filters: {
    adType?: 'buy' | 'sell'
    token?: 'USDC' | 'USDT'
    location?: string
    isActive?: boolean
  } = {}) {
    let query = supabase
      .from('ads')
      .select(`
        *,
        user:users(*)
      `)
      .eq('is_active', filters.isActive ?? true)
      .order('created_at', { ascending: false })

    if (filters.adType) {
      query = query.eq('ad_type', filters.adType)
    }
    
    if (filters.token) {
      query = query.eq('token', filters.token)
    }
    
    if (filters.location) {
      query = query.ilike('location', `%${filters.location}%`)
    }

    const { data, error } = await query
    
    if (error) throw error
    return data || []
  },

  async getUserAds(walletAddress: string) {
    const { data, error } = await supabase
      .from('ads')
      .select(`
        *,
        user:users(*)
      `)
      .eq('user.wallet_address', walletAddress)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Trade functions
  async createTrade(tradeData: Omit<Trade, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('trades')
      .insert(tradeData)
      .select(`
        *,
        buyer:users!buyer_id(*),
        seller:users!seller_id(*),
        ad:ads(*)
      `)
      .single()
    
    if (error) throw error
    return data
  },

  async getUserTrades(walletAddress: string) {
    const { data: user } = await this.getUser(walletAddress)
    if (!user) return []

    const { data, error } = await supabase
      .from('trades')
      .select(`
        *,
        buyer:users!buyer_id(*),
        seller:users!seller_id(*),
        ad:ads(*)
      `)
      .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // City functions
  async getCities(searchTerm?: string) {
    let query = supabase
      .from('cities')
      .select('*')
      .eq('is_active', true)
      .order('trader_count', { ascending: false })
      .order('name')

    if (searchTerm) {
      query = query.ilike('name', `%${searchTerm}%`)
    }

    const { data, error } = await query
    
    if (error) throw error
    return data || []
  }
}