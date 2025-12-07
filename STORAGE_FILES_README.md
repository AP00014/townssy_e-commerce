# **Storage Files - Quick Reference**

## **📁 Final Storage Files (Production Ready)**

### **1. `supabase_storage_complete.sql`** ⭐ **[MAIN FILE]**
**Use this file to set up ALL storage buckets and policies**

**What it contains:**
- ✅ Creates 7 storage buckets
- ✅ Applies all RLS security policies
- ✅ Verification queries included
- ✅ Production-ready, safe to re-run

**How to use:**
1. Open Supabase Dashboard → SQL Editor
2. Copy entire contents of `supabase_storage_complete.sql`
3. Paste and execute
4. Done! All 7 buckets created with security policies

---

### **2. `STORAGE_SETUP_GUIDE.md`** 📖 **[DOCUMENTATION]**
**Complete guide for using the storage buckets**

**What it contains:**
- ✅ Bucket summary table
- ✅ Access control matrix
- ✅ Folder structure recommendations
- ✅ JavaScript/TypeScript code examples
- ✅ Troubleshooting guide
- ✅ Security best practices
- ✅ Maintenance queries

**Who needs this:**
- Developers implementing file uploads
- Team members needing storage usage examples
- Anyone troubleshooting storage issues

---

## **🗑️ Deleted Files (Redundant)**

The following files were consolidated into `supabase_storage_complete.sql`:
- ❌ `supabase_storage_buckets.sql` (old version)
- ❌ `supabase_storage_buckets_create.sql` (buckets only)
- ❌ `supabase_storage_policies.sql` (policies only)
- ❌ `vendor-documents-storage.sql` (duplicate)

---

## **📊 Storage Buckets Summary**

| Bucket | Public | Size | Purpose |
|--------|--------|------|---------|
| product-images | ✅ | 10MB | Product & category images |
| vendor-documents | ❌ | 5MB | Vendor application docs |
| agent-documents | ❌ | 5MB | Agent application docs |
| user-avatars | ✅ | 2MB | Profile pictures |
| vendor-media | ✅ | 5MB | Vendor logos & banners |
| order-attachments | ❌ | 5MB | Delivery proofs |
| review-images | ✅ | 3MB | Review photos |

---

## **🚀 Quick Start**

### **Initial Setup (One Time)**
```bash
# 1. Run the complete storage setup
Open: Supabase Dashboard → SQL Editor
File: supabase_storage_complete.sql
Action: Copy & Run
```

### **Using in Code**
```javascript
// Example: Upload product image
const { data, error } = await supabase.storage
  .from('product-images')
  .upload(`products/${productId}/image.jpg`, file);

// See STORAGE_SETUP_GUIDE.md for more examples
```

---

## **✅ Benefits of This Structure**

1. **Single Source of Truth**: One SQL file for all storage setup
2. **Safe to Re-run**: Uses `ON CONFLICT` clauses
3. **Well Documented**: Complete guide with examples
4. **Production Ready**: No fragmented files to manage
5. **Easy Maintenance**: Update one file, not multiple

---

## **🔄 Updating Storage Configuration**

If you need to change bucket settings or policies:

1. Edit `supabase_storage_complete.sql`
2. Run the updated file in Supabase
3. Update `STORAGE_SETUP_GUIDE.md` if needed
4. Document changes in git commit

---

**Last Updated**: December 7, 2024  
**Version**: 2.0 (Consolidated)
