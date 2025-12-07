# **Storage Buckets Setup Guide**

## **Overview**
This guide explains how to set up Supabase Storage buckets for the Townssy E-commerce platform.

---

## **Files Included**

1. **`supabase_storage_buckets_create.sql`** - Creates all storage buckets
2. **`supabase_storage_policies.sql`** - Sets up Row Level Security (RLS) policies
3. **`supabase_storage_buckets.sql`** - Complete file (buckets + policies combined)

---

## **Installation Steps**

### **Option 1: Run Separate Files (Recommended)**

#### **Step 1: Create Buckets**
1. Go to Supabase Dashboard → SQL Editor
2. Copy contents of `supabase_storage_buckets_create.sql`
3. Paste and run
4. Verify: Dashboard → Storage → You should see 7 buckets

#### **Step 2: Apply RLS Policies**
1. Go to Supabase Dashboard → SQL Editor  
2. Copy contents of `supabase_storage_policies.sql`
3. Paste and run
4. Verify: Check each bucket has policies applied

### **Option 2: Run Complete File**
1. Go to Supabase Dashboard → SQL Editor
2. Copy contents of `supabase_storage_buckets.sql`
3. Paste and run (creates buckets AND applies policies)

---

## **Storage Buckets Summary**

| Bucket Name | Public | Size Limit | Allowed Types | Purpose |
|-------------|--------|------------|---------------|---------|
| **product-images** | ✅ Yes | 10MB | Images + Videos | Product photos, videos, category images |
| **vendor-documents** | ❌ No | 5MB | Images, PDF | Vendor application docs |
| **agent-documents** | ❌ No | 5MB | Images, PDF | Agent application docs |
| **user-avatars** | ✅ Yes | 2MB | Images | User profile pictures |
| **vendor-media** | ✅ Yes | 5MB | Images | Vendor logos, banners |
| **order-attachments** | ❌ No | 5MB | Images, PDF | Delivery proofs, disputes |
| **review-images** | ✅ Yes | 3MB | Images | Product/vendor reviews |

---

## **Access Control (RLS Policies)**

### **1. product-images** (Public)
- ✅ **Anyone** can view
- ✅ **Admins & Verified Vendors** can upload/edit/delete

### **2. vendor-documents** (Private)
- ✅ **Users** can upload their own docs (folder: `{user_id}/`)
- ✅ **Users** can view their own docs
- ✅ **Admins** can view/manage all docs

### **3. agent-documents** (Private)
- ✅ **Users** can upload their own docs (folder: `{user_id}/`)
- ✅ **Users** can view their own docs
- ✅ **Admins** can view/manage all docs

### **4. user-avatars** (Public)
- ✅ **Anyone** can view
- ✅ **Users** can upload/update/delete their own avatar (folder: `{user_id}/`)

### **5. vendor-media** (Public)
- ✅ **Anyone** can view
- ✅ **Vendors** can upload their own media (folder: `{vendor_id}/`)
- ✅ **Admins** can manage all media

### **6. order-attachments** (Private)
- ✅ **Order participants** (buyer, vendor, agent) can view/upload
- ✅ **Admins** can view/manage all
- Organized by order: `{order_id}/`

### **7. review-images** (Public)
- ✅ **Anyone** can view
- ✅ **Authenticated users** can upload
- ✅ **Users** can delete their own images
- ✅ **Admins** can delete any image

---

## **Folder Structure**

### **Recommended Naming Conventions:**

```
product-images/
├── products/{product_id}/
│   ├── main_image.jpg
│   ├── image_1.jpg
│   └── image_2.jpg
└── categories/{category_id}/
    └── category_icon.png

vendor-documents/
└── {user_id}/
    ├── business_license_{timestamp}.pdf
    ├── tax_certificate_{timestamp}.pdf
    └── id_proof_{timestamp}.jpg

agent-documents/
└── {user_id}/
    ├── identity_proof_{timestamp}.jpg
    ├── driving_license_{timestamp}.jpg
    └── vehicle_registration_{timestamp}.pdf

user-avatars/
└── {user_id}/
    └── avatar.jpg

vendor-media/
└── {vendor_id}/
    ├── logo.png
    ├── banner.jpg
    └── factory/
        ├── factory_1.jpg
        └── factory_2.jpg

order-attachments/
└── {order_id}/
    ├── proof_of_delivery_{timestamp}.jpg
    ├── signature_{timestamp}.png
    └── dispute_evidence_{timestamp}.jpg

review-images/
└── {user_id}/{review_id}/
    ├── review_photo_1.jpg
    └── review_photo_2.jpg
```

---

## **Usage Examples**

### **JavaScript/TypeScript Examples:**

#### **Upload Product Image (Vendor)**
```javascript
const uploadProductImage = async (productId, file) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `products/${productId}/${Date.now()}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(fileName, file);
  
  if (error) throw error;
  
  // Get public URL
  const { data: urlData } = supabase.storage
    .from('product-images')
    .getPublicUrl(fileName);
  
  return urlData.publicUrl;
};
```

#### **Upload Vendor Document (Application)**
```javascript
const uploadVendorDocument = async (userId, docType, file) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/${docType}_${Date.now()}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from('vendor-documents')
    .upload(fileName, file);
  
  if (error) throw error;
  
  // Get public URL (will only work for authorized users)
  const { data: urlData } = supabase.storage
    .from('vendor-documents')
    .getPublicUrl(fileName);
  
  return urlData.publicUrl;
};
```

#### **Upload User Avatar**
```javascript
const uploadAvatar = async (userId, file) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/avatar.${fileExt}`;
  
  // Delete old avatar first (optional)
  await supabase.storage
    .from('user-avatars')
    .remove([fileName]);
  
  // Upload new avatar
  const { data, error } = await supabase.storage
    .from('user-avatars')
    .upload(fileName, file, {
      upsert: true // Overwrite if exists
    });
  
  if (error) throw error;
  
  const { data: urlData } = supabase.storage
    .from('user-avatars')
    .getPublicUrl(fileName);
  
  return urlData.publicUrl;
};
```

#### **Upload Proof of Delivery (Agent)**
```javascript
const uploadDeliveryProof = async (orderId, file) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${orderId}/proof_of_delivery_${Date.now()}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from('order-attachments')
    .upload(fileName, file);
  
  if (error) throw error;
  
  const { data: urlData } = supabase.storage
    .from('order-attachments')
    .getPublicUrl(fileName);
  
  return urlData.publicUrl;
};
```

---

## **Troubleshooting**

### **Error: "new row violates row-level security policy"**
**Solution:** 
- Check if user is authenticated: `const { data: { user } } = await supabase.auth.getUser()`
- Verify user has correct permissions
- Check folder structure matches policy requirements

### **Error: "File size exceeds limit"**
**Solution:**
- Check bucket size limits (see table above)
- Compress images before upload
- For large files, consider multiple buckets or increase limit

### **Error: "Invalid mime type"**
**Solution:**
- Check `allowed_mime_types` for the bucket
- Only upload supported file types
- Convert files if needed

### **Images not loading (404)**
**Solution:**
- For public buckets: Check URL is correct
- For private buckets: Ensure RLS policies allow access
- Verify file was uploaded successfully

---

## **Maintenance**

### **Clear Old Files**
Run periodically to clean up unused files:

```sql
-- Find files older than 90 days in vendor-documents
SELECT name, created_at 
FROM storage.objects 
WHERE bucket_id = 'vendor-documents' 
AND created_at < NOW() - INTERVAL '90 days';

-- Delete them (be careful!)
-- DELETE FROM storage.objects 
-- WHERE bucket_id = 'vendor-documents' 
-- AND created_at < NOW() - INTERVAL '90 days';
```

### **Monitor Storage Usage**
```sql
-- Check storage usage per bucket
SELECT 
  bucket_id,
  COUNT(*) as file_count,
  SUM(metadata->>'size')::bigint / 1024 / 1024 as size_mb
FROM storage.objects
GROUP BY bucket_id
ORDER BY size_mb DESC;
```

---

## **Security Best Practices**

1. ✅ **Always validate file types** on client AND server
2. ✅ **Scan uploaded files** for malware (use Supabase Edge Functions)
3. ✅ **Implement rate limiting** to prevent abuse
4. ✅ **Use signed URLs** for private bucket access when needed
5. ✅ **Regularly audit** RLS policies
6. ✅ **Monitor storage usage** and set alerts

---

## **Next Steps**

1. Run bucket creation script
2. Apply RLS policies
3. Test upload/download with your application
4. Monitor for any policy issues
5. Adjust size limits or MIME types as needed

---

**Last Updated**: December 7, 2024  
**Version**: 1.0
