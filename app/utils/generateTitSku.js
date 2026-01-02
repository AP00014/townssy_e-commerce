import { supabase } from '../../lib/supabase';

/**
 * Generates the next TIT SKU (TIT1, TIT2, TIT3, etc.) for admin-uploaded products
 * @returns {Promise<string>} The next available TIT SKU
 */
export async function generateNextTitSku() {
  try {
    // Fetch all products with SKUs that start with "TIT"
    const { data, error } = await supabase
      .from('products')
      .select('sku')
      .not('sku', 'is', null)
      .like('sku', 'TIT%');

    if (error) {
      console.error('Error fetching TIT SKUs:', error);
      // Fallback: if query fails, start from TIT1
      return 'TIT1';
    }

    // Extract numbers from existing TIT SKUs
    const numbers = [];
    if (data && data.length > 0) {
      data.forEach(product => {
        if (product.sku) {
          // Match TIT followed by digits
          const match = product.sku.match(/^TIT(\d+)$/i);
          if (match) {
            const num = parseInt(match[1], 10);
            if (!isNaN(num)) {
              numbers.push(num);
            }
          }
        }
      });
    }

    // Find the highest number
    const maxNumber = numbers.length > 0 ? Math.max(...numbers) : 0;

    // Generate next SKU
    const nextNumber = maxNumber + 1;
    return `TIT${nextNumber}`;
  } catch (error) {
    console.error('Error generating TIT SKU:', error);
    // Fallback: if anything fails, start from TIT1
    return 'TIT1';
  }
}

