import { supabase } from '../../lib/supabase';

/**
 * Fetch categories that have products from Supabase
 * Only returns categories that have at least one active, approved product
 * @returns {Promise<Array>} Array of categories with product counts
 */
export async function fetchCategoriesWithProducts() {
  try {
    // Get unique category IDs from product_categories junction table
    // where products are active and approved
    const { data: junctionCategories, error: junctionError } = await supabase
      .from('product_categories')
      .select(`
        category_id,
        products!inner(
          id,
          is_active,
          verification_status
        )
      `)
      .eq('products.is_active', true)
      .eq('products.verification_status', 'approved');

    // Get unique category IDs from direct category_id relationship
    const { data: directCategories, error: directError } = await supabase
      .from('products')
      .select('category_id')
      .eq('is_active', true)
      .eq('verification_status', 'approved')
      .not('category_id', 'is', null);

    if (junctionError) {
      console.error('Error fetching junction categories:', junctionError);
    }
    if (directError) {
      console.error('Error fetching direct categories:', directError);
    }

    // Collect unique category IDs
    const categoryIds = new Set();
    
    if (junctionCategories) {
      junctionCategories.forEach(item => {
        if (item.category_id) {
          categoryIds.add(item.category_id);
        }
      });
    }

    if (directCategories) {
      directCategories.forEach(item => {
        if (item.category_id) {
          categoryIds.add(item.category_id);
        }
      });
    }

    if (categoryIds.size === 0) {
      return [];
    }

    // Fetch full category details for these IDs
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('id, name, slug, image_url, is_active, sort_order, parent_id')
      .in('id', Array.from(categoryIds))
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
      .order('name', { ascending: true });

    if (categoriesError) {
      console.error('Error fetching category details:', categoriesError);
      return [];
    }

    return categories || [];
  } catch (error) {
    console.error('Error in fetchCategoriesWithProducts:', error);
    return [];
  }
}

