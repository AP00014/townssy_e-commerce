# **Agent Verification Flow - Complete Documentation**

## **🔒 Security Context: Dashboard Access Control**

### **CRITICAL RULE**
> **Agent dashboards are ONLY accessible to VERIFIED agents**

---

## **📋 Verification Status Flow**

### **Status Options:**
1. **`pending`** - Application submitted, awaiting admin review
2. **`verified`** - Approved by admin, full access granted
3. **`rejected`** - Not approved, with optional rejection reason

---

## **🚫 Access Control Logic**

### **For Delivery Agent Dashboard** (`/agent-dashboard/delivery`)

```javascript
✅ ALLOWED:
- User is authenticated
- Agent record exists
- agent_type = 'delivery'
- verification_status = 'verified' ← KEY REQUIREMENT

❌ BLOCKED:
- Not authenticated → Redirect to /auth/login
- No agent record → Redirect to /agent-application
- Wrong agent_type → Redirect to /agent-application
- verification_status = 'pending' → Redirect to /agent-pending
- verification_status = 'rejected' → Redirect to /agent-pending
```

### **For Sales Agent Dashboard** (`/agent-dashboard/sales`)

```javascript
✅ ALLOWED:
- User is authenticated
- Agent record exists
- agent_type = 'sales'
- verification_status = 'verified' ← KEY REQUIREMENT

❌ BLOCKED:
- Not authenticated → Redirect to /auth/login
- No agent record → Redirect to /agent-application
- Wrong agent_type → Redirect to /agent-application
- verification_status = 'pending' → Redirect to /agent-pending
- verification_status = 'rejected' → Redirect to /agent-pending
```

---

## **🎯 User Journey**

### **Step 1: User Applies**
```
User fills out agent application form
    ↓
Uploads required documents
    ↓
Submits application
    ↓
Agent record created with verification_status = 'pending'
    ↓
User is redirected to confirmation page
```

### **Step 2: Pending Verification**
```
User tries to access dashboard
    ↓
System checks verification_status
    ↓
Status = 'pending'
    ↓
Redirected to /agent-pending
    ↓
Shows beautiful pending page with:
  - Application status
  - Application details
  - Expected timeline
  - Support contact
```

### **Step 3: Admin Review**
```
Admin logs into /admin/agents
    ↓
Views pending applications
    ↓
Reviews submitted documents
    ↓
Makes decision:
  - APPROVE → verification_status = 'verified'
  - REJECT → verification_status = 'rejected' + rejection_reason
    ↓
System sends email notification to agent
```

### **Step 4A: Approved**
```
verification_status = 'verified'
    ↓
Agent receives approval email
    ↓
Agent logs in
    ↓
Tries to access dashboard
    ↓
✅ ACCESS GRANTED
    ↓
Redirected to appropriate dashboard:
  - /agent-dashboard/delivery (if delivery agent)
  - /agent-dashboard/sales (if sales agent)
```

### **Step 4B: Rejected**
```
verification_status = 'rejected'
    ↓
Agent receives rejection email
    ↓
Agent logs in
    ↓
Tries to access dashboard
    ↓
Redirected to /agent-pending
    ↓
Shows rejection message with:
  - Rejection reason
  - Option to contact support
  - Option to reapply
```

---

## **💻 Implementation Code**

### **Dashboard Layout Check** (Both Delivery & Sales)

```javascript
// Inside layout.js useEffect
const fetchAgent = async () => {
  if (!user) return;

  try {
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .eq('user_id', user.id)
      .eq('agent_type', 'delivery') // or 'sales'
      .single();

    if (error) {
      // No agent record found
      router.push('/agent-application');
      return;
    }

    // ✅ KEY VERIFICATION CHECK
    if (data.verification_status !== 'verified') {
      // Redirect to pending page
      router.push('/agent-pending');
      return;
    }

    // ✅ Agent is verified - grant access
    setAgent(data);
  } catch (error) {
    router.push('/agent-application');
  } finally {
    setLoading(false);
  }
};
```

---

## **📄 Pending Page Features** (`/agent-pending`)

### **Display Logic:**

**For status = 'pending':**
- 🟡 Yellow theme
- ⏰ Clock icon
- "Application Under Review" title
- Expected timeline (1-2 business days)
- Application details card
- Return to homepage button

**For status = 'rejected':**
- 🔴 Red theme
- ❌ X Circle icon
- "Application Not Approved" title
- Rejection reason (if provided)
- Application details card
- **Reapply button**
- Return to homepage button
- Support contact info

**For status = 'verified':**
- Auto-redirect to dashboard (shouldn't reach this page)

---

## **🎨 Pending Page Design**

```
┌─────────────────────────────────────────┐
│                                          │
│           ⏰ [CLOCK ICON]                │
│                                          │
│       Application Under Review           │
│  Your agent application is currently     │
│  being reviewed by our admin team.       │
│                                          │
├─────────────────────────────────────────┤
│  Application Details                     │
│  ┌─────────────────────────────────┐    │
│  │ Agent Type: Delivery Agent      │    │
│  │ Application ID: ABC123          │    │
│  │ Submitted: Dec 7, 2024          │    │
│  │ Status: PENDING                 │    │
│  └─────────────────────────────────┘    │
│                                          │
│  ℹ️ Note: This process typically takes  │
│  1-2 business days. You will receive    │
│  an email notification once verified.   │
│                                          │
│  [🏠 Return to Homepage]                │
│                                          │
│  Need help? Contact our support team    │
│  📧 support@townssy.com                 │
└─────────────────────────────────────────┘
```

---

## **🔔 Notification System**

### **Emails Sent:**

1. **Application Submitted** (Immediate)
   - To: Agent
   - Subject: "Agent Application Received"
   - Content: Confirmation with application ID

2. **Application Approved** (After admin approval)
   - To: Agent
   - Subject: "Welcome! Your Agent Account is Approved"
   - Content: Login instructions, dashboard link

3. **Application Rejected** (After admin rejects)
   - To: Agent
   - Subject: "Agent Application Update"
   - Content: Rejection reason, reapply option, support contact

---

## **👨‍💼 Admin Actions**

### **Admin Dashboard** (`/admin/agents`)

Admins can:
1. View all pending applications
2. Click into agent details
3. Review submitted documents
4. **Approve** → Sets verification_status = 'verified'
5. **Reject** → Sets verification_status = 'rejected' + adds rejection_reason
6. Send notification emails

---

## **🔐 Database Level Security**

### **RLS Policies:**

```sql
-- Agents can only view their own dashboard data
CREATE POLICY "Agents view own data" ON agent_tasks
  FOR SELECT
  USING (
    agent_id IN (
      SELECT id FROM agents 
      WHERE user_id = auth.uid() 
      AND verification_status = 'verified' -- ✅ KEY CHECK
    )
  );

-- Similar for agent_payouts, etc.
```

---

## **✅ Testing Scenarios**

### **Test 1: Pending Agent**
```
1. Create agent with verification_status = 'pending'
2. Try to access /agent-dashboard/delivery
3. Should redirect to /agent-pending
4. Should show pending status page
✅ PASS if redirected correctly
```

### **Test 2: Verified Agent**
```
1. Create agent with verification_status = 'verified'
2. Try to access /agent-dashboard/delivery
3. Should show dashboard
✅ PASS if dashboard loads
```

### **Test 3: Rejected Agent**
```
1. Create agent with verification_status = 'rejected'
2. Try to access /agent-dashboard/delivery
3. Should redirect to /agent-pending
4. Should show rejection message
5. Should show "Reapply" button
✅ PASS if redirected with rejection UI
```

### **Test 4: No Agent Record**
```
1. User has no agent record
2. Try to access /agent-dashboard/delivery
3. Should redirect to /agent-application
✅ PASS if redirected to application form
```

---

## **📊 Summary Matrix**

| Verification Status | Dashboard Access | Redirects To | Can See |
|---------------------|------------------|--------------|---------|
| `pending` | ❌ **BLOCKED** | `/agent-pending` | Pending page |
| `verified` | ✅ **ALLOWED** | Dashboard | Full dashboard |
| `rejected` | ❌ **BLOCKED** | `/agent-pending` | Rejection page |
| (no record) | ❌ **BLOCKED** | `/agent-application` | Application form |

---

## **🎯 Key Takeaways**

1. ✅ **Only verified agents** can access dashboards
2. ✅ **Pending agents** see beautiful waiting page
3. ✅ **Rejected agents** can reapply
4. ✅ **No confusing alerts** - proper UI/UX
5. ✅ **Admin has full control** over verification
6. ✅ **Database-level security** via RLS
7. ✅ **Email notifications** keep users informed

---

**This ensures platform security while providing excellent user experience!** 🔒✨

**Last Updated**: December 7, 2024  
**Version**: 1.0 (Complete)
