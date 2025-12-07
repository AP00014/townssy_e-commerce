-- Run this in your Supabase SQL Editor to update the allowed agent types

-- 1. Drop the existing check constraint
ALTER TABLE public.agents DROP CONSTRAINT IF EXISTS agents_agent_type_check;

-- 2. Add the new stricter constraint
ALTER TABLE public.agents ADD CONSTRAINT agents_agent_type_check 
  CHECK (agent_type IN ('delivery', 'sales'));

-- Note: If you have existing agents with types 'support' or 'verification', 
-- you will need to update or delete them before running the command above, 
-- otherwise it will fail.
-- Example fix for existing data:
-- UPDATE agents SET agent_type = 'sales' WHERE agent_type IN ('support', 'verification');
