-- =====================================================
-- PRODUCTS WITH SECTIONS - COMPLETE SQL UPDATE
-- This file includes all tables needed for product-section relationships
-- Run this after create_home_sections.sql
-- =====================================================

-- =====================================================
-- STEP 1: ENSURE HOME_SECTIONS TABLE EXISTS
-- =====================================================
-- Note: This assumes create_home_sections.sql has been run
-- If not, run create_home_sections.sql first

-- =====================================================
-- STEP 2: CREATE PRODUCT_SECTION_PLACEMENTS TABLE
-- =====================================================

-- Create product_section_placements table if it doesn't exist
CREATE TABLE IF NOT EXISTS product_section_placements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  section_id UUID REFERENCES home_sections(id) ON DELETE CASCADE,
  sort_order INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT false, -- Pin to top of section
  start_date TIMESTAMP WITH TIME ZONE, -- For time-limited placements
  end_date TIMESTAMP WITH TIME ZONE, -- For time-limited placements
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(product_id, section_id)
);

-- =====================================================
-- STEP 3: ADD INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_section_placements_section ON product_section_placements(section_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_section_placements_product ON product_section_placements(product_id);
CREATE INDEX IF NOT EXISTS idx_section_placements_dates ON product_section_placements(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_section_placements_pinned ON product_section_placements(is_pinned, sort_order)
  WHERE is_pinned = true;

-- Composite index for common queries
CREATE INDEX IF NOT EXISTS idx_section_placements_section_product ON product_section_placements(section_id, product_id, sort_order);

-- =====================================================
-- STEP 4: ENABLE ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE product_section_placements ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- STEP 5: CREATE RLS POLICIES
-- =====================================================

-- Policy: Public can view active product placements in active sections
DROP POLICY IF EXISTS "Public can view product placements" ON product_section_placements;
CREATE POLICY "Public can view product placements" ON product_section_placements
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM home_sections hs
      WHERE hs.id = product_section_placements.section_id
        AND hs.is_active = true
    )
    AND (start_date IS NULL OR start_date <= NOW())
    AND (end_date IS NULL OR end_date >= NOW())
  );

-- Policy: Admins can view all placements
DROP POLICY IF EXISTS "Admins can view all placements" ON product_section_placements;
CREATE POLICY "Admins can view all placements" ON product_section_placements
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('super_admin', 'admin')
    )
  );

-- Policy: Admins can insert placements
DROP POLICY IF EXISTS "Admins can insert placements" ON product_section_placements;
CREATE POLICY "Admins can insert placements" ON product_section_placements
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('super_admin', 'admin')
    )
  );

-- Policy: Admins can update placements
DROP POLICY IF EXISTS "Admins can update placements" ON product_section_placements;
CREATE POLICY "Admins can update placements" ON product_section_placements
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('super_admin', 'admin')
    )
  );

-- Policy: Admins can delete placements
DROP POLICY IF EXISTS "Admins can delete placements" ON product_section_placements;
CREATE POLICY "Admins can delete placements" ON product_section_placements
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('super_admin', 'admin')
    )
  );

-- =====================================================
-- STEP 6: ADD COMMENTS FOR DOCUMENTATION
-- =====================================================

COMMENT ON TABLE product_section_placements IS 'Junction table linking products to homepage sections. Admins assign products to sections when creating/editing products.';
COMMENT ON COLUMN product_section_placements.id IS 'Unique identifier for each placement';
COMMENT ON COLUMN product_section_placements.product_id IS 'Reference to the product';
COMMENT ON COLUMN product_section_placements.section_id IS 'Reference to the homepage section';
COMMENT ON COLUMN product_section_placements.sort_order IS 'Order in which product appears in the section (lower numbers appear first)';
COMMENT ON COLUMN product_section_placements.is_pinned IS 'Whether product is pinned to top of section (pinned products appear before non-pinned)';
COMMENT ON COLUMN product_section_placements.start_date IS 'Optional start date for time-limited placement (NULL = no start date restriction)';
COMMENT ON COLUMN product_section_placements.end_date IS 'Optional end date for time-limited placement (NULL = no end date restriction)';
COMMENT ON COLUMN product_section_placements.created_at IS 'Timestamp when placement was created';

-- =====================================================
-- STEP 7: UPDATE PRODUCTS TABLE INDEXES (if needed)
-- =====================================================

-- Ensure products table has necessary indexes for section queries
CREATE INDEX IF NOT EXISTS idx_products_active_featured ON products(is_active, is_featured)
  WHERE is_active = true;

CREATE INDEX IF NOT EXISTS idx_products_verification_status ON products(verification_status)
  WHERE verification_status = 'approved';

-- =====================================================
-- STEP 8: VERIFICATION QUERIES
-- =====================================================

-- Verify table structure
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'product_section_placements'
ORDER BY ordinal_position;

-- Verify indexes
SELECT 
  indexname,
  indexdef
FROM pg_indexes
WHERE tablename = 'product_section_placements'
ORDER BY indexname;

-- Verify RLS is enabled
SELECT 
  tablename,
  rowsecurity
FROM pg_tables
WHERE tablename = 'product_section_placements';

-- Verify policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE tablename = 'product_section_placements'
ORDER BY policyname;

-- =====================================================
-- STEP 9: USEFUL QUERIES FOR TESTING
-- =====================================================

-- View all product-section placements with details
SELECT 
  p.name as product_name,
  p.is_active as product_active,
  hs.display_name as section_name,
  hs.is_active as section_active,
  psp.sort_order,
  psp.is_pinned,
  psp.start_date,
  psp.end_date,
  psp.created_at
FROM product_section_placements psp
JOIN products p ON p.id = psp.product_id
JOIN home_sections hs ON hs.id = psp.section_id
ORDER BY hs.sort_order, psp.is_pinned DESC, psp.sort_order;

-- Count products per section
SELECT 
  hs.display_name as section_name,
  hs.name as section_id,
  COUNT(psp.product_id) as product_count,
  COUNT(psp.product_id) FILTER (WHERE psp.is_pinned = true) as pinned_count
FROM home_sections hs
LEFT JOIN product_section_placements psp ON psp.section_id = hs.id
WHERE hs.is_active = true
GROUP BY hs.id, hs.display_name, hs.name, hs.sort_order
ORDER BY hs.sort_order;

-- View products in a specific section (example: featured)
SELECT 
  p.name as product_name,
  p.price,
  p.is_featured,
  psp.sort_order,
  psp.is_pinned
FROM product_section_placements psp
JOIN products p ON p.id = psp.product_id
WHERE psp.section_id = (SELECT id FROM home_sections WHERE name = 'featured' LIMIT 1)
  AND p.is_active = true
  AND p.verification_status = 'approved'
ORDER BY psp.is_pinned DESC, psp.sort_order
LIMIT 20;

-- Find products not assigned to any section
SELECT 
  p.id,
  p.name,
  p.is_active,
  p.verification_status
FROM products p
WHERE p.is_active = true
  AND p.verification_status = 'approved'
  AND NOT EXISTS (
    SELECT 1 FROM product_section_placements psp
    WHERE psp.product_id = p.id
  )
ORDER BY p.created_at DESC
LIMIT 20;

-- Find sections with no products
SELECT 
  hs.id,
  hs.display_name,
  hs.name,
  hs.is_active
FROM home_sections hs
WHERE hs.is_active = true
  AND NOT EXISTS (
    SELECT 1 FROM product_section_placements psp
    WHERE psp.section_id = hs.id
  )
ORDER BY hs.sort_order;

-- =====================================================
-- NOTES
-- =====================================================
-- 1. This SQL assumes home_sections table already exists
--    Run create_home_sections.sql first if needed
-- 2. Products can be assigned to multiple sections
-- 3. Section assignments are managed in the admin panel
--    when creating/editing products
-- 4. Products appear in sections based on:
--    - Section is_active = true
--    - Product is_active = true
--    - Product verification_status = 'approved'
--    - Placement dates (if set) are within range
--    - Ordered by is_pinned DESC, then sort_order ASC

