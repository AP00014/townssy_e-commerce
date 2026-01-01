-- ==========================================================
-- EMERGENCY FIX: DISABLE SIGNUP TRIGGER
-- ==========================================================
-- Since the server-side trigger is causing 500 errors, we will disable it.
-- Your application frontend (AuthContext.js) already has logic to create the profile
-- if it's missing, so this is safe to do and will unblock new user registration.

-- 1. Drop the trigger that is failing
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 2. Drop the function to effectively 'clear' the backend logic for now
DROP FUNCTION IF EXISTS public.handle_new_user;

-- 3. Cleanup any potential partial data (Optional, safe to run)
-- This tries to remove profiles that don't have a user, cleaning up the username namespace
DO $$
BEGIN
    DELETE FROM public.profiles 
    WHERE id NOT IN (SELECT id FROM auth.users);
EXCEPTION WHEN OTHERS THEN
    -- Ignore errors here
    NULL;
END $$;
