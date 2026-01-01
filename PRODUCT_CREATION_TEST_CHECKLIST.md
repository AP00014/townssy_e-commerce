# Product Creation Test Checklist

## Overview
This document helps you test the product creation flow to ensure all fields work correctly with the backend, storage, and display.

## Pre-Testing Setup

### 1. Database Setup
- [ ] Run `add_supplier_type_field.sql` to add supplier_type column
- [ ] Ensure `product-images` storage bucket exists in Supabase
- [ ] Verify storage bucket has public access enabled
- [ ] Check that categories exist in the database
- [ ] Verify home sections exist in the database

### 2. Storage Configuration
- [ ] Verify `product-images` bucket exists
- [ ] Check bucket policies allow uploads
- [ ] Test image upload permissions

## Field Testing

### Required Fields (Must Pass Validation)

#### 1. Product Name
- [ ] Empty field shows error
- [ ] Whitespace-only shows error
- [ ] Valid name accepts input
- [ ] Error clears when typing

#### 2. Categories
- [ ] No category selected shows error
- [ ] At least one category required
- [ ] Multiple categories can be selected
- [ ] Primary category can be set
- [ ] Categories save to `product_categories` junction table

#### 3. Supplier Type
- [ ] No selection shows error
- [ ] "Supplier" option works
- [ ] "Manufacturer" option works
- [ ] Error clears when selected

#### 4. Price
- [ ] Empty price shows error
- [ ] Zero or negative shows error
- [ ] Valid price accepts input
- [ ] Decimal values work (e.g., 19.99)

#### 5. Images
- [ ] No images shows error
- [ ] At least one image required
- [ ] Multiple images can be uploaded
- [ ] Image previews display correctly
- [ ] Images can be removed before upload

### Optional Fields (Should Work Without Errors)

#### 6. Description
- [ ] Can be left empty
- [ ] Long text accepted
- [ ] Special characters work

#### 7. Location & Region
- [ ] Can be left empty (if not required)
- [ ] Text input works
- [ ] Special characters accepted

#### 8. SKU
- [ ] Can be left empty
- [ ] Unique SKU validation (if implemented)
- [ ] Alphanumeric characters work

#### 9. Compare Price
- [ ] Can be left empty
- [ ] Must be greater than regular price
- [ ] Decimal values work

#### 10. Stock Quantity
- [ ] Defaults to 0
- [ ] Accepts integer values
- [ ] Negative values handled

#### 11. Delivery Options
- [ ] Delivery checkbox works
- [ ] Can add multiple delivery options
- [ ] Can remove delivery options
- [ ] Options save as JSONB array

#### 12. Supplier WhatsApp
- [ ] Can be left empty
- [ ] URL format validation (if implemented)
- [ ] Saves correctly

#### 13. Specifications
- [ ] Can add multiple spec fields
- [ ] Can remove spec fields
- [ ] Saves as JSONB object
- [ ] Key-value pairs work correctly

#### 14. Homepage Sections
- [ ] Can select multiple sections
- [ ] Can deselect sections
- [ ] Saves to `product_section_placements` table

#### 15. Featured & Active
- [ ] Featured checkbox works
- [ ] Active checkbox works
- [ ] Defaults are correct (featured: false, active: true)

## Image Upload Testing

### Image Validation
- [ ] JPEG files accepted
- [ ] PNG files accepted
- [ ] WebP files accepted
- [ ] GIF files accepted
- [ ] Invalid file types rejected (e.g., PDF, DOC)
- [ ] Files over 5MB rejected
- [ ] Multiple images upload successfully
- [ ] Upload progress shows correctly
- [ ] Error messages display for failed uploads

### Storage Testing
- [ ] Images upload to `product-images` bucket
- [ ] Images stored in `products/` folder
- [ ] Public URLs generated correctly
- [ ] Images accessible via public URL
- [ ] Image URLs saved to database

## Backend Integration Testing

### Database Operations
- [ ] Product inserts into `products` table
- [ ] All fields save correctly
- [ ] `category_id` set to primary category
- [ ] Product-category relationships created in `product_categories`
- [ ] Product-section relationships created in `product_section_placements`
- [ ] `verified_by` set to current user
- [ ] `verification_status` defaults to 'approved'
- [ ] Timestamps (`created_at`, `updated_at`) set correctly

### Data Validation
- [ ] Price saved as DECIMAL
- [ ] Compare price can be NULL
- [ ] Stock quantity saved as INTEGER
- [ ] Images saved as JSONB array
- [ ] Specifications saved as JSONB object
- [ ] Delivery options saved as JSONB array
- [ ] Supplier type saved correctly ('supplier' or 'manufacturer')

## Product Display Testing

### Product List Page
- [ ] Created product appears in admin products list
- [ ] Product name displays correctly
- [ ] Price displays correctly
- [ ] Category shows correctly
- [ ] Images display in product list
- [ ] Status badges show correctly

### Product Card
- [ ] Product card displays on home page (if in section)
- [ ] Image displays correctly
- [ ] Title displays correctly
- [ ] Price displays correctly
- [ ] Compare price shows as strikethrough
- [ ] Badge shows if featured
- [ ] Link to product detail works

### Product Detail Page
- [ ] Product detail page loads
- [ ] All images display in gallery
- [ ] Product information displays correctly
- [ ] Specifications display correctly
- [ ] Delivery options display correctly
- [ ] Supplier WhatsApp link works
- [ ] Similar products fetch correctly

## Error Handling Testing

### Network Errors
- [ ] Handles Supabase connection errors
- [ ] Handles storage upload failures
- [ ] Shows user-friendly error messages
- [ ] Doesn't lose form data on error

### Validation Errors
- [ ] All validation errors display
- [ ] Errors clear when fields are corrected
- [ ] Form doesn't submit with errors
- [ ] Error messages are clear and helpful

### Partial Failures
- [ ] Product created even if some images fail
- [ ] Error logged but doesn't block creation
- [ ] User notified of partial failures

## Performance Testing

- [ ] Form loads quickly
- [ ] Image previews load instantly
- [ ] Upload progress shows for large files
- [ ] Multiple images upload efficiently
- [ ] Form submission doesn't hang

## Success Flow

### Complete Success
1. [ ] Fill all required fields
2. [ ] Upload at least one image
3. [ ] Select categories and supplier type
4. [ ] Submit form
5. [ ] See progress indicator
6. [ ] Get success message
7. [ ] Redirected to products list
8. [ ] Product appears in list
9. [ ] Product displays on home page (if in section)
10. [ ] Product detail page works

## Common Issues to Check

### Storage Issues
- [ ] Bucket doesn't exist → Create bucket in Supabase
- [ ] Permission denied → Check bucket policies
- [ ] Images not public → Enable public access

### Database Issues
- [ ] Foreign key errors → Check category/section IDs exist
- [ ] Constraint violations → Check supplier_type value
- [ ] NULL errors → Check required fields

### Display Issues
- [ ] Images not showing → Check public URL generation
- [ ] Product not on home → Check section assignments
- [ ] Categories not showing → Check junction table

## Debugging Tips

1. **Check Browser Console**
   - Look for JavaScript errors
   - Check network requests
   - Verify Supabase responses

2. **Check Supabase Dashboard**
   - Verify product in `products` table
   - Check `product_categories` relationships
   - Check `product_section_placements` relationships
   - Verify images in storage bucket

3. **Check Network Tab**
   - Verify API calls succeed
   - Check response status codes
   - Review request/response payloads

4. **Test Incrementally**
   - Start with minimal product (name, price, category, supplier type, image)
   - Add fields one by one
   - Test each feature separately

## Expected Console Output

On successful creation, you should see:
```
Creating product with data: { ... }
Product created successfully: <product-id>
Categories linked successfully
Sections linked successfully
✅ Product creation complete: { productId, name, categories, sections, images }
```

On error, you should see:
```
❌ Error creating product: <error>
Full error details: { error, formData, ... }
```

