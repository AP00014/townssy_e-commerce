/**
 * Fetch unread messages count for authenticated user
 * Uses robust query utilities with timeout and retry logic
 * @param {string} userId - The user's ID
 * @returns {Promise<number>} - Count of unread messages
 */
export async function fetchUnreadMessagesCount(userId) {
  if (!userId) return 0;

  try {
    const { supabase } = await import('../../lib/supabase');
    const { fetchUserConversations, fetchUnreadCount } = await import('./supabaseQuery');
    
    // Get all conversations where user is a participant (with retry logic)
    const conversations = await fetchUserConversations(supabase, userId);

    if (!conversations || conversations.length === 0) {
      return 0;
    }

    const conversationIds = conversations.map(c => c.id);

    // Count unread messages (with retry logic)
    const count = await fetchUnreadCount(supabase, userId, conversationIds);
    return count;
  } catch (error) {
    console.error('Error in fetchUnreadMessagesCount:', error);
    return 0;
  }
}

