import { supabase } from '../../lib/supabase';

/**
 * Create an order from cart items
 * @param {string} userId - The user's profile ID
 * @param {Array} cartItems - Array of cart items
 * @param {number} subtotal - Cart subtotal
 * @param {number} shipping - Shipping cost
 * @param {number} tax - Tax amount
 * @param {number} total - Total amount
 * @returns {Promise<Object>} Created order object
 */
export async function createOrder(userId, cartItems, subtotal, shipping, tax, total) {
  try {
    // Validate cart items and check stock
    const validatedItems = [];
    const errors = [];

    for (const item of cartItems) {
      // Fetch current stock from database
      const { data: productData, error: productError } = await supabase
        .from('products')
        .select('id, name, price, stock_quantity, is_active, verification_status')
        .eq('id', item.id)
        .single();

      if (productError || !productData) {
        errors.push(`Product ${item.title} is no longer available`);
        continue;
      }

      // Check if product is active and approved
      if (!productData.is_active || productData.verification_status !== 'approved') {
        errors.push(`Product ${item.title} is not available for purchase`);
        continue;
      }

      // Check stock
      const currentStock = productData.stock_quantity || 0;
      if (currentStock < item.quantity) {
        errors.push(`Only ${currentStock} available for ${item.title}. You requested ${item.quantity}.`);
        continue;
      }

      // Validate price hasn't changed significantly (within 10%)
      const priceDiff = Math.abs(productData.price - item.currentPrice) / item.currentPrice;
      if (priceDiff > 0.1) {
        errors.push(`Price for ${item.title} has changed. Please review your cart.`);
        continue;
      }

      validatedItems.push({
        product_id: item.id,
        product_name: item.title || item.name,
        quantity: item.quantity,
        unit_price: parseFloat(item.currentPrice),
        total_price: parseFloat(item.currentPrice) * item.quantity,
        image: item.image,
        sku: item.sku,
        vendor_id: item.vendorId,
        vendor_name: item.vendorName,
        admin_name: item.adminName,
        is_admin_created: item.isAdminCreated || false
      });
    }

    if (errors.length > 0) {
      return {
        success: false,
        errors: errors,
        order: null
      };
    }

    if (validatedItems.length === 0) {
      return {
        success: false,
        errors: ['No valid items in cart'],
        order: null
      };
    }

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create order
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        buyer_id: userId,
        order_number: orderNumber,
        items: validatedItems,
        subtotal: parseFloat(subtotal),
        shipping_cost: parseFloat(shipping),
        tax_amount: parseFloat(tax),
        total_amount: parseFloat(total),
        status: 'pending',
        payment_status: 'pending',
        verification_status: 'pending'
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      return {
        success: false,
        errors: [orderError.message || 'Failed to create order'],
        order: null
      };
    }

    // Update product stock quantities
    for (const item of validatedItems) {
      await supabase.rpc('decrement_stock', {
        product_id: item.product_id,
        quantity: item.quantity
      }).catch(async () => {
        // If RPC doesn't exist, use direct update
        const { data: currentProduct } = await supabase
          .from('products')
          .select('stock_quantity')
          .eq('id', item.product_id)
          .single();

        if (currentProduct) {
          await supabase
            .from('products')
            .update({
              stock_quantity: Math.max(0, (currentProduct.stock_quantity || 0) - item.quantity)
            })
            .eq('id', item.product_id);
        }
      });
    }

    return {
      success: true,
      errors: [],
      order: orderData
    };
  } catch (error) {
    console.error('Error in createOrder:', error);
    return {
      success: false,
      errors: [error.message || 'An unexpected error occurred'],
      order: null
    };
  }
}

