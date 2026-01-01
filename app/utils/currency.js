/**
 * Format price in Ghana Cedis (₵)
 * @param {number|string} price - The price to format
 * @param {object} options - Formatting options
 * @returns {string} Formatted price string
 */
export function formatPrice(price, options = {}) {
  if (price == null || price === '') return '';
  
  const {
    showSymbol = true,
    decimals = 2,
    symbol = '₵'
  } = options;

  // Handle string prices (remove existing currency symbols)
  if (typeof price === 'string') {
    price = price.replace(/[₵$€£¥,]/g, '').trim();
    price = parseFloat(price);
  }

  if (isNaN(price)) return '';

  const formatted = price.toFixed(decimals);
  
  if (showSymbol) {
    return `${symbol}${formatted}`;
  }
  
  return formatted;
}

/**
 * Format currency for display (Ghana Cedis)
 * @param {number|string} amount - The amount to format
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount) {
  return formatPrice(amount, { symbol: '₵', decimals: 2 });
}

/**
 * Parse price string to number (removes currency symbols)
 * @param {string} priceString - Price string with currency symbol
 * @returns {number} Parsed price number
 */
export function parsePrice(priceString) {
  if (!priceString) return 0;
  if (typeof priceString === 'number') return priceString;
  
  return parseFloat(priceString.replace(/[₵$€£¥,\s]/g, '')) || 0;
}

