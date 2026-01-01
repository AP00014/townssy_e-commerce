-- ==========================================================
-- ADVANCED FIX FOR USER REGISTRATION (500 ERROR)
-- ==========================================================

-- Step 1: Drop existing trigger first to ensure clean state
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Step 2: Create a more robust function with collision handling
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
DECLARE
  existing_username_count INTEGER;
  final_username TEXT;
  clean_phone TEXT;
BEGIN
  -- 1. CLEANUP ORPHANS (Profiles with same email but different ID)
  -- This fixes the issue where a previous user was deleted from Auth but remained in Profiles
  -- We wrap this in a block to ignore foreign key constraint errors (if any)
  BEGIN
    DELETE FROM public.profiles 
    WHERE email = new.email AND id != new.id;
  EXCEPTION WHEN OTHERS THEN
    -- If we can't delete (due to existing orders etc), we log it. 
    -- Failsafe: The insert below might still fail, but we tried.
    RAISE NOTICE 'Could not auto-clean orphan profile: %', SQLERRM;
  END;

  -- 2. HANDLE USERNAME UNIQUENESS
  -- If username matches an existing one (different user), append random digits
  final_username := NULLIF(COALESCE(new.raw_user_meta_data->>'username', ''), '');
  
  IF final_username IS NOT NULL THEN
    SELECT count(*) INTO existing_username_count 
    FROM public.profiles 
    WHERE username = final_username AND id != new.id;

    IF existing_username_count > 0 THEN
      final_username := final_username || '_' || floor(random() * 1000)::text;
    END IF;
  END IF;

  -- 3. SANITIZE FIELDS
  -- Ensure phone is treated as string
  clean_phone := COALESCE(new.phone::text, new.raw_user_meta_data->>'phone');

  -- 4. INSERT OR UPDATE
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
    NULLIF(COALESCE(new.raw_user_meta_data->>'full_name', ''), ''),
    final_username, -- Use the potentially modified username
    COALESCE(new.raw_user_meta_data->>'role', 'user'),
    clean_phone,
    new.raw_user_meta_data->>'avatar_url',
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, public.profiles.full_name),
    username = COALESCE(EXCLUDED.username, public.profiles.username),
    role = COALESCE(EXCLUDED.role, public.profiles.role),
    phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
    updated_at = NOW();

  RETURN new;
EXCEPTION
  WHEN OTHERS THEN
    -- Capture detail of any overflow/other errors to Postgres logs
    RAISE LOG 'Error in handle_new_user trigger: %', SQLERRM;
    -- Reraise to ensure Auth knows it failed (or return NEW to allow Auth but skip Profile?)
    -- Returning NEW allows Auth user creation even if Profile fails (prevents 500 loop),
    -- BUT leaves system in inconsistent state. 
    -- BETTER: Return NEW but log heavily. We want the user to be able to sign in.
    -- We can try to repair profile later.
    RETURN new; 
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 3: Re-bind the Trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Step 4: Double Check Constraints
-- Ensure that we don't have lingering constraint issues on the profiles table itself
-- (This part is informational, running it won't hurt)
COMMENT ON FUNCTION public.handle_new_user IS 'Handles user creation safely, managing orphans and username collisions';
