import { supabase } from '../../lib/supabase';

/**
 * Fetch products by category from Supabase
 * @param {string} categorySlug - The slug of the category
 * @param {number} limit - Maximum number of products to return (default: 10)
 * @returns {Promise<Array>} Array of products
 */
export async function fetchProductsByCategory(categorySlug, limit = 10) {
  try {
    // First, get the category by slug
    const { data: category, error: categoryError } = await supabase
      .from('categories')
      .select('id, name, slug')
      .eq('slug', categorySlug)
      .eq('is_active', true)
      .single();

    if (categoryError || !category) {
      console.error('Category not found:', categorySlug);
      return [];
    }

    // Fetch products for this category using the junction table
    // This supports both single category_id (backward compatible) and multiple categories
    // First, get product IDs from junction table
    const { data: junctionProducts, error: junctionError } = await supabase
      .from('product_categories')
      .select('product_id')
      .eq('category_id', category.id);

    // Also get products with category_id (backward compatibility)
    const { data: directProducts, error: directError } = await supabase
      .from('products')
      .select('id')
      .eq('category_id', category.id)
      .eq('is_active', true)
      .eq('verification_status', 'approved');

    // Combine product IDs (remove duplicates)
    const productIds = [
      ...new Set([
        ...(junctionProducts?.map(p => p.product_id) || []),
        ...(directProducts?.map(p => p.id) || [])
      ])
    ];

    if (productIds.length === 0) {
      return [];
    }

    // Fetch full product data
    const { data: products, error: productsError } = await supabase
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
        is_featured,
        is_active,
        verification_status,
        category:categories(id, name, slug)
      `)
      .in('id', productIds)
      .eq('is_active', true)
      .eq('verification_status', 'approved')
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(limit);

    if (productsError) {
      console.error('Error fetching products:', productsError);
      return [];
    }

    // Transform products to match ProductCard component format
    return products.map(product => ({
      id: product.id,
      title: product.name,
      currentPrice: parseFloat(product.price),
      originalPrice: product.compare_price ? parseFloat(product.compare_price) : null,
      image: product.images && Array.isArray(product.images) && product.images.length > 0 
        ? product.images[0] 
        : '/placeholder-product.jpg',
      isFavorite: false, // This would come from user favorites
      badge: product.is_featured ? 'Featured' : null,
      location: product.location,
      region: product.region,
      delivery: product.delivery,
      deliveryOptions: product.delivery_options,
      supplierWhatsapp: product.supplier_whatsapp,
      category: product.category
    }));
  } catch (error) {
    console.error('Error in fetchProductsByCategory:', error);
    return [];
  }
}

/**
 * Fetch products for multiple categories
 * @param {Array<string>} categorySlugs - Array of category slugs
 * @param {number} limitPerCategory - Maximum products per category
 * @returns {Promise<Object>} Object with category slugs as keys and products as values
 */
export async function fetchProductsForCategories(categorySlugs, limitPerCategory = 10) {
  const productsByCategory = {};

  await Promise.all(
    categorySlugs.map(async (slug) => {
      const products = await fetchProductsByCategory(slug, limitPerCategory);
      productsByCategory[slug] = products;
    })
  );

  return productsByCategory;
}

