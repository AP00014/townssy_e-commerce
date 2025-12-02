(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/data/products.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "accessories",
    ()=>accessories,
    "bestSelling",
    ()=>bestSelling,
    "categories",
    ()=>categories,
    "ecoProducts",
    ()=>ecoProducts,
    "featuredProducts",
    ()=>featuredProducts,
    "getProductDetails",
    ()=>getProductDetails,
    "gridProducts",
    ()=>gridProducts,
    "hotProducts",
    ()=>hotProducts,
    "luxuryProducts",
    ()=>luxuryProducts,
    "manufacturers",
    ()=>manufacturers,
    "newArrivals",
    ()=>newArrivals,
    "securityProducts",
    ()=>securityProducts,
    "suppliers",
    ()=>suppliers,
    "tailoredSelections",
    ()=>tailoredSelections,
    "topDeals",
    ()=>topDeals,
    "topProducts",
    ()=>topProducts,
    "topRanking",
    ()=>topRanking,
    "topRated",
    ()=>topRated,
    "travelEssentials",
    ()=>travelEssentials
]);
const categories = [
    {
        id: 1,
        name: 'Environment',
        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop'
    },
    {
        id: 2,
        name: 'Agriculture',
        image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop'
    },
    {
        id: 3,
        name: 'Power Transmission',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop'
    },
    {
        id: 4,
        name: 'Safety',
        image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=200&h=200&fit=crop'
    },
    {
        id: 5,
        name: 'Pet Supplies',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop'
    },
    {
        id: 6,
        name: 'Testing Instrument & Equipment',
        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop'
    },
    {
        id: 7,
        name: 'Material Handling',
        image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop'
    },
    {
        id: 8,
        name: 'Fabrication Services',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop'
    },
    {
        id: 9,
        name: 'Rubber & Plastics',
        image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=200&h=200&fit=crop'
    },
    {
        id: 10,
        name: 'Purchasing agent',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop'
    },
    {
        id: 11,
        name: 'Business Services',
        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop'
    },
    {
        id: 12,
        name: 'Electronics',
        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop'
    },
    {
        id: 13,
        name: 'Fashion',
        image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop'
    },
    {
        id: 14,
        name: 'Home',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop'
    },
    {
        id: 15,
        name: 'Kitchen',
        image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=200&h=200&fit=crop'
    },
    {
        id: 16,
        name: 'Sports',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop'
    }
];
const suppliers = [
    {
        id: 1,
        name: 'Premium Suppliers'
    },
    {
        id: 2,
        name: 'Global Trade Co.'
    },
    {
        id: 3,
        name: 'Quality Goods Ltd.'
    },
    {
        id: 4,
        name: 'Best Deals Inc.'
    },
    {
        id: 5,
        name: 'Trusted Merchants'
    }
];
const manufacturers = [
    {
        id: 1,
        name: 'TechCorp Industries'
    },
    {
        id: 2,
        name: 'Fashion Forward'
    },
    {
        id: 3,
        name: 'Home Essentials Co.'
    },
    {
        id: 4,
        name: 'Kitchen Pro'
    },
    {
        id: 5,
        name: 'Sports Gear Inc.'
    }
];
const featuredProducts = [
    {
        id: 1,
        title: 'NEW Ulefone Watch',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
        currentPrice: '$30.0',
        originalPrice: '$40.0',
        isFavorite: false,
        sizes: [
            {
                size: 'One Size',
                available: true
            }
        ],
        specifications: {
            dimensions: '1.5 x 1.5 x 0.5 inches',
            weight: '0.2 lbs',
            material: 'Plastic and Metal',
            warranty: '1 year'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '2-3 business days',
            shippingOptions: [
                'Standard',
                'Express'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [
            {
                rating: 4.5,
                author: 'John Doe',
                date: '2023-10-01',
                comment: 'Great smartwatch!',
                verified: true
            }
        ],
        averageRating: 4.5,
        reviewCount: 1,
        labels: [
            {
                type: 'sale',
                text: 'Sale'
            }
        ],
        category: 'Electronics',
        tags: [
            'smart',
            'watch',
            'fitness'
        ]
    },
    {
        id: 2,
        title: 'White Jumpsuit',
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
        currentPrice: '₹ 1,100',
        originalPrice: '₹ 2,200',
        isFavorite: false,
        sizes: [
            {
                size: 'S',
                available: true
            },
            {
                size: 'M',
                available: true
            },
            {
                size: 'L',
                available: false
            }
        ],
        specifications: {
            dimensions: '36 x 28 x 1 inches',
            weight: '1 lbs',
            material: 'Cotton',
            warranty: 'N/A'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '3-5 business days',
            shippingOptions: [
                'Standard',
                'Express'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [
            {
                rating: 4.0,
                author: 'Jane Smith',
                date: '2023-09-15',
                comment: 'Stylish and comfortable!',
                verified: true
            }
        ],
        averageRating: 4.0,
        reviewCount: 1,
        labels: [
            {
                type: 'sale',
                text: 'Sale'
            }
        ],
        category: 'Fashion',
        tags: [
            'clothing',
            'jumpsuit',
            'women'
        ]
    },
    {
        id: 3,
        title: 'Vitamin C Serum',
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop',
        currentPrice: '₹ 2,453',
        originalPrice: '₹ 4,700',
        isFavorite: false,
        sizes: [
            {
                size: 'One Size',
                available: true
            }
        ],
        specifications: {
            dimensions: '2 x 2 x 4 inches',
            weight: '0.3 lbs',
            material: 'Glass and Plastic',
            warranty: 'N/A'
        },
        delivery: {
            freeShipping: false,
            estimatedDelivery: '5-7 business days',
            shippingOptions: [
                'Standard'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [
            {
                rating: 4.8,
                author: 'Alice Johnson',
                date: '2023-08-20',
                comment: 'Amazing for skin!',
                verified: true
            }
        ],
        averageRating: 4.8,
        reviewCount: 1,
        labels: [
            {
                type: 'sale',
                text: 'Sale'
            }
        ],
        category: 'Beauty',
        tags: [
            'skincare',
            'serum',
            'vitamin c'
        ]
    },
    {
        id: 4,
        title: 'Strip T-shirt',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
        currentPrice: '₹ 1,700',
        originalPrice: '₹ 3,400',
        isFavorite: false,
        sizes: [
            {
                size: 'S',
                available: true
            },
            {
                size: 'M',
                available: true
            },
            {
                size: 'L',
                available: true
            },
            {
                size: 'XL',
                available: false
            }
        ],
        specifications: {
            dimensions: '28 x 20 x 1 inches',
            weight: '0.5 lbs',
            material: 'Cotton',
            warranty: 'N/A'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '2-3 business days',
            shippingOptions: [
                'Standard',
                'Express'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [
            {
                rating: 4.2,
                author: 'Bob Wilson',
                date: '2023-07-10',
                comment: 'Comfortable fit!',
                verified: true
            }
        ],
        averageRating: 4.2,
        reviewCount: 1,
        labels: [
            {
                type: 'sale',
                text: 'Sale'
            }
        ],
        category: 'Fashion',
        tags: [
            'clothing',
            't-shirt',
            'striped'
        ]
    }
];
const topProducts = [
    {
        id: 5,
        title: 'Product Title',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
        currentPrice: '$24.00',
        originalPrice: null,
        isFavorite: false,
        sizes: [
            {
                size: 'One Size',
                available: true
            }
        ],
        specifications: {
            dimensions: '10 x 5 x 2 inches',
            weight: '1 lbs',
            material: 'Various',
            warranty: '1 year'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '2-3 business days',
            shippingOptions: [
                'Standard'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [],
        averageRating: 0,
        reviewCount: 0,
        labels: [],
        category: 'General',
        tags: [
            'product'
        ]
    },
    {
        id: 6,
        title: 'Product Title',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
        currentPrice: '$24.00',
        originalPrice: null,
        isFavorite: false,
        sizes: [
            {
                size: 'One Size',
                available: true
            }
        ],
        specifications: {
            dimensions: '10 x 5 x 2 inches',
            weight: '1 lbs',
            material: 'Various',
            warranty: '1 year'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '2-3 business days',
            shippingOptions: [
                'Standard'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [],
        averageRating: 0,
        reviewCount: 0,
        labels: [],
        category: 'General',
        tags: [
            'product'
        ]
    },
    {
        id: 7,
        title: 'Product Title',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
        currentPrice: '$24.00',
        originalPrice: null,
        isFavorite: false,
        sizes: [
            {
                size: 'One Size',
                available: true
            }
        ],
        specifications: {
            dimensions: '10 x 5 x 2 inches',
            weight: '1 lbs',
            material: 'Various',
            warranty: '1 year'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '2-3 business days',
            shippingOptions: [
                'Standard'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [],
        averageRating: 0,
        reviewCount: 0,
        labels: [],
        category: 'General',
        tags: [
            'product'
        ]
    }
];
const accessories = [
    {
        id: 8,
        title: 'Lorem ipsum lorem ipsum dolor sit amet',
        image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop',
        currentPrice: '$275.00',
        originalPrice: '$550.00',
        isFavorite: false,
        sizes: [
            {
                size: 'One Size',
                available: true
            }
        ],
        specifications: {
            dimensions: '12 x 8 x 3 inches',
            weight: '2 lbs',
            material: 'Various',
            warranty: '1 year'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '2-3 business days',
            shippingOptions: [
                'Standard'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [],
        averageRating: 0,
        reviewCount: 0,
        labels: [],
        category: 'Accessories',
        tags: [
            'accessory'
        ]
    },
    {
        id: 9,
        title: 'Lorem ipsum lorem ipsum dolor sit amet',
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
        currentPrice: '$900.00',
        originalPrice: '$1800.00',
        isFavorite: false,
        sizes: [
            {
                size: 'One Size',
                available: true
            }
        ],
        specifications: {
            dimensions: '12 x 8 x 3 inches',
            weight: '2 lbs',
            material: 'Various',
            warranty: '1 year'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '2-3 business days',
            shippingOptions: [
                'Standard'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [],
        averageRating: 0,
        reviewCount: 0,
        labels: [],
        category: 'Accessories',
        tags: [
            'accessory'
        ]
    },
    {
        id: 10,
        title: 'Lorem ipsum lorem ipsum dolor sit amet',
        image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop',
        currentPrice: '$400.00',
        originalPrice: '$800.00',
        isFavorite: false,
        sizes: [
            {
                size: 'One Size',
                available: true
            }
        ],
        specifications: {
            dimensions: '12 x 8 x 3 inches',
            weight: '2 lbs',
            material: 'Various',
            warranty: '1 year'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '2-3 business days',
            shippingOptions: [
                'Standard'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [],
        averageRating: 0,
        reviewCount: 0,
        labels: [],
        category: 'Accessories',
        tags: [
            'accessory'
        ]
    }
];
const newArrivals = [
    {
        id: 11,
        title: 'Smartphone Case',
        image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=400&h=400&fit=crop',
        currentPrice: '$15.00',
        originalPrice: '$30.00',
        isFavorite: false,
        media: [
            {
                type: 'image',
                url: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=600&h=600&fit=crop'
            }
        ],
        sizes: [
            {
                size: 'One Size',
                available: true
            }
        ],
        specifications: {
            dimensions: '6 x 4 x 0.5 inches',
            weight: '0.2 lbs',
            material: 'Plastic',
            warranty: '6 months'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '2-3 business days',
            shippingOptions: [
                'Standard',
                'Express'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [
            {
                rating: 4.5,
                author: 'User1',
                date: '2023-11-01',
                comment: 'Good protection!',
                verified: true
            }
        ],
        averageRating: 4.5,
        reviewCount: 1,
        labels: [
            {
                type: 'new',
                text: 'New Arrival'
            }
        ],
        category: 'Accessories',
        tags: [
            'phone',
            'case'
        ]
    },
    {
        id: 12,
        title: 'Wireless Charger',
        image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop',
        currentPrice: '$25.00',
        originalPrice: '$50.00',
        isFavorite: false,
        media: [
            {
                type: 'image',
                url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=600&fit=crop'
            }
        ],
        sizes: [
            {
                size: 'One Size',
                available: true
            }
        ],
        specifications: {
            dimensions: '4 x 4 x 0.5 inches',
            weight: '0.3 lbs',
            material: 'Plastic',
            warranty: '1 year'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '2-3 business days',
            shippingOptions: [
                'Standard',
                'Express'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [
            {
                rating: 4.0,
                author: 'User2',
                date: '2023-10-15',
                comment: 'Fast charging!',
                verified: true
            }
        ],
        averageRating: 4.0,
        reviewCount: 1,
        labels: [
            {
                type: 'new',
                text: 'New Arrival'
            }
        ],
        category: 'Electronics',
        tags: [
            'charger',
            'wireless'
        ]
    },
    {
        id: 13,
        title: 'Bluetooth Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
        currentPrice: '$80.00',
        originalPrice: '$160.00',
        isFavorite: false,
        sizes: [
            {
                size: 'One Size',
                available: true
            }
        ],
        specifications: {
            dimensions: '8 x 6 x 2 inches',
            weight: '0.5 lbs',
            material: 'Plastic and Metal',
            warranty: '1 year'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '2-3 business days',
            shippingOptions: [
                'Standard',
                'Express'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [
            {
                rating: 4.8,
                author: 'User3',
                date: '2023-09-20',
                comment: 'Great sound!',
                verified: true
            }
        ],
        averageRating: 4.8,
        reviewCount: 1,
        labels: [
            {
                type: 'new',
                text: 'New Arrival'
            }
        ],
        category: 'Electronics',
        tags: [
            'headphones',
            'bluetooth'
        ]
    }
];
const hotProducts = [
    {
        id: 14,
        title: 'Gaming Mouse',
        image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop',
        currentPrice: '$45.00',
        originalPrice: '$90.00',
        isFavorite: false,
        sizes: [
            {
                size: 'One Size',
                available: true
            }
        ],
        specifications: {
            dimensions: '5 x 3 x 1.5 inches',
            weight: '0.3 lbs',
            material: 'Plastic',
            warranty: '1 year'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '2-3 business days',
            shippingOptions: [
                'Standard',
                'Express'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [
            {
                rating: 4.7,
                author: 'Gamer1',
                date: '2023-12-01',
                comment: 'Precise and responsive!',
                verified: true
            }
        ],
        averageRating: 4.7,
        reviewCount: 1,
        labels: [
            {
                type: 'hot',
                text: 'Hot Product'
            }
        ],
        category: 'Electronics',
        tags: [
            'gaming',
            'mouse'
        ]
    },
    {
        id: 15,
        title: 'Mechanical Keyboard',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop',
        currentPrice: '$120.00',
        originalPrice: '$240.00',
        isFavorite: false,
        sizes: [
            {
                size: 'One Size',
                available: true
            }
        ],
        specifications: {
            dimensions: '18 x 6 x 1.5 inches',
            weight: '2 lbs',
            material: 'Plastic and Metal',
            warranty: '2 years'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '2-3 business days',
            shippingOptions: [
                'Standard',
                'Express'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [
            {
                rating: 4.9,
                author: 'Typist2',
                date: '2023-11-15',
                comment: 'Amazing typing feel!',
                verified: true
            }
        ],
        averageRating: 4.9,
        reviewCount: 1,
        labels: [
            {
                type: 'hot',
                text: 'Hot Product'
            }
        ],
        category: 'Electronics',
        tags: [
            'keyboard',
            'mechanical'
        ]
    },
    {
        id: 16,
        title: 'LED Monitor',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop',
        currentPrice: '$200.00',
        originalPrice: '$400.00',
        isFavorite: false,
        sizes: [
            {
                size: 'One Size',
                available: true
            }
        ],
        specifications: {
            dimensions: '24 x 14 x 6 inches',
            weight: '8 lbs',
            material: 'Plastic and Glass',
            warranty: '3 years'
        },
        delivery: {
            freeShipping: false,
            estimatedDelivery: '5-7 business days',
            shippingOptions: [
                'Standard'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [
            {
                rating: 4.6,
                author: 'Tech3',
                date: '2023-10-20',
                comment: 'Vivid colors!',
                verified: true
            }
        ],
        averageRating: 4.6,
        reviewCount: 1,
        labels: [
            {
                type: 'hot',
                text: 'Hot Product'
            }
        ],
        category: 'Electronics',
        tags: [
            'monitor',
            'led'
        ]
    }
];
const topRated = [
    {
        id: 17,
        title: 'Coffee Maker',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop',
        currentPrice: '$60.00',
        originalPrice: '$120.00',
        isFavorite: false,
        sizes: [
            {
                size: 'One Size',
                available: true
            }
        ],
        specifications: {
            dimensions: '12 x 8 x 14 inches',
            weight: '5 lbs',
            material: 'Plastic and Metal',
            warranty: '2 years'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '2-3 business days',
            shippingOptions: [
                'Standard',
                'Express'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [
            {
                rating: 4.8,
                author: 'CoffeeLover',
                date: '2023-10-05',
                comment: 'Makes great coffee!',
                verified: true
            }
        ],
        averageRating: 4.8,
        reviewCount: 1,
        labels: [
            {
                type: 'top',
                text: 'Top Rated'
            }
        ],
        category: 'Kitchen',
        tags: [
            'coffee',
            'maker'
        ]
    },
    {
        id: 18,
        title: 'Blender',
        image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&h=400&fit=crop',
        currentPrice: '$35.00',
        originalPrice: '$70.00',
        isFavorite: false,
        sizes: [
            {
                size: 'One Size',
                available: true
            }
        ],
        specifications: {
            dimensions: '8 x 6 x 12 inches',
            weight: '3 lbs',
            material: 'Plastic',
            warranty: '1 year'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '2-3 business days',
            shippingOptions: [
                'Standard',
                'Express'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [
            {
                rating: 4.5,
                author: 'SmoothieFan',
                date: '2023-09-12',
                comment: 'Powerful and easy to use!',
                verified: true
            }
        ],
        averageRating: 4.5,
        reviewCount: 1,
        labels: [
            {
                type: 'top',
                text: 'Top Rated'
            }
        ],
        category: 'Kitchen',
        tags: [
            'blender'
        ]
    },
    {
        id: 19,
        title: 'Air Fryer',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
        currentPrice: '$100.00',
        originalPrice: '$200.00',
        isFavorite: false,
        sizes: [
            {
                size: 'One Size',
                available: true
            }
        ],
        specifications: {
            dimensions: '10 x 10 x 12 inches',
            weight: '6 lbs',
            material: 'Plastic and Metal',
            warranty: '2 years'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '2-3 business days',
            shippingOptions: [
                'Standard',
                'Express'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [
            {
                rating: 4.9,
                author: 'HealthyEater',
                date: '2023-08-25',
                comment: 'Crispy and healthy!',
                verified: true
            }
        ],
        averageRating: 4.9,
        reviewCount: 1,
        labels: [
            {
                type: 'top',
                text: 'Top Rated'
            }
        ],
        category: 'Kitchen',
        tags: [
            'air fryer'
        ]
    }
];
const bestSelling = [
    {
        id: 20,
        title: 'Yoga Mat',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
        currentPrice: '$20.00',
        originalPrice: '$40.00',
        isFavorite: false,
        sizes: [
            {
                size: 'One Size',
                available: true
            }
        ],
        specifications: {
            dimensions: '24 x 68 x 0.25 inches',
            weight: '2 lbs',
            material: 'Rubber',
            warranty: '1 year'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '2-3 business days',
            shippingOptions: [
                'Standard',
                'Express'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [
            {
                rating: 4.7,
                author: 'Yogi',
                date: '2023-11-20',
                comment: 'Non-slip and comfortable!',
                verified: true
            }
        ],
        averageRating: 4.7,
        reviewCount: 1,
        labels: [
            {
                type: 'best',
                text: 'Best Selling'
            }
        ],
        category: 'Sports',
        tags: [
            'yoga',
            'mat'
        ]
    },
    {
        id: 21,
        title: 'Dumbbells Set',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
        currentPrice: '$50.00',
        originalPrice: '$100.00',
        isFavorite: false,
        sizes: [
            {
                size: '5-25 lbs',
                available: true
            }
        ],
        specifications: {
            dimensions: '10 x 5 x 5 inches',
            weight: '15 lbs',
            material: 'Metal',
            warranty: 'Lifetime'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '2-3 business days',
            shippingOptions: [
                'Standard',
                'Express'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [
            {
                rating: 4.6,
                author: 'FitnessGuy',
                date: '2023-10-30',
                comment: 'Great for home workouts!',
                verified: true
            }
        ],
        averageRating: 4.6,
        reviewCount: 1,
        labels: [
            {
                type: 'best',
                text: 'Best Selling'
            }
        ],
        category: 'Sports',
        tags: [
            'dumbbells'
        ]
    },
    {
        id: 22,
        title: 'Running Shoes',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
        currentPrice: '$75.00',
        originalPrice: '$150.00',
        isFavorite: false,
        sizes: [
            {
                size: '7',
                available: true
            },
            {
                size: '8',
                available: true
            },
            {
                size: '9',
                available: false
            }
        ],
        specifications: {
            dimensions: '12 x 4 x 4 inches',
            weight: '1 lbs',
            material: 'Mesh and Rubber',
            warranty: '1 year'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '2-3 business days',
            shippingOptions: [
                'Standard',
                'Express'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [
            {
                rating: 4.8,
                author: 'Runner',
                date: '2023-09-18',
                comment: 'Comfortable and lightweight!',
                verified: true
            }
        ],
        averageRating: 4.8,
        reviewCount: 1,
        labels: [
            {
                type: 'best',
                text: 'Best Selling'
            }
        ],
        category: 'Sports',
        tags: [
            'running',
            'shoes'
        ]
    }
];
const luxuryProducts = [
    {
        id: 23,
        title: 'Designer Watch',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
        currentPrice: '$500.00',
        originalPrice: '$1000.00',
        isFavorite: false,
        sizes: [
            {
                size: 'One Size',
                available: true
            }
        ],
        specifications: {
            dimensions: '1.5 x 1.5 x 0.5 inches',
            weight: '0.3 lbs',
            material: 'Gold and Leather',
            warranty: '5 years'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '2-3 business days',
            shippingOptions: [
                'Standard',
                'Express'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [
            {
                rating: 5.0,
                author: 'LuxuryBuyer',
                date: '2023-12-10',
                comment: 'Elegant and timeless!',
                verified: true
            }
        ],
        averageRating: 5.0,
        reviewCount: 1,
        labels: [
            {
                type: 'luxury',
                text: 'Luxury'
            }
        ],
        category: 'Fashion',
        tags: [
            'watch'
        ]
    },
    {
        id: 24,
        title: 'Leather Bag',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
        currentPrice: '$300.00',
        originalPrice: '$600.00',
        isFavorite: false,
        sizes: [
            {
                size: 'One Size',
                available: true
            }
        ],
        specifications: {
            dimensions: '12 x 10 x 4 inches',
            weight: '2 lbs',
            material: 'Leather',
            warranty: '2 years'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '2-3 business days',
            shippingOptions: [
                'Standard',
                'Express'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [
            {
                rating: 4.9,
                author: 'Fashionista',
                date: '2023-11-05',
                comment: 'Stylish and durable!',
                verified: true
            }
        ],
        averageRating: 4.9,
        reviewCount: 1,
        labels: [
            {
                type: 'luxury',
                text: 'Luxury'
            }
        ],
        category: 'Fashion',
        tags: [
            'bag'
        ]
    },
    {
        id: 25,
        title: 'Sunglasses',
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
        currentPrice: '$150.00',
        originalPrice: '$300.00',
        isFavorite: false,
        sizes: [
            {
                size: 'One Size',
                available: true
            }
        ],
        specifications: {
            dimensions: '6 x 2 x 6 inches',
            weight: '0.2 lbs',
            material: 'Metal and Glass',
            warranty: '1 year'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '2-3 business days',
            shippingOptions: [
                'Standard',
                'Express'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [
            {
                rating: 4.7,
                author: 'SunSeeker',
                date: '2023-10-15',
                comment: 'UV protection and style!',
                verified: true
            }
        ],
        averageRating: 4.7,
        reviewCount: 1,
        labels: [
            {
                type: 'luxury',
                text: 'Luxury'
            }
        ],
        category: 'Fashion',
        tags: [
            'sunglasses'
        ]
    }
];
const ecoProducts = [
    {
        id: 26,
        title: 'Bamboo Toothbrush',
        image: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=400&h=400&fit=crop',
        currentPrice: '$5.00',
        originalPrice: '$10.00',
        isFavorite: false,
        sizes: [
            {
                size: 'One Size',
                available: true
            }
        ],
        specifications: {
            dimensions: '7 x 1 x 0.5 inches',
            weight: '0.1 lbs',
            material: 'Bamboo',
            warranty: 'N/A'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '2-3 business days',
            shippingOptions: [
                'Standard'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [
            {
                rating: 4.5,
                author: 'EcoUser',
                date: '2023-11-10',
                comment: 'Great eco-friendly alternative!',
                verified: true
            }
        ],
        averageRating: 4.5,
        reviewCount: 1,
        labels: [
            {
                type: 'eco',
                text: 'Eco-Friendly'
            }
        ],
        category: 'Beauty',
        tags: [
            'eco',
            'toothbrush'
        ]
    },
    {
        id: 27,
        title: 'Reusable Water Bottle',
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop',
        currentPrice: '$15.00',
        originalPrice: '$30.00',
        isFavorite: false,
        sizes: [
            {
                size: 'One Size',
                available: true
            }
        ],
        specifications: {
            dimensions: '3 x 3 x 10 inches',
            weight: '0.5 lbs',
            material: 'Stainless Steel',
            warranty: '1 year'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '2-3 business days',
            shippingOptions: [
                'Standard'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [
            {
                rating: 4.8,
                author: 'Hydrated',
                date: '2023-10-25',
                comment: 'Keeps drinks cold perfectly!',
                verified: true
            }
        ],
        averageRating: 4.8,
        reviewCount: 1,
        labels: [
            {
                type: 'eco',
                text: 'Eco-Friendly'
            }
        ],
        category: 'Home',
        tags: [
            'water bottle'
        ]
    },
    {
        id: 28,
        title: 'Organic Cotton T-shirt',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
        currentPrice: '$25.00',
        originalPrice: '$50.00',
        isFavorite: false,
        sizes: [
            {
                size: 'S',
                available: true
            },
            {
                size: 'M',
                available: true
            },
            {
                size: 'L',
                available: true
            }
        ],
        specifications: {
            dimensions: '28 x 20 x 1 inches',
            weight: '0.5 lbs',
            material: 'Organic Cotton',
            warranty: 'N/A'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '2-3 business days',
            shippingOptions: [
                'Standard'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [
            {
                rating: 4.6,
                author: 'OrganicFan',
                date: '2023-09-15',
                comment: 'Soft and comfortable!',
                verified: true
            }
        ],
        averageRating: 4.6,
        reviewCount: 1,
        labels: [
            {
                type: 'eco',
                text: 'Eco-Friendly'
            }
        ],
        category: 'Fashion',
        tags: [
            'organic',
            't-shirt'
        ]
    }
];
const travelEssentials = [
    {
        id: 29,
        title: 'Travel Pillow',
        image: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=400&h=400&fit=crop',
        currentPrice: '$20.00',
        originalPrice: '$40.00',
        isFavorite: false,
        sizes: [
            {
                size: 'One Size',
                available: true
            }
        ],
        specifications: {
            dimensions: '12 x 10 x 4 inches',
            weight: '0.8 lbs',
            material: 'Memory Foam',
            warranty: '1 year'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '2-3 business days',
            shippingOptions: [
                'Standard'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [
            {
                rating: 4.7,
                author: 'Traveler',
                date: '2023-12-05',
                comment: 'Comfortable for long flights!',
                verified: true
            }
        ],
        averageRating: 4.7,
        reviewCount: 1,
        labels: [
            {
                type: 'travel',
                text: 'Travel Essential'
            }
        ],
        category: 'Travel',
        tags: [
            'pillow'
        ]
    },
    {
        id: 30,
        title: 'Portable Charger',
        image: 'https://images.unsplash.com/photo-1609594040430-3b9b92a98e53?w=400&h=400&fit=crop',
        currentPrice: '$30.00',
        originalPrice: '$60.00',
        isFavorite: false,
        sizes: [
            {
                size: 'One Size',
                available: true
            }
        ],
        specifications: {
            dimensions: '4 x 3 x 1 inches',
            weight: '0.5 lbs',
            material: 'Plastic',
            warranty: '1 year'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '2-3 business days',
            shippingOptions: [
                'Standard'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [
            {
                rating: 4.9,
                author: 'PowerUser',
                date: '2023-11-20',
                comment: 'Fast charging on the go!',
                verified: true
            }
        ],
        averageRating: 4.9,
        reviewCount: 1,
        labels: [
            {
                type: 'travel',
                text: 'Travel Essential'
            }
        ],
        category: 'Electronics',
        tags: [
            'charger'
        ]
    },
    {
        id: 31,
        title: 'Compression Socks',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
        currentPrice: '$15.00',
        originalPrice: '$30.00',
        isFavorite: false,
        sizes: [
            {
                size: 'M',
                available: true
            },
            {
                size: 'L',
                available: true
            }
        ],
        specifications: {
            dimensions: '10 x 4 x 0.1 inches',
            weight: '0.2 lbs',
            material: 'Nylon',
            warranty: 'N/A'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '2-3 business days',
            shippingOptions: [
                'Standard'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [
            {
                rating: 4.4,
                author: 'RunnerTraveler',
                date: '2023-10-30',
                comment: 'Helps with circulation!',
                verified: true
            }
        ],
        averageRating: 4.4,
        reviewCount: 1,
        labels: [
            {
                type: 'travel',
                text: 'Travel Essential'
            }
        ],
        category: 'Sports',
        tags: [
            'socks'
        ]
    }
];
const securityProducts = [
    {
        id: 32,
        title: 'Smart Lock',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
        currentPrice: '$100.00',
        originalPrice: '$200.00',
        isFavorite: false,
        sizes: [
            {
                size: 'One Size',
                available: true
            }
        ],
        specifications: {
            dimensions: '6 x 3 x 2 inches',
            weight: '1 lbs',
            material: 'Metal',
            warranty: '2 years'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '2-3 business days',
            shippingOptions: [
                'Standard'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [
            {
                rating: 4.8,
                author: 'HomeOwner',
                date: '2023-12-15',
                comment: 'Easy keyless entry!',
                verified: true
            }
        ],
        averageRating: 4.8,
        reviewCount: 1,
        labels: [
            {
                type: 'security',
                text: 'Security'
            }
        ],
        category: 'Security',
        tags: [
            'lock'
        ]
    },
    {
        id: 33,
        title: 'Security Camera',
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=400&fit=crop',
        currentPrice: '$80.00',
        originalPrice: '$160.00',
        isFavorite: false,
        sizes: [
            {
                size: 'One Size',
                available: true
            }
        ],
        specifications: {
            dimensions: '4 x 3 x 2 inches',
            weight: '0.5 lbs',
            material: 'Plastic',
            warranty: '1 year'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '2-3 business days',
            shippingOptions: [
                'Standard'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [
            {
                rating: 4.6,
                author: 'SecurityFan',
                date: '2023-11-25',
                comment: 'Clear night vision!',
                verified: true
            }
        ],
        averageRating: 4.6,
        reviewCount: 1,
        labels: [
            {
                type: 'security',
                text: 'Security'
            }
        ],
        category: 'Security',
        tags: [
            'camera'
        ]
    },
    {
        id: 34,
        title: 'Alarm System',
        image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=400&h=400&fit=crop',
        currentPrice: '$150.00',
        originalPrice: '$300.00',
        isFavorite: false,
        sizes: [
            {
                size: 'One Size',
                available: true
            }
        ],
        specifications: {
            dimensions: '8 x 6 x 2 inches',
            weight: '2 lbs',
            material: 'Plastic and Metal',
            warranty: '3 years'
        },
        delivery: {
            freeShipping: false,
            estimatedDelivery: '5-7 business days',
            shippingOptions: [
                'Standard'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [
            {
                rating: 4.9,
                author: 'SafeHome',
                date: '2023-10-20',
                comment: 'Reliable protection!',
                verified: true
            }
        ],
        averageRating: 4.9,
        reviewCount: 1,
        labels: [
            {
                type: 'security',
                text: 'Security'
            }
        ],
        category: 'Security',
        tags: [
            'alarm'
        ]
    }
];
const topDeals = [
    {
        id: 35,
        title: 'Colorful Retractable Ballpoint Pens',
        image: 'https://images.unsplash.com/photo-1583484963886-cce23f3a5878?w=400&h=400&fit=crop',
        currentPrice: '$0.08',
        originalPrice: null,
        isFavorite: false,
        badge: {
            type: 'flash',
            text: 'Flash Deal',
            position: 'image'
        },
        sizes: [
            {
                size: 'One Size',
                available: true
            }
        ],
        specifications: {
            dimensions: '6 x 0.5 x 0.5 inches',
            weight: '0.1 lbs',
            material: 'Plastic',
            warranty: 'N/A'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '2-3 business days',
            shippingOptions: [
                'Standard'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [
            {
                rating: 4.5,
                author: 'Student',
                date: '2023-12-20',
                comment: 'Great for writing!',
                verified: true
            }
        ],
        averageRating: 4.5,
        reviewCount: 1,
        labels: [
            {
                type: 'deal',
                text: 'Deal'
            }
        ],
        category: 'Office',
        tags: [
            'pens'
        ]
    },
    {
        id: 36,
        title: 'Chrome Car Wheel LSGZL',
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=400&fit=crop',
        currentPrice: '$230',
        originalPrice: null,
        isFavorite: false,
        priceIndicator: {
            type: 'lower',
            text: 'Lower priced than similar'
        },
        sizes: [
            {
                size: '16 inches',
                available: true
            }
        ],
        specifications: {
            dimensions: '16 x 16 x 6 inches',
            weight: '20 lbs',
            material: 'Chrome',
            warranty: '1 year'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '5-7 business days',
            shippingOptions: [
                'Standard'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [
            {
                rating: 4.7,
                author: 'CarEnthusiast',
                date: '2023-11-15',
                comment: 'Shiny and durable!',
                verified: true
            }
        ],
        averageRating: 4.7,
        reviewCount: 1,
        labels: [
            {
                type: 'deal',
                text: 'Deal'
            }
        ],
        category: 'Automotive',
        tags: [
            'wheel'
        ]
    },
    {
        id: 37,
        title: 'Premium Coffee Grounds',
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop',
        currentPrice: '$3',
        originalPrice: null,
        isFavorite: false,
        priceIndicator: {
            type: 'lower',
            text: 'Lower priced than similar'
        },
        sizes: [
            {
                size: '1 lb',
                available: true
            }
        ],
        specifications: {
            dimensions: '8 x 6 x 3 inches',
            weight: '1 lbs',
            material: 'Coffee',
            warranty: 'N/A'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '2-3 business days',
            shippingOptions: [
                'Standard'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [
            {
                rating: 4.8,
                author: 'CoffeeLover',
                date: '2023-10-10',
                comment: 'Rich flavor!',
                verified: true
            }
        ],
        averageRating: 4.8,
        reviewCount: 1,
        labels: [
            {
                type: 'deal',
                text: 'Deal'
            }
        ],
        category: 'Food',
        tags: [
            'coffee'
        ]
    }
];
const topRanking = [
    {
        id: 38,
        title: 'Manufacturer 75 Inch Led Television 65 Inch 4k UHD Smart TV',
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop',
        currentPrice: null,
        originalPrice: null,
        isFavorite: false,
        badge: {
            type: 'ranking',
            text: 'Top ranked last month',
            position: 'below-title',
            icon: 'crown'
        },
        category: 'Hot selling',
        subcategory: 'Smart TVs',
        sizes: [
            {
                size: '75 inches',
                available: true
            }
        ],
        specifications: {
            dimensions: '66 x 38 x 3 inches',
            weight: '50 lbs',
            material: 'Plastic and Glass',
            warranty: '2 years'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '5-7 business days',
            shippingOptions: [
                'Standard'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [],
        averageRating: 0,
        reviewCount: 0,
        labels: [
            {
                type: 'ranking',
                text: 'Top Ranking'
            }
        ],
        tags: [
            'tv',
            'smart'
        ]
    },
    {
        id: 39,
        title: 'Accept Custom 4K Android Flat Screen Led Tv Smart TV',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop',
        currentPrice: null,
        originalPrice: null,
        isFavorite: false,
        badge: {
            type: 'rising',
            text: 'On the rise in Hot selling Smart TVs',
            position: 'below-title',
            icon: 'arrow-up'
        },
        category: 'Hot selling',
        subcategory: 'Smart TVs',
        sizes: [
            {
                size: '55 inches',
                available: true
            }
        ],
        specifications: {
            dimensions: '48 x 28 x 3 inches',
            weight: '30 lbs',
            material: 'Plastic and Glass',
            warranty: '2 years'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '5-7 business days',
            shippingOptions: [
                'Standard'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [],
        averageRating: 0,
        reviewCount: 0,
        labels: [
            {
                type: 'ranking',
                text: 'Top Ranking'
            }
        ],
        tags: [
            'tv',
            'smart'
        ]
    },
    {
        id: 40,
        title: 'TLC LED TV Smart World\'s Top 2 Ranking UHD 4K Original',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop',
        currentPrice: null,
        originalPrice: null,
        isFavorite: false,
        badge: {
            type: 'rising',
            text: 'On the rise in Hot selling LED TVs',
            position: 'below-title',
            icon: 'arrow-up'
        },
        category: 'Hot selling',
        subcategory: 'LED TVs',
        sizes: [
            {
                size: '65 inches',
                available: true
            }
        ],
        specifications: {
            dimensions: '57 x 33 x 3 inches',
            weight: '40 lbs',
            material: 'Plastic and Glass',
            warranty: '2 years'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '5-7 business days',
            shippingOptions: [
                'Standard'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [],
        averageRating: 0,
        reviewCount: 0,
        labels: [
            {
                type: 'ranking',
                text: 'Top Ranking'
            }
        ],
        tags: [
            'tv',
            'led'
        ]
    },
    {
        id: 41,
        title: 'Global Version POCO X7 5G Smartphone MTK Dimensity',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
        currentPrice: null,
        originalPrice: null,
        isFavorite: false,
        badge: {
            type: 'ranking',
            text: 'Top ranked last month',
            position: 'below-title',
            icon: 'crown'
        },
        category: 'Hot selling',
        subcategory: 'Smartphones',
        sizes: [
            {
                size: '6.5 inches',
                available: true
            }
        ],
        specifications: {
            dimensions: '6 x 3 x 0.3 inches',
            weight: '0.5 lbs',
            material: 'Glass and Metal',
            warranty: '1 year'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '2-3 business days',
            shippingOptions: [
                'Standard'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [],
        averageRating: 0,
        reviewCount: 0,
        labels: [
            {
                type: 'ranking',
                text: 'Top Ranking'
            }
        ],
        tags: [
            'phone',
            'smartphone'
        ]
    }
];
const tailoredSelections = [
    {
        id: 41,
        label: "Women's Clothes",
        slug: "womens-clothes",
        category: "Fashion",
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=200&fit=crop'
    },
    {
        id: 42,
        label: 'Designer Shoe',
        slug: "designer-shoes",
        category: "Fashion",
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop'
    },
    {
        id: 43,
        label: 'Food Trailer',
        slug: "food-trailers",
        category: "Food",
        image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=200&h=200&fit=crop'
    },
    {
        id: 44,
        label: 'Spider Hoodie',
        slug: "spider-hoodies",
        category: "Fashion",
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop'
    }
];
const gridProducts = [
    {
        id: 45,
        title: 'Wholesale Personal Nail Art Set',
        image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop',
        currentPrice: '$1.80',
        originalPrice: null,
        isFavorite: false,
        sizes: [
            {
                size: 'One Size',
                available: true
            }
        ],
        specifications: {
            dimensions: '4 x 3 x 1 inches',
            weight: '0.2 lbs',
            material: 'Plastic',
            warranty: 'N/A'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '2-3 business days',
            shippingOptions: [
                'Standard'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [],
        averageRating: 0,
        reviewCount: 0,
        labels: [],
        category: 'Beauty',
        tags: [
            'nail',
            'art'
        ]
    },
    {
        id: 46,
        title: 'Best-selling Embroidered Round Neck Sweater',
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop',
        currentPrice: '$12',
        originalPrice: null,
        isFavorite: false,
        priceIndicator: {
            type: 'lower',
            text: 'Lower priced than similar'
        },
        sizes: [
            {
                size: 'M',
                available: true
            },
            {
                size: 'L',
                available: true
            }
        ],
        specifications: {
            dimensions: '20 x 16 x 1 inches',
            weight: '1 lbs',
            material: 'Cotton',
            warranty: 'N/A'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '2-3 business days',
            shippingOptions: [
                'Standard'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [],
        averageRating: 0,
        reviewCount: 0,
        labels: [],
        category: 'Fashion',
        tags: [
            'sweater',
            'embroidered'
        ]
    },
    {
        id: 47,
        title: 'Botellas De Agua Vacuum Flask Set',
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop',
        currentPrice: '$1.63',
        originalPrice: null,
        isFavorite: false,
        sizes: [
            {
                size: 'One Size',
                available: true
            }
        ],
        specifications: {
            dimensions: '3 x 3 x 10 inches',
            weight: '0.5 lbs',
            material: 'Stainless Steel',
            warranty: '1 year'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '2-3 business days',
            shippingOptions: [
                'Standard'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [],
        averageRating: 0,
        reviewCount: 0,
        labels: [],
        category: 'Home',
        tags: [
            'flask',
            'vacuum'
        ]
    },
    {
        id: 48,
        title: 'New 304 Stainless Steel Tumblers',
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop',
        currentPrice: '$2.63',
        originalPrice: null,
        isFavorite: false,
        priceIndicator: {
            type: 'lower',
            text: 'Lower priced than similar'
        },
        sizes: [
            {
                size: 'One Size',
                available: true
            }
        ],
        specifications: {
            dimensions: '3 x 3 x 6 inches',
            weight: '0.3 lbs',
            material: 'Stainless Steel',
            warranty: '1 year'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '2-3 business days',
            shippingOptions: [
                'Standard'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [],
        averageRating: 0,
        reviewCount: 0,
        labels: [],
        category: 'Home',
        tags: [
            'tumbler',
            'stainless steel'
        ]
    },
    {
        id: 49,
        title: 'Cute Cartoon Ring Custom Character',
        image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&h=400&fit=crop',
        currentPrice: '$10.99-11.99',
        originalPrice: null,
        isFavorite: false,
        sizes: [
            {
                size: 'One Size',
                available: true
            }
        ],
        specifications: {
            dimensions: '1 x 1 x 0.5 inches',
            weight: '0.1 lbs',
            material: 'Metal',
            warranty: 'N/A'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '2-3 business days',
            shippingOptions: [
                'Standard'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [],
        averageRating: 0,
        reviewCount: 0,
        labels: [],
        category: 'Fashion',
        tags: [
            'ring',
            'cartoon'
        ]
    },
    {
        id: 50,
        title: '2025 New Arrival Athletic Set',
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
        currentPrice: '$17.02',
        originalPrice: null,
        isFavorite: false,
        sizes: [
            {
                size: 'M',
                available: true
            },
            {
                size: 'L',
                available: true
            }
        ],
        specifications: {
            dimensions: '20 x 16 x 1 inches',
            weight: '1 lbs',
            material: 'Cotton',
            warranty: 'N/A'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '2-3 business days',
            shippingOptions: [
                'Standard'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [],
        averageRating: 0,
        reviewCount: 0,
        labels: [],
        category: 'Sports',
        tags: [
            'athletic',
            'set'
        ]
    },
    {
        id: 51,
        title: 'Exquisite Mug Creation Set',
        image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop',
        currentPrice: '$2.20',
        originalPrice: null,
        isFavorite: false,
        sizes: [
            {
                size: 'One Size',
                available: true
            }
        ],
        specifications: {
            dimensions: '4 x 4 x 4 inches',
            weight: '0.5 lbs',
            material: 'Ceramic',
            warranty: 'N/A'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '2-3 business days',
            shippingOptions: [
                'Standard'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [],
        averageRating: 0,
        reviewCount: 0,
        labels: [],
        category: 'Home',
        tags: [
            'mug',
            'creation'
        ]
    },
    {
        id: 52,
        title: 'SAVE High Quality Luxury Sunglasses',
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
        currentPrice: '$4.60',
        originalPrice: null,
        isFavorite: false,
        sizes: [
            {
                size: 'One Size',
                available: true
            }
        ],
        specifications: {
            dimensions: '6 x 2 x 6 inches',
            weight: '0.2 lbs',
            material: 'Metal and Glass',
            warranty: '1 year'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '2-3 business days',
            shippingOptions: [
                'Standard'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [],
        averageRating: 0,
        reviewCount: 0,
        labels: [],
        category: 'Fashion',
        tags: [
            'sunglasses',
            'luxury'
        ]
    },
    {
        id: 53,
        title: 'Local stock Perfume Manufacturing Set',
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop',
        currentPrice: '$4.84',
        originalPrice: null,
        isFavorite: false,
        sizes: [
            {
                size: 'One Size',
                available: true
            }
        ],
        specifications: {
            dimensions: '2 x 2 x 4 inches',
            weight: '0.3 lbs',
            material: 'Glass and Plastic',
            warranty: 'N/A'
        },
        delivery: {
            freeShipping: true,
            estimatedDelivery: '2-3 business days',
            shippingOptions: [
                'Standard'
            ],
            returnPolicy: '30-day return policy'
        },
        reviews: [],
        averageRating: 0,
        reviewCount: 0,
        labels: [],
        category: 'Beauty',
        tags: [
            'perfume'
        ]
    }
];
const getProductDetails = (id)=>{
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
        ...gridProducts
    ];
    const summaryProduct = allSummaryProducts.find((p)=>p.id === parseInt(id));
    const allProductDetails = [
        {
            id: 1,
            title: 'NEW Ulefone Watch',
            currentPrice: '$30.0',
            originalPrice: '$40.0',
            media: [
                {
                    type: 'image',
                    url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop'
                },
                {
                    type: 'image',
                    url: 'https://images.unsplash.com/photo-1579586337278-3befd40f17da?w=600&h=600&fit=crop'
                }
            ],
            description: 'NEW Original Ulefone Watch 1.3 inch TFT Touch Screen 5 ATM Waterproof & 9 Sports Mode BT 4.2 Smart Watch Same Day Shipping on orders before 6PM (GMT+8), shipped from Hong Kong Warehouse',
            features: [
                {
                    icon: '😊',
                    label: 'Safe'
                },
                {
                    icon: '📄',
                    label: 'Quality'
                },
                {
                    icon: '✏️',
                    label: 'Fresh'
                }
            ],
            freeShipping: true,
            delivery: {
                freeShipping: true,
                estimatedDelivery: '2-3 business days',
                shippingOptions: [
                    'Standard',
                    'Express'
                ],
                returnPolicy: '30-day return policy'
            },
            reviews: summaryProduct?.reviews || [],
            averageRating: summaryProduct?.averageRating || 0,
            reviewCount: summaryProduct?.reviewCount || 0
        },
        {
            id: 2,
            title: 'White Jumpsuit',
            currentPrice: '₹ 1,100',
            originalPrice: '₹ 2,200',
            media: [
                {
                    type: 'image',
                    url: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=600&fit=crop'
                },
                {
                    type: 'image',
                    url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=600&fit=crop'
                }
            ],
            description: 'Stylish white jumpsuit perfect for any occasion. Made from premium quality fabric with comfortable fit. Available in multiple sizes.',
            features: [
                {
                    icon: '😊',
                    label: 'Safe'
                },
                {
                    icon: '📄',
                    label: 'Quality'
                },
                {
                    icon: '✏️',
                    label: 'Fresh'
                }
            ],
            freeShipping: true,
            delivery: {
                freeShipping: true,
                estimatedDelivery: '3-5 business days',
                shippingOptions: [
                    'Standard',
                    'Express'
                ],
                returnPolicy: '30-day return policy'
            }
        },
        {
            id: 3,
            title: 'Vitamin C Serum',
            currentPrice: '₹ 2,453',
            originalPrice: '₹ 4,700',
            media: [
                {
                    type: 'image',
                    url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop'
                }
            ],
            description: 'Premium Vitamin C Serum for brightening and anti-aging. Contains natural ingredients and is suitable for all skin types.',
            features: [
                {
                    icon: '😊',
                    label: 'Safe'
                },
                {
                    icon: '📄',
                    label: 'Quality'
                },
                {
                    icon: '✏️',
                    label: 'Fresh'
                }
            ],
            freeShipping: false,
            delivery: {
                freeShipping: false,
                estimatedDelivery: '5-7 business days',
                shippingOptions: [
                    'Standard'
                ],
                returnPolicy: '30-day return policy'
            }
        },
        {
            id: 4,
            title: 'Strip T-shirt',
            currentPrice: '₹ 1,700',
            originalPrice: '₹ 3,400',
            media: [
                {
                    type: 'image',
                    url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop'
                }
            ],
            description: 'Comfortable striped T-shirt made from soft cotton blend. Perfect for casual wear. Available in multiple colors and sizes.',
            features: [
                {
                    icon: '😊',
                    label: 'Safe'
                },
                {
                    icon: '📄',
                    label: 'Quality'
                },
                {
                    icon: '✏️',
                    label: 'Fresh'
                }
            ],
            freeShipping: true
        },
        {
            id: 5,
            title: 'Product Title',
            currentPrice: '$24.00',
            originalPrice: null,
            media: [
                {
                    type: 'image',
                    url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop'
                }
            ],
            description: 'High-quality product with excellent features. Perfect for everyday use.',
            features: [
                {
                    icon: '😊',
                    label: 'Safe'
                },
                {
                    icon: '📄',
                    label: 'Quality'
                },
                {
                    icon: '✏️',
                    label: 'Fresh'
                }
            ],
            freeShipping: true
        },
        {
            id: 6,
            title: 'Product Title',
            currentPrice: '$24.00',
            originalPrice: null,
            media: [
                {
                    type: 'image',
                    url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop'
                }
            ],
            description: 'High-quality product with excellent features. Perfect for everyday use.',
            features: [
                {
                    icon: '😊',
                    label: 'Safe'
                },
                {
                    icon: '📄',
                    label: 'Quality'
                },
                {
                    icon: '✏️',
                    label: 'Fresh'
                }
            ],
            freeShipping: true
        },
        {
            id: 7,
            title: 'Product Title',
            currentPrice: '$24.00',
            originalPrice: null,
            media: [
                {
                    type: 'image',
                    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop'
                }
            ],
            description: 'High-quality product with excellent features. Perfect for everyday use.',
            features: [
                {
                    icon: '😊',
                    label: 'Safe'
                },
                {
                    icon: '📄',
                    label: 'Quality'
                },
                {
                    icon: '✏️',
                    label: 'Fresh'
                }
            ],
            freeShipping: true
        },
        {
            id: 8,
            title: 'Wireless Earbuds',
            currentPrice: '$275.00',
            originalPrice: '$550.00',
            media: [
                {
                    type: 'image',
                    url: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600&h=600&fit=crop'
                }
            ],
            description: 'Premium wireless earbuds with noise cancellation. Long battery life and crystal clear sound quality.',
            features: [
                {
                    icon: '😊',
                    label: 'Safe'
                },
                {
                    icon: '📄',
                    label: 'Quality'
                },
                {
                    icon: '✏️',
                    label: 'Fresh'
                }
            ],
            freeShipping: true
        },
        {
            id: 9,
            title: 'Portable Speaker',
            currentPrice: '$900.00',
            originalPrice: '$1800.00',
            media: [
                {
                    type: 'image',
                    url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop'
                }
            ],
            description: 'High-quality portable speaker with powerful bass and long battery life. Perfect for outdoor activities.',
            features: [
                {
                    icon: '😊',
                    label: 'Safe'
                },
                {
                    icon: '📄',
                    label: 'Quality'
                },
                {
                    icon: '✏️',
                    label: 'Fresh'
                }
            ],
            freeShipping: true
        },
        {
            id: 10,
            title: 'Gaming Controller',
            currentPrice: '$400.00',
            originalPrice: '$800.00',
            media: [
                {
                    type: 'image',
                    url: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&h=600&fit=crop'
                }
            ],
            description: 'Professional gaming controller with responsive buttons and ergonomic design. Compatible with multiple platforms.',
            features: [
                {
                    icon: '😊',
                    label: 'Safe'
                },
                {
                    icon: '📄',
                    label: 'Quality'
                },
                {
                    icon: '✏️',
                    label: 'Fresh'
                }
            ],
            freeShipping: true
        },
        {
            id: 11,
            title: 'Smartphone Case',
            currentPrice: '$15.00',
            originalPrice: '$30.00',
            images: [
                'https://images.unsplash.com/photo-1601593346740-925612772716?w=600&h=600&fit=crop'
            ],
            description: 'Protective smartphone case with shock absorption and stylish design.',
            features: [
                {
                    icon: '😊',
                    label: 'Safe'
                },
                {
                    icon: '📄',
                    label: 'Quality'
                },
                {
                    icon: '✏️',
                    label: 'Fresh'
                }
            ],
            freeShipping: true
        },
        {
            id: 12,
            title: 'Wireless Charger',
            currentPrice: '$25.00',
            originalPrice: '$50.00',
            images: [
                'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=600&fit=crop'
            ],
            description: 'Fast wireless charger compatible with all Qi-enabled devices.',
            features: [
                {
                    icon: '😊',
                    label: 'Safe'
                },
                {
                    icon: '📄',
                    label: 'Quality'
                },
                {
                    icon: '✏️',
                    label: 'Fresh'
                }
            ],
            freeShipping: true
        },
        {
            id: 13,
            title: 'Bluetooth Headphones',
            currentPrice: '$80.00',
            originalPrice: '$160.00',
            images: [
                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop'
            ],
            description: 'High-quality Bluetooth headphones with noise cancellation and long battery life.',
            features: [
                {
                    icon: '😊',
                    label: 'Safe'
                },
                {
                    icon: '📄',
                    label: 'Quality'
                },
                {
                    icon: '✏️',
                    label: 'Fresh'
                }
            ],
            freeShipping: true
        },
        {
            id: 14,
            title: 'Gaming Mouse',
            currentPrice: '$45.00',
            originalPrice: '$90.00',
            images: [
                'https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&h=600&fit=crop'
            ],
            description: 'Precision gaming mouse with customizable buttons and RGB lighting.',
            features: [
                {
                    icon: '😊',
                    label: 'Safe'
                },
                {
                    icon: '📄',
                    label: 'Quality'
                },
                {
                    icon: '✏️',
                    label: 'Fresh'
                }
            ],
            freeShipping: true
        },
        {
            id: 15,
            title: 'Mechanical Keyboard',
            currentPrice: '$120.00',
            originalPrice: '$240.00',
            images: [
                'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop'
            ],
            description: 'Mechanical keyboard with tactile switches and customizable backlighting.',
            features: [
                {
                    icon: '😊',
                    label: 'Safe'
                },
                {
                    icon: '📄',
                    label: 'Quality'
                },
                {
                    icon: '✏️',
                    label: 'Fresh'
                }
            ],
            freeShipping: true
        },
        {
            id: 16,
            title: 'LED Monitor',
            currentPrice: '$200.00',
            originalPrice: '$400.00',
            images: [
                'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=600&fit=crop'
            ],
            description: 'High-resolution LED monitor with vibrant colors and fast refresh rate.',
            features: [
                {
                    icon: '😊',
                    label: 'Safe'
                },
                {
                    icon: '📄',
                    label: 'Quality'
                },
                {
                    icon: '✏️',
                    label: 'Fresh'
                }
            ],
            freeShipping: false
        },
        {
            id: 17,
            title: 'Coffee Maker',
            currentPrice: '$60.00',
            originalPrice: '$120.00',
            images: [
                'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=600&fit=crop'
            ],
            description: 'Automatic coffee maker with programmable settings and thermal carafe.',
            features: [
                {
                    icon: '😊',
                    label: 'Safe'
                },
                {
                    icon: '📄',
                    label: 'Quality'
                },
                {
                    icon: '✏️',
                    label: 'Fresh'
                }
            ],
            freeShipping: true
        },
        {
            id: 18,
            title: 'Blender',
            currentPrice: '$35.00',
            originalPrice: '$70.00',
            images: [
                'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&h=600&fit=crop'
            ],
            description: 'Powerful blender with multiple speed settings and durable blades.',
            features: [
                {
                    icon: '😊',
                    label: 'Safe'
                },
                {
                    icon: '📄',
                    label: 'Quality'
                },
                {
                    icon: '✏️',
                    label: 'Fresh'
                }
            ],
            freeShipping: true
        },
        {
            id: 19,
            title: 'Air Fryer',
            currentPrice: '$100.00',
            originalPrice: '$200.00',
            images: [
                'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop'
            ],
            description: 'Healthy air fryer with digital controls and non-stick basket.',
            features: [
                {
                    icon: '😊',
                    label: 'Safe'
                },
                {
                    icon: '📄',
                    label: 'Quality'
                },
                {
                    icon: '✏️',
                    label: 'Fresh'
                }
            ],
            freeShipping: true
        },
        {
            id: 20,
            title: 'Yoga Mat',
            currentPrice: '$20.00',
            originalPrice: '$40.00',
            images: [
                'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=600&fit=crop'
            ],
            description: 'Non-slip yoga mat with excellent cushioning and eco-friendly materials.',
            features: [
                {
                    icon: '😊',
                    label: 'Safe'
                },
                {
                    icon: '📄',
                    label: 'Quality'
                },
                {
                    icon: '✏️',
                    label: 'Fresh'
                }
            ],
            freeShipping: true
        },
        {
            id: 21,
            title: 'Dumbbells Set',
            currentPrice: '$50.00',
            originalPrice: '$100.00',
            images: [
                'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop'
            ],
            description: 'Adjustable dumbbells set for home workouts with comfortable grip.',
            features: [
                {
                    icon: '😊',
                    label: 'Safe'
                },
                {
                    icon: '📄',
                    label: 'Quality'
                },
                {
                    icon: '✏️',
                    label: 'Fresh'
                }
            ],
            freeShipping: true
        },
        {
            id: 22,
            title: 'Running Shoes',
            currentPrice: '$75.00',
            originalPrice: '$150.00',
            images: [
                'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop'
            ],
            description: 'Lightweight running shoes with superior cushioning and breathability.',
            features: [
                {
                    icon: '😊',
                    label: 'Safe'
                },
                {
                    icon: '📄',
                    label: 'Quality'
                },
                {
                    icon: '✏️',
                    label: 'Fresh'
                }
            ],
            freeShipping: true
        },
        {
            id: 23,
            title: 'Designer Watch',
            currentPrice: '$500.00',
            originalPrice: '$1000.00',
            images: [
                'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop'
            ],
            description: 'Elegant designer watch with premium materials and timeless design.',
            features: [
                {
                    icon: '😊',
                    label: 'Safe'
                },
                {
                    icon: '📄',
                    label: 'Quality'
                },
                {
                    icon: '✏️',
                    label: 'Fresh'
                }
            ],
            freeShipping: true
        },
        {
            id: 24,
            title: 'Leather Bag',
            currentPrice: '$300.00',
            originalPrice: '$600.00',
            images: [
                'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop'
            ],
            description: 'Genuine leather bag with spacious compartments and stylish look.',
            features: [
                {
                    icon: '😊',
                    label: 'Safe'
                },
                {
                    icon: '📄',
                    label: 'Quality'
                },
                {
                    icon: '✏️',
                    label: 'Fresh'
                }
            ],
            freeShipping: true
        },
        {
            id: 25,
            title: 'Sunglasses',
            currentPrice: '$150.00',
            originalPrice: '$300.00',
            images: [
                'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop'
            ],
            description: 'UV-protective sunglasses with polarized lenses and lightweight frame.',
            features: [
                {
                    icon: '😊',
                    label: 'Safe'
                },
                {
                    icon: '📄',
                    label: 'Quality'
                },
                {
                    icon: '✏️',
                    label: 'Fresh'
                }
            ],
            freeShipping: true
        },
        {
            id: 26,
            title: 'Bamboo Toothbrush',
            currentPrice: '$5.00',
            originalPrice: '$10.00',
            images: [
                'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=600&h=600&fit=crop'
            ],
            description: 'Eco-friendly bamboo toothbrush with soft bristles and biodegradable design.',
            features: [
                {
                    icon: '😊',
                    label: 'Safe'
                },
                {
                    icon: '📄',
                    label: 'Quality'
                },
                {
                    icon: '✏️',
                    label: 'Fresh'
                }
            ],
            freeShipping: true
        },
        {
            id: 27,
            title: 'Reusable Water Bottle',
            currentPrice: '$15.00',
            originalPrice: '$30.00',
            images: [
                'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=600&fit=crop'
            ],
            description: 'Insulated reusable water bottle that keeps drinks cold for hours.',
            features: [
                {
                    icon: '😊',
                    label: 'Safe'
                },
                {
                    icon: '📄',
                    label: 'Quality'
                },
                {
                    icon: '✏️',
                    label: 'Fresh'
                }
            ],
            freeShipping: true
        },
        {
            id: 28,
            title: 'Organic Cotton T-shirt',
            currentPrice: '$25.00',
            originalPrice: '$50.00',
            images: [
                'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop'
            ],
            description: 'Soft organic cotton T-shirt with comfortable fit and eco-friendly production.',
            features: [
                {
                    icon: '😊',
                    label: 'Safe'
                },
                {
                    icon: '📄',
                    label: 'Quality'
                },
                {
                    icon: '✏️',
                    label: 'Fresh'
                }
            ],
            freeShipping: true
        },
        {
            id: 29,
            title: 'Travel Pillow',
            currentPrice: '$20.00',
            originalPrice: '$40.00',
            images: [
                'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=600&h=600&fit=crop'
            ],
            description: 'Memory foam travel pillow for comfortable neck support during travel.',
            features: [
                {
                    icon: '😊',
                    label: 'Safe'
                },
                {
                    icon: '📄',
                    label: 'Quality'
                },
                {
                    icon: '✏️',
                    label: 'Fresh'
                }
            ],
            freeShipping: true
        },
        {
            id: 30,
            title: 'Portable Charger',
            currentPrice: '$30.00',
            originalPrice: '$60.00',
            images: [
                'https://images.unsplash.com/photo-1609594040430-3b9b92a98e53?w=600&h=600&fit=crop'
            ],
            description: 'High-capacity portable charger with fast charging capabilities.',
            features: [
                {
                    icon: '😊',
                    label: 'Safe'
                },
                {
                    icon: '📄',
                    label: 'Quality'
                },
                {
                    icon: '✏️',
                    label: 'Fresh'
                }
            ],
            freeShipping: true
        },
        {
            id: 31,
            title: 'Compression Socks',
            currentPrice: '$15.00',
            originalPrice: '$30.00',
            images: [
                'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop'
            ],
            description: 'Compression socks for improved circulation and reduced swelling.',
            features: [
                {
                    icon: '😊',
                    label: 'Safe'
                },
                {
                    icon: '📄',
                    label: 'Quality'
                },
                {
                    icon: '✏️',
                    label: 'Fresh'
                }
            ],
            freeShipping: true
        },
        {
            id: 32,
            title: 'Smart Lock',
            currentPrice: '$100.00',
            originalPrice: '$200.00',
            images: [
                'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop'
            ],
            description: 'Smart lock with keyless entry and mobile app control.',
            features: [
                {
                    icon: '😊',
                    label: 'Safe'
                },
                {
                    icon: '📄',
                    label: 'Quality'
                },
                {
                    icon: '✏️',
                    label: 'Fresh'
                }
            ],
            freeShipping: true
        },
        {
            id: 33,
            title: 'Security Camera',
            currentPrice: '$80.00',
            originalPrice: '$160.00',
            images: [
                'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=600&fit=crop'
            ],
            description: 'Wireless security camera with night vision and motion detection.',
            features: [
                {
                    icon: '😊',
                    label: 'Safe'
                },
                {
                    icon: '📄',
                    label: 'Quality'
                },
                {
                    icon: '✏️',
                    label: 'Fresh'
                }
            ],
            freeShipping: true
        },
        {
            id: 34,
            title: 'Alarm System',
            currentPrice: '$150.00',
            originalPrice: '$300.00',
            images: [
                'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=600&h=600&fit=crop'
            ],
            description: 'Home alarm system with sensors and smartphone alerts.',
            features: [
                {
                    icon: '😊',
                    label: 'Safe'
                },
                {
                    icon: '📄',
                    label: 'Quality'
                },
                {
                    icon: '✏️',
                    label: 'Fresh'
                }
            ],
            freeShipping: false
        }
    ];
    const detailedProduct = allProductDetails.find((p)=>p.id === parseInt(id)) || allProductDetails[0];
    if (summaryProduct) {
        detailedProduct.reviews = summaryProduct.reviews || [];
        detailedProduct.averageRating = summaryProduct.averageRating || 0;
        detailedProduct.reviewCount = summaryProduct.reviewCount || 0;
    }
    return detailedProduct;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/ProductCard.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$FavouritesContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/context/FavouritesContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up.js [app-client] (ecmascript) <export default as ArrowUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/award.js [app-client] (ecmascript) <export default as Award>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function ProductCard({ id, image, title, currentPrice, originalPrice, isFavorite = false, badge, showVisualSearch = true, variant = 'default' // 'default', 'top-deal', 'top-ranking', 'grid'
 }) {
    _s();
    const { toggleFavourite, isFavourite } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$FavouritesContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFavourites"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const favourite = isFavourite(id);
    const formatPrice = (price)=>{
        if (price == null) return '';
        if (typeof price === 'string') {
            return price;
        }
        return `$${price.toFixed(2)}`;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: `/products/${id}`,
        className: `product-card-link product-card-${variant}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "product-card",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "product-image-wrapper",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: image,
                            alt: title,
                            className: "product-image"
                        }, void 0, false, {
                            fileName: "[project]/app/components/ProductCard.js",
                            lineNumber: 36,
                            columnNumber: 11
                        }, this),
                        badge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `product-badge product-badge-${badge.type || 'default'}`,
                            children: badge.text
                        }, void 0, false, {
                            fileName: "[project]/app/components/ProductCard.js",
                            lineNumber: 44,
                            columnNumber: 13
                        }, this),
                        showVisualSearch && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "product-visual-search",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/app/components/ProductCard.js",
                                lineNumber: 52,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/ProductCard.js",
                            lineNumber: 51,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `product-favorite ${favourite ? 'active' : ''}`,
                            onClick: (e)=>{
                                e.preventDefault();
                                e.stopPropagation();
                                toggleFavourite({
                                    id,
                                    title,
                                    image,
                                    currentPrice: typeof currentPrice === 'string' ? parseFloat(currentPrice.replace('$', '')) : currentPrice,
                                    originalPrice: originalPrice ? typeof originalPrice === 'string' ? parseFloat(originalPrice.replace('$', '')) : originalPrice : null
                                });
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "18",
                                height: "18",
                                viewBox: "0 0 24 24",
                                fill: favourite ? "#FF0000" : "none",
                                stroke: favourite ? "#FF0000" : "#666666",
                                strokeWidth: "2",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/ProductCard.js",
                                    lineNumber: 72,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/ProductCard.js",
                                lineNumber: 71,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/ProductCard.js",
                            lineNumber: 57,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/ProductCard.js",
                    lineNumber: 35,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "product-info",
                    children: [
                        badge && badge.position === 'above-title' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `product-badge-inline product-badge-${badge.type || 'default'}`,
                            children: badge.text
                        }, void 0, false, {
                            fileName: "[project]/app/components/ProductCard.js",
                            lineNumber: 80,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "product-title-link",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "product-title",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/app/components/ProductCard.js",
                                lineNumber: 86,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/ProductCard.js",
                            lineNumber: 85,
                            columnNumber: 11
                        }, this),
                        (variant !== 'top-ranking' || currentPrice) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "product-price",
                            children: [
                                currentPrice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "product-price-current",
                                    children: formatPrice(currentPrice)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/ProductCard.js",
                                    lineNumber: 93,
                                    columnNumber: 17
                                }, this),
                                originalPrice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "product-price-original",
                                    children: formatPrice(originalPrice)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/ProductCard.js",
                                    lineNumber: 96,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/ProductCard.js",
                            lineNumber: 91,
                            columnNumber: 13
                        }, this),
                        badge && badge.position === 'below-title' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `product-ranking-badge product-ranking-badge-${badge.type || 'default'}`,
                            children: [
                                badge.icon === 'crown' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"], {
                                    size: 12
                                }, void 0, false, {
                                    fileName: "[project]/app/components/ProductCard.js",
                                    lineNumber: 104,
                                    columnNumber: 42
                                }, this),
                                badge.icon === 'arrow-up' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__["ArrowUp"], {
                                    size: 12
                                }, void 0, false, {
                                    fileName: "[project]/app/components/ProductCard.js",
                                    lineNumber: 105,
                                    columnNumber: 45
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: badge.text
                                }, void 0, false, {
                                    fileName: "[project]/app/components/ProductCard.js",
                                    lineNumber: 106,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/ProductCard.js",
                            lineNumber: 103,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/ProductCard.js",
                    lineNumber: 77,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/ProductCard.js",
            lineNumber: 34,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/ProductCard.js",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_s(ProductCard, "hLcHQHzw6fNZzXkayChtGvSqoeE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$FavouritesContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFavourites"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = ProductCard;
var _c;
__turbopack_context__.k.register(_c, "ProductCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/products/[id]/ProductDetailClient.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const e = new Error("Could not parse module '[project]/app/products/[id]/ProductDetailClient.js'\n\nUnexpected token. Did you mean `{'}'}` or `&rbrace;`?");
e.code = 'MODULE_UNPARSABLE';
throw e;
}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
"[project]/node_modules/next/dist/shared/lib/router/utils/querystring.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    assign: null,
    searchParamsToUrlQuery: null,
    urlQueryToSearchParams: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    assign: function() {
        return assign;
    },
    searchParamsToUrlQuery: function() {
        return searchParamsToUrlQuery;
    },
    urlQueryToSearchParams: function() {
        return urlQueryToSearchParams;
    }
});
function searchParamsToUrlQuery(searchParams) {
    const query = {};
    for (const [key, value] of searchParams.entries()){
        const existing = query[key];
        if (typeof existing === 'undefined') {
            query[key] = value;
        } else if (Array.isArray(existing)) {
            existing.push(value);
        } else {
            query[key] = [
                existing,
                value
            ];
        }
    }
    return query;
}
function stringifyUrlQueryParam(param) {
    if (typeof param === 'string') {
        return param;
    }
    if (typeof param === 'number' && !isNaN(param) || typeof param === 'boolean') {
        return String(param);
    } else {
        return '';
    }
}
function urlQueryToSearchParams(query) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(query)){
        if (Array.isArray(value)) {
            for (const item of value){
                searchParams.append(key, stringifyUrlQueryParam(item));
            }
        } else {
            searchParams.set(key, stringifyUrlQueryParam(value));
        }
    }
    return searchParams;
}
function assign(target, ...searchParamsList) {
    for (const searchParams of searchParamsList){
        for (const key of searchParams.keys()){
            target.delete(key);
        }
        for (const [key, value] of searchParams.entries()){
            target.append(key, value);
        }
    }
    return target;
} //# sourceMappingURL=querystring.js.map
}),
"[project]/node_modules/next/dist/shared/lib/router/utils/format-url.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Format function modified from nodejs
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    formatUrl: null,
    formatWithValidation: null,
    urlObjectKeys: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    formatUrl: function() {
        return formatUrl;
    },
    formatWithValidation: function() {
        return formatWithValidation;
    },
    urlObjectKeys: function() {
        return urlObjectKeys;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _querystring = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/querystring.js [app-client] (ecmascript)"));
const slashedProtocols = /https?|ftp|gopher|file/;
function formatUrl(urlObj) {
    let { auth, hostname } = urlObj;
    let protocol = urlObj.protocol || '';
    let pathname = urlObj.pathname || '';
    let hash = urlObj.hash || '';
    let query = urlObj.query || '';
    let host = false;
    auth = auth ? encodeURIComponent(auth).replace(/%3A/i, ':') + '@' : '';
    if (urlObj.host) {
        host = auth + urlObj.host;
    } else if (hostname) {
        host = auth + (~hostname.indexOf(':') ? `[${hostname}]` : hostname);
        if (urlObj.port) {
            host += ':' + urlObj.port;
        }
    }
    if (query && typeof query === 'object') {
        query = String(_querystring.urlQueryToSearchParams(query));
    }
    let search = urlObj.search || query && `?${query}` || '';
    if (protocol && !protocol.endsWith(':')) protocol += ':';
    if (urlObj.slashes || (!protocol || slashedProtocols.test(protocol)) && host !== false) {
        host = '//' + (host || '');
        if (pathname && pathname[0] !== '/') pathname = '/' + pathname;
    } else if (!host) {
        host = '';
    }
    if (hash && hash[0] !== '#') hash = '#' + hash;
    if (search && search[0] !== '?') search = '?' + search;
    pathname = pathname.replace(/[?#]/g, encodeURIComponent);
    search = search.replace('#', '%23');
    return `${protocol}${host}${pathname}${search}${hash}`;
}
const urlObjectKeys = [
    'auth',
    'hash',
    'host',
    'hostname',
    'href',
    'path',
    'pathname',
    'port',
    'protocol',
    'query',
    'search',
    'slashes'
];
function formatWithValidation(url) {
    if ("TURBOPACK compile-time truthy", 1) {
        if (url !== null && typeof url === 'object') {
            Object.keys(url).forEach((key)=>{
                if (!urlObjectKeys.includes(key)) {
                    console.warn(`Unknown key passed via urlObject into url.format: ${key}`);
                }
            });
        }
    }
    return formatUrl(url);
} //# sourceMappingURL=format-url.js.map
}),
"[project]/node_modules/next/dist/client/use-merged-ref.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useMergedRef", {
    enumerable: true,
    get: function() {
        return useMergedRef;
    }
});
const _react = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
function useMergedRef(refA, refB) {
    const cleanupA = (0, _react.useRef)(null);
    const cleanupB = (0, _react.useRef)(null);
    // NOTE: In theory, we could skip the wrapping if only one of the refs is non-null.
    // (this happens often if the user doesn't pass a ref to Link/Form/Image)
    // But this can cause us to leak a cleanup-ref into user code (previously via `<Link legacyBehavior>`),
    // and the user might pass that ref into ref-merging library that doesn't support cleanup refs
    // (because it hasn't been updated for React 19)
    // which can then cause things to blow up, because a cleanup-returning ref gets called with `null`.
    // So in practice, it's safer to be defensive and always wrap the ref, even on React 19.
    return (0, _react.useCallback)((current)=>{
        if (current === null) {
            const cleanupFnA = cleanupA.current;
            if (cleanupFnA) {
                cleanupA.current = null;
                cleanupFnA();
            }
            const cleanupFnB = cleanupB.current;
            if (cleanupFnB) {
                cleanupB.current = null;
                cleanupFnB();
            }
        } else {
            if (refA) {
                cleanupA.current = applyRef(refA, current);
            }
            if (refB) {
                cleanupB.current = applyRef(refB, current);
            }
        }
    }, [
        refA,
        refB
    ]);
}
function applyRef(refA, current) {
    if (typeof refA === 'function') {
        const cleanup = refA(current);
        if (typeof cleanup === 'function') {
            return cleanup;
        } else {
            return ()=>refA(null);
        }
    } else {
        refA.current = current;
        return ()=>{
            refA.current = null;
        };
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=use-merged-ref.js.map
}),
"[project]/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    DecodeError: null,
    MiddlewareNotFoundError: null,
    MissingStaticPage: null,
    NormalizeError: null,
    PageNotFoundError: null,
    SP: null,
    ST: null,
    WEB_VITALS: null,
    execOnce: null,
    getDisplayName: null,
    getLocationOrigin: null,
    getURL: null,
    isAbsoluteUrl: null,
    isResSent: null,
    loadGetInitialProps: null,
    normalizeRepeatedSlashes: null,
    stringifyError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    DecodeError: function() {
        return DecodeError;
    },
    MiddlewareNotFoundError: function() {
        return MiddlewareNotFoundError;
    },
    MissingStaticPage: function() {
        return MissingStaticPage;
    },
    NormalizeError: function() {
        return NormalizeError;
    },
    PageNotFoundError: function() {
        return PageNotFoundError;
    },
    SP: function() {
        return SP;
    },
    ST: function() {
        return ST;
    },
    WEB_VITALS: function() {
        return WEB_VITALS;
    },
    execOnce: function() {
        return execOnce;
    },
    getDisplayName: function() {
        return getDisplayName;
    },
    getLocationOrigin: function() {
        return getLocationOrigin;
    },
    getURL: function() {
        return getURL;
    },
    isAbsoluteUrl: function() {
        return isAbsoluteUrl;
    },
    isResSent: function() {
        return isResSent;
    },
    loadGetInitialProps: function() {
        return loadGetInitialProps;
    },
    normalizeRepeatedSlashes: function() {
        return normalizeRepeatedSlashes;
    },
    stringifyError: function() {
        return stringifyError;
    }
});
const WEB_VITALS = [
    'CLS',
    'FCP',
    'FID',
    'INP',
    'LCP',
    'TTFB'
];
function execOnce(fn) {
    let used = false;
    let result;
    return (...args)=>{
        if (!used) {
            used = true;
            result = fn(...args);
        }
        return result;
    };
}
// Scheme: https://tools.ietf.org/html/rfc3986#section-3.1
// Absolute URL: https://tools.ietf.org/html/rfc3986#section-4.3
const ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/;
const isAbsoluteUrl = (url)=>ABSOLUTE_URL_REGEX.test(url);
function getLocationOrigin() {
    const { protocol, hostname, port } = window.location;
    return `${protocol}//${hostname}${port ? ':' + port : ''}`;
}
function getURL() {
    const { href } = window.location;
    const origin = getLocationOrigin();
    return href.substring(origin.length);
}
function getDisplayName(Component) {
    return typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Unknown';
}
function isResSent(res) {
    return res.finished || res.headersSent;
}
function normalizeRepeatedSlashes(url) {
    const urlParts = url.split('?');
    const urlNoQuery = urlParts[0];
    return urlNoQuery // first we replace any non-encoded backslashes with forward
    // then normalize repeated forward slashes
    .replace(/\\/g, '/').replace(/\/\/+/g, '/') + (urlParts[1] ? `?${urlParts.slice(1).join('?')}` : '');
}
async function loadGetInitialProps(App, ctx) {
    if ("TURBOPACK compile-time truthy", 1) {
        if (App.prototype?.getInitialProps) {
            const message = `"${getDisplayName(App)}.getInitialProps()" is defined as an instance method - visit https://nextjs.org/docs/messages/get-initial-props-as-an-instance-method for more information.`;
            throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
                value: "E394",
                enumerable: false,
                configurable: true
            });
        }
    }
    // when called from _app `ctx` is nested in `ctx`
    const res = ctx.res || ctx.ctx && ctx.ctx.res;
    if (!App.getInitialProps) {
        if (ctx.ctx && ctx.Component) {
            // @ts-ignore pageProps default
            return {
                pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
            };
        }
        return {};
    }
    const props = await App.getInitialProps(ctx);
    if (res && isResSent(res)) {
        return props;
    }
    if (!props) {
        const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
        throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
    if ("TURBOPACK compile-time truthy", 1) {
        if (Object.keys(props).length === 0 && !ctx.ctx) {
            console.warn(`${getDisplayName(App)} returned an empty object from \`getInitialProps\`. This de-optimizes and prevents automatic static optimization. https://nextjs.org/docs/messages/empty-object-getInitialProps`);
        }
    }
    return props;
}
const SP = typeof performance !== 'undefined';
const ST = SP && [
    'mark',
    'measure',
    'getEntriesByName'
].every((method)=>typeof performance[method] === 'function');
class DecodeError extends Error {
}
class NormalizeError extends Error {
}
class PageNotFoundError extends Error {
    constructor(page){
        super();
        this.code = 'ENOENT';
        this.name = 'PageNotFoundError';
        this.message = `Cannot find module for page: ${page}`;
    }
}
class MissingStaticPage extends Error {
    constructor(page, message){
        super();
        this.message = `Failed to load static file for page: ${page} ${message}`;
    }
}
class MiddlewareNotFoundError extends Error {
    constructor(){
        super();
        this.code = 'ENOENT';
        this.message = `Cannot find the middleware module`;
    }
}
function stringifyError(error) {
    return JSON.stringify({
        message: error.message,
        stack: error.stack
    });
} //# sourceMappingURL=utils.js.map
}),
"[project]/node_modules/next/dist/shared/lib/router/utils/is-local-url.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isLocalURL", {
    enumerable: true,
    get: function() {
        return isLocalURL;
    }
});
const _utils = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)");
const _hasbasepath = __turbopack_context__.r("[project]/node_modules/next/dist/client/has-base-path.js [app-client] (ecmascript)");
function isLocalURL(url) {
    // prevent a hydration mismatch on href for url with anchor refs
    if (!(0, _utils.isAbsoluteUrl)(url)) return true;
    try {
        // absolute urls can be local if they are on the same origin
        const locationOrigin = (0, _utils.getLocationOrigin)();
        const resolved = new URL(url, locationOrigin);
        return resolved.origin === locationOrigin && (0, _hasbasepath.hasBasePath)(resolved.pathname);
    } catch (_) {
        return false;
    }
} //# sourceMappingURL=is-local-url.js.map
}),
"[project]/node_modules/next/dist/shared/lib/utils/error-once.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "errorOnce", {
    enumerable: true,
    get: function() {
        return errorOnce;
    }
});
let errorOnce = (_)=>{};
if ("TURBOPACK compile-time truthy", 1) {
    const errors = new Set();
    errorOnce = (msg)=>{
        if (!errors.has(msg)) {
            console.error(msg);
        }
        errors.add(msg);
    };
} //# sourceMappingURL=error-once.js.map
}),
"[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    default: null,
    useLinkStatus: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    /**
 * A React component that extends the HTML `<a>` element to provide
 * [prefetching](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#2-prefetching)
 * and client-side navigation. This is the primary way to navigate between routes in Next.js.
 *
 * @remarks
 * - Prefetching is only enabled in production.
 *
 * @see https://nextjs.org/docs/app/api-reference/components/link
 */ default: function() {
        return LinkComponent;
    },
    useLinkStatus: function() {
        return useLinkStatus;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _formaturl = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/format-url.js [app-client] (ecmascript)");
const _approutercontextsharedruntime = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js [app-client] (ecmascript)");
const _usemergedref = __turbopack_context__.r("[project]/node_modules/next/dist/client/use-merged-ref.js [app-client] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)");
const _addbasepath = __turbopack_context__.r("[project]/node_modules/next/dist/client/add-base-path.js [app-client] (ecmascript)");
const _warnonce = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/utils/warn-once.js [app-client] (ecmascript)");
const _links = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/links.js [app-client] (ecmascript)");
const _islocalurl = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/is-local-url.js [app-client] (ecmascript)");
const _types = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/segment-cache/types.js [app-client] (ecmascript)");
const _erroronce = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/utils/error-once.js [app-client] (ecmascript)");
function isModifiedEvent(event) {
    const eventTarget = event.currentTarget;
    const target = eventTarget.getAttribute('target');
    return target && target !== '_self' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || // triggers resource download
    event.nativeEvent && event.nativeEvent.which === 2;
}
function linkClicked(e, href, as, linkInstanceRef, replace, scroll, onNavigate) {
    if (typeof window !== 'undefined') {
        const { nodeName } = e.currentTarget;
        // anchors inside an svg have a lowercase nodeName
        const isAnchorNodeName = nodeName.toUpperCase() === 'A';
        if (isAnchorNodeName && isModifiedEvent(e) || e.currentTarget.hasAttribute('download')) {
            // ignore click for browser’s default behavior
            return;
        }
        if (!(0, _islocalurl.isLocalURL)(href)) {
            if (replace) {
                // browser default behavior does not replace the history state
                // so we need to do it manually
                e.preventDefault();
                location.replace(href);
            }
            // ignore click for browser’s default behavior
            return;
        }
        e.preventDefault();
        if (onNavigate) {
            let isDefaultPrevented = false;
            onNavigate({
                preventDefault: ()=>{
                    isDefaultPrevented = true;
                }
            });
            if (isDefaultPrevented) {
                return;
            }
        }
        const { dispatchNavigateAction } = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/app-router-instance.js [app-client] (ecmascript)");
        _react.default.startTransition(()=>{
            dispatchNavigateAction(as || href, replace ? 'replace' : 'push', scroll ?? true, linkInstanceRef.current);
        });
    }
}
function formatStringOrUrl(urlObjOrString) {
    if (typeof urlObjOrString === 'string') {
        return urlObjOrString;
    }
    return (0, _formaturl.formatUrl)(urlObjOrString);
}
function LinkComponent(props) {
    const [linkStatus, setOptimisticLinkStatus] = (0, _react.useOptimistic)(_links.IDLE_LINK_STATUS);
    let children;
    const linkInstanceRef = (0, _react.useRef)(null);
    const { href: hrefProp, as: asProp, children: childrenProp, prefetch: prefetchProp = null, passHref, replace, shallow, scroll, onClick, onMouseEnter: onMouseEnterProp, onTouchStart: onTouchStartProp, legacyBehavior = false, onNavigate, ref: forwardedRef, unstable_dynamicOnHover, ...restProps } = props;
    children = childrenProp;
    if (legacyBehavior && (typeof children === 'string' || typeof children === 'number')) {
        children = /*#__PURE__*/ (0, _jsxruntime.jsx)("a", {
            children: children
        });
    }
    const router = _react.default.useContext(_approutercontextsharedruntime.AppRouterContext);
    const prefetchEnabled = prefetchProp !== false;
    const fetchStrategy = prefetchProp !== false ? getFetchStrategyFromPrefetchProp(prefetchProp) : _types.FetchStrategy.PPR;
    if ("TURBOPACK compile-time truthy", 1) {
        function createPropError(args) {
            return Object.defineProperty(new Error(`Failed prop type: The prop \`${args.key}\` expects a ${args.expected} in \`<Link>\`, but got \`${args.actual}\` instead.` + (typeof window !== 'undefined' ? "\nOpen your browser's console to view the Component stack trace." : '')), "__NEXT_ERROR_CODE", {
                value: "E319",
                enumerable: false,
                configurable: true
            });
        }
        // TypeScript trick for type-guarding:
        const requiredPropsGuard = {
            href: true
        };
        const requiredProps = Object.keys(requiredPropsGuard);
        requiredProps.forEach((key)=>{
            if (key === 'href') {
                if (props[key] == null || typeof props[key] !== 'string' && typeof props[key] !== 'object') {
                    throw createPropError({
                        key,
                        expected: '`string` or `object`',
                        actual: props[key] === null ? 'null' : typeof props[key]
                    });
                }
            } else {
                // TypeScript trick for type-guarding:
                const _ = key;
            }
        });
        // TypeScript trick for type-guarding:
        const optionalPropsGuard = {
            as: true,
            replace: true,
            scroll: true,
            shallow: true,
            passHref: true,
            prefetch: true,
            unstable_dynamicOnHover: true,
            onClick: true,
            onMouseEnter: true,
            onTouchStart: true,
            legacyBehavior: true,
            onNavigate: true
        };
        const optionalProps = Object.keys(optionalPropsGuard);
        optionalProps.forEach((key)=>{
            const valType = typeof props[key];
            if (key === 'as') {
                if (props[key] && valType !== 'string' && valType !== 'object') {
                    throw createPropError({
                        key,
                        expected: '`string` or `object`',
                        actual: valType
                    });
                }
            } else if (key === 'onClick' || key === 'onMouseEnter' || key === 'onTouchStart' || key === 'onNavigate') {
                if (props[key] && valType !== 'function') {
                    throw createPropError({
                        key,
                        expected: '`function`',
                        actual: valType
                    });
                }
            } else if (key === 'replace' || key === 'scroll' || key === 'shallow' || key === 'passHref' || key === 'legacyBehavior' || key === 'unstable_dynamicOnHover') {
                if (props[key] != null && valType !== 'boolean') {
                    throw createPropError({
                        key,
                        expected: '`boolean`',
                        actual: valType
                    });
                }
            } else if (key === 'prefetch') {
                if (props[key] != null && valType !== 'boolean' && props[key] !== 'auto') {
                    throw createPropError({
                        key,
                        expected: '`boolean | "auto"`',
                        actual: valType
                    });
                }
            } else {
                // TypeScript trick for type-guarding:
                const _ = key;
            }
        });
    }
    if ("TURBOPACK compile-time truthy", 1) {
        if (props.locale) {
            (0, _warnonce.warnOnce)('The `locale` prop is not supported in `next/link` while using the `app` router. Read more about app router internalization: https://nextjs.org/docs/app/building-your-application/routing/internationalization');
        }
        if (!asProp) {
            let href;
            if (typeof hrefProp === 'string') {
                href = hrefProp;
            } else if (typeof hrefProp === 'object' && typeof hrefProp.pathname === 'string') {
                href = hrefProp.pathname;
            }
            if (href) {
                const hasDynamicSegment = href.split('/').some((segment)=>segment.startsWith('[') && segment.endsWith(']'));
                if (hasDynamicSegment) {
                    throw Object.defineProperty(new Error(`Dynamic href \`${href}\` found in <Link> while using the \`/app\` router, this is not supported. Read more: https://nextjs.org/docs/messages/app-dir-dynamic-href`), "__NEXT_ERROR_CODE", {
                        value: "E267",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
        }
    }
    const { href, as } = _react.default.useMemo({
        "LinkComponent.useMemo": ()=>{
            const resolvedHref = formatStringOrUrl(hrefProp);
            return {
                href: resolvedHref,
                as: asProp ? formatStringOrUrl(asProp) : resolvedHref
            };
        }
    }["LinkComponent.useMemo"], [
        hrefProp,
        asProp
    ]);
    // This will return the first child, if multiple are provided it will throw an error
    let child;
    if (legacyBehavior) {
        if (children?.$$typeof === Symbol.for('react.lazy')) {
            throw Object.defineProperty(new Error(`\`<Link legacyBehavior>\` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's \`<a>\` tag.`), "__NEXT_ERROR_CODE", {
                value: "E863",
                enumerable: false,
                configurable: true
            });
        }
        if ("TURBOPACK compile-time truthy", 1) {
            if (onClick) {
                console.warn(`"onClick" was passed to <Link> with \`href\` of \`${hrefProp}\` but "legacyBehavior" was set. The legacy behavior requires onClick be set on the child of next/link`);
            }
            if (onMouseEnterProp) {
                console.warn(`"onMouseEnter" was passed to <Link> with \`href\` of \`${hrefProp}\` but "legacyBehavior" was set. The legacy behavior requires onMouseEnter be set on the child of next/link`);
            }
            try {
                child = _react.default.Children.only(children);
            } catch (err) {
                if (!children) {
                    throw Object.defineProperty(new Error(`No children were passed to <Link> with \`href\` of \`${hrefProp}\` but one child is required https://nextjs.org/docs/messages/link-no-children`), "__NEXT_ERROR_CODE", {
                        value: "E320",
                        enumerable: false,
                        configurable: true
                    });
                }
                throw Object.defineProperty(new Error(`Multiple children were passed to <Link> with \`href\` of \`${hrefProp}\` but only one child is supported https://nextjs.org/docs/messages/link-multiple-children` + (typeof window !== 'undefined' ? " \nOpen your browser's console to view the Component stack trace." : '')), "__NEXT_ERROR_CODE", {
                    value: "E266",
                    enumerable: false,
                    configurable: true
                });
            }
        } else //TURBOPACK unreachable
        ;
    } else {
        if ("TURBOPACK compile-time truthy", 1) {
            if (children?.type === 'a') {
                throw Object.defineProperty(new Error('Invalid <Link> with <a> child. Please remove <a> or use <Link legacyBehavior>.\nLearn more: https://nextjs.org/docs/messages/invalid-new-link-with-extra-anchor'), "__NEXT_ERROR_CODE", {
                    value: "E209",
                    enumerable: false,
                    configurable: true
                });
            }
        }
    }
    const childRef = legacyBehavior ? child && typeof child === 'object' && child.ref : forwardedRef;
    // Use a callback ref to attach an IntersectionObserver to the anchor tag on
    // mount. In the future we will also use this to keep track of all the
    // currently mounted <Link> instances, e.g. so we can re-prefetch them after
    // a revalidation or refresh.
    const observeLinkVisibilityOnMount = _react.default.useCallback({
        "LinkComponent.useCallback[observeLinkVisibilityOnMount]": (element)=>{
            if (router !== null) {
                linkInstanceRef.current = (0, _links.mountLinkInstance)(element, href, router, fetchStrategy, prefetchEnabled, setOptimisticLinkStatus);
            }
            return ({
                "LinkComponent.useCallback[observeLinkVisibilityOnMount]": ()=>{
                    if (linkInstanceRef.current) {
                        (0, _links.unmountLinkForCurrentNavigation)(linkInstanceRef.current);
                        linkInstanceRef.current = null;
                    }
                    (0, _links.unmountPrefetchableInstance)(element);
                }
            })["LinkComponent.useCallback[observeLinkVisibilityOnMount]"];
        }
    }["LinkComponent.useCallback[observeLinkVisibilityOnMount]"], [
        prefetchEnabled,
        href,
        router,
        fetchStrategy,
        setOptimisticLinkStatus
    ]);
    const mergedRef = (0, _usemergedref.useMergedRef)(observeLinkVisibilityOnMount, childRef);
    const childProps = {
        ref: mergedRef,
        onClick (e) {
            if ("TURBOPACK compile-time truthy", 1) {
                if (!e) {
                    throw Object.defineProperty(new Error(`Component rendered inside next/link has to pass click event to "onClick" prop.`), "__NEXT_ERROR_CODE", {
                        value: "E312",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
            if (!legacyBehavior && typeof onClick === 'function') {
                onClick(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onClick === 'function') {
                child.props.onClick(e);
            }
            if (!router) {
                return;
            }
            if (e.defaultPrevented) {
                return;
            }
            linkClicked(e, href, as, linkInstanceRef, replace, scroll, onNavigate);
        },
        onMouseEnter (e) {
            if (!legacyBehavior && typeof onMouseEnterProp === 'function') {
                onMouseEnterProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onMouseEnter === 'function') {
                child.props.onMouseEnter(e);
            }
            if (!router) {
                return;
            }
            if ("TURBOPACK compile-time truthy", 1) {
                return;
            }
            //TURBOPACK unreachable
            ;
            const upgradeToDynamicPrefetch = undefined;
        },
        onTouchStart: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : function onTouchStart(e) {
            if (!legacyBehavior && typeof onTouchStartProp === 'function') {
                onTouchStartProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onTouchStart === 'function') {
                child.props.onTouchStart(e);
            }
            if (!router) {
                return;
            }
            if (!prefetchEnabled) {
                return;
            }
            const upgradeToDynamicPrefetch = unstable_dynamicOnHover === true;
            (0, _links.onNavigationIntent)(e.currentTarget, upgradeToDynamicPrefetch);
        }
    };
    // If the url is absolute, we can bypass the logic to prepend the basePath.
    if ((0, _utils.isAbsoluteUrl)(as)) {
        childProps.href = as;
    } else if (!legacyBehavior || passHref || child.type === 'a' && !('href' in child.props)) {
        childProps.href = (0, _addbasepath.addBasePath)(as);
    }
    let link;
    if (legacyBehavior) {
        if ("TURBOPACK compile-time truthy", 1) {
            (0, _erroronce.errorOnce)('`legacyBehavior` is deprecated and will be removed in a future ' + 'release. A codemod is available to upgrade your components:\n\n' + 'npx @next/codemod@latest new-link .\n\n' + 'Learn more: https://nextjs.org/docs/app/building-your-application/upgrading/codemods#remove-a-tags-from-link-components');
        }
        link = /*#__PURE__*/ _react.default.cloneElement(child, childProps);
    } else {
        link = /*#__PURE__*/ (0, _jsxruntime.jsx)("a", {
            ...restProps,
            ...childProps,
            children: children
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(LinkStatusContext.Provider, {
        value: linkStatus,
        children: link
    });
}
const LinkStatusContext = /*#__PURE__*/ (0, _react.createContext)(_links.IDLE_LINK_STATUS);
const useLinkStatus = ()=>{
    return (0, _react.useContext)(LinkStatusContext);
};
function getFetchStrategyFromPrefetchProp(prefetchProp) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        return prefetchProp === null || prefetchProp === 'auto' ? _types.FetchStrategy.PPR : // (although invalid values should've been filtered out by prop validation in dev)
        _types.FetchStrategy.Full;
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=link.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/shared/src/utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "hasA11yProp",
    ()=>hasA11yProp,
    "mergeClasses",
    ()=>mergeClasses,
    "toCamelCase",
    ()=>toCamelCase,
    "toKebabCase",
    ()=>toKebabCase,
    "toPascalCase",
    ()=>toPascalCase
]);
const toKebabCase = (string)=>string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string)=>string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2)=>p2 ? p2.toUpperCase() : p1.toLowerCase());
const toPascalCase = (string)=>{
    const camelCase = toCamelCase(string);
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
const mergeClasses = (...classes)=>classes.filter((className, index, array)=>{
        return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
    }).join(" ").trim();
const hasA11yProp = (props)=>{
    for(const prop in props){
        if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
            return true;
        }
    }
};
;
 //# sourceMappingURL=utils.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/defaultAttributes.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>defaultAttributes
]);
var defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
};
;
 //# sourceMappingURL=defaultAttributes.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Icon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$defaultAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/defaultAttributes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/shared/src/utils.js [app-client] (ecmascript)");
;
;
;
const Icon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(({ color = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth, className = "", children, iconNode, ...rest }, ref)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])("svg", {
        ref,
        ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$defaultAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeClasses"])("lucide", className),
        ...!children && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasA11yProp"])(rest) && {
            "aria-hidden": "true"
        },
        ...rest
    }, [
        ...iconNode.map(([tag, attrs])=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(tag, attrs)),
        ...Array.isArray(children) ? children : [
            children
        ]
    ]));
;
 //# sourceMappingURL=Icon.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>createLucideIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/shared/src/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/Icon.js [app-client] (ecmascript)");
;
;
;
const createLucideIcon = (iconName, iconNode)=>{
    const Component = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            ref,
            iconNode,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeClasses"])(`lucide-${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toKebabCase"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toPascalCase"])(iconName))}`, `lucide-${iconName}`, className),
            ...props
        }));
    Component.displayName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toPascalCase"])(iconName);
    return Component;
};
;
 //# sourceMappingURL=createLucideIcon.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Search
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m21 21-4.34-4.34",
            key: "14j7rj"
        }
    ],
    [
        "circle",
        {
            cx: "11",
            cy: "11",
            r: "8",
            key: "4ej97u"
        }
    ]
];
const Search = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("search", __iconNode);
;
 //# sourceMappingURL=search.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Search",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/arrow-up.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ArrowUp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m5 12 7-7 7 7",
            key: "hav0vg"
        }
    ],
    [
        "path",
        {
            d: "M12 19V5",
            key: "x0mq9r"
        }
    ]
];
const ArrowUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("arrow-up", __iconNode);
;
 //# sourceMappingURL=arrow-up.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/arrow-up.js [app-client] (ecmascript) <export default as ArrowUp>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArrowUp",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/award.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Award
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
            key: "1yiouv"
        }
    ],
    [
        "circle",
        {
            cx: "12",
            cy: "8",
            r: "6",
            key: "1vp47v"
        }
    ]
];
const Award = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("award", __iconNode);
;
 //# sourceMappingURL=award.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/award.js [app-client] (ecmascript) <export default as Award>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Award",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/award.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ChevronLeft
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m15 18-6-6 6-6",
            key: "1wnfg3"
        }
    ]
];
const ChevronLeft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("chevron-left", __iconNode);
;
 //# sourceMappingURL=chevron-left.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronLeft",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Heart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
            key: "mvr1a0"
        }
    ]
];
const Heart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("heart", __iconNode);
;
 //# sourceMappingURL=heart.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Heart",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/share-2.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Share2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "circle",
        {
            cx: "18",
            cy: "5",
            r: "3",
            key: "gq8acd"
        }
    ],
    [
        "circle",
        {
            cx: "6",
            cy: "12",
            r: "3",
            key: "w7nqdw"
        }
    ],
    [
        "circle",
        {
            cx: "18",
            cy: "19",
            r: "3",
            key: "1xt0gg"
        }
    ],
    [
        "line",
        {
            x1: "8.59",
            x2: "15.42",
            y1: "13.51",
            y2: "17.49",
            key: "47mynk"
        }
    ],
    [
        "line",
        {
            x1: "15.41",
            x2: "8.59",
            y1: "6.51",
            y2: "10.49",
            key: "1n3mei"
        }
    ]
];
const Share2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("share-2", __iconNode);
;
 //# sourceMappingURL=share-2.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/share-2.js [app-client] (ecmascript) <export default as Share2>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Share2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/share-2.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Star
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
            key: "r04s7s"
        }
    ]
];
const Star = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("star", __iconNode);
;
 //# sourceMappingURL=star.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Star",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/truck.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Truck
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2",
            key: "wrbu53"
        }
    ],
    [
        "path",
        {
            d: "M15 18H9",
            key: "1lyqi6"
        }
    ],
    [
        "path",
        {
            d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
            key: "lysw3i"
        }
    ],
    [
        "circle",
        {
            cx: "17",
            cy: "18",
            r: "2",
            key: "332jqn"
        }
    ],
    [
        "circle",
        {
            cx: "7",
            cy: "18",
            r: "2",
            key: "19iecd"
        }
    ]
];
const Truck = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("truck", __iconNode);
;
 //# sourceMappingURL=truck.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/truck.js [app-client] (ecmascript) <export default as Truck>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Truck",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/truck.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Calendar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M8 2v4",
            key: "1cmpym"
        }
    ],
    [
        "path",
        {
            d: "M16 2v4",
            key: "4m81vk"
        }
    ],
    [
        "rect",
        {
            width: "18",
            height: "18",
            x: "3",
            y: "4",
            rx: "2",
            key: "1hopcy"
        }
    ],
    [
        "path",
        {
            d: "M3 10h18",
            key: "8toen8"
        }
    ]
];
const Calendar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("calendar", __iconNode);
;
 //# sourceMappingURL=calendar.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Calendar",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>RotateCcw
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
            key: "1357e3"
        }
    ],
    [
        "path",
        {
            d: "M3 3v5h5",
            key: "1xhq8a"
        }
    ]
];
const RotateCcw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("rotate-ccw", __iconNode);
;
 //# sourceMappingURL=rotate-ccw.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RotateCcw",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ShieldCheck
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
            key: "oel41y"
        }
    ],
    [
        "path",
        {
            d: "m9 12 2 2 4-4",
            key: "dzmm74"
        }
    ]
];
const ShieldCheck = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("shield-check", __iconNode);
;
 //# sourceMappingURL=shield-check.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ShieldCheck",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_637f6ea9._.js.map