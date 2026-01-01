-- =====================================================
-- VERIFY AND FIX PRODUCT-IMAGES BUCKET
-- This script verifies the bucket configuration and fixes any issues
-- =====================================================

-- Step 1: Check current bucket configuration
SELECT 
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types,
  created_at
FROM storage.buckets
WHERE id = 'product-images';

-- Step 2: If bucket doesn't exist or is misconfigured, create/update it
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true,  -- MUST be public for getPublicUrl() to work
  10485760,  -- 10MB file size limit
  ARRAY[
    'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
    'video/mp4', 'video/webm', 'video/ogg'
  ]
)
ON CONFLICT (id) DO UPDATE SET
  public = true,  -- Ensure it's public
  file_size_limit = 10485760,
  allowed_mime_types = ARRAY[
    'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
    'video/mp4', 'video/webm', 'video/ogg'
  ];

-- Step 3: Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public can view product images" ON storage.objects;
DROP POLICY IF EXISTS "Admins and Vendors can upload product images" ON storage.objects;
DROP POLICY IF EXISTS "Admins and Vendors can update product images" ON storage.objects;
DROP POLICY IF EXISTS "Admins and Vendors can delete product images" ON storage.objects;

-- Step 4: Create RLS policies for product-images bucket

-- Policy 1: Anyone can view (public bucket)
CREATE POLICY "Public can view product images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- Policy 2: Admins and super admins can upload
CREATE POLICY "Admins and Vendors can upload product images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'product-images' 
  AND (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role IN ('super_admin', 'admin', 'moderator')
    )
    OR auth.uid() IN (
      SELECT user_id FROM vendors WHERE verification_status = 'verified'
    )
  )
);

-- Policy 3: Admins and super admins can update
CREATE POLICY "Admins and Vendors can update product images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'product-images'
  AND (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role IN ('super_admin', 'admin', 'moderator')
    )
    OR auth.uid() IN (
      SELECT user_id FROM vendors WHERE verification_status = 'verified'
    )
  )
);

-- Policy 4: Admins and super admins can delete
CREATE POLICY "Admins and Vendors can delete product images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'product-images'
  AND (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role IN ('super_admin', 'admin', 'moderator')
    )
    OR auth.uid() IN (
      SELECT user_id FROM vendors
    )
  )
);

-- Step 5: Verify the configuration
SELECT 
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types,
  created_at
FROM storage.buckets
WHERE id = 'product-images';

-- Step 6: Check if policies were created
SELECT 
  policyname,
  cmd,
  permissive,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'objects'
AND schemaname = 'storage'
AND policyname LIKE '%product images%'
ORDER BY policyname;

-- Step 7: Test query to check if files exist (optional)
-- Uncomment to see existing files in the bucket
-- SELECT 
--   name,
--   bucket_id,
--   created_at,
--   updated_at,
--   metadata
-- FROM storage.objects
-- WHERE bucket_id = 'product-images'
-- ORDER BY created_at DESC
-- LIMIT 10;

