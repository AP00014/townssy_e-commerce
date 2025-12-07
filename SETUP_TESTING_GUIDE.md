# Product Management Setup & Testing Guide

## 🚀 Quick Setup (5 minutes)

### Step 1: Database Setup

1. **Open Supabase Dashboard** → SQL Editor

2. **Run Product Policies** (if not already done):
   - Copy contents from `supabase-product-policies.sql`
   - Paste into SQL Editor
   - Click "Run"

3. **Add Sample Categories** (optional, for testing):
   - Copy contents from `sample-categories-seed.sql`
   - Paste into SQL Editor
   - Click "Run"

### Step 2: Storage Setup

1. **Go to Storage** in Supabase Dashboard

2. **Create Bucket**:
   - Click "New bucket"
   - Name: `product-images`
   - Public: ✅ (checked)
   - Click "Create bucket"

3. **Add Policies**:
   
   a. **Upload Policy**:
   - Click on `product-images` bucket
   - Go to "Policies" tab
   - Click "New Policy"
   - Select "Custom"
   - Name: `Admins can upload product images`
   - Allowed operations: ✅ INSERT
   - Policy definition:
   ```sql
   (bucket_id = 'product-images' AND 
    (storage.foldername(name))[1] = 'products' AND
    (auth.role() = 'authenticated'))
   ```
   
   b. **View Policy**:
   - Click "New Policy"
   - Name: `Public can view product images`
   - Allowed operations: ✅ SELECT
   - Policy definition:
   ```sql
   bucket_id = 'product-images'
   ```
   
   c. **Delete Policy**:
   - Click "New Policy"
   - Name: `Admins can delete product images`
   - Allowed operations: ✅ DELETE
   - Policy definition:
   ```sql
   bucket_id = 'product-images'
   ```

### Step 3: Create Test Admin User

1. **Go to Authentication** in Supabase Dashboard

2. **Add User**:
   - Click "Add user"
   - Email: `admin@townssy.com` (or your test email)
   - Password: Set a password
   - Auto Confirm: ✅ (checked)
   - Click "Create user"

3. **Set Admin Role**:
   - Go to **Table Editor** → `profiles`
   - Find the user you just created
   - Edit the row
   - Set `role` to `admin` or `super_admin`
   - Click "Save"

### Step 4: Create Test Vendor (Optional)

1. **Go to Table Editor** → `vendors`

2. **Insert new vendor**:
   ```sql
   INSERT INTO vendors (
     business_name,
     business_type,
     verification_status,
     commission_rate
   ) VALUES (
     'Test Electronics Store',
     'Retailer',
     'verified',
     10.00
   );
   ```

## ✅ Testing Checklist

### 1. Access Product List
- [ ] Navigate to `/admin/products`
- [ ] Verify page loads without errors
- [ ] Check that stats cards display (0s if no products yet)
- [ ] Verify "Add Product" button is visible

### 2. Create a Product
- [ ] Click "Add Product"
- [ ] Fill in required fields:
  - Product name: "Test Product"
  - Category: Select any category
  - Vendor: Select test vendor
  - Price: 99.99
- [ ] Upload test image (any image from your computer)
- [ ] Add specification: Color → Red
- [ ] Set verification status to "Approved"
- [ ] Check "Active" checkbox
- [ ] Click "Create Product"
- [ ] Verify success message
- [ ] Verify redirect to product list

### 3. Verify Product in List
- [ ] Product appears in the list
- [ ] Image displays correctly
- [ ] Price shows as $99.99
- [ ] Status badge shows "Approved"
- [ ] All action buttons visible (view, edit, approve/reject, delete)

### 4. Edit Product
- [ ] Click edit icon on test product
- [ ] Verify form pre-fills with correct data
- [ ] Change price to 89.99
- [ ] Add another specification: Size → Large
- [ ] Click "Save Changes"
- [ ] Verify success message
- [ ] Verify changes appear in product list

### 5. Test Filters
- [ ] Use search box to search for product name
- [ ] Filter by status "Approved"
- [ ] Filter by category
- [ ] Verify filters work correctly

### 6. Test Permissions
**As Admin**:
- [ ] Can view products ✅
- [ ] Can create products ✅
- [ ] Can edit products ✅
- [ ] Cannot delete products (button should not show) ❌

**As Super Admin**:
- [ ] Can delete products ✅
- [ ] Has all admin permissions ✅

### 7. Test Image Upload
- [ ] Create new product
- [ ] Upload multiple images (2-3)
- [ ] Verify all images show in preview
- [ ] Remove one image
- [ ] Submit form
- [ ] Verify images saved correctly
- [ ] Edit product
- [ ] Verify existing images display
- [ ] Add new image
- [ ] Save
- [ ] Verify all images present

## 🐛 Troubleshooting

### Product List Not Loading
**Check**:
1. Browser console for errors
2. Supabase → Logs for database errors
3. RLS policies are enabled
4. User has admin/super_admin role

**Fix**:
```sql
-- Verify RLS policies exist
SELECT * FROM pg_policies WHERE tablename = 'products';

-- Check user role
SELECT id, email, role FROM profiles WHERE email = 'your-email@example.com';
```

### Images Not Uploading
**Check**:
1. Storage bucket `product-images` exists
2. Bucket is public
3. Upload policy allows authenticated users
4. File size < 10MB
5. Browser console for errors

**Fix**:
- Recreate storage bucket
- Verify policies (see Step 2 above)
- Try smaller image file

### Permission Denied Errors
**Check**:
1. User is authenticated
2. User has `admin` or `super_admin` role in profiles table
3. RLS policies are correct

**Fix**:
```sql
-- Update user role
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'your-email@example.com';
```

### Categories Not Showing
**Check**:
1. Categories exist in database
2. Categories are active

**Fix**:
```sql
-- Run sample categories seed
-- Copy from sample-categories-seed.sql and run in SQL Editor
```

### Vendor Dropdown Empty
**Check**:
1. Vendors exist in database
2. Vendors are verified

**Fix**:
```sql
-- Check vendors
SELECT id, business_name, verification_status FROM vendors;

-- Create test vendor if needed
INSERT INTO vendors (business_name, business_type, verification_status)
VALUES ('Test Vendor', 'Retailer', 'verified');
```

## 📱 Browser Testing

Test in multiple browsers:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

Test responsive design:
- [ ] Desktop (1920px)
- [ ] Tablet (768px)
- [ ] Mobile (375px)

## 🔍 Code Verification

Files created:
- [x] `app/admin/products/page.js`
- [x] `app/admin/products/create/page.js`
- [x] `app/admin/products/[id]/edit/page.js`
- [x] `app/styles/admin-products.css`
- [x] `supabase-product-policies.sql`
- [x] `sample-categories-seed.sql`
- [x] `PRODUCT_MANAGEMENT_README.md`
- [x] `PRODUCT_FEATURES_SUMMARY.md`

## 🎯 Expected Behavior

### Product List Page
- Shows all products in table
- Stats cards show correct counts
- Search filters products in real-time
- Status/category filters work
- Action buttons respond correctly

### Create Product Page
- All form fields functional
- Image upload works
- Form validation prevents empty submission
- Success message on save
- Redirects to product list

### Edit Product Page
- Form pre-fills with existing data
- Can modify all fields
- Can add/remove images
- Can update specifications
- Changes persist after save

## 📊 Performance Checks

- [ ] Page loads in < 2 seconds
- [ ] Images load progressively
- [ ] No console errors
- [ ] Smooth interactions
- [ ] Search is responsive

## 🎉 Success Criteria

All features working:
✅ View products list
✅ Search products
✅ Filter products
✅ Create new product
✅ Edit existing product
✅ Upload images
✅ Add specifications
✅ Approve/reject products
✅ Delete products (super admin only)
✅ Responsive design
✅ Role-based permissions

## 📞 Need Help?

1. Check browser console for errors
2. Check Supabase logs
3. Review `PRODUCT_MANAGEMENT_README.md`
4. Verify all setup steps completed
5. Check role permissions in database

## 🎊 You're Done!

If all tests pass, your product management feature is ready to use!

Next steps:
- Add more products
- Customize styling if needed
- Set up production environment
- Train team on usage
