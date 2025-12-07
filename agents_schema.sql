-- =====================================================
-- AGENT MANAGEMENT SCHEMA
-- =====================================================

-- 1. Agents Table
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

-- 2. Agent Tasks Table
CREATE TABLE IF NOT EXISTS agent_tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
  task_type TEXT CHECK (task_type IN ('delivery', 'verification', 'pickup', 'return')),
  order_id UUID REFERENCES orders(id),
  product_id UUID REFERENCES products(id), -- References products table (for verification tasks)
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

-- 3. Agent Payouts Table
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

-- 4. Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_agents_user_id ON agents(user_id);
CREATE INDEX IF NOT EXISTS idx_agents_status ON agents(status);
CREATE INDEX IF NOT EXISTS idx_agents_is_active ON agents(is_active);
CREATE INDEX IF NOT EXISTS idx_agents_type ON agents(agent_type);
CREATE INDEX IF NOT EXISTS idx_agents_verification_status ON agents(verification_status);

CREATE INDEX IF NOT EXISTS idx_agent_tasks_agent_id ON agent_tasks(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_tasks_status ON agent_tasks(status);
CREATE INDEX IF NOT EXISTS idx_agent_tasks_order_id ON agent_tasks(order_id);

CREATE INDEX IF NOT EXISTS idx_agent_payouts_agent_id ON agent_payouts(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_payouts_status ON agent_payouts(status);

-- 5. Row Level Security (RLS)
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_payouts ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is admin (if not already created)
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

-- Policies for Agents Table
-- Public can view active, verified agents (e.g. for selection)
CREATE POLICY "Public can view active agents" ON agents
  FOR SELECT USING (is_active = true AND verification_status = 'verified');

-- Agents can view and edit their own profile
CREATE POLICY "Agents can view own profile" ON agents
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Agents can update own profile" ON agents
  FOR UPDATE USING (user_id = auth.uid());

-- Admins can view and manage all agents
CREATE POLICY "Admins can view all agents" ON agents
  FOR SELECT USING (is_admin());

CREATE POLICY "Admins can manage agents" ON agents
  FOR ALL USING (is_admin());

-- Policies for Agent Tasks
-- Agents can view their assigned tasks
CREATE POLICY "Agents can view assigned tasks" ON agent_tasks
  FOR SELECT USING (
    agent_id IN (SELECT id FROM agents WHERE user_id = auth.uid())
  );

-- Agents can update their tasks (e.g. status, completion)
CREATE POLICY "Agents can update assigned tasks" ON agent_tasks
  FOR UPDATE USING (
    agent_id IN (SELECT id FROM agents WHERE user_id = auth.uid())
  );

-- Admins can view and manage all tasks
CREATE POLICY "Admins can view all tasks" ON agent_tasks
  FOR SELECT USING (is_admin());

CREATE POLICY "Admins can manage tasks" ON agent_tasks
  FOR ALL USING (is_admin());

-- Policies for Agent Payouts
-- Agents can view their own payouts
CREATE POLICY "Agents can view own payouts" ON agent_payouts
  FOR SELECT USING (
    agent_id IN (SELECT id FROM agents WHERE user_id = auth.uid())
  );

-- Admins can manage payouts
CREATE POLICY "Admins can manage payouts" ON agent_payouts
  FOR ALL USING (is_admin());

-- 6. Triggers for updated_at
-- (Assumes public.handle_updated_at function exists, otherwise create it)
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_agent_updated ON agents;
CREATE TRIGGER on_agent_updated BEFORE UPDATE ON agents
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS on_agent_tasks_updated ON agent_tasks;
CREATE TRIGGER on_agent_tasks_updated BEFORE UPDATE ON agent_tasks
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS on_agent_payouts_updated ON agent_payouts;
CREATE TRIGGER on_agent_payouts_updated BEFORE UPDATE ON agent_payouts
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
