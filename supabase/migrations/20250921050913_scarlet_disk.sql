/*
  # Create Cities Table

  1. New Tables
    - `cities`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `state` (text)
      - `country` (text)
      - `is_active` (boolean)
      - `trader_count` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `cities` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS cities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  state text DEFAULT '',
  country text DEFAULT 'India',
  is_active boolean DEFAULT true,
  trader_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE cities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read cities"
  ON cities
  FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Insert popular Indian cities
INSERT INTO cities (name, state) VALUES
('Mumbai', 'Maharashtra'),
('Delhi', 'Delhi'),
('Bangalore', 'Karnataka'),
('Hyderabad', 'Telangana'),
('Chennai', 'Tamil Nadu'),
('Kolkata', 'West Bengal'),
('Pune', 'Maharashtra'),
('Ahmedabad', 'Gujarat'),
('Jaipur', 'Rajasthan'),
('Surat', 'Gujarat'),
('Lucknow', 'Uttar Pradesh'),
('Kanpur', 'Uttar Pradesh'),
('Nagpur', 'Maharashtra'),
('Indore', 'Madhya Pradesh'),
('Thane', 'Maharashtra'),
('Bhopal', 'Madhya Pradesh'),
('Visakhapatnam', 'Andhra Pradesh'),
('Pimpri-Chinchwad', 'Maharashtra'),
('Patna', 'Bihar'),
('Vadodara', 'Gujarat')
ON CONFLICT (name) DO NOTHING;

-- Index for better search performance
CREATE INDEX IF NOT EXISTS idx_cities_name ON cities(name);
CREATE INDEX IF NOT EXISTS idx_cities_active ON cities(is_active);