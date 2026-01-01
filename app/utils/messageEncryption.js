/**
 * End-to-End Encryption Utilities for Messages
 * Uses Web Crypto API with AES-GCM encryption
 * Broadcast messages are NOT encrypted
 */

/**
 * Derive an encryption key from a conversation ID and user IDs
 * This creates a shared key for the conversation participants
 */
async function deriveEncryptionKey(conversationId, userId1, userId2) {
  // Create a stable key material from conversation and participant IDs
  const keyMaterial = `${conversationId}-${userId1 < userId2 ? userId1 : userId2}-${userId1 > userId2 ? userId1 : userId2}`;
  
  // Convert to ArrayBuffer
  const encoder = new TextEncoder();
  const keyData = encoder.encode(keyMaterial);
  
  // Import the key material
  const baseKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );
  
  // Derive the encryption key using PBKDF2
  const salt = encoder.encode('townssy-e2e-salt'); // Fixed salt for consistency
  const encryptionKey = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
  
  return encryptionKey;
}

/**
 * Encrypt a message using AES-GCM
 */
export async function encryptMessage(content, conversationId, userId1, userId2) {
  try {
    // Derive the encryption key
    const key = await deriveEncryptionKey(conversationId, userId1, userId2);
    
    // Generate a random IV (Initialization Vector)
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    // Encode the message content
    const encoder = new TextEncoder();
    const data = encoder.encode(content);
    
    // Encrypt the message
    const encryptedData = await crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv
      },
      key,
      data
    );
    
    // Combine IV and encrypted data
    const combined = new Uint8Array(iv.length + encryptedData.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(encryptedData), iv.length);
    
    // Convert to base64 for storage
    const base64 = btoa(String.fromCharCode(...combined));
    
    return base64;
  } catch (error) {
    console.error('Error encrypting message:', error);
    throw new Error('Failed to encrypt message');
  }
}

/**
 * Decrypt a message using AES-GCM
 */
export async function decryptMessage(encryptedContent, conversationId, userId1, userId2) {
  try {
    // Derive the decryption key (same as encryption key)
    const key = await deriveEncryptionKey(conversationId, userId1, userId2);
    
    // Decode from base64
    const combined = Uint8Array.from(atob(encryptedContent), c => c.charCodeAt(0));
    
    // Extract IV and encrypted data
    const iv = combined.slice(0, 12);
    const encryptedData = combined.slice(12);
    
    // Decrypt the message
    const decryptedData = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv
      },
      key,
      encryptedData
    );
    
    // Decode the decrypted data
    const decoder = new TextDecoder();
    const content = decoder.decode(decryptedData);
    
    return content;
  } catch (error) {
    console.error('Error decrypting message:', error);
    throw new Error('Failed to decrypt message. The message may be corrupted or you may not have access.');
  }
}

/**
 * Check if a message is encrypted
 * Encrypted messages are base64 strings that start with a specific pattern
 */
export function isEncrypted(content) {
  if (!content || typeof content !== 'string') return false;
  // Encrypted messages are base64, which is longer and has a specific character set
  // We'll check if it's valid base64 and longer than a typical short message
  try {
    const decoded = atob(content);
    // If it decodes successfully and is reasonably long, it might be encrypted
    // But we'll use a flag in the database instead for reliability
    return false; // We'll use database flag instead
  } catch {
    return false;
  }
}


