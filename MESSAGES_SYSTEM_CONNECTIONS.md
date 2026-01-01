# Messages System - Complete Field & Page Connections

## ✅ Database Schema ↔ Code Connections

### 1. Conversations Table
**Schema Fields:**
- `id`, `participant1_id`, `participant2_id`, `last_message_id`, `created_at`, `updated_at`

**Used In:**
- ✅ `/messages` - Fetches user conversations
- ✅ `/admin/messages` - Fetches admin conversations
- ✅ `/admin/messages/[id]` - Fetches specific conversation
- ✅ `/messages/send` - Creates conversation with admin
- ✅ `/admin/messages/broadcast` - Creates conversations for broadcast recipients

**Foreign Keys:**
- ✅ `participant1_id` → `profiles.id` (used in all queries)
- ✅ `participant2_id` → `profiles.id` (used in all queries)

### 2. Messages Table
**Schema Fields:**
- `id`, `conversation_id`, `sender_id`, `content`, `is_read`, `read_at`, `metadata`, `broadcast_id`, `created_at`

**Used In:**
- ✅ `/messages` - Fetches and sends messages
- ✅ `/admin/messages` - Fetches messages for stats
- ✅ `/admin/messages/[id]` - Fetches and sends messages in conversation
- ✅ `/messages/send` - Creates support messages with metadata
- ✅ `/admin/messages/broadcast` - Creates broadcast messages with broadcast_id

**Foreign Keys:**
- ✅ `conversation_id` → `conversations.id` (used in all message queries)
- ✅ `sender_id` → `profiles.id` (used to fetch sender info)
- ✅ `broadcast_id` → `broadcast_messages.id` (used in broadcast messages)

**Metadata Structure:**
```json
{
  "messageType": "general|review|concern|complaint|broadcast",
  "priority": "low|normal|high|urgent",
  "subject": "string",
  "broadcast_id": "uuid"
}
```

### 3. Broadcast Messages Table
**Schema Fields:**
- `id`, `sender_id`, `recipient_type`, `subject`, `content`, `priority`, `total_recipients`, `sent_count`, `failed_count`, `status`, `created_at`, `completed_at`

**Used In:**
- ✅ `/admin/messages/broadcast` - Creates broadcast records
- ✅ `/admin/messages/broadcast/history` - Fetches broadcast history

**Foreign Keys:**
- ✅ `sender_id` → `profiles.id` (used to fetch admin info)

## ✅ Page Flow Connections

### User Flow
1. **`/messages`** (Inbox/Sent)
   - Lists conversations → Uses `conversations` table
   - Shows last message → Uses `messages` table
   - Shows unread count → Uses `messages.is_read`
   - Links to `/messages/send` → Contact Support

2. **`/messages/send`** (Contact Support)
   - Creates conversation with admin → Uses `conversations` table
   - Sends message → Uses `messages` table with metadata
   - Redirects to `/messages` → Shows in inbox

3. **`/messages`** (Chat View)
   - Opens conversation → Uses `conversations` table
   - Shows messages → Uses `messages` table
   - Sends reply → Creates new message
   - Real-time updates → Subscribes to `messages` table

### Admin Flow
1. **`/admin/messages`** (All Conversations)
   - Lists all conversations → Uses `conversations` table
   - Shows stats → Uses `messages` table counts
   - Links to `/admin/messages/[id]` → Open conversation
   - Links to `/admin/messages/broadcast` → Send broadcast

2. **`/admin/messages/[id]`** (Conversation View)
   - Fetches conversation → Uses `conversations` table
   - Shows messages → Uses `messages` table
   - Sends reply → Creates new message
   - Real-time updates → Subscribes to `messages` table

3. **`/admin/messages/broadcast`** (Send Broadcast)
   - Creates broadcast record → Uses `broadcast_messages` table
   - Creates conversations → Uses `conversations` table
   - Creates messages → Uses `messages` table with `broadcast_id`
   - Updates broadcast stats → Updates `broadcast_messages` table

4. **`/admin/messages/broadcast/history`** (Broadcast History)
   - Lists broadcasts → Uses `broadcast_messages` table
   - Shows stats → Uses `sent_count`, `failed_count`, `total_recipients`

## ✅ Field Mapping Verification

| Database Field | Used In Pages | Status |
|---------------|---------------|--------|
| `conversations.id` | All pages | ✅ |
| `conversations.participant1_id` | All pages | ✅ |
| `conversations.participant2_id` | All pages | ✅ |
| `conversations.updated_at` | List pages (sorting) | ✅ |
| `messages.id` | All pages | ✅ |
| `messages.conversation_id` | All pages | ✅ |
| `messages.sender_id` | All pages | ✅ |
| `messages.content` | All pages | ✅ |
| `messages.is_read` | All pages | ✅ |
| `messages.read_at` | Not directly used (auto-set) | ✅ |
| `messages.metadata` | Send page, Broadcast page | ✅ |
| `messages.broadcast_id` | Broadcast page | ✅ |
| `messages.created_at` | All pages (sorting, timestamps) | ✅ |
| `broadcast_messages.id` | Broadcast pages | ✅ |
| `broadcast_messages.sender_id` | Broadcast history | ✅ |
| `broadcast_messages.recipient_type` | Broadcast pages | ✅ |
| `broadcast_messages.subject` | Broadcast pages | ✅ |
| `broadcast_messages.content` | Broadcast pages | ✅ |
| `broadcast_messages.priority` | Broadcast pages | ✅ |
| `broadcast_messages.total_recipients` | Broadcast history | ✅ |
| `broadcast_messages.sent_count` | Broadcast history | ✅ |
| `broadcast_messages.failed_count` | Broadcast history | ✅ |
| `broadcast_messages.status` | Broadcast history | ✅ |

## ✅ Query Patterns Verification

### Conversations Queries
```javascript
// ✅ Correct - Fetches with participant profiles
.from('conversations')
.select(`
  *,
  participant1:profiles!conversations_participant1_id_fkey(...),
  participant2:profiles!conversations_participant2_id_fkey(...)
`)
.or(`participant1_id.eq.${user.id},participant2_id.eq.${user.id}`)
```

### Messages Queries
```javascript
// ✅ Correct - Fetches with sender profile
.from('messages')
.select(`
  *,
  sender:profiles!messages_sender_id_fkey(...)
`)
.eq('conversation_id', conversationId)
```

### Broadcast Queries
```javascript
// ✅ Correct - Fetches with sender profile
.from('broadcast_messages')
.select(`
  *,
  sender:profiles!broadcast_messages_sender_id_fkey(...)
`)
```

## ✅ All Connections Verified

**Status: ✅ ALL CONNECTIONS CORRECT**

- All database fields match code usage
- All foreign key relationships properly referenced
- All metadata structures consistent
- All page flows connected correctly
- All queries use correct field names
- All navigation links work properly

