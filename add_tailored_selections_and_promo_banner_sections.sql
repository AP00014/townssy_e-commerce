-- =====================================================
-- ADD TAILORED SELECTIONS AND PROMO BANNER SECTIONS
-- This script adds two new special sections to home_sections
-- Run this in Supabase SQL Editor
-- =====================================================

-- Add Tailored Selections section
INSERT INTO home_sections (
  name,
  display_name,
  description,
  section_type,
  is_active,
  sort_order,
  max_products,
  layout_config
) VALUES (
  'tailored_selections',
  'Tailored Selections',
  'Personalized category selections for users',
  'category',
  true,
  0, -- Will appear first
  4,
  '{
    "type": "tailored_selections",
    "items": [
      {
        "id": 41,
        "label": "Women''s Clothes",
        "slug": "womens-clothes",
        "category": "Fashion",
        "image": "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=200&fit=crop"
      },
      {
        "id": 42,
        "label": "Designer Shoe",
        "slug": "designer-shoes",
        "category": "Fashion",
        "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop"
      },
      {
        "id": 43,
        "label": "Food Trailer",
        "slug": "food-trailers",
        "category": "Food",
        "image": "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=200&h=200&fit=crop"
      },
      {
        "id": 44,
        "label": "Spider Hoodie",
        "slug": "spider-hoodies",
        "category": "Fashion",
        "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop"
      }
    ]
  }'::jsonb
)
ON CONFLICT (name) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  description = EXCLUDED.description,
  section_type = EXCLUDED.section_type,
  layout_config = EXCLUDED.layout_config,
  updated_at = NOW();

-- Add Promo Banner section
INSERT INTO home_sections (
  name,
  display_name,
  description,
  section_type,
  is_active,
  sort_order,
  max_products,
  layout_config
) VALUES (
  'promo_banner',
  'Promo Banner',
  'Promotional banner carousel with slides',
  'deal',
  true,
  0, -- Will appear first
  5,
  '{
    "type": "promo_banner",
    "slides": [
      {
        "id": 1,
        "title": "Big Sale",
        "subtitle": "Up to 50% Discount",
        "image": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=300&fit=crop",
        "gradient": "linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color-dark) 100%)"
      },
      {
        "id": 2,
        "title": "New Arrivals",
        "subtitle": "Shop the Latest Trends",
        "image": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop",
        "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      },
      {
        "id": 3,
        "title": "Free Shipping",
        "subtitle": "On Orders Over ₵200",
        "image": "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=300&h=300&fit=crop",
        "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
      },
      {
        "id": 4,
        "title": "Flash Deals",
        "subtitle": "Limited Time Offers",
        "image": "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&h=300&fit=crop",
        "gradient": "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
      },
      {
        "id": 5,
        "title": "Best Sellers",
        "subtitle": "Top Rated Products",
        "image": "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=300&h=300&fit=crop",
        "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
      }
    ]
  }'::jsonb
)
ON CONFLICT (name) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  description = EXCLUDED.description,
  section_type = EXCLUDED.section_type,
  layout_config = EXCLUDED.layout_config,
  updated_at = NOW();

-- Verify the sections were added
SELECT 
  name,
  display_name,
  section_type,
  is_active,
  sort_order,
  layout_config->>'type' as config_type
FROM home_sections
WHERE name IN ('tailored_selections', 'promo_banner')
ORDER BY sort_order;

