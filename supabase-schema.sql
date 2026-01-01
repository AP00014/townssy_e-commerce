-- Comprehensive Multi-Role Admin Dashboard Schema for Townssy E-commerce
-- Supports: Superadmin, Admin, Moderator roles with RBAC

-- =====================================================
-- CORE TABLES
-- =====================================================

-- Enhanced profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  username TEXT UNIQUE,
  phone TEXT,
  avatar_url TEXT,
  role TEXT CHECK (role IN ('user', 'super_admin', 'admin', 'moderator', 'vendor', 'agent')) DEFAULT 'user',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Role permissions table for granular access control
CREATE TABLE IF NOT EXISTS role_permissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  role TEXT NOT NULL,
  module TEXT NOT NULL, -- e.g., 'vendors', 'products', 'orders', 'users'
  can_view BOOLEAN DEFAULT false,
  can_create BOOLEAN DEFAULT false,
  can_edit BOOLEAN DEFAULT false,
  can_delete BOOLEAN DEFAULT false,
  can_approve BOOLEAN DEFAULT false,
  can_verify BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
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
  business_type TEXT, -- 'Manufacturer', 'Wholesaler', 'Trader', etc.
  registration_number TEXT,
  tax_id TEXT,
  description TEXT,
  logo_url TEXT,
  banner_url TEXT,
  commission_rate DECIMAL(5,2) DEFAULT 10.00, -- percentage
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected', 'suspended')),
  verification_documents JSONB, -- Array of document URLs
  is_featured BOOLEAN DEFAULT false,
  total_sales DECIMAL(12,2) DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0,
  location JSONB, -- {address, city, state, country, coordinates}
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
  documents JSONB, -- Array of uploaded document URLs
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_by UUID REFERENCES profiles(id),
  review_notes TEXT,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =====================================================
-- AGENT MANAGEMENT
-- =====================================================

-- Agents table
CREATE TABLE IF NOT EXISTS agents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  agent_type TEXT CHECK (agent_type IN ('delivery', 'verification', 'both')),
  zone_assignment JSONB, -- Array of zone IDs or GPS boundaries
  commission_rate DECIMAL(5,2) DEFAULT 5.00,
  is_active BOOLEAN DEFAULT true,
  current_location JSONB, -- {lat, lng, last_updated}
  status TEXT DEFAULT 'idle' CHECK (status IN ('idle', 'active', 'on_delivery', 'offline')),
  tasks_completed INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Agent task logs
CREATE TABLE IF NOT EXISTS agent_tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
  task_type TEXT CHECK (task_type IN ('delivery', 'verification', 'pickup')),
  order_id UUID, -- References orders table (if exists)
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'failed')),
  location_start JSONB,
  location_end JSONB,
  notes TEXT,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =====================================================
-- PRODUCT MANAGEMENT
-- =====================================================

-- Product categories
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  parent_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  description TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Products table (enhanced)
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE, -- Optional: can be NULL
  category_id UUID REFERENCES categories(id),
  name TEXT NOT NULL,
  description TEXT,
  location TEXT, -- Product location (e.g., Accra, Kumasi)
  region TEXT, -- Product region (e.g., Greater Accra, Ashanti)
  delivery BOOLEAN DEFAULT false, -- Whether delivery is available
  delivery_options JSONB DEFAULT '[]'::jsonb, -- Array of delivery options
  supplier_whatsapp TEXT, -- WhatsApp contact link (format: https://wa.me/233XXXXXXXXX)
  specifications JSONB,
  images JSONB, -- Array of image URLs
  price DECIMAL(10,2) NOT NULL,
  compare_price DECIMAL(10,2),
  stock_quantity INTEGER DEFAULT 0,
  sku TEXT UNIQUE,
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected', 'flagged')),
  verified_by UUID REFERENCES profiles(id),
  verification_notes TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  view_count INTEGER DEFAULT 0,
  sales_count INTEGER DEFAULT 0,
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
  start_date TIMESTAMP WITH TIME ZONE, -- For time-limited placements
  end_date TIMESTAMP WITH TIME ZONE, -- For time-limited placements
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(product_id, section_id)
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
  total_amount DECIMAL(10,2) NOT NULL,
  commission_amount DECIMAL(10,2),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'processing', 'shipped', 'delivered', 'cancelled', 'disputed')),
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'flagged')),
  verified_by UUID REFERENCES profiles(id),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded', 'failed')),
  shipping_address JSONB,
  delivery_agent_id UUID REFERENCES agents(id),
  tracking_info JSONB,
  items JSONB, -- Array of {product_id, quantity, price}
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Disputes table
CREATE TABLE IF NOT EXISTS disputes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  raised_by UUID REFERENCES profiles(id),
  reason TEXT NOT NULL,
  description TEXT,
  evidence JSONB, -- Array of image/document URLs
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'investigating', 'resolved', 'escalated', 'closed')),
  assigned_to UUID REFERENCES profiles(id),
  resolution TEXT,
  refund_amount DECIMAL(10,2),
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =====================================================
-- REPORTS & MODERATION
-- =====================================================

-- User reports (for content moderation)
CREATE TABLE IF NOT EXISTS user_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  reported_by UUID REFERENCES profiles(id),
  report_type TEXT CHECK (report_type IN ('product', 'vendor', 'review', 'user')),
  target_id UUID NOT NULL, -- ID of the reported entity
  reason TEXT NOT NULL,
  description TEXT,
  evidence JSONB,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_review', 'resolved', 'dismissed')),
  reviewed_by UUID REFERENCES profiles(id),
  review_notes TEXT,
  action_taken TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =====================================================
-- FINANCIAL MANAGEMENT
-- =====================================================

-- Platform transactions
CREATE TABLE IF NOT EXISTS transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_type TEXT CHECK (transaction_type IN ('order', 'commission', 'payout', 'refund', 'agent_payment')),
  order_id UUID REFERENCES orders(id),
  vendor_id UUID REFERENCES vendors(id),
  agent_id UUID REFERENCES agents(id),
  amount DECIMAL(10,2) NOT NULL,
  commission_amount DECIMAL(10,2),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  payment_method TEXT,
  reference_number TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Vendor payouts
CREATE TABLE IF NOT EXISTS vendor_payouts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  payment_method TEXT,
  payment_details JSONB,
  processed_by UUID REFERENCES profiles(id),
  processed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =====================================================
-- SYSTEM & AUDIT
-- =====================================================

-- Audit logs (immutable)
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  action TEXT NOT NULL,
  entity_type TEXT, -- 'vendor', 'product', 'order', etc.
  entity_id UUID,
  changes JSONB, -- Before/after values
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Platform settings
CREATE TABLE IF NOT EXISTS platform_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  category TEXT, -- 'financial', 'ui', 'email', etc.
  description TEXT,
  updated_by UUID REFERENCES profiles(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT, -- 'info', 'success', 'warning', 'error'
  action_url TEXT,
  is_read BOOLEAN DEFAULT false,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_vendors_status ON vendors(verification_status);
CREATE INDEX IF NOT EXISTS idx_vendors_user ON vendors(user_id);
CREATE INDEX IF NOT EXISTS idx_products_vendor ON products(vendor_id) WHERE vendor_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_products_status ON products(verification_status);
CREATE INDEX IF NOT EXISTS idx_products_location ON products(location);
CREATE INDEX IF NOT EXISTS idx_products_region ON products(region);
CREATE INDEX IF NOT EXISTS idx_products_delivery ON products(delivery) WHERE delivery = true;
CREATE INDEX IF NOT EXISTS idx_products_active_featured ON products(is_active, is_featured) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_section_placements_section ON product_section_placements(section_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_section_placements_product ON product_section_placements(product_id);
CREATE INDEX IF NOT EXISTS idx_section_placements_pinned ON product_section_placements(is_pinned, sort_order) WHERE is_pinned = true;
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_vendor ON orders(vendor_id);
CREATE INDEX IF NOT EXISTS idx_agents_status ON agents(status);
CREATE INDEX IF NOT EXISTS idx_disputes_status ON disputes(status);
CREATE INDEX IF NOT EXISTS idx_reports_status ON user_reports(status);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id, is_read);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE disputes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_section_placements ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON profiles;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Enable insert for authenticated users" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Admin policies for user management
CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid()
      AND role IN ('super_admin', 'admin')
    )
  );

CREATE POLICY "Admins can update user profiles" ON profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid()
      AND role IN ('super_admin', 'admin')
    )
  );

-- Vendors policies
CREATE POLICY "Vendors can view own data" ON vendors
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can view all vendors" ON vendors
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() 
      AND role IN ('super_admin', 'admin', 'moderator')
    )
  );

-- Products policies
CREATE POLICY "Products visible to all" ON products
  FOR SELECT USING (is_active = true OR vendor_id IN (
    SELECT id FROM vendors WHERE user_id = auth.uid()
  ));

-- Product section placements policies
CREATE POLICY "Public can view active product placements" ON product_section_placements
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
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid()
      AND role IN ('super_admin', 'admin')
    )
  );

-- Orders policies
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (
    buyer_id = auth.uid() OR 
    vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid())
  );

-- Notifications policies
CREATE POLICY "Users can view own notifications" ON notifications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications" ON notifications
  FOR UPDATE USING (user_id = auth.uid());

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
CREATE TRIGGER on_profile_updated
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS on_vendor_updated ON vendors;
CREATE TRIGGER on_vendor_updated
  BEFORE UPDATE ON vendors
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS on_product_updated ON products;
CREATE TRIGGER on_product_updated
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- Function to log audit trail
CREATE OR REPLACE FUNCTION public.log_audit()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_logs (user_id, action, entity_type, entity_id, changes)
  VALUES (
    auth.uid(),
    TG_OP,
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    jsonb_build_object('old', to_jsonb(OLD), 'new', to_jsonb(NEW))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- SEED DEFAULT PERMISSIONS
-- =====================================================

INSERT INTO role_permissions (role, module, can_view, can_create, can_edit, can_delete, can_approve, can_verify)
VALUES
  -- Superadmin permissions
  ('super_admin', 'users', true, true, true, true, true, true),
  ('super_admin', 'vendors', true, true, true, true, true, true),
  ('super_admin', 'products', true, true, true, true, true, true),
  ('super_admin', 'orders', true, true, true, true, true, true),
  ('super_admin', 'agents', true, true, true, true, true, true),
  ('super_admin', 'finances', true, true, true, true, true, true),
  ('super_admin', 'settings', true, true, true, true, true, true),
  ('super_admin', 'reports', true, true, true, true, true, true),
  
  -- Admin permissions
  ('admin', 'users', true, true, true, false, true, true),
  ('admin', 'vendors', true, true, true, false, true, true),
  ('admin', 'products', true, true, true, false, true, true),
  ('admin', 'orders', true, true, true, false, true, true),
  ('admin', 'agents', true, true, true, false, true, true),
  ('admin', 'finances', true, false, true, false, false, false),
  ('admin', 'reports', true, true, true, false, true, true),
  
  -- Moderator permissions
  ('moderator', 'vendors', true, false, false, false, true, true),
  ('moderator', 'products', true, false, false, false, true, true),
  ('moderator', 'orders', true, false, false, false, true, false),
  ('moderator', 'reports', true, false, true, false, false, false)
ON CONFLICT (role, module) DO NOTHING;