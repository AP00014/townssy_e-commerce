import { supabase } from '../../lib/supabase';

/**
 * Fetch products by supplier type (supplier or manufacturer)
 * @param {string} supplierType - Either 'supplier' or 'manufacturer'
 * @param {number} limit - Maximum number of products to return (default: 50)
 * @param {number} offset - Offset for pagination (default: 0)
 * @returns {Promise<Object>} Object with products array and total count
 */
export async function fetchProductsBySupplierType(supplierType, limit = 50, offset = 0) {
  try {
    if (!supplierType || (supplierType !== 'supplier' && supplierType !== 'manufacturer')) {
      console.error('Invalid supplier type:', supplierType);
      return { products: [], total: 0 };
    }

    // Fetch products with supplier_type filter
    const { data: products, error: productsError, count } = await supabase
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
      `, { count: 'exact' })
      .eq('supplier_type', supplierType)
      .eq('is_active', true)
      .eq('verification_status', 'approved')
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (productsError) {
      console.error('Error fetching products by supplier type:', productsError);
      return { products: [], total: 0 };
    }

    // Transform products to match ProductCard component format
    const transformedProducts = (products || []).map(product => ({
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
      supplierType: product.supplier_type,
      category: product.category
    }));

    return {
      products: transformedProducts,
      total: count || 0
    };
  } catch (error) {
    console.error('Error in fetchProductsBySupplierType:', error);
    return { products: [], total: 0 };
  }
}

