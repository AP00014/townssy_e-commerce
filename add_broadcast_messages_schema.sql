-- =====================================================
-- COMPLETE MESSAGING SYSTEM SCHEMA
-- This script creates ALL messaging functionality including:
-- - Conversations and messages tables
-- - Broadcast messaging
-- - Welcome messages
-- - All triggers, functions, and RLS policies
-- Run this in Supabase SQL Editor
-- =====================================================

-- =====================================================
-- PART 1: CONVERSATIONS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  participant1_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  participant2_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  last_message_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(participant1_id, participant2_id)
);

-- =====================================================
-- PART 2: MESSAGES TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'::jsonb, -- For storing message type, priority, subject, etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =====================================================
-- PART 3: BROADCAST MESSAGES TABLE
-- =====================================================
-- Note: This table must be created BEFORE adding broadcast_id to messages

CREATE TABLE IF NOT EXISTS broadcast_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  recipient_type TEXT NOT NULL CHECK (recipient_type IN ('all', 'vendors', 'agents', 'sales_agents', 'delivery_agents')),
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  total_recipients INTEGER DEFAULT 0,
  sent_count INTEGER DEFAULT 0,
  failed_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sending', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE
);

-- =====================================================
-- PART 3.5: ADD broadcast_id COLUMN TO MESSAGES TABLE
-- =====================================================
-- This must be done AFTER broadcast_messages table is created

DO $$
BEGIN
  -- Check if column exists, if not add it
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'messages' 
    AND column_name = 'broadcast_id'
  ) THEN
    -- Add the column with foreign key reference
    ALTER TABLE messages 
    ADD COLUMN broadcast_id UUID REFERENCES broadcast_messages(id) ON DELETE SET NULL;
    
    -- Add comment
    COMMENT ON COLUMN messages.broadcast_id IS 'Reference to broadcast_messages if this message is part of a broadcast';
    
    RAISE NOTICE 'broadcast_id column added to messages table';
  ELSE
    RAISE NOTICE 'broadcast_id column already exists in messages table';
  END IF;
END $$;

-- =====================================================
-- PART 4: INDEXES FOR PERFORMANCE
-- =====================================================

-- Conversations indexes
CREATE INDEX IF NOT EXISTS idx_conversations_participant1 ON conversations(participant1_id);
CREATE INDEX IF NOT EXISTS idx_conversations_participant2 ON conversations(participant2_id);
CREATE INDEX IF NOT EXISTS idx_conversations_updated_at ON conversations(updated_at DESC);

-- Messages indexes
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);
CREATE INDEX IF NOT EXISTS idx_messages_is_read ON messages(is_read) WHERE is_read = false;
CREATE INDEX IF NOT EXISTS idx_messages_broadcast_id ON messages(broadcast_id);

-- Broadcast messages indexes
CREATE INDEX IF NOT EXISTS idx_broadcast_messages_sender_id ON broadcast_messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_broadcast_messages_status ON broadcast_messages(status);
CREATE INDEX IF NOT EXISTS idx_broadcast_messages_created_at ON broadcast_messages(created_at DESC);

-- =====================================================
-- PART 5: FUNCTIONS AND TRIGGERS
-- =====================================================

-- Function to update conversation's updated_at and last_message_id
CREATE OR REPLACE FUNCTION update_conversation_on_message()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE conversations
  SET 
    updated_at = NEW.created_at,
    last_message_id = NEW.id
  WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update conversation when message is created
DROP TRIGGER IF EXISTS trigger_update_conversation_on_message ON messages;
CREATE TRIGGER trigger_update_conversation_on_message
  AFTER INSERT ON messages
  FOR EACH ROW
  EXECUTE FUNCTION update_conversation_on_message();

-- Function to update message read_at when is_read changes
CREATE OR REPLACE FUNCTION update_message_read_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_read = true AND OLD.is_read = false THEN
    NEW.read_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update read_at timestamp
DROP TRIGGER IF EXISTS trigger_update_message_read_at ON messages;
CREATE TRIGGER trigger_update_message_read_at
  BEFORE UPDATE ON messages
  FOR EACH ROW
  EXECUTE FUNCTION update_message_read_at();

-- Function to send welcome message to new users
CREATE OR REPLACE FUNCTION send_welcome_message()
RETURNS TRIGGER AS $$
DECLARE
  admin_id UUID;
  conversation_id UUID;
BEGIN
  -- Find an active admin
  SELECT id INTO admin_id
  FROM profiles
  WHERE role IN ('super_admin', 'admin')
  AND is_active = true
  LIMIT 1;

  -- If no admin found, skip welcome message
  IF admin_id IS NULL THEN
    RETURN NEW;
  END IF;

  -- Create conversation with admin
  INSERT INTO conversations (participant1_id, participant2_id)
  VALUES (NEW.id, admin_id)
  ON CONFLICT (participant1_id, participant2_id) DO NOTHING
  RETURNING id INTO conversation_id;

  -- If conversation was created, send welcome message
  -- Note: Welcome messages are not encrypted (system messages)
  IF conversation_id IS NOT NULL THEN
    INSERT INTO messages (conversation_id, sender_id, content, is_read, is_encrypted)
    VALUES (
      conversation_id,
      admin_id,
      'Welcome to Townssy! 🎉 We''re excited to have you here. If you have any questions, concerns, or need assistance, feel free to reach out to our support team. We''re here to help!',
      false,
      false
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to send welcome message when user signs up
DROP TRIGGER IF EXISTS trigger_send_welcome_message ON profiles;
CREATE TRIGGER trigger_send_welcome_message
  AFTER INSERT ON profiles
  FOR EACH ROW
  WHEN (NEW.role = 'user')
  EXECUTE FUNCTION send_welcome_message();

-- =====================================================
-- PART 6: ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE broadcast_messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own conversations" ON conversations;
DROP POLICY IF EXISTS "Users can create conversations" ON conversations;
DROP POLICY IF EXISTS "Users can view messages in their conversations" ON messages;
DROP POLICY IF EXISTS "Users can send messages in their conversations" ON messages;
DROP POLICY IF EXISTS "Users can update their own messages" ON messages;
DROP POLICY IF EXISTS "Admins can view all broadcast messages" ON broadcast_messages;
DROP POLICY IF EXISTS "Admins can create broadcast messages" ON broadcast_messages;
DROP POLICY IF EXISTS "Admins can update broadcast messages" ON broadcast_messages;

-- Conversations policies
CREATE POLICY "Users can view their own conversations"
ON conversations FOR SELECT
USING (
  auth.uid() = participant1_id OR 
  auth.uid() = participant2_id
);

CREATE POLICY "Users can create conversations"
ON conversations FOR INSERT
WITH CHECK (
  auth.uid() = participant1_id OR 
  auth.uid() = participant2_id
);

-- Messages policies
CREATE POLICY "Users can view messages in their conversations"
ON messages FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM conversations
    WHERE conversations.id = messages.conversation_id
    AND (
      conversations.participant1_id = auth.uid() OR
      conversations.participant2_id = auth.uid()
    )
  )
);

CREATE POLICY "Users can send messages in their conversations"
ON messages FOR INSERT
WITH CHECK (
  auth.uid() = sender_id AND
  EXISTS (
    SELECT 1 FROM conversations
    WHERE conversations.id = messages.conversation_id
    AND (
      conversations.participant1_id = auth.uid() OR
      conversations.participant2_id = auth.uid()
    )
  )
);

CREATE POLICY "Users can update their own messages"
ON messages FOR UPDATE
USING (auth.uid() = sender_id)
WITH CHECK (auth.uid() = sender_id);

-- Broadcast messages policies (Admin only)
CREATE POLICY "Admins can view all broadcast messages"
ON broadcast_messages FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role IN ('super_admin', 'admin')
  )
);

CREATE POLICY "Admins can create broadcast messages"
ON broadcast_messages FOR INSERT
WITH CHECK (
  auth.uid() = sender_id AND
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role IN ('super_admin', 'admin')
  )
);

CREATE POLICY "Admins can update broadcast messages"
ON broadcast_messages FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role IN ('super_admin', 'admin')
  )
);

-- =====================================================
-- PART 7: HELPER FUNCTION - Get Admin ID for Messaging
-- This function allows users to find an admin for messaging
-- It bypasses RLS by using SECURITY DEFINER
-- =====================================================

CREATE OR REPLACE FUNCTION get_admin_for_messaging()
RETURNS UUID AS $$
DECLARE
  admin_id UUID;
BEGIN
  -- Try to find an active super_admin first
  SELECT id INTO admin_id
  FROM profiles
  WHERE role = 'super_admin'
  AND is_active = true
  LIMIT 1;

  -- If no active super_admin, try any super_admin
  IF admin_id IS NULL THEN
    SELECT id INTO admin_id
    FROM profiles
    WHERE role = 'super_admin'
    LIMIT 1;
  END IF;

  -- If still no admin, try active regular admin
  IF admin_id IS NULL THEN
    SELECT id INTO admin_id
    FROM profiles
    WHERE role = 'admin'
    AND is_active = true
    LIMIT 1;
  END IF;

  -- Last resort: try any admin
  IF admin_id IS NULL THEN
    SELECT id INTO admin_id
    FROM profiles
    WHERE role = 'admin'
    LIMIT 1;
  END IF;

  RETURN admin_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION get_admin_for_messaging() TO authenticated;

COMMENT ON FUNCTION get_admin_for_messaging() IS 'Returns an admin ID for messaging purposes. Bypasses RLS to allow users to find an admin.';

-- =====================================================
-- PART 8: COMMENTS
-- =====================================================

COMMENT ON TABLE conversations IS 'Stores conversation threads between users';
COMMENT ON TABLE messages IS 'Stores individual messages within conversations';
COMMENT ON TABLE broadcast_messages IS 'Stores broadcast messages sent by admins to users';
COMMENT ON COLUMN conversations.last_message_id IS 'Reference to the most recent message in the conversation';
COMMENT ON COLUMN messages.is_read IS 'Whether the message has been read by the recipient';
COMMENT ON COLUMN messages.metadata IS 'JSONB field for storing message type, priority, subject, and other metadata';
COMMENT ON COLUMN messages.broadcast_id IS 'Reference to broadcast_messages if this message is part of a broadcast';
COMMENT ON COLUMN broadcast_messages.recipient_type IS 'Type of recipients: all, vendors, agents, sales_agents, delivery_agents';
COMMENT ON COLUMN broadcast_messages.total_recipients IS 'Total number of recipients the broadcast was sent to';
COMMENT ON COLUMN broadcast_messages.sent_count IS 'Number of messages successfully sent';
COMMENT ON COLUMN broadcast_messages.failed_count IS 'Number of messages that failed to send';

-- =====================================================
-- PART 9: VERIFICATION QUERIES
-- =====================================================

-- Check if tables were created
SELECT 
  table_name,
  table_type
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('conversations', 'messages', 'broadcast_messages')
ORDER BY table_name;

-- Check if indexes were created
SELECT 
  indexname,
  tablename
FROM pg_indexes
WHERE schemaname = 'public'
AND tablename IN ('conversations', 'messages', 'broadcast_messages')
ORDER BY tablename, indexname;

-- Check if triggers were created
SELECT 
  trigger_name,
  event_object_table
FROM information_schema.triggers
WHERE trigger_schema = 'public'
AND event_object_table IN ('conversations', 'messages', 'profiles')
ORDER BY event_object_table, trigger_name;

-- Check if functions were created
SELECT 
  routine_name,
  routine_type
FROM information_schema.routines
WHERE routine_schema = 'public'
AND routine_name IN ('update_conversation_on_message', 'update_message_read_at', 'send_welcome_message', 'get_admin_for_messaging')
ORDER BY routine_name;

-- Check if RLS policies were created
SELECT 
  schemaname,
  tablename,
  policyname
FROM pg_policies
WHERE schemaname = 'public'
AND tablename IN ('conversations', 'messages', 'broadcast_messages')
ORDER BY tablename, policyname;
