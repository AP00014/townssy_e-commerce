-- =====================================================
-- ADD VENDOR_NAME AND ADMIN_NAME TO PRODUCTS TABLE
-- This allows storing vendor/admin names directly in products table
-- =====================================================

-- Step 1: Add vendor_name column (for vendor-created products)
ALTER TABLE products 
  ADD COLUMN IF NOT EXISTS vendor_name TEXT;

-- Step 2: Add admin_name column (for admin-created products)
ALTER TABLE products 
  ADD COLUMN IF NOT EXISTS admin_name TEXT;

-- Step 3: Add comments for documentation
COMMENT ON COLUMN products.vendor_name IS 'Name of the vendor who created this product (for vendor-created products)';
COMMENT ON COLUMN products.admin_name IS 'Name of the admin who created this product (for admin-created products)';

-- Step 4: Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_vendor_name ON products(vendor_name) WHERE vendor_name IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_products_admin_name ON products(admin_name) WHERE admin_name IS NOT NULL;

-- Step 5: Update existing products with vendor names (if vendor_id exists)
UPDATE products p
SET vendor_name = v.business_name
FROM vendors v
WHERE p.vendor_id = v.id
  AND p.vendor_name IS NULL;

-- Step 6: Update existing products with admin names (if verified_by exists and vendor_id is NULL)
UPDATE products p
SET admin_name = pr.full_name
FROM profiles pr
WHERE p.verified_by = pr.id
  AND p.vendor_id IS NULL
  AND p.admin_name IS NULL
  AND pr.role IN ('super_admin', 'admin', 'moderator');

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check if columns were added
SELECT 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns
WHERE table_name = 'products'
  AND column_name IN ('vendor_name', 'admin_name');

-- Check updated products
SELECT 
  COUNT(*) as total_products,
  COUNT(vendor_name) as products_with_vendor_name,
  COUNT(admin_name) as products_with_admin_name
FROM products;

