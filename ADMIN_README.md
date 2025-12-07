# Multi-Role Admin Dashboard - Implementation Guide

## 🎯 Overview

A comprehensive, role-based admin dashboard for the Townssy E-commerce platform, built with Next.js 14 APP Router and Supabase. The system supports three distinct admin roles with granular permissions.

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with RLS
- **Styling**: Tailwind CSS + Custom CSS
- **Icons**: Lucide React

### Role Hierarchy

1. **Superadmin** (super_admin)
   - Full platform control
   - Financial management
   - System settings
   - Role management
   - Audit logs

2. **Admin** (admin)
   - Operational oversight
   - Vendor management
   - Order management
   - Agent management
   - Dispute resolution

3. **Moderator** (moderator)
   - Content verification
   - Vendor application review
   - Product approval
   - User report handling

## 📁 Project Structure

```
app/
├── admin/
│   ├── layout.js          # Role-based sidebar layout
│   ├── page.js            # Main dashboard (role-specific views)
│   ├── vendors/
│   │   ├── page.js        # Vendor list
│   │   ├── applications/
│   │   └── payouts/
│   ├── products/
│   │   ├── verify/        # Product verification queue
│   │   └── categories/
│   ├── orders/
│   │   ├── verify/        # Order verification
│   │   └── disputes/
│   ├── agents/            # Agent management & GPS tracking
│   ├── users/             # User management
│   ├── reports/           # User reports
│   ├── finances/          # Financial overview (superadmin)
│   └── settings/          # Platform settings
├── context/
│   └── AuthContext.js     # Authentication & role checks
└── styles/
    ├── admin-layout.css   # Layout & sidebar styles
    └── admin.css          # Dashboard component styles

supabase-schema.sql         # Complete database schema
```

## 💾 Database Schema

### Core Tables

1. **profiles** - User profiles with role assignment
2. **role_permissions** - Granular permission matrix
3. **vendors** - Vendor accounts and verification
4. **vendor_applications** - Pending vendor applications
5. **agents** - Delivery/verification agents
6. **agent_tasks** - Agent task logs
7. **categories** - Product categories
8. **products** - Product catalog with verification
9. **orders** - Order management
10. **disputes** - Dispute resolution
11. **user_reports** - Content moderation reports
12. **transactions** - Platform transactions
13. **vendor_payouts** - Vendor payment records
14. **audit_logs** - Immutable audit trail
15. **platform_settings** - System configuration
16. **notifications** - User notifications

### Security Features

- **Row Level Security (RLS)** enabled on all tables
- **Role-based policies** restrict data access
- **Audit logging** via triggers
- **Immutable audit trail** for compliance

## 🎨 UI Features

### Dashboard Components

**Superadmin Dashboard:**
- Revenue overview with charts
- Platform-wide statistics
- Pending payout alerts
- System health monitoring
- Recent transactions table

**Admin Dashboard:**
- Operational metrics
- Vendor application queue
- Active disputes
- Agent fleet status
- Quick action buttons

**Moderator Dashboard:**
- Verification queue (tabbed view)
- Product/vendor approval interface
- User report inbox
- Daily progress stats

### Layout Features

- **Responsive sidebar** with role-based menu
- **Collapsible navigation** for mobile
- **Role badge** display
- **Real-time notifications** (bell icon)
- **User profile** footer with logout

## 🚀 Setup Instructions

### 1. Database Setup

```sql
-- 1. Go to Supabase Dashboard > SQL Editor
-- 2. Copy entire contents of supabase-schema.sql
-- 3. Paste and run to create all tables, policies, and triggers
```

### 2. Environment Variables

Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

###3. Assign Admin Roles

```sql
-- Update a user's role in Supabase
UPDATE profiles 
SET role = 'super_admin'  -- or 'admin' or 'moderator'
WHERE email = 'your-email@example.com';
```

### 4. Enable Email Confirmation (Optional)

Go to Supabase Dashboard → Authentication → Providers → Email:
- Enable "Confirm email"
- Customize email templates

### 5. Build and Run

```bash
# Install dependencies
npm install

# Development
npm run dev

# Production build
npm run build

# Export static site
npm run export
```

## 🔐 Permission System

### Module-Based Permissions

Each role has specific permissions per module:

| Module   | Superadmin | Admin | Moderator |
|----------|-----------|-------|-----------|
| Users    | Full      | View/Edit | - |
| Vendors  | Full      | Full  | View/Verify |
| Products | Full      | Full  | View/Verify |
| Orders   | Full      | Full  | View/Verify |
| Agents   | Full      | Full  | - |
| Finances | Full      | View  | - |
| Settings | Full      | Limited | - |
| Reports  | Full      | Full  | View/Review |

### Permission Flags

- `can_view` - Read access
- `can_create` - Create new records
- `can_edit` - Modify existing records
- `can_delete` - Delete records
- `can_approve` - Approve/reject submissions
- `can_verify` - Verify content/users

## 📊 Key Features

### Vendor Management
- Application review workflow
- Document verification
- Commission rate management
- Vendor analytics
- Suspend/feature vendors

### Agent Management
- Register delivery/verification agents
- Zone assignment
- Live GPS tracking (TODO: Map integration)
- Task history logs
- Performance metrics

### Product Moderation
- Verification queue
- Bulk approve/reject
- Category management
- Featured product control

### Order Management
- Unified order hub
- High-value order verification
- Status tracking
- Agent assignment
- Delivery tracking

### Dispute Resolution
- Dispute intake system
- Evidence collection
- Admin escalation
- Refund processing

### Financial Management
- Platform revenue dashboard
- Commission tracking
- Payout management
- Transaction history

## 🔄 Next Steps & TODO

### Phase 2 - Core Features
- [ ] Implement actual data fetching from Supabase
- [ ] Add search & filter functionality
- [ ] Create data tables with sorting/pagination
- [ ] Build form validation (Zod + React Hook Form)
- [ ] Implement bulk actions

### Phase 3 - Advanced Features
- [ ] Integrate maps (Leaflet/Google Maps) for agent tracking
- [ ] Add real-time notifications (Supabase Realtime)
- [ ] Implement data charts (Recharts)
- [ ] Build export functionality (CSV/PDF)
- [ ] Add dark/light mode toggle

### Phase 4 - Specific Pages
- [ ] Vendor application detail view
- [ ] Product verification interface
- [ ] Order detail page
- [ ] Dispute resolution workspace
- [ ] Agent fleet map view
- [ ] Financial reports
- [ ] Role permission editor
- [ ] System audit logs viewer

### Phase 5 - Polish
- [ ] Loading states & skeletons
- [ ] Error handling & toasts
- [ ] Confirmation dialogs
- [ ] Form wizards for complex flows
- [ ] Mobile responsiveness improvements

## 🛡️ Security Best Practices

1. **Never expose service role key** in client code
2. **Use RLS policies** for all data access
3. **Log critical actions** in audit_logs table
4. **Validate all inputs** server-side
5. **Rate limit API calls**
6. **Implement CSRF protection**
7. **Use parameterized queries**
8. **Sanitize user inputs**

## 📝 Notes

- All admin routes are protected via `AdminLayout`
- User role determines visible menu items
- Each dashboard view is role-specific
- Build succeeds with static export
- Schema includes comprehensive audit logging
- Permissions system is extensible

## 🆘 Troubleshooting

**Issue**: Can't access admin panel
- **Solution**: Check profile.role is set to admin/super_admin/moderator

**Issue**: Missing menu items
- **Solution**: Verify role_permissions table has correct entries

**Issue**: 500 error on signup
- **Solution**: Apply supabase-schema.sql in Supabase SQL Editor

**Issue**: Infinite recursion in RLS
- **Solution**: Schema already updated to avoid this

## 📞 Support

For questions or issues:
1. Check the implementation guide
2. Review supabase-schema.sql comments
3. Verify role permissions in database
4. Check browser console for errors

---

**Built with ❤️ for Townssy E-commerce Platform**
