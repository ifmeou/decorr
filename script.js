// База данных товаров
const products = [
    { 
        id: 1,
        name: 'Декоративная фигурка Собачка', 
        price: 999, 
        image: 'img/собачка.jpg', 
        category: 'figurines',
        description: 'Милая декоративная фигурка собачки станет прекрасным украшением интерьера. Выполнена из качественной керамики, расписана вручную.',
        characteristics: 'Материал: керамика, Высота: 12 см, Цвет: коричневый'
    },
    { 
        id: 2,
        name: 'Декоративная фигурка Кролик', 
        price: 699, 
        image: 'img/кролик.jpg', 
        category: 'figurines',
        description: 'Очаровательный кролик добавит уюта вашему дому. Отличный подарок для близких.',
        characteristics: 'Материал: полистоун, Высота: 10 см, Цвет: белый'
    },
    { 
        id: 3,
        name: 'Декоративная фигурка Лошадка', 
        price: 599, 
        image: 'img/лошадка.jpg', 
        category: 'figurines',
        description: 'Изящная фигурка лошадки подойдет для создания композиций на полке или в витрине.',
        characteristics: 'Материал: смола, Высота: 8 см, Цвет: бежевый'
    },
    { 
        id: 4,
        name: 'Декоративная фигурка Коты', 
        price: 899, 
        image: 'img/Коты.jpg', 
        category: 'figurines',
        description: 'Композиция из двух котов создаст атмосферу уюта и тепла в вашем доме.',
        characteristics: 'Материал: гипс, Высота: 9 см, Цвет: серый'
    },
    { 
        id: 5,
        name: 'Декоративная фигурка Слон', 
        price: 799, 
        image: 'img/слон.jpg', 
        category: 'figurines',
        description: 'Фигурка слона символизирует мудрость и удачу. Прекрасный подарок для дома.',
        characteristics: 'Материал: керамика, Высота: 7 см, Цвет: синий'
    },
    { 
        id: 6,
        name: 'Декоративная фигурка', 
        price: 499, 
        image: 'img/фигурка.jpg', 
        category: 'figurines',
        description: 'Универсальная декоративная фигурка для интерьера. Подойдет для любого стиля.',
        characteristics: 'Материал: полимерная глина, Высота: 6 см, Цвет: белый'
    },
    { 
        id: 7,
        name: 'Фоторамка Семья', 
        price: 929, 
        image: 'img/фоторамка Семья.jpg', 
        category: 'frames',
        description: 'Фоторамка для семейных фотографий. Вмещает фото 15x20 см.',
        characteristics: 'Материал: дерево, Размер: 20x25 см, Цвет: дуб'
    },
    { 
        id: 8,
        name: 'Фоторамка Цветы', 
        price: 899, 
        image: 'img/Фоторамка Цветы.jpg', 
        category: 'frames',
        description: 'Романтичная фоторамка с цветочным дизайном. Подойдет для фото 10x15 см.',
        characteristics: 'Материал: пластик, Размер: 15x20 см, Цвет: розовый'
    },
    { 
        id: 9,
        name: 'Фоторамка Экзотика', 
        price: 1299, 
        image: 'img/Фоторамка Экзотика.jpg', 
        category: 'frames',
        description: 'Оригинальная фоторамка в стиле экзотика. Вмещает фото 15x20 см.',
        characteristics: 'Материал: бамбук, Размер: 25x30 см, Цвет: натуральный'
    }
];

// База данных отзывов
let reviews = JSON.parse(localStorage.getItem('reviews') || '[]');

// Сохранение отзывов
const saveReviews = () => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
};

// Получение отзывов для товара
const getProductReviews = (productId) => {
    return reviews.filter(r => r.productId === productId);
};

// Добавление отзыва
const addReview = (productId, name, rating, text) => {
    const newReview = {
        id: Date.now(),
        productId: productId,
        name: name,
        rating: parseInt(rating),
        text: text,
        date: new Date().toLocaleDateString('ru-RU')
    };
    reviews.push(newReview);
    saveReviews();
    return newReview;
};

// Корзина
const getCart = () => JSON.parse(localStorage.getItem('cart') || '[]');

const saveCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
};

const updateCartCount = () => {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = getCart().reduce((total, item) => total + item.quantity, 0);
    }
};

const addToCart = (id, name, price, image) => {
    const cart = getCart();
    const existing = cart.find(i => i.id === id);
    
    if (existing) existing.quantity++;
    else cart.push({ id, name, price: +price, image, quantity: 1 });
    
    saveCart(cart);
    showMessage(`"${name}" добавлен в корзину!`);
    if (location.pathname.includes('cart.html')) displayCart();
};

// Удаление товара из корзины
const removeFromCart = (index) => {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    displayCart();
    showMessage('Товар удален из корзины');
};

// Изменение количества товара
const updateQuantity = (index, change) => {
    const cart = getCart();
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    saveCart(cart);
    displayCart();
};

// Очистка корзины
const clearCart = () => {
    if (getCart().length === 0) return;
    if (!confirm('Очистить всю корзину?')) return;
    
    localStorage.removeItem('cart');
    updateCartCount();
    displayCart();
    showMessage('Корзина очищена');
};

// Отображение корзины
const displayCart = () => {
    const list = document.getElementById('cart-items-list');
    const totalEl = document.getElementById('total-price');
    const itemsTotalEl = document.getElementById('items-total');
    const deliveryEl = document.getElementById('delivery-price');
    
    if (!list) return;
    
    const cart = getCart();
    const itemsTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const delivery = document.querySelector('input[name="delivery"]:checked')?.value === 'courier' ? 300 : 0;
    const total = itemsTotal + delivery;
    
    if (cart.length === 0) {
        list.innerHTML = `<div class="empty-cart">
            <i class="fas fa-shopping-cart"></i>
            <p>Ваша корзина пуста</p>
            <a href="catalog.html" class="btn-primary">Перейти в каталог</a>
        </div>`;
        if (itemsTotalEl) itemsTotalEl.textContent = '0 Р';
        if (deliveryEl) deliveryEl.textContent = '0 Р';
        if (totalEl) totalEl.textContent = '0 Р';
        return;
    }
    
    list.innerHTML = cart.map((item, index) => {
        const itemTotal = item.price * item.quantity;
        return `<div class="cart-item">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIGltYWdlPC90ZXh0Pjwvc3ZnPg=='">
            </div>
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p class="cart-item-price">${item.price} Р × ${item.quantity}</p>
            </div>
            <div class="cart-item-controls">
                <button onclick="updateQuantity(${index}, -1)" class="quantity-btn">-</button>
                <span class="quantity">${item.quantity}</span>
                <button onclick="updateQuantity(${index}, 1)" class="quantity-btn">+</button>
                <button onclick="removeFromCart(${index})" class="remove-btn" title="Удалить">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="cart-item-total">${itemTotal} Р</div>
        </div>`;
    }).join('');
    
    if (itemsTotalEl) itemsTotalEl.textContent = `${itemsTotal} Р`;
    if (deliveryEl) deliveryEl.textContent = delivery === 0 ? 'Бесплатно' : `${delivery} Р`;
    if (totalEl) totalEl.textContent = `${total} Р`;
};

// Обновление цены доставки
const updateDeliveryPrice = () => {
    displayCart();
};

// Показ сообщений
const showMessage = (text, type = 'success') => {
    const msg = document.createElement('div');
    msg.textContent = text;
    msg.style.cssText = `
        position:fixed;top:100px;right:20px;background:${type === 'error' ? '#e74c3c' : '#27ae60'};
        color:white;padding:15px 20px;border-radius:8px;z-index:1000;
        box-shadow:0 4px 12px rgba(0,0,0,0.15);animation:slideInRight 0.3s ease;
    `;
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 2300);
};

// Инициализация оформления заказа
const initCheckout = () => {
    const form = document.getElementById('checkout-form');
    if (!form) return;

    document.querySelectorAll('input[name="delivery"]').forEach(radio => {
        radio.addEventListener('change', updateDeliveryPrice);
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const cart = getCart();
        if (cart.length === 0) return showMessage('Корзина пуста!', 'error');

        const formData = new FormData(this);
        const delivery = document.querySelector('input[name="delivery"]:checked')?.value;
        
        const orderData = {
            customer: {
                name: formData.get('name'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                address: formData.get('address')
            },
            items: cart,
            delivery: delivery,
            total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 
                   (delivery === 'courier' ? 300 : 0)
        };

        console.log('Заказ оформлен:', orderData);
        
        showMessage('Заказ успешно оформлен!');
        localStorage.removeItem('cart');
        updateCartCount();
        setTimeout(() => location.href = 'index.html', 1500);
    });
};

// Отображение популярных товаров на главной
const loadPopularProducts = () => {
    const container = document.querySelector('#popular-products');
    if (!container) return;
    
    const popular = products.slice(0, 3);
    
    container.innerHTML = popular.map(product => `
        <div class="product">
            <a href="product.html?id=${product.id}" class="product-link">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIGltYWdlPC90ZXh0Pjwvc3ZnPg=='">
                <h3>${product.name}</h3>
                <p class="price">${product.price} Р</p>
            </a>
            <button onclick="addToCart(${product.id}, '${product.name}', ${product.price}, '${product.image}')" class="add-to-cart-btn">Добавить в корзину</button>
        </div>
    `).join('');
};

// Отображение каталога с фильтрацией
const filterProducts = () => {
    const container = document.getElementById('products-container');
    if (!container) return;
    
    const category = document.getElementById('category')?.value;
    const sort = document.getElementById('sort')?.value;
    
    let filtered = [...products];
    
    if (category && category !== 'all') {
        filtered = filtered.filter(p => p.category === category);
    }
    
    if (sort) {
        switch(sort) {
            case 'price-asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }
    }
    
    container.innerHTML = filtered.map(product => `
        <div class="product">
            <a href="product.html?id=${product.id}" class="product-link">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIGltYWdlPC90ZXh0Pjwvc3ZnPg=='">
                <h3>${product.name}</h3>
                <p class="price">${product.price} Р</p>
            </a>
            <button onclick="addToCart(${product.id}, '${product.name}', ${product.price}, '${product.image}')" class="add-to-cart-btn">Добавить в корзину</button>
        </div>
    `).join('');
};

// Загрузка карточки товара
const loadProductCard = () => {
    const container = document.getElementById('product-card-container');
    if (!container) return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        container.innerHTML = '<p>Товар не найден</p>';
        return;
    }
    
    document.getElementById('product-category').textContent = 
        product.category === 'figurines' ? 'Декоративные фигурки' : 'Фоторамки';
    
    container.innerHTML = `
        <div class="product-card">
            <div class="product-card-image">
                <img src="${product.image}" alt="${product.name}" style="max-width: 100%; max-height: 250px; width: auto; height: auto; object-fit: contain;">
            </div>
            <div class="product-card-info">
                <h2>${product.name}</h2>
                <p class="product-card-price">${product.price} Р</p>
                <p class="product-card-description">${product.description}</p>
                <p class="product-card-characteristics"><strong>Характеристики:</strong> ${product.characteristics}</p>
                <button onclick="addToCart(${product.id}, '${product.name}', ${product.price}, '${product.image}')" class="btn-add-to-cart">Добавить в корзину</button>
            </div>
        </div>
    `;
    
    // Загрузка отзывов
    loadReviews(productId);
    
    // Загрузка похожих товаров
    loadRelatedProducts(product);
};

// Загрузка отзывов
const loadReviews = (productId) => {
    const container = document.getElementById('reviews-container');
    if (!container) return;
    
    const productReviews = getProductReviews(productId);
    
    if (productReviews.length === 0) {
        container.innerHTML = '<p class="no-reviews">У этого товара пока нет отзывов. Будьте первым!</p>';
        return;
    }
    
    container.innerHTML = productReviews.map(review => `
        <div class="review-item">
            <div class="review-header">
                <span class="review-name">${review.name}</span>
                <span class="review-date">${review.date}</span>
            </div>
            <div class="review-rating">
                ${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}
            </div>
            <p class="review-text">${review.text}</p>
        </div>
    `).join('');
};

// Загрузка похожих товаров
const loadRelatedProducts = (currentProduct) => {
    const container = document.getElementById('related-products-container');
    if (!container) return;
    
    const related = products
        .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
        .slice(0, 3);
    
    container.innerHTML = related.map(product => `
        <div class="product">
            <a href="product.html?id=${product.id}" class="product-link">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">${product.price} Р</p>
            </a>
            <button onclick="addToCart(${product.id}, '${product.name}', ${product.price}, '${product.image}')" class="add-to-cart-btn">Добавить в корзину</button>
        </div>
    `).join('');
};

// Инициализация страницы
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    
    // Загрузка популярных товаров на главной
    loadPopularProducts();
    
    // Загрузка каталога
    if (location.pathname.includes('catalog.html')) {
        filterProducts();
    }
    
    // Загрузка карточки товара
    if (location.pathname.includes('product.html')) {
        loadProductCard();
        
        // Обработка формы отзыва
        const reviewForm = document.getElementById('review-form');
        if (reviewForm) {
            reviewForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const urlParams = new URLSearchParams(window.location.search);
                const productId = parseInt(urlParams.get('id'));
                
                const name = document.getElementById('review-name').value;
                const rating = document.getElementById('review-rating').value;
                const text = document.getElementById('review-text').value;
                
                addReview(productId, name, rating, text);
                loadReviews(productId);
                
                reviewForm.reset();
                showMessage('Спасибо за ваш отзыв!');
            });
        }
    }
    
    // Корзина
    if (location.pathname.includes('cart.html')) {
        displayCart();
        initCheckout();
    }
    
    // Инициализация авторизации
    window.authManager = new AuthManager();
});

// Класс для управления авторизацией
class AuthManager {
    constructor() {
        this.user = JSON.parse(localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser') || 'null');
        this.init();
    }

    // Выход из профиля
logout() {
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    this.user = null;
    this.updateUI();
    showMessage('Вы вышли из аккаунта');
}

    init() {
        this.updateUI();
        
        const authBtn = document.getElementById('auth-btn');
        if (authBtn) {
            authBtn.addEventListener('click', () => this.openModal());
        }
        
        const closeBtn = document.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }
        
        const modal = document.getElementById('auth-modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === e.currentTarget) this.closeModal();
            });
        }
        
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => this.switchTab(btn.dataset.tab));
        });
        
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.login(e));
        }
        
        const registerForm = document.getElementById('register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.register(e));
        }
    }

    openModal() {
        if (this.user) {
            showMessage(`Добро пожаловать, ${this.user.name}!`);
            return;
        }
        const modal = document.getElementById('auth-modal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal() {
        const modal = document.getElementById('auth-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    switchTab(tab) {
        document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
        
        document.querySelectorAll('.auth-form').forEach(el => el.classList.remove('active'));
        document.getElementById(`${tab}-form`).classList.add('active');
    }

    login(e) {
        e.preventDefault();
        const form = new FormData(e.target);
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === form.get('email') && u.password === form.get('password'));
        
        if (!user) {
            showMessage('Неверный email или пароль', 'error');
            return;
        }
        
        this.user = { ...user };
        delete this.user.password;
        
        if (form.get('remember')) {
            localStorage.setItem('currentUser', JSON.stringify(this.user));
        } else {
            sessionStorage.setItem('currentUser', JSON.stringify(this.user));
        }
        
        showMessage('Успешный вход!');
        this.closeModal();
        this.updateUI();
    }

    register(e) {
        e.preventDefault();
        const form = new FormData(e.target);
        
        const password = form.get('password');
        const confirmPassword = form.get('confirmPassword');
        
        if (password !== confirmPassword) {
            showMessage('Пароли не совпадают!', 'error');
            return;
        }
        
        if (password.length < 6) {
            showMessage('Пароль должен содержать минимум 6 символов', 'error');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        if (users.find(u => u.email === form.get('email'))) {
            showMessage('Пользователь с таким email уже существует', 'error');
            return;
        }

        const newUser = {
            id: Date.now(),
            name: form.get('name'),
            email: form.get('email'),
            password: password,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        showMessage('Регистрация успешна!');
        this.switchTab('login');
    }

updateUI() {
    const authBtn = document.getElementById('auth-btn');
    if (!authBtn) return;
    
    if (this.user) {
        authBtn.innerHTML = `
            <i class="fas fa-user"></i>
            <span>${this.user.name}</span>
            <i class="fas fa-chevron-down" style="font-size: 0.8rem; margin-left: 5px;"></i>
        `;
        
        // Добавляем выпадающее меню при клике
        authBtn.onclick = (e) => {
            e.stopPropagation();
            this.showUserMenu();
        };
    } else {
        authBtn.innerHTML = `<i class="fas fa-user"></i> Войти`;
        authBtn.onclick = () => this.openModal();
    }
}

// Показать меню пользователя
showUserMenu() {
    // Удаляем существующее меню
    const oldMenu = document.querySelector('.user-menu');
    if (oldMenu) oldMenu.remove();
    
    // Создаем меню
    const menu = document.createElement('div');
    menu.className = 'user-menu';
    menu.innerHTML = `
        <div class="user-menu-item" onclick="window.authManager.openProfile()">
            <i class="fas fa-user"></i> Мой профиль
        </div>
        <div class="user-menu-item" onclick="window.authManager.viewOrders()">
            <i class="fas fa-shopping-bag"></i> Мои заказы
        </div>
        <div class="user-menu-divider"></div>
        <div class="user-menu-item logout" onclick="window.authManager.logout()">
            <i class="fas fa-sign-out-alt"></i> Выйти
        </div>
    `;
    
    // Позиционируем меню
    const authBtn = document.getElementById('auth-btn');
    const rect = authBtn.getBoundingClientRect();
    
    menu.style.cssText = `
        position: absolute;
        top: ${rect.bottom + window.scrollY + 5}px;
        right: ${rect.right - 150}px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.15);
        width: 200px;
        z-index: 1001;
        overflow: hidden;
    `;
    
    document.body.appendChild(menu);
    
    // Закрываем меню при клике вне его
    setTimeout(() => {
        document.addEventListener('click', function closeMenu(e) {
            if (!menu.contains(e.target) && e.target !== authBtn) {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            }
        });
    }, 100);
}

// Заглушки для методов профиля и заказов
openProfile() {
    showMessage('Раздел в разработке');
    this.closeMenu();
}

viewOrders() {
    showMessage('Раздел в разработке');
    this.closeMenu();
}

closeMenu() {
    const menu = document.querySelector('.user-menu');
    if (menu) menu.remove();
}
}
