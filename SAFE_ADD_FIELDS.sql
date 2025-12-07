-- =====================================================
-- SAFE UPDATE - ADD MISSING FIELDS ONLY
-- =====================================================
-- This script ONLY adds missing fields to existing tables
-- No table creation, no policy creation
-- Safe to run even if some fields already exist
-- =====================================================

-- =====================================================
-- 1. ADD MISSING FIELDS TO PRODUCTS TABLE
-- =====================================================

ALTER TABLE products ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS compare_price DECIMAL(10,2);
ALTER TABLE products ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS sku TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS tags JSONB DEFAULT '[]'::jsonb;

-- =====================================================
-- 2. ADD MISSING FIELDS TO VENDORS TABLE
-- =====================================================

ALTER TABLE vendors ADD COLUMN IF NOT EXISTS phone_number TEXT;
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS registration_number TEXT;
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS tax_id TEXT;
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS website_url TEXT;
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS company_profile TEXT;
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS social_media JSONB;
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS verification_documents JSONB;
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS verification_notes TEXT;
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS commission_rate DECIMAL(5,2) DEFAULT 10.00;

-- =====================================================
-- 3. ADD MISSING FIELDS TO ORDERS TABLE
-- =====================================================

ALTER TABLE orders ADD COLUMN IF NOT EXISTS items JSONB;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_address JSONB;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending';

-- Add constraint for payment_status if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'orders_payment_status_check'
  ) THEN
    ALTER TABLE orders ADD CONSTRAINT orders_payment_status_check 
    CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded'));
  END IF;
END $$;

-- =====================================================
-- COMPLETE!
-- =====================================================
-- Run this script in Supabase SQL Editor
-- Expected result: "Success. No rows returned"
-- =====================================================
