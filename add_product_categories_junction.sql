-- =====================================================
-- ADD MULTIPLE CATEGORIES SUPPORT FOR PRODUCTS
-- Creates junction table for many-to-many relationship
-- =====================================================

-- Step 1: Create junction table for product-category many-to-many relationship
CREATE TABLE IF NOT EXISTS product_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  is_primary BOOLEAN DEFAULT false, -- Mark one category as primary
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(product_id, category_id)
);

-- Step 2: Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_product_categories_product ON product_categories(product_id);
CREATE INDEX IF NOT EXISTS idx_product_categories_category ON product_categories(category_id);
CREATE INDEX IF NOT EXISTS idx_product_categories_primary ON product_categories(product_id, is_primary) 
  WHERE is_primary = true;

-- Step 3: Migrate existing category_id data to junction table (optional)
-- This will copy existing single category assignments to the new junction table
INSERT INTO product_categories (product_id, category_id, is_primary)
SELECT id, category_id, true
FROM products
WHERE category_id IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM product_categories 
    WHERE product_categories.product_id = products.id 
    AND product_categories.category_id = products.category_id
  );

-- Step 4: Keep category_id for backward compatibility (make it nullable)
-- The category_id will now represent the primary category
-- We keep it for queries that still use the old single category approach
-- No need to drop it, just make it nullable and it can be synced with primary category

-- Step 5: Create a function to sync primary category with category_id
CREATE OR REPLACE FUNCTION sync_primary_category()
RETURNS TRIGGER AS $$
BEGIN
  -- When a product category is marked as primary, update the product's category_id
  IF NEW.is_primary = true THEN
    UPDATE products 
    SET category_id = NEW.category_id 
    WHERE id = NEW.product_id;
    
    -- Unset other primary categories for this product
    UPDATE product_categories
    SET is_primary = false
    WHERE product_id = NEW.product_id 
      AND category_id != NEW.category_id
      AND is_primary = true;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 6: Create trigger to auto-sync primary category
DROP TRIGGER IF EXISTS sync_primary_category_trigger ON product_categories;
CREATE TRIGGER sync_primary_category_trigger
  AFTER INSERT OR UPDATE ON product_categories
  FOR EACH ROW
  WHEN (NEW.is_primary = true)
  EXECUTE FUNCTION sync_primary_category();

-- Step 7: Add comment for documentation
COMMENT ON TABLE product_categories IS 'Junction table for many-to-many relationship between products and categories';
COMMENT ON COLUMN product_categories.is_primary IS 'Marks the primary category for a product (synced with products.category_id)';

