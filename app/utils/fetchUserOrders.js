import { supabase } from '../../lib/supabase';

/**
 * Fetch orders for a specific user
 * @param {string} userId - The user's profile ID
 * @returns {Promise<Array>} Array of orders
 */
export async function fetchUserOrders(userId) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        id,
        order_number,
        total_amount,
        status,
        payment_status,
        verification_status,
        items,
        created_at,
        updated_at,
        vendor:vendors(
          id,
          business_name,
          logo_url
        )
      `)
      .eq('buyer_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user orders:', error);
      throw error;
    }

    return (data || []).map(order => ({
      id: order.id,
      orderNumber: order.order_number,
      total: parseFloat(order.total_amount),
      status: order.status,
      paymentStatus: order.payment_status,
      verificationStatus: order.verification_status,
      items: order.items || [],
      itemCount: Array.isArray(order.items) ? order.items.length : 0,
      vendor: order.vendor,
      createdAt: order.created_at,
      updatedAt: order.updated_at,
      date: new Date(order.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }));
  } catch (error) {
    console.error('Error in fetchUserOrders:', error);
    return [];
  }
}

