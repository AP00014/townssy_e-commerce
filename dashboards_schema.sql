-- =====================================================
-- DATABASE SCHEMA FOR DASHBOARDS
-- =====================================================
-- This file contains ONLY the tables and fields used by:
-- 1. Vendor Dashboard
-- 2. Delivery Agent Dashboard
-- 3. Sales Agent Dashboard
-- =====================================================

-- =====================================================
-- 1. VENDOR DASHBOARD SCHEMA
-- =====================================================

-- Table: vendors
-- Used in: /vendor-dashboard/layout.js, /vendor-dashboard/page.js
CREATE TABLE IF NOT EXISTS vendors (
  -- Primary Keys
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  vendor_code TEXT UNIQUE,
  
  -- Business Information (used in dashboard)
  business_name TEXT NOT NULL,
  business_email TEXT,
  business_phone TEXT,
  phone_number TEXT, -- Also used as phone
  email TEXT, -- Also used as email
  business_address JSONB,
  business_type TEXT,
  business_registration_number TEXT,
  registration_number TEXT,
  tax_id TEXT,
  website_url TEXT,
  description TEXT,
  company_profile TEXT,
  social_media JSONB,
  
  -- Media (used in sidebar)
  logo_url TEXT,
  banner_url TEXT,
  
  -- Verification (used in layout checks)
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  verification_documents JSONB,
  verification_notes TEXT,
  verified_at TIMESTAMP,
  verified_by UUID REFERENCES profiles(id),
  rejection_reason TEXT,
  
  -- Settings
  is_active BOOLEAN DEFAULT true,
  commission_rate DECIMAL(5,2) DEFAULT 10.00,
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Table: products
-- Used in: /vendor-dashboard/page.js (Stats & Recent Products)
CREATE TABLE IF NOT EXISTS products (
  -- Primary Keys
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
  
  -- Basic Info (displayed in dashboard)
  name TEXT NOT NULL,
  description TEXT,
  images JSONB, -- Array of image URLs
  category TEXT,
  sku TEXT,
  tags JSONB DEFAULT '[]'::jsonb,
  
  -- Pricing (displayed in dashboard)
  price DECIMAL(10,2) NOT NULL,
  compare_price DECIMAL(10,2),
  
  -- Inventory (displayed in dashboard)
  stock_quantity INTEGER DEFAULT 0,
  
  -- Status (used for filtering)
  is_active BOOLEAN DEFAULT true,
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected', 'flagged')),
  
  -- Metrics (used in stats)
  view_count INTEGER DEFAULT 0,
  favorite_count INTEGER DEFAULT 0,
  sales_count INTEGER DEFAULT 0,
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Table: orders
-- Used in: /vendor-dashboard/page.js (Stats & Recent Orders)
CREATE TABLE IF NOT EXISTS orders (
  -- Primary Keys
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vendor_id UUID REFERENCES vendors(id),
  buyer_id UUID REFERENCES auth.users(id),
  delivery_agent_id UUID REFERENCES agents(id),
  
  -- Order Details (displayed in dashboard)
  order_number TEXT UNIQUE NOT NULL,
  items JSONB, -- Array of order items
  total_amount DECIMAL(10,2) NOT NULL,
  shipping_address JSONB,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  
  -- Status (used for filtering & display)
  status TEXT DEFAULT 'pending' CHECK (status IN (
    'pending', 'confirmed', 'preparing', 'ready_for_pickup', 
    'picked_up', 'out_for_delivery', 'delivered', 'cancelled'
  )),
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- 2. DELIVERY AGENT DASHBOARD SCHEMA
-- =====================================================

-- Table: agents
-- Used in: /agent-dashboard/delivery/layout.js, /agent-dashboard/delivery/page.js
CREATE TABLE IF NOT EXISTS agents (
  -- Primary Keys
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  agent_code TEXT UNIQUE,
  
  -- Personal Info (displayed in dashboard)
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  photo_url TEXT,
  
  -- Agent Type (CRITICAL - used for dashboard routing)
  agent_type TEXT NOT NULL CHECK (agent_type IN ('delivery', 'sales')),
  
  -- Status (displayed in dashboard header)
  status TEXT DEFAULT 'idle' CHECK (status IN ('idle', 'active', 'on_delivery', 'offline')),
  
  -- Verification (CRITICAL - used for access control)
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  verified_at TIMESTAMP,
  verified_by UUID REFERENCES profiles(id),
  rejection_reason TEXT,
  
  -- Performance Metrics (displayed in dashboard)
  tasks_completed INTEGER DEFAULT 0,
  tasks_failed INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0.00,
  review_count INTEGER DEFAULT 0,
  
  -- Additional Info
  assigned_location TEXT,
  zone_assignment JSONB,
  commission_rate DECIMAL(5,2) DEFAULT 5.00,
  is_active BOOLEAN DEFAULT true,
  current_location JSONB,
  
  -- Documents
  documents JSONB,
  vehicle_info JSONB,
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Table: agent_tasks
-- Used in: /agent-dashboard/delivery/page.js (Stats & Recent Tasks)
CREATE TABLE IF NOT EXISTS agent_tasks (
  -- Primary Keys
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
  
  -- Task Details
  task_type TEXT NOT NULL CHECK (task_type IN ('delivery', 'pickup', 'return', 'verification')),
  order_id UUID REFERENCES orders(id),
  product_id UUID REFERENCES products(id),
  vendor_id UUID REFERENCES vendors(id),
  
  -- Status (used for filtering & display)
  status TEXT DEFAULT 'pending' CHECK (status IN (
    'pending', 'assigned', 'in_progress', 'completed', 'failed', 'cancelled'
  )),
  
  -- Priority (displayed in dashboard)
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  
  -- Location (displayed in task details)
  location_start JSONB,
  location_end JSONB,
  
  -- Timing (displayed in dashboard)
  estimated_time INTERVAL,
  actual_time INTERVAL,
  distance DECIMAL(10,2),
  
  -- Completion Details
  notes TEXT,
  photos JSONB,
  signature TEXT,
  customer_feedback TEXT,
  rating INTEGER,
  
  -- Metadata
  assigned_at TIMESTAMP,
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Table: agent_payouts
-- Used in: /agent-dashboard/delivery/page.js (Earnings Stats)
CREATE TABLE IF NOT EXISTS agent_payouts (
  -- Primary Keys
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
  
  -- Payout Details (displayed in dashboard)
  amount DECIMAL(10,2) NOT NULL,
  
  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  
  -- Payment Info
  payment_method TEXT,
  transaction_id TEXT,
  
  -- Period
  period_start DATE,
  period_end DATE,
  
  -- Notes
  notes TEXT,
  
  -- Metadata
  processed_at TIMESTAMP,
  processed_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- 3. SALES AGENT DASHBOARD SCHEMA
-- =====================================================

-- Reuses: agents table (same as delivery agents)
-- Agent Type: agent_type = 'sales'

-- Additional fields used for sales agents:
-- - commission_rate (displayed in dashboard header)
-- - agent_code (used for referral links)

-- Future Tables (for full sales dashboard implementation):

-- Table: sales_leads (Not yet implemented - using mock data)
CREATE TABLE IF NOT EXISTS sales_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
  
  -- Lead Info
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  
  -- Status
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'lost')),
  
  -- Source
  source TEXT, -- 'referral', 'direct', etc.
  referral_code TEXT,
  
  -- Conversion
  converted_at TIMESTAMP,
  conversion_value DECIMAL(10,2),
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Table: sales_referrals (Not yet implemented - using mock data)
CREATE TABLE IF NOT EXISTS sales_referrals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
  
  -- Referral Info
  referred_user_id UUID REFERENCES auth.users(id),
  referral_code TEXT NOT NULL,
  
  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed')),
  
  -- Commission
  commission_amount DECIMAL(10,2),
  commission_paid BOOLEAN DEFAULT false,
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- =====================================================
-- 4. COMMON/SUPPORTING TABLES
-- =====================================================

-- Table: profiles (Already exists - used for auth checks)
-- Referenced in: All dashboard layouts for role checks
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- User Info
  full_name TEXT,
  email TEXT UNIQUE NOT NULL,
  
  -- Role (used in RLS policies)
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'vendor', 'agent', 'moderator', 'admin', 'super_admin')),
  
  -- Status
  is_banned BOOLEAN DEFAULT false,
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- 5. INDEXES FOR DASHBOARD PERFORMANCE
-- =====================================================

-- Vendor Dashboard Indexes
CREATE INDEX IF NOT EXISTS idx_vendors_user_id ON vendors(user_id);
CREATE INDEX IF NOT EXISTS idx_vendors_verification_status ON vendors(verification_status);
CREATE INDEX IF NOT EXISTS idx_products_vendor_id ON products(vendor_id);
CREATE INDEX IF NOT EXISTS idx_products_verification_status ON products(verification_status);
CREATE INDEX IF NOT EXISTS idx_orders_vendor_id ON orders(vendor_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

-- Agent Dashboard Indexes
CREATE INDEX IF NOT EXISTS idx_agents_user_id ON agents(user_id);
CREATE INDEX IF NOT EXISTS idx_agents_agent_type ON agents(agent_type);
CREATE INDEX IF NOT EXISTS idx_agents_verification_status ON agents(verification_status);
CREATE INDEX IF NOT EXISTS idx_agent_tasks_agent_id ON agent_tasks(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_tasks_status ON agent_tasks(status);
CREATE INDEX IF NOT EXISTS idx_agent_payouts_agent_id ON agent_payouts(agent_id);

-- =====================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_payouts ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- POLICIES COMMENTED OUT - ALREADY EXIST IN DATABASE
-- =====================================================
-- If you need to recreate policies, first drop them:
-- DROP POLICY IF EXISTS "Vendors can view own data" ON vendors;
-- DROP POLICY IF EXISTS "Vendors can view own products" ON products;
-- etc...
-- =====================================================

/*
-- Vendor Dashboard Policies
CREATE POLICY "Vendors can view own data" ON vendors
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Vendors can view own products" ON products
  FOR SELECT USING (
    vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid())
  );

CREATE POLICY "Vendors can view own orders" ON orders
  FOR SELECT USING (
    vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid())
  );

-- Agent Dashboard Policies
CREATE POLICY "Agents can view own profile" ON agents
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Agents can view own tasks" ON agent_tasks
  FOR SELECT USING (
    agent_id IN (SELECT id FROM agents WHERE user_id = auth.uid())
  );

CREATE POLICY "Agents can view own payouts" ON agent_payouts
  FOR SELECT USING (
    agent_id IN (SELECT id FROM agents WHERE user_id = auth.uid())
  );

-- Admin Policies (can view all)
CREATE POLICY "Admins can view all vendors" ON vendors
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM profiles WHERE role IN ('super_admin', 'admin', 'moderator'))
  );

CREATE POLICY "Admins can view all agents" ON agents
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM profiles WHERE role IN ('super_admin', 'admin', 'moderator'))
  );
*/

-- =====================================================
-- FIELD SUMMARY BY DASHBOARD - UPDATED DEC 7, 2024
-- =====================================================

/*
════════════════════════════════════════════════════════════════
VENDOR DASHBOARD - 100% COMPLETE
════════════════════════════════════════════════════════════════

DASHBOARD OVERVIEW (/vendor-dashboard/page.js):
  vendors: id, user_id, business_name, verification_status
  products: id, name, images, price, stock_quantity, is_active, 
            verification_status, view_count, favorite_count, created_at,
            vendor_id (filter)
  orders: id, order_number, total_amount, status, created_at,
          vendor_id (filter)

PRODUCTS LIST (/vendor-dashboard/products/page.js):
  vendors: id, user_id
  products: id, vendor_id, name, images, price, compare_price, 
            category, stock_quantity, is_active, verification_status,
            created_at, updated_at

CREATE PRODUCT (/vendor-dashboard/products/create/page.js):
  vendors: id, user_id
  products: INSERT (vendor_id, name, description, price, compare_price,
            category, stock_quantity, sku, images[], tags[], 
            verification_status, is_active, created_at)
  STORAGE: product-images bucket ✅

EDIT PRODUCT (/vendor-dashboard/products/edit/[id]/page.js):
  vendors: id, user_id
  products: UPDATE (name, description, price, compare_price, category,
            stock_quantity, sku, images[], tags[], updated_at)
            WHERE id = ? AND vendor_id = ?
  STORAGE: product-images bucket (add/remove images) ✅

ORDERS LIST (/vendor-dashboard/orders/page.js):
  vendors: id, user_id
  orders: id, vendor_id, order_number, total_amount, status, created_at,
          buyer_id, delivery_agent_id
  profiles: full_name, email (buyer info via join)
  agents: full_name, phone (delivery agent via join)

ORDER DETAILS (/vendor-dashboard/orders/[id]/page.js):
  vendors: id, user_id
  orders: id, vendor_id, order_number, total_amount, status, 
          delivery_agent_id, buyer_id, created_at, updated_at
          UPDATE: status, delivery_agent_id, updated_at
  profiles: full_name, email, phone (buyer)
  agents: full_name, phone, rating, status, agent_code, photo_url
          SELECT WHERE agent_type='delivery' AND verification_status='verified'
  agent_tasks: INSERT (agent_id, order_id, vendor_id, task_type,
               status, priority, assigned_at)

════════════════════════════════════════════════════════════════
DELIVERY AGENT DASHBOARD - 100% COMPLETE
════════════════════════════════════════════════════════════════

DASHBOARD OVERVIEW (/agent-dashboard/delivery/page.js):
  agents: id, user_id, full_name, agent_code, photo_url, agent_type,
          status, verification_status, tasks_completed, rating, 
          review_count
  agent_tasks: id, agent_id, status, assigned_at, completed_at, created_at
  agent_payouts: amount, agent_id

TASKS LIST (/agent-dashboard/delivery/tasks/page.js):
  agents: id, user_id, agent_type
  agent_tasks: id, agent_id, task_type, order_id, vendor_id, status,
               priority, location_end, assigned_at, started_at, 
               completed_at, created_at
               UPDATE: status, started_at (accept task)
  orders: order_number, total_amount (via join)
  vendors: business_name, business_phone (via join)

TASK DETAILS (/agent-dashboard/delivery/tasks/[id]/page.js):
  agents: id, user_id, agent_type, tasks_completed
  agent_tasks: id, agent_id, order_id, vendor_id, task_type, status,
               priority, location_end, photos, notes, assigned_at,
               started_at, completed_at
               UPDATE: status, completed_at, photos[], notes
  orders: id, order_number, total_amount, status
          UPDATE: status = 'delivered'
  vendors: business_name, business_phone, business_address (via join)
  STORAGE: order-attachments bucket (delivery proofs) ✅

════════════════════════════════════════════════════════════════
SALES AGENT DASHBOARD - 40% COMPLETE (MOCK DATA)
════════════════════════════════════════════════════════════════

DASHBOARD OVERVIEW (/agent-dashboard/sales/page.js):
  agents: id, user_id, full_name, agent_code, agent_type, 
          verification_status, commission_rate
  (Using mock data for leads/referrals - real tables pending)

════════════════════════════════════════════════════════════════
STORAGE USAGE BY FEATURE
════════════════════════════════════════════════════════════════

✅ CONNECTED AND WORKING:
  product-images:
    - Create product: Upload multiple images
    - Edit product: Add/remove images
    - Folder: products/{vendor_id}/{timestamp}_{random}.ext
  
  vendor-documents:
    - Vendor application: Upload business documents
    - Folder: vendors/{user_id}/{timestamp}_{random}.ext
  
  agent-documents:
    - Agent application: Upload verification documents
    - Folder: agents/{user_id}/{timestamp}_{random}.ext
  
  order-attachments:
    - Task completion: Upload delivery proof photos
    - Folder: delivery-proofs/{task_id}/{timestamp}_{random}.ext

⏳ PENDING (NON-CRITICAL):
  vendor-media: Vendor logo/banner (settings page)
  review-images: Review photos (enhancement)
  user-avatars: Profile pictures (enhancement)

════════════════════════════════════════════════════════════════
KEY DATABASE OPERATIONS BY FEATURE
════════════════════════════════════════════════════════════════

VENDOR ASSIGNS AGENT TO ORDER:
  1. UPDATE orders SET delivery_agent_id = ?, status = 'confirmed'
  2. INSERT INTO agent_tasks (agent_id, order_id, vendor_id, ...)

AGENT ACCEPTS TASK:
  1. UPDATE agent_tasks SET status = 'in_progress', started_at = NOW()

AGENT COMPLETES DELIVERY:
  1. UPDATE agent_tasks SET status = 'completed', completed_at = NOW(), 
                            photos = ?, notes = ?
  2. UPDATE orders SET status = 'delivered'
  3. UPDATE agents SET tasks_completed = tasks_completed + 1

VENDOR CREATES PRODUCT:
  1. Upload images to product-images bucket
  2. INSERT INTO products WITH images[] array of URLs

VENDOR EDITS PRODUCT:
  1. Upload new images to product-images bucket (if any)
  2. UPDATE products SET images = ? (merged array)

════════════════════════════════════════════════════════════════
COMPLETE WORKFLOW DATA FLOW
════════════════════════════════════════════════════════════════

1. Product Creation:
   vendors -> products (INSERT) + product-images (UPLOAD)

2. Order Creation:
   orders (INSERT) -> vendors (FK), buyers (FK)

3. Agent Assignment:
   orders (UPDATE delivery_agent_id) -> agent_tasks (INSERT)

4. Task Acceptance:
   agent_tasks (UPDATE status, started_at)

5. Delivery Completion:
   order-attachments (UPLOAD) -> agent_tasks (UPDATE photos, status)
   -> orders (UPDATE status) -> agents (UPDATE tasks_completed)

════════════════════════════════════════════════════════════════
*/

-- =====================================================
-- END OF DASHBOARD SCHEMA
-- Last Updated: December 7, 2024
-- Status: Production Ready - All Core Features Complete
-- =====================================================
