import { supabase } from '../../lib/supabase';

/**
 * Search products by query string
 * @param {string} query - Search query
 * @param {number} limit - Maximum number of results (default: 10 for autocomplete, 50 for full search)
 * @returns {Promise<Array>} Array of products matching the search
 */
export async function searchProducts(query, limit = 10) {
  try {
    if (!query || query.trim().length === 0) {
      return [];
    }

    const searchQuery = query.trim();
    console.log('Searching for:', searchQuery);

    // Check if supabase client is available
    if (!supabase || !supabase.from) {
      console.error('Supabase client not available');
      return [];
    }

    // Search products by name or description
    // Using ilike for case-insensitive partial matching
    const searchPattern = `%${searchQuery}%`;
    const { data: products, error } = await supabase
      .from('products')
      .select(`
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
        supplier_type,
        is_featured,
        is_active,
        verification_status,
        category:categories(id, name, slug)
      `)
      .eq('is_active', true)
      .eq('verification_status', 'approved')
      .or(`name.ilike.${searchPattern},description.ilike.${searchPattern}`)
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error searching products:', error);
      return [];
    }

    console.log('Search results:', products?.length || 0, 'products found');

    if (error) {
      console.error('Error searching products:', error);
      return [];
    }

    // Transform products to match ProductCard component format
    return (products || []).map(product => ({
      id: product.id,
      title: product.name,
      name: product.name,
      description: product.description,
      currentPrice: parseFloat(product.price),
      originalPrice: product.compare_price ? parseFloat(product.compare_price) : null,
      image: product.images && Array.isArray(product.images) && product.images.length > 0 
        ? product.images[0] 
        : '/placeholder-product.jpg',
      isFavorite: false,
      badge: product.is_featured ? 'Featured' : null,
      location: product.location,
      region: product.region,
      delivery: product.delivery,
      deliveryOptions: product.delivery_options,
      supplierWhatsapp: product.supplier_whatsapp,
      supplierType: product.supplier_type,
      category: product.category
    }));
  } catch (error) {
    console.error('Error in searchProducts:', error);
    return [];
  }
}

/**
 * Get search suggestions based on popular searches or product names
 * @param {string} query - Partial search query
 * @returns {Promise<Array>} Array of suggestion strings
 */
export async function getSearchSuggestions(query) {
  try {
    if (!query || query.trim().length < 2) {
      return [];
    }

    const searchQuery = query.trim();
    console.log('Getting suggestions for:', searchQuery);

    // Check if supabase client is available
    if (!supabase || !supabase.from) {
      console.error('Supabase client not available');
      return [];
    }
    
    // Get product names that match the query
    const { data: products, error } = await supabase
      .from('products')
      .select('name, category:categories(name)')
      .eq('is_active', true)
      .eq('verification_status', 'approved')
      .ilike('name', `%${searchQuery}%`)
      .limit(5);

    if (error) {
      console.error('Error getting search suggestions:', error);
      return [];
    }

    console.log('Suggestions found:', products?.length || 0);

    // Extract unique suggestions from product names and categories
    const suggestions = new Set();
    
    (products || []).forEach(product => {
      if (product.name) {
        suggestions.add(product.name);
      }
      if (product.category?.name) {
        suggestions.add(product.category.name);
      }
    });

    return Array.from(suggestions).slice(0, 5);
  } catch (error) {
    console.error('Error in getSearchSuggestions:', error);
    return [];
  }
}

