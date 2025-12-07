-- =====================================================
-- COMPLETE SQL SCHEMA FOR TOWNSSY E-COMMERCE PLATFORM
-- Multi-Role Admin Dashboard + Vendor Management
-- Generated based on full application scan
-- =====================================================

-- Drop existing tables if recreating (use with caution)
-- DROP SCHEMA IF EXISTS public CASCADE;
-- CREATE SCHEMA public;

-- =====================================================
-- CORE USER & AUTHENTICATION
-- =====================================================

-- NOTE: Profiles table already exists in database
-- Referencing existing profiles table for foreign keys

-- Role permissions table for granular RBAC
CREATE TABLE IF NOT EXISTS role_permissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  role TEXT NOT NULL,
  module TEXT NOT NULL, -- 'vendors', 'products', 'orders', 'users', 'agents', 'finances', 'reports', 'settings'
  can_view BOOLEAN DEFAULT false,
  can_create BOOLEAN DEFAULT false,
  can_edit BOOLEAN DEFAULT false,
  can_delete BOOLEAN DEFAULT false,
  can_approve BOOLEAN DEFAULT false,
  can_verify BOOLEAN DEFAULT false,
  can_export BOOLEAN DEFAULT false,
  custom_permissions JSONB, -- Additional module-specific permissions
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(role, module)
);

-- =====================================================
-- VENDOR MANAGEMENT
-- =====================================================

-- Vendors table
CREATE TABLE IF NOT EXISTS vendors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  business_type TEXT, -- 'Manufacturer', 'Wholesaler', 'Retailer', 'Distributor', 'Supplier'
  registration_number TEXT,
  tax_id TEXT,
  description TEXT,
  logo_url TEXT,
  banner_url TEXT,
  website_url TEXT,
  email TEXT,
  phone_number TEXT,
  business_address TEXT,
  business_city TEXT,
  business_state TEXT,
  business_country TEXT DEFAULT 'USA',
  business_postal_code TEXT,
  coordinates JSONB, -- {lat, lng}
  
  -- Performance Metrics (for vendor profile page)
  years_active INTEGER DEFAULT 0, -- How many years in business
  response_rate TEXT, -- e.g., "98%"
  response_time TEXT, -- e.g., "< 3h"
  on_time_delivery_rate DECIMAL(5,2) DEFAULT 98.5, -- percentage
  transaction_count TEXT, -- e.g., "5000+" for display
  
  -- Company Details (for vendor profile page)
  employee_count TEXT, -- e.g., "100-200", "50-100"
  floor_space TEXT, -- e.g., "5000m²", "2000m²"
  main_products TEXT[], -- Array of main product categories
  certificates TEXT[], -- Array of certifications: ["ISO 9001", "CE", "RoHS"]
  badges TEXT[], -- Array of badges: ["Gold Supplier", "Verified", "Trade Assurance"]
  
  -- Social Media & Contact
  social_media JSONB, -- {facebook, twitter, linkedin, instagram, youtube}
  
  -- Financial
  commission_rate DECIMAL(5,2) DEFAULT 10.00, -- percentage
  
  -- Verification
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected', 'suspended')),
  verification_documents JSONB, -- Array of document URLs
  verification_notes TEXT,
  verified_by UUID REFERENCES profiles(id),
  verified_at TIMESTAMP WITH TIME ZONE,
  
  -- Status Flags
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  is_premium BOOLEAN DEFAULT false,
  is_gold_supplier BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,
  has_trade_assurance BOOLEAN DEFAULT false,
  
  -- Statistics
  total_sales DECIMAL(12,2) DEFAULT 0,
  total_products INTEGER DEFAULT 0,
  total_orders INTEGER DEFAULT 0,
  follower_count INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  
  -- Additional Details
  bank_details JSONB, -- {account_name, account_number, bank_name, routing_number, swift_code}
  business_hours JSONB, -- {monday: {open, close}, tuesday: {...}, ...}
  shipping_methods JSONB, -- Array of supported shipping methods
  return_policy TEXT,
  company_profile TEXT, -- Extended company profile/about text
  factory_images JSONB, -- Array of factory/facility images
  
  -- Metadata
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Vendor applications (before vendor account is created)
CREATE TABLE IF NOT EXISTS vendor_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  business_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  business_type TEXT,
  business_address TEXT,
  documents JSONB, -- Array of uploaded document URLs
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_by UUID REFERENCES profiles(id),
  review_notes TEXT,
  rejection_reason TEXT,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Vendor followers/favorites
CREATE TABLE IF NOT EXISTS vendor_followers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(vendor_id, user_id)
);

-- Vendor reviews (separate from product reviews)
CREATE TABLE IF NOT EXISTS vendor_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  order_id UUID, -- Links review to verified purchase
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT,
  images JSONB, -- Array of review images
  verified_purchase BOOLEAN DEFAULT false,
  helpful_count INTEGER DEFAULT 0,
  is_approved BOOLEAN DEFAULT true,
  approved_by UUID REFERENCES profiles(id),
  response_text TEXT, -- Vendor's response to the review
  responded_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =====================================================
-- AGENT MANAGEMENT
-- =====================================================

-- Agents table
CREATE TABLE IF NOT EXISTS agents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  agent_code TEXT UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  agent_type TEXT CHECK (agent_type IN ('delivery', 'sales')),
  assigned_location TEXT,
  zone_assignment JSONB, -- Array of zone IDs or GPS boundaries
  commission_rate DECIMAL(5,2) DEFAULT 5.00,
  is_active BOOLEAN DEFAULT true,
  current_location JSONB, -- {lat, lng, last_updated}
  status TEXT DEFAULT 'idle' CHECK (status IN ('idle', 'active', 'on_delivery', 'offline')),
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  verification_notes TEXT,
  verified_by UUID REFERENCES profiles(id),
  verified_at TIMESTAMP WITH TIME ZONE,
  tasks_completed INTEGER DEFAULT 0,
  tasks_failed INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  documents JSONB, -- ID, license, certifications
  vehicle_info JSONB, -- {type, model, license_plate, color}
  availability JSONB, -- Schedule/working hours
  emergency_contact JSONB, -- {name, phone, relationship}
  bank_details JSONB,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Agent tasks
CREATE TABLE IF NOT EXISTS agent_tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
  task_type TEXT CHECK (task_type IN ('delivery', 'verification', 'pickup', 'return')),
  order_id UUID, -- References orders table
  product_id UUID, -- References products table (for verification tasks)
  vendor_id UUID REFERENCES vendors(id),
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'assigned', 'in_progress', 'completed', 'failed', 'cancelled')),
  location_start JSONB,
  location_end JSONB,
  estimated_time INTEGER, -- minutes
  actual_time INTEGER, -- minutes
  distance DECIMAL(10,2), -- km
  notes TEXT,
  photos JSONB, -- Array of proof photos
  signature TEXT, -- Base64 or URL
  customer_feedback TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  assigned_at TIMESTAMP WITH TIME ZONE,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =====================================================
-- PRODUCT CATALOG
-- =====================================================

-- Categories table (hierarchical)
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  parent_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  description TEXT,
  image_url TEXT,
  icon_url TEXT,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  product_count INTEGER DEFAULT 0,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Products table (enhanced with home sections, media, delivery, and all detail fields)
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id),
  
  -- Basic Information
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  short_title TEXT, -- Shortened title for product cards
  subtitle TEXT, -- Additional subtitle
  description TEXT,
  short_description TEXT,
  
  -- Media (images + videos)
  images JSONB, -- Legacy: Array of image URLs
  media JSONB, -- Enhanced: [{type: 'image', url: '...'}, {type: 'video', url: '...'}]
  video_url TEXT, -- Primary product video
  gallery_images TEXT[], -- Additional gallery images
  
  -- Specifications
  specifications JSONB, -- Product specs as key-value pairs
  
  -- Pricing
  price DECIMAL(10,2) NOT NULL,
  compare_price DECIMAL(10,2), -- Original price for discounts
  cost_price DECIMAL(10,2), -- Vendor's cost
  bulk_pricing JSONB, -- [{quantity: 10, price: 8.99}, {quantity: 50, price: 7.99}]
  
  -- Inventory
  stock_quantity INTEGER DEFAULT 0,
  min_order_quantity INTEGER DEFAULT 1,
  max_order_quantity INTEGER,
  low_stock_threshold INTEGER DEFAULT 10,
  sku TEXT UNIQUE,
  barcode TEXT,
  
  -- Product Dimensions
  weight DECIMAL(10,2), -- kg
  dimensions JSONB, -- {length, width, height} in cm
  
  -- Labels & Badges (for quick access)
  labels JSONB, -- [{text: 'Best Deal', type: 'deal', color: '#ff0000'}, ...]
  badges TEXT[], -- ['Free Ship', 'Limited', 'Verified']
  
  -- Delivery & Shipping
  free_shipping BOOLEAN DEFAULT false,
  estimated_delivery_days INTEGER, -- Delivery time in days
  estimated_delivery_text TEXT, -- e.g., "Dec 15-20"
  shipping_options JSONB, -- ['Standard', 'Express', 'Overnight']
  shipping_methods JSONB, -- Detailed shipping options
  return_policy_days INTEGER DEFAULT 30,
  return_policy_text TEXT,
  
  -- Product Features (for detail page icons)
  features JSONB, -- [{icon: '✓', label: 'Free Returns'}, {icon: '🚚', label: 'Fast Shipping'}]
  
  -- Display Options
  display_variant TEXT CHECK (display_variant IN ('default', 'grid', 'top-deal', 'top-ranking')),
  featured_text TEXT, -- Text to show when featured
  
  -- Verification & Status
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected', 'flagged')),
  verified_by UUID REFERENCES profiles(id),
  verification_notes TEXT,
  verified_at TIMESTAMP WITH TIME ZONE,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  is_digital BOOLEAN DEFAULT false,
  requires_shipping BOOLEAN DEFAULT true,
  
  -- Sizes & Variants
  has_sizes BOOLEAN DEFAULT false,
  available_sizes TEXT[], -- ['S', 'M', 'L', 'XL'] for quick reference
  
  -- Classification
  shipping_class TEXT,
  tax_class TEXT,
  tags TEXT[], -- Array of tags
  search_keywords TEXT[], -- Additional search terms
  
  -- Metrics & Analytics
  view_count INTEGER DEFAULT 0,
  sales_count INTEGER DEFAULT 0,
  favorite_count INTEGER DEFAULT 0,
  
  -- Reviews & Ratings
  rating DECIMAL(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  average_rating DECIMAL(3,2) DEFAULT 0,
  verified_reviews_count INTEGER DEFAULT 0,
  
  -- Vendor Contact
  allow_supplier_contact BOOLEAN DEFAULT true,
  whatsapp_number TEXT,
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT[],
  
  -- Publishing
  published_at TIMESTAMP WITH TIME ZONE,
  
  -- Metadata
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Product variants (sizes, colors, etc.)
CREATE TABLE IF NOT EXISTS product_variants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL, -- e.g., "Size: L, Color: Red"
  sku TEXT UNIQUE,
  price DECIMAL(10,2),
  compare_price DECIMAL(10,2),
  stock_quantity INTEGER DEFAULT 0,
  attributes JSONB, -- {size: 'L', color: 'Red'}
  image_url TEXT,
  weight DECIMAL(10,2),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Product reviews
CREATE TABLE IF NOT EXISTS product_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  order_id UUID, -- Links review to verified purchase
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT,
  images JSONB, -- Array of review images
  verified_purchase BOOLEAN DEFAULT false,
  helpful_count INTEGER DEFAULT 0,
  is_approved BOOLEAN DEFAULT false,
  approved_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- User favorites/wishlist
CREATE TABLE IF NOT EXISTS user_favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, product_id)
);

-- =====================================================
-- HOME PAGE SECTIONS & PRODUCT PLACEMENT
-- =====================================================

-- Home sections table (defines sections on home page)
CREATE TABLE IF NOT EXISTS home_sections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE, -- 'featured', 'top_deals', 'new_arrivals', etc.
  display_name TEXT NOT NULL, -- 'Featured Products', 'Top Deals'
  description TEXT,
  section_type TEXT CHECK (section_type IN ('scroll', 'grid', 'ranking', 'deal')),
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  max_products INTEGER DEFAULT 10, -- Maximum products to show in this section
  layout_config JSONB, -- {columns: 2, variant: 'grid', subtitle: '...'}
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Product section placements (junction table for products in home sections)
CREATE TABLE IF NOT EXISTS product_section_placements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  section_id UUID REFERENCES home_sections(id) ON DELETE CASCADE,
  sort_order INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT false, -- Pin to top of section
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE, -- For time-limited placements
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(product_id, section_id)
);

-- Product labels table (dynamic labels like "Best Deal", "Hot",  "New", etc.)
CREATE TABLE IF NOT EXISTS product_labels (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  label_text TEXT NOT NULL, -- 'Best Deal', 'Hot', 'New Arrival'
  label_type TEXT CHECK (label_type IN ('deal', 'new', 'hot', 'limited', 'eco', 'luxury', 'verified', 'custom')),
  color TEXT, -- Hex color for label background
  text_color TEXT DEFAULT '#FFFFFF', -- Text color
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =====================================================
-- ORDER MANAGEMENT
-- =====================================================

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  buyer_id UUID REFERENCES profiles(id),
  vendor_id UUID REFERENCES vendors(id),
  subtotal DECIMAL(10,2) NOT NULL,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  shipping_amount DECIMAL(10,2) DEFAULT 0,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,
  commission_amount DECIMAL(10,2),
  commission_rate DECIMAL(5,2),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned', 'refunded', 'disputed')),
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'flagged', 'suspicious')),
  verified_by UUID REFERENCES profiles(id),
  verification_notes TEXT,
  verified_at TIMESTAMP WITH TIME ZONE,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'partially_paid', 'refunded', 'failed')),
  payment_method TEXT,
  payment_transaction_id TEXT,
  paid_at TIMESTAMP WITH TIME ZONE,
  shipping_address JSONB, -- {name, phone, street, city, state, country, postal_code, coordinates}
  billing_address JSONB,
  delivery_agent_id UUID REFERENCES agents(id),
  tracking_number TEXT,
  carrier TEXT,
  estimated_delivery DATE,
  actual_delivery TIMESTAMP WITH TIME ZONE,
  items JSONB, -- Array of {product_id, variant_id, name, sku, quantity, price, total}
  coupon_code TEXT,
  notes TEXT,
  customer_notes TEXT,
  internal_notes TEXT,
  cancellation_reason TEXT,
  cancelled_by UUID REFERENCES profiles(id),
  cancelled_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Order items (detailed)
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  variant_id UUID REFERENCES product_variants(id),
  vendor_id UUID REFERENCES vendors(id),
  name TEXT NOT NULL,
  sku TEXT,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  commission_amount DECIMAL(10,2),
  tax_amount DECIMAL(10,2) DEFAULT 0,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  status TEXT DEFAULT 'pending',
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Order status history
CREATE TABLE IF NOT EXISTS order_status_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  notes TEXT,
  changed_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Disputes table
CREATE TABLE IF NOT EXISTS disputes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  raised_by UUID REFERENCES profiles(id),
  dispute_type TEXT CHECK (dispute_type IN ('product_issue', 'delivery_issue', 'payment_issue', 'fraud', 'other')),
  reason TEXT NOT NULL,
  description TEXT,
  evidence JSONB, -- Array of image/document URLs
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'investigating', 'resolved', 'escalated', 'closed')),
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  assigned_to UUID REFERENCES profiles(id),
 resolution TEXT,
  resolution_type TEXT CHECK (resolution_type IN ('refund', 'replacement', 'compensation', 'none')),
  refund_amount DECIMAL(10,2),
  messages JSONB, -- Array of dispute messages
  resolved_at TIMESTAMP WITH TIME ZONE,
  resolved_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Shopping cart
CREATE TABLE IF NOT EXISTS cart_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES product_variants(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, product_id, variant_id)
);

-- =====================================================
-- REPORTS & MODERATION
-- =====================================================

-- User reports (for content moderation)
CREATE TABLE IF NOT EXISTS user_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  reported_by UUID REFERENCES profiles(id),
  report_type TEXT CHECK (report_type IN ('product', 'vendor', 'review', 'user', 'order')),
  target_id UUID NOT NULL, -- ID of the reported entity
  target_type TEXT NOT NULL,
  reason TEXT NOT NULL,
  description TEXT,
  evidence JSONB, -- Array of screenshots/documents
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_review', 'investigating', 'resolved', 'dismissed', 'escalated')),
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'critical')),
  reviewed_by UUID REFERENCES profiles(id),
  review_notes TEXT,
  action_taken TEXT,
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =====================================================
-- FINANCIAL MANAGEMENT
-- =====================================================

-- Platform transactions
CREATE TABLE IF NOT EXISTS transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_type TEXT CHECK (transaction_type IN ('order', 'commission', 'payout', 'refund', 'agent_payment', 'adjustment', 'fee')),
  order_id UUID REFERENCES orders(id),
  vendor_id UUID REFERENCES vendors(id),
  agent_id UUID REFERENCES agents(id),
  user_id UUID REFERENCES profiles(id),
  amount DECIMAL(10,2) NOT NULL,
  commission_amount DECIMAL(10,2),
  net_amount DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled', 'refunded')),
  payment_method TEXT,
  payment_gateway TEXT,
  reference_number TEXT UNIQUE,
  external_transaction_id TEXT,
  description TEXT,
  notes TEXT,
  metadata JSONB,
  processed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Vendor payouts
CREATE TABLE IF NOT EXISTS vendor_payouts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
  payout_period_start DATE,
  payout_period_end DATE,
  total_sales DECIMAL(10,2) NOT NULL,
  commission_amount DECIMAL(10,2) NOT NULL,
  adjustment_amount DECIMAL(10,2) DEFAULT 0,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')),
  payment_method TEXT,
  payment_details JSONB, -- Account number, routing, etc. (encrypted)
  reference_number TEXT UNIQUE,
  transaction_id TEXT,
  processed_by UUID REFERENCES profiles(id),
  processed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  invoice_url TEXT,
  receipt_url TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Agent earnings/payouts
CREATE TABLE IF NOT EXISTS agent_payouts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
  payout_period_start DATE,
  payout_period_end DATE,
  total_tasks INTEGER DEFAULT 0,
  total_earnings DECIMAL(10,2) NOT NULL,
  deductions DECIMAL(10,2) DEFAULT 0,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  payment_method TEXT,
  payment_details JSONB,
  reference_number TEXT UNIQUE,
  processed_by UUID REFERENCES profiles(id),
  processed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Commission rules
CREATE TABLE IF NOT EXISTS commission_rules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  entity_type TEXT CHECK (entity_type IN ('vendor', 'agent', 'category', 'product')),
  entity_id UUID, -- NULL for global rules
  commission_type TEXT CHECK (commission_type IN ('percentage', 'fixed')),
  commission_value DECIMAL(10,2) NOT NULL,
  min_amount DECIMAL(10,2),
  max_amount DECIMAL(10,2),
  is_active BOOLEAN DEFAULT true,
  priority INTEGER DEFAULT 0, -- Higher priority rules apply first
  conditions JSONB, -- Additional rule conditions
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =====================================================
-- SYSTEM & AUDIT
-- =====================================================

-- Audit logs (immutable)
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  action TEXT NOT NULL, -- 'INSERT', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', etc.
  entity_type TEXT, -- 'vendor', 'product', 'order', etc.
  entity_id UUID,
  changes JSONB, -- Before/after values
  ip_address INET,
  user_agent TEXT,
  request_id TEXT,
  session_id TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Platform settings
CREATE TABLE IF NOT EXISTS platform_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  category TEXT, -- 'general', 'financial', 'email', 'shipping', 'payment', etc.
  data_type TEXT CHECK (data_type IN ('string', 'number', 'boolean', 'json', 'array')),
  description TEXT,
  is_public BOOLEAN DEFAULT false, -- Can be accessed by non-admins
  updated_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT CHECK (type IN ('info', 'success', 'warning', 'error', 'order', 'product', 'system')),
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  action_url TEXT,
  action_label TEXT,
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP WITH TIME ZONE,
  is_archived BOOLEAN DEFAULT false,
  related_entity_type TEXT,
  related_entity_id UUID,
  metadata JSONB,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Email queue/log
CREATE TABLE IF NOT EXISTS email_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  to_email TEXT NOT NULL,
  from_email TEXT,
  subject TEXT NOT NULL,
  template TEXT,
  template_data JSONB,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'bounced')),
  provider TEXT, -- 'sendgrid', 'mailgun', etc.
  provider_id TEXT,
  error_message TEXT,
  sent_at TIMESTAMP WITH TIME ZONE,
  opened_at TIMESTAMP WITH TIME ZONE,
  clicked_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- System announcements
CREATE TABLE IF NOT EXISTS announcements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT CHECK (type IN ('info', 'warning', 'maintenance', 'update', 'promotion')),
  target_audience TEXT CHECK (target_audience IN ('all', 'vendors', 'customers', 'agents', 'admins')),
  is_active BOOLEAN DEFAULT true,
  priority INTEGER DEFAULT 0,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =====================================================
-- MARKETING & PROMOTIONS
-- =====================================================

-- Coupons/Discount codes
CREATE TABLE IF NOT EXISTS coupons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  discount_type TEXT CHECK (discount_type IN ('percentage', 'fixed', 'free_shipping')),
  discount_value DECIMAL(10,2) NOT NULL,
  min_purchase_amount DECIMAL(10,2),
  max_discount_amount DECIMAL(10,2),
  usage_limit INTEGER,
  usage_count INTEGER DEFAULT 0,
  usage_limit_per_user INTEGER,
  valid_from TIMESTAMP WITH TIME ZONE,
  valid_until TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  applicable_to TEXT CHECK (applicable_to IN ('all', 'category', 'product', 'vendor')),
  applicable_ids UUID[], -- Array of category/product/vendor IDs
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Coupon usage tracking
CREATE TABLE IF NOT EXISTS coupon_usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  coupon_id UUID REFERENCES coupons(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  discount_amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =====================================================
-- ANALYTICS & METRICS
-- =====================================================

-- Page views/analytics
CREATE TABLE IF NOT EXISTS page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  page_type TEXT, -- 'product', 'vendor', 'category', 'home', etc.
  page_id UUID,
  url TEXT,
  referrer TEXT,
  ip_address INET,
  user_agent TEXT,
  device_type TEXT CHECK (device_type IN ('desktop', 'mobile', 'tablet')),
  session_id TEXT,
  duration INTEGER, -- seconds
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Search queries
CREATE TABLE IF NOT EXISTS search_queries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  query TEXT NOT NULL,
  results_count INTEGER DEFAULT 0,
  clicked_result_id UUID,
  clicked_result_position INTEGER,
  session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Profiles
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_is_active ON profiles(is_active);

-- Vendors
CREATE INDEX IF NOT EXISTS idx_vendors_user_id ON vendors(user_id);
CREATE INDEX IF NOT EXISTS idx_vendors_status ON vendors(verification_status);
CREATE INDEX IF NOT EXISTS idx_vendors_is_active ON vendors(is_active);
CREATE INDEX IF NOT EXISTS idx_vendors_is_featured ON vendors(is_featured);
CREATE INDEX IF NOT EXISTS idx_vendors_business_name ON vendors(business_name);
CREATE INDEX IF NOT EXISTS idx_vendors_rating ON vendors(rating DESC);

-- Vendor followers
CREATE INDEX IF NOT EXISTS idx_vendor_followers_vendor ON vendor_followers(vendor_id);
CREATE INDEX IF NOT EXISTS idx_vendor_followers_user ON vendor_followers(user_id);

-- Vendor reviews
CREATE INDEX IF NOT EXISTS idx_vendor_reviews_vendor ON vendor_reviews(vendor_id);
CREATE INDEX IF NOT EXISTS idx_vendor_reviews_user ON vendor_reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_vendor_reviews_approved ON vendor_reviews(is_approved);
CREATE INDEX IF NOT EXISTS idx_vendor_reviews_created ON vendor_reviews(created_at DESC);

-- Agents
CREATE INDEX IF NOT EXISTS idx_agents_user_id ON agents(user_id);
CREATE INDEX IF NOT EXISTS idx_agents_status ON agents(status);
CREATE INDEX IF NOT EXISTS idx_agents_is_active ON agents(is_active);
CREATE INDEX IF NOT EXISTS idx_agents_type ON agents(agent_type);
CREATE INDEX IF NOT EXISTS idx_agents_verification_status ON agents(verification_status);

-- Products
CREATE INDEX IF NOT EXISTS idx_products_vendor_id ON products(vendor_id);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(verification_status);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_name_search ON products USING gin(to_tsvector('english', name));
CREATE INDEX IF NOT EXISTS idx_products_rating ON products(average_rating DESC);
CREATE INDEX IF NOT EXISTS idx_products_sales ON products(sales_count DESC);
CREATE INDEX IF NOT EXISTS idx_products_created ON products(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_products_tags ON products USING gin(tags);
CREATE INDEX IF NOT EXISTS idx_products_free_shipping ON products(free_shipping);

-- Home Sections
CREATE INDEX IF NOT EXISTS idx_home_sections_active ON home_sections(is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_home_sections_name ON home_sections(name);

-- Product Section Placements
CREATE INDEX IF NOT EXISTS idx_section_placements_section ON product_section_placements(section_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_section_placements_product ON product_section_placements(product_id);
CREATE INDEX IF NOT EXISTS idx_section_placements_dates ON product_section_placements(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_section_placements_pinned ON product_section_placements(is_pinned, sort_order);

-- Product Labels
CREATE INDEX IF NOT EXISTS idx_product_labels_product ON product_labels(product_id, is_active);
CREATE INDEX IF NOT EXISTS idx_product_labels_dates ON product_labels(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_product_labels_type ON product_labels(label_type);

-- Categories
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_parent_id ON categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_categories_is_active ON categories(is_active);

-- Orders
CREATE INDEX IF NOT EXISTS idx_orders_buyer_id ON orders(buyer_id);
CREATE INDEX IF NOT EXISTS idx_orders_vendor_id ON orders(vendor_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_verification_status ON orders(verification_status);
CREATE INDEX IF NOT EXISTS idx_orders_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- Transactions
CREATE INDEX IF NOT EXISTS idx_transactions_vendor_id ON transactions(vendor_id);
CREATE INDEX IF NOT EXISTS idx_transactions_order_id ON transactions(order_id);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(transaction_type);

-- Disputes
CREATE INDEX IF NOT EXISTS idx_disputes_order_id ON disputes(order_id);
CREATE INDEX IF NOT EXISTS idx_disputes_status ON disputes(status);
CREATE INDEX IF NOT EXISTS idx_disputes_assigned_to ON disputes(assigned_to);

-- Reports
CREATE INDEX IF NOT EXISTS idx_reports_status ON user_reports(status);
CREATE INDEX IF NOT EXISTS idx_reports_type ON user_reports(report_type);
CREATE INDEX IF NOT EXISTS idx_reports_target ON user_reports(target_id, target_type);

-- Notifications
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);

-- Audit logs
CREATE INDEX IF NOT EXISTS idx_audit_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_created_at ON audit_logs(created_at DESC);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables (profiles table already has RLS enabled)
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_followers ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE disputes ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE commission_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupon_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_section_placements ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_labels ENABLE ROW LEVEL SECURITY;


-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('super_admin', 'admin', 'moderator')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- NOTE: Profiles table policies already exist in database
-- Skipping profiles policies creation

-- Drop existing vendor policies if they exist
DROP POLICY IF EXISTS "Public can view active vendors" ON vendors;
DROP POLICY IF EXISTS "Vendors can view own data" ON vendors;
DROP POLICY IF EXISTS "Admins can view all vendors" ON vendors;
DROP POLICY IF EXISTS "Admins can manage vendors" ON vendors;

-- Vendors policies
CREATE POLICY "Public can view active vendors" ON vendors
  FOR SELECT USING (is_active = true AND verification_status = 'verified');

CREATE POLICY "Vendors can view own data" ON vendors
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can view all vendors" ON vendors
  FOR SELECT USING (is_admin());

CREATE POLICY "Admins can manage vendors" ON vendors
  FOR ALL USING (is_admin());

-- Drop existing product policies if they exist
DROP POLICY IF EXISTS "Public can view active approved products" ON products;
DROP POLICY IF EXISTS "Vendors can view own products" ON products;
DROP POLICY IF EXISTS "Admins can view all products" ON products;
DROP POLICY IF EXISTS "Admins can manage products" ON products;

-- Products policies
CREATE POLICY "Public can view active approved products" ON products
  FOR SELECT USING (
    is_active = true
    AND verification_status = 'approved'
  );

CREATE POLICY "Vendors can view own products" ON products
  FOR SELECT USING (
    vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid())
  );

CREATE POLICY "Admins can view all products" ON products
  FOR SELECT USING (is_admin());

CREATE POLICY "Admins can manage products" ON products
  FOR ALL USING (is_admin());

-- Drop existing order policies if they exist
DROP POLICY IF EXISTS "Users can view own orders" ON orders;
DROP POLICY IF EXISTS "Admins can view all orders" ON orders;
DROP POLICY IF EXISTS "Admins can manage orders" ON orders;

-- Orders policies
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (
    buyer_id = auth.uid() OR
    vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid())
  );

CREATE POLICY "Admins can view all orders" ON orders
  FOR SELECT USING (is_admin());

CREATE POLICY "Admins can manage orders" ON orders
  FOR ALL USING (is_admin());

-- Drop existing notification policies if they exist
DROP POLICY IF EXISTS "Users can view own notifications" ON notifications;
DROP POLICY IF EXISTS "Users can update own notifications" ON notifications;
DROP POLICY IF EXISTS "System can insert notifications" ON notifications;

-- Notifications policies
CREATE POLICY "Users can view own notifications" ON notifications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications" ON notifications
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "System can insert notifications" ON notifications
  FOR INSERT WITH CHECK (true); -- Service role only

-- Drop existing cart and favorites policies if they exist
DROP POLICY IF EXISTS "Users can manage own cart" ON cart_items;
DROP POLICY IF EXISTS "Users can manage own favorites" ON user_favorites;

-- Cart items policies
CREATE POLICY "Users can manage own cart" ON cart_items
  FOR ALL USING (user_id = auth.uid());

-- User favorites policies
CREATE POLICY "Users can manage own favorites" ON user_favorites
  FOR ALL USING (user_id = auth.uid());

-- Drop existing category policies if they exist
DROP POLICY IF EXISTS "Public can view active categories" ON categories;
DROP POLICY IF EXISTS "Admins can manage categories" ON categories;

-- Categories public read
CREATE POLICY "Public can view active categories" ON categories
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage categories" ON categories
  FOR ALL USING (is_admin());

-- Drop existing platform settings policies if they exist
DROP POLICY IF EXISTS "Public can view public settings" ON platform_settings;
DROP POLICY IF EXISTS "Admins can view all settings" ON platform_settings;
DROP POLICY IF EXISTS "Admins can manage settings" ON platform_settings;

-- Platform settings policies
CREATE POLICY "Public can view public settings" ON platform_settings
  FOR SELECT USING (is_public = true);

CREATE POLICY "Admins can view all settings" ON platform_settings
  FOR SELECT USING (is_admin());

CREATE POLICY "Admins can manage settings" ON platform_settings
  FOR ALL USING (is_admin());

-- Drop existing audit log policies if they exist
DROP POLICY IF EXISTS "Admins can view audit logs" ON audit_logs;

-- Audit logs (read-only, admins only)
CREATE POLICY "Admins can view audit logs" ON audit_logs
  FOR SELECT USING (is_admin());

-- Drop existing home section policies if they exist
DROP POLICY IF EXISTS "Public can view active home sections" ON home_sections;
DROP POLICY IF EXISTS "Admins can manage home sections" ON home_sections;

-- Home sections policies
CREATE POLICY "Public can view active home sections" ON home_sections
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage home sections" ON home_sections
  FOR ALL USING (is_admin());

-- Drop existing product placement and label policies if they exist
DROP POLICY IF EXISTS "Public can view product placements" ON product_section_placements;
DROP POLICY IF EXISTS "Admins can manage product placements" ON product_section_placements;
DROP POLICY IF EXISTS "Public can view active labels" ON product_labels;
DROP POLICY IF EXISTS "Admins can manage product labels" ON product_labels;

-- Product section placements policies
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

CREATE POLICY "Admins can manage product placements" ON product_section_placements
  FOR ALL USING (is_admin());

-- Product labels policies
CREATE POLICY "Public can view active labels" ON product_labels
  FOR SELECT USING (
    is_active = true
    AND (start_date IS NULL OR start_date <= NOW())
    AND (end_date IS NULL OR end_date >= NOW())
  );

CREATE POLICY "Admins can manage product labels" ON product_labels
  FOR ALL USING (is_admin());

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, username, role, phone)
  VALUES (
    new.id,
    new.email,
    NULLIF(COALESCE(new.raw_user_meta_data->>'full_name', ''), ''),
    NULLIF(COALESCE(new.raw_user_meta_data->>'username', ''), ''),
    COALESCE(new.raw_user_meta_data->>'role', 'user'),
    COALESCE(new.phone, new.raw_user_meta_data->>'phone')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to relevant tables
DROP TRIGGER IF EXISTS on_profile_updated ON profiles;
CREATE TRIGGER on_profile_updated BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS on_vendor_updated ON vendors;
CREATE TRIGGER on_vendor_updated BEFORE UPDATE ON vendors
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS on_product_updated ON products;
CREATE TRIGGER on_product_updated BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS on_agent_updated ON agents;
CREATE TRIGGER on_agent_updated BEFORE UPDATE ON agents
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS on_order_updated ON orders;
CREATE TRIGGER on_order_updated BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- Function to log important changes
CREATE OR REPLACE FUNCTION public.log_important_changes()
RETURNS TRIGGER AS $$
BEGIN
  -- Only log if significant fields changed
  IF TG_OP = 'UPDATE' AND (
    OLD.verification_status IS DISTINCT FROM NEW.verification_status OR
    OLD.is_active IS DISTINCT FROM NEW.is_active OR
    OLD.status IS DISTINCT FROM NEW.status
  ) THEN
    INSERT INTO audit_logs (user_id, action, entity_type, entity_id, changes)
    VALUES (
      auth.uid(),
      TG_OP,
      TG_TABLE_NAME,
      NEW.id,
      jsonb_build_object(
        'old', jsonb_build_object(
          'verification_status', OLD.verification_status,
          'is_active', OLD.is_active,
          'status', OLD.status
        ),
        'new', jsonb_build_object(
          'verification_status', NEW.verification_status,
          'is_active', NEW.is_active,
          'status', NEW.status
        )
      )
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Apply audit trigger to key tables
DROP TRIGGER IF EXISTS audit_vendor_changes ON vendors;
CREATE TRIGGER audit_vendor_changes AFTER UPDATE ON vendors
  FOR EACH ROW EXECUTE PROCEDURE public.log_important_changes();

DROP TRIGGER IF EXISTS audit_product_changes ON products;
CREATE TRIGGER audit_product_changes AFTER UPDATE ON products
  FOR EACH ROW EXECUTE PROCEDURE public.log_important_changes();

DROP TRIGGER IF EXISTS audit_order_changes ON orders;
CREATE TRIGGER audit_order_changes AFTER UPDATE ON orders
  FOR EACH ROW EXECUTE PROCEDURE public.log_important_changes();

-- Function to update product count in categories
CREATE OR REPLACE FUNCTION update_category_product_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE categories SET product_count = product_count + 1 WHERE id = NEW.category_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE categories SET product_count = product_count - 1 WHERE id = OLD.category_id;
  ELSIF TG_OP = 'UPDATE' AND OLD.category_id != NEW.category_id THEN
    UPDATE categories SET product_count = product_count - 1 WHERE id = OLD.category_id;
    UPDATE categories SET product_count = product_count + 1 WHERE id = NEW.category_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_category_counts ON products;
CREATE TRIGGER update_category_counts
  AFTER INSERT OR UPDATE OR DELETE ON products
  FOR EACH ROW EXECUTE PROCEDURE update_category_product_count();

-- =====================================================
-- SEED DEFAULT DATA
-- =====================================================

-- Seed default role permissions
INSERT INTO role_permissions (role, module, can_view, can_create, can_edit, can_delete, can_approve, can_verify, can_export)
VALUES
  -- Super Admin - Full access
  ('super_admin', 'users', true, true, true, true, true, true, true),
  ('super_admin', 'vendors', true, true, true, true, true, true, true),
  ('super_admin', 'products', true, true, true, true, true, true, true),
  ('super_admin', 'orders', true, true, true, true, true, true, true),
  ('super_admin', 'agents', true, true, true, true, true, true, true),
  ('super_admin', 'finances', true, true, true, true, true, true, true),
  ('super_admin', 'settings', true, true, true, true, true, true, true),
  ('super_admin', 'reports', true, true, true, true, true, true, true),
  
  -- Admin - Most access except critical financial and settings
  ('admin', 'users', true, true, true, false, true, true, true),
  ('admin', 'vendors', true, true, true, false, true, true, true),
  ('admin', 'products', true, true, true, false, true, true, true),
  ('admin', 'orders', true, true, true, false, true, true, true),
  ('admin', 'agents', true, true, true, false, true, true, true),
  ('admin', 'finances', true, false, false, false, false, false, true),
  ('admin', 'reports', true, true, true, false, true, true, true),
  ('admin', 'settings', true, false, true, false, false, false, false),
  
  -- Moderator - Review and approve only
  ('moderator', 'vendors', true, false, false, false, true, true, false),
  ('moderator', 'products', true, false, false, false, true, true, false),
  ('moderator', 'orders', true, false, false, false, true, false, false),
  ('moderator', 'reports', true, false, true, false, true, false, false)
ON CONFLICT (role, module) DO NOTHING;

-- Seed default platform settings
INSERT INTO platform_settings (key, value, category, description, is_public)
VALUES
  ('site_name', '"Townssy E-commerce"', 'general', 'Website name', true),
  ('site_description', '"Multi-vendor e-commerce platform"', 'general', 'Site description', true),
  ('currency', '"USD"', 'financial', 'Default currency', true),
  ('default_commission_rate', '10', 'financial', 'Default vendor commission rate (%)', false),
  ('min_payout_amount', '50', 'financial', 'Minimum payout amount', false),
  ('tax_rate', '0', 'financial', 'Default tax rate (%)', true),
  ('free_shipping_threshold', '100', 'general', 'Free shipping above this amount', true),
  ('order_auto_cancel_days', '7', 'orders', 'Auto-cancel unpaid orders after days', false),
  ('product_auto_approve', 'false', 'products', 'Auto-approve product submissions', false),
  ('vendor_auto_approve', 'false', 'vendors', 'Auto-approve vendor applications', false)
ON CONFLICT (key) DO NOTHING;

-- Create a sample super admin (update with real data)
-- Password should be hashed by Supabase Auth
-- This is just for reference
COMMENT ON TABLE profiles IS 'To create super admin: Use Supabase Auth signup then update role to super_admin';

-- Seed home sections (matching the sections in app/page.js)
INSERT INTO home_sections (name, display_name, description, section_type, is_active, sort_order, max_products, layout_config) VALUES
('top_deals', 'Top Deals', 'Score the lowest prices on Townssy E-commerce', 'deal', true, 1, 12, '{"variant": "top-deal", "subtitle": "Score the lowest prices on Townssy E-commerce"}'),
('top_ranking', 'Top Ranking', 'Navigate trends with data-driven rankings', 'ranking', true, 2, 12, '{"variant": "top-ranking", "subtitle": "Navigate trends with data-driven rankings"}'),
('featured', 'Featured', 'Featured products selected by our team', 'scroll', true, 3, 10, '{"variant": "default"}'),
('new_arrivals', 'New Arrivals', 'Latest products added to the platform', 'scroll', true, 4, 10, '{"variant": "default"}'),
('best_selling', 'Best Selling', 'Our most popular products', 'scroll', true, 5, 10, '{"variant": "default"}'),
('luxury', 'Luxury', 'Premium and luxury items', 'scroll', true, 6, 10, '{"variant": "default"}'),
('eco', 'Eco', 'Eco-friendly and sustainable products', 'scroll', true, 7, 10, '{"variant": "default"}'),
('travel_essentials', 'Travel Essentials', 'Everything you need for your travels', 'scroll', true, 8, 10, '{"variant": "default"}'),
('security', 'Security', 'Security and safety products', 'scroll', true, 9, 10, '{"variant": "default"}'),
('hot_products', 'Hot Products', 'Trending items right now', 'scroll', true, 10, 10, '{"variant": "default"}'),
('top_rated', 'Top Rated', 'Highest rated products by customers', 'scroll', true, 11, 10, '{"variant": "default"}')
ON CONFLICT (name) DO NOTHING;


-- =====================================================
-- VIEWS FOR REPORTING
-- =====================================================

-- Sales summary view
CREATE OR REPLACE VIEW sales_summary AS
SELECT 
  DATE_TRUNC('day', created_at) as date,
  COUNT(*) as order_count,
  SUM(total_amount) as total_sales,
  AVG(total_amount) as avg_order_value,
  SUM(commission_amount) as total_commission
FROM orders
WHERE status NOT IN ('cancelled', 'refunded')
GROUP BY DATE_TRUNC('day', created_at)
ORDER BY date DESC;

-- Top products view
CREATE OR REPLACE VIEW top_products AS
SELECT
  p.id,
  p.name,
  p.sku,
  v.business_name as vendor_name,
  p.sales_count,
  p.view_count,
  p.average_rating as rating,
  p.review_count,
  p.price,
  p.stock_quantity
FROM products p
LEFT JOIN vendors v ON p.vendor_id = v.id
WHERE p.is_active = true
ORDER BY p.sales_count DESC, p.average_rating DESC
LIMIT 100;

-- Vendor performance view
CREATE OR REPLACE VIEW vendor_performance AS
SELECT
  v.id,
  v.business_name,
  COALESCE(v.total_products, 0) as total_products,
  v.total_sales,
  v.total_orders,
  v.rating,
  v.review_count,
  v.is_active,
  v.verification_status,
  COUNT(DISTINCT o.id) as recent_orders_30d,
  COALESCE(SUM(o.total_amount), 0) as recent_sales_30d
FROM vendors v
LEFT JOIN orders o ON v.id = o.vendor_id
  AND o.created_at > NOW() - INTERVAL '30 days'
  AND o.status NOT IN ('cancelled', 'refunded')
GROUP BY v.id, v.business_name, v.total_products, v.total_sales, v.total_orders, v.rating, v.review_count, v.is_active, v.verification_status
ORDER BY v.total_sales DESC;

-- =====================================================
-- COMMENTS FOR DOCUMENTATION
-- =====================================================

COMMENT ON TABLE profiles IS 'User profiles extending Supabase auth.users';
COMMENT ON TABLE vendors IS 'Vendor/seller accounts on the platform';
COMMENT ON TABLE products IS 'Product catalog with verification workflow';
COMMENT ON TABLE orders IS 'Customer orders with multi-status workflow';
COMMENT ON TABLE agents IS 'Delivery and verification agents';
COMMENT ON TABLE transactions IS 'All financial transactions on the platform';
COMMENT ON TABLE audit_logs IS 'Immutable audit trail of all important actions';
COMMENT ON TABLE platform_settings IS 'Configurable platform settings';
