# Messages System - Field Connections Verification

## Database Schema Fields

### conversations table
- `id` (UUID, PRIMARY KEY)
- `participant1_id` (UUID, FK to profiles)
- `participant2_id` (UUID, FK to profiles)
- `last_message_id` (UUID, nullable)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### messages table
- `id` (UUID, PRIMARY KEY)
- `conversation_id` (UUID, FK to conversations)
- `sender_id` (UUID, FK to profiles)
- `content` (TEXT)
- `is_read` (BOOLEAN)
- `read_at` (TIMESTAMP, nullable)
- `metadata` (JSONB) - stores: messageType, priority, subject, broadcast_id
- `broadcast_id` (UUID, FK to broadcast_messages, nullable)
- `created_at` (TIMESTAMP)

### broadcast_messages table
- `id` (UUID, PRIMARY KEY)
- `sender_id` (UUID, FK to profiles)
- `recipient_type` (TEXT) - 'all', 'vendors', 'agents', 'sales_agents', 'delivery_agents'
- `subject` (TEXT)
- `content` (TEXT)
- `priority` (TEXT) - 'low', 'normal', 'high', 'urgent'
- `total_recipients` (INTEGER)
- `sent_count` (INTEGER)
- `failed_count` (INTEGER)
- `status` (TEXT) - 'pending', 'sending', 'completed', 'failed'
- `created_at` (TIMESTAMP)
- `completed_at` (TIMESTAMP, nullable)

## Page Connections Verification

### ✅ User Messages Page (`/messages`)
**Fields Used:**
- `conversations`: participant1_id, participant2_id, updated_at
- `messages`: conversation_id, sender_id, content, is_read, created_at
- `profiles`: id, full_name, username, avatar_url (via foreign keys)

**Queries:**
- ✅ Fetches conversations with participant profiles
- ✅ Fetches last message per conversation
- ✅ Counts unread messages
- ✅ Creates messages with conversation_id and sender_id

### ✅ User Send Message Page (`/messages/send`)
**Fields Used:**
- `conversations`: participant1_id, participant2_id
- `messages`: conversation_id, sender_id, content, is_read, metadata
- `profiles`: id, role (for finding admin)

**Queries:**
- ✅ Finds or creates conversation with admin
- ✅ Inserts message with metadata (messageType, priority, subject)
- ✅ Uses correct field names

### ✅ Admin Messages Page (`/admin/messages`)
**Fields Used:**
- `conversations`: participant1_id, participant2_id, updated_at
- `messages`: conversation_id, sender_id, is_read, created_at
- `profiles`: id, full_name, username, avatar_url, role

**Queries:**
- ✅ Fetches all admin conversations
- ✅ Calculates stats (total, unread, today)
- ✅ Uses correct foreign key relationships

### ✅ Admin Conversation Page (`/admin/messages/[id]`)
**Fields Used:**
- `conversations`: participant1_id, participant2_id
- `messages`: conversation_id, sender_id, content, is_read, created_at
- `profiles`: id, full_name, username, avatar_url, role

**Queries:**
- ✅ Fetches conversation with participants
- ✅ Fetches messages with sender info
- ✅ Updates is_read status
- ✅ Creates new messages

### ✅ Admin Broadcast Page (`/admin/messages/broadcast`)
**Fields Used:**
- `broadcast_messages`: sender_id, recipient_type, subject, content, priority, total_recipients, sent_count, failed_count, status
- `conversations`: participant1_id, participant2_id
- `messages`: conversation_id, sender_id, content, is_read, metadata, broadcast_id
- `profiles`: id, role, is_active
- `agents`: user_id, agent_type

**Queries:**
- ✅ Creates broadcast_messages record
- ✅ Creates conversations for each recipient
- ✅ Inserts messages with broadcast_id in metadata
- ✅ Updates broadcast status and counts

### ✅ Admin Broadcast History (`/admin/messages/broadcast/history`)
**Fields Used:**
- `broadcast_messages`: all fields
- `profiles`: id, full_name, username (via sender_id)

**Queries:**
- ✅ Fetches all broadcasts with sender info
- ✅ Displays status, counts, and metadata

## Foreign Key Relationships

### ✅ Conversations → Profiles
- `participant1_id` → `profiles.id` ✓
- `participant2_id` → `profiles.id` ✓
- Used in queries: `participant1:profiles!conversations_participant1_id_fkey(...)`

### ✅ Messages → Conversations
- `conversation_id` → `conversations.id` ✓
- Used in queries: `.eq('conversation_id', ...)`

### ✅ Messages → Profiles
- `sender_id` → `profiles.id` ✓
- Used in queries: `sender:profiles!messages_sender_id_fkey(...)`

### ✅ Messages → Broadcast Messages
- `broadcast_id` → `broadcast_messages.id` ✓
- Stored in metadata JSONB and as direct FK

### ✅ Broadcast Messages → Profiles
- `sender_id` → `profiles.id` ✓
- Used in queries: `sender:profiles!broadcast_messages_sender_id_fkey(...)`

## Metadata Field Structure

### User Send Message (`/messages/send`)
```json
{
  "messageType": "general|review|concern|complaint",
  "priority": "low|normal|high|urgent",
  "subject": "string"
}
```

### Admin Broadcast
```json
{
  "broadcast_id": "uuid",
  "messageType": "broadcast",
  "priority": "low|normal|high|urgent"
}
```

## Verification Checklist

- ✅ All table names match: `conversations`, `messages`, `broadcast_messages`
- ✅ All field names match schema
- ✅ Foreign key relationships correctly referenced
- ✅ Metadata JSONB structure consistent
- ✅ broadcast_id stored in both metadata and direct FK
- ✅ All queries use correct field names
- ✅ RLS policies match query patterns
- ✅ Indexes support query patterns

## Potential Issues Found

None - All connections verified and correct!

