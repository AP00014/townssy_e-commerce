# **Dashboard Database Schema - Visual Summary**

## **📊 Database Tables Used by Each Dashboard**

---

## **1. Vendor Dashboard** (`/vendor-dashboard`)

### **Tables Used:**

#### **`vendors`** (Main table)
```sql
Fields used in dashboard:
├── id                    → Primary key
├── user_id              → Links to auth.users
├── business_name        → Display in header/sidebar
├── logo_url             → Sidebar logo
├── verification_status  → Access control
└── created_at           → Account info
```

#### **`products`** (For stats & listings)
```sql
Fields used in dashboard:
├── id                    → Product ID
├── vendor_id            → Filter by vendor
├── name                 → Product title
├── images               → Product thumbnail
├── price                → Display price
├── stock_quantity       → Inventory count
├── is_active            → Status filter
├── verification_status  → Approval status
├── view_count           → Views metric
├── favorite_count       → Favorites metric
└── created_at           → Sorting/display
```

#### **`orders`** (For sales stats)
```sql
Fields used in dashboard:
├── id                   → Order ID
├── vendor_id           → Filter by vendor
├── order_number        → Display order #
├── total_amount        → Revenue calculation
├── status              → Order status
└── created_at          → Sorting/display
```

### **Dashboard Stats Calculated:**
- Total Products (count all products)
- Active Products (count where is_active = true)
- Pending Products (count where verification_status = 'pending')
- Total Orders (count all orders)
- Total Revenue (sum of total_amount)
- Total Views (sum of view_count)
- Total Favorites (sum of favorite_count)

---

## **2. Delivery Agent Dashboard** (`/agent-dashboard/delivery`)

### **Tables Used:**

#### **`agents`** (Main table)
```sql
Fields used in dashboard:
├── id                    → Primary key
├── user_id              → Links to auth.users
├── agent_code           → Display ID
├── full_name            → Display name
├── photo_url            → Avatar
├── agent_type           → MUST BE 'delivery'
├── status               → 🟢 Active/🟠 On Delivery/⚫ Offline
├── verification_status  → Access control (MUST BE 'verified')
├── tasks_completed      → Performance metric
├── tasks_failed         → Performance metric
├── rating               → Average rating
├── review_count         → # of reviews
└── created_at           → Account info
```

#### **`agent_tasks`** (For delivery tasks)
```sql
Fields used in dashboard:
├── id                   → Task ID
├── agent_id            → Filter by agent
├── task_type           → 'delivery', 'pickup', etc.
├── order_id            → Related order
├── status              → Task status
├── priority            → Task priority
├── location_end        → Delivery address
├── assigned_at         → When assigned
├── started_at          → When started
├── completed_at        → When completed
└── created_at          → Sorting
```

#### **`agent_payouts`** (For earnings)
```sql
Fields used in dashboard:
├── id                   → Payout ID
├── agent_id            → Filter by agent
├── amount              → Earnings amount
├── status              → Payout status
└── created_at          → Date
```

### **Dashboard Stats Calculated:**
- Active Tasks (count where status IN ('assigned', 'in_progress'))
- Completed Today (count where status = 'completed' AND date = today)
- Total Completed (from agents.tasks_completed)
- Pending Tasks (count where status = 'assigned')
- Total Earnings (sum of agent_payouts.amount)
- Rating (from agents.rating)
- Review Count (from agents.review_count)

---

## **3. Sales Agent Dashboard** (`/agent-dashboard/sales`)

### **Tables Used:**

#### **`agents`** (Main table)
```sql
Fields used in dashboard:
├── id                    → Primary key
├── user_id              → Links to auth.users
├── agent_code           → For referral link
├── full_name            → Display name
├── photo_url            → Avatar
├── agent_type           → MUST BE 'sales'
├── verification_status  → Access control (MUST BE 'verified')
├── commission_rate      → Display in header
└── created_at           → Account info
```

#### **`sales_leads`** (Future - currently using mock data)
```sql
Fields for future implementation:
├── id                   → Lead ID
├── agent_id            → Filter by agent
├── name                → Lead name
├── email               → Contact
├── status              → 'new', 'contacted', 'converted', 'lost'
└── created_at          → Date added
```

#### **`sales_referrals`** (Future - currently using mock data)
```sql
Fields for future implementation:
├── id                   → Referral ID
├── agent_id            → Filter by agent
├── referral_code       → Tracking code
├── commission_amount   → Earnings
└── status              → Referral status
```

### **Dashboard Stats (Current - Mock Data):**
- Total Leads: 45
- Converted Leads: 18
- Active Leads: 12
- Total Referrals: 32
- Total Earnings: $1,250.00
- This Month Earnings: $450.00
- Conversion Rate: 40%

---

## **🔐 Access Control Fields (CRITICAL)**

### **All Dashboards Check These:**

| Field | Table | Purpose |
|-------|-------|---------|
| `verification_status` | vendors | Only 'verified' vendors access dashboard |
| `verification_status` | agents | Only 'verified' agents access dashboard |
| `agent_type` | agents | Routes 'delivery' vs 'sales' dashboards |
| `user_id` | vendors/agents | Links to authenticated user |
| `is_active` | vendors/agents | Account status |

### **Verification Flow:**
```
User logs in
    ↓
Check auth.uid()
    ↓
Query vendors/agents table by user_id
    ↓
Check verification_status
    ↓
    ├── 'verified' → ✅ Grant dashboard access
    ├── 'pending' → ❌ Redirect to /agent-pending
    └── 'rejected' → ❌ Redirect to /agent-pending
```

---

## **📈 Performance Indexes**

### **Critical for Fast Dashboard Loading:**

```sql
-- Vendor Dashboard
CREATE INDEX idx_vendors_user_id ON vendors(user_id);
CREATE INDEX idx_products_vendor_id ON products(vendor_id);
CREATE INDEX idx_orders_vendor_id ON orders(vendor_id);

-- Agent Dashboards
CREATE INDEX idx_agents_user_id ON agents(user_id);
CREATE INDEX idx_agents_agent_type ON agents(agent_type);
CREATE INDEX idx_agent_tasks_agent_id ON agent_tasks(agent_id);
CREATE INDEX idx_agent_payouts_agent_id ON agent_payouts(agent_id);

-- Verification
CREATE INDEX idx_vendors_verification_status ON vendors(verification_status);
CREATE INDEX idx_agents_verification_status ON agents(verification_status);
```

---

## **🔒 Row Level Security (RLS) Policies**

### **Vendor Dashboard:**
```sql
-- Vendors see only their own data
vendors: WHERE user_id = auth.uid()
products: WHERE vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid())
orders: WHERE vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid())
```

### **Agent Dashboards:**
```sql
-- Agents see only their own data
agents: WHERE user_id = auth.uid()
agent_tasks: WHERE agent_id IN (SELECT id FROM agents WHERE user_id = auth.uid())
agent_payouts: WHERE agent_id IN (SELECT id FROM agents WHERE user_id = auth.uid())
```

### **Admin Override:**
```sql
-- Admins see everything
WHERE auth.uid() IN (
  SELECT id FROM profiles 
  WHERE role IN ('super_admin', 'admin', 'moderator')
)
```

---

## **📊 Quick Reference Table**

| Dashboard | Primary Table | Auth Field | Type Filter | Status Filter |
|-----------|--------------|------------|-------------|---------------|
| Vendor | vendors | user_id | - | verification_status = 'verified' |
| Delivery Agent | agents | user_id | agent_type = 'delivery' | verification_status = 'verified' |
| Sales Agent | agents | user_id | agent_type = 'sales' | verification_status = 'verified' |

---

## **✅ Schema File Locations**

1. **`dashboards_schema.sql`** - Complete schema for all dashboards (THIS FILE)
2. **`supabase_schema_complete.sql`** - Full platform schema (includes more fields)
3. **`agents_schema.sql`** - Agent-specific tables
4. **`vendors_schema.sql`** - (Create this if needed)

---

## **🚀 Quick Start Commands**

### **To Set Up Dashboards:**

```sql
-- 1. Run the dashboards schema
\i dashboards_schema.sql

-- 2. Verify tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('vendors', 'agents', 'products', 'orders', 'agent_tasks', 'agent_payouts');

-- 3. Check indexes
SELECT indexname FROM pg_indexes 
WHERE tablename IN ('vendors', 'agents', 'products', 'orders', 'agent_tasks');

-- 4. Verify RLS is enabled
SELECT tablename, rowsecurity FROM pg_tables 
WHERE tablename IN ('vendors', 'agents', 'products', 'orders', 'agent_tasks');
```

---

## **📝 Notes**

1. ✅ **Sales agent dashboard uses mock data** for leads/referrals (tables exist but not populated)
2. ✅ **All dashboards enforce verification_status = 'verified'**
3. ✅ **Agents table shared between delivery & sales** (differentiated by agent_type)
4. ✅ **RLS policies ensure data isolation** between vendors/agents
5. ✅ **Indexes created for optimal query performance**

---

**Last Updated**: December 7, 2024  
**Version**: 1.0 (Dashboard Launch)
