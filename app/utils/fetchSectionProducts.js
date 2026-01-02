import { supabase } from '../../lib/supabase';

/**
 * Transform product data to match ProductCard component format
 */
function transformProduct(product) {
  if (!product) return null;
  
  // Extract first valid image URL
  let imageUrl = '/placeholder-product.jpg';
  
  if (product.images) {
    if (Array.isArray(product.images) && product.images.length > 0) {
      // Get first image from array
      const firstImage = product.images[0];
      // Ensure it's a string and not empty
      if (typeof firstImage === 'string' && firstImage.trim()) {
        imageUrl = firstImage.trim();
      }
    } else if (typeof product.images === 'string' && product.images.trim()) {
      // Handle case where images might be a single string
      imageUrl = product.images.trim();
    }
  }
  
  // Optimized: Only return fields needed for ProductCard display
  return {
    id: product.id,
    title: product.name,
    currentPrice: parseFloat(product.price),
    originalPrice: product.compare_price ? parseFloat(product.compare_price) : null,
    image: imageUrl,
    isFavorite: false, // This would come from user favorites
    badge: product.is_featured ? 'Featured' : null,
    category: product.category // Keep category for filtering
  };
}

/**
 * Fetch products for a home section by section ID
 * @param {string} sectionId - The ID of the section
 * @param {number} limit - Maximum number of products to return (default: 10, use null or very high number for all)
 * @returns {Promise<Array>} Array of transformed products
 */
export async function fetchProductsForSectionById(sectionId, limit = 10) {
  try {
    let query = supabase
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
          supplier_type,
          is_featured,
          is_active,
          verification_status,
          category:categories(id, name, slug)
        )
      `)
      .eq('section_id', sectionId)
      .eq('products.is_active', true)
      .eq('products.verification_status', 'approved')
      .order('is_pinned', { ascending: false })
      .order('sort_order', { ascending: true });

    // Only apply limit if it's provided and is a reasonable number
    // For "all products", pass null or undefined
    if (limit != null && limit > 0) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching products for section:', error);
      throw error;
    }

    // Transform the data
    return (data || [])
      .map(item => transformProduct(item.products))
      .filter(product => product !== null); // Remove any null products
  } catch (error) {
    console.error('Error in fetchProductsForSectionById:', error);
    return [];
  }
}

/**
 * Fetch all active sections with their products (OPTIMIZED - parallel queries with batching)
 * @returns {Promise<Array>} Array of sections with products
 */
export async function fetchActiveSectionsWithProducts() {
  try {
    // Step 1: Fetch all active sections (fast, single query) - include layout_config for special sections
    const { data: sections, error: sectionsError } = await supabase
      .from('home_sections')
      .select('id, name, display_name, description, section_type, is_active, sort_order, max_products, layout_config')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (sectionsError) throw sectionsError;

    if (!sections || sections.length === 0) {
      return [];
    }

    // Step 2: Fetch all products for all sections in parallel (optimized batch query)
    // Instead of one query per section, we fetch all placements at once
    const sectionIds = sections.map(s => s.id);
    
    const { data: allPlacements, error: placementsError } = await supabase
      .from('product_section_placements')
      .select(`
        section_id,
        sort_order,
        is_pinned,
        products!inner(
          id,
          name,
          price,
          compare_price,
          images,
          is_featured,
          is_active,
          verification_status,
          category:categories(id, name, slug)
        )
      `)
      .in('section_id', sectionIds)
      .eq('products.is_active', true)
      .eq('products.verification_status', 'approved')
      .order('is_pinned', { ascending: false })
      .order('sort_order', { ascending: true });

    if (placementsError) {
      console.error('Error fetching placements:', placementsError);
      // Fallback to individual queries if batch fails
      return await fetchSectionsWithProductsFallback(sections);
    }

    // Step 3: Group products by section
    const sectionsMap = new Map();
    
    // Initialize all sections
    sections.forEach(section => {
      sectionsMap.set(section.id, {
        ...section,
        products: []
      });
    });

    // Group placements by section and apply limits
    if (allPlacements) {
      allPlacements.forEach(placement => {
        const sectionId = placement.section_id;
        const product = placement.products;
        
        if (!product || !sectionsMap.has(sectionId)) return;
        
        const sectionData = sectionsMap.get(sectionId);
        const limit = sectionData.max_products || 10;
        
        // Only add products up to the limit
        if (sectionData.products.length < limit) {
          sectionData.products.push(transformProduct(product));
        }
      });
    }

    // Convert map to array (already sorted by sort_order from sections query)
    return Array.from(sectionsMap.values());
  } catch (error) {
    console.error('Error fetching active sections with products:', error);
    return [];
  }
}

/**
 * Fallback method: Fetch products for each section individually
 * Used if batch query fails
 */
async function fetchSectionsWithProductsFallback(sections) {
  const sectionsWithProducts = await Promise.all(
    sections.map(async (section) => {
      const limit = section.max_products || 10;
      const products = await fetchProductsForSectionById(section.id, limit);
      return {
        ...section,
        products
      };
    })
  );
  return sectionsWithProducts;
}

