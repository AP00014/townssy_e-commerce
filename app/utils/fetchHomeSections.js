import { supabase } from '../../lib/supabase';

/**
 * Fetch all home sections from the database
 * @param {Object} options - Fetch options
 * @param {boolean} options.activeOnly - If true, only fetch active sections (default: false)
 * @param {string} options.orderBy - Column to order by (default: 'sort_order')
 * @param {boolean} options.ascending - Order direction (default: true)
 * @returns {Promise<Array>} Array of home sections
 */
export async function fetchHomeSections(options = {}) {
  const {
    activeOnly = false,
    orderBy = 'sort_order',
    ascending = true
  } = options;

  try {
    let query = supabase
      .from('home_sections')
      .select('*')
      .order(orderBy, { ascending });

    if (activeOnly) {
      query = query.eq('is_active', true);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching home sections:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in fetchHomeSections:', error);
    return [];
  }
}

/**
 * Fetch active home sections only (for homepage display)
 * @returns {Promise<Array>} Array of active home sections
 */
export async function fetchActiveHomeSections() {
  return fetchHomeSections({ activeOnly: true });
}

/**
 * Fetch a single home section by name
 * @param {string} sectionName - The name/slug of the section
 * @returns {Promise<Object|null>} Section object or null
 */
export async function fetchHomeSectionByName(sectionName) {
  try {
    const { data, error } = await supabase
      .from('home_sections')
      .select('*')
      .eq('name', sectionName)
      .eq('is_active', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned
        return null;
      }
      console.error('Error fetching home section:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in fetchHomeSectionByName:', error);
    return null;
  }
}

/**
 * Fetch products for a specific home section
 * @param {string} sectionName - The name/slug of the section
 * @param {number} limit - Maximum number of products to return
 * @returns {Promise<Array>} Array of products
 */
export async function fetchProductsForSection(sectionName, limit = 10) {
  try {
    // First get the section
    const section = await fetchHomeSectionByName(sectionName);
    if (!section) {
      return [];
    }

    // Fetch products in this section
    const { data, error } = await supabase
      .from('product_section_placements')
      .select(`
        sort_order,
        is_pinned,
        products (
          id,
          name,
          description,
          price,
          compare_price,
          images,
          location,
          region,
          delivery,
          delivery_options,
          supplier_whatsapp,
          is_featured,
          is_active,
          verification_status
        )
      `)
      .eq('section_id', section.id)
      .eq('products.is_active', true)
      .eq('products.verification_status', 'approved')
      .order('is_pinned', { ascending: false })
      .order('sort_order', { ascending: true })
      .limit(limit);

    if (error) {
      console.error('Error fetching products for section:', error);
      throw error;
    }

    // Transform the data
    return (data || [])
      .map(item => ({
        ...item.products,
        section_sort_order: item.sort_order,
        is_pinned: item.is_pinned
      }))
      .filter(product => product.id); // Remove any null products
  } catch (error) {
    console.error('Error in fetchProductsForSection:', error);
    return [];
  }
}

