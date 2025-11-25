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
    "topProducts",
    ()=>topProducts,
    "topRated",
    ()=>topRated,
    "travelEssentials",
    ()=>travelEssentials
]);
const categories = [
    {
        id: 1,
        name: 'Electronics',
        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop'
    },
    {
        id: 2,
        name: 'Fashion',
        image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop'
    },
    {
        id: 3,
        name: 'Home',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop'
    },
    {
        id: 4,
        name: 'Kitchen',
        image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=200&h=200&fit=crop'
    },
    {
        id: 5,
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
        isFavorite: false
    },
    {
        id: 2,
        title: 'White Jumpsuit',
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
        currentPrice: '₹ 1,100',
        originalPrice: '₹ 2,200',
        isFavorite: false
    },
    {
        id: 3,
        title: 'Vitamin C Serum',
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop',
        currentPrice: '₹ 2,453',
        originalPrice: '₹ 4,700',
        isFavorite: false
    },
    {
        id: 4,
        title: 'Strip T-shirt',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
        currentPrice: '₹ 1,700',
        originalPrice: '₹ 3,400',
        isFavorite: false
    }
];
const topProducts = [
    {
        id: 5,
        title: 'Product Title',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
        currentPrice: '$24.00',
        originalPrice: null,
        isFavorite: false
    },
    {
        id: 6,
        title: 'Product Title',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
        currentPrice: '$24.00',
        originalPrice: null,
        isFavorite: false
    },
    {
        id: 7,
        title: 'Product Title',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
        currentPrice: '$24.00',
        originalPrice: null,
        isFavorite: false
    }
];
const accessories = [
    {
        id: 8,
        title: 'Lorem ipsum lorem ipsum dolor sit amet',
        image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop',
        currentPrice: '$275.00',
        originalPrice: '$550.00',
        isFavorite: false
    },
    {
        id: 9,
        title: 'Lorem ipsum lorem ipsum dolor sit amet',
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
        currentPrice: '$900.00',
        originalPrice: '$1800.00',
        isFavorite: false
    },
    {
        id: 10,
        title: 'Lorem ipsum lorem ipsum dolor sit amet',
        image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop',
        currentPrice: '$400.00',
        originalPrice: '$800.00',
        isFavorite: false
    }
];
const newArrivals = [
    {
        id: 11,
        title: 'Smartphone Case',
        image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=400&h=400&fit=crop',
        currentPrice: '$15.00',
        originalPrice: '$30.00',
        isFavorite: false
    },
    {
        id: 12,
        title: 'Wireless Charger',
        image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop',
        currentPrice: '$25.00',
        originalPrice: '$50.00',
        isFavorite: false
    },
    {
        id: 13,
        title: 'Bluetooth Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
        currentPrice: '$80.00',
        originalPrice: '$160.00',
        isFavorite: false
    }
];
const hotProducts = [
    {
        id: 14,
        title: 'Gaming Mouse',
        image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop',
        currentPrice: '$45.00',
        originalPrice: '$90.00',
        isFavorite: false
    },
    {
        id: 15,
        title: 'Mechanical Keyboard',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop',
        currentPrice: '$120.00',
        originalPrice: '$240.00',
        isFavorite: false
    },
    {
        id: 16,
        title: 'LED Monitor',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop',
        currentPrice: '$200.00',
        originalPrice: '$400.00',
        isFavorite: false
    }
];
const topRated = [
    {
        id: 17,
        title: 'Coffee Maker',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop',
        currentPrice: '$60.00',
        originalPrice: '$120.00',
        isFavorite: false
    },
    {
        id: 18,
        title: 'Blender',
        image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&h=400&fit=crop',
        currentPrice: '$35.00',
        originalPrice: '$70.00',
        isFavorite: false
    },
    {
        id: 19,
        title: 'Air Fryer',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
        currentPrice: '$100.00',
        originalPrice: '$200.00',
        isFavorite: false
    }
];
const bestSelling = [
    {
        id: 20,
        title: 'Yoga Mat',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
        currentPrice: '$20.00',
        originalPrice: '$40.00',
        isFavorite: false
    },
    {
        id: 21,
        title: 'Dumbbells Set',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
        currentPrice: '$50.00',
        originalPrice: '$100.00',
        isFavorite: false
    },
    {
        id: 22,
        title: 'Running Shoes',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
        currentPrice: '$75.00',
        originalPrice: '$150.00',
        isFavorite: false
    }
];
const luxuryProducts = [
    {
        id: 23,
        title: 'Designer Watch',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
        currentPrice: '$500.00',
        originalPrice: '$1000.00',
        isFavorite: false
    },
    {
        id: 24,
        title: 'Leather Bag',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
        currentPrice: '$300.00',
        originalPrice: '$600.00',
        isFavorite: false
    },
    {
        id: 25,
        title: 'Sunglasses',
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
        currentPrice: '$150.00',
        originalPrice: '$300.00',
        isFavorite: false
    }
];
const ecoProducts = [
    {
        id: 26,
        title: 'Bamboo Toothbrush',
        image: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=400&h=400&fit=crop',
        currentPrice: '$5.00',
        originalPrice: '$10.00',
        isFavorite: false
    },
    {
        id: 27,
        title: 'Reusable Water Bottle',
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop',
        currentPrice: '$15.00',
        originalPrice: '$30.00',
        isFavorite: false
    },
    {
        id: 28,
        title: 'Organic Cotton T-shirt',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
        currentPrice: '$25.00',
        originalPrice: '$50.00',
        isFavorite: false
    }
];
const travelEssentials = [
    {
        id: 29,
        title: 'Travel Pillow',
        image: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=400&h=400&fit=crop',
        currentPrice: '$20.00',
        originalPrice: '$40.00',
        isFavorite: false
    },
    {
        id: 30,
        title: 'Portable Charger',
        image: 'https://images.unsplash.com/photo-1609594040430-3b9b92a98e53?w=400&h=400&fit=crop',
        currentPrice: '$30.00',
        originalPrice: '$60.00',
        isFavorite: false
    },
    {
        id: 31,
        title: 'Compression Socks',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
        currentPrice: '$15.00',
        originalPrice: '$30.00',
        isFavorite: false
    }
];
const securityProducts = [
    {
        id: 32,
        title: 'Smart Lock',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
        currentPrice: '$100.00',
        originalPrice: '$200.00',
        isFavorite: false
    },
    {
        id: 33,
        title: 'Security Camera',
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=400&fit=crop',
        currentPrice: '$80.00',
        originalPrice: '$160.00',
        isFavorite: false
    },
    {
        id: 34,
        title: 'Alarm System',
        image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=400&h=400&fit=crop',
        currentPrice: '$150.00',
        originalPrice: '$300.00',
        isFavorite: false
    }
];
const getProductDetails = (id)=>{
    const allProductDetails = [
        {
            id: 1,
            title: 'NEW Ulefone Watch',
            currentPrice: '$30.0',
            originalPrice: '$40.0',
            images: [
                'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1579586337278-3befd40f17da?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1544117519-31a4b719223c?w=600&h=600&fit=crop'
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
            freeShipping: true
        },
        {
            id: 2,
            title: 'White Jumpsuit',
            currentPrice: '₹ 1,100',
            originalPrice: '₹ 2,200',
            images: [
                'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=600&fit=crop'
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
            freeShipping: true
        },
        {
            id: 3,
            title: 'Vitamin C Serum',
            currentPrice: '₹ 2,453',
            originalPrice: '₹ 4,700',
            images: [
                'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop'
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
            freeShipping: false
        },
        {
            id: 4,
            title: 'Strip T-shirt',
            currentPrice: '₹ 1,700',
            originalPrice: '₹ 3,400',
            images: [
                'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop'
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
            images: [
                'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop'
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
            images: [
                'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop'
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
            images: [
                'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop'
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
            images: [
                'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600&h=600&fit=crop'
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
            images: [
                'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop'
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
            images: [
                'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&h=600&fit=crop'
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
    return allProductDetails.find((p)=>p.id === parseInt(id)) || allProductDetails[0];
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/ThemeToggle.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ThemeToggle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function ThemeToggle({ variant = 'button' }) {
    _s();
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('light');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeToggle.useEffect": ()=>{
            // Check for saved theme preference or default to light mode
            const savedTheme = localStorage.getItem('theme') || 'light';
            setTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }["ThemeToggle.useEffect"], []);
    const toggleTheme = ()=>{
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };
    if (variant === 'switch') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "theme-switch",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "checkbox",
                    checked: theme === 'dark',
                    onChange: toggleTheme
                }, void 0, false, {
                    fileName: "[project]/app/components/ThemeToggle.js",
                    lineNumber: 25,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "theme-slider"
                }, void 0, false, {
                    fileName: "[project]/app/components/ThemeToggle.js",
                    lineNumber: 30,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/ThemeToggle.js",
            lineNumber: 24,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: toggleTheme,
        className: "theme-toggle",
        "aria-label": "Toggle theme",
        children: theme === 'light' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            width: "20",
            height: "20",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            }, void 0, false, {
                fileName: "[project]/app/components/ThemeToggle.js",
                lineNumber: 43,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/components/ThemeToggle.js",
            lineNumber: 42,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            width: "20",
            height: "20",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: "12",
                    cy: "12",
                    r: "5"
                }, void 0, false, {
                    fileName: "[project]/app/components/ThemeToggle.js",
                    lineNumber: 47,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: "12",
                    y1: "1",
                    x2: "12",
                    y2: "3"
                }, void 0, false, {
                    fileName: "[project]/app/components/ThemeToggle.js",
                    lineNumber: 48,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: "12",
                    y1: "21",
                    x2: "12",
                    y2: "23"
                }, void 0, false, {
                    fileName: "[project]/app/components/ThemeToggle.js",
                    lineNumber: 49,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: "4.22",
                    y1: "4.22",
                    x2: "5.64",
                    y2: "5.64"
                }, void 0, false, {
                    fileName: "[project]/app/components/ThemeToggle.js",
                    lineNumber: 50,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: "18.36",
                    y1: "18.36",
                    x2: "19.78",
                    y2: "19.78"
                }, void 0, false, {
                    fileName: "[project]/app/components/ThemeToggle.js",
                    lineNumber: 51,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: "1",
                    y1: "12",
                    x2: "3",
                    y2: "12"
                }, void 0, false, {
                    fileName: "[project]/app/components/ThemeToggle.js",
                    lineNumber: 52,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: "21",
                    y1: "12",
                    x2: "23",
                    y2: "12"
                }, void 0, false, {
                    fileName: "[project]/app/components/ThemeToggle.js",
                    lineNumber: 53,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: "4.22",
                    y1: "19.78",
                    x2: "5.64",
                    y2: "18.36"
                }, void 0, false, {
                    fileName: "[project]/app/components/ThemeToggle.js",
                    lineNumber: 54,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: "18.36",
                    y1: "5.64",
                    x2: "19.78",
                    y2: "4.22"
                }, void 0, false, {
                    fileName: "[project]/app/components/ThemeToggle.js",
                    lineNumber: 55,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/ThemeToggle.js",
            lineNumber: 46,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/ThemeToggle.js",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_s(ThemeToggle, "Z8UCD9KudyQA62DCQ9e5cf9+m5k=");
_c = ThemeToggle;
var _c;
__turbopack_context__.k.register(_c, "ThemeToggle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/products/[id]/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductDetailPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$data$2f$products$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/data/products.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ThemeToggle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ThemeToggle.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function ProductDetailPage() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const product = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$data$2f$products$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProductDetails"])(params.id);
    const [currentImageIndex, setCurrentImageIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isFavorite, setIsFavorite] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    if (!product) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "product-detail-page",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: '40px 20px',
                    textAlign: 'center'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "Product not found"
                    }, void 0, false, {
                        fileName: "[project]/app/products/[id]/page.js",
                        lineNumber: 19,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.push('/'),
                        style: {
                            marginTop: '20px',
                            padding: '12px 24px',
                            background: 'var(--primary-color)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        },
                        children: "Go Home"
                    }, void 0, false, {
                        fileName: "[project]/app/products/[id]/page.js",
                        lineNumber: 20,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/products/[id]/page.js",
                lineNumber: 18,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/products/[id]/page.js",
            lineNumber: 17,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "product-detail-page",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "product-nav",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "nav-button",
                        onClick: ()=>router.back(),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "20",
                            height: "20",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "white",
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M19 12H5M12 19l-7-7 7-7"
                            }, void 0, false, {
                                fileName: "[project]/app/products/[id]/page.js",
                                lineNumber: 34,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/products/[id]/page.js",
                            lineNumber: 33,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/products/[id]/page.js",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "nav-button",
                        onClick: ()=>setIsFavorite(!isFavorite),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "20",
                            height: "20",
                            viewBox: "0 0 24 24",
                            fill: isFavorite ? "white" : "none",
                            stroke: "white",
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                            }, void 0, false, {
                                fileName: "[project]/app/products/[id]/page.js",
                                lineNumber: 42,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/products/[id]/page.js",
                            lineNumber: 41,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/products/[id]/page.js",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/products/[id]/page.js",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "product-image-area",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "product-image-container",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: product.images[currentImageIndex],
                            alt: product.title,
                            className: "product-main-image"
                        }, void 0, false, {
                            fileName: "[project]/app/products/[id]/page.js",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/products/[id]/page.js",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "image-pagination",
                        children: product.images.map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `pagination-dot ${index === currentImageIndex ? 'active' : ''}`,
                                onClick: ()=>setCurrentImageIndex(index)
                            }, index, false, {
                                fileName: "[project]/app/products/[id]/page.js",
                                lineNumber: 58,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/products/[id]/page.js",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/products/[id]/page.js",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "product-details-card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "product-detail-title",
                        children: product.title
                    }, void 0, false, {
                        fileName: "[project]/app/products/[id]/page.js",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "product-pricing",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "price-group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "current-price",
                                        children: product.currentPrice
                                    }, void 0, false, {
                                        fileName: "[project]/app/products/[id]/page.js",
                                        lineNumber: 73,
                                        columnNumber: 13
                                    }, this),
                                    product.originalPrice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "original-price",
                                        children: product.originalPrice
                                    }, void 0, false, {
                                        fileName: "[project]/app/products/[id]/page.js",
                                        lineNumber: 75,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/products/[id]/page.js",
                                lineNumber: 72,
                                columnNumber: 11
                            }, this),
                            product.freeShipping && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "shipping-badge",
                                children: "FREE SHIP"
                            }, void 0, false, {
                                fileName: "[project]/app/products/[id]/page.js",
                                lineNumber: 79,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/products/[id]/page.js",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "product-features",
                        children: product.features.map((feature, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "feature-item",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "feature-icon",
                                        children: feature.icon
                                    }, void 0, false, {
                                        fileName: "[project]/app/products/[id]/page.js",
                                        lineNumber: 86,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "feature-label",
                                        children: feature.label
                                    }, void 0, false, {
                                        fileName: "[project]/app/products/[id]/page.js",
                                        lineNumber: 87,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, index, true, {
                                fileName: "[project]/app/products/[id]/page.js",
                                lineNumber: 85,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/products/[id]/page.js",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "product-description",
                        children: product.description
                    }, void 0, false, {
                        fileName: "[project]/app/products/[id]/page.js",
                        lineNumber: 92,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "add-to-cart-btn",
                        children: "Add to Cart"
                    }, void 0, false, {
                        fileName: "[project]/app/products/[id]/page.js",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/products/[id]/page.js",
                lineNumber: 68,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/products/[id]/page.js",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_s(ProductDetailPage, "yQMKymwwmz55eOilrT/i55b8YXs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = ProductDetailPage;
var _c;
__turbopack_context__.k.register(_c, "ProductDetailPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_27ab6cc0._.js.map