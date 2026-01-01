import { supabase } from '../../lib/supabase';

/**
 * Fetch admin profile by ID
 * @param {string} adminId - The admin's profile ID
 * @returns {Promise<Object|null>} Admin profile or null
 */
export async function fetchAdminProfile(adminId) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, avatar_url, email, role')
      .eq('id', adminId)
      .or('role.eq.super_admin,role.eq.admin,role.eq.moderator')
      .maybeSingle();

    if (error) {
      console.error('Error fetching admin profile:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in fetchAdminProfile:', error);
    return null;
  }
}

