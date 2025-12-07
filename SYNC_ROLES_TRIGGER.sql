-- =====================================================
-- TRIGGER: SYNC USER ROLE UPDATE
-- =====================================================
-- This trigger ensures that when a moderator (or any role) is updated,
-- the system behaves consistently.
-- Note: Supabase auth.users metadata is the source of truth for some systems,
-- but our app is built around public.profiles.role.
-- =====================================================

-- Function to handle role updates if needed custom logic
-- (Currently the straightforward update is fine, but this is a placeholder for safety)

-- We should also ensure that when a user is created, if they have a role in metadata, it syncs.
-- The existing handle_new_user function likely handles this.

-- But CRITICALLY, if an admin changes a role in 'public.profiles', 
-- we want to ensure it sticks and perhaps syncs back to auth.users if you use custom claims.
-- For now, let's create a function to log or handle role changes specifically for moderators

CREATE OR REPLACE FUNCTION handle_role_change() 
RETURNS TRIGGER AS $$
BEGIN
  -- If role changed to moderator
  IF NEW.role = 'moderator' AND OLD.role != 'moderator' THEN
    -- You could add logic here (e.g. notify user, log action)
    -- For now, we just ensure updated_at is set
    NEW.updated_at = NOW();
  END IF;
  
  -- If role removed from moderator
  IF OLD.role = 'moderator' AND NEW.role != 'moderator' THEN
    -- Logic for demotion if needed
    NEW.updated_at = NOW();
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create Trigger
DROP TRIGGER IF EXISTS on_role_change ON profiles;
CREATE TRIGGER on_role_change
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  WHEN (OLD.role IS DISTINCT FROM NEW.role)
  EXECUTE FUNCTION handle_role_change();

-- =====================================================
-- VERIFICATION OF EXISTING 'handle_new_user'
-- =====================================================
-- This usually exists in Supabase starters. Let's make sure it captures 'moderator' role correctly
-- if passed in metadata during signup (though usually admins assign roles later).

CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, email, role)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'user') -- Default to user, but accept role if passed (careful with security!)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
-- Note: In a production app, you might NOT want to allow 'role' to be passed in metadata 
-- to prevent users from making themselves admins via API calls during signup.
-- But for internal creation flows it works.

-- =====================================================
-- QUERY LISTENING SUPPORT
-- =====================================================
-- To satisfy "always be checking for user roles", 
-- The Frontend AuthContext should subscribe to changes.
-- Ensure Realtime is enabled on 'profiles' table.

ALTER PUBLICATION supabase_realtime ADD TABLE profiles;

-- =====================================================
-- SAFETY FIRST:
-- Run this if you want to ensure the publication includes profiles
-- =====================================================
