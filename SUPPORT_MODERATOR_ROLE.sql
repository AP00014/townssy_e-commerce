-- =====================================================
-- MODERATOR ROLE SUPPORT
-- =====================================================
-- This script ensures the database supports the 'moderator' role
-- and has the correct permissions.
-- =====================================================

-- 1. Verify 'moderator' is in the allowed roles check constraint
-- (This is usually handled by the initial migration, but good to verify)
-- If you need to update the check constraint:
/*
ALTER TABLE profiles 
DROP CONSTRAINT IF EXISTS profiles_role_check;

ALTER TABLE profiles 
ADD CONSTRAINT profiles_role_check 
CHECK (role IN ('user', 'vendor', 'agent', 'moderator', 'admin', 'super_admin'));
*/

-- 2. Ensure Moderators can access key tables
-- We drop existing policies to ensure we don't duplicate or conflict
-- Then checks are: role IN ('super_admin', 'admin', 'moderator')

-- VENDORS ACCESS
DROP POLICY IF EXISTS "Admins can view all vendors" ON vendors;
CREATE POLICY "Admins and Moderators can view all vendors" ON vendors
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM profiles WHERE role IN ('super_admin', 'admin', 'moderator'))
  );

-- AGENTS ACCESS
DROP POLICY IF EXISTS "Admins can view all agents" ON agents;
CREATE POLICY "Admins and Moderators can view all agents" ON agents
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM profiles WHERE role IN ('super_admin', 'admin', 'moderator'))
  );

-- PRODUCTS ACCESS (Usually unrestricted read, but unrestricted write/verify is role based)
-- Assuming products has a policy for management:
DROP POLICY IF EXISTS "Admins can manage all products" ON products;
CREATE POLICY "Admins and Moderators can manage all products" ON products
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM profiles WHERE role IN ('super_admin', 'admin', 'moderator'))
  );

-- ORDERS ACCESS
DROP POLICY IF EXISTS "Admins can view all orders" ON orders;
CREATE POLICY "Admins and Moderators can view all orders" ON orders
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM profiles WHERE role IN ('super_admin', 'admin', 'moderator'))
  );

-- USERS (PROFILES) ACCESS
-- Moderators need to see users to ban/check them
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
CREATE POLICY "Admins and Moderators can view all profiles" ON profiles
  FOR SELECT USING (
    auth.uid() IN (SELECT id FROM profiles WHERE role IN ('super_admin', 'admin', 'moderator'))
  );

-- =====================================================
-- VERIFICATION QUERY
-- =====================================================
-- Run this to check if a specific user is a moderator
-- SELECT * FROM profiles WHERE role = 'moderator';
