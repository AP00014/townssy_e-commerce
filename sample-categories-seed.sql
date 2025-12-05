-- Sample categories for testing
-- Run this in Supabase SQL Editor to add sample categories

INSERT INTO categories (name, slug, description, is_active, sort_order)
VALUES
  ('Electronics', 'electronics', 'Electronic devices and accessories', true, 1),
  ('Fashion', 'fashion', 'Clothing, shoes, and accessories', true, 2),
  ('Home & Living', 'home-living', 'Home decor and furniture', true, 3),
  ('Beauty & Health', 'beauty-health', 'Beauty products and health items', true, 4),
  ('Sports & Outdoors', 'sports-outdoors', 'Sports equipment and outdoor gear', true, 5),
  ('Books & Media', 'books-media', 'Books, music, and movies', true, 6),
  ('Toys & Games', 'toys-games', 'Toys and gaming products', true, 7),
  ('Food & Beverages', 'food-beverages', 'Food items and drinks', true, 8),
  ('Automotive', 'automotive', 'Car parts and accessories', true, 9),
  ('Office Supplies', 'office-supplies', 'Office equipment and stationery', true, 10)
ON CONFLICT (slug) DO NOTHING;

-- Sample subcategories
INSERT INTO categories (name, slug, parent_id, description, is_active, sort_order)
VALUES
  -- Electronics subcategories
  ('Smartphones', 'smartphones', 
   (SELECT id FROM categories WHERE slug = 'electronics'), 
   'Mobile phones and accessories', true, 1),
  ('Laptops', 'laptops', 
   (SELECT id FROM categories WHERE slug = 'electronics'), 
   'Laptop computers', true, 2),
  ('Headphones', 'headphones', 
   (SELECT id FROM categories WHERE slug = 'electronics'), 
   'Headphones and earbuds', true, 3),
  
  -- Fashion subcategories
  ('Men''s Clothing', 'mens-clothing', 
   (SELECT id FROM categories WHERE slug = 'fashion'), 
   'Clothing for men', true, 1),
  ('Women''s Clothing', 'womens-clothing', 
   (SELECT id FROM categories WHERE slug = 'fashion'), 
   'Clothing for women', true, 2),
  ('Shoes', 'shoes', 
   (SELECT id FROM categories WHERE slug = 'fashion'), 
   'Footwear for all', true, 3),
  
  -- Home & Living subcategories
  ('Furniture', 'furniture', 
   (SELECT id FROM categories WHERE slug = 'home-living'), 
   'Home and office furniture', true, 1),
  ('Decor', 'decor', 
   (SELECT id FROM categories WHERE slug = 'home-living'), 
   'Home decorations', true, 2),
  ('Kitchen', 'kitchen', 
   (SELECT id FROM categories WHERE slug = 'home-living'), 
   'Kitchen items and appliances', true, 3)
ON CONFLICT (slug) DO NOTHING;

-- Sample verified vendor for testing
-- Note: You'll need to create a user account first and get their UUID
-- Then update this with the actual user_id

-- To create a test vendor, first create a user in Supabase Auth,
-- then run this (replace 'USER_UUID_HERE' with actual UUID):
/*
INSERT INTO vendors (
  user_id,
  business_name,
  business_type,
  description,
  verification_status,
  is_featured,
  commission_rate,
  location
)
VALUES (
  'USER_UUID_HERE',
  'Tech Store Demo',
  'Retailer',
  'Premium electronics and gadgets',
  'verified',
  true,
  10.00,
  '{"city": "New York", "country": "USA"}'::jsonb
);
*/
