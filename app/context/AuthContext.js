"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);

      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        // Reset profile if no user
        setProfile(null);
      }

      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);

      if (session?.user) {
        // If we already have a profile and the ID matches, we might keep it, but refetching is safer
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    // Listen for PROFILE changes (Realtime Role Updates)
    // This answers the request: "always be checking for user roles in the database"
    let cleanupProfileChannel = null;
    
    if (user?.id && supabase && typeof window !== 'undefined') {
      try {
        const { createRealtimeSubscription } = require('../utils/realtimeManager');
        
        cleanupProfileChannel = createRealtimeSubscription(supabase, `profile-updates-${user.id}`, {
          postgresChanges: [
            {
              options: {
                event: "UPDATE",
                schema: "public",
                table: "profiles",
                filter: `id=eq.${user.id}`
              },
              callback: (payload) => {
                // If the update serves the current user, update local state
                console.log("Profile updated realtime:", payload);
                if (payload.new) {
                  setProfile(payload.new);
                }
              }
            }
          ]
        });
      } catch (error) {
        console.warn("Realtime subscription failed:", error);
      }
    }

    return () => {
      subscription.unsubscribe();
      if (cleanupProfileChannel) {
        cleanupProfileChannel();
      }
    };
  }, [user?.id]); // Add dependency on user.id to recreate subscription when user changes

  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching profile:", error);
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const signUp = async (email, password, userData = {}) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });

      if (error) throw error;

      // If signup successful and we have a user, ensure profile exists
      if (data?.user) {
        try {
          // Check if profile exists
          const { data: existingProfile } = await supabase
            .from("profiles")
            .select("id")
            .eq("id", data.user.id)
            .single();

          // If profile doesn't exist, create it
          if (!existingProfile) {
            const { error: profileError } = await supabase
              .from("profiles")
              .insert({
                id: data.user.id,
                email: data.user.email,
                full_name: userData.full_name || "",
                username: userData.username || "",
                phone: userData.phone || "",
                role: "user",
              });

            if (profileError) {
              console.error("Error creating profile:", profileError);
              // Don't throw here as auth signup was successful
            }
          }
        } catch (profileCheckError) {
          console.error("Error checking/creating profile:", profileCheckError);
        }
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const updateProfile = async (updates) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", user.id)
        .select()
        .single();

      if (error) throw error;

      setProfile(data);
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const resetPasswordForEmail = async (email) => {
    try {
      // Get the current origin (client-side only)
      const redirectTo = typeof window !== "undefined" 
        ? `${window.location.origin}/auth/reset-password`
        : `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/reset-password`;
      
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const updatePassword = async (newPassword) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    resetPasswordForEmail,
    updatePassword,
    isAuthenticated: !!user,
    isSuperAdmin: profile?.role === "super_admin",
    isAdmin: profile?.role === "admin",
    isModerator: profile?.role === "moderator",
    isVendor: profile?.role === "vendor",
    isAgent: profile?.role === "agent",
    isUser: profile?.role === "user",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
