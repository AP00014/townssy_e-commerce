import { supabase } from '../../lib/supabase';

/**
 * Fetch products created by a specific admin (products with no vendor_id and verified_by = adminId)
 * @param {string} adminId - The admin's profile ID
 * @returns {Promise<Array>} Array of products
 */
export async function fetchProductsByAdminId(adminId) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        id,
        name,
        description,
        price,
        compare_price,
        images,
        is_featured,
        is_active,
        verification_status,
        supplier_type,
        category:categories(id, name, slug)
      `)
      .is('vendor_id', null)
      .eq('verified_by', adminId)
      .eq('is_active', true)
      .eq('verification_status', 'approved')
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products by admin:', error);
      return [];
    }

    // Transform products to match ProductCard format
    return (data || []).map(product => ({
      id: product.id,
      title: product.name,
      name: product.name,
      currentPrice: parseFloat(product.price),
      originalPrice: product.compare_price ? parseFloat(product.compare_price) : null,
      image: product.images && Array.isArray(product.images) && product.images.length > 0
        ? product.images[0]
        : '/placeholder-product.jpg',
      isFavorite: false,
      badge: product.is_featured ? 'Featured' : null,
      category: product.category
    }));
  } catch (error) {
    console.error('Error in fetchProductsByAdminId:', error);
    return [];
  }
}

