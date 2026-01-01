import { supabase } from '../../lib/supabase';

/**
 * Fetch regions/locations that have products from Supabase
 * Only returns regions that have at least one active, approved product
 * Optionally filters by category if categoryId is provided
 * @param {string|null} categoryId - Optional category ID to filter by
 * @returns {Promise<Array>} Array of regions with product counts
 */
export async function fetchRegionsWithProducts(categoryId = null) {
  try {
    let productIds = null;

    // If category filter is active, get product IDs for this category first
    if (categoryId) {
      // Get product IDs for this category from junction table
      const { data: categoryProducts, error: categoryError } = await supabase
        .from('product_categories')
        .select('product_id')
        .eq('category_id', categoryId);

      if (categoryError) {
        console.error('Error fetching category products:', categoryError);
      }

      // Also get products with direct category_id
      const { data: directProducts, error: directError } = await supabase
        .from('products')
        .select('id')
        .eq('category_id', categoryId)
        .eq('is_active', true)
        .eq('verification_status', 'approved');

      if (directError) {
        console.error('Error fetching direct category products:', directError);
      }

      // Combine product IDs
      productIds = [
        ...new Set([
          ...(categoryProducts?.map(p => p.product_id) || []),
          ...(directProducts?.map(p => p.id) || [])
        ])
      ];

      if (productIds.length === 0) {
        return { regions: [], locations: [], all: [] };
      }
    }

    // Build query
    let query = supabase
      .from('products')
      .select('region, location, id')
      .eq('is_active', true)
      .eq('verification_status', 'approved')
      .not('region', 'is', null);

    // Filter by product IDs if category filter is active
    if (productIds && productIds.length > 0) {
      query = query.in('id', productIds);
    }

    const { data: products, error } = await query;

    if (error) {
      console.error('Error fetching regions with products:', error);
      return [];
    }

    if (!products || products.length === 0) {
      return [];
    }

    // Group by region and count products
    const regionMap = new Map();
    const locationMap = new Map();

    products.forEach(product => {
      // Count by region
      if (product.region) {
        const region = product.region.trim();
        if (!regionMap.has(region)) {
          regionMap.set(region, {
            name: region,
            type: 'region',
            count: 0,
            locations: new Set()
          });
        }
        const regionData = regionMap.get(region);
        regionData.count++;
        if (product.location) {
          regionData.locations.add(product.location.trim());
        }
      }

      // Count by location (city)
      if (product.location) {
        const location = product.location.trim();
        if (!locationMap.has(location)) {
          locationMap.set(location, {
            name: location,
            type: 'location',
            count: 0,
            region: product.region?.trim() || null
          });
        }
        locationMap.get(location).count++;
      }
    });

    // Convert to array and sort
    const regions = Array.from(regionMap.values())
      .map(region => ({
        ...region,
        locations: Array.from(region.locations).sort()
      }))
      .sort((a, b) => {
        // Sort by count (descending), then by name
        if (b.count !== a.count) {
          return b.count - a.count;
        }
        return a.name.localeCompare(b.name);
      });

    const locations = Array.from(locationMap.values())
      .sort((a, b) => {
        // Sort by count (descending), then by name
        if (b.count !== a.count) {
          return b.count - a.count;
        }
        return a.name.localeCompare(b.name);
      });

    return {
      regions,
      locations,
      all: [
        ...regions.map(r => ({ ...r, displayName: r.name, isRegion: true })),
        ...locations.map(l => ({ ...l, displayName: l.name, isRegion: false }))
      ].sort((a, b) => {
        // Sort by count (descending), then by name
        if (b.count !== a.count) {
          return b.count - a.count;
        }
        return a.displayName.localeCompare(b.displayName);
      })
    };
  } catch (error) {
    console.error('Error in fetchRegionsWithProducts:', error);
    return { regions: [], locations: [], all: [] };
  }
}

