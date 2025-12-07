import { createBrowserClient } from "@supabase/ssr";

// Supabase client configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create the Supabase client for the browser
// using createBrowserClient ensures cookies are handled correctly for Next.js middleware
let supabase;

if (typeof window !== "undefined") {
  // Client-side environment
  if (supabaseUrl && supabaseAnonKey) {
    supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
  } else {
    // Fallback for missing env vars
    console.warn("Supabase client initialized: Missing environment variables");
    supabase = null;
  }
} else {
  // Server-side environment (during build or SSR)
  // We can just return a basic client or null here, as strict server operations
  // should use createServerClient from @supabase/ssr
  if (supabaseUrl && supabaseAnonKey) {
    supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
  }
}

// Fallback mock if client creation failed (e.g. missing env vars)
if (!supabase) {
    supabase = {
      auth: {
        getSession: () => Promise.resolve({ data: { session: null } }),
        getUser: () => Promise.resolve({ data: { user: null } }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signUp: () => Promise.resolve({ data: null, error: null }),
        signInWithPassword: () => Promise.resolve({ data: null, error: null }),
        signOut: () => Promise.resolve({ error: null })
      },
      from: () => ({
        select: () => ({
          eq: () => ({
            single: () => Promise.resolve({ data: null, error: null }),
            order: () => ({
              limit: () => Promise.resolve({ data: [], error: null })
            })
          }),
          order: () => Promise.resolve({ data: [], error: null })
        }),
        update: () => ({
          eq: () => Promise.resolve({ data: null, error: null })
        }),
        insert: () => Promise.resolve({ data: null, error: null })
      })
    };
}

export { supabase };
