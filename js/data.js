// بيانات المنتجات
const productsData = {
    categories: [
        {
            id: "hot-drinks",
            name: "المشروبات الساخنة",
            icon: "fas fa-mug-hot",
            products: [
                {
                    id: 1,
                    name: "قهوة عربية",
                    description: "قهوة عربية أصيلة مع هيل وزعفران",
                    price: 6,
                    category: "hot-drinks",
                    image: "https://images.unsplash.com/photo-1521305916504-4a1121188589",
                    badges: ["new"],
                    rating: 4.2,
                    isFavorite: false,
                    isPopular: true,
                    options: {
                        size: [
                            { name: "صغير", price: 0 },
                            { name: "وسط", price: 1 },
                            { name: "كبير", price: 2 }
                        ],
                        sugar: [
                            { name: "بدون سكر", price: 0 },
                            { name: "قليل", price: 0 },
                            { name: "متوسط", price: 0 },
                            { name: "كثير", price: 0 }
                        ]
                    }
                },
                {
                    id: 2,
                    name: "بيكان",
                    description: "قهوة تركية مع سكر وفقاً للطلب",
                    price: 10,
                    category: "hot-drinks",
                    image: "https://images.unsplash.com/photo-1541781286675-1d5c3a5e84d6",
                    badges: ["new"],
                    rating: 4.5,
                    isFavorite: false,
                    isPopular: false,
                    options: {
                        sugar: [
                            { name: "بدون سكر", price: 0 },
                            { name: "قليل", price: 0 },
                            { name: "متوسط", price: 0 },
                            { name: "كثير", price: 0 }
                        ]
                    }
                },
                {
                    id: 3,
                    name: "كابتشينو",
                    description: "قهوة إيطالية مع حليب رغوي وكريمة",
                    price: 6,
                    category: "hot-drinks",
                    image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0",
                    badges: ["popular"],
                    rating: 4.8,
                    isFavorite: true,
                    isPopular: true,
                    options: {
                        size: [
                            { name: "صغير", price: 0 },
                            { name: "وسط", price: 1 },
                            { name: "كبير", price: 2 }
                        ]
                    }
                },
                {
                    id: 4,
                    name: "لاتيه",
                    description: "قهوة مع حليب ساخن ورغوة ناعمة",
                    price: 7,
                    category: "hot-drinks",
                    image: "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb",
                    badges: ["new"],
                    rating: 4.3,
                    isFavorite: false,
                    isPopular: true,
                    options: {
                        size: [
                            { name: "صغير", price: 0 },
                            { name: "وسط", price: 1 },
                            { name: "كبير", price: 2 }
                        ]
                    }
                },
                {
                    id: 5,
                    name: "شاي أخضر",
                    description: "شاي أخضر طبيعي مع نعناع طازج",
                    price: 4,
                    category: "hot-drinks",
                    image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9",
                    badges: [],
                    rating: 4.1,
                    isFavorite: false,
                    isPopular: false
                },
                {
                    id: 6,
                    name: "شوكولاتة ساخنة",
                    description: "شوكولاتة بلجيكية غنية مع كريمة",
                    price: 8,
                    oldPrice: 10,
                    category: "hot-drinks",
                    image: "https://images.unsplash.com/photo-1561047029-3000c68339ca",
                    badges: ["offer"],
                    rating: 4.6,
                    isFavorite: false,
                    isPopular: true,
                    options: {
                        size: [
                            { name: "صغير", price: 0 },
                            { name: "وسط", price: 1 },
                            { name: "كبير", price: 2 }
                        ]
                    }
                },
                {
                    id: 7,
                    name: "إسبريسو",
                    description: "قهوة مركزة بنكهة قوية",
                    price: 5,
                    category: "hot-drinks",
                    image: "https://images.unsplash.com/photo-1510707577719-ae7c9b788690",
                    badges: [],
                    rating: 4.4,
                    isFavorite: false,
                    isPopular: false
                },
                {
                    id: 8,
                    name: "موكا",
                    description: "مزيج من الإسبريسو والشوكولاتة الساخنة",
                    price: 9,
                    category: "hot-drinks",
                    image: "https://images.unsplash.com/photo-1510707577719-ae7c9b788690",
                    badges: [],
                    rating: 4.5,
                    isFavorite: false,
                    isPopular: false
                }
            ]
        },
        {
            id: "cold-drinks",
            name: "المشروبات الباردة",
            icon: "fas fa-glass-water",
            products: [
                {
                    id: 9,
                    name: "آيس كوفي",
                    description: "قهوة باردة مع حليب ومكعبات ثلج",
                    price: 8,
                    category: "cold-drinks",
                    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699",
                    badges: ["popular"],
                    rating: 4.7,
                    isFavorite: true,
                    isPopular: true,
                    options: {
                        size: [
                            { name: "صغير", price: 0 },
                            { name: "وسط", price: 1 },
                            { name: "كبير", price: 2 }
                        ]
                    }
                },
                {
                    id: 10,
                    name: "ميلك شيك",
                    description: "ميلك شيك بالفانيلا أو الشوكولاتة",
                    price: 9,
                    category: "cold-drinks",
                    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc",
                    badges: [],
                    rating: 4.3,
                    isFavorite: false,
                    isPopular: false,
                    options: {
                        flavor: [
                            { name: "فانيلا", price: 0 },
                            { name: "شوكولاتة", price: 0 },
                            { name: "فراولة", price: 0 }
                        ]
                    }
                },
                {
                    id: 11,
                    name: "عصير برتقال طازج",
                    description: "عصير برتقال طازج مع قطع فواكه",
                    price: 6,
                    category: "cold-drinks",
                    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b",
                    badges: [],
                    rating: 4.9,
                    isFavorite: false,
                    isPopular: true
                },
                {
                    id: 12,
                    name: "ليمون نعناع",
                    description: "عصير ليمون طازج مع أوراق نعناع",
                    price: 5,
                    category: "cold-drinks",
                    image: "https://images.unsplash.com/photo-1592921870789-04563d55041c",
                    badges: ["new"],
                    rating: 4.4,
                    isFavorite: false,
                    isPopular: false
                },
                {
                    id: 13,
                    name: "فرابتشينو",
                    description: "مشروب القهوة المثلج المخفوق",
                    price: 10,
                    category: "cold-drinks",
                    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699",
                    badges: [],
                    rating: 4.6,
                    isFavorite: false,
                    isPopular: false
                },
                {
                    id: 14,
                    name: "عصير مانجو",
                    description: "عصير مانجو طازج مع قطع فواكه",
                    price: 7,
                    category: "cold-drinks",
                    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba",
                    badges: [],
                    rating: 4.5,
                    isFavorite: false,
                    isPopular: false
                }
            ]
        },
        {
            id: "pastries",
            name: "المعجنات",
            icon: "fas fa-cookie-bite",
            products: [
                {
                    id: 15,
                    name: "كرواسون",
                    description: "كرواسون فرنسي طازج",
                    price: 5,
                    category: "pastries",
                    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
                    badges: ["new"],
                    rating: 4.6,
                    isFavorite: false,
                    isPopular: true,
                    options: {
                        type: [
                            { name: "عادي", price: 0 },
                            { name: "شوكولاتة", price: 1 },
                            { name: "لوز", price: 2 }
                        ]
                    }
                },
                {
                    id: 16,
                    name: "دونات",
                    description: "دونات طازج مع تزيين شوكولاتة",
                    price: 3,
                    category: "pastries",
                    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e",
                    badges: [],
                    rating: 4.2,
                    isFavorite: false,
                    isPopular: false,
                    options: {
                        topping: [
                            { name: "شوكولاتة", price: 0 },
                            { name: "فراولة", price: 0 },
                            { name: "سكر", price: 0 }
                        ]
                    }
                },
                {
                    id: 17,
                    name: "مافن الشوكولاتة",
                    description: "مافن طري بحبيبات شوكولاتة",
                    price: 4,
                    oldPrice: 5,
                    category: "pastries",
                    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff",
                    badges: ["offer"],
                    rating: 4.3,
                    isFavorite: false,
                    isPopular: false
                },
                {
                    id: 18,
                    name: "كعكة الجبن",
                    description: "تشيز كيك بنكهة التوت والفراولة",
                    price: 12,
                    category: "pastries",
                    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35",
                    badges: ["popular"],
                    rating: 4.9,
                    isFavorite: true,
                    isPopular: true
                },
                {
                    id: 19,
                    name: "بسكويت الشوكولاتة",
                    description: "بسكويت بالشوكولاتة الطرية",
                    price: 4,
                    category: "pastries",
                    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e",
                    badges: [],
                    rating: 4.0,
                    isFavorite: false,
                    isPopular: false
                },
                {
                    id: 20,
                    name: "فطيرة التفاح",
                    description: "فطيرة تفاح طازجة بالقرفة",
                    price: 8,
                    category: "pastries",
                    image: "https://images.unsplash.com/photo-1561624722-23c9c0c7f917",
                    badges: [],
                    rating: 4.5,
                    isFavorite: false,
                    isPopular: false
                }
            ]
        },
        {
            id: "desserts",
            name: "الحلويات",
            icon: "fas fa-ice-cream",
            products: [
                {
                    id: 21,
                    name: "تشيز كيك",
                    description: "تشيز كيك بنكهة التوت والفراولة",
                    price: 12,
                    category: "desserts",
                    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35",
                    badges: ["popular"],
                    rating: 4.9,
                    isFavorite: true,
                    isPopular: true
                },
                {
                    id: 22,
                    name: "تيراميسو",
                    description: "حلى الإصبع والقهوة الإيطالي",
                    price: 10,
                    category: "desserts",
                    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9",
                    badges: ["new"],
                    rating: 4.7,
                    isFavorite: false,
                    isPopular: false
                },
                {
                    id: 23,
                    name: "ميلفاي",
                    description: "حلى الطبقات الفرنسي بالكريمة",
                    price: 14,
                    category: "desserts",
                    image: "https://images.unsplash.com/photo-1519671481227-9f2466d4768a",
                    badges: [],
                    rating: 4.8,
                    isFavorite: false,
                    isPopular: false
                },
                {
                    id: 24,
                    name: "آيس كريم",
                    description: "آيس كريم بالفانيلا أو الشوكولاتة",
                    price: 6,
                    category: "desserts",
                    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb",
                    badges: [],
                    rating: 4.4,
                    isFavorite: false,
                    isPopular: false,
                    options: {
                        flavor: [
                            { name: "فانيلا", price: 0 },
                            { name: "شوكولاتة", price: 0 },
                            { name: "فراولة", price: 0 }
                        ]
                    }
                },
                {
                    id: 25,
                    name: "براونيز",
                    description: "كعكة الشوكولاتة الأمريكية",
                    price: 8,
                    category: "desserts",
                    image: "https://images.unsplash.com/photo-1606313564200-75f2d4fa383b",
                    badges: [],
                    rating: 4.6,
                    isFavorite: false,
                    isPopular: false
                }
            ]
        },
        {
            id: "sandwiches",
            name: "الساندويشات",
            icon: "fas fa-bread-slice",
            products: [
                {
                    id: 26,
                    name: "ساندويش جبنة",
                    description: "ساندويش جبنة مشوية مع خضار",
                    price: 7,
                    category: "sandwiches",
                    image: "https://images.unsplash.com/photo-1528736235302-52922df5c122",
                    badges: [],
                    rating: 4.2,
                    isFavorite: false,
                    isPopular: false
                },
                {
                    id: 27,
                    name: "ساندويش تونة",
                    description: "ساندويش تونة مع خضار طازجة",
                    price: 8,
                    category: "sandwiches",
                    image: "https://images.unsplash.com/photo-1553909489-cd47e0907980",
                    badges: ["new"],
                    rating: 4.3,
                    isFavorite: false,
                    isPopular: false
                },
                {
                    id: 28,
                    name: "ساندويش دجاج",
                    description: "ساندويش دجاج مشوي مع صلصة خاصة",
                    price: 9,
                    category: "sandwiches",
                    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af",
                    badges: ["popular"],
                    rating: 4.5,
                    isFavorite: false,
                    isPopular: true
                }
            ]
        },
        {
            id: "specials",
            name: "الخاصة بنا",
            icon: "fas fa-star",
            products: [
                {
                    id: 29,
                    name: "قهوة أورا",
                    description: "مزيج خاص من البن العربي والإثيوبي",
                    price: 12,
                    category: "specials",
                    image: "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb",
                    badges: ["popular", "new"],
                    rating: 4.9,
                    isFavorite: false,
                    isPopular: true
                },
                {
                    id: 30,
                    name: "مشروب القمر",
                    description: "مشروب حليب مع نكهات خاصة وفواكه",
                    price: 10,
                    category: "specials",
                    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc",
                    badges: ["new"],
                    rating: 4.7,
                    isFavorite: false,
                    isPopular: false
                }
            ]
        }
    ],
    offers: [
        {
            id: 1,
            title: "كومبو الإفطار",
            description: "كابتشينو + كرواسون",
            oldPrice: 15,
            newPrice: 10.5,
            discount: 30,
            image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
            products: [3, 15]
        },
        {
            id: 2,
            title: "عرض الشوكولاتة",
            description: "شوكولاتة ساخنة × 2",
            oldPrice: 16,
            newPrice: 8,
            discount: 50,
            image: "https://images.unsplash.com/photo-1561047029-3000c68339ca",
            products: [6, 6]
        },
        {
            id: 3,
            title: "عرض العائلة",
            description: "4 مشروبات ساخنة + 4 حلويات",
            oldPrice: 45,
            newPrice: 35,
            discount: 22,
            image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
            products: [1, 3, 4, 6, 15, 18, 21, 22]
        }
    ]
};

// بيانات الطلبات السابقة
const ordersData = [
    {
        id: "ORD-001",
        date: "2024-01-15",
        status: "completed",
        items: [
            { productId: 3, name: "كابتشينو", quantity: 2, price: 6 },
            { productId: 15, name: "كرواسون", quantity: 1, price: 5 }
        ],
        total: 17
    },
    {
        id: "ORD-002",
        date: "2024-01-10",
        status: "completed",
        items: [
            { productId: 1, name: "قهوة عربية", quantity: 1, price: 6 },
            { productId: 18, name: "كعكة الجبن", quantity: 1, price: 12 }
        ],
        total: 18
    },
    {
        id: "ORD-003",
        date: "2024-01-05",
        status: "pending",
        items: [
            { productId: 9, name: "آيس كوفي", quantity: 1, price: 8 },
            { productId: 16, name: "دونات", quantity: 3, price: 3 }
        ],
        total: 17
    }
];

// بيانات المستخدم
const userData = {
    name: "أحمد محمد",
    email: "ahmed@example.com",
    phone: "+218 91 234 5678",
    address: "طرابلس - شارع الاستقلال",
    joinDate: "يناير 2023",
    stats: {
        totalOrders: 12,
        totalSpent: 245,
        favoritesCount: 5
    }
};

// بيانات المقهى
const cafeData = {
    name: "ORA CAFÉ",
    slogan: "نكهة تراثية في كل رشفة",
    description: "مقهى عربي مميز يجمع بين الأصالة والحداثة، نقدم أجود أنواع القهوة العربية والحلويات الطازجة.",
    openingHours: "من الساعة 8 صباحاً حتى 12 مساءً",
    phone: "+218 91 234 5678",
    email: "info@oracafe.ly",
    address: "طرابلس - شارع الاستقلال",
    social: {
        facebook: "https://facebook.com/oracafe",
        instagram: "https://instagram.com/oracafe",
        twitter: "https://twitter.com/oracafe"
    }
};
