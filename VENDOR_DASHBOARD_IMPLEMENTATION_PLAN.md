# **Vendor Dashboard Implementation Plan**

## **Overview**
This document outlines the complete implementation plan for the Vendor Dashboard feature,where verified vendors can manage their products, view sales, and interact with customers on the platform.

---

## **1. Key Features**

### **Vendor Dashboard (/vendor-dashboard)**
Verified vendors will have access to a dedicated dashboard with:

#### **1.1 Dashboard Overview**
- Total Products
- Total Sales (Revenue)
- Total Orders
- Active Product Count
- Pending Orders Count
- Recent Order Activity
- Sales Chart (Weekly/Monthly)
- Top Selling Products

#### **1.2 Product Management**
- **Create New Product** - Upload product with all fields
- **My Products List** - View all vendor's products
- **Edit Product** - Update product details
- **Delete Product** (soft delete/archive)
- **Product Status** - Active/Inactive toggle
- **Inventory Management** - Update stock levels

#### **1.3 Order Management**
- View All Orders
- Filter by Status (Pending, Confirmed, Shipped, Delivered, Cancelled)
- Order Details View
- **Assign Delivery Agent** - Select nearby verified agents for order delivery
- Update Order Status
- Track Delivery (view agent location and status)
- Contact Assigned Agent
- Print Invoice/Packing Slip
- Handle Delivery Issues

##### **1.3.1 Delivery Agent Assignment**
When vendor confirms an order:
- View list of available delivery agents
- Filter by:
  - Location/Zone (nearby agents)
  - Availability status (Online/Offline)
  - Rating & reviews
  - Vehicle type
  - Distance from vendor location
- Agent information displayed:
  - Name & photo
  - Current status (🟢 Online / 🔴 Offline)
  - Rating (⭐ 4.8 / 5.0)
  - Completed deliveries count
  - Vehicle type (Motorbike, Car, Van)
  - Distance from pickup location
- Assign agent with one click
- Agent receives notification
- Track agent acceptance/rejection
- Reassign if agent rejects or unavailable

#### **1.4 Customer Interaction**
- Messages/Inquiries from potential buyers
- Reviews & Ratings on products
- Respond to customer questions
- View customer contact requests

#### **1.5 Sales Analytics**
- Revenue Chart (Daily/Weekly/Monthly)
- Best Selling Products
- Sales by Category
- Customer Demographics
- Export Sales Reports

#### **1.6 Vendor Profile Settings**
- Update Business Information
- Logo & Banner Upload
- Business Hours
- Shipping Methods
- Payment Details
- Social Media Links

---

## **2. Product Fields** (Based on Schema & Pages Scan)

### **2.1 Basic Information**
- `name` (Product Title) *
- `short_title` (Shortened title for cards)
- `subtitle` (Additional subtitle)
- `description` (Full description) *
- `short_description` (Summary)

### **2.2 Media**
- `images` (Array of image URLs) - Legacy
- `media` (Array of `{type, url}` for images/videos) *
- `video_url` (Primary product video)
- `gallery_images` (Additional images)

### **2.3 Pricing**
- `price` (Current price) *
- `compare_price` (Original price for showing discount)
- `cost_price` (Vendor's cost - internal)
- `bulk_pricing` (JSONB for quantity-based pricing)

### **2.4 Inventory**
- `stock_quantity` (Available stock) *
- `min_order_quantity` (Minimum order qty, default 1)
- `max_order_quantity` (Maximum per order)
- `low_stock_threshold` (Alert threshold)
- `sku` (Stock Keeping Unit)
- `barcode`

### **2.5 Product Dimensions**
- `weight` (in kg)
- `dimensions` (JSONB: `{length, width, height}` in cm)

### **2.6 Categories & Tags**
- `category_id` (UUID reference) *
- `tags` (Array of strings)
- `search_keywords` (Additional search terms)

### **2.7 Labels & Badges**
- `labels` (JSONB array: `[{text, type, color}, ...]`)
- `badges` (Array: `['Free Ship', 'Limited', 'Verified']`)

### **2.8 Delivery & Shipping**
- `free_shipping` (Boolean)
- `estimated_delivery_days` (Number of days)
- `estimated_delivery_text` (e.g., "Dec 15-20")
- `shipping_options` (JSONB array: ['Standard', 'Express'])
- `shipping_methods` (JSONB for detailed shipping)
- `return_policy_days` (Default 30 days)
- `return_policy_text`

### **2.9 Features**
- `features` (JSONB array: `[{icon`, label}, ...]`)
  - Examples: "Free Returns", "Fast Shipping", "Warranty"

### **2.10 Variants (Sizes/Colors)**
- `has_sizes` (Boolean)
- `available_sizes` (Array: `['S', 'M', 'L', 'XL']`)
- Related `product_variants` table with:
  - `name`, `sku`, `price`, `stock_quantity`, `attributes`, `image_url`

### **2.11 Specifications**
- `specifications` (JSONB key-value pairs)
  - Examples: `{color: "Red", material: "Cotton", battery: "5000mAh"}`

### **2.12 Display & Status**
- `display_variant` (`default`, `grid`, `top-deal`, `top-ranking`)
- `featured_text` (Text for featured products)
- `verification_status` (`pending`, `approved`, `rejected`, `flagged`)
- `is_featured` (Boolean)
- `is_active` (Boolean)
- `is_digital` (Boolean - for digital products)
- `requires_shipping` (Boolean, default true)

### **2.13 Classification**
- `shipping_class`
- `tax_class`

### **2.14 Metrics (Auto-calculated)**
- `view_count`
- `sales_count`
- `favorite_count`
- `rating` (Average rating)
- `review_count`
- `average_rating`
- `verified_reviews_count`

### **2.15 Vendor Contact**
- `allow_supplier_contact` (Boolean)
- `whatsapp_number`

### **2.16 SEO**
- `meta_title`
- `meta_description`
- `meta_keywords` (Array)

### **2.17 Publishing**
- `published_at` (Timestamp)

### **2.18 Other**
- `verified_by` (Admin who verified)
- `verification_notes`
- `verified_at`
- `vendor_id` (UUID - auto-filled from vendor profile)
- `metadata` (JSONB for additional data)
- `created_at`, `updated_at`

---

## **3. Database Schema Updates**

No major schema changes needed - the current `products` table already has all necessary fields.

### **3.1 RLS Policies for Vendors**

```sql
-- Vendors can view their own products
CREATE POLICY "Vendors can view own products" ON products
  FOR SELECT USING (
    vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid())
  );

-- Vendors can create products
CREATE POLICY "Vendors can create products" ON products
  FOR INSERT WITH CHECK (
    vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid() AND verification_status = 'verified')
  );

-- Vendors can update their own products
CREATE POLICY "Vendors can update own products" ON products
  FOR UPDATE USING (
    vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid())
  );

-- Vendors can delete their own products (soft delete recommended)
CREATE POLICY "Vendors can delete own products" ON products
  FOR DELETE USING (
    vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid())
  );
```

---

## **4. Routing Structure**

```
/vendor-dashboard (Main Dashboard)
├── /vendor-dashboard/products (Products List)
│   ├── /vendor-dashboard/products/create (Create New Product)
│   └── /vendor-dashboard/products/[id]/edit (Edit Product)
├── /vendor-dashboard/orders (Orders List)
│   └── /vendor-dashboard/orders/[id] (Order Details)
├── /vendor-dashboard/analytics (Sales Analytics)
├── /vendor-dashboard/customers (Customer Messages/Inquiries)
├── /vendor-dashboard/reviews (Product Reviews)
└── /vendor-dashboard/settings (Vendor Profile Settings)
```

---

## **5. Admin Panel Updates**

### **5.1 Product Verification Workflow**
- Admin/Moderators can approve/reject vendor products
- Existing `/admin/products/verify` page already handles this

### **5.2 Vendor Management Enhancement**
- View vendor products count
- Monitor vendor sales performance
- Suspend/Activate vendor accounts
- Already mostly implemented in `/admin/vendors`

---

## **6. Access Control**

### **6.1 Vendor Dashboard Access**
- Only **verified vendors** (`verification_status = 'verified'`)
- Redirect non-vendors to vendor application page
- Check in middleware or page-level auth

### **6.2 Admin Access**
- Super Admin, Admin, Moderator can:
  - View all products (including pending)
  - Approve/Reject products
  - Edit any product
  - Manage vendors

---

## **7. UI Components Needed**

1. **VendorDashboardLayout** - Sidebar navigation for vendor pages
2. **ProductForm** - Reusable form for create/edit product
3. **ProductsList** - Table/grid of vendor's products
4. **OrdersList** - Table of vendor's orders
5. **SalesChart** - Visual analytics
6. **Stats Cards** - Dashboard overview cards
7. **CustomerMessagesList** - Inbox for customer inquiries

---

## **8. Implementation Phases**

### **Phase 1: Core Dashboard (Priority)**
- [x] Database schema review
- [ ] Vendor dashboard main page with overview stats
- [ ] Products list (vendor's products only)
- [ ] Create New Product form
- [ ] Edit Product form
- [ ] Product status toggle (Active/Inactive)

### **Phase 2: Order Management**
- [ ] Vendor orders list
- [ ] Order details view
- [ ] Update order status
- [ ] Print invoice

### **Phase 3: Customer Interaction**
- [ ] Customer messages/inquiries
- [ ] Respond to customer questions
- [ ] View product reviews

### **Phase 4: Analytics & Reports**
- [ ] Sales analytics dashboard
- [ ] Revenue charts
- [ ] Export reports

### **Phase 5: Profile Settings**
- [ ] Update vendor profile
- [ ] Upload logo/banner
- [ ] Configure shipping methods
- [ ] Update business hours

---

## **9. Next Steps**

1. Create vendor dashboard layout component
2. Build main dashboard overview page
3. Implement product creation form
4. Add product listing page for vendors
5. Test with verified vendor account
6. Update admin panel to integrate with vendor products

---

## **10. Notes**

- **Security**: Ensure RLS policies prevent vendors from accessing other vendors' data
- **File uploads**: Use `product-images` bucket (already configured)
- **Notifications**: Notify vendors when product is approved/rejected
- **Email alerts**: Send email when new order is received
- **Mobile responsive**: Ensure vendor dashboard works on mobile devices
