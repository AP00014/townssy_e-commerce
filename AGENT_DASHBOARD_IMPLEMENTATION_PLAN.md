# **Agent Dashboard Implementation Plan**

## **Overview**
This document outlines the complete implementation plan for the Agent Dashboard feature, where verified agents (Delivery & Sales) can manage their tasks, track earnings, and interact with the platform.

---

## **1. Agent Types**

### **1.1 Delivery Agents**
- Handle order deliveries
- Update delivery status
- Upload proof of delivery (photos, signatures)
- Manage delivery schedule
- Track earnings per delivery

### **1.2 Sales Agents**
- Generate sales/referrals
- Track commission on sales
- View referral links
- Monitor conversion rates
- Manage customer leads

---

## **2. Key Features**

### **Agent Dashboard (/agent-dashboard)**
Verified agents will have access to a dedicated dashboard with:

#### **2.1 Dashboard Overview**
- **Active Tasks** - Current ongoing deliveries/tasks
- **Completed Tasks** - Today's completed tasks
- **Pending Tasks** - Assigned but not started
- **Total Earnings** - Current period earnings
- **Tasks Completed** - Lifetime count
- **Average Rating** - Customer feedback rating
- **Status Toggle** - Online/Offline/Idle
- **Location Status** - Current location (for delivery agents)

#### **2.2 Task Management (Delivery Agents)**
- **Available Tasks** - New delivery requests nearby
- **My Tasks** - Assigned deliveries
- **Task Details**:
  - Order information
  - Pickup location (vendor/warehouse)
  - Delivery address
  - Customer contact
  - Estimated distance
  - Delivery fee
  - Instructions/Notes
- **Accept/Reject Task**
- **Start Delivery** - Mark as picked up
- **Upload Proof** - Photos, signature on delivery
- **Complete Task** - Mark as delivered
- **Report Issues** - Unable to deliver, customer not available, etc.

#### **2.3 Task Management (Sales Agents)**
- **My Referral Links**
- **Leads & Conversions**
- **Customer Inquiries**
- **Sales Performance**
- **Marketing Materials**

#### **2.4 Earnings & Payments**
- **Current Balance** - Pending payout
- **Earnings History** - Weekly/Monthly breakdown
- **Transaction Log** - All earnings with details
- **Payout History** - Completed payouts
- **Bank Details** - Update payment information
- **Commission Rates** - View current rates

#### **2.5 Performance Analytics**
- **Tasks Completed Chart** (Daily/Weekly/Monthly)
- **Earnings Trend**
- **Average Delivery Time**
- **Customer Ratings & Reviews**
- **Success Rate** (Completed vs Failed)
- **Top Performing Days**

#### **2.6 Schedule & Availability**
- **Working Hours** - Set availability
- **Zone Assignment** - Preferred delivery areas
- **Break/Offline Mode**
- **Schedule Calendar**

#### **2.7 Profile & Settings**
- **Personal Information**
- **Vehicle Details** (for delivery agents)
- **Documents** - License, ID, insurance
- **Emergency Contact**
- **Bank Account Details**
- **Notification Preferences**

---

## **3. Database Schema** (Already Defined in agents_schema.sql)

### **3.1 Agents Table**
Fields available:
- `id`, `user_id`, `agent_code`
- `full_name`, `email`, `phone`
- `agent_type` ('delivery', 'sales')
- `assigned_location`, `zone_assignment`
- `commission_rate`
- `is_active`, `current_location`
- `status` ('idle', 'active', 'on_delivery', 'offline')
- `verification_status` ('pending', 'verified', 'rejected')
- `tasks_completed`, `tasks_failed`
- `rating`, `review_count`
- `documents`, `vehicle_info`
- `availability`, `emergency_contact`
- `bank_details`

### **3.2 Agent Tasks Table**
Fields available:
- `id`, `agent_id`
- `task_type` ('delivery', 'verification', 'pickup', 'return')
- `order_id`, `product_id`, `vendor_id`
- `priority` ('low', 'normal', 'high', 'urgent')
- `status` ('pending', 'assigned', 'in_progress', 'completed', 'failed', 'cancelled')
- `location_start`, `location_end`
- `estimated_time`, `actual_time`, `distance`
- `notes`, `photos`, `signature`
- `customer_feedback`, `rating`
- `assigned_at`, `started_at`, `completed_at`

### **3.3 Agent Payouts Table**
Already defined in schema.

---

## **4. Vendor Integration** (Agent Assignment)

### **4.1 Vendor Selects Agent for Order**
When vendor confirms an order, they can:

1. **View Available Agents**:
   - List of verified delivery agents
   - Filter by:
     - Location/Zone
     - Availability status
     - Rating
     - Distance from vendor/customer
   - Display:
     - Agent name
     - Current status (Online/Offline)
     - Rating (⭐ 4.8)
     - Completed tasks count
     - Distance from pickup location
     - Vehicle type (Motorbike, Car, Van)

2. **Assign Agent**:
   - Click "Assign" button
   - System creates `agent_task` record
   - Agent receives notification
   - Agent can accept/reject task

3. **Auto-Assignment** (Future Enhancement):
   - System auto-assigns based on:
     - Proximity
     - Availability
     - Rating
     - Workload

### **4.2 Vendor Dashboard - Agent Selection UI**
```
Order #12345
├── Customer: John Doe
├── Delivery Address: 123 Main St, Accra
├── [Select Delivery Agent] Button
└── Agent Selection Modal:
    ├── Search/Filter:
    │   ├── Location: Accra (auto-filled)
    │   ├── Status: Online only
    │   └── Sort by: Distance
    └── Agent List:
        ├── Agent Card 1:
        │   ├── Name: Kwame Mensah
        │   ├── Status: 🟢 Online
        │   ├── Rating: ⭐ 4.9 (245 deliveries)
        │   ├── Vehicle: Motorbike
        │   ├── Distance: 2.3 km away
        │   └── [Assign] Button
        ├── Agent Card 2: ...
        └── Agent Card 3: ...
```

---

## **5. Buyer Integration** (Order Tracking)

### **5.1 Buyer Order Page Enhancements**
Buyers can track their orders at `/orders` or `/orders/[id]`:

#### **Order Status Flow:**
1. **Pending** - Order placed, awaiting vendor confirmation
2. **Confirmed** - Vendor accepted order
3. **Preparing** - Vendor is preparing the order
4. **Ready for Pickup** - Agent assigned, ready for pickup
5. **Picked Up** - Agent collected the order
6. **Out for Delivery** - Agent on the way
7. **Delivered** - Order delivered successfully
8. **Cancelled** - Order cancelled

#### **Real-Time Tracking Features:**
- **Agent Information**:
  - Agent name
  - Agent photo
  - Vehicle type
  - Contact button (Call/WhatsApp)
- **Live Location** (Future):
  - Map showing agent's current location
  - Estimated time of arrival (ETA)
  - Route visualization
- **Status Updates**:
  - Timestamp for each status change
  - Notifications when status changes
- **Proof of Delivery**:
  - Delivery photo
  - Signature (if applicable)
  - Delivery notes

#### **Buyer Order Details Page Layout:**
```
Order #12345

Status: [Out for Delivery] ●●●●○○○

┌─────────────────────────────────┐
│ Delivery Agent                  │
├─────────────────────────────────┤
│ [Agent Photo]  Kwame Mensah     │
│                ⭐ 4.9           │
│                Motorbike        │
│                                 │
│ [📞 Call] [💬 WhatsApp]         │
│                                 │
│ ETA: 15 minutes                 │
│ Distance: 3.2 km                │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ Order Timeline                  │
├─────────────────────────────────┤
│ ✅ Order Placed                 │
│    Dec 7, 2:30 PM               │
│                                 │
│ ✅ Confirmed by Vendor          │
│    Dec 7, 2:35 PM               │
│                                 │
│ ✅ Picked Up by Agent           │
│    Dec 7, 3:00 PM               │
│                                 │
│ 🚚 Out for Delivery             │
│    Dec 7, 3:15 PM               │
│    Estimated arrival: 3:30 PM   │
└─────────────────────────────────┘

Products
Delivery Address
Payment Details
```

---

## **6. Admin/Moderator Integration**

### **6.1 Admin Can Assist with Deliveries**
- View all active deliveries
- Reassign agents if needed
- Monitor agent performance
- Handle delivery disputes
- Override agent assignments

### **6.2 Moderator Capabilities**
- Monitor ongoing deliveries
- Contact agents for status updates
- Help resolve delivery issues
- View delivery analytics

---

## **7. Routing Structure**

```
/agent-dashboard (Main Dashboard - Overview)
├── /agent-dashboard/tasks (Task List)
│   ├── /agent-dashboard/tasks/available (Available Tasks - Not yet assigned)
│   └── /agent-dashboard/tasks/[id] (Task Details & Actions)
├── /agent-dashboard/earnings (Earnings & Payouts)
│   └── /agent-dashboard/earnings/history (Transaction History)
├── /agent-dashboard/analytics (Performance Analytics)
├── /agent-dashboard/schedule (Availability & Schedule)
└── /agent-dashboard/settings (Profile & Settings)
```

---

## **8. Agent Task Flow** (Delivery Agent)

### **Step 1: Agent Receives Task**
- Notification: "New delivery task nearby"
- View task details
- Accept or Reject

### **Step 2: Agent Accepts Task**
- Task status: `assigned` → `in_progress`
- Navigate to pickup location
- Contact vendor if needed

### **Step 3: Agent Picks Up Order**
- Mark as "Picked Up"
- Optional: Take photo of package
- Start delivery

### **Step 4: Agent Delivers Order**
- Navigate to customer
- Contact customer if needed
- Deliver package
- Collect signature/photo
- Mark as "Delivered"

### **Step 5: Task Completed**
- Customer can rate agent
- Earnings updated
- Next task available

---

## **9. Location-Based Features**

### **9.1 Agent Location Tracking**
- Agents update `current_location` field periodically
- Format: `{lat: 5.6037, lng: -0.1870, last_updated: "2024-12-07T10:30:00Z"}`
- Privacy: Only shared when agent is online and has active task

### **9.2 Nearby Agent Search** (For Vendors)
```sql
-- Find nearby agents within 10km radius
SELECT 
  a.id,
  a.full_name,
  a.rating,
  a.tasks_completed,
  a.vehicle_info,
  a.current_location,
  -- Calculate distance using Haversine formula or PostGIS
  calculate_distance(
    a.current_location->>'lat', 
    a.current_location->>'lng',
    vendor_lat,
    vendor_lng
  ) as distance
FROM agents a
WHERE 
  a.agent_type = 'delivery'
  AND a.verification_status = 'verified'
  AND a.is_active = true
  AND a.status IN ('idle', 'active')
  AND calculate_distance(...) < 10 -- Within 10km
ORDER BY distance ASC, rating DESC
LIMIT 10;
```

### **9.3 Zone Assignment**
- Agents can set preferred zones (e.g., "Accra Central", "Kumasi North")
- Stored in `zone_assignment` JSONB field
- Vendors filter by zone when selecting agents

---

## **10. Commission & Payment System** (Future Phase)

### **10.1 Commission Structure**
- Fixed fee per delivery (e.g., GHS 10)
- Distance-based pricing (e.g., GHS 2 per km)
- Commission percentage (e.g., 10% of delivery fee)
- Bonus for high ratings

### **10.2 Payout Schedule**
- Weekly payouts (every Monday)
- Minimum threshold (e.g., GHS 50)
- Payment methods: Bank transfer, Mobile Money

### **10.3 Agent Earnings Calculation**
```javascript
// Example calculation
const deliveryFee = baseRate + (distance * perKmRate);
const agentEarnings = deliveryFee * (1 - platformCommission);
const bonus = rating >= 4.5 ? bonusAmount : 0;
const totalEarnings = agentEarnings + bonus;
```

---

## **11. RLS Policies for Agents**

```sql
-- Agents can view their own tasks
CREATE POLICY "Agents can view assigned tasks" ON agent_tasks
  FOR SELECT USING (
    agent_id IN (SELECT id FROM agents WHERE user_id = auth.uid())
  );

-- Agents can update their tasks (status, photos, etc.)
CREATE POLICY "Agents can update assigned tasks" ON agent_tasks
  FOR UPDATE USING (
    agent_id IN (SELECT id FROM agents WHERE user_id = auth.uid())
  );

-- Agents can view their own profile
CREATE POLICY "Agents can view own profile" ON agents
  FOR SELECT USING (user_id = auth.uid());

-- Agents can update their own profile
CREATE POLICY "Agents can update own profile" ON agents
  FOR UPDATE USING (user_id = auth.uid());

-- Agents can view their own payouts
CREATE POLICY "Agents can view own payouts" ON agent_payouts
  FOR SELECT USING (
    agent_id IN (SELECT id FROM agents WHERE user_id = auth.uid())
  );
```

---

## **12. Notifications System**

### **12.1 Agent Notifications**
- New task assigned
- Task accepted by another agent (if pending)
- Customer message
- Payment processed
- Rating received

### **12.2 Vendor Notifications**
- Agent accepted task
- Agent picked up order
- Delivery completed
- Delivery failed/issue reported

### **12.3 Buyer Notifications**
- Agent assigned
- Order picked up
- Out for delivery
- Delivered

---

## **13. Implementation Phases**

### **Phase 1: Core Agent Dashboard (Priority)**
- [ ] Agent dashboard layout with sidebar navigation
- [ ] Main overview page (stats, active tasks)
- [ ] Task list page (available & assigned tasks)
- [ ] Task details page with actions
- [ ] Accept/Reject task functionality
- [ ] Update task status (picked up, delivered)
- [ ] Upload proof of delivery (photo)

### **Phase 2: Vendor-Agent Integration**
- [ ] Vendor can view available agents
- [ ] Agent selection modal/page for orders
- [ ] Filter agents by location, status, rating
- [ ] Assign agent to order (creates agent_task)
- [ ] Agent notification on assignment

### **Phase 3: Buyer Order Tracking**
- [ ] Enhanced order details page for buyers
- [ ] Display assigned agent information
- [ ] Show delivery status timeline
- [ ] Agent contact buttons (Call/WhatsApp)
- [ ] Display proof of delivery after completion

### **Phase 4: Location & Mapping**
- [ ] Agent location tracking
- [ ] Nearby agent search based on GPS
- [ ] Live map showing agent location (for buyer)
- [ ] Route optimization
- [ ] ETA calculation

### **Phase 5: Earnings & Payouts**
- [ ] Agent earnings dashboard
- [ ] Transaction history
- [ ] Payout request functionality
- [ ] Admin payout processing
- [ ] Commission calculation logic

### **Phase 6: Analytics & Performance**
- [ ] Agent performance analytics
- [ ] Charts (earnings, tasks, ratings)
- [ ] Sales agent dashboard (referrals, conversions)
- [ ] Export reports

---

## **14. UI Components Needed**

1. **AgentDashboardLayout** - Sidebar navigation for agent pages
2. **TaskCard** - Display task summary
3. **TaskDetailView** - Full task information
4. **AgentMap** - Show pickup/delivery locations
5. **ProofOfDeliveryUpload** - Photo/signature capture
6. **EarningsChart** - Visualize earnings over time
7. **AgentSelectionModal** - For vendors to select agent
8. **AgentCard** - Display agent info with rating
9. **OrderTrackingTimeline** - For buyer order page
10. **AgentContactButtons** - Call/WhatsApp

---

## **15. Mobile Considerations**

- Agent dashboard should be highly mobile-optimized
- Quick access to "Accept Task" button
- Easy photo upload for proof of delivery
- One-tap navigation to Google Maps
- Offline mode for viewing assigned tasks
- Push notifications for new tasks

---

## **16. Security & Privacy**

- Agent location only shared when online and on active task
- Customer phone numbers only visible after task acceptance
- Proof of delivery photos stored securely
- Agent documents (licenses, IDs) only visible to admins

---

## **17. Testing Scenarios**

1. **Agent accepts task**
2. **Agent rejects task** (task goes back to available pool)
3. **Vendor assigns agent to order**
4. **Agent marks order as picked up**
5. **Agent delivers order and uploads proof**
6. **Buyer tracks order in real-time**
7. **Admin reassigns agent mid-delivery**
8. **Agent reports delivery issue**
9. **Payout calculation and processing**
10. **Agent updates availability/schedule**

---

## **18. Next Steps**

1. ✅ Database schema (already done in `agents_schema.sql`)
2. ✅ Storage buckets (already done in `supabase_storage_buckets.sql`)
3. [ ] Create agent dashboard layout component
4. [ ] Build agent main dashboard (overview page)
5. [ ] Implement task list and task details pages
6. [ ] Add agent selection to vendor order flow
7. [ ] Enhance buyer order tracking page
8. [ ] Test with verified agent and vendor accounts

---

## **19. Integration Points**

### **With Vendor Dashboard:**
- Vendor creates order → Can assign agent
- Vendor views order details → See agent info
- Vendor manages deliveries → Reassign if needed

### **With Buyer Orders Page:**
- Buyer views order → See delivery status
- Buyer tracks delivery → See agent location
- Buyer contacts agent → Call/message directly

### **With Admin Panel:**
- Admin monitors all active deliveries
- Admin can reassign agents
- Admin processes payouts
- Admin views agent performance

---

## **20. Future Enhancements**

- **Multi-stop deliveries** - Agent picks up multiple orders
- **Delivery slots** - Buyers choose delivery time
- **Agent teams** - Coordinate multiple agents
- **Gamification** - Badges, leaderboards for agents
- **Agent training** - Onboarding modules
- **Customer tips** - Buyers can tip agents
- **Agent chat** - Direct messaging between vendor/buyer/agent
