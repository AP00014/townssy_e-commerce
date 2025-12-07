export const categories = [
  {
    id: 1,
    name: "Suppliers",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop",
  },
  {
    id: 2,
    name: "Manufacturers",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop",
  },
  {
    id: 3,
    name: "Power Transmission",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop",
  },
  {
    id: 4,
    name: "Safety",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=200&h=200&fit=crop",
  },
  {
    id: 5,
    name: "Pet Supplies",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop",
  },
  {
    id: 6,
    name: "Testing Instrument & Equipment",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop",
  },
  {
    id: 7,
    name: "Material Handling",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop",
  },
  {
    id: 8,
    name: "Fabrication Services",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop",
  },
  {
    id: 9,
    name: "Rubber & Plastics",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=200&h=200&fit=crop",
  },
  {
    id: 10,
    name: "Purchasing agent",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop",
  },
  {
    id: 11,
    name: "Business Services",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop",
  },
  {
    id: 12,
    name: "Electronics",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop",
  },
  {
    id: 13,
    name: "Fashion",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop",
  },
  {
    id: 14,
    name: "Home",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop",
  },
  {
    id: 15,
    name: "Kitchen",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=200&h=200&fit=crop",
  },
  {
    id: 16,
    name: "Sports",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop",
  },
];

export const suppliers = [
  { id: 1, name: "Premium Suppliers" },
  { id: 2, name: "Global Trade Co." },
  { id: 3, name: "Quality Goods Ltd." },
  { id: 4, name: "Best Deals Inc." },
  { id: 5, name: "Trusted Merchants" },
];

export const manufacturers = [
  { id: 1, name: "TechCorp Industries" },
  { id: 2, name: "Fashion Forward" },
  { id: 3, name: "Home Essentials Co." },
  { id: 4, name: "Kitchen Pro" },
  { id: 5, name: "Sports Gear Inc." },
];

export const featuredProducts = [
  {
    id: 1,
    title: "NEW Ulefone Watch",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    currentPrice: "$30.0",
    originalPrice: "$40.0",
    isFavorite: false,
    sizes: [{ size: "One Size", available: true }],
    specifications: {
      dimensions: "1.5 x 1.5 x 0.5 inches",
      weight: "0.2 lbs",
      material: "Plastic and Metal",
      warranty: "1 year",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      shippingOptions: ["Standard", "Express"],
      returnPolicy: "30-day return policy",
    },
    reviews: [
      {
        rating: 4.5,
        author: "John Doe",
        date: "2023-10-01",
        comment: "Great smartwatch!",
        verified: true,
      },
    ],
    averageRating: 4.5,
    reviewCount: 1,
    labels: [{ type: "sale", text: "Sale" }],
    category: "Electronics",
    providerType: "manufacturer",
    secondaryCategory: "electronics",
    tags: ["smart", "watch", "fitness"],
  },
  {
    id: 2,
    title: "White Jumpsuit",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
    currentPrice: "₹ 1,100",
    originalPrice: "₹ 2,200",
    isFavorite: false,
    sizes: [
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: false },
    ],
    specifications: {
      dimensions: "36 x 28 x 1 inches",
      weight: "1 lbs",
      material: "Cotton",
      warranty: "N/A",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "3-5 business days",
      shippingOptions: ["Standard", "Express"],
      returnPolicy: "30-day return policy",
    },
    reviews: [
      {
        rating: 4.0,
        author: "Jane Smith",
        date: "2023-09-15",
        comment: "Stylish and comfortable!",
        verified: true,
      },
    ],
    averageRating: 4.0,
    reviewCount: 1,
    labels: [{ type: "sale", text: "Sale" }],
    category: "Fashion",
    providerType: "supplier",
    secondaryCategory: "fashion",
    tags: ["clothing", "jumpsuit", "women"],
  },
  {
    id: 3,
    title: "Vitamin C Serum",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
    currentPrice: "₹ 2,453",
    originalPrice: "₹ 4,700",
    isFavorite: false,
    sizes: [{ size: "One Size", available: true }],
    specifications: {
      dimensions: "2 x 2 x 4 inches",
      weight: "0.3 lbs",
      material: "Glass and Plastic",
      warranty: "N/A",
    },
    delivery: {
      freeShipping: false,
      estimatedDelivery: "5-7 business days",
      shippingOptions: ["Standard"],
      returnPolicy: "30-day return policy",
    },
    reviews: [
      {
        rating: 4.8,
        author: "Alice Johnson",
        date: "2023-08-20",
        comment: "Amazing for skin!",
        verified: true,
      },
    ],
    averageRating: 4.8,
    reviewCount: 1,
    labels: [{ type: "sale", text: "Sale" }],
    category: "Beauty",
    providerType: "supplier",
    secondaryCategory: "beauty-health",
    tags: ["skincare", "serum", "vitamin c"],
  },
  {
    id: 4,
    title: "Strip T-shirt",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    currentPrice: "₹ 1,700",
    originalPrice: "₹ 3,400",
    isFavorite: false,
    sizes: [
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: false },
    ],
    specifications: {
      dimensions: "28 x 20 x 1 inches",
      weight: "0.5 lbs",
      material: "Cotton",
      warranty: "N/A",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      shippingOptions: ["Standard", "Express"],
      returnPolicy: "30-day return policy",
    },
    reviews: [
      {
        rating: 4.2,
        author: "Bob Wilson",
        date: "2023-07-10",
        comment: "Comfortable fit!",
        verified: true,
      },
    ],
    averageRating: 4.2,
    reviewCount: 1,
    labels: [{ type: "sale", text: "Sale" }],
    category: "Fashion",
    providerType: "manufacturer",
    secondaryCategory: "fashion",
    tags: ["clothing", "t-shirt", "striped"],
  },
];

export const topProducts = [
  {
    id: 5,
    title: "Product Title",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    currentPrice: "$24.00",
    originalPrice: null,
    isFavorite: false,
    sizes: [{ size: "One Size", available: true }],
    specifications: {
      dimensions: "10 x 5 x 2 inches",
      weight: "1 lbs",
      material: "Various",
      warranty: "1 year",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      shippingOptions: ["Standard"],
      returnPolicy: "30-day return policy",
    },
    reviews: [],
    averageRating: 0,
    reviewCount: 0,
    labels: [],
    category: "General",
    tags: ["product"],
  },
  {
    id: 6,
    title: "Product Title",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    currentPrice: "$24.00",
    originalPrice: null,
    isFavorite: false,
    sizes: [{ size: "One Size", available: true }],
    specifications: {
      dimensions: "10 x 5 x 2 inches",
      weight: "1 lbs",
      material: "Various",
      warranty: "1 year",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      shippingOptions: ["Standard"],
      returnPolicy: "30-day return policy",
    },
    reviews: [],
    averageRating: 0,
    reviewCount: 0,
    labels: [],
    category: "General",
    tags: ["product"],
  },
  {
    id: 7,
    title: "Product Title",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    currentPrice: "$24.00",
    originalPrice: null,
    isFavorite: false,
    sizes: [{ size: "One Size", available: true }],
    specifications: {
      dimensions: "10 x 5 x 2 inches",
      weight: "1 lbs",
      material: "Various",
      warranty: "1 year",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      shippingOptions: ["Standard"],
      returnPolicy: "30-day return policy",
    },
    reviews: [],
    averageRating: 0,
    reviewCount: 0,
    labels: [],
    category: "General",
    tags: ["product"],
  },
];

export const accessories = [
  {
    id: 8,
    title: "Lorem ipsum lorem ipsum dolor sit amet",
    image:
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop",
    currentPrice: "$275.00",
    originalPrice: "$550.00",
    isFavorite: false,
    sizes: [{ size: "One Size", available: true }],
    specifications: {
      dimensions: "12 x 8 x 3 inches",
      weight: "2 lbs",
      material: "Various",
      warranty: "1 year",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      shippingOptions: ["Standard"],
      returnPolicy: "30-day return policy",
    },
    reviews: [],
    averageRating: 0,
    reviewCount: 0,
    labels: [],
    category: "Accessories",
    tags: ["accessory"],
  },
  {
    id: 9,
    title: "Lorem ipsum lorem ipsum dolor sit amet",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    currentPrice: "$900.00",
    originalPrice: "$1800.00",
    isFavorite: false,
    sizes: [{ size: "One Size", available: true }],
    specifications: {
      dimensions: "12 x 8 x 3 inches",
      weight: "2 lbs",
      material: "Various",
      warranty: "1 year",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      shippingOptions: ["Standard"],
      returnPolicy: "30-day return policy",
    },
    reviews: [],
    averageRating: 0,
    reviewCount: 0,
    labels: [],
    category: "Accessories",
    tags: ["accessory"],
  },
  {
    id: 10,
    title: "Lorem ipsum lorem ipsum dolor sit amet",
    image:
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop",
    currentPrice: "$400.00",
    originalPrice: "$800.00",
    isFavorite: false,
    sizes: [{ size: "One Size", available: true }],
    specifications: {
      dimensions: "12 x 8 x 3 inches",
      weight: "2 lbs",
      material: "Various",
      warranty: "1 year",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      shippingOptions: ["Standard"],
      returnPolicy: "30-day return policy",
    },
    reviews: [],
    averageRating: 0,
    reviewCount: 0,
    labels: [],
    category: "Accessories",
    tags: ["accessory"],
  },
];

export const newArrivals = [
  {
    id: 11,
    title: "Smartphone Case",
    image:
      "https://images.unsplash.com/photo-1601593346740-925612772716?w=400&h=400&fit=crop",
    currentPrice: "$15.00",
    originalPrice: "$30.00",
    isFavorite: false,
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1601593346740-925612772716?w=600&h=600&fit=crop",
      },
    ],
    sizes: [{ size: "One Size", available: true }],
    specifications: {
      dimensions: "6 x 4 x 0.5 inches",
      weight: "0.2 lbs",
      material: "Plastic",
      warranty: "6 months",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      shippingOptions: ["Standard", "Express"],
      returnPolicy: "30-day return policy",
    },
    reviews: [
      {
        rating: 4.5,
        author: "User1",
        date: "2023-11-01",
        comment: "Good protection!",
        verified: true,
      },
    ],
    averageRating: 4.5,
    reviewCount: 1,
    labels: [{ type: "new", text: "New Arrival" }],
    category: "Accessories",
    tags: ["phone", "case"],
  },
  {
    id: 12,
    title: "Wireless Charger",
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop",
    currentPrice: "$25.00",
    originalPrice: "$50.00",
    isFavorite: false,
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=600&fit=crop",
      },
    ],
    sizes: [{ size: "One Size", available: true }],
    specifications: {
      dimensions: "4 x 4 x 0.5 inches",
      weight: "0.3 lbs",
      material: "Plastic",
      warranty: "1 year",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      shippingOptions: ["Standard", "Express"],
      returnPolicy: "30-day return policy",
    },
    reviews: [
      {
        rating: 4.0,
        author: "User2",
        date: "2023-10-15",
        comment: "Fast charging!",
        verified: true,
      },
    ],
    averageRating: 4.0,
    reviewCount: 1,
    labels: [{ type: "new", text: "New Arrival" }],
    category: "Electronics",
    tags: ["charger", "wireless"],
  },
  {
    id: 13,
    title: "Bluetooth Headphones",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    currentPrice: "$80.00",
    originalPrice: "$160.00",
    isFavorite: false,
    sizes: [{ size: "One Size", available: true }],
    specifications: {
      dimensions: "8 x 6 x 2 inches",
      weight: "0.5 lbs",
      material: "Plastic and Metal",
      warranty: "1 year",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      shippingOptions: ["Standard", "Express"],
      returnPolicy: "30-day return policy",
    },
    reviews: [
      {
        rating: 4.8,
        author: "User3",
        date: "2023-09-20",
        comment: "Great sound!",
        verified: true,
      },
    ],
    averageRating: 4.8,
    reviewCount: 1,
    labels: [{ type: "new", text: "New Arrival" }],
    category: "Electronics",
    tags: ["headphones", "bluetooth"],
  },
];

export const hotProducts = [
  {
    id: 14,
    title: "Gaming Mouse",
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop",
    currentPrice: "$45.00",
    originalPrice: "$90.00",
    isFavorite: false,
    sizes: [{ size: "One Size", available: true }],
    specifications: {
      dimensions: "5 x 3 x 1.5 inches",
      weight: "0.3 lbs",
      material: "Plastic",
      warranty: "1 year",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      shippingOptions: ["Standard", "Express"],
      returnPolicy: "30-day return policy",
    },
    reviews: [
      {
        rating: 4.7,
        author: "Gamer1",
        date: "2023-12-01",
        comment: "Precise and responsive!",
        verified: true,
      },
    ],
    averageRating: 4.7,
    reviewCount: 1,
    labels: [{ type: "hot", text: "Hot Product" }],
    category: "Electronics",
    tags: ["gaming", "mouse"],
  },
  {
    id: 15,
    title: "Mechanical Keyboard",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
    currentPrice: "$120.00",
    originalPrice: "$240.00",
    isFavorite: false,
    sizes: [{ size: "One Size", available: true }],
    specifications: {
      dimensions: "18 x 6 x 1.5 inches",
      weight: "2 lbs",
      material: "Plastic and Metal",
      warranty: "2 years",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      shippingOptions: ["Standard", "Express"],
      returnPolicy: "30-day return policy",
    },
    reviews: [
      {
        rating: 4.9,
        author: "Typist2",
        date: "2023-11-15",
        comment: "Amazing typing feel!",
        verified: true,
      },
    ],
    averageRating: 4.9,
    reviewCount: 1,
    labels: [{ type: "hot", text: "Hot Product" }],
    category: "Electronics",
    tags: ["keyboard", "mechanical"],
  },
  {
    id: 16,
    title: "LED Monitor",
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop",
    currentPrice: "$200.00",
    originalPrice: "$400.00",
    isFavorite: false,
    sizes: [{ size: "One Size", available: true }],
    specifications: {
      dimensions: "24 x 14 x 6 inches",
      weight: "8 lbs",
      material: "Plastic and Glass",
      warranty: "3 years",
    },
    delivery: {
      freeShipping: false,
      estimatedDelivery: "5-7 business days",
      shippingOptions: ["Standard"],
      returnPolicy: "30-day return policy",
    },
    reviews: [
      {
        rating: 4.6,
        author: "Tech3",
        date: "2023-10-20",
        comment: "Vivid colors!",
        verified: true,
      },
    ],
    averageRating: 4.6,
    reviewCount: 1,
    labels: [{ type: "hot", text: "Hot Product" }],
    category: "Electronics",
    tags: ["monitor", "led"],
  },
];

export const topRated = [
  {
    id: 17,
    title: "Coffee Maker",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
    currentPrice: "$60.00",
    originalPrice: "$120.00",
    isFavorite: false,
    sizes: [{ size: "One Size", available: true }],
    specifications: {
      dimensions: "12 x 8 x 14 inches",
      weight: "5 lbs",
      material: "Plastic and Metal",
      warranty: "2 years",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      shippingOptions: ["Standard", "Express"],
      returnPolicy: "30-day return policy",
    },
    reviews: [
      {
        rating: 4.8,
        author: "CoffeeLover",
        date: "2023-10-05",
        comment: "Makes great coffee!",
        verified: true,
      },
    ],
    averageRating: 4.8,
    reviewCount: 1,
    labels: [{ type: "top", text: "Top Rated" }],
    category: "Kitchen",
    tags: ["coffee", "maker"],
  },
  {
    id: 18,
    title: "Blender",
    image:
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&h=400&fit=crop",
    currentPrice: "$35.00",
    originalPrice: "$70.00",
    isFavorite: false,
    sizes: [{ size: "One Size", available: true }],
    specifications: {
      dimensions: "8 x 6 x 12 inches",
      weight: "3 lbs",
      material: "Plastic",
      warranty: "1 year",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      shippingOptions: ["Standard", "Express"],
      returnPolicy: "30-day return policy",
    },
    reviews: [
      {
        rating: 4.5,
        author: "SmoothieFan",
        date: "2023-09-12",
        comment: "Powerful and easy to use!",
        verified: true,
      },
    ],
    averageRating: 4.5,
    reviewCount: 1,
    labels: [{ type: "top", text: "Top Rated" }],
    category: "Kitchen",
    tags: ["blender"],
  },
  {
    id: 19,
    title: "Air Fryer",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    currentPrice: "$100.00",
    originalPrice: "$200.00",
    isFavorite: false,
    sizes: [{ size: "One Size", available: true }],
    specifications: {
      dimensions: "10 x 10 x 12 inches",
      weight: "6 lbs",
      material: "Plastic and Metal",
      warranty: "2 years",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      shippingOptions: ["Standard", "Express"],
      returnPolicy: "30-day return policy",
    },
    reviews: [
      {
        rating: 4.9,
        author: "HealthyEater",
        date: "2023-08-25",
        comment: "Crispy and healthy!",
        verified: true,
      },
    ],
    averageRating: 4.9,
    reviewCount: 1,
    labels: [{ type: "top", text: "Top Rated" }],
    category: "Kitchen",
    tags: ["air fryer"],
  },
];

export const bestSelling = [
  {
    id: 20,
    title: "Yoga Mat",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
    currentPrice: "$20.00",
    originalPrice: "$40.00",
    isFavorite: false,
    sizes: [{ size: "One Size", available: true }],
    specifications: {
      dimensions: "24 x 68 x 0.25 inches",
      weight: "2 lbs",
      material: "Rubber",
      warranty: "1 year",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      shippingOptions: ["Standard", "Express"],
      returnPolicy: "30-day return policy",
    },
    reviews: [
      {
        rating: 4.7,
        author: "Yogi",
        date: "2023-11-20",
        comment: "Non-slip and comfortable!",
        verified: true,
      },
    ],
    averageRating: 4.7,
    reviewCount: 1,
    labels: [{ type: "best", text: "Best Selling" }],
    category: "Sports",
    tags: ["yoga", "mat"],
  },
  {
    id: 21,
    title: "Dumbbells Set",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    currentPrice: "$50.00",
    originalPrice: "$100.00",
    isFavorite: false,
    sizes: [{ size: "5-25 lbs", available: true }],
    specifications: {
      dimensions: "10 x 5 x 5 inches",
      weight: "15 lbs",
      material: "Metal",
      warranty: "Lifetime",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      shippingOptions: ["Standard", "Express"],
      returnPolicy: "30-day return policy",
    },
    reviews: [
      {
        rating: 4.6,
        author: "FitnessGuy",
        date: "2023-10-30",
        comment: "Great for home workouts!",
        verified: true,
      },
    ],
    averageRating: 4.6,
    reviewCount: 1,
    labels: [{ type: "best", text: "Best Selling" }],
    category: "Sports",
    tags: ["dumbbells"],
  },
  {
    id: 22,
    title: "Running Shoes",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    currentPrice: "$75.00",
    originalPrice: "$150.00",
    isFavorite: false,
    sizes: [
      { size: "7", available: true },
      { size: "8", available: true },
      { size: "9", available: false },
    ],
    specifications: {
      dimensions: "12 x 4 x 4 inches",
      weight: "1 lbs",
      material: "Mesh and Rubber",
      warranty: "1 year",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      shippingOptions: ["Standard", "Express"],
      returnPolicy: "30-day return policy",
    },
    reviews: [
      {
        rating: 4.8,
        author: "Runner",
        date: "2023-09-18",
        comment: "Comfortable and lightweight!",
        verified: true,
      },
    ],
    averageRating: 4.8,
    reviewCount: 1,
    labels: [{ type: "best", text: "Best Selling" }],
    category: "Sports",
    tags: ["running", "shoes"],
  },
];

export const luxuryProducts = [
  {
    id: 23,
    title: "Designer Watch",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    currentPrice: "$500.00",
    originalPrice: "$1000.00",
    isFavorite: false,
    sizes: [{ size: "One Size", available: true }],
    specifications: {
      dimensions: "1.5 x 1.5 x 0.5 inches",
      weight: "0.3 lbs",
      material: "Gold and Leather",
      warranty: "5 years",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      shippingOptions: ["Standard", "Express"],
      returnPolicy: "30-day return policy",
    },
    reviews: [
      {
        rating: 5.0,
        author: "LuxuryBuyer",
        date: "2023-12-10",
        comment: "Elegant and timeless!",
        verified: true,
      },
    ],
    averageRating: 5.0,
    reviewCount: 1,
    labels: [{ type: "luxury", text: "Luxury" }],
    category: "Fashion",
    tags: ["watch"],
  },
  {
    id: 24,
    title: "Leather Bag",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    currentPrice: "$300.00",
    originalPrice: "$600.00",
    isFavorite: false,
    sizes: [{ size: "One Size", available: true }],
    specifications: {
      dimensions: "12 x 10 x 4 inches",
      weight: "2 lbs",
      material: "Leather",
      warranty: "2 years",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      shippingOptions: ["Standard", "Express"],
      returnPolicy: "30-day return policy",
    },
    reviews: [
      {
        rating: 4.9,
        author: "Fashionista",
        date: "2023-11-05",
        comment: "Stylish and durable!",
        verified: true,
      },
    ],
    averageRating: 4.9,
    reviewCount: 1,
    labels: [{ type: "luxury", text: "Luxury" }],
    category: "Fashion",
    tags: ["bag"],
  },
  {
    id: 25,
    title: "Sunglasses",
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    currentPrice: "$150.00",
    originalPrice: "$300.00",
    isFavorite: false,
    sizes: [{ size: "One Size", available: true }],
    specifications: {
      dimensions: "6 x 2 x 6 inches",
      weight: "0.2 lbs",
      material: "Metal and Glass",
      warranty: "1 year",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      shippingOptions: ["Standard", "Express"],
      returnPolicy: "30-day return policy",
    },
    reviews: [
      {
        rating: 4.7,
        author: "SunSeeker",
        date: "2023-10-15",
        comment: "UV protection and style!",
        verified: true,
      },
    ],
    averageRating: 4.7,
    reviewCount: 1,
    labels: [{ type: "luxury", text: "Luxury" }],
    category: "Fashion",
    tags: ["sunglasses"],
  },
];

export const ecoProducts = [
  {
    id: 26,
    title: "Bamboo Toothbrush",
    image:
      "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=400&h=400&fit=crop",
    currentPrice: "$5.00",
    originalPrice: "$10.00",
    isFavorite: false,
    sizes: [{ size: "One Size", available: true }],
    specifications: {
      dimensions: "7 x 1 x 0.5 inches",
      weight: "0.1 lbs",
      material: "Bamboo",
      warranty: "N/A",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      shippingOptions: ["Standard"],
      returnPolicy: "30-day return policy",
    },
    reviews: [
      {
        rating: 4.5,
        author: "EcoUser",
        date: "2023-11-10",
        comment: "Great eco-friendly alternative!",
        verified: true,
      },
    ],
    averageRating: 4.5,
    reviewCount: 1,
    labels: [{ type: "eco", text: "Eco-Friendly" }],
    category: "Beauty",
    tags: ["eco", "toothbrush"],
  },
  {
    id: 27,
    title: "Reusable Water Bottle",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    currentPrice: "$15.00",
    originalPrice: "$30.00",
    isFavorite: false,
    sizes: [{ size: "One Size", available: true }],
    specifications: {
      dimensions: "3 x 3 x 10 inches",
      weight: "0.5 lbs",
      material: "Stainless Steel",
      warranty: "1 year",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      shippingOptions: ["Standard"],
      returnPolicy: "30-day return policy",
    },
    reviews: [
      {
        rating: 4.8,
        author: "Hydrated",
        date: "2023-10-25",
        comment: "Keeps drinks cold perfectly!",
        verified: true,
      },
    ],
    averageRating: 4.8,
    reviewCount: 1,
    labels: [{ type: "eco", text: "Eco-Friendly" }],
    category: "Home",
    tags: ["water bottle"],
  },
  {
    id: 28,
    title: "Organic Cotton T-shirt",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    currentPrice: "$25.00",
    originalPrice: "$50.00",
    isFavorite: false,
    sizes: [
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
    ],
    specifications: {
      dimensions: "28 x 20 x 1 inches",
      weight: "0.5 lbs",
      material: "Organic Cotton",
      warranty: "N/A",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      shippingOptions: ["Standard"],
      returnPolicy: "30-day return policy",
    },
    reviews: [
      {
        rating: 4.6,
        author: "OrganicFan",
        date: "2023-09-15",
        comment: "Soft and comfortable!",
        verified: true,
      },
    ],
    averageRating: 4.6,
    reviewCount: 1,
    labels: [{ type: "eco", text: "Eco-Friendly" }],
    category: "Fashion",
    tags: ["organic", "t-shirt"],
  },
];

export const travelEssentials = [
  {
    id: 29,
    title: "Travel Pillow",
    image:
      "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=400&h=400&fit=crop",
    currentPrice: "$20.00",
    originalPrice: "$40.00",
    isFavorite: false,
    sizes: [{ size: "One Size", available: true }],
    specifications: {
      dimensions: "12 x 10 x 4 inches",
      weight: "0.8 lbs",
      material: "Memory Foam",
      warranty: "1 year",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      shippingOptions: ["Standard"],
      returnPolicy: "30-day return policy",
    },
    reviews: [
      {
        rating: 4.7,
        author: "Traveler",
        date: "2023-12-05",
        comment: "Comfortable for long flights!",
        verified: true,
      },
    ],
    averageRating: 4.7,
    reviewCount: 1,
    labels: [{ type: "travel", text: "Travel Essential" }],
    category: "Travel",
    tags: ["pillow"],
  },
  {
    id: 30,
    title: "Portable Charger",
    image:
      "https://images.unsplash.com/photo-1609594040430-3b9b92a98e53?w=400&h=400&fit=crop",
    currentPrice: "$30.00",
    originalPrice: "$60.00",
    isFavorite: false,
    sizes: [{ size: "One Size", available: true }],
    specifications: {
      dimensions: "4 x 3 x 1 inches",
      weight: "0.5 lbs",
      material: "Plastic",
      warranty: "1 year",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      shippingOptions: ["Standard"],
      returnPolicy: "30-day return policy",
    },
    reviews: [
      {
        rating: 4.9,
        author: "PowerUser",
        date: "2023-11-20",
        comment: "Fast charging on the go!",
        verified: true,
      },
    ],
    averageRating: 4.9,
    reviewCount: 1,
    labels: [{ type: "travel", text: "Travel Essential" }],
    category: "Electronics",
    tags: ["charger"],
  },
  {
    id: 31,
    title: "Compression Socks",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    currentPrice: "$15.00",
    originalPrice: "$30.00",
    isFavorite: false,
    sizes: [
      { size: "M", available: true },
      { size: "L", available: true },
    ],
    specifications: {
      dimensions: "10 x 4 x 0.1 inches",
      weight: "0.2 lbs",
      material: "Nylon",
      warranty: "N/A",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      shippingOptions: ["Standard"],
      returnPolicy: "30-day return policy",
    },
    reviews: [
      {
        rating: 4.4,
        author: "RunnerTraveler",
        date: "2023-10-30",
        comment: "Helps with circulation!",
        verified: true,
      },
    ],
    averageRating: 4.4,
    reviewCount: 1,
    labels: [{ type: "travel", text: "Travel Essential" }],
    category: "Sports",
    tags: ["socks"],
  },
];

export const securityProducts = [
  {
    id: 32,
    title: "Smart Lock",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    currentPrice: "$100.00",
    originalPrice: "$200.00",
    isFavorite: false,
    sizes: [{ size: "One Size", available: true }],
    specifications: {
      dimensions: "6 x 3 x 2 inches",
      weight: "1 lbs",
      material: "Metal",
      warranty: "2 years",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      shippingOptions: ["Standard"],
      returnPolicy: "30-day return policy",
    },
    reviews: [
      {
        rating: 4.8,
        author: "HomeOwner",
        date: "2023-12-15",
        comment: "Easy keyless entry!",
        verified: true,
      },
    ],
    averageRating: 4.8,
    reviewCount: 1,
    labels: [{ type: "security", text: "Security" }],
    category: "Security",
    tags: ["lock"],
  },
  {
    id: 33,
    title: "Security Camera",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=400&fit=crop",
    currentPrice: "$80.00",
    originalPrice: "$160.00",
    isFavorite: false,
    sizes: [{ size: "One Size", available: true }],
    specifications: {
      dimensions: "4 x 3 x 2 inches",
      weight: "0.5 lbs",
      material: "Plastic",
      warranty: "1 year",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      shippingOptions: ["Standard"],
      returnPolicy: "30-day return policy",
    },
    reviews: [
      {
        rating: 4.6,
        author: "SecurityFan",
        date: "2023-11-25",
        comment: "Clear night vision!",
        verified: true,
      },
    ],
    averageRating: 4.6,
    reviewCount: 1,
    labels: [{ type: "security", text: "Security" }],
    category: "Security",
    tags: ["camera"],
  },
  {
    id: 34,
    title: "Alarm System",
    image:
      "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=400&h=400&fit=crop",
    currentPrice: "$150.00",
    originalPrice: "$300.00",
    isFavorite: false,
    sizes: [{ size: "One Size", available: true }],
    specifications: {
      dimensions: "8 x 6 x 2 inches",
      weight: "2 lbs",
      material: "Plastic and Metal",
      warranty: "3 years",
    },
    delivery: {
      freeShipping: false,
      estimatedDelivery: "5-7 business days",
      shippingOptions: ["Standard"],
      returnPolicy: "30-day return policy",
    },
    reviews: [
      {
        rating: 4.9,
        author: "SafeHome",
        date: "2023-10-20",
        comment: "Reliable protection!",
        verified: true,
      },
    ],
    averageRating: 4.9,
    reviewCount: 1,
    labels: [{ type: "security", text: "Security" }],
    category: "Security",
    tags: ["alarm"],
  },
];

// Top Deals Section
export const topDeals = [
  {
    id: 35,
    title: "Colorful Retractable Ballpoint Pens",
    image:
      "https://images.unsplash.com/photo-1583484963886-cce23f3a5878?w=400&h=400&fit=crop",
    currentPrice: "$0.08",
    originalPrice: null,
    isFavorite: false,
    badge: { type: "flash", text: "Flash Deal", position: "image" },
    sizes: [{ size: "One Size", available: true }],
    specifications: {
      dimensions: "6 x 0.5 x 0.5 inches",
      weight: "0.1 lbs",
      material: "Plastic",
      warranty: "N/A",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      shippingOptions: ["Standard"],
      returnPolicy: "30-day return policy",
    },
    reviews: [
      {
        rating: 4.5,
        author: "Student",
        date: "2023-12-20",
        comment: "Great for writing!",
        verified: true,
      },
    ],
    averageRating: 4.5,
    reviewCount: 1,
    labels: [{ type: "deal", text: "Deal" }],
    category: "Office",
    tags: ["pens"],
  },
  {
    id: 36,
    title: "Chrome Car Wheel LSGZL",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=400&fit=crop",
    currentPrice: "$230",
    originalPrice: null,
    isFavorite: false,
    priceIndicator: { type: "lower", text: "Lower priced than similar" },
    sizes: [{ size: "16 inches", available: true }],
    specifications: {
      dimensions: "16 x 16 x 6 inches",
      weight: "20 lbs",
      material: "Chrome",
      warranty: "1 year",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "5-7 business days",
      shippingOptions: ["Standard"],
      returnPolicy: "30-day return policy",
    },
    reviews: [
      {
        rating: 4.7,
        author: "CarEnthusiast",
        date: "2023-11-15",
        comment: "Shiny and durable!",
        verified: true,
      },
    ],
    averageRating: 4.7,
    reviewCount: 1,
    labels: [{ type: "deal", text: "Deal" }],
    category: "Automotive",
    tags: ["wheel"],
  },
  {
    id: 37,
    title: "Premium Coffee Grounds",
    image:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
    currentPrice: "$3",
    originalPrice: null,
    isFavorite: false,
    priceIndicator: { type: "lower", text: "Lower priced than similar" },
    sizes: [{ size: "1 lb", available: true }],
    specifications: {
      dimensions: "8 x 6 x 3 inches",
      weight: "1 lbs",
      material: "Coffee",
      warranty: "N/A",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      shippingOptions: ["Standard"],
      returnPolicy: "30-day return policy",
    },
    reviews: [
      {
        rating: 4.8,
        author: "CoffeeLover",
        date: "2023-10-10",
        comment: "Rich flavor!",
        verified: true,
      },
    ],
    averageRating: 4.8,
    reviewCount: 1,
    labels: [{ type: "deal", text: "Deal" }],
    category: "Food",
    tags: ["coffee"],
  },
];

// Top Ranking Section
export const topRanking = [
  {
    id: 38,
    title: "Manufacturer 75 Inch Led Television 65 Inch 4k UHD Smart TV",
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
    currentPrice: null, // No price for top ranking
    originalPrice: null,
    isFavorite: false,
    badge: {
      type: "ranking",
      text: "Top ranked last month",
      position: "below-title",
      icon: "crown",
    },
    category: "Hot selling",
    subcategory: "Smart TVs",
    sizes: [{ size: "75 inches", available: true }],
    specifications: {
      dimensions: "66 x 38 x 3 inches",
      weight: "50 lbs",
      material: "Plastic and Glass",
      warranty: "2 years",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "5-7 business days",
      shippingOptions: ["Standard"],
      returnPolicy: "30-day return policy",
    },
    reviews: [],
    averageRating: 0,
    reviewCount: 0,
    labels: [{ type: "ranking", text: "Top Ranking" }],
    tags: ["tv", "smart"],
  },
  {
    id: 39,
    title: "Accept Custom 4K Android Flat Screen Led Tv Smart TV",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop",
    currentPrice: null,
    originalPrice: null,
    isFavorite: false,
    badge: {
      type: "rising",
      text: "On the rise in Hot selling Smart TVs",
      position: "below-title",
      icon: "arrow-up",
    },
    category: "Hot selling",
    subcategory: "Smart TVs",
    sizes: [{ size: "55 inches", available: true }],
    specifications: {
      dimensions: "48 x 28 x 3 inches",
      weight: "30 lbs",
      material: "Plastic and Glass",
      warranty: "2 years",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "5-7 business days",
      shippingOptions: ["Standard"],
      returnPolicy: "30-day return policy",
    },
    reviews: [],
    averageRating: 0,
    reviewCount: 0,
    labels: [{ type: "ranking", text: "Top Ranking" }],
    tags: ["tv", "smart"],
  },
  {
    id: 40,
    title: "TLC LED TV Smart World's Top 2 Ranking UHD 4K Original",
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop",
    currentPrice: null,
    originalPrice: null,
    isFavorite: false,
    badge: {
      type: "rising",
      text: "On the rise in Hot selling LED TVs",
      position: "below-title",
      icon: "arrow-up",
    },
    category: "Hot selling",
    subcategory: "LED TVs",
    sizes: [{ size: "65 inches", available: true }],
    specifications: {
      dimensions: "57 x 33 x 3 inches",
      weight: "40 lbs",
      material: "Plastic and Glass",
      warranty: "2 years",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "5-7 business days",
      shippingOptions: ["Standard"],
      returnPolicy: "30-day return policy",
    },
    reviews: [],
    averageRating: 0,
    reviewCount: 0,
    labels: [{ type: "ranking", text: "Top Ranking" }],
    tags: ["tv", "led"],
  },
  {
    id: 41,
    title: "Global Version POCO X7 5G Smartphone MTK Dimensity",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    currentPrice: null,
    originalPrice: null,
    isFavorite: false,
    badge: {
      type: "ranking",
      text: "Top ranked last month",
      position: "below-title",
      icon: "crown",
    },
    category: "Hot selling",
    subcategory: "Smartphones",
    sizes: [{ size: "6.5 inches", available: true }],
    specifications: {
      dimensions: "6 x 3 x 0.3 inches",
      weight: "0.5 lbs",
      material: "Glass and Metal",
      warranty: "1 year",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      shippingOptions: ["Standard"],
      returnPolicy: "30-day return policy",
    },
    reviews: [],
    averageRating: 0,
    reviewCount: 0,
    labels: [{ type: "ranking", text: "Top Ranking" }],
    tags: ["phone", "smartphone"],
  },
];

// Tailored Selections
export const tailoredSelections = [
  {
    id: 41,
    label: "Women's Clothes",
    slug: "womens-clothes",
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=200&fit=crop",
  },
  {
    id: 42,
    label: "Designer Shoe",
    slug: "designer-shoes",
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
  },
  {
    id: 43,
    label: "Food Trailer",
    slug: "food-trailers",
    category: "Food",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=200&h=200&fit=crop",
  },
  {
    id: 44,
    label: "Spider Hoodie",
    slug: "spider-hoodies",
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop",
  },
];

// Grid Products (for Tailored Selections section)
export const gridProducts = [
  {
    id: 45,
    title: "Wholesale Personal Nail Art Set",
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop",
    currentPrice: "$1.80",
    originalPrice: null,
    isFavorite: false,
    sizes: [{ size: "One Size", available: true }],
    specifications: {
      dimensions: "4 x 3 x 1 inches",
      weight: "0.2 lbs",
      material: "Plastic",
      warranty: "N/A",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      shippingOptions: ["Standard"],
      returnPolicy: "30-day return policy",
    },
    reviews: [],
    averageRating: 0,
    reviewCount: 0,
    labels: [],
    category: "Beauty",
    tags: ["nail", "art"],
  },
  {
    id: 46,
    title: "Best-selling Embroidered Round Neck Sweater",
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop",
    currentPrice: "$12",
    originalPrice: null,
    isFavorite: false,
    priceIndicator: { type: "lower", text: "Lower priced than similar" },
    sizes: [
      { size: "M", available: true },
      { size: "L", available: true },
    ],
    specifications: {
      dimensions: "20 x 16 x 1 inches",
      weight: "1 lbs",
      material: "Cotton",
      warranty: "N/A",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      shippingOptions: ["Standard"],
      returnPolicy: "30-day return policy",
    },
    reviews: [],
    averageRating: 0,
    reviewCount: 0,
    labels: [],
    category: "Fashion",
    tags: ["sweater", "embroidered"],
  },
  {
    id: 47,
    title: "Botellas De Agua Vacuum Flask Set",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    currentPrice: "$1.63",
    originalPrice: null,
    isFavorite: false,
    sizes: [{ size: "One Size", available: true }],
    specifications: {
      dimensions: "3 x 3 x 10 inches",
      weight: "0.5 lbs",
      material: "Stainless Steel",
      warranty: "1 year",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      shippingOptions: ["Standard"],
      returnPolicy: "30-day return policy",
    },
    reviews: [],
    averageRating: 0,
    reviewCount: 0,
    labels: [],
    category: "Home",
    tags: ["flask", "vacuum"],
  },
  {
    id: 48,
    title: "New 304 Stainless Steel Tumblers",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    currentPrice: "$2.63",
    originalPrice: null,
    isFavorite: false,
    priceIndicator: { type: "lower", text: "Lower priced than similar" },
    sizes: [{ size: "One Size", available: true }],
    specifications: {
      dimensions: "3 x 3 x 6 inches",
      weight: "0.3 lbs",
      material: "Stainless Steel",
      warranty: "1 year",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      shippingOptions: ["Standard"],
      returnPolicy: "30-day return policy",
    },
    reviews: [],
    averageRating: 0,
    reviewCount: 0,
    labels: [],
    category: "Home",
    tags: ["tumbler", "stainless steel"],
  },
  {
    id: 49,
    title: "Cute Cartoon Ring Custom Character",
    image:
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&h=400&fit=crop",
    currentPrice: "$10.99-11.99",
    originalPrice: null,
    isFavorite: false,
    sizes: [{ size: "One Size", available: true }],
    specifications: {
      dimensions: "1 x 1 x 0.5 inches",
      weight: "0.1 lbs",
      material: "Metal",
      warranty: "N/A",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      shippingOptions: ["Standard"],
      returnPolicy: "30-day return policy",
    },
    reviews: [],
    averageRating: 0,
    reviewCount: 0,
    labels: [],
    category: "Fashion",
    tags: ["ring", "cartoon"],
  },
  {
    id: 50,
    title: "2025 New Arrival Athletic Set",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
    currentPrice: "$17.02",
    originalPrice: null,
    isFavorite: false,
    sizes: [
      { size: "M", available: true },
      { size: "L", available: true },
    ],
    specifications: {
      dimensions: "20 x 16 x 1 inches",
      weight: "1 lbs",
      material: "Cotton",
      warranty: "N/A",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      shippingOptions: ["Standard"],
      returnPolicy: "30-day return policy",
    },
    reviews: [],
    averageRating: 0,
    reviewCount: 0,
    labels: [],
    category: "Sports",
    tags: ["athletic", "set"],
  },
  {
    id: 51,
    title: "Exquisite Mug Creation Set",
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop",
    currentPrice: "$2.20",
    originalPrice: null,
    isFavorite: false,
    sizes: [{ size: "One Size", available: true }],
    specifications: {
      dimensions: "4 x 4 x 4 inches",
      weight: "0.5 lbs",
      material: "Ceramic",
      warranty: "N/A",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      shippingOptions: ["Standard"],
      returnPolicy: "30-day return policy",
    },
    reviews: [],
    averageRating: 0,
    reviewCount: 0,
    labels: [],
    category: "Home",
    tags: ["mug", "creation"],
  },
  {
    id: 52,
    title: "SAVE High Quality Luxury Sunglasses",
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    currentPrice: "$4.60",
    originalPrice: null,
    isFavorite: false,
    sizes: [{ size: "One Size", available: true }],
    specifications: {
      dimensions: "6 x 2 x 6 inches",
      weight: "0.2 lbs",
      material: "Metal and Glass",
      warranty: "1 year",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      shippingOptions: ["Standard"],
      returnPolicy: "30-day return policy",
    },
    reviews: [],
    averageRating: 0,
    reviewCount: 0,
    labels: [],
    category: "Fashion",
    tags: ["sunglasses", "luxury"],
  },
  {
    id: 53,
    title: "Local stock Perfume Manufacturing Set",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
    currentPrice: "$4.84",
    originalPrice: null,
    isFavorite: false,
    sizes: [{ size: "One Size", available: true }],
    specifications: {
      dimensions: "2 x 2 x 4 inches",
      weight: "0.3 lbs",
      material: "Glass and Plastic",
      warranty: "N/A",
    },
    delivery: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      shippingOptions: ["Standard"],
      returnPolicy: "30-day return policy",
    },
    reviews: [],
    averageRating: 0,
    reviewCount: 0,
    labels: [],
    category: "Beauty",
    tags: ["perfume"],
  },
];

// Extended product details for product detail pages
export const getProductDetails = (id) => {
  // Find reviews from summary products
  const allSummaryProducts = [
    ...featuredProducts,
    ...topProducts,
    ...accessories,
    ...newArrivals,
    ...hotProducts,
    ...topRated,
    ...bestSelling,
    ...luxuryProducts,
    ...ecoProducts,
    ...travelEssentials,
    ...securityProducts,
    ...topDeals,
    ...gridProducts,
  ];
  const summaryProduct = allSummaryProducts.find((p) => p.id === parseInt(id));

  const allProductDetails = [
    {
      id: 1,
      title: "NEW Ulefone Watch",
      currentPrice: "$30.0",
      originalPrice: "$40.0",
      media: [
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
        },
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1579586337278-3befd40f17da?w=600&h=600&fit=crop",
        },
      ],
      description:
        "NEW Original Ulefone Watch 1.3 inch TFT Touch Screen 5 ATM Waterproof & 9 Sports Mode BT 4.2 Smart Watch Same Day Shipping on orders before 6PM (GMT+8), shipped from Hong Kong Warehouse",
      features: [
        { icon: "😊", label: "Safe" },
        { icon: "📄", label: "Quality" },
        { icon: "✏️", label: "Fresh" },
      ],
      freeShipping: true,
      delivery: {
        freeShipping: true,
        estimatedDelivery: "2-3 business days",
        shippingOptions: ["Standard", "Express"],
        returnPolicy: "30-day return policy",
      },
      reviews: summaryProduct?.reviews || [],
      averageRating: summaryProduct?.averageRating || 0,
      reviewCount: summaryProduct?.reviewCount || 0,
    },
    {
      id: 2,
      title: "White Jumpsuit",
      currentPrice: "₹ 1,100",
      originalPrice: "₹ 2,200",
      media: [
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=600&fit=crop",
        },
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=600&fit=crop",
        },
      ],
      description:
        "Stylish white jumpsuit perfect for any occasion. Made from premium quality fabric with comfortable fit. Available in multiple sizes.",
      features: [
        { icon: "😊", label: "Safe" },
        { icon: "📄", label: "Quality" },
        { icon: "✏️", label: "Fresh" },
      ],
      freeShipping: true,
      delivery: {
        freeShipping: true,
        estimatedDelivery: "3-5 business days",
        shippingOptions: ["Standard", "Express"],
        returnPolicy: "30-day return policy",
      },
    },
    {
      id: 3,
      title: "Vitamin C Serum",
      currentPrice: "₹ 2,453",
      originalPrice: "₹ 4,700",
      media: [
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop",
        },
      ],
      description:
        "Premium Vitamin C Serum for brightening and anti-aging. Contains natural ingredients and is suitable for all skin types.",
      features: [
        { icon: "😊", label: "Safe" },
        { icon: "📄", label: "Quality" },
        { icon: "✏️", label: "Fresh" },
      ],
      freeShipping: false,
      delivery: {
        freeShipping: false,
        estimatedDelivery: "5-7 business days",
        shippingOptions: ["Standard"],
        returnPolicy: "30-day return policy",
      },
    },
    {
      id: 4,
      title: "Strip T-shirt",
      currentPrice: "₹ 1,700",
      originalPrice: "₹ 3,400",
      media: [
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
        },
      ],
      description:
        "Comfortable striped T-shirt made from soft cotton blend. Perfect for casual wear. Available in multiple colors and sizes.",
      features: [
        { icon: "😊", label: "Safe" },
        { icon: "📄", label: "Quality" },
        { icon: "✏️", label: "Fresh" },
      ],
      freeShipping: true,
    },
    {
      id: 5,
      title: "Product Title",
      currentPrice: "$24.00",
      originalPrice: null,
      media: [
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
        },
      ],
      description:
        "High-quality product with excellent features. Perfect for everyday use.",
      features: [
        { icon: "😊", label: "Safe" },
        { icon: "📄", label: "Quality" },
        { icon: "✏️", label: "Fresh" },
      ],
      freeShipping: true,
    },
    {
      id: 6,
      title: "Product Title",
      currentPrice: "$24.00",
      originalPrice: null,
      media: [
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop",
        },
      ],
      description:
        "High-quality product with excellent features. Perfect for everyday use.",
      features: [
        { icon: "😊", label: "Safe" },
        { icon: "📄", label: "Quality" },
        { icon: "✏️", label: "Fresh" },
      ],
      freeShipping: true,
    },
    {
      id: 7,
      title: "Product Title",
      currentPrice: "$24.00",
      originalPrice: null,
      media: [
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop",
        },
      ],
      description:
        "High-quality product with excellent features. Perfect for everyday use.",
      features: [
        { icon: "😊", label: "Safe" },
        { icon: "📄", label: "Quality" },
        { icon: "✏️", label: "Fresh" },
      ],
      freeShipping: true,
    },
    {
      id: 8,
      title: "Wireless Earbuds",
      currentPrice: "$275.00",
      originalPrice: "$550.00",
      media: [
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600&h=600&fit=crop",
        },
      ],
      description:
        "Premium wireless earbuds with noise cancellation. Long battery life and crystal clear sound quality.",
      features: [
        { icon: "😊", label: "Safe" },
        { icon: "📄", label: "Quality" },
        { icon: "✏️", label: "Fresh" },
      ],
      freeShipping: true,
    },
    {
      id: 9,
      title: "Portable Speaker",
      currentPrice: "$900.00",
      originalPrice: "$1800.00",
      media: [
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop",
        },
      ],
      description:
        "High-quality portable speaker with powerful bass and long battery life. Perfect for outdoor activities.",
      features: [
        { icon: "😊", label: "Safe" },
        { icon: "📄", label: "Quality" },
        { icon: "✏️", label: "Fresh" },
      ],
      freeShipping: true,
    },
    {
      id: 10,
      title: "Gaming Controller",
      currentPrice: "$400.00",
      originalPrice: "$800.00",
      media: [
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&h=600&fit=crop",
        },
      ],
      description:
        "Professional gaming controller with responsive buttons and ergonomic design. Compatible with multiple platforms.",
      features: [
        { icon: "😊", label: "Safe" },
        { icon: "📄", label: "Quality" },
        { icon: "✏️", label: "Fresh" },
      ],
      freeShipping: true,
    },
    {
      id: 11,
      title: "Smartphone Case",
      currentPrice: "$15.00",
      originalPrice: "$30.00",
      images: [
        "https://images.unsplash.com/photo-1601593346740-925612772716?w=600&h=600&fit=crop",
      ],
      description:
        "Protective smartphone case with shock absorption and stylish design.",
      features: [
        { icon: "😊", label: "Safe" },
        { icon: "📄", label: "Quality" },
        { icon: "✏️", label: "Fresh" },
      ],
      freeShipping: true,
    },
    {
      id: 12,
      title: "Wireless Charger",
      currentPrice: "$25.00",
      originalPrice: "$50.00",
      images: [
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=600&fit=crop",
      ],
      description:
        "Fast wireless charger compatible with all Qi-enabled devices.",
      features: [
        { icon: "😊", label: "Safe" },
        { icon: "📄", label: "Quality" },
        { icon: "✏️", label: "Fresh" },
      ],
      freeShipping: true,
    },
    {
      id: 13,
      title: "Bluetooth Headphones",
      currentPrice: "$80.00",
      originalPrice: "$160.00",
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
      ],
      description:
        "High-quality Bluetooth headphones with noise cancellation and long battery life.",
      features: [
        { icon: "😊", label: "Safe" },
        { icon: "📄", label: "Quality" },
        { icon: "✏️", label: "Fresh" },
      ],
      freeShipping: true,
    },
    {
      id: 14,
      title: "Gaming Mouse",
      currentPrice: "$45.00",
      originalPrice: "$90.00",
      images: [
        "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&h=600&fit=crop",
      ],
      description:
        "Precision gaming mouse with customizable buttons and RGB lighting.",
      features: [
        { icon: "😊", label: "Safe" },
        { icon: "📄", label: "Quality" },
        { icon: "✏️", label: "Fresh" },
      ],
      freeShipping: true,
    },
    {
      id: 15,
      title: "Mechanical Keyboard",
      currentPrice: "$120.00",
      originalPrice: "$240.00",
      images: [
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop",
      ],
      description:
        "Mechanical keyboard with tactile switches and customizable backlighting.",
      features: [
        { icon: "😊", label: "Safe" },
        { icon: "📄", label: "Quality" },
        { icon: "✏️", label: "Fresh" },
      ],
      freeShipping: true,
    },
    {
      id: 16,
      title: "LED Monitor",
      currentPrice: "$200.00",
      originalPrice: "$400.00",
      images: [
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=600&fit=crop",
      ],
      description:
        "High-resolution LED monitor with vibrant colors and fast refresh rate.",
      features: [
        { icon: "😊", label: "Safe" },
        { icon: "📄", label: "Quality" },
        { icon: "✏️", label: "Fresh" },
      ],
      freeShipping: false,
    },
    {
      id: 17,
      title: "Coffee Maker",
      currentPrice: "$60.00",
      originalPrice: "$120.00",
      images: [
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=600&fit=crop",
      ],
      description:
        "Automatic coffee maker with programmable settings and thermal carafe.",
      features: [
        { icon: "😊", label: "Safe" },
        { icon: "📄", label: "Quality" },
        { icon: "✏️", label: "Fresh" },
      ],
      freeShipping: true,
    },
    {
      id: 18,
      title: "Blender",
      currentPrice: "$35.00",
      originalPrice: "$70.00",
      images: [
        "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&h=600&fit=crop",
      ],
      description:
        "Powerful blender with multiple speed settings and durable blades.",
      features: [
        { icon: "😊", label: "Safe" },
        { icon: "📄", label: "Quality" },
        { icon: "✏️", label: "Fresh" },
      ],
      freeShipping: true,
    },
    {
      id: 19,
      title: "Air Fryer",
      currentPrice: "$100.00",
      originalPrice: "$200.00",
      images: [
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop",
      ],
      description:
        "Healthy air fryer with digital controls and non-stick basket.",
      features: [
        { icon: "😊", label: "Safe" },
        { icon: "📄", label: "Quality" },
        { icon: "✏️", label: "Fresh" },
      ],
      freeShipping: true,
    },
    {
      id: 20,
      title: "Yoga Mat",
      currentPrice: "$20.00",
      originalPrice: "$40.00",
      images: [
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=600&fit=crop",
      ],
      description:
        "Non-slip yoga mat with excellent cushioning and eco-friendly materials.",
      features: [
        { icon: "😊", label: "Safe" },
        { icon: "📄", label: "Quality" },
        { icon: "✏️", label: "Fresh" },
      ],
      freeShipping: true,
    },
    {
      id: 21,
      title: "Dumbbells Set",
      currentPrice: "$50.00",
      originalPrice: "$100.00",
      images: [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop",
      ],
      description:
        "Adjustable dumbbells set for home workouts with comfortable grip.",
      features: [
        { icon: "😊", label: "Safe" },
        { icon: "📄", label: "Quality" },
        { icon: "✏️", label: "Fresh" },
      ],
      freeShipping: true,
    },
    {
      id: 22,
      title: "Running Shoes",
      currentPrice: "$75.00",
      originalPrice: "$150.00",
      images: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
      ],
      description:
        "Lightweight running shoes with superior cushioning and breathability.",
      features: [
        { icon: "😊", label: "Safe" },
        { icon: "📄", label: "Quality" },
        { icon: "✏️", label: "Fresh" },
      ],
      freeShipping: true,
    },
    {
      id: 23,
      title: "Designer Watch",
      currentPrice: "$500.00",
      originalPrice: "$1000.00",
      images: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
      ],
      description:
        "Elegant designer watch with premium materials and timeless design.",
      features: [
        { icon: "😊", label: "Safe" },
        { icon: "📄", label: "Quality" },
        { icon: "✏️", label: "Fresh" },
      ],
      freeShipping: true,
    },
    {
      id: 24,
      title: "Leather Bag",
      currentPrice: "$300.00",
      originalPrice: "$600.00",
      images: [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop",
      ],
      description:
        "Genuine leather bag with spacious compartments and stylish look.",
      features: [
        { icon: "😊", label: "Safe" },
        { icon: "📄", label: "Quality" },
        { icon: "✏️", label: "Fresh" },
      ],
      freeShipping: true,
    },
    {
      id: 25,
      title: "Sunglasses",
      currentPrice: "$150.00",
      originalPrice: "$300.00",
      images: [
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop",
      ],
      description:
        "UV-protective sunglasses with polarized lenses and lightweight frame.",
      features: [
        { icon: "😊", label: "Safe" },
        { icon: "📄", label: "Quality" },
        { icon: "✏️", label: "Fresh" },
      ],
      freeShipping: true,
    },
    {
      id: 26,
      title: "Bamboo Toothbrush",
      currentPrice: "$5.00",
      originalPrice: "$10.00",
      images: [
        "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=600&h=600&fit=crop",
      ],
      description:
        "Eco-friendly bamboo toothbrush with soft bristles and biodegradable design.",
      features: [
        { icon: "😊", label: "Safe" },
        { icon: "📄", label: "Quality" },
        { icon: "✏️", label: "Fresh" },
      ],
      freeShipping: true,
    },
    {
      id: 27,
      title: "Reusable Water Bottle",
      currentPrice: "$15.00",
      originalPrice: "$30.00",
      images: [
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=600&fit=crop",
      ],
      description:
        "Insulated reusable water bottle that keeps drinks cold for hours.",
      features: [
        { icon: "😊", label: "Safe" },
        { icon: "📄", label: "Quality" },
        { icon: "✏️", label: "Fresh" },
      ],
      freeShipping: true,
    },
    {
      id: 28,
      title: "Organic Cotton T-shirt",
      currentPrice: "$25.00",
      originalPrice: "$50.00",
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
      ],
      description:
        "Soft organic cotton T-shirt with comfortable fit and eco-friendly production.",
      features: [
        { icon: "😊", label: "Safe" },
        { icon: "📄", label: "Quality" },
        { icon: "✏️", label: "Fresh" },
      ],
      freeShipping: true,
    },
    {
      id: 29,
      title: "Travel Pillow",
      currentPrice: "$20.00",
      originalPrice: "$40.00",
      images: [
        "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=600&h=600&fit=crop",
      ],
      description:
        "Memory foam travel pillow for comfortable neck support during travel.",
      features: [
        { icon: "😊", label: "Safe" },
        { icon: "📄", label: "Quality" },
        { icon: "✏️", label: "Fresh" },
      ],
      freeShipping: true,
    },
    {
      id: 30,
      title: "Portable Charger",
      currentPrice: "$30.00",
      originalPrice: "$60.00",
      images: [
        "https://images.unsplash.com/photo-1609594040430-3b9b92a98e53?w=600&h=600&fit=crop",
      ],
      description:
        "High-capacity portable charger with fast charging capabilities.",
      features: [
        { icon: "😊", label: "Safe" },
        { icon: "📄", label: "Quality" },
        { icon: "✏️", label: "Fresh" },
      ],
      freeShipping: true,
    },
    {
      id: 31,
      title: "Compression Socks",
      currentPrice: "$15.00",
      originalPrice: "$30.00",
      images: [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop",
      ],
      description:
        "Compression socks for improved circulation and reduced swelling.",
      features: [
        { icon: "😊", label: "Safe" },
        { icon: "📄", label: "Quality" },
        { icon: "✏️", label: "Fresh" },
      ],
      freeShipping: true,
    },
    {
      id: 32,
      title: "Smart Lock",
      currentPrice: "$100.00",
      originalPrice: "$200.00",
      images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop",
      ],
      description: "Smart lock with keyless entry and mobile app control.",
      features: [
        { icon: "😊", label: "Safe" },
        { icon: "📄", label: "Quality" },
        { icon: "✏️", label: "Fresh" },
      ],
      freeShipping: true,
    },
    {
      id: 33,
      title: "Security Camera",
      currentPrice: "$80.00",
      originalPrice: "$160.00",
      images: [
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=600&fit=crop",
      ],
      description:
        "Wireless security camera with night vision and motion detection.",
      features: [
        { icon: "😊", label: "Safe" },
        { icon: "📄", label: "Quality" },
        { icon: "✏️", label: "Fresh" },
      ],
      freeShipping: true,
    },
    {
      id: 34,
      title: "Alarm System",
      currentPrice: "$150.00",
      originalPrice: "$300.00",
      images: [
        "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=600&h=600&fit=crop",
      ],
      description: "Home alarm system with sensors and smartphone alerts.",
      features: [
        { icon: "😊", label: "Safe" },
        { icon: "📄", label: "Quality" },
        { icon: "✏️", label: "Fresh" },
      ],
      freeShipping: false,
    },
  ];

  const detailedProduct =
    allProductDetails.find((p) => p.id === parseInt(id)) ||
    allProductDetails[0];
  if (summaryProduct) {
    detailedProduct.reviews = summaryProduct.reviews || [];
    detailedProduct.averageRating = summaryProduct.averageRating || 0;
    detailedProduct.reviewCount = summaryProduct.reviewCount || 0;
  }
  return detailedProduct;
};
