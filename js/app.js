// حالة التطبيق
const appState = {
    currentPage: 'homePage',
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    selectedProduct: null,
    searchQuery: '',
    selectedCategory: null
};

// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', function() {
    // إخفاء شاشة التحميل بعد 2 ثانية
    setTimeout(() => {
        document.getElementById('loadingScreen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loadingScreen').style.display = 'none';
            initApp();
        }, 500);
    }, 2000);
});

function initApp() {
    // تحميل البيانات
    loadData();
    
    // إعداد معالجات الأحداث
    setupEventListeners();
    
    // عرض الصفحة الرئيسية
    showPage('homePage');
    
    // تحديث عداد السلة
    updateCartCount();
    
    // تحديث عداد المفضلة
    updateFavoritesCount();
}

function loadData() {
    // يمكن إضافة طلبات AJAX هنا لتحميل البيانات من الخادم
    console.log('تم تحميل البيانات بنجاح');
}

function setupEventListeners() {
    // القائمة الجانبية
    document.getElementById('sidebarToggle').addEventListener('click', toggleSidebar);
    document.getElementById('closeSidebar').addEventListener('click', toggleSidebar);
    
    // البحث
    document.getElementById('searchToggle').addEventListener('click', toggleSearch);
    document.getElementById('closeSearch').addEventListener('click', toggleSearch);
    document.getElementById('searchBtn').addEventListener('click', performSearch);
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') performSearch();
    });
    
    // التنقل
    setupNavigation();
    
    // السلة
*/
    setupCartListeners();
    */
    // المودالات
    setupModalListeners();
    
    // السلايدر
    setupSlider();
    
    // التصنيفات
    setupCategories();
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
    document.querySelector('.sidebar-overlay')?.classList.toggle('active');
}

function toggleSearch() {
    document.getElementById('searchContainer').classList.toggle('active');
    if (document.getElementById('searchContainer').classList.contains('active')) {
        document.getElementById('searchInput').focus();
    }
}

function performSearch() {
    const query = document.getElementById('searchInput').value.trim();
    if (query) {
        appState.searchQuery = query;
        showPage('menuPage');
        filterProductsBySearch(query);
        toggleSearch();
    }
}

function setupNavigation() {
    // الروابط في القائمة الجانبية
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            showPage(page);
            toggleSidebar();
        });
    });
    
    // القائمة السفلية
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            showPage(page);
            
            // تحديث العنصر النشط
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // زر الرجوع
    document.querySelectorAll('.back-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            showPage('homePage');
        });
    });
}

function showPage(pageId) {
    // إخفاء جميع الصفحات
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
        page.classList.remove('active');
    });
    
    // إزالة النشط من جميع عناصر التنقل
    document.querySelectorAll('.menu-item, .nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // إظهار الصفحة المطلوبة
    const page = document.getElementById(pageId);
    if (page) {
        page.style.display = 'block';
        setTimeout(() => page.classList.add('active'), 10);
        
        // تحديث العناصر النشطة في التنقل
        document.querySelectorAll(`[data-page="${pageId}"]`).forEach(item => {
            item.classList.add('active');
        });
        
        // تحميل محتوى الصفحة
        loadPageContent(pageId);
    }
    
    appState.currentPage = pageId;
}

function loadPageContent(pageId) {
    switch(pageId) {
        case 'homePage':
            loadHomePage();
            break;
        case 'menuPage':
            loadMenuPage();
            break;
        case 'cartPage':
            loadCartPage();
            break;
        case 'favoritesPage':
            loadFavoritesPage();
            break;
        case 'ordersPage':
            loadOrdersPage();
            break;
        case 'profilePage':
            loadProfilePage();
            break;
        case 'offersPage':
            loadOffersPage();
            break;
        case 'aboutPage':
            loadAboutPage();
            break;
        case 'contactPage':
            loadContactPage();
            break;
        case 'settingsPage':
            loadSettingsPage();
            break;
    }
}

function loadHomePage() {
    // تحميل المنتجات الشعبية
    loadPopularProducts();
    
    // تحميل العروض
    loadOffers();
}

function loadPopularProducts() {
    const container = document.getElementById('popularProducts');
    if (!container) return;
    
    // الحصول على المنتجات الشعبية
    const popularProducts = [];
    productsData.categories.forEach(category => {
        category.products.forEach(product => {
            if (product.isPopular) {
                popularProducts.push(product);
            }
        });
    });
    
    // عرض 4 منتجات شعبية فقط
    const displayProducts = popularProducts.slice(0, 4);
    
    container.innerHTML = displayProducts.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            ${product.badges.includes('new') ? '<span class="product-badge new">جديد</span>' : ''}
            ${product.badges.includes('popular') ? '<span class="product-badge popular">شائع</span>' : ''}
            ${product.badges.includes('offer') ? '<span class="product-badge offer">عرض</span>' : ''}
            
            <button class="favorite-btn ${product.isFavorite ? 'active' : ''}" onclick="toggleFavorite(${product.id}, event)">
                <i class="${product.isFavorite ? 'fas' : 'far'} fa-heart"></i>
            </button>
            
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            
            <div class="product-content">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                
                <div class="product-footer">
                    <div class="product-price">
                        ${product.oldPrice ? `<span class="old-price">${product.oldPrice} د.ل</span>` : ''}
                        ${product.price} د.ل
                    </div>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id}, event)">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // إضافة معالج النقر لعرض تفاصيل المنتج
    container.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.favorite-btn') && !e.target.closest('.add-to-cart-btn')) {
                const productId = parseInt(this.getAttribute('data-product-id'));
                showProductModal(productId);
            }
        });
    });
}

function loadOffers() {
    const container = document.querySelector('.offers-slider');
    if (!container) return;
    
    container.innerHTML = productsData.offers.map(offer => `
        <div class="offer-card">
            <div class="offer-badge">خصم ${offer.discount}%</div>
            <div class="offer-content">
                <h3 class="offer-title">${offer.title}</h3>
                <p class="offer-description">${offer.description}</p>
                <div class="offer-price">
                    <span class="old-price">${offer.oldPrice} د.ل</span>
                    <span class="new-price">${offer.newPrice} د.ل</span>
                </div>
                <button class="btn offer-btn" onclick="addOfferToCart(${offer.id})">أضف إلى السلة</button>
            </div>
            <div class="offer-image">
                <img src="${offer.image}" alt="${offer.title}">
            </div>
        </div>
    `).join('');
}

function loadMenuPage() {
    const container = document.getElementById('menuPage');
    if (!container) return;
    
    let content = `
        <header class="page-header">
            <button class="back-btn">
                <i class="fas fa-arrow-right"></i>
            </button>
            <h2>قائمة الطعام</h2>
        </header>
        
        <div class="page-content">
            <div class="categories-tabs" id="categoriesTabs"></div>
            <div class="products-container" id="menuProducts"></div>
        </div>
    `;
    
    container.innerHTML = content;
    
    // إعداد زر الرجوع
    container.querySelector('.back-btn').addEventListener('click', function() {
        showPage('homePage');
    });
    
    // تحميل التصنيفات
    loadCategoriesTabs();
    
    // تحميل المنتجات
    if (appState.searchQuery) {
        filterProductsBySearch(appState.searchQuery);
        appState.searchQuery = '';
    } else if (appState.selectedCategory) {
        filterProductsByCategory(appState.selectedCategory);
    } else {
        loadAllProducts();
    }
}

function loadCategoriesTabs() {
    const container = document.getElementById('categoriesTabs');
    if (!container) return;
    
    const tabs = productsData.categories.map(category => `
        <button class="category-tab ${appState.selectedCategory === category.id ? 'active' : ''}" 
                data-category="${category.id}">
            <i class="${category.icon}"></i>
            <span>${category.name}</span>
        </button>
    `).join('');
    
    container.innerHTML = `
        <div class="categories-tabs-container">
            <button class="category-tab ${!appState.selectedCategory ? 'active' : ''}" data-category="all">
                <i class="fas fa-th-large"></i>
                <span>الكل</span>
            </button>
            ${tabs}
        </div>
    `;
    
    // إضافة معالجات النقر
    container.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            appState.selectedCategory = category === 'all' ? null : category;
            loadMenuPage();
        });
    });
}

function loadAllProducts() {
    const container = document.getElementById('menuProducts');
    if (!container) return;
    
    let allProducts = [];
    productsData.categories.forEach(category => {
        allProducts = allProducts.concat(category.products);
    });
    
    displayProducts(container, allProducts);
}

function filterProductsByCategory(categoryId) {
    const container = document.getElementById('menuProducts');
    if (!container) return;
    
    const category = productsData.categories.find(c => c.id === categoryId);
    if (category) {
        displayProducts(container, category.products);
    }
}

function filterProductsBySearch(query) {
    const container = document.getElementById('menuProducts');
    if (!container) return;
    
    const searchResults = [];
    productsData.categories.forEach(category => {
        category.products.forEach(product => {
            if (product.name.includes(query) || product.description.includes(query)) {
                searchResults.push(product);
            }
        });
    });
    
    if (searchResults.length > 0) {
        displayProducts(container, searchResults);
    } else {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>لا توجد نتائج</h3>
                <p>لم يتم العثور على منتجات تطابق بحثك</p>
            </div>
        `;
    }
}

function displayProducts(container, products) {
    if (products.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-box-open"></i>
                <h3>لا توجد منتجات</h3>
                <p>لم يتم العثور على منتجات في هذا التصنيف</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = `
        <div class="products-grid">
            ${products.map(product => `
                <div class="product-card" data-product-id="${product.id}">
                    ${product.badges.includes('new') ? '<span class="product-badge new">جديد</span>' : ''}
                    ${product.badges.includes('popular') ? '<span class="product-badge popular">شائع</span>' : ''}
                    ${product.badges.includes('offer') ? '<span class="product-badge offer">عرض</span>' : ''}
                    
                    <button class="favorite-btn ${product.isFavorite ? 'active' : ''}" onclick="toggleFavorite(${product.id}, event)">
                        <i class="${product.isFavorite ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                    
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    
                    <div class="product-content">
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-description">${product.description}</p>
                        
                        <div class="product-footer">
                            <div class="product-price">
                                ${product.oldPrice ? `<span class="old-price">${product.oldPrice} د.ل</span>` : ''}
                                ${product.price} د.ل
                            </div>
                            <button class="add-to-cart-btn" onclick="addToCart(${product.id}, event)">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    // إضافة معالج النقر لعرض تفاصيل المنتج
    container.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.favorite-btn') && !e.target.closest('.add-to-cart-btn')) {
                const productId = parseInt(this.getAttribute('data-product-id'));
                showProductModal(productId);
            }
        });
    });
}

function loadCartPage() {
    const container = document.getElementById('cartPage');
    if (!container) return;
    
    if (appState.cart.length === 0) {
        container.innerHTML = `
            <header class="page-header">
                <button class="back-btn">
                    <i class="fas fa-arrow-right"></i>
                </button>
                <h2>سلة المشتريات</h2>
            </header>
            
            <div class="page-content">
                <div class="empty-state">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>سلة المشتريات فارغة</h3>
                    <p>قم بإضافة بعض المنتجات من قائمة الطعام</p>
                    <button class="btn primary-btn" onclick="showPage('menuPage')">تصفح القائمة</button>
                </div>
            </div>
        `;
    } else {
        let total = 0;
        const cartItems = appState.cart.map(item => {
            const product = getProductById(item.productId);
            if (!product) return '';
            
            const itemTotal = product.price * item.quantity;
            total += itemTotal;
            
            return `
                <div class="cart-item">
                    <div class="cart-item-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="cart-item-content">
                        <h4 class="cart-item-name">${product.name}</h4>
                        <div class="cart-item-price">${itemTotal} د.ل</div>
                        
                        <div class="cart-item-actions">
                            <div class="cart-item-quantity">
                                <button class="cart-item-quantity-btn" onclick="updateCartQuantity(${item.productId}, ${item.quantity - 1})">
                                    <i class="fas fa-minus"></i>
                                </button>
                                <span class="cart-item-quantity-value">${item.quantity}</span>
                                <button class="cart-item-quantity-btn" onclick="updateCartQuantity(${item.productId}, ${item.quantity + 1})">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                            <button class="cart-item-remove" onclick="removeFromCart(${item.productId})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        container.innerHTML = `
            <header class="page-header">
                <button class="back-btn">
                    <i class="fas fa-arrow-right"></i>
                </button>
                <h2>سلة المشتريات</h2>
            </header>
            
            <div class="page-content">
                <div class="cart-items">
                    ${cartItems}
                </div>
                
                <div class="cart-summary">
                    <div class="summary-row">
                        <span>المجموع الفرعي</span>
                        <span>${total} د.ل</span>
                    </div>
                    <div class="summary-row">
                        <span>رسوم التوصيل</span>
                        <span>${total >= 20 ? 'مجاني' : '5 د.ل'}</span>
                    </div>
                    <div class="summary-row total">
                        <span>الإجمالي</span>
                        <span>${total >= 20 ? total : total + 5} د.ل</span>
                    </div>
                    
                    <div class="cart-actions">
                        <button class="btn secondary-btn" onclick="clearCart()">إفراغ السلة</button>
                        <button class="btn primary-btn" onclick="checkout()">إتمام الطلب</button>
                    </div>
                </div>
            </div>
        `;
    }
    
    // إعداد زر الرجوع
    container.querySelector('.back-btn').addEventListener('click', function() {
        showPage('homePage');
    });
}

function loadFavoritesPage() {
    const container = document.getElementById('favoritesPage');
    if (!container) return;
    
    const favoriteProducts = [];
    productsData.categories.forEach(category => {
        category.products.forEach(product => {
            if (product.isFavorite) {
                favoriteProducts.push(product);
            }
        });
    });
    
    if (favoriteProducts.length === 0) {
        container.innerHTML = `
            <header class="page-header">
                <button class="back-btn">
                    <i class="fas fa-arrow-right"></i>
                </button>
                <h2>المفضلة</h2>
            </header>
            
            <div class="page-content">
                <div class="empty-state">
                    <i class="fas fa-heart"></i>
                    <h3>لا توجد منتجات في المفضلة</h3>
                    <p>قم بإضافة بعض المنتجات إلى المفضلة</p>
                    <button class="btn primary-btn" onclick="showPage('menuPage')">تصفح القائمة</button>
                </div>
            </div>
        `;
    } else {
        container.innerHTML = `
            <header class="page-header">
                <button class="back-btn">
                    <i class="fas fa-arrow-right"></i>
                </button>
                <h2>المفضلة</h2>
            </header>
            
            <div class="page-content">
                <div class="products-grid">
                    ${favoriteProducts.map(product => `
                        <div class="product-card" data-product-id="${product.id}">
                            ${product.badges.includes('new') ? '<span class="product-badge new">جديد</span>' : ''}
                            ${product.badges.includes('popular') ? '<span class="product-badge popular">شائع</span>' : ''}
                            ${product.badges.includes('offer') ? '<span class="product-badge offer">عرض</span>' : ''}
                            
                            <button class="favorite-btn active" onclick="toggleFavorite(${product.id}, event)">
                                <i class="fas fa-heart"></i>
                            </button>
                            
                            <div class="product-image">
                                <img src="${product.image}" alt="${product.name}">
                            </div>
                            
                            <div class="product-content">
                                <h3 class="product-name">${product.name}</h3>
                                <p class="product-description">${product.description}</p>
                                
                                <div class="product-footer">
                                    <div class="product-price">
                                        ${product.oldPrice ? `<span class="old-price">${product.oldPrice} د.ل</span>` : ''}
                                        ${product.price} د.ل
                                    </div>
                                    <button class="add-to-cart-btn" onclick="addToCart(${product.id}, event)">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    // إعداد زر الرجوع
    container.querySelector('.back-btn').addEventListener('click', function() {
        showPage('homePage');
    });
    
    // إضافة معالج النقر لعرض تفاصيل المنتج
    setTimeout(() => {
        container.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', function(e) {
                if (!e.target.closest('.favorite-btn') && !e.target.closest('.add-to-cart-btn')) {
                    const productId = parseInt(this.getAttribute('data-product-id'));
                    showProductModal(productId);
                }
            });
        });
    }, 100);
}

function loadOrdersPage() {
    const container = document.getElementById('ordersPage');
    if (!container) return;
    
    container.innerHTML = `
        <header class="page-header">
            <button class="back-btn">
                <i class="fas fa-arrow-right"></i>
            </button>
            <h2>طلباتي السابقة</h2>
        </header>
        
        <div class="page-content">
            ${ordersData.map(order => `
                <div class="order-card">
                    <div class="order-header">
                        <span class="order-id">${order.id}</span>
                        <span class="order-status status-${order.status}">
                            ${order.status === 'completed' ? 'مكتمل' : 
                              order.status === 'pending' ? 'قيد المعالجة' : 'ملغى'}
                        </span>
                    </div>
                    
                    <div class="order-items">
                        ${order.items.map(item => `
                            <div class="order-item">
                                <span>${item.name} × ${item.quantity}</span>
                                <span>${item.price * item.quantity} د.ل</span>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="order-footer">
                        <span class="order-date">${order.date}</span>
                        <span class="order-total">${order.total} د.ل</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    // إعداد زر الرجوع
    container.querySelector('.back-btn').addEventListener('click', function() {
        showPage('homePage');
    });
}

function loadProfilePage() {
    const container = document.getElementById('profilePage');
    if (!container) return;
    
    container.innerHTML = `
        <header class="page-header">
            <button class="back-btn">
                <i class="fas fa-arrow-right"></i>
            </button>
            <h2>حسابي</h2>
        </header>
        
        <div class="page-content">
            <div class="profile-card">
                <div class="profile-avatar">
                    <i class="fas fa-user-circle"></i>
                </div>
                <h3 class="profile-name">${userData.name}</h3>
                <p class="profile-email">${userData.email}</p>
                
                <div class="profile-stats">
                    <div class="stat-card">
                        <div class="stat-value">${userData.stats.totalOrders}</div>
                        <div class="stat-label">الطلبات</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${userData.stats.totalSpent}</div>
                        <div class="stat-label">د.ل أنفقت</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${userData.stats.favoritesCount}</div>
                        <div class="stat-label">المفضلة</div>
                    </div>
                </div>
            </div>
            
            <div class="settings-list">
                <div class="setting-item" onclick="showPage('ordersPage')">
                    <div class="setting-info">
                        <div class="setting-icon">
                            <i class="fas fa-history"></i>
                        </div>
                        <div class="setting-text">
                            <h4>طلباتي السابقة</h4>
                            <p>عرض جميع الطلبات السابقة</p>
                        </div>
                    </div>
                    <div class="setting-action">
                        <i class="fas fa-arrow-left"></i>
                    </div>
                </div>
                
                <div class="setting-item" onclick="showPage('favoritesPage')">
                    <div class="setting-info">
                        <div class="setting-icon">
                            <i class="fas fa-heart"></i>
                        </div>
                        <div class="setting-text">
                            <h4>المفضلة</h4>
                            <p>المنتجات التي أضفتها للمفضلة</p>
                        </div>
                    </div>
                    <div class="setting-action">
                        <i class="fas fa-arrow-left"></i>
                    </div>
                </div>
                
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-icon">
                            <i class="fas fa-map-marker-alt"></i>
                        </div>
                        <div class="setting-text">
                            <h4>العناوين</h4>
                            <p>إدارة عناوين التوصيل</p>
                        </div>
                    </div>
                    <div class="setting-action">
                        <i class="fas fa-arrow-left"></i>
                    </div>
                </div>
                
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-icon">
                            <i class="fas fa-bell"></i>
                        </div>
                        <div class="setting-text">
                            <h4>الإشعارات</h4>
                            <p>إدارة إشعارات التطبيق</p>
                        </div>
                    </div>
                    <div class="setting-action">
                        <i class="fas fa-arrow-left"></i>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // إعداد زر الرجوع
    container.querySelector('.back-btn').addEventListener('click', function() {
        showPage('homePage');
    });
}

function loadOffersPage() {
    const container = document.getElementById('offersPage');
    if (!container) return;
    
    container.innerHTML = `
        <header class="page-header">
            <button class="back-btn">
                <i class="fas fa-arrow-right"></i>
            </button>
            <h2>العروض الخاصة</h2>
        </header>
        
        <div class="page-content">
            <div class="offers-list">
                ${productsData.offers.map(offer => `
                    <div class="offer-card large">
                        <div class="offer-badge">خصم ${offer.discount}%</div>
                        <div class="offer-content">
                            <h3 class="offer-title">${offer.title}</h3>
                            <p class="offer-description">${offer.description}</p>
                            <div class="offer-price">
                                <span class="old-price">${offer.oldPrice} د.ل</span>
                                <span class="new-price">${offer.newPrice} د.ل</span>
                            </div>
                            <button class="btn offer-btn" onclick="addOfferToCart(${offer.id})">أضف إلى السلة</button>
                        </div>
                        <div class="offer-image">
                            <img src="${offer.image}" alt="${offer.title}">
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // إعداد زر الرجوع
    container.querySelector('.back-btn').addEventListener('click', function() {
        showPage('homePage');
    });
}

function loadAboutPage() {
    const container = document.getElementById('aboutPage');
    if (!container) return;
    
    container.innerHTML = `
        <header class="about-header">
            <h2>عن ORA CAFÉ</h2>
            <p>${cafeData.slogan}</p>
        </header>
        
        <div class="page-content">
            <div class="about-content">
                <h3>قصتنا</h3>
                <p>${cafeData.description}</p>
                <p>نحن نؤمن بأن كل فنجان قهوة يحمل قصة، ونسعى لنقدم لكم أفضل القصص من خلال منتجاتنا المختارة بعناية.</p>
                
                <h3>ساعات العمل</h3>
                <p>${cafeData.openingHours}</p>
                
                <h3>رؤيتنا</h3>
                <p>أن نكون وجهتكم الأولى للقهوة العربية الأصيلة في ليبيا، مع تقديم تجربة فريدة تجمع بين الأصالة والجودة العالية.</p>
            </div>
        </div>
    `;
}

function loadContactPage() {
    const container = document.getElementById('contactPage');
    if (!container) return;
    
    container.innerHTML = `
        <header class="page-header">
            <button class="back-btn">
                <i class="fas fa-arrow-right"></i>
            </button>
            <h2>اتصل بنا</h2>
        </header>
        
        <div class="page-content">
            <div class="contact-info">
                <div class="contact-item">
                    <div class="contact-icon">
                        <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <div class="contact-details">
                        <h4>العنوان</h4>
                        <p>${cafeData.address}</p>
                    </div>
                </div>
                
                <div class="contact-item">
                    <div class="contact-icon">
                        <i class="fas fa-phone"></i>
                    </div>
                    <div class="contact-details">
                        <h4>الهاتف</h4>
                        <p>${cafeData.phone}</p>
                    </div>
                </div>
                
                <div class="contact-item">
                    <div class="contact-icon">
                        <i class="fas fa-envelope"></i>
                    </div>
                    <div class="contact-details">
                        <h4>البريد الإلكتروني</h4>
                        <p>${cafeData.email}</p>
                    </div>
                </div>
            </div>
            
            <div class="map-container">
                <i class="fas fa-map-marked-alt"></i>
                <span>خريطة الموقع</span>
            </div>
            
            <div class="social-links">
                <a href="${cafeData.social.facebook}" class="social-link" target="_blank">
                    <i class="fab fa-facebook-f"></i>
                </a>
                <a href="${cafeData.social.instagram}" class="social-link" target="_blank">
                    <i class="fab fa-instagram"></i>
                </a>
                <a href="${cafeData.social.twitter}" class="social-link" target="_blank">
                    <i class="fab fa-twitter"></i>
                </a>
            </div>
        </div>
    `;
    
    // إعداد زر الرجوع
    container.querySelector('.back-btn').addEventListener('click', function() {
        showPage('homePage');
    });
}

function loadSettingsPage() {
    const container = document.getElementById('settingsPage');
    if (!container) return;
    
    container.innerHTML = `
        <header class="page-header">
            <button class="back-btn">
                <i class="fas fa-arrow-right"></i>
            </button>
            <h2>الإعدادات</h2>
        </header>
        
        <div class="page-content">
            <div class="settings-list">
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-icon">
                            <i class="fas fa-bell"></i>
                        </div>
                        <div class="setting-text">
                            <h4>الإشعارات</h4>
                            <p>إدارة إشعارات التطبيق</p>
                        </div>
                    </div>
                    <div class="setting-action">
                        <div class="switch">
                            <input type="checkbox" id="notifications" checked>
                            <label for="notifications"></label>
                        </div>
                    </div>
                </div>
                
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-icon">
                            <i class="fas fa-moon"></i>
                        </div>
                        <div class="setting-text">
                            <h4>الوضع الداكن</h4>
                            <p>تفعيل الوضع الداكن</p>
                        </div>
                    </div>
                    <div class="setting-action">
                        <div class="switch">
                            <input type="checkbox" id="darkMode">
                            <label for="darkMode"></label>
                        </div>
                    </div>
                </div>
                
                <div class="setting-item" onclick="showPage('aboutPage')">
                    <div class="setting-info">
                        <div class="setting-icon">
                            <i class="fas fa-info-circle"></i>
                        </div>
                        <div class="setting-text">
                            <h4>عن التطبيق</h4>
                            <p>الإصدار 1.0.0</p>
                        </div>
                    </div>
                    <div class="setting-action">
                        <i class="fas fa-arrow-left"></i>
                    </div>
                </div>
                
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-icon">
                            <i class="fas fa-question-circle"></i>
                        </div>
                        <div class="setting-text">
                            <h4>المساعدة والدعم</h4>
                            <p>الأسئلة الشائعة والدعم الفني</p>
                        </div>
                    </div>
                    <div class="setting-action">
                        <i class="fas fa-arrow-left"></i>
                    </div>
                </div>
                
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-icon">
                            <i class="fas fa-shield-alt"></i>
                        </div>
                        <div class="setting-text">
                            <h4>الخصوصية والأمان</h4>
                            <p>إعدادات الخصوصية</p>
                        </div>
                    </div>
                    <div class="setting-action">
                        <i class="fas fa-arrow-left"></i>
                    </div>
                </div>
            </div>
            
            <div style="margin-top: 30px;">
                <button class="btn secondary-btn" style="width: 100%;" onclick="clearAppData()">
                    <i class="fas fa-trash"></i>
                    مسح بيانات التطبيق
                </button>
            </div>
        </div>
    `;
    
    // إعداد زر الرجوع
    container.querySelector('.back-btn').addEventListener('click', function() {
        showPage('homePage');
    });
}

// وظائف المنتجات
function getProductById(id) {
    for (const category of productsData.categories) {
        const product = category.products.find(p => p.id === id);
        if (product) return product;
    }
    return null;
}

function toggleFavorite(productId, event) {
    if (event) event.stopPropagation();
    
    const product = getProductById(productId);
    if (!product) return;
    
    product.isFavorite = !product.isFavorite;
    
    // تحديث قائمة المفضلة في حالة التطبيق
    if (product.isFavorite) {
        if (!appState.favorites.includes(productId)) {
            appState.favorites.push(productId);
        }
    } else {
        appState.favorites = appState.favorites.filter(id => id !== productId);
    }
    
    // حفظ في localStorage
    localStorage.setItem('favorites', JSON.stringify(appState.favorites));
    
    // تحديث العداد
    updateFavoritesCount();
    
    // تحديث الزر في الواجهة
    if (event) {
        const btn = event.currentTarget;
        btn.classList.toggle('active');
        const icon = btn.querySelector('i');
        icon.classList.toggle('far');
        icon.classList.toggle('fas');
    }
    
    // إعادة تحميل الصفحة الحالية إذا لزم الأمر
    if (appState.currentPage === 'favoritesPage') {
        loadFavoritesPage();
    }
    
    // عرض رسالة تأكيد
    showToast(product.isFavorite ? 'تمت الإضافة إلى المفضلة' : 'تمت الإزالة من المفضلة', 'success');
}

function addToCart(productId, event) {
    if (event) event.stopPropagation();
    
    const product = getProductById(productId);
    if (!product) return;
    
    // التحقق مما إذا كان المنتج موجوداً بالفعل في السلة
    const existingItem = appState.cart.find(item => item.productId === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        appState.cart.push({
            productId: productId,
            quantity: 1
        });
    }
    
    // حفظ في localStorage
    localStorage.setItem('cart', JSON.stringify(appState.cart));
    
    // تحديث العداد
    updateCartCount();
    
    // عرض رسالة تأكيد
    showToast('تمت الإضافة إلى السلة', 'success');
    
    // تحديث الصوت أو الاهتزاز (للتطبيقات المحمولة)
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
}

function removeFromCart(productId) {
    appState.cart = appState.cart.filter(item => item.productId !== productId);
    
    // حفظ في localStorage
    localStorage.setItem('cart', JSON.stringify(appState.cart));
    
    // تحديث العداد
    updateCartCount();
    
    // إعادة تحميل صفحة السلة
    if (appState.currentPage === 'cartPage') {
        loadCartPage();
    }
    
    // عرض رسالة تأكيد
    showToast('تمت الإزالة من السلة', 'success');
}

function updateCartQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }
    
    const item = appState.cart.find(item => item.productId === productId);
    if (item) {
        item.quantity = newQuantity;
        
        // حفظ في localStorage
        localStorage.setItem('cart', JSON.stringify(appState.cart));
        
        // إعادة تحميل صفحة السلة
        if (appState.currentPage === 'cartPage') {
            loadCartPage();
        }
    }
}

function clearCart() {
    appState.cart = [];
    localStorage.removeItem('cart');
    updateCartCount();
    loadCartPage();
    showToast('تم إفراغ السلة', 'success');
}

function checkout() {
    if (appState.cart.length === 0) {
        showToast('السلة فارغة', 'error');
        return;
    }
    
    // عرض نموذج التأكيد
    showConfirmModal('إتمام الطلب', 'هل تريد إتمام عملية الشراء؟', function() {
        // هنا يمكن إضافة منطق إتمام الشراء
        const orderId = 'ORD-' + Date.now().toString().slice(-6);
        
        // حفظ الطلب في السجل
        const order = {
            id: orderId,
            date: new Date().toISOString().split('T')[0],
            status: 'pending',
            items: appState.cart.map(item => {
                const product = getProductById(item.productId);
                return {
                    productId: item.productId,
                    name: product.name,
                    quantity: item.quantity,
                    price: product.price
                };
            }),
            total: appState.cart.reduce((total, item) => {
                const product = getProductById(item.productId);
                return total + (product.price * item.quantity);
            }, 0)
        };
        
        // إضافة الطلب إلى القائمة
        ordersData.unshift(order);
        
        // إفراغ السلة
        clearCart();
        
        // عرض رسالة نجاح
        showToast(`تم تقديم طلبك بنجاح (${orderId})`, 'success');
        
        // الانتقال إلى صفحة الطلبات
        setTimeout(() => showPage('ordersPage'), 1500);
    });
}

function addOfferToCart(offerId) {
    const offer = productsData.offers.find(o => o.id === offerId);
    if (!offer) return;
    
    // إضافة منتجات العرض إلى السلة
    offer.products.forEach(productId => {
        const product = getProductById(productId);
        if (product) {
            const existingItem = appState.cart.find(item => item.productId === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                appState.cart.push({
                    productId: productId,
                    quantity: 1
                });
            }
        }
    });
    
    // حفظ في localStorage
    localStorage.setItem('cart', JSON.stringify(appState.cart));
    
    // تحديث العداد
    updateCartCount();
    
    // عرض رسالة تأكيد
    showToast('تمت إضافة العرض إلى السلة', 'success');
}

// وظائف العداد
function updateCartCount() {
    const totalItems = appState.cart.reduce((total, item) => total + item.quantity, 0);
    
    // تحديث جميع العدادات
    document.querySelectorAll('.cart-count, .cart-sidebar-count, .nav-badge').forEach(element => {
        if (element.classList.contains('cart-count') || 
            element.classList.contains('cart-sidebar-count') || 
            element.classList.contains('nav-badge')) {
            element.textContent = totalItems;
            element.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    });
}

function updateFavoritesCount() {
    const totalFavorites = appState.favorites.length;
    
    // تحديث عداد المفضلة في القائمة الجانبية
    const favoritesCountElement = document.querySelector('.favorites-count');
    if (favoritesCountElement) {
        favoritesCountElement.textContent = totalFavorites;
        favoritesCountElement.style.display = totalFavorites > 0 ? 'inline-block' : 'none';
    }
}

// المودالات
function setupModalListeners() {
    // إغلاق مودال المنتج
    document.getElementById('closeProductModal')?.addEventListener('click', function() {
        hideProductModal();
    });
    
    // إغلاق عند النقر خارج المحتوى
    document.getElementById('productModal')?.addEventListener('click', function(e) {
        if (e.target === this) {
            hideProductModal();
        }
    });
    
    // مودال التأكيد
    document.getElementById('confirmModalCancel')?.addEventListener('click', function() {
        hideConfirmModal();
    });
    
    document.getElementById('confirmModal')?.addEventListener('click', function(e) {
        if (e.target === this) {
            hideConfirmModal();
        }
    });
}

function showProductModal(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    appState.selectedProduct = product;
    
    // بناء محتوى المودال
    const modalBody = document.getElementById('productModalBody');
    modalBody.innerHTML = `
        <div class="product-modal-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        
        <h2 class="product-modal-name">${product.name}</h2>
        <p class="product-modal-description">${product.description}</p>
        
        <div class="product-modal-price">
            ${product.oldPrice ? `<span style="font-size: 18px; color: #999; text-decoration: line-through; margin-left: 10px;">${product.oldPrice} د.ل</span>` : ''}
            ${product.price} د.ل
        </div>
        
        ${product.options ? `
            <div class="product-modal-options">
                ${Object.entries(product.options).map(([key, options]) => `
                    <div class="option-group">
                        <h4 class="option-title">${getOptionTitle(key)}</h4>
                        <div class="option-items">
                            ${options.map((option, index) => `
                                <div class="option-item ${index === 0 ? 'active' : ''}" data-option="${key}" data-value="${option.name}" data-price="${option.price}">
                                    ${option.name} ${option.price > 0 ? `(+${option.price} د.ل)` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        ` : ''}
        
        <div class="quantity-selector">
            <button class="quantity-btn" onclick="updateProductQuantity(-1)">
                <i class="fas fa-minus"></i>
            </button>
            <span class="quantity-value" id="productQuantity">1</span>
            <button class="quantity-btn" onclick="updateProductQuantity(1)">
                <i class="fas fa-plus"></i>
            </button>
        </div>
        
        <div class="modal-footer">
            <button class="btn secondary-btn" onclick="hideProductModal()">إلغاء</button>
            <button class="btn primary-btn" onclick="addSelectedProductToCart()">
                <i class="fas fa-cart-plus"></i>
                أضف إلى السلة
            </button>
        </div>
    `;
    
    // إضافة معالجات الخيارات
    modalBody.querySelectorAll('.option-item').forEach(item => {
        item.addEventListener('click', function() {
            const group = this.getAttribute('data-option');
            const items = modalBody.querySelectorAll(`[data-option="${group}"]`);
            items.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // إظهار المودال
    document.getElementById('productModal').classList.add('active');
}

function getOptionTitle(key) {
    const titles = {
        'size': 'الحجم',
        'sugar': 'كمية السكر',
        'type': 'النوع',
        'topping': 'التزيين',
        'flavor': 'النكهة'
    };
    return titles[key] || key;
}

function hideProductModal() {
    document.getElementById('productModal').classList.remove('active');
    appState.selectedProduct = null;
}

let productQuantity = 1;

function updateProductQuantity(change) {
    productQuantity += change;
    if (productQuantity < 1) productQuantity = 1;
    if (productQuantity > 10) productQuantity = 10;
    
    document.getElementById('productQuantity').textContent = productQuantity;
}

function addSelectedProductToCart() {
    if (!appState.selectedProduct) return;
    
    const quantity = productQuantity;
    
    // التحقق مما إذا كان المنتج موجوداً بالفعل في السلة
    const existingItem = appState.cart.find(item => item.productId === appState.selectedProduct.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        appState.cart.push({
            productId: appState.selectedProduct.id,
            quantity: quantity
        });
    }
    
    // حفظ في localStorage
    localStorage.setItem('cart', JSON.stringify(appState.cart));
    
    // تحديث العداد
    updateCartCount();
    
    // إخفاء المودال
    hideProductModal();
    
    // إعادة تعيين الكمية
    productQuantity = 1;
    
    // عرض رسالة تأكيد
    showToast('تمت الإضافة إلى السلة', 'success');
}

function showConfirmModal(title, message, onConfirm) {
    document.getElementById('confirmModalTitle').textContent = title;
    document.getElementById('confirmModalMessage').textContent = message;
    
    const confirmBtn = document.getElementById('confirmModalConfirm');
    const oldHandler = confirmBtn.onclick;
    confirmBtn.onclick = function() {
        if (onConfirm) onConfirm();
        hideConfirmModal();
    };
    
    document.getElementById('confirmModal').classList.add('active');
}

function hideConfirmModal() {
    document.getElementById('confirmModal').classList.remove('active');
}

// الرسائل المنبثقة
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas fa-${getToastIcon(type)}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${getToastTitle(type)}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    container.appendChild(toast);
    
    // إزالة الرسالة تلقائياً بعد 5 ثوانٍ
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 5000);
}

function getToastIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getToastTitle(type) {
    const titles = {
        'success': 'نجاح',
        'error': 'خطأ',
        'warning': 'تحذير',
        'info': 'معلومة'
    };
    return titles[type] || 'معلومة';
}

// السلايدر
function setupSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    
    if (!slides.length) return;
    
    let currentSlide = 0;
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    // تبديل تلقائي كل 5 ثوانٍ
    setInterval(() => showSlide(currentSlide + 1), 5000);
}

// التصنيفات
function setupCategories() {
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            appState.selectedCategory = category;
            showPage('menuPage');
        });
    });
}

// وظائف إضافية
function clearAppData() {
    showConfirmModal('مسح بيانات التطبيق', 'هل أنت متأكد من مسح جميع بيانات التطبيق؟ هذه العملية لا يمكن التراجع عنها.', function() {
        localStorage.clear();
        location.reload();
    });
}

// جعل الدوال متاحة عالمياً
window.toggleFavorite = toggleFavorite;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.clearCart = clearCart;
window.checkout = checkout;
window.addOfferToCart = addOfferToCart;
window.showPage = showPage;
window.updateProductQuantity = updateProductQuantity;
window.addSelectedProductToCart = addSelectedProductToCart;
window.clearAppData = clearAppData;