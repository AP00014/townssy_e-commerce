-- =====================================================
-- ADD MISSING FIELDS TO EXISTING TABLES
-- =====================================================
-- Run this if your tables already exist
-- This will add only the missing fields
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
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded'));

-- =====================================================
-- VERIFICATION
-- =====================================================

-- Check products table columns
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'products' ORDER BY ordinal_position;

-- Check vendors table columns
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'vendors' ORDER BY ordinal_position;

-- Check orders table columns
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'orders' ORDER BY ordinal_position;

-- =====================================================
-- COMPLETE!
-- =====================================================
-- All missing fields have been added to existing tables
-- Your dashboard will now work perfectly with the schema
-- =====================================================
