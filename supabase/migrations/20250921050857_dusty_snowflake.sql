/*
  # Create Ads Table

  1. New Tables
    - `ads`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `ad_type` (text: 'buy' or 'sell')
      - `token` (text: 'USDC' or 'USDT')
      - `price` (numeric)
      - `available_amount` (numeric)
      - `min_limit` (numeric)
      - `max_limit` (numeric)
      - `payment_methods` (text array)
      - `location` (text)
      - `is_active` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `ads` table
    - Add policies for CRUD operations
*/

CREATE TABLE IF NOT EXISTS ads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  ad_type text NOT NULL CHECK (ad_type IN ('buy', 'sell')),
  token text NOT NULL CHECK (token IN ('USDC', 'USDT')),
  price numeric(10,2) NOT NULL,
  available_amount numeric(15,2) NOT NULL,
  min_limit numeric(10,2) NOT NULL,
  max_limit numeric(10,2) NOT NULL,
  payment_methods text[] DEFAULT ARRAY['UPI Transfer'],
  location text DEFAULT '',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE ads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active ads"
  ON ads
  FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Users can manage own ads"
  ON ads
  FOR ALL
  TO authenticated
  USING (user_id IN (
    SELECT id FROM users WHERE wallet_address = current_setting('request.jwt.claims', true)::json->>'wallet_address'
  ));

-- Index for better performance
CREATE INDEX IF NOT EXISTS idx_ads_active ON ads(is_active, ad_type, token);
CREATE INDEX IF NOT EXISTS idx_ads_location ON ads(location) WHERE is_active = true;