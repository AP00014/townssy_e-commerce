/**
 * WebSocket Connection Manager for Supabase Realtime
 * Prevents duplicate connections, handles retries, and manages cleanup
 */

class RealtimeManager {
  constructor() {
    this.channels = new Map();
    this.connectionRetries = new Map();
    this.maxRetries = 3;
    this.retryDelay = 2000; // Start with 2 seconds
  }

  /**
   * Create or get a channel with retry logic
   * @param {Object} supabase - Supabase client
   * @param {string} channelName - Unique channel name
   * @param {Object} config - Channel configuration
   * @returns {Object} Channel object
   */
  async getChannel(supabase, channelName, config = {}) {
    if (!supabase || !supabase.channel) {
      console.warn('Supabase client not available for channel:', channelName);
      return null;
    }

    // Return existing channel if already created
    if (this.channels.has(channelName)) {
      const existing = this.channels.get(channelName);
      if (existing && existing.state === 'joined') {
        return existing;
      }
      // Clean up stale channel
      this.removeChannel(supabase, channelName);
    }

    try {
      const channel = supabase.channel(channelName, {
        config: {
          broadcast: { self: false },
          presence: { key: '' },
          ...config,
        },
      });

      // Set up event handlers
      if (config.onPostgresChanges) {
        config.onPostgresChanges.forEach((handler) => {
          channel.on('postgres_changes', handler.options, handler.callback);
        });
      }

      if (config.onPresence) {
        channel.on('presence', { event: 'sync' }, config.onPresence);
      }

      // Subscribe with retry logic
      const subscription = channel.subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          this.channels.set(channelName, channel);
          this.connectionRetries.delete(channelName);
          if (config.onSubscribed) {
            config.onSubscribed();
          }
        } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') {
          const retryCount = this.connectionRetries.get(channelName) || 0;
          
          if (retryCount < this.maxRetries) {
            this.connectionRetries.set(channelName, retryCount + 1);
            
            // Exponential backoff
            const delay = this.retryDelay * Math.pow(2, retryCount);
            
            console.warn(
              `WebSocket connection failed for ${channelName}, retrying in ${delay}ms (attempt ${retryCount + 1}/${this.maxRetries})`
            );

            setTimeout(() => {
              this.removeChannel(supabase, channelName);
              this.getChannel(supabase, channelName, config);
            }, delay);
          } else {
            console.error(`WebSocket connection failed for ${channelName} after ${this.maxRetries} retries`);
            this.connectionRetries.delete(channelName);
            if (config.onError) {
              config.onError(status);
            }
          }
        }
      });

      return channel;
    } catch (error) {
      console.error(`Error creating channel ${channelName}:`, error);
      if (config.onError) {
        config.onError(error);
      }
      return null;
    }
  }

  /**
   * Remove a channel and clean up
   * @param {Object} supabase - Supabase client
   * @param {string} channelName - Channel name to remove
   */
  removeChannel(supabase, channelName) {
    if (this.channels.has(channelName)) {
      const channel = this.channels.get(channelName);
      try {
        if (supabase && supabase.removeChannel) {
          supabase.removeChannel(channel);
        }
      } catch (error) {
        console.warn(`Error removing channel ${channelName}:`, error);
      }
      this.channels.delete(channelName);
      this.connectionRetries.delete(channelName);
    }
  }

  /**
   * Remove all channels
   * @param {Object} supabase - Supabase client
   */
  removeAllChannels(supabase) {
    const channelNames = Array.from(this.channels.keys());
    channelNames.forEach((name) => {
      this.removeChannel(supabase, name);
    });
  }

  /**
   * Get connection status for a channel
   * @param {string} channelName - Channel name
   * @returns {string|null} Connection status
   */
  getChannelStatus(channelName) {
    const channel = this.channels.get(channelName);
    return channel ? channel.state : null;
  }
}

// Singleton instance
const realtimeManager = new RealtimeManager();

export default realtimeManager;

/**
 * Helper function to create a channel with proper cleanup
 * Can be used in useEffect hooks
 * @param {Object} supabase - Supabase client
 * @param {string} channelName - Unique channel name
 * @param {Object} config - Channel configuration
 * @returns {Function} Cleanup function
 */
export function useRealtimeChannel(supabase, channelName, config = {}) {
  if (typeof window === 'undefined') {
    // Server-side: return no-op cleanup
    return () => {};
  }

  // Create channel synchronously
  realtimeManager.getChannel(supabase, channelName, config);

  // Return cleanup function
  return () => {
    realtimeManager.removeChannel(supabase, channelName);
  };
}

/**
 * Create a simple channel subscription (synchronous version)
 * @param {Object} supabase - Supabase client
 * @param {string} channelName - Unique channel name
 * @param {Object} handlers - Event handlers
 * @returns {Function} Cleanup function
 */
export function createRealtimeSubscription(supabase, channelName, handlers = {}) {
  if (typeof window === 'undefined' || !supabase || !supabase.channel) {
    return () => {};
  }

  try {
    const channel = supabase.channel(channelName);

    // Set up postgres_changes handlers
    if (handlers.postgresChanges) {
      handlers.postgresChanges.forEach((handler) => {
        channel.on('postgres_changes', handler.options, handler.callback);
      });
    }

    // Subscribe with error handling
    channel.subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        if (handlers.onSubscribed) {
          handlers.onSubscribed();
        }
      } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') {
        if (handlers.onError) {
          handlers.onError(status);
        }
      }
    });

    return () => {
      try {
        supabase.removeChannel(channel);
      } catch (error) {
        console.warn(`Error removing channel ${channelName}:`, error);
      }
    };
  } catch (error) {
    console.error(`Error creating channel ${channelName}:`, error);
    if (handlers.onError) {
      handlers.onError(error);
    }
    return () => {};
  }
}

