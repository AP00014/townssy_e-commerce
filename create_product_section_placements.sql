-- =====================================================
-- PRODUCT SECTION PLACEMENTS TABLE
-- Junction table for products in homepage sections
-- =====================================================

-- Step 1: Create product_section_placements table if it doesn't exist
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

-- Step 2: Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_section_placements_section ON product_section_placements(section_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_section_placements_product ON product_section_placements(product_id);
CREATE INDEX IF NOT EXISTS idx_section_placements_dates ON product_section_placements(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_section_placements_pinned ON product_section_placements(is_pinned, sort_order)
  WHERE is_pinned = true;

-- Step 3: Enable Row Level Security
ALTER TABLE product_section_placements ENABLE ROW LEVEL SECURITY;

-- Step 4: Create RLS Policies

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

-- Step 5: Add comments for documentation
COMMENT ON TABLE product_section_placements IS 'Junction table linking products to homepage sections. Admins assign products to sections when creating/editing products.';
COMMENT ON COLUMN product_section_placements.product_id IS 'Reference to the product';
COMMENT ON COLUMN product_section_placements.section_id IS 'Reference to the homepage section';
COMMENT ON COLUMN product_section_placements.sort_order IS 'Order in which product appears in the section';
COMMENT ON COLUMN product_section_placements.is_pinned IS 'Whether product is pinned to top of section';
COMMENT ON COLUMN product_section_placements.start_date IS 'Optional start date for time-limited placement';
COMMENT ON COLUMN product_section_placements.end_date IS 'Optional end date for time-limited placement';

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- View all product-section placements
SELECT 
  p.name as product_name,
  hs.display_name as section_name,
  psp.sort_order,
  psp.is_pinned,
  psp.start_date,
  psp.end_date
FROM product_section_placements psp
JOIN products p ON p.id = psp.product_id
JOIN home_sections hs ON hs.id = psp.section_id
ORDER BY hs.sort_order, psp.sort_order;

-- Count products per section
SELECT 
  hs.display_name as section_name,
  COUNT(psp.product_id) as product_count
FROM home_sections hs
LEFT JOIN product_section_placements psp ON psp.section_id = hs.id
WHERE hs.is_active = true
GROUP BY hs.id, hs.display_name, hs.sort_order
ORDER BY hs.sort_order;

-- View products in a specific section
SELECT 
  p.name as product_name,
  psp.sort_order,
  psp.is_pinned
FROM product_section_placements psp
JOIN products p ON p.id = psp.product_id
WHERE psp.section_id = (SELECT id FROM home_sections WHERE name = 'featured' LIMIT 1)
ORDER BY psp.is_pinned DESC, psp.sort_order;

