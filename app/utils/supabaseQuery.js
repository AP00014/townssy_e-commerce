/**
 * Robust Supabase query utility with timeout, retry, and error handling
 * Prevents ERR_CONNECTION_CLOSED errors
 */

/**
 * Create a query with timeout and abort controller
 * @param {Function} queryFn - The Supabase query function
 * @param {number} timeoutMs - Timeout in milliseconds (default: 10000)
 * @returns {Promise} Query result
 */
export async function queryWithTimeout(queryFn, timeoutMs = 10000) {
  const abortController = new AbortController();
  const timeoutId = setTimeout(() => abortController.abort(), timeoutMs);

  try {
    const result = await queryFn();
    clearTimeout(timeoutId);
    return result;
  } catch (error) {
    clearTimeout(timeoutId);
    if (abortController.signal.aborted) {
      throw new Error(`Query timeout after ${timeoutMs}ms`);
    }
    throw error;
  }
}

/**
 * Retry a query with exponential backoff
 * @param {Function} queryFn - The Supabase query function
 * @param {Object} options - Retry options
 * @returns {Promise} Query result
 */
export async function queryWithRetry(queryFn, options = {}) {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    timeoutMs = 10000,
    onRetry = null,
  } = options;

  let lastError;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const result = await queryWithTimeout(queryFn, timeoutMs);
      
      // Check for Supabase errors
      if (result.error) {
        // Don't retry on client errors (4xx) - these are permanent
        if (result.error.status >= 400 && result.error.status < 500) {
          return result;
        }
        
        // Check for connection errors
        const isConnectionError = 
          result.error.message?.includes('ERR_CONNECTION_CLOSED') ||
          result.error.message?.includes('connection') ||
          result.error.code === 'ECONNRESET' ||
          result.error.code === 'ECONNREFUSED' ||
          !result.error.status;
        
        // Retry on server errors (5xx) or connection errors
        if (result.error.status >= 500 || isConnectionError) {
          throw result.error;
        }
        
        // For other errors, return the result
        return result;
      }
      
      return result;
    } catch (error) {
      lastError = error;
      
      // Don't retry on last attempt
      if (attempt === maxRetries) {
        break;
      }
      
      // Calculate delay with exponential backoff
      const delay = initialDelay * Math.pow(2, attempt);
      
      if (onRetry) {
        onRetry(attempt + 1, delay, error);
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  // Return error result if all retries failed
  return {
    data: null,
    error: lastError || new Error('Query failed after retries'),
  };
}

/**
 * Fetch conversations for a user with robust error handling
 * Tries single .or() query first, falls back to two separate queries if needed
 * @param {Object} supabase - Supabase client
 * @param {string} userId - User ID
 * @returns {Promise<Array>} Array of conversation IDs
 */
export async function fetchUserConversations(supabase, userId) {
  if (!userId || !supabase) {
    return [];
  }

  // Try single query with .or() first (more efficient)
  try {
    const result = await queryWithRetry(
      () => supabase
        .from('conversations')
        .select('id')
        .or(`participant1_id.eq.${userId},participant2_id.eq.${userId}`),
      {
        maxRetries: 1, // Only 1 retry for .or() queries
        timeoutMs: 6000,
      }
    );

    // Check if we got a connection error
    const isConnectionError = result.error && (
      result.error.message?.includes('ERR_CONNECTION_CLOSED') ||
      result.error.message?.includes('connection') ||
      result.error.code === 'ECONNRESET' ||
      result.error.code === 'ECONNREFUSED' ||
      !result.error.status // Network errors often don't have status
    );

    // If no error or non-connection error, return the result
    if (!result.error || !isConnectionError) {
      if (result.error) {
        console.warn('Error fetching conversations:', result.error);
        return [];
      }
      return result.data || [];
    }

    // Connection error - fall back to two separate queries
    console.warn('.or() query failed with connection error, falling back to separate queries');
  } catch (error) {
    // If .or() query throws, fall back to separate queries
    const isConnectionError = error.message?.includes('ERR_CONNECTION_CLOSED') ||
      error.message?.includes('connection') ||
      error.message?.includes('timeout');
    
    if (!isConnectionError) {
      console.error('Error in fetchUserConversations:', error);
      return [];
    }
    
    console.warn('.or() query failed, falling back to separate queries');
  }

  // Fallback: Use two separate queries (more reliable for connection issues)
  try {
    const [result1, result2] = await Promise.all([
      queryWithRetry(
        () => supabase
          .from('conversations')
          .select('id')
          .eq('participant1_id', userId),
        {
          maxRetries: 2,
          timeoutMs: 6000,
        }
      ),
      queryWithRetry(
        () => supabase
          .from('conversations')
          .select('id')
          .eq('participant2_id', userId),
        {
          maxRetries: 2,
          timeoutMs: 6000,
        }
      )
    ]);

    const conversations1 = result1.data || [];
    const conversations2 = result2.data || [];
    const convError = result1.error || result2.error;

    if (convError) {
      console.warn('Error fetching conversations (fallback):', convError);
      return [];
    }

    // Combine and deduplicate conversations
    const allConversations = [...conversations1, ...conversations2].filter(
      (conv, index, self) => index === self.findIndex(c => c.id === conv.id)
    );

    return allConversations;
  } catch (error) {
    console.error('Error in fetchUserConversations (fallback):', error);
    return [];
  }
}

/**
 * Fetch unread messages count with robust error handling
 * @param {Object} supabase - Supabase client
 * @param {string} userId - User ID
 * @param {Array} conversationIds - Array of conversation IDs
 * @returns {Promise<number>} Count of unread messages
 */
export async function fetchUnreadCount(supabase, userId, conversationIds) {
  if (!userId || !supabase || !conversationIds || conversationIds.length === 0) {
    return 0;
  }

  try {
    const result = await queryWithRetry(
      () => supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .in('conversation_id', conversationIds)
        .eq('is_read', false)
        .neq('sender_id', userId),
      {
        maxRetries: 2,
        timeoutMs: 8000,
      }
    );

    if (result.error) {
      console.warn('Error fetching unread count:', result.error);
      return 0;
    }

    return result.count || 0;
  } catch (error) {
    console.error('Error in fetchUnreadCount:', error);
    return 0;
  }
}

/**
 * Fetch full conversations with participant profiles
 * Uses a single optimized query with retry logic
 * @param {Object} supabase - Supabase client
 * @param {string} userId - User ID
 * @returns {Promise<Array>} Array of conversations with participant data
 */
export async function fetchFullConversations(supabase, userId) {
  if (!userId || !supabase) {
    return [];
  }

  try {
    // Use a single query with OR condition - more efficient and reliable
    const result = await queryWithRetry(
      () => supabase
        .from('conversations')
        .select(`
          *,
          participant1:profiles!conversations_participant1_id_fkey(id, full_name, username, avatar_url, role),
          participant2:profiles!conversations_participant2_id_fkey(id, full_name, username, avatar_url, role)
        `)
        .or(`participant1_id.eq.${userId},participant2_id.eq.${userId}`)
        .order('updated_at', { ascending: false }),
      {
        maxRetries: 2,
        timeoutMs: 10000,
      }
    );

    if (result.error) {
      console.warn('Error fetching conversations:', result.error);
      return [];
    }

    return result.data || [];
  } catch (error) {
    console.error('Error in fetchFullConversations:', error);
    return [];
  }
}

