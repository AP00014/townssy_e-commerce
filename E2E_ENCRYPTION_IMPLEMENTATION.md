# End-to-End Encryption Implementation for Messages

## Overview
All messages in the messaging system are now end-to-end encrypted using AES-GCM encryption, except for broadcast messages which remain unencrypted for administrative purposes.

## Implementation Details

### 1. Encryption Utility (`app/utils/messageEncryption.js`)
- Uses Web Crypto API with AES-GCM encryption
- Key derivation using PBKDF2 with SHA-256
- Keys are derived from conversation ID and participant IDs
- Each conversation has a unique encryption key

### 2. Database Schema Updates
Run `add_e2e_encryption_to_messages.sql` to add:
- `is_encrypted` BOOLEAN column to `messages` table
- Index for performance
- Default value: `false`

### 3. Updated Files

#### Message Sending (Encryption):
- `app/messages/send/page.js` - Encrypts user messages to admins
- `app/messages/page.js` - Encrypts messages in user conversations
- `app/admin/messages/[id]/page.js` - Encrypts admin replies

#### Message Receiving (Decryption):
- `app/messages/page.js` - Decrypts messages when displaying
- `app/admin/messages/[id]/page.js` - Decrypts messages in admin chat
- `app/admin/messages/page.js` - Decrypts last message previews

#### Broadcast Messages (NOT Encrypted):
- `app/admin/messages/broadcast/page.js` - Explicitly sets `is_encrypted: false`
- SQL trigger for welcome messages - Sets `is_encrypted: false`

## Security Features

1. **End-to-End Encryption**: Only conversation participants can decrypt messages
2. **Key Derivation**: Uses PBKDF2 with 100,000 iterations
3. **Unique Keys**: Each conversation has its own encryption key
4. **Broadcast Exception**: Broadcast messages remain unencrypted for admin visibility

## Setup Instructions

1. Run the SQL migration:
   ```sql
   -- Run add_e2e_encryption_to_messages.sql
   ```

2. The encryption/decryption happens automatically:
   - Messages are encrypted before being sent
   - Messages are decrypted when being displayed
   - Broadcast messages bypass encryption

## Important Notes

- **Backward Compatibility**: Existing unencrypted messages will display as-is
- **Error Handling**: If decryption fails, shows "[Encrypted message - unable to decrypt]"
- **Performance**: Encryption/decryption happens client-side using Web Crypto API
- **Key Management**: Keys are derived, not stored, ensuring security

## Testing

1. Send a message between users - should be encrypted
2. Send a broadcast message - should NOT be encrypted
3. View messages - should automatically decrypt
4. Check database - encrypted messages have `is_encrypted = true`


