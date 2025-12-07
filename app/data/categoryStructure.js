/**
 * Product Category Structure
 * Primary: Suppliers OR Manufacturers
 * Secondary: Product categories (Electronics, Fashion, etc.)
 */

// Primary categories for navigation tabs
export const primaryCategories = [
  {
    id: 1,
    name: "Suppliers",
    slug: "suppliers",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop",
  },
  {
    id: 2,
    name: "Manufacturers",
    slug: "manufacturers",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop",
  },
];

// Secondary categories (product types)
export const secondaryCategories = [
  {
    id: 1,
    name: "Electronics",
    slug: "electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop",
  },
  {
    id: 2,
    name: "Fashion",
    slug: "fashion",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop",
  },
  {
    id: 3,
    name: "Home & Garden",
    slug: "home-garden",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop",
  },
  {
    id: 4,
    name: "Beauty & Health",
    slug: "beauty-health",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=200&h=200&fit=crop",
  },
  {
    id: 5,
    name: "Sports & Fitness",
    slug: "sports-fitness",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop",
  },
  {
    id: 6,
    name: "Pet Supplies",
    slug: "pet-supplies",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop",
  },
  {
    id: 7,
    name: "Kitchen",
    slug: "kitchen",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=200&h=200&fit=crop",
  },
  {
    id: 8,
    name: "Automotive",
    slug: "automotive",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=200&h=200&fit=crop",
  },
  {
    id: 9,
    name: "Office Supplies",
    slug: "office-supplies",
    image: "https://images.unsplash.com/photo-1583484963886-cce23f3a5878?w=200&h=200&fit=crop",
  },
  {
    id: 10,
    name: "Power Transmission",
    slug: "power-transmission",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop",
  },
  {
    id: 11,
    name: "Safety Equipment",
    slug: "safety-equipment",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=200&h=200&fit=crop",
  },
  {
    id: 12,
    name: "Material Handling",
    slug: "material-handling",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop",
  },
];

// Shuffle array utility
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Randomly assign provider type to products (changes on each call)
const assignProviderTypes = (products) => {
  return products.map((product) => ({
    ...product,
    providerType: Math.random() > 0.5 ? "supplier" : "manufacturer",
    secondaryCategory: mapToSecondaryCategory(product.category),
  }));
};

// Map old category to new secondary category
const mapToSecondaryCategory = (oldCategory) => {
  const categoryMap = {
    Electronics: "electronics",
    Fashion: "fashion",
    Beauty: "beauty-health",
    Home: "home-garden",
    Kitchen: "kitchen",
    Sports: "sports-fitness",
    "Pet Supplies": "pet-supplies",
    Automotive: "automotive",
    Office: "office-supplies",
    General: "electronics",
    Accessories: "fashion",
    Travel: "home-garden",
    Security: "safety-equipment",
  };

  return categoryMap[oldCategory] || "electronics";
};

// Get products by primary category (Suppliers or Manufacturers)
export const getProductsByPrimaryCategory = (
  allProducts,
  primaryCategory
) => {
  // Randomly assign provider types on each call
  const productsWithProviders = assignProviderTypes(allProducts);

  if (primaryCategory === "all") {
    return shuffleArray(productsWithProviders);
  }

  // Filter by provider type
  const filtered = productsWithProviders.filter(
    (product) => product.providerType === primaryCategory.toLowerCase()
  );

  return shuffleArray(filtered);
};

// Get products by both primary and secondary category
export const getProductsByCategory = (
  allProducts,
  primaryCategory,
  secondaryCategory = null
) => {
  // First filter by primary category
  let filtered = getProductsByPrimaryCategory(allProducts, primaryCategory);

  // Then filter by secondary category if provided
  if (secondaryCategory && secondaryCategory !== "all") {
    filtered = filtered.filter(
      (product) => product.secondaryCategory === secondaryCategory
    );
  }

  return shuffleArray(filtered);
};

// Get random mix of products from both suppliers and manufacturers
export const getMixedProducts = (allProducts, count = 10) => {
  const productsWithProviders = assignProviderTypes(allProducts);
  return shuffleArray(productsWithProviders).slice(0, count);
};

// Get products split by provider type
export const getSplitProducts = (allProducts) => {
  const productsWithProviders = assignProviderTypes(allProducts);

  const suppliers = productsWithProviders.filter(
    (p) => p.providerType === "supplier"
  );
  const manufacturers = productsWithProviders.filter(
    (p) => p.providerType === "manufacturer"
  );

  return {
    suppliers: shuffleArray(suppliers),
    manufacturers: shuffleArray(manufacturers),
    all: shuffleArray(productsWithProviders),
  };
};

// Helper function to get all secondary categories for a primary category
export const getSecondaryCategoriesFor = (primarySlug) => {
  // Returns all secondary categories available under a primary category
  return secondaryCategories;
};
