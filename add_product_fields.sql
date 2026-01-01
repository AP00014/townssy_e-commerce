-- =====================================================
-- ADD NEW FIELDS TO PRODUCTS TABLE
-- Run this SQL to add location, region, delivery, and WhatsApp fields
-- =====================================================

-- Step 1: Make vendor_id nullable (remove NOT NULL constraint if exists)
ALTER TABLE products 
  ALTER COLUMN vendor_id DROP NOT NULL;

-- Step 2: Add location field
ALTER TABLE products 
  ADD COLUMN IF NOT EXISTS location TEXT;

-- Step 3: Add region field
ALTER TABLE products 
  ADD COLUMN IF NOT EXISTS region TEXT;

-- Step 4: Add delivery field
ALTER TABLE products 
  ADD COLUMN IF NOT EXISTS delivery BOOLEAN DEFAULT false;

-- Step 5: Add delivery_options field
ALTER TABLE products 
  ADD COLUMN IF NOT EXISTS delivery_options JSONB DEFAULT '[]'::jsonb;

-- Step 6: Add supplier_whatsapp field
ALTER TABLE products 
  ADD COLUMN IF NOT EXISTS supplier_whatsapp TEXT;

-- Step 7: Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_location ON products(location);
CREATE INDEX IF NOT EXISTS idx_products_region ON products(region);
CREATE INDEX IF NOT EXISTS idx_products_delivery ON products(delivery) 
  WHERE delivery = true;

-- Step 8: Update vendor_id index to handle NULL values
DROP INDEX IF EXISTS idx_products_vendor;
CREATE INDEX IF NOT EXISTS idx_products_vendor ON products(vendor_id) 
  WHERE vendor_id IS NOT NULL;

