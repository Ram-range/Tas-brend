// ==================== DATA PRODUK (15+ PRODUK TAS MEWAH) ====================
const products = [
    { id: 1, name: "Hermès Birkin 30", brand: "Hermès", price: 325000000, desc: "Tas tangan mewah ikonik dari Hermès, kulit Togo premium" },
    { id: 2, name: "Chanel Classic Flap", brand: "Chanel", price: 185000000, desc: "Classic Flap bag dengan quilted leather" },
    { id: 3, name: "Louis Vuitton Neverfull", brand: "Louis Vuitton", price: 28500000, desc: "Tas tote spacious dengan canvas monogram" },
    { id: 4, name: "Gucci Dionysus", brand: "Gucci", price: 32500000, desc: "Tas dengan closure tiger head signature" },
    { id: 5, name: "Prada Saffiano", brand: "Prada", price: 22800000, desc: "Tas kulit saffiano elegan" },
    { id: 6, name: "Dior Lady Dior", brand: "Dior", price: 125000000, desc: "Tas ikonik dengan quilting cannage" },
    { id: 7, name: "YSL Cassandra", brand: "Saint Laurent", price: 32500000, desc: "Tas flap dengan logo YSL besar" },
    { id: 8, name: "Fendi Baguette", brand: "Fendi", price: 42500000, desc: "Tas Baguette klasik dengan FF logo" },
    { id: 9, name: "Celine Triomphe", brand: "Celine", price: 48500000, desc: "Tas dengan logo Triomphe iconic" },
    { id: 10, name: "Bottega Veneta Cassette", brand: "Bottega Veneta", price: 52000000, desc: "Tas anyaman leather signature" },
    { id: 11, name: "Loewe Puzzle", brand: "Loewe", price: 39800000, desc: "Tas dengan desain puzzle unik" },
    { id: 12, name: "Goyard St. Louis", brand: "Goyard", price: 28500000, desc: "Tas tote mewah dengan motif Chevron" },
    { id: 13, name: "Miu Miu Wander", brand: "Miu Miu", price: 22900000, desc: "Tas dengan desain playful elegant" },
    { id: 14, name: "Balenciaga City", brand: "Balenciaga", price: 27500000, desc: "Tas motor edgy iconic" },
    { id: 15, name: "Givenchy Antigona", brand: "Givenchy", price: 35800000, desc: "Tas structured dengan silhouette tegas" }
];

// ==================== GLOBAL STATE ====================
let currentUser = null;
let cart = [];
let users = JSON.parse(localStorage.getItem('users')) || [];
let adminChart = null;

// Cek localStorage untuk user yang login
const savedUser = localStorage.getItem('currentUser');
if (savedUser) {
    currentUser = JSON.parse(savedUser);
    document.getElementById('userNameDisplay').innerText = currentUser.name || currentUser.email;
}

// Load cart dari localStorage
const savedCart = localStorage.getItem('cart');
if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartUI();
}

// ==================== RENDER PRODUK ====================
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-img"><i class="fas fa-bag-shopping"></i></div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-brand">${product.brand}</p>
                <p class="product-desc">${product.desc.substring(0, 50)}...</p>
                <p class="product-price">Rp ${product.price.toLocaleString('id-ID')}</p>
                <button class="add-to-cart" data-id="${product.id}"><i class="fas fa-cart-plus"></i> Tambah ke Keranjang</button>
            </div>
        </div>
    `).join('');
    
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            addToCart(id);
        });
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    showNotification(`${product.name} ditambahkan ke keranjang!`);
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) cartCount.innerText = totalItems;
    
    const cartContainer = document.getElementById('cartItemsContainer');
    if (cartContainer) {
        if (cart.length === 0) {
            cartContainer.innerHTML = '<p style="text-align:center; padding:40px;">Keranjang kosong</p>';
            document.getElementById('cartTotalItems').innerText = '0';
            document.getElementById('cartTotalPrice').innerText = 'Rp 0';
            return;
        }
        cartContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>Rp ${item.price.toLocaleString('id-ID')} x ${item.quantity}</p>
                </div>
                <div class="cart-item-actions">
                    <button class="cancel-order" data-id="${item.id}"><i class="fas fa-trash"></i> Batalkan</button>
                </div>
            </div>
        `).join('');
        
        const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        document.getElementById('cartTotalItems').innerText = totalItemsCount;
        document.getElementById('cartTotalPrice').innerText = `Rp ${totalPrice.toLocaleString('id-ID')}`;
        
        document.querySelectorAll('.cancel-order').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(btn.dataset.id);
                cancelOrder(id);
            });
        });
    }
}

function cancelOrder(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    showNotification('Pesanan dibatalkan');
}

function showNotification(msg) {
    const notif = document.createElement('div');
    notif.innerText = msg;
    notif.style.position = 'fixed';
    notif.style.bottom = '20px';
    notif.style.right = '20px';
    notif.style.backgroundColor = '#d4af37';
    notif.style.color = '#0a0a0a';
    notif.style.padding = '12px 24px';
    notif.style.borderRadius = '40px';
    notif.style.zIndex = '9999';
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
}

// ==================== AUTH & LOGIN ====================
const authModal = document.getElementById('authModal');
const userMenuBtn = document.getElementById('userMenuBtn');
const userDropdown = document.getElementById('userDropdown');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const logoutLink = document.getElementById('logoutLink');

userMenuBtn?.addEventListener('click', () => {
    if (!currentUser) {
        authModal.classList.add('active');
    } else {
        userDropdown.classList.toggle('active');
    }
});

loginBtn?.addEventListener('click', () => {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        currentUser = user;
        localStorage.setItem('
