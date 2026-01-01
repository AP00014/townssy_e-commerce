-- =====================================================
-- ADD SUPPLIER_TYPE FIELD TO PRODUCTS TABLE
-- This field is required and must be either 'supplier' or 'manufacturer'
-- =====================================================

-- Step 1: Add supplier_type column
ALTER TABLE products 
  ADD COLUMN IF NOT EXISTS supplier_type TEXT;

-- Step 2: Add check constraint to ensure only 'supplier' or 'manufacturer' values
ALTER TABLE products 
  DROP CONSTRAINT IF EXISTS products_supplier_type_check;

ALTER TABLE products 
  ADD CONSTRAINT products_supplier_type_check 
  CHECK (supplier_type IN ('supplier', 'manufacturer'));

-- Step 3: Add comment to the column
COMMENT ON COLUMN products.supplier_type IS 'Product source type: supplier or manufacturer (required)';

-- Step 4: Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_products_supplier_type ON products(supplier_type);

-- Step 5: Update existing products (optional - set a default if needed)
-- Uncomment the line below if you want to set a default value for existing products
-- UPDATE products SET supplier_type = 'supplier' WHERE supplier_type IS NULL;

-- Step 6: Make the column NOT NULL (after setting defaults for existing records)
-- Uncomment the line below after updating existing records
-- ALTER TABLE products ALTER COLUMN supplier_type SET NOT NULL;

-- Verification query
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'products' 
  AND column_name = 'supplier_type';

