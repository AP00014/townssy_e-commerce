import { supabase } from '../../lib/supabase';

/**
 * Transform product data to match ProductCard component format
 */
function transformProduct(product) {
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
  
  return {
    id: product.id,
    title: product.name,
    currentPrice: parseFloat(product.price),
    originalPrice: product.compare_price ? parseFloat(product.compare_price) : null,
    image: imageUrl,
    isFavorite: false, // This would come from user favorites
    badge: product.is_featured ? 'Featured' : null,
    location: product.location,
    region: product.region,
    delivery: product.delivery,
    deliveryOptions: product.delivery_options,
    supplierWhatsapp: product.supplier_whatsapp,
    supplierType: product.supplier_type,
    category: product.category
  };
}

/**
 * Fetch featured products
 */
export async function fetchFeaturedProducts(limit = 10) {
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
      .eq('is_featured', true)
      .eq('is_active', true)
      .eq('verification_status', 'approved')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return (data || []).map(transformProduct);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

/**
 * Fetch new arrivals (recently created products)
 */
export async function fetchNewArrivals(limit = 10) {
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
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return (data || []).map(transformProduct);
  } catch (error) {
    console.error('Error fetching new arrivals:', error);
    return [];
  }
}

/**
 * Fetch top deals (products with compare_price - discounted)
 */
export async function fetchTopDeals(limit = 10) {
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
      .not('compare_price', 'is', null)
      .eq('is_active', true)
      .eq('verification_status', 'approved')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return (data || []).map(transformProduct);
  } catch (error) {
    console.error('Error fetching top deals:', error);
    return [];
  }
}

/**
 * Fetch best selling products (by sales_count)
 */
export async function fetchBestSelling(limit = 10) {
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
        location,
        region,
        delivery,
        delivery_options,
        supplier_whatsapp,
        supplier_type,
        is_featured,
        is_active,
        verification_status,
        sales_count,
        category:categories(id, name, slug)
      `)
      .eq('is_active', true)
      .eq('verification_status', 'approved')
      .order('sales_count', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return (data || []).map(transformProduct);
  } catch (error) {
    console.error('Error fetching best selling products:', error);
    return [];
  }
}

/**
 * Fetch products for home page sections
 */
export async function fetchHomePageProducts() {
  try {
    const [featured, newArrivals, topDeals, bestSelling] = await Promise.all([
      fetchFeaturedProducts(8),
      fetchNewArrivals(8),
      fetchTopDeals(8),
      fetchBestSelling(8)
    ]);

    return {
      featured,
      newArrivals,
      topDeals,
      bestSelling
    };
  } catch (error) {
    console.error('Error fetching home page products:', error);
    return {
      featured: [],
      newArrivals: [],
      topDeals: [],
      bestSelling: []
    };
  }
}

/**
 * Fetch a single product by ID
 */
export async function fetchProductById(productId) {
  try {
    // First fetch the product
    const { data: product, error: productError } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(id, name, slug),
        vendor:vendors(
          id,
          business_name,
          logo_url,
          verification_status,
          user_id
        )
      `)
      .eq('id', productId)
      .eq('is_active', true)
      .eq('verification_status', 'approved')
      .single();
    
    // Note: vendor_name and admin_name are now included in the * selector

    if (productError) throw productError;
    if (!product) return null;

    // If product has no vendor_id, it was created by an admin
    // Fetch admin info if verified_by exists
    let adminCreator = null;
    if (!product.vendor_id && product.verified_by) {
      const { data: admin, error: adminError } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url, email, role')
        .eq('id', product.verified_by)
        .single();

      if (!adminError && admin) {
        adminCreator = admin;
      }
    }

    // If vendor exists, fetch vendor's profile info
    if (product.vendor && product.vendor.user_id) {
      const { data: vendorProfile, error: vendorProfileError } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url')
        .eq('id', product.vendor.user_id)
        .single();

      if (!vendorProfileError && vendorProfile) {
        product.vendor.profiles = vendorProfile;
      }
    }

    return {
      ...product,
      admin_creator: adminCreator
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

/**
 * Fetch all active product IDs for static generation
 */
export async function fetchAllProductIds() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('id')
      .eq('is_active', true)
      .eq('verification_status', 'approved');

    if (error) throw error;
    return (data || []).map(p => p.id);
  } catch (error) {
    console.error('Error fetching product IDs:', error);
    return [];
  }
}

