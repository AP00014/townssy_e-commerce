# Product Management Features

This document describes the product creation and listing features for Super Admin and Admin roles.

## Features Overview

### 1. Product List Page (`/admin/products`)
- **Access**: Super Admin, Admin
- **Features**:
  - View all products in a table format
  - Search products by name or SKU
  - Filter by verification status (pending, approved, rejected, flagged)
  - Filter by category
  - Statistics dashboard showing:
    - Total products
    - Pending approvals
    - Approved products
    - Rejected products
  - Quick actions:
    - View product details
    - Edit product
    - Approve/Reject pending products
    - Delete products (Super Admin only)
  - Export functionality

### 2. Create Product Page (`/admin/products/create`)
- **Access**: Super Admin, Admin
- **Features**:
  - **Basic Information**:
    - Product name (required)
    - Description
    - Category selection (required)
    - Vendor assignment (required)
    - SKU
  - **Pricing & Inventory**:
    - Price (required)
    - Compare price (for showing discounts)
    - Stock quantity
    - Verification status selection
    - Featured product toggle
    - Active/Inactive toggle
  - **Product Images**:
    - Multiple image upload
    - Image preview before upload
    - Remove images
    - Images stored in Supabase Storage
  - **Specifications**:
    - Dynamic key-value pairs
    - Add/remove specification fields
    - Examples: Color, Size, Material, etc.

### 3. Edit Product Page (`/admin/products/[id]/edit`)
- **Access**: Super Admin, Admin
- **Features**:
  - All features from Create Product page
  - View and manage existing images
  - Pre-filled form with current product data
  - Update product information
  - Delete existing images
  - Add new images

## Database Schema

### Products Table
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY,
  vendor_id UUID REFERENCES vendors(id),
  category_id UUID REFERENCES categories(id),
  name TEXT NOT NULL,
  description TEXT,
  specifications JSONB,
  images JSONB, -- Array of image URLs
  price DECIMAL(10,2) NOT NULL,
  compare_price DECIMAL(10,2),
  stock_quantity INTEGER DEFAULT 0,
  sku TEXT UNIQUE,
  verification_status TEXT DEFAULT 'pending',
  verified_by UUID REFERENCES profiles(id),
  verification_notes TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  view_count INTEGER DEFAULT 0,
  sales_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
);
```

## Permissions

### Super Admin
- ✅ View all products
- ✅ Create products
- ✅ Edit products
- ✅ Delete products
- ✅ Approve/Reject products
- ✅ Feature products
- ✅ Manage all aspects

### Admin
- ✅ View all products
- ✅ Create products
- ✅ Edit products
- ❌ Delete products (Super Admin only)
- ✅ Approve/Reject products
- ✅ Feature products

### Moderator
- ✅ View all products
- ❌ Create products
- ❌ Edit products
- ❌ Delete products
- ✅ Approve/Reject products (via verification queue)

## Setup Instructions

### 1. Run Database Migrations

Execute the following SQL files in your Supabase SQL Editor:

1. **Main Schema** (if not already done):
   ```bash
   supabase-schema.sql
   ```

2. **Product Policies**:
   ```bash
   supabase-product-policies.sql
   ```

### 2. Setup Storage Bucket

In Supabase Dashboard:

1. Go to **Storage** section
2. Create a new bucket named `product-images`
3. Make it **public**
4. Add the following policies:

**Upload Policy (INSERT)**:
- Name: "Admins can upload product images"
- Allowed operations: INSERT
- Policy definition:
  ```sql
  (bucket_id = 'product-images' AND 
   auth.role() = 'authenticated' AND
   EXISTS (
     SELECT 1 FROM profiles 
     WHERE id = auth.uid() 
     AND role IN ('super_admin', 'admin', 'vendor')
   ))
  ```

**View Policy (SELECT)**:
- Name: "Public can view product images"
- Allowed operations: SELECT
- Policy definition:
  ```sql
  bucket_id = 'product-images'
  ```

**Delete Policy (DELETE)**:
- Name: "Admins can delete product images"
- Allowed operations: DELETE
- Policy definition:
  ```sql
  (bucket_id = 'product-images' AND 
   EXISTS (
     SELECT 1 FROM profiles 
     WHERE id = auth.uid() 
     AND role IN ('super_admin', 'admin')
   ))
  ```

### 3. Environment Variables

Ensure your `.env.local` file has:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Install Dependencies (if needed)

```bash
npm install @supabase/supabase-js
npm install lucide-react
```

## Navigation

Products can be accessed from the admin sidebar:
- **Products** > **All Products** → List view
- **Products** > **Verification Queue** → Pending products
- **Products** > **Categories** → Manage categories

## File Structure

```
app/
├── admin/
│   ├── products/
│   │   ├── page.js                    # Product list
│   │   ├── create/
│   │   │   └── page.js                # Create product
│   │   └── [id]/
│   │       └── edit/
│   │           └── page.js            # Edit product
│   └── layout.js                      # Admin layout with sidebar
├── styles/
│   └── admin-products.css             # Product management styles
└── context/
    └── AuthContext.js                 # Authentication context

lib/
└── supabase.js                        # Supabase client

supabase-product-policies.sql          # Additional policies
```

## Usage Examples

### Creating a Product

1. Navigate to `/admin/products`
2. Click "Add Product" button
3. Fill in required fields:
   - Product name
   - Category
   - Vendor
   - Price
4. Upload product images (optional)
5. Add specifications (optional)
6. Set verification status (admins can directly approve)
7. Click "Create Product"

### Editing a Product

1. Navigate to `/admin/products`
2. Find the product in the list
3. Click the edit icon (pencil)
4. Modify the desired fields
5. Add/remove images
6. Update specifications
7. Click "Save Changes"

### Approving/Rejecting Products

**From Product List**:
1. Navigate to `/admin/products`
2. Filter by "Pending" status
3. Click approve (✓) or reject (✗) icon

**From Verification Queue**:
1. Navigate to `/admin/products/verify`
2. Review product details
3. Click "Approve" or "Reject"

## Features in Detail

### Search & Filters
- **Search**: Real-time search by product name or SKU
- **Status Filter**: Filter by verification status
- **Category Filter**: Filter by product category
- **Combined Filters**: All filters work together

### Image Management
- **Multiple Upload**: Upload multiple images at once
- **Preview**: See images before uploading
- **Reorder**: First image is the primary image
- **Delete**: Remove unwanted images
- **Format Support**: PNG, JPG, GIF
- **Size Limit**: 10MB per image

### Specifications
- **Dynamic Fields**: Add unlimited specification fields
- **Key-Value Pairs**: Store as JSONB in database
- **Examples**:
  - Color: Red
  - Size: Large
  - Material: Cotton
  - Weight: 500g

### Verification Workflow
1. Product created (status: pending or approved)
2. Admin/Moderator reviews
3. Approve → Product goes live
4. Reject → Product hidden, vendor notified
5. Flag → Requires additional review

## Troubleshooting

### Images Not Uploading
- Check storage bucket exists and is named `product-images`
- Verify storage policies are correctly set
- Check file size (max 10MB)
- Verify user has admin role

### Products Not Showing
- Check RLS policies are enabled
- Verify user role in profiles table
- Check product `is_active` status
- Verify categories exist and are active

### Permission Denied
- Ensure user has `super_admin` or `admin` role
- Check RLS policies in database
- Verify authentication token is valid

## Future Enhancements

- [ ] Bulk import/export products
- [ ] Product variants (size, color)
- [ ] Inventory tracking
- [ ] Product analytics
- [ ] Advanced filtering and sorting
- [ ] Product reviews management
- [ ] SEO optimization fields
- [ ] Product collections
- [ ] Scheduled publishing
- [ ] Product history/audit trail

## API Functions

### Helper Functions Available

**Get Products with Permissions**:
```sql
SELECT * FROM get_products_for_admin(
  p_user_id := auth.uid(),
  p_status := 'pending',
  p_category_id := NULL,
  p_limit := 50,
  p_offset := 0
);
```

**Get Product Statistics**:
```sql
SELECT * FROM get_product_stats(auth.uid());
```

Returns:
```json
{
  "total": 150,
  "pending": 23,
  "approved": 120,
  "rejected": 5,
  "flagged": 2,
  "low_stock": 15
}
```

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the database logs in Supabase
3. Check browser console for errors
4. Verify RLS policies are correctly configured
