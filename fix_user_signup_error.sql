-- ==========================================================
-- FIX USER REGISTRATION ERROR (500)
-- ==========================================================
-- This script fixes the "Database error saving new user" which is typically caused by:
-- 1. Orphaned profiles (profiles existing without a corresponding auth user) causing email conflicts.
-- 2. Trigger function definitions that don't match the table schema or are failing.

-- Step 1: Clean up orphaned profiles
-- This removes profiles that don't have a linked user in auth.users
-- NOTE: If this fails due to foreign key constraints (e.g. orphan profile has orders), 
-- you may need to manually clean up dependent data or delete the specific orphan profile.
DO $$
BEGIN
    DELETE FROM public.profiles 
    WHERE id NOT IN (SELECT id FROM auth.users);
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Could not delete some orphan profiles due to foreign key constraints: %', SQLERRM;
END $$;

-- Step 2: Update the User Creation Trigger Function
-- This ensures the function is robust and handles all fields correctly
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    email, 
    full_name, 
    username, 
    role, 
    phone,
    avatar_url,
    created_at,
    updated_at
  )
  VALUES (
    new.id,
    new.email,
    -- Handle potentially missing metadata fields safely with NULLIF and COALESCE
    NULLIF(COALESCE(new.raw_user_meta_data->>'full_name', ''), ''),
    NULLIF(COALESCE(new.raw_user_meta_data->>'username', ''), ''),
    COALESCE(new.raw_user_meta_data->>'role', 'user'), -- Default role is 'user'
    COALESCE(new.phone, new.raw_user_meta_data->>'phone'),
    new.raw_user_meta_data->>'avatar_url',
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, public.profiles.full_name),
    role = COALESCE(EXCLUDED.role, public.profiles.role),
    updated_at = NOW();

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 3: Re-bind the Trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Step 4: Ensure Permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON public.profiles TO anon, authenticated, service_role;
GRANT ALL ON public.profiles TO postgres;
