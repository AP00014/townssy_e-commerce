module.exports = [
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/data/products.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=200&fit=crop'
    },
    {
        id: 42,
        label: 'Designer Shoe',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop'
    },
    {
        id: 43,
        label: 'Food Trailer',
        image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=200&h=200&fit=crop'
    },
    {
        id: 44,
        label: 'Spider Hoodie',
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
}),
"[project]/app/components/ProductCard.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$FavouritesContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/context/FavouritesContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up.js [app-ssr] (ecmascript) <export default as ArrowUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/award.js [app-ssr] (ecmascript) <export default as Award>");
'use client';
;
;
;
;
function ProductCard({ id, image, title, currentPrice, originalPrice, isFavorite = false, badge, showVisualSearch = true, variant = 'default' // 'default', 'top-deal', 'top-ranking', 'grid'
 }) {
    const { toggleFavourite, isFavourite } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$FavouritesContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFavourites"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const favourite = isFavourite(id);
    const formatPrice = (price)=>{
        if (price == null) return '';
        if (typeof price === 'string') {
            return price;
        }
        return `$${price.toFixed(2)}`;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `product-card-link product-card-${variant}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "product-card",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "product-image-wrapper",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: image,
                            alt: title,
                            className: "product-image"
                        }, void 0, false, {
                            fileName: "[project]/app/components/ProductCard.js",
                            lineNumber: 35,
                            columnNumber: 11
                        }, this),
                        badge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `product-badge product-badge-${badge.type || 'default'}`,
                            children: badge.text
                        }, void 0, false, {
                            fileName: "[project]/app/components/ProductCard.js",
                            lineNumber: 43,
                            columnNumber: 13
                        }, this),
                        showVisualSearch && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "product-visual-search",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/app/components/ProductCard.js",
                                lineNumber: 51,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/ProductCard.js",
                            lineNumber: 50,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "18",
                                height: "18",
                                viewBox: "0 0 24 24",
                                fill: favourite ? "#FF0000" : "none",
                                stroke: favourite ? "#FF0000" : "#666666",
                                strokeWidth: "2",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/ProductCard.js",
                                    lineNumber: 71,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/ProductCard.js",
                                lineNumber: 70,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/ProductCard.js",
                            lineNumber: 56,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/ProductCard.js",
                    lineNumber: 34,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "product-info",
                    children: [
                        badge && badge.position === 'above-title' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `product-badge-inline product-badge-${badge.type || 'default'}`,
                            children: badge.text
                        }, void 0, false, {
                            fileName: "[project]/app/components/ProductCard.js",
                            lineNumber: 79,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "product-title-link",
                            onClick: ()=>router.push(`/products/${id || 1}`),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "product-title",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/app/components/ProductCard.js",
                                lineNumber: 85,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/ProductCard.js",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this),
                        (variant !== 'top-ranking' || currentPrice) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "product-price",
                            children: [
                                currentPrice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "product-price-current",
                                    children: formatPrice(currentPrice)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/ProductCard.js",
                                    lineNumber: 92,
                                    columnNumber: 17
                                }, this),
                                originalPrice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "product-price-original",
                                    children: formatPrice(originalPrice)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/ProductCard.js",
                                    lineNumber: 95,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/ProductCard.js",
                            lineNumber: 90,
                            columnNumber: 13
                        }, this),
                        badge && badge.position === 'below-title' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `product-ranking-badge product-ranking-badge-${badge.type || 'default'}`,
                            children: [
                                badge.icon === 'crown' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"], {
                                    size: 12
                                }, void 0, false, {
                                    fileName: "[project]/app/components/ProductCard.js",
                                    lineNumber: 103,
                                    columnNumber: 42
                                }, this),
                                badge.icon === 'arrow-up' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__["ArrowUp"], {
                                    size: 12
                                }, void 0, false, {
                                    fileName: "[project]/app/components/ProductCard.js",
                                    lineNumber: 104,
                                    columnNumber: 45
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: badge.text
                                }, void 0, false, {
                                    fileName: "[project]/app/components/ProductCard.js",
                                    lineNumber: 105,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/ProductCard.js",
                            lineNumber: 102,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/ProductCard.js",
                    lineNumber: 76,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/ProductCard.js",
            lineNumber: 33,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/ProductCard.js",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/products/[id]/ProductDetailClient.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

const e = new Error("Could not parse module '[project]/app/products/[id]/ProductDetailClient.js'\n\nExpression expected");
e.code = 'MODULE_UNPARSABLE';
throw e;
}),
"[project]/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) return obj;
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") return {
        default: obj
    };
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
            else newObj[key] = obj[key];
        }
    }
    newObj.default = obj;
    if (cache) cache.set(obj, newObj);
    return newObj;
}
exports._ = _interop_require_wildcard;
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/contexts/app-router-context.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['contexts'].AppRouterContext; //# sourceMappingURL=app-router-context.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/contexts/hooks-client-context.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['contexts'].HooksClientContext; //# sourceMappingURL=hooks-client-context.js.map
}),
"[project]/node_modules/next/dist/shared/lib/segment.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    DEFAULT_SEGMENT_KEY: null,
    PAGE_SEGMENT_KEY: null,
    addSearchParamsIfPageSegment: null,
    computeSelectedLayoutSegment: null,
    getSegmentValue: null,
    getSelectedLayoutSegmentPath: null,
    isGroupSegment: null,
    isParallelRouteSegment: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    DEFAULT_SEGMENT_KEY: function() {
        return DEFAULT_SEGMENT_KEY;
    },
    PAGE_SEGMENT_KEY: function() {
        return PAGE_SEGMENT_KEY;
    },
    addSearchParamsIfPageSegment: function() {
        return addSearchParamsIfPageSegment;
    },
    computeSelectedLayoutSegment: function() {
        return computeSelectedLayoutSegment;
    },
    getSegmentValue: function() {
        return getSegmentValue;
    },
    getSelectedLayoutSegmentPath: function() {
        return getSelectedLayoutSegmentPath;
    },
    isGroupSegment: function() {
        return isGroupSegment;
    },
    isParallelRouteSegment: function() {
        return isParallelRouteSegment;
    }
});
function getSegmentValue(segment) {
    return Array.isArray(segment) ? segment[1] : segment;
}
function isGroupSegment(segment) {
    // Use array[0] for performant purpose
    return segment[0] === '(' && segment.endsWith(')');
}
function isParallelRouteSegment(segment) {
    return segment.startsWith('@') && segment !== '@children';
}
function addSearchParamsIfPageSegment(segment, searchParams) {
    const isPageSegment = segment.includes(PAGE_SEGMENT_KEY);
    if (isPageSegment) {
        const stringifiedQuery = JSON.stringify(searchParams);
        return stringifiedQuery !== '{}' ? PAGE_SEGMENT_KEY + '?' + stringifiedQuery : PAGE_SEGMENT_KEY;
    }
    return segment;
}
function computeSelectedLayoutSegment(segments, parallelRouteKey) {
    if (!segments || segments.length === 0) {
        return null;
    }
    // For 'children', use first segment; for other parallel routes, use last segment
    const rawSegment = parallelRouteKey === 'children' ? segments[0] : segments[segments.length - 1];
    // If the default slot is showing, return null since it's not technically "selected" (it's a fallback)
    // Returning an internal value like `__DEFAULT__` would be confusing
    return rawSegment === DEFAULT_SEGMENT_KEY ? null : rawSegment;
}
function getSelectedLayoutSegmentPath(tree, parallelRouteKey, first = true, segmentPath = []) {
    let node;
    if (first) {
        // Use the provided parallel route key on the first parallel route
        node = tree[1][parallelRouteKey];
    } else {
        // After first parallel route prefer children, if there's no children pick the first parallel route.
        const parallelRoutes = tree[1];
        node = parallelRoutes.children ?? Object.values(parallelRoutes)[0];
    }
    if (!node) return segmentPath;
    const segment = node[0];
    let segmentValue = getSegmentValue(segment);
    if (!segmentValue || segmentValue.startsWith(PAGE_SEGMENT_KEY)) {
        return segmentPath;
    }
    segmentPath.push(segmentValue);
    return getSelectedLayoutSegmentPath(node, parallelRouteKey, false, segmentPath);
}
const PAGE_SEGMENT_KEY = '__PAGE__';
const DEFAULT_SEGMENT_KEY = '__DEFAULT__'; //# sourceMappingURL=segment.js.map
}),
"[project]/node_modules/next/dist/client/components/readonly-url-search-params.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * ReadonlyURLSearchParams implementation shared between client and server.
 * This file is intentionally not marked as 'use client' or 'use server'
 * so it can be imported by both environments.
 */ /** @internal */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ReadonlyURLSearchParams", {
    enumerable: true,
    get: function() {
        return ReadonlyURLSearchParams;
    }
});
class ReadonlyURLSearchParamsError extends Error {
    constructor(){
        super('Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams');
    }
}
class ReadonlyURLSearchParams extends URLSearchParams {
    /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ append() {
        throw new ReadonlyURLSearchParamsError();
    }
    /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ delete() {
        throw new ReadonlyURLSearchParamsError();
    }
    /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ set() {
        throw new ReadonlyURLSearchParamsError();
    }
    /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ sort() {
        throw new ReadonlyURLSearchParamsError();
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=readonly-url-search-params.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/contexts/server-inserted-html.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['contexts'].ServerInsertedHtml; //# sourceMappingURL=server-inserted-html.js.map
}),
"[project]/node_modules/next/dist/client/components/unrecognized-action-error.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    UnrecognizedActionError: null,
    unstable_isUnrecognizedActionError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    UnrecognizedActionError: function() {
        return UnrecognizedActionError;
    },
    unstable_isUnrecognizedActionError: function() {
        return unstable_isUnrecognizedActionError;
    }
});
class UnrecognizedActionError extends Error {
    constructor(...args){
        super(...args);
        this.name = 'UnrecognizedActionError';
    }
}
function unstable_isUnrecognizedActionError(error) {
    return !!(error && typeof error === 'object' && error instanceof UnrecognizedActionError);
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=unrecognized-action-error.js.map
}),
"[project]/node_modules/next/dist/client/components/redirect-status-code.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RedirectStatusCode", {
    enumerable: true,
    get: function() {
        return RedirectStatusCode;
    }
});
var RedirectStatusCode = /*#__PURE__*/ function(RedirectStatusCode) {
    RedirectStatusCode[RedirectStatusCode["SeeOther"] = 303] = "SeeOther";
    RedirectStatusCode[RedirectStatusCode["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    RedirectStatusCode[RedirectStatusCode["PermanentRedirect"] = 308] = "PermanentRedirect";
    return RedirectStatusCode;
}({});
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=redirect-status-code.js.map
}),
"[project]/node_modules/next/dist/client/components/redirect-error.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    REDIRECT_ERROR_CODE: null,
    RedirectType: null,
    isRedirectError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    REDIRECT_ERROR_CODE: function() {
        return REDIRECT_ERROR_CODE;
    },
    RedirectType: function() {
        return RedirectType;
    },
    isRedirectError: function() {
        return isRedirectError;
    }
});
const _redirectstatuscode = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/redirect-status-code.js [app-ssr] (ecmascript)");
const REDIRECT_ERROR_CODE = 'NEXT_REDIRECT';
var RedirectType = /*#__PURE__*/ function(RedirectType) {
    RedirectType["push"] = "push";
    RedirectType["replace"] = "replace";
    return RedirectType;
}({});
function isRedirectError(error) {
    if (typeof error !== 'object' || error === null || !('digest' in error) || typeof error.digest !== 'string') {
        return false;
    }
    const digest = error.digest.split(';');
    const [errorCode, type] = digest;
    const destination = digest.slice(2, -2).join(';');
    const status = digest.at(-2);
    const statusCode = Number(status);
    return errorCode === REDIRECT_ERROR_CODE && (type === 'replace' || type === 'push') && typeof destination === 'string' && !isNaN(statusCode) && statusCode in _redirectstatuscode.RedirectStatusCode;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=redirect-error.js.map
}),
"[project]/node_modules/next/dist/client/components/redirect.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    getRedirectError: null,
    getRedirectStatusCodeFromError: null,
    getRedirectTypeFromError: null,
    getURLFromRedirectError: null,
    permanentRedirect: null,
    redirect: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getRedirectError: function() {
        return getRedirectError;
    },
    getRedirectStatusCodeFromError: function() {
        return getRedirectStatusCodeFromError;
    },
    getRedirectTypeFromError: function() {
        return getRedirectTypeFromError;
    },
    getURLFromRedirectError: function() {
        return getURLFromRedirectError;
    },
    permanentRedirect: function() {
        return permanentRedirect;
    },
    redirect: function() {
        return redirect;
    }
});
const _redirectstatuscode = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/redirect-status-code.js [app-ssr] (ecmascript)");
const _redirecterror = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/redirect-error.js [app-ssr] (ecmascript)");
const actionAsyncStorage = ("TURBOPACK compile-time truthy", 1) ? __turbopack_context__.r("[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)").actionAsyncStorage : "TURBOPACK unreachable";
function getRedirectError(url, type, statusCode = _redirectstatuscode.RedirectStatusCode.TemporaryRedirect) {
    const error = Object.defineProperty(new Error(_redirecterror.REDIRECT_ERROR_CODE), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
    error.digest = `${_redirecterror.REDIRECT_ERROR_CODE};${type};${url};${statusCode};`;
    return error;
}
function redirect(/** The URL to redirect to */ url, type) {
    type ??= actionAsyncStorage?.getStore()?.isAction ? _redirecterror.RedirectType.push : _redirecterror.RedirectType.replace;
    throw getRedirectError(url, type, _redirectstatuscode.RedirectStatusCode.TemporaryRedirect);
}
function permanentRedirect(/** The URL to redirect to */ url, type = _redirecterror.RedirectType.replace) {
    throw getRedirectError(url, type, _redirectstatuscode.RedirectStatusCode.PermanentRedirect);
}
function getURLFromRedirectError(error) {
    if (!(0, _redirecterror.isRedirectError)(error)) return null;
    // Slices off the beginning of the digest that contains the code and the
    // separating ';'.
    return error.digest.split(';').slice(2, -2).join(';');
}
function getRedirectTypeFromError(error) {
    if (!(0, _redirecterror.isRedirectError)(error)) {
        throw Object.defineProperty(new Error('Not a redirect error'), "__NEXT_ERROR_CODE", {
            value: "E260",
            enumerable: false,
            configurable: true
        });
    }
    return error.digest.split(';', 2)[1];
}
function getRedirectStatusCodeFromError(error) {
    if (!(0, _redirecterror.isRedirectError)(error)) {
        throw Object.defineProperty(new Error('Not a redirect error'), "__NEXT_ERROR_CODE", {
            value: "E260",
            enumerable: false,
            configurable: true
        });
    }
    return Number(error.digest.split(';').at(-2));
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=redirect.js.map
}),
"[project]/node_modules/next/dist/client/components/http-access-fallback/http-access-fallback.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    HTTPAccessErrorStatus: null,
    HTTP_ERROR_FALLBACK_ERROR_CODE: null,
    getAccessFallbackErrorTypeByStatus: null,
    getAccessFallbackHTTPStatus: null,
    isHTTPAccessFallbackError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    HTTPAccessErrorStatus: function() {
        return HTTPAccessErrorStatus;
    },
    HTTP_ERROR_FALLBACK_ERROR_CODE: function() {
        return HTTP_ERROR_FALLBACK_ERROR_CODE;
    },
    getAccessFallbackErrorTypeByStatus: function() {
        return getAccessFallbackErrorTypeByStatus;
    },
    getAccessFallbackHTTPStatus: function() {
        return getAccessFallbackHTTPStatus;
    },
    isHTTPAccessFallbackError: function() {
        return isHTTPAccessFallbackError;
    }
});
const HTTPAccessErrorStatus = {
    NOT_FOUND: 404,
    FORBIDDEN: 403,
    UNAUTHORIZED: 401
};
const ALLOWED_CODES = new Set(Object.values(HTTPAccessErrorStatus));
const HTTP_ERROR_FALLBACK_ERROR_CODE = 'NEXT_HTTP_ERROR_FALLBACK';
function isHTTPAccessFallbackError(error) {
    if (typeof error !== 'object' || error === null || !('digest' in error) || typeof error.digest !== 'string') {
        return false;
    }
    const [prefix, httpStatus] = error.digest.split(';');
    return prefix === HTTP_ERROR_FALLBACK_ERROR_CODE && ALLOWED_CODES.has(Number(httpStatus));
}
function getAccessFallbackHTTPStatus(error) {
    const httpStatus = error.digest.split(';')[1];
    return Number(httpStatus);
}
function getAccessFallbackErrorTypeByStatus(status) {
    switch(status){
        case 401:
            return 'unauthorized';
        case 403:
            return 'forbidden';
        case 404:
            return 'not-found';
        default:
            return;
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=http-access-fallback.js.map
}),
"[project]/node_modules/next/dist/client/components/not-found.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "notFound", {
    enumerable: true,
    get: function() {
        return notFound;
    }
});
const _httpaccessfallback = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/http-access-fallback/http-access-fallback.js [app-ssr] (ecmascript)");
/**
 * This function allows you to render the [not-found.js file](https://nextjs.org/docs/app/api-reference/file-conventions/not-found)
 * within a route segment as well as inject a tag.
 *
 * `notFound()` can be used in
 * [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components),
 * [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), and
 * [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations).
 *
 * - In a Server Component, this will insert a `<meta name="robots" content="noindex" />` meta tag and set the status code to 404.
 * - In a Route Handler or Server Action, it will serve a 404 to the caller.
 *
 * Read more: [Next.js Docs: `notFound`](https://nextjs.org/docs/app/api-reference/functions/not-found)
 */ const DIGEST = `${_httpaccessfallback.HTTP_ERROR_FALLBACK_ERROR_CODE};404`;
function notFound() {
    const error = Object.defineProperty(new Error(DIGEST), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
    error.digest = DIGEST;
    throw error;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=not-found.js.map
}),
"[project]/node_modules/next/dist/client/components/forbidden.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "forbidden", {
    enumerable: true,
    get: function() {
        return forbidden;
    }
});
const _httpaccessfallback = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/http-access-fallback/http-access-fallback.js [app-ssr] (ecmascript)");
// TODO: Add `forbidden` docs
/**
 * @experimental
 * This function allows you to render the [forbidden.js file](https://nextjs.org/docs/app/api-reference/file-conventions/forbidden)
 * within a route segment as well as inject a tag.
 *
 * `forbidden()` can be used in
 * [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components),
 * [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), and
 * [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations).
 *
 * Read more: [Next.js Docs: `forbidden`](https://nextjs.org/docs/app/api-reference/functions/forbidden)
 */ const DIGEST = `${_httpaccessfallback.HTTP_ERROR_FALLBACK_ERROR_CODE};403`;
function forbidden() {
    if ("TURBOPACK compile-time truthy", 1) {
        throw Object.defineProperty(new Error(`\`forbidden()\` is experimental and only allowed to be enabled when \`experimental.authInterrupts\` is enabled.`), "__NEXT_ERROR_CODE", {
            value: "E488",
            enumerable: false,
            configurable: true
        });
    }
    const error = Object.defineProperty(new Error(DIGEST), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
    error.digest = DIGEST;
    throw error;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=forbidden.js.map
}),
"[project]/node_modules/next/dist/client/components/unauthorized.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "unauthorized", {
    enumerable: true,
    get: function() {
        return unauthorized;
    }
});
const _httpaccessfallback = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/http-access-fallback/http-access-fallback.js [app-ssr] (ecmascript)");
// TODO: Add `unauthorized` docs
/**
 * @experimental
 * This function allows you to render the [unauthorized.js file](https://nextjs.org/docs/app/api-reference/file-conventions/unauthorized)
 * within a route segment as well as inject a tag.
 *
 * `unauthorized()` can be used in
 * [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components),
 * [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), and
 * [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations).
 *
 *
 * Read more: [Next.js Docs: `unauthorized`](https://nextjs.org/docs/app/api-reference/functions/unauthorized)
 */ const DIGEST = `${_httpaccessfallback.HTTP_ERROR_FALLBACK_ERROR_CODE};401`;
function unauthorized() {
    if ("TURBOPACK compile-time truthy", 1) {
        throw Object.defineProperty(new Error(`\`unauthorized()\` is experimental and only allowed to be used when \`experimental.authInterrupts\` is enabled.`), "__NEXT_ERROR_CODE", {
            value: "E411",
            enumerable: false,
            configurable: true
        });
    }
    const error = Object.defineProperty(new Error(DIGEST), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
    error.digest = DIGEST;
    throw error;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=unauthorized.js.map
}),
"[project]/node_modules/next/dist/server/dynamic-rendering-utils.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    isHangingPromiseRejectionError: null,
    makeDevtoolsIOAwarePromise: null,
    makeHangingPromise: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    isHangingPromiseRejectionError: function() {
        return isHangingPromiseRejectionError;
    },
    makeDevtoolsIOAwarePromise: function() {
        return makeDevtoolsIOAwarePromise;
    },
    makeHangingPromise: function() {
        return makeHangingPromise;
    }
});
function isHangingPromiseRejectionError(err) {
    if (typeof err !== 'object' || err === null || !('digest' in err)) {
        return false;
    }
    return err.digest === HANGING_PROMISE_REJECTION;
}
const HANGING_PROMISE_REJECTION = 'HANGING_PROMISE_REJECTION';
class HangingPromiseRejectionError extends Error {
    constructor(route, expression){
        super(`During prerendering, ${expression} rejects when the prerender is complete. Typically these errors are handled by React but if you move ${expression} to a different context by using \`setTimeout\`, \`after\`, or similar functions you may observe this error and you should handle it in that context. This occurred at route "${route}".`), this.route = route, this.expression = expression, this.digest = HANGING_PROMISE_REJECTION;
    }
}
const abortListenersBySignal = new WeakMap();
function makeHangingPromise(signal, route, expression) {
    if (signal.aborted) {
        return Promise.reject(new HangingPromiseRejectionError(route, expression));
    } else {
        const hangingPromise = new Promise((_, reject)=>{
            const boundRejection = reject.bind(null, new HangingPromiseRejectionError(route, expression));
            let currentListeners = abortListenersBySignal.get(signal);
            if (currentListeners) {
                currentListeners.push(boundRejection);
            } else {
                const listeners = [
                    boundRejection
                ];
                abortListenersBySignal.set(signal, listeners);
                signal.addEventListener('abort', ()=>{
                    for(let i = 0; i < listeners.length; i++){
                        listeners[i]();
                    }
                }, {
                    once: true
                });
            }
        });
        // We are fine if no one actually awaits this promise. We shouldn't consider this an unhandled rejection so
        // we attach a noop catch handler here to suppress this warning. If you actually await somewhere or construct
        // your own promise out of it you'll need to ensure you handle the error when it rejects.
        hangingPromise.catch(ignoreReject);
        return hangingPromise;
    }
}
function ignoreReject() {}
function makeDevtoolsIOAwarePromise(underlying, requestStore, stage) {
    if (requestStore.stagedRendering) {
        // We resolve each stage in a timeout, so React DevTools will pick this up as IO.
        return requestStore.stagedRendering.delayUntilStage(stage, undefined, underlying);
    }
    // in React DevTools if we resolve in a setTimeout we will observe
    // the promise resolution as something that can suspend a boundary or root.
    return new Promise((resolve)=>{
        // Must use setTimeout to be considered IO React DevTools. setImmediate will not work.
        setTimeout(()=>{
            resolve(underlying);
        }, 0);
    });
} //# sourceMappingURL=dynamic-rendering-utils.js.map
}),
"[project]/node_modules/next/dist/server/lib/router-utils/is-postpone.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isPostpone", {
    enumerable: true,
    get: function() {
        return isPostpone;
    }
});
const REACT_POSTPONE_TYPE = Symbol.for('react.postpone');
function isPostpone(error) {
    return typeof error === 'object' && error !== null && error.$$typeof === REACT_POSTPONE_TYPE;
} //# sourceMappingURL=is-postpone.js.map
}),
"[project]/node_modules/next/dist/shared/lib/lazy-dynamic/bailout-to-csr.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This has to be a shared module which is shared between client component error boundary and dynamic component
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    BailoutToCSRError: null,
    isBailoutToCSRError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    BailoutToCSRError: function() {
        return BailoutToCSRError;
    },
    isBailoutToCSRError: function() {
        return isBailoutToCSRError;
    }
});
const BAILOUT_TO_CSR = 'BAILOUT_TO_CLIENT_SIDE_RENDERING';
class BailoutToCSRError extends Error {
    constructor(reason){
        super(`Bail out to client-side rendering: ${reason}`), this.reason = reason, this.digest = BAILOUT_TO_CSR;
    }
}
function isBailoutToCSRError(err) {
    if (typeof err !== 'object' || err === null || !('digest' in err)) {
        return false;
    }
    return err.digest === BAILOUT_TO_CSR;
} //# sourceMappingURL=bailout-to-csr.js.map
}),
"[project]/node_modules/next/dist/client/components/is-next-router-error.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isNextRouterError", {
    enumerable: true,
    get: function() {
        return isNextRouterError;
    }
});
const _httpaccessfallback = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/http-access-fallback/http-access-fallback.js [app-ssr] (ecmascript)");
const _redirecterror = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/redirect-error.js [app-ssr] (ecmascript)");
function isNextRouterError(error) {
    return (0, _redirecterror.isRedirectError)(error) || (0, _httpaccessfallback.isHTTPAccessFallbackError)(error);
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=is-next-router-error.js.map
}),
"[project]/node_modules/next/dist/client/components/hooks-server-context.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    DynamicServerError: null,
    isDynamicServerError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    DynamicServerError: function() {
        return DynamicServerError;
    },
    isDynamicServerError: function() {
        return isDynamicServerError;
    }
});
const DYNAMIC_ERROR_CODE = 'DYNAMIC_SERVER_USAGE';
class DynamicServerError extends Error {
    constructor(description){
        super(`Dynamic server usage: ${description}`), this.description = description, this.digest = DYNAMIC_ERROR_CODE;
    }
}
function isDynamicServerError(err) {
    if (typeof err !== 'object' || err === null || !('digest' in err) || typeof err.digest !== 'string') {
        return false;
    }
    return err.digest === DYNAMIC_ERROR_CODE;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=hooks-server-context.js.map
}),
"[project]/node_modules/next/dist/client/components/static-generation-bailout.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    StaticGenBailoutError: null,
    isStaticGenBailoutError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    StaticGenBailoutError: function() {
        return StaticGenBailoutError;
    },
    isStaticGenBailoutError: function() {
        return isStaticGenBailoutError;
    }
});
const NEXT_STATIC_GEN_BAILOUT = 'NEXT_STATIC_GEN_BAILOUT';
class StaticGenBailoutError extends Error {
    constructor(...args){
        super(...args), this.code = NEXT_STATIC_GEN_BAILOUT;
    }
}
function isStaticGenBailoutError(error) {
    if (typeof error !== 'object' || error === null || !('code' in error)) {
        return false;
    }
    return error.code === NEXT_STATIC_GEN_BAILOUT;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=static-generation-bailout.js.map
}),
"[project]/node_modules/next/dist/lib/framework/boundary-constants.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    METADATA_BOUNDARY_NAME: null,
    OUTLET_BOUNDARY_NAME: null,
    ROOT_LAYOUT_BOUNDARY_NAME: null,
    VIEWPORT_BOUNDARY_NAME: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    METADATA_BOUNDARY_NAME: function() {
        return METADATA_BOUNDARY_NAME;
    },
    OUTLET_BOUNDARY_NAME: function() {
        return OUTLET_BOUNDARY_NAME;
    },
    ROOT_LAYOUT_BOUNDARY_NAME: function() {
        return ROOT_LAYOUT_BOUNDARY_NAME;
    },
    VIEWPORT_BOUNDARY_NAME: function() {
        return VIEWPORT_BOUNDARY_NAME;
    }
});
const METADATA_BOUNDARY_NAME = '__next_metadata_boundary__';
const VIEWPORT_BOUNDARY_NAME = '__next_viewport_boundary__';
const OUTLET_BOUNDARY_NAME = '__next_outlet_boundary__';
const ROOT_LAYOUT_BOUNDARY_NAME = '__next_root_layout_boundary__'; //# sourceMappingURL=boundary-constants.js.map
}),
"[project]/node_modules/next/dist/lib/scheduler.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    atLeastOneTask: null,
    scheduleImmediate: null,
    scheduleOnNextTick: null,
    waitAtLeastOneReactRenderTask: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    atLeastOneTask: function() {
        return atLeastOneTask;
    },
    scheduleImmediate: function() {
        return scheduleImmediate;
    },
    scheduleOnNextTick: function() {
        return scheduleOnNextTick;
    },
    waitAtLeastOneReactRenderTask: function() {
        return waitAtLeastOneReactRenderTask;
    }
});
const scheduleOnNextTick = (cb)=>{
    // We use Promise.resolve().then() here so that the operation is scheduled at
    // the end of the promise job queue, we then add it to the next process tick
    // to ensure it's evaluated afterwards.
    //
    // This was inspired by the implementation of the DataLoader interface: https://github.com/graphql/dataloader/blob/d336bd15282664e0be4b4a657cb796f09bafbc6b/src/index.js#L213-L255
    //
    Promise.resolve().then(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        else {
            process.nextTick(cb);
        }
    });
};
const scheduleImmediate = (cb)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        setImmediate(cb);
    }
};
function atLeastOneTask() {
    return new Promise((resolve)=>scheduleImmediate(resolve));
}
function waitAtLeastOneReactRenderTask() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        return new Promise((r)=>setImmediate(r));
    }
} //# sourceMappingURL=scheduler.js.map
}),
"[project]/node_modules/next/dist/shared/lib/invariant-error.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "InvariantError", {
    enumerable: true,
    get: function() {
        return InvariantError;
    }
});
class InvariantError extends Error {
    constructor(message, options){
        super(`Invariant: ${message.endsWith('.') ? message : message + '.'} This is a bug in Next.js.`, options);
        this.name = 'InvariantError';
    }
} //# sourceMappingURL=invariant-error.js.map
}),
"[project]/node_modules/next/dist/shared/lib/promise-with-resolvers.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createPromiseWithResolvers", {
    enumerable: true,
    get: function() {
        return createPromiseWithResolvers;
    }
});
function createPromiseWithResolvers() {
    // Shim of Stage 4 Promise.withResolvers proposal
    let resolve;
    let reject;
    const promise = new Promise((res, rej)=>{
        resolve = res;
        reject = rej;
    });
    return {
        resolve: resolve,
        reject: reject,
        promise
    };
} //# sourceMappingURL=promise-with-resolvers.js.map
}),
"[project]/node_modules/next/dist/server/app-render/staged-rendering.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    RenderStage: null,
    StagedRenderingController: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    RenderStage: function() {
        return RenderStage;
    },
    StagedRenderingController: function() {
        return StagedRenderingController;
    }
});
const _invarianterror = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/invariant-error.js [app-ssr] (ecmascript)");
const _promisewithresolvers = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/promise-with-resolvers.js [app-ssr] (ecmascript)");
var RenderStage = /*#__PURE__*/ function(RenderStage) {
    RenderStage[RenderStage["Static"] = 1] = "Static";
    RenderStage[RenderStage["Runtime"] = 2] = "Runtime";
    RenderStage[RenderStage["Dynamic"] = 3] = "Dynamic";
    return RenderStage;
}({});
class StagedRenderingController {
    constructor(abortSignal = null){
        this.abortSignal = abortSignal;
        this.currentStage = 1;
        this.runtimeStagePromise = (0, _promisewithresolvers.createPromiseWithResolvers)();
        this.dynamicStagePromise = (0, _promisewithresolvers.createPromiseWithResolvers)();
        if (abortSignal) {
            abortSignal.addEventListener('abort', ()=>{
                const { reason } = abortSignal;
                if (this.currentStage < 2) {
                    this.runtimeStagePromise.promise.catch(ignoreReject) // avoid unhandled rejections
                    ;
                    this.runtimeStagePromise.reject(reason);
                }
                if (this.currentStage < 3) {
                    this.dynamicStagePromise.promise.catch(ignoreReject) // avoid unhandled rejections
                    ;
                    this.dynamicStagePromise.reject(reason);
                }
            }, {
                once: true
            });
        }
    }
    advanceStage(stage) {
        // If we're already at the target stage or beyond, do nothing.
        // (this can happen e.g. if sync IO advanced us to the dynamic stage)
        if (this.currentStage >= stage) {
            return;
        }
        this.currentStage = stage;
        // Note that we might be going directly from Static to Dynamic,
        // so we need to resolve the runtime stage as well.
        if (stage >= 2) {
            this.runtimeStagePromise.resolve();
        }
        if (stage >= 3) {
            this.dynamicStagePromise.resolve();
        }
    }
    getStagePromise(stage) {
        switch(stage){
            case 2:
                {
                    return this.runtimeStagePromise.promise;
                }
            case 3:
                {
                    return this.dynamicStagePromise.promise;
                }
            default:
                {
                    stage;
                    throw Object.defineProperty(new _invarianterror.InvariantError(`Invalid render stage: ${stage}`), "__NEXT_ERROR_CODE", {
                        value: "E881",
                        enumerable: false,
                        configurable: true
                    });
                }
        }
    }
    waitForStage(stage) {
        return this.getStagePromise(stage);
    }
    delayUntilStage(stage, displayName, resolvedValue) {
        const ioTriggerPromise = this.getStagePromise(stage);
        const promise = makeDevtoolsIOPromiseFromIOTrigger(ioTriggerPromise, displayName, resolvedValue);
        // Analogously to `makeHangingPromise`, we might reject this promise if the signal is invoked.
        // (e.g. in the case where we don't want want the render to proceed to the dynamic stage and abort it).
        // We shouldn't consider this an unhandled rejection, so we attach a noop catch handler here to suppress this warning.
        if (this.abortSignal) {
            promise.catch(ignoreReject);
        }
        return promise;
    }
}
function ignoreReject() {}
// TODO(restart-on-cache-miss): the layering of `delayUntilStage`,
// `makeDevtoolsIOPromiseFromIOTrigger` and and `makeDevtoolsIOAwarePromise`
// is confusing, we should clean it up.
function makeDevtoolsIOPromiseFromIOTrigger(ioTrigger, displayName, resolvedValue) {
    // If we create a `new Promise` and give it a displayName
    // (with no userspace code above us in the stack)
    // React Devtools will use it as the IO cause when determining "suspended by".
    // In particular, it should shadow any inner IO that resolved/rejected the promise
    // (in case of staged rendering, this will be the `setTimeout` that triggers the relevant stage)
    const promise = new Promise((resolve, reject)=>{
        ioTrigger.then(resolve.bind(null, resolvedValue), reject);
    });
    if (displayName !== undefined) {
        // @ts-expect-error
        promise.displayName = displayName;
    }
    return promise;
} //# sourceMappingURL=staged-rendering.js.map
}),
"[project]/node_modules/next/dist/server/app-render/dynamic-rendering.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * The functions provided by this module are used to communicate certain properties
 * about the currently running code so that Next.js can make decisions on how to handle
 * the current execution in different rendering modes such as pre-rendering, resuming, and SSR.
 *
 * Today Next.js treats all code as potentially static. Certain APIs may only make sense when dynamically rendering.
 * Traditionally this meant deopting the entire render to dynamic however with PPR we can now deopt parts
 * of a React tree as dynamic while still keeping other parts static. There are really two different kinds of
 * Dynamic indications.
 *
 * The first is simply an intention to be dynamic. unstable_noStore is an example of this where
 * the currently executing code simply declares that the current scope is dynamic but if you use it
 * inside unstable_cache it can still be cached. This type of indication can be removed if we ever
 * make the default dynamic to begin with because the only way you would ever be static is inside
 * a cache scope which this indication does not affect.
 *
 * The second is an indication that a dynamic data source was read. This is a stronger form of dynamic
 * because it means that it is inappropriate to cache this at all. using a dynamic data source inside
 * unstable_cache should error. If you want to use some dynamic data inside unstable_cache you should
 * read that data outside the cache and pass it in as an argument to the cached function.
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    Postpone: null,
    PreludeState: null,
    abortAndThrowOnSynchronousRequestDataAccess: null,
    abortOnSynchronousPlatformIOAccess: null,
    accessedDynamicData: null,
    annotateDynamicAccess: null,
    consumeDynamicAccess: null,
    createDynamicTrackingState: null,
    createDynamicValidationState: null,
    createHangingInputAbortSignal: null,
    createRenderInBrowserAbortSignal: null,
    delayUntilRuntimeStage: null,
    formatDynamicAPIAccesses: null,
    getFirstDynamicReason: null,
    isDynamicPostpone: null,
    isPrerenderInterruptedError: null,
    logDisallowedDynamicError: null,
    markCurrentScopeAsDynamic: null,
    postponeWithTracking: null,
    throwIfDisallowedDynamic: null,
    throwToInterruptStaticGeneration: null,
    trackAllowedDynamicAccess: null,
    trackDynamicDataInDynamicRender: null,
    trackSynchronousPlatformIOAccessInDev: null,
    useDynamicRouteParams: null,
    useDynamicSearchParams: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    Postpone: function() {
        return Postpone;
    },
    PreludeState: function() {
        return PreludeState;
    },
    abortAndThrowOnSynchronousRequestDataAccess: function() {
        return abortAndThrowOnSynchronousRequestDataAccess;
    },
    abortOnSynchronousPlatformIOAccess: function() {
        return abortOnSynchronousPlatformIOAccess;
    },
    accessedDynamicData: function() {
        return accessedDynamicData;
    },
    annotateDynamicAccess: function() {
        return annotateDynamicAccess;
    },
    consumeDynamicAccess: function() {
        return consumeDynamicAccess;
    },
    createDynamicTrackingState: function() {
        return createDynamicTrackingState;
    },
    createDynamicValidationState: function() {
        return createDynamicValidationState;
    },
    createHangingInputAbortSignal: function() {
        return createHangingInputAbortSignal;
    },
    createRenderInBrowserAbortSignal: function() {
        return createRenderInBrowserAbortSignal;
    },
    delayUntilRuntimeStage: function() {
        return delayUntilRuntimeStage;
    },
    formatDynamicAPIAccesses: function() {
        return formatDynamicAPIAccesses;
    },
    getFirstDynamicReason: function() {
        return getFirstDynamicReason;
    },
    isDynamicPostpone: function() {
        return isDynamicPostpone;
    },
    isPrerenderInterruptedError: function() {
        return isPrerenderInterruptedError;
    },
    logDisallowedDynamicError: function() {
        return logDisallowedDynamicError;
    },
    markCurrentScopeAsDynamic: function() {
        return markCurrentScopeAsDynamic;
    },
    postponeWithTracking: function() {
        return postponeWithTracking;
    },
    throwIfDisallowedDynamic: function() {
        return throwIfDisallowedDynamic;
    },
    throwToInterruptStaticGeneration: function() {
        return throwToInterruptStaticGeneration;
    },
    trackAllowedDynamicAccess: function() {
        return trackAllowedDynamicAccess;
    },
    trackDynamicDataInDynamicRender: function() {
        return trackDynamicDataInDynamicRender;
    },
    trackSynchronousPlatformIOAccessInDev: function() {
        return trackSynchronousPlatformIOAccessInDev;
    },
    useDynamicRouteParams: function() {
        return useDynamicRouteParams;
    },
    useDynamicSearchParams: function() {
        return useDynamicSearchParams;
    }
});
const _react = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)"));
const _hooksservercontext = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/hooks-server-context.js [app-ssr] (ecmascript)");
const _staticgenerationbailout = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/static-generation-bailout.js [app-ssr] (ecmascript)");
const _workunitasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)");
const _workasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)");
const _dynamicrenderingutils = __turbopack_context__.r("[project]/node_modules/next/dist/server/dynamic-rendering-utils.js [app-ssr] (ecmascript)");
const _boundaryconstants = __turbopack_context__.r("[project]/node_modules/next/dist/lib/framework/boundary-constants.js [app-ssr] (ecmascript)");
const _scheduler = __turbopack_context__.r("[project]/node_modules/next/dist/lib/scheduler.js [app-ssr] (ecmascript)");
const _bailouttocsr = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/lazy-dynamic/bailout-to-csr.js [app-ssr] (ecmascript)");
const _invarianterror = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/invariant-error.js [app-ssr] (ecmascript)");
const _stagedrendering = __turbopack_context__.r("[project]/node_modules/next/dist/server/app-render/staged-rendering.js [app-ssr] (ecmascript)");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const hasPostpone = typeof _react.default.unstable_postpone === 'function';
function createDynamicTrackingState(isDebugDynamicAccesses) {
    return {
        isDebugDynamicAccesses,
        dynamicAccesses: [],
        syncDynamicErrorWithStack: null
    };
}
function createDynamicValidationState() {
    return {
        hasSuspenseAboveBody: false,
        hasDynamicMetadata: false,
        hasDynamicViewport: false,
        hasAllowedDynamic: false,
        dynamicErrors: []
    };
}
function getFirstDynamicReason(trackingState) {
    var _trackingState_dynamicAccesses_;
    return (_trackingState_dynamicAccesses_ = trackingState.dynamicAccesses[0]) == null ? void 0 : _trackingState_dynamicAccesses_.expression;
}
function markCurrentScopeAsDynamic(store, workUnitStore, expression) {
    if (workUnitStore) {
        switch(workUnitStore.type){
            case 'cache':
            case 'unstable-cache':
                // Inside cache scopes, marking a scope as dynamic has no effect,
                // because the outer cache scope creates a cache boundary. This is
                // subtly different from reading a dynamic data source, which is
                // forbidden inside a cache scope.
                return;
            case 'private-cache':
                // A private cache scope is already dynamic by definition.
                return;
            case 'prerender-legacy':
            case 'prerender-ppr':
            case 'request':
                break;
            default:
                workUnitStore;
        }
    }
    // If we're forcing dynamic rendering or we're forcing static rendering, we
    // don't need to do anything here because the entire page is already dynamic
    // or it's static and it should not throw or postpone here.
    if (store.forceDynamic || store.forceStatic) return;
    if (store.dynamicShouldError) {
        throw Object.defineProperty(new _staticgenerationbailout.StaticGenBailoutError(`Route ${store.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
            value: "E553",
            enumerable: false,
            configurable: true
        });
    }
    if (workUnitStore) {
        switch(workUnitStore.type){
            case 'prerender-ppr':
                return postponeWithTracking(store.route, expression, workUnitStore.dynamicTracking);
            case 'prerender-legacy':
                workUnitStore.revalidate = 0;
                // We aren't prerendering, but we are generating a static page. We need
                // to bail out of static generation.
                const err = Object.defineProperty(new _hooksservercontext.DynamicServerError(`Route ${store.route} couldn't be rendered statically because it used ${expression}. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
                    value: "E550",
                    enumerable: false,
                    configurable: true
                });
                store.dynamicUsageDescription = expression;
                store.dynamicUsageStack = err.stack;
                throw err;
            case 'request':
                if ("TURBOPACK compile-time truthy", 1) {
                    workUnitStore.usedDynamic = true;
                }
                break;
            default:
                workUnitStore;
        }
    }
}
function throwToInterruptStaticGeneration(expression, store, prerenderStore) {
    // We aren't prerendering but we are generating a static page. We need to bail out of static generation
    const err = Object.defineProperty(new _hooksservercontext.DynamicServerError(`Route ${store.route} couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
        value: "E558",
        enumerable: false,
        configurable: true
    });
    prerenderStore.revalidate = 0;
    store.dynamicUsageDescription = expression;
    store.dynamicUsageStack = err.stack;
    throw err;
}
function trackDynamicDataInDynamicRender(workUnitStore) {
    switch(workUnitStore.type){
        case 'cache':
        case 'unstable-cache':
            // Inside cache scopes, marking a scope as dynamic has no effect,
            // because the outer cache scope creates a cache boundary. This is
            // subtly different from reading a dynamic data source, which is
            // forbidden inside a cache scope.
            return;
        case 'private-cache':
            // A private cache scope is already dynamic by definition.
            return;
        case 'prerender':
        case 'prerender-runtime':
        case 'prerender-legacy':
        case 'prerender-ppr':
        case 'prerender-client':
            break;
        case 'request':
            if ("TURBOPACK compile-time truthy", 1) {
                workUnitStore.usedDynamic = true;
            }
            break;
        default:
            workUnitStore;
    }
}
function abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore) {
    const reason = `Route ${route} needs to bail out of prerendering at this point because it used ${expression}.`;
    const error = createPrerenderInterruptedError(reason);
    prerenderStore.controller.abort(error);
    const dynamicTracking = prerenderStore.dynamicTracking;
    if (dynamicTracking) {
        dynamicTracking.dynamicAccesses.push({
            // When we aren't debugging, we don't need to create another error for the
            // stack trace.
            stack: dynamicTracking.isDebugDynamicAccesses ? new Error().stack : undefined,
            expression
        });
    }
}
function abortOnSynchronousPlatformIOAccess(route, expression, errorWithStack, prerenderStore) {
    const dynamicTracking = prerenderStore.dynamicTracking;
    abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore);
    // It is important that we set this tracking value after aborting. Aborts are executed
    // synchronously except for the case where you abort during render itself. By setting this
    // value late we can use it to determine if any of the aborted tasks are the task that
    // called the sync IO expression in the first place.
    if (dynamicTracking) {
        if (dynamicTracking.syncDynamicErrorWithStack === null) {
            dynamicTracking.syncDynamicErrorWithStack = errorWithStack;
        }
    }
}
function trackSynchronousPlatformIOAccessInDev(requestStore) {
    // We don't actually have a controller to abort but we do the semantic equivalent by
    // advancing the request store out of the prerender stage
    if (requestStore.stagedRendering) {
        // TODO: error for sync IO in the runtime stage
        // (which is not currently covered by the validation render in `spawnDynamicValidationInDev`)
        requestStore.stagedRendering.advanceStage(_stagedrendering.RenderStage.Dynamic);
    }
}
function abortAndThrowOnSynchronousRequestDataAccess(route, expression, errorWithStack, prerenderStore) {
    const prerenderSignal = prerenderStore.controller.signal;
    if (prerenderSignal.aborted === false) {
        // TODO it would be better to move this aborted check into the callsite so we can avoid making
        // the error object when it isn't relevant to the aborting of the prerender however
        // since we need the throw semantics regardless of whether we abort it is easier to land
        // this way. See how this was handled with `abortOnSynchronousPlatformIOAccess` for a closer
        // to ideal implementation
        abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore);
        // It is important that we set this tracking value after aborting. Aborts are executed
        // synchronously except for the case where you abort during render itself. By setting this
        // value late we can use it to determine if any of the aborted tasks are the task that
        // called the sync IO expression in the first place.
        const dynamicTracking = prerenderStore.dynamicTracking;
        if (dynamicTracking) {
            if (dynamicTracking.syncDynamicErrorWithStack === null) {
                dynamicTracking.syncDynamicErrorWithStack = errorWithStack;
            }
        }
    }
    throw createPrerenderInterruptedError(`Route ${route} needs to bail out of prerendering at this point because it used ${expression}.`);
}
function Postpone({ reason, route }) {
    const prerenderStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    const dynamicTracking = prerenderStore && prerenderStore.type === 'prerender-ppr' ? prerenderStore.dynamicTracking : null;
    postponeWithTracking(route, reason, dynamicTracking);
}
function postponeWithTracking(route, expression, dynamicTracking) {
    assertPostpone();
    if (dynamicTracking) {
        dynamicTracking.dynamicAccesses.push({
            // When we aren't debugging, we don't need to create another error for the
            // stack trace.
            stack: dynamicTracking.isDebugDynamicAccesses ? new Error().stack : undefined,
            expression
        });
    }
    _react.default.unstable_postpone(createPostponeReason(route, expression));
}
function createPostponeReason(route, expression) {
    return `Route ${route} needs to bail out of prerendering at this point because it used ${expression}. ` + `React throws this special object to indicate where. It should not be caught by ` + `your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
}
function isDynamicPostpone(err) {
    if (typeof err === 'object' && err !== null && typeof err.message === 'string') {
        return isDynamicPostponeReason(err.message);
    }
    return false;
}
function isDynamicPostponeReason(reason) {
    return reason.includes('needs to bail out of prerendering at this point because it used') && reason.includes('Learn more: https://nextjs.org/docs/messages/ppr-caught-error');
}
if (isDynamicPostponeReason(createPostponeReason('%%%', '^^^')) === false) {
    throw Object.defineProperty(new Error('Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js'), "__NEXT_ERROR_CODE", {
        value: "E296",
        enumerable: false,
        configurable: true
    });
}
const NEXT_PRERENDER_INTERRUPTED = 'NEXT_PRERENDER_INTERRUPTED';
function createPrerenderInterruptedError(message) {
    const error = Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
    error.digest = NEXT_PRERENDER_INTERRUPTED;
    return error;
}
function isPrerenderInterruptedError(error) {
    return typeof error === 'object' && error !== null && error.digest === NEXT_PRERENDER_INTERRUPTED && 'name' in error && 'message' in error && error instanceof Error;
}
function accessedDynamicData(dynamicAccesses) {
    return dynamicAccesses.length > 0;
}
function consumeDynamicAccess(serverDynamic, clientDynamic) {
    // We mutate because we only call this once we are no longer writing
    // to the dynamicTrackingState and it's more efficient than creating a new
    // array.
    serverDynamic.dynamicAccesses.push(...clientDynamic.dynamicAccesses);
    return serverDynamic.dynamicAccesses;
}
function formatDynamicAPIAccesses(dynamicAccesses) {
    return dynamicAccesses.filter((access)=>typeof access.stack === 'string' && access.stack.length > 0).map(({ expression, stack })=>{
        stack = stack.split('\n') // Remove the "Error: " prefix from the first line of the stack trace as
        // well as the first 4 lines of the stack trace which is the distance
        // from the user code and the `new Error().stack` call.
        .slice(4).filter((line)=>{
            // Exclude Next.js internals from the stack trace.
            if (line.includes('node_modules/next/')) {
                return false;
            }
            // Exclude anonymous functions from the stack trace.
            if (line.includes(' (<anonymous>)')) {
                return false;
            }
            // Exclude Node.js internals from the stack trace.
            if (line.includes(' (node:')) {
                return false;
            }
            return true;
        }).join('\n');
        return `Dynamic API Usage Debug - ${expression}:\n${stack}`;
    });
}
function assertPostpone() {
    if (!hasPostpone) {
        throw Object.defineProperty(new Error(`Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js`), "__NEXT_ERROR_CODE", {
            value: "E224",
            enumerable: false,
            configurable: true
        });
    }
}
function createRenderInBrowserAbortSignal() {
    const controller = new AbortController();
    controller.abort(Object.defineProperty(new _bailouttocsr.BailoutToCSRError('Render in Browser'), "__NEXT_ERROR_CODE", {
        value: "E721",
        enumerable: false,
        configurable: true
    }));
    return controller.signal;
}
function createHangingInputAbortSignal(workUnitStore) {
    switch(workUnitStore.type){
        case 'prerender':
        case 'prerender-runtime':
            const controller = new AbortController();
            if (workUnitStore.cacheSignal) {
                // If we have a cacheSignal it means we're in a prospective render. If
                // the input we're waiting on is coming from another cache, we do want
                // to wait for it so that we can resolve this cache entry too.
                workUnitStore.cacheSignal.inputReady().then(()=>{
                    controller.abort();
                });
            } else {
                // Otherwise we're in the final render and we should already have all
                // our caches filled.
                // If the prerender uses stages, we have wait until the runtime stage,
                // at which point all runtime inputs will be resolved.
                // (otherwise, a runtime prerender might consider `cookies()` hanging
                //  even though they'd resolve in the next task.)
                //
                // We might still be waiting on some microtasks so we
                // wait one tick before giving up. When we give up, we still want to
                // render the content of this cache as deeply as we can so that we can
                // suspend as deeply as possible in the tree or not at all if we don't
                // end up waiting for the input.
                const runtimeStagePromise = (0, _workunitasyncstorageexternal.getRuntimeStagePromise)(workUnitStore);
                if (runtimeStagePromise) {
                    runtimeStagePromise.then(()=>(0, _scheduler.scheduleOnNextTick)(()=>controller.abort()));
                } else {
                    (0, _scheduler.scheduleOnNextTick)(()=>controller.abort());
                }
            }
            return controller.signal;
        case 'prerender-client':
        case 'prerender-ppr':
        case 'prerender-legacy':
        case 'request':
        case 'cache':
        case 'private-cache':
        case 'unstable-cache':
            return undefined;
        default:
            workUnitStore;
    }
}
function annotateDynamicAccess(expression, prerenderStore) {
    const dynamicTracking = prerenderStore.dynamicTracking;
    if (dynamicTracking) {
        dynamicTracking.dynamicAccesses.push({
            stack: dynamicTracking.isDebugDynamicAccesses ? new Error().stack : undefined,
            expression
        });
    }
}
function useDynamicRouteParams(expression) {
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (workStore && workUnitStore) {
        switch(workUnitStore.type){
            case 'prerender-client':
            case 'prerender':
                {
                    const fallbackParams = workUnitStore.fallbackRouteParams;
                    if (fallbackParams && fallbackParams.size > 0) {
                        // We are in a prerender with cacheComponents semantics. We are going to
                        // hang here and never resolve. This will cause the currently
                        // rendering component to effectively be a dynamic hole.
                        _react.default.use((0, _dynamicrenderingutils.makeHangingPromise)(workUnitStore.renderSignal, workStore.route, expression));
                    }
                    break;
                }
            case 'prerender-ppr':
                {
                    const fallbackParams = workUnitStore.fallbackRouteParams;
                    if (fallbackParams && fallbackParams.size > 0) {
                        return postponeWithTracking(workStore.route, expression, workUnitStore.dynamicTracking);
                    }
                    break;
                }
            case 'prerender-runtime':
                throw Object.defineProperty(new _invarianterror.InvariantError(`\`${expression}\` was called during a runtime prerender. Next.js should be preventing ${expression} from being included in server components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                    value: "E771",
                    enumerable: false,
                    configurable: true
                });
            case 'cache':
            case 'private-cache':
                throw Object.defineProperty(new _invarianterror.InvariantError(`\`${expression}\` was called inside a cache scope. Next.js should be preventing ${expression} from being included in server components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                    value: "E745",
                    enumerable: false,
                    configurable: true
                });
            case 'prerender-legacy':
            case 'request':
            case 'unstable-cache':
                break;
            default:
                workUnitStore;
        }
    }
}
function useDynamicSearchParams(expression) {
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (!workStore) {
        // We assume pages router context and just return
        return;
    }
    if (!workUnitStore) {
        (0, _workunitasyncstorageexternal.throwForMissingRequestStore)(expression);
    }
    switch(workUnitStore.type){
        case 'prerender-client':
            {
                _react.default.use((0, _dynamicrenderingutils.makeHangingPromise)(workUnitStore.renderSignal, workStore.route, expression));
                break;
            }
        case 'prerender-legacy':
        case 'prerender-ppr':
            {
                if (workStore.forceStatic) {
                    return;
                }
                throw Object.defineProperty(new _bailouttocsr.BailoutToCSRError(expression), "__NEXT_ERROR_CODE", {
                    value: "E394",
                    enumerable: false,
                    configurable: true
                });
            }
        case 'prerender':
        case 'prerender-runtime':
            throw Object.defineProperty(new _invarianterror.InvariantError(`\`${expression}\` was called from a Server Component. Next.js should be preventing ${expression} from being included in server components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                value: "E795",
                enumerable: false,
                configurable: true
            });
        case 'cache':
        case 'unstable-cache':
        case 'private-cache':
            throw Object.defineProperty(new _invarianterror.InvariantError(`\`${expression}\` was called inside a cache scope. Next.js should be preventing ${expression} from being included in server components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                value: "E745",
                enumerable: false,
                configurable: true
            });
        case 'request':
            return;
        default:
            workUnitStore;
    }
}
const hasSuspenseRegex = /\n\s+at Suspense \(<anonymous>\)/;
// Common implicit body tags that React will treat as body when placed directly in html
const bodyAndImplicitTags = 'body|div|main|section|article|aside|header|footer|nav|form|p|span|h1|h2|h3|h4|h5|h6';
// Detects when RootLayoutBoundary (our framework marker component) appears
// after Suspense in the component stack, indicating the root layout is wrapped
// within a Suspense boundary. Ensures no body/html/implicit-body components are in between.
//
// Example matches:
//   at Suspense (<anonymous>)
//   at __next_root_layout_boundary__ (<anonymous>)
//
// Or with other components in between (but not body/html/implicit-body):
//   at Suspense (<anonymous>)
//   at SomeComponent (<anonymous>)
//   at __next_root_layout_boundary__ (<anonymous>)
const hasSuspenseBeforeRootLayoutWithoutBodyOrImplicitBodyRegex = new RegExp(`\\n\\s+at Suspense \\(<anonymous>\\)(?:(?!\\n\\s+at (?:${bodyAndImplicitTags}) \\(<anonymous>\\))[\\s\\S])*?\\n\\s+at ${_boundaryconstants.ROOT_LAYOUT_BOUNDARY_NAME} \\([^\\n]*\\)`);
const hasMetadataRegex = new RegExp(`\\n\\s+at ${_boundaryconstants.METADATA_BOUNDARY_NAME}[\\n\\s]`);
const hasViewportRegex = new RegExp(`\\n\\s+at ${_boundaryconstants.VIEWPORT_BOUNDARY_NAME}[\\n\\s]`);
const hasOutletRegex = new RegExp(`\\n\\s+at ${_boundaryconstants.OUTLET_BOUNDARY_NAME}[\\n\\s]`);
function trackAllowedDynamicAccess(workStore, componentStack, dynamicValidation, clientDynamic) {
    if (hasOutletRegex.test(componentStack)) {
        // We don't need to track that this is dynamic. It is only so when something else is also dynamic.
        return;
    } else if (hasMetadataRegex.test(componentStack)) {
        dynamicValidation.hasDynamicMetadata = true;
        return;
    } else if (hasViewportRegex.test(componentStack)) {
        dynamicValidation.hasDynamicViewport = true;
        return;
    } else if (hasSuspenseBeforeRootLayoutWithoutBodyOrImplicitBodyRegex.test(componentStack)) {
        // For Suspense within body, the prelude wouldn't be empty so it wouldn't violate the empty static shells rule.
        // But if you have Suspense above body, the prelude is empty but we allow that because having Suspense
        // is an explicit signal from the user that they acknowledge the empty shell and want dynamic rendering.
        dynamicValidation.hasAllowedDynamic = true;
        dynamicValidation.hasSuspenseAboveBody = true;
        return;
    } else if (hasSuspenseRegex.test(componentStack)) {
        // this error had a Suspense boundary above it so we don't need to report it as a source
        // of disallowed
        dynamicValidation.hasAllowedDynamic = true;
        return;
    } else if (clientDynamic.syncDynamicErrorWithStack) {
        // This task was the task that called the sync error.
        dynamicValidation.dynamicErrors.push(clientDynamic.syncDynamicErrorWithStack);
        return;
    } else {
        const message = `Route "${workStore.route}": Uncached data was accessed outside of ` + '<Suspense>. This delays the entire page from rendering, resulting in a ' + 'slow user experience. Learn more: ' + 'https://nextjs.org/docs/messages/blocking-route';
        const error = createErrorWithComponentOrOwnerStack(message, componentStack);
        dynamicValidation.dynamicErrors.push(error);
        return;
    }
}
/**
 * In dev mode, we prefer using the owner stack, otherwise the provided
 * component stack is used.
 */ function createErrorWithComponentOrOwnerStack(message, componentStack) {
    const ownerStack = ("TURBOPACK compile-time value", "development") !== 'production' && _react.default.captureOwnerStack ? _react.default.captureOwnerStack() : null;
    const error = Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
    error.stack = error.name + ': ' + message + (ownerStack ?? componentStack);
    return error;
}
var PreludeState = /*#__PURE__*/ function(PreludeState) {
    PreludeState[PreludeState["Full"] = 0] = "Full";
    PreludeState[PreludeState["Empty"] = 1] = "Empty";
    PreludeState[PreludeState["Errored"] = 2] = "Errored";
    return PreludeState;
}({});
function logDisallowedDynamicError(workStore, error) {
    console.error(error);
    if (!workStore.dev) {
        if (workStore.hasReadableErrorStacks) {
            console.error(`To get a more detailed stack trace and pinpoint the issue, start the app in development mode by running \`next dev\`, then open "${workStore.route}" in your browser to investigate the error.`);
        } else {
            console.error(`To get a more detailed stack trace and pinpoint the issue, try one of the following:
  - Start the app in development mode by running \`next dev\`, then open "${workStore.route}" in your browser to investigate the error.
  - Rerun the production build with \`next build --debug-prerender\` to generate better stack traces.`);
        }
    }
}
function throwIfDisallowedDynamic(workStore, prelude, dynamicValidation, serverDynamic) {
    if (serverDynamic.syncDynamicErrorWithStack) {
        logDisallowedDynamicError(workStore, serverDynamic.syncDynamicErrorWithStack);
        throw new _staticgenerationbailout.StaticGenBailoutError();
    }
    if (prelude !== 0) {
        if (dynamicValidation.hasSuspenseAboveBody) {
            // This route has opted into allowing fully dynamic rendering
            // by including a Suspense boundary above the body. In this case
            // a lack of a shell is not considered disallowed so we simply return
            return;
        }
        // We didn't have any sync bailouts but there may be user code which
        // blocked the root. We would have captured these during the prerender
        // and can log them here and then terminate the build/validating render
        const dynamicErrors = dynamicValidation.dynamicErrors;
        if (dynamicErrors.length > 0) {
            for(let i = 0; i < dynamicErrors.length; i++){
                logDisallowedDynamicError(workStore, dynamicErrors[i]);
            }
            throw new _staticgenerationbailout.StaticGenBailoutError();
        }
        // If we got this far then the only other thing that could be blocking
        // the root is dynamic Viewport. If this is dynamic then
        // you need to opt into that by adding a Suspense boundary above the body
        // to indicate your are ok with fully dynamic rendering.
        if (dynamicValidation.hasDynamicViewport) {
            console.error(`Route "${workStore.route}" has a \`generateViewport\` that depends on Request data (\`cookies()\`, etc...) or uncached external data (\`fetch(...)\`, etc...) without explicitly allowing fully dynamic rendering. See more info here: https://nextjs.org/docs/messages/next-prerender-dynamic-viewport`);
            throw new _staticgenerationbailout.StaticGenBailoutError();
        }
        if (prelude === 1) {
            // If we ever get this far then we messed up the tracking of invalid dynamic.
            // We still adhere to the constraint that you must produce a shell but invite the
            // user to report this as a bug in Next.js.
            console.error(`Route "${workStore.route}" did not produce a static shell and Next.js was unable to determine a reason. This is a bug in Next.js.`);
            throw new _staticgenerationbailout.StaticGenBailoutError();
        }
    } else {
        if (dynamicValidation.hasAllowedDynamic === false && dynamicValidation.hasDynamicMetadata) {
            console.error(`Route "${workStore.route}" has a \`generateMetadata\` that depends on Request data (\`cookies()\`, etc...) or uncached external data (\`fetch(...)\`, etc...) when the rest of the route does not. See more info here: https://nextjs.org/docs/messages/next-prerender-dynamic-metadata`);
            throw new _staticgenerationbailout.StaticGenBailoutError();
        }
    }
}
function delayUntilRuntimeStage(prerenderStore, result) {
    if (prerenderStore.runtimeStagePromise) {
        return prerenderStore.runtimeStagePromise.then(()=>result);
    }
    return result;
} //# sourceMappingURL=dynamic-rendering.js.map
}),
"[project]/node_modules/next/dist/client/components/unstable-rethrow.server.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "unstable_rethrow", {
    enumerable: true,
    get: function() {
        return unstable_rethrow;
    }
});
const _dynamicrenderingutils = __turbopack_context__.r("[project]/node_modules/next/dist/server/dynamic-rendering-utils.js [app-ssr] (ecmascript)");
const _ispostpone = __turbopack_context__.r("[project]/node_modules/next/dist/server/lib/router-utils/is-postpone.js [app-ssr] (ecmascript)");
const _bailouttocsr = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/lazy-dynamic/bailout-to-csr.js [app-ssr] (ecmascript)");
const _isnextroutererror = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/is-next-router-error.js [app-ssr] (ecmascript)");
const _dynamicrendering = __turbopack_context__.r("[project]/node_modules/next/dist/server/app-render/dynamic-rendering.js [app-ssr] (ecmascript)");
const _hooksservercontext = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/hooks-server-context.js [app-ssr] (ecmascript)");
function unstable_rethrow(error) {
    if ((0, _isnextroutererror.isNextRouterError)(error) || (0, _bailouttocsr.isBailoutToCSRError)(error) || (0, _hooksservercontext.isDynamicServerError)(error) || (0, _dynamicrendering.isDynamicPostpone)(error) || (0, _ispostpone.isPostpone)(error) || (0, _dynamicrenderingutils.isHangingPromiseRejectionError)(error) || (0, _dynamicrendering.isPrerenderInterruptedError)(error)) {
        throw error;
    }
    if (error instanceof Error && 'cause' in error) {
        unstable_rethrow(error.cause);
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=unstable-rethrow.server.js.map
}),
"[project]/node_modules/next/dist/client/components/unstable-rethrow.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * This function should be used to rethrow internal Next.js errors so that they can be handled by the framework.
 * When wrapping an API that uses errors to interrupt control flow, you should use this function before you do any error handling.
 * This function will rethrow the error if it is a Next.js error so it can be handled, otherwise it will do nothing.
 *
 * Read more: [Next.js Docs: `unstable_rethrow`](https://nextjs.org/docs/app/api-reference/functions/unstable_rethrow)
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "unstable_rethrow", {
    enumerable: true,
    get: function() {
        return unstable_rethrow;
    }
});
const unstable_rethrow = ("TURBOPACK compile-time truthy", 1) ? __turbopack_context__.r("[project]/node_modules/next/dist/client/components/unstable-rethrow.server.js [app-ssr] (ecmascript)").unstable_rethrow : "TURBOPACK unreachable";
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=unstable-rethrow.js.map
}),
"[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    ReadonlyURLSearchParams: null,
    RedirectType: null,
    forbidden: null,
    notFound: null,
    permanentRedirect: null,
    redirect: null,
    unauthorized: null,
    unstable_isUnrecognizedActionError: null,
    unstable_rethrow: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ReadonlyURLSearchParams: function() {
        return _readonlyurlsearchparams.ReadonlyURLSearchParams;
    },
    RedirectType: function() {
        return _redirecterror.RedirectType;
    },
    forbidden: function() {
        return _forbidden.forbidden;
    },
    notFound: function() {
        return _notfound.notFound;
    },
    permanentRedirect: function() {
        return _redirect.permanentRedirect;
    },
    redirect: function() {
        return _redirect.redirect;
    },
    unauthorized: function() {
        return _unauthorized.unauthorized;
    },
    unstable_isUnrecognizedActionError: function() {
        return unstable_isUnrecognizedActionError;
    },
    unstable_rethrow: function() {
        return _unstablerethrow.unstable_rethrow;
    }
});
const _readonlyurlsearchparams = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/readonly-url-search-params.js [app-ssr] (ecmascript)");
const _redirect = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/redirect.js [app-ssr] (ecmascript)");
const _redirecterror = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/redirect-error.js [app-ssr] (ecmascript)");
const _notfound = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/not-found.js [app-ssr] (ecmascript)");
const _forbidden = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/forbidden.js [app-ssr] (ecmascript)");
const _unauthorized = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/unauthorized.js [app-ssr] (ecmascript)");
const _unstablerethrow = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/unstable-rethrow.js [app-ssr] (ecmascript)");
function unstable_isUnrecognizedActionError() {
    throw Object.defineProperty(new Error('`unstable_isUnrecognizedActionError` can only be used on the client.'), "__NEXT_ERROR_CODE", {
        value: "E776",
        enumerable: false,
        configurable: true
    });
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=navigation.react-server.js.map
}),
"[project]/node_modules/next/dist/client/components/navigation.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    ReadonlyURLSearchParams: null,
    RedirectType: null,
    ServerInsertedHTMLContext: null,
    forbidden: null,
    notFound: null,
    permanentRedirect: null,
    redirect: null,
    unauthorized: null,
    unstable_isUnrecognizedActionError: null,
    unstable_rethrow: null,
    useParams: null,
    usePathname: null,
    useRouter: null,
    useSearchParams: null,
    useSelectedLayoutSegment: null,
    useSelectedLayoutSegments: null,
    useServerInsertedHTML: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ReadonlyURLSearchParams: function() {
        return _navigationreactserver.ReadonlyURLSearchParams;
    },
    RedirectType: function() {
        return _navigationreactserver.RedirectType;
    },
    ServerInsertedHTMLContext: function() {
        return _serverinsertedhtmlsharedruntime.ServerInsertedHTMLContext;
    },
    forbidden: function() {
        return _navigationreactserver.forbidden;
    },
    notFound: function() {
        return _navigationreactserver.notFound;
    },
    permanentRedirect: function() {
        return _navigationreactserver.permanentRedirect;
    },
    redirect: function() {
        return _navigationreactserver.redirect;
    },
    unauthorized: function() {
        return _navigationreactserver.unauthorized;
    },
    unstable_isUnrecognizedActionError: function() {
        return _unrecognizedactionerror.unstable_isUnrecognizedActionError;
    },
    unstable_rethrow: function() {
        return _navigationreactserver.unstable_rethrow;
    },
    useParams: function() {
        return useParams;
    },
    usePathname: function() {
        return usePathname;
    },
    useRouter: function() {
        return useRouter;
    },
    useSearchParams: function() {
        return useSearchParams;
    },
    useSelectedLayoutSegment: function() {
        return useSelectedLayoutSegment;
    },
    useSelectedLayoutSegments: function() {
        return useSelectedLayoutSegments;
    },
    useServerInsertedHTML: function() {
        return _serverinsertedhtmlsharedruntime.useServerInsertedHTML;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-ssr] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)"));
const _approutercontextsharedruntime = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/contexts/app-router-context.js [app-ssr] (ecmascript)");
const _hooksclientcontextsharedruntime = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/contexts/hooks-client-context.js [app-ssr] (ecmascript)");
const _segment = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/segment.js [app-ssr] (ecmascript)");
const _readonlyurlsearchparams = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/readonly-url-search-params.js [app-ssr] (ecmascript)");
const _serverinsertedhtmlsharedruntime = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/contexts/server-inserted-html.js [app-ssr] (ecmascript)");
const _unrecognizedactionerror = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/unrecognized-action-error.js [app-ssr] (ecmascript)");
const _navigationreactserver = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-ssr] (ecmascript)");
const useDynamicRouteParams = ("TURBOPACK compile-time truthy", 1) ? __turbopack_context__.r("[project]/node_modules/next/dist/server/app-render/dynamic-rendering.js [app-ssr] (ecmascript)").useDynamicRouteParams : "TURBOPACK unreachable";
const useDynamicSearchParams = ("TURBOPACK compile-time truthy", 1) ? __turbopack_context__.r("[project]/node_modules/next/dist/server/app-render/dynamic-rendering.js [app-ssr] (ecmascript)").useDynamicSearchParams : "TURBOPACK unreachable";
function useSearchParams() {
    useDynamicSearchParams?.('useSearchParams()');
    const searchParams = (0, _react.useContext)(_hooksclientcontextsharedruntime.SearchParamsContext);
    // In the case where this is `null`, the compat types added in
    // `next-env.d.ts` will add a new overload that changes the return type to
    // include `null`.
    const readonlySearchParams = (0, _react.useMemo)(()=>{
        if (!searchParams) {
            // When the router is not ready in pages, we won't have the search params
            // available.
            return null;
        }
        return new _readonlyurlsearchparams.ReadonlyURLSearchParams(searchParams);
    }, [
        searchParams
    ]);
    // Instrument with Suspense DevTools (dev-only)
    if (("TURBOPACK compile-time value", "development") !== 'production' && 'use' in _react.default) {
        const navigationPromises = (0, _react.use)(_hooksclientcontextsharedruntime.NavigationPromisesContext);
        if (navigationPromises) {
            return (0, _react.use)(navigationPromises.searchParams);
        }
    }
    return readonlySearchParams;
}
function usePathname() {
    useDynamicRouteParams?.('usePathname()');
    // In the case where this is `null`, the compat types added in `next-env.d.ts`
    // will add a new overload that changes the return type to include `null`.
    const pathname = (0, _react.useContext)(_hooksclientcontextsharedruntime.PathnameContext);
    // Instrument with Suspense DevTools (dev-only)
    if (("TURBOPACK compile-time value", "development") !== 'production' && 'use' in _react.default) {
        const navigationPromises = (0, _react.use)(_hooksclientcontextsharedruntime.NavigationPromisesContext);
        if (navigationPromises) {
            return (0, _react.use)(navigationPromises.pathname);
        }
    }
    return pathname;
}
function useRouter() {
    const router = (0, _react.useContext)(_approutercontextsharedruntime.AppRouterContext);
    if (router === null) {
        throw Object.defineProperty(new Error('invariant expected app router to be mounted'), "__NEXT_ERROR_CODE", {
            value: "E238",
            enumerable: false,
            configurable: true
        });
    }
    return router;
}
function useParams() {
    useDynamicRouteParams?.('useParams()');
    const params = (0, _react.useContext)(_hooksclientcontextsharedruntime.PathParamsContext);
    // Instrument with Suspense DevTools (dev-only)
    if (("TURBOPACK compile-time value", "development") !== 'production' && 'use' in _react.default) {
        const navigationPromises = (0, _react.use)(_hooksclientcontextsharedruntime.NavigationPromisesContext);
        if (navigationPromises) {
            return (0, _react.use)(navigationPromises.params);
        }
    }
    return params;
}
function useSelectedLayoutSegments(parallelRouteKey = 'children') {
    useDynamicRouteParams?.('useSelectedLayoutSegments()');
    const context = (0, _react.useContext)(_approutercontextsharedruntime.LayoutRouterContext);
    // @ts-expect-error This only happens in `pages`. Type is overwritten in navigation.d.ts
    if (!context) return null;
    // Instrument with Suspense DevTools (dev-only)
    if (("TURBOPACK compile-time value", "development") !== 'production' && 'use' in _react.default) {
        const navigationPromises = (0, _react.use)(_hooksclientcontextsharedruntime.NavigationPromisesContext);
        if (navigationPromises) {
            const promise = navigationPromises.selectedLayoutSegmentsPromises?.get(parallelRouteKey);
            if (promise) {
                // We should always have a promise here, but if we don't, it's not worth erroring over.
                // We just won't be able to instrument it, but can still provide the value.
                return (0, _react.use)(promise);
            }
        }
    }
    return (0, _segment.getSelectedLayoutSegmentPath)(context.parentTree, parallelRouteKey);
}
function useSelectedLayoutSegment(parallelRouteKey = 'children') {
    useDynamicRouteParams?.('useSelectedLayoutSegment()');
    const navigationPromises = (0, _react.useContext)(_hooksclientcontextsharedruntime.NavigationPromisesContext);
    const selectedLayoutSegments = useSelectedLayoutSegments(parallelRouteKey);
    // Instrument with Suspense DevTools (dev-only)
    if (("TURBOPACK compile-time value", "development") !== 'production' && navigationPromises && 'use' in _react.default) {
        const promise = navigationPromises.selectedLayoutSegmentPromises?.get(parallelRouteKey);
        if (promise) {
            // We should always have a promise here, but if we don't, it's not worth erroring over.
            // We just won't be able to instrument it, but can still provide the value.
            return (0, _react.use)(promise);
        }
    }
    return (0, _segment.computeSelectedLayoutSegment)(selectedLayoutSegments, parallelRouteKey);
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=navigation.js.map
}),
"[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/shared/src/utils.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/node_modules/lucide-react/dist/esm/defaultAttributes.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/node_modules/lucide-react/dist/esm/Icon.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$defaultAttributes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/defaultAttributes.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/shared/src/utils.js [app-ssr] (ecmascript)");
;
;
;
const Icon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ color = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth, className = "", children, iconNode, ...rest }, ref)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"])("svg", {
        ref,
        ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$defaultAttributes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeClasses"])("lucide", className),
        ...!children && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasA11yProp"])(rest) && {
            "aria-hidden": "true"
        },
        ...rest
    }, [
        ...iconNode.map(([tag, attrs])=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"])(tag, attrs)),
        ...Array.isArray(children) ? children : [
            children
        ]
    ]));
;
 //# sourceMappingURL=Icon.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/shared/src/utils.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/Icon.js [app-ssr] (ecmascript)");
;
;
;
const createLucideIcon = (iconName, iconNode)=>{
    const Component = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            ref,
            iconNode,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeClasses"])(`lucide-${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toKebabCase"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toPascalCase"])(iconName))}`, `lucide-${iconName}`, className),
            ...props
        }));
    Component.displayName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toPascalCase"])(iconName);
    return Component;
};
;
 //# sourceMappingURL=createLucideIcon.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
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
const Search = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("search", __iconNode);
;
 //# sourceMappingURL=search.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Search",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/arrow-up.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
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
const ArrowUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("arrow-up", __iconNode);
;
 //# sourceMappingURL=arrow-up.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/arrow-up.js [app-ssr] (ecmascript) <export default as ArrowUp>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArrowUp",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/award.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
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
const Award = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("award", __iconNode);
;
 //# sourceMappingURL=award.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/award.js [app-ssr] (ecmascript) <export default as Award>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Award",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/award.js [app-ssr] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1a3edd6d._.js.map