/**
 * Fetch unread messages count for authenticated user
 * @param {string} userId - The user's ID
 * @returns {Promise<number>} - Count of unread messages
 */
export async function fetchUnreadMessagesCount(userId) {
  if (!userId) return 0;

  try {
    const { supabase } = await import('../../lib/supabase');
    
    // Get all conversations where user is a participant
    const { data: conversations, error: convError } = await supabase
      .from('conversations')
      .select('id')
      .or(`participant1_id.eq.${userId},participant2_id.eq.${userId}`);

    if (convError || !conversations || conversations.length === 0) {
      return 0;
    }

    const conversationIds = conversations.map(c => c.id);

    // Count unread messages (messages not sent by the user)
    const { count, error } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .in('conversation_id', conversationIds)
      .eq('is_read', false)
      .neq('sender_id', userId);

    if (error) {
      console.error('Error fetching unread messages count:', error);
      return 0;
    }

    return count || 0;
  } catch (error) {
    console.error('Error in fetchUnreadMessagesCount:', error);
    return 0;
  }
}

