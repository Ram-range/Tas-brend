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
        localStorage.setItem('currentUser', JSON.stringify(user));
        document.getElementById('userNameDisplay').innerText = user.name || user.email;
        authModal.classList.remove('active');
        showNotification(`Selamat datang, ${user.name || user.email}!`);
        location.reload();
    } else if (email === 'admin@luxury.com' && password === 'admin123') {
        currentUser = { email: 'admin@luxury.com', name: 'Admin', role: 'admin' };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        document.getElementById('userNameDisplay').innerText = 'Admin';
        authModal.classList.remove('active');
        showNotification('Selamat datang, Admin!');
        location.reload();
    } else {
        showNotification('Email atau password salah!');
    }
});

signupBtn?.addEventListener('click', () => {
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    if (users.find(u => u.email === email)) {
        showNotification('Email sudah terdaftar!');
        return;
    }
    const newUser = { name, email, password, role: 'user' };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    document.getElementById('userNameDisplay').innerText = name;
    authModal.classList.remove('active');
    showNotification('Pendaftaran berhasil!');
    location.reload();
});

logoutLink?.addEventListener('click', () => {
    currentUser = null;
    cart = [];
    localStorage.removeItem('currentUser');
    localStorage.removeItem('cart');
    userDropdown.classList.remove('active');
    showNotification('Anda telah logout');
    location.reload();
});

// ==================== MODAL CONTROLS ====================
document.querySelectorAll('.close-modal, #closeProfileBtn, #closeSettingsBtn, #closeAdminBtn, #closeCartModal').forEach(btn => {
    btn?.addEventListener('click', () => {
        document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
    });
});

// Cart Modal
document.getElementById('cartIconBtn')?.addEventListener('click', () => {
    updateCartUI();
    document.getElementById('cartModal').classList.add('active');
});

document.getElementById('closeCartModal')?.addEventListener('click', () => {
    document.getElementById('cartModal').classList.remove('active');
});

// Profile Modal
document.getElementById('profileLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentUser) {
        document.getElementById('profileName').innerText = currentUser.name || currentUser.email;
        document.getElementById('profileEmail').innerText = currentUser.email;
        document.getElementById('profileRole').innerText = currentUser.role === 'admin' ? 'Administrator' : 'Pengguna';
        document.getElementById('profileModal').classList.add('active');
    } else {
        authModal.classList.add('active');
    }
    userDropdown.classList.remove('active');
});

// Settings Modal
document.getElementById('settingsLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('settingsModal').classList.add('active');
    userDropdown.classList.remove('active');
});

document.getElementById('settingsDarkModeBtn')?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = document.querySelector('#darkModeToggle i');
    if (icon) {
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
});

// Dark Mode Toggle (Navbar)
document.getElementById('darkModeToggle')?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = document.querySelector('#darkModeToggle i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

// Admin Panel
document.getElementById('adminPanelLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentUser?.role === 'admin' || currentUser?.email === 'admin@luxury.com') {
        updateAdminStats();
        document.getElementById('adminModal').classList.add('active');
    } else {
        showNotification('Akses Admin hanya untuk administrator!');
    }
    userDropdown.classList.remove('active');
});

function updateAdminStats() {
    document.getElementById('totalUsers').innerText = users.length + 1;
    document.getElementById('totalProducts').innerText = products.length;
    const totalOrders = cart.length;
    document.getElementById('totalOrders').innerText = totalOrders;
    const revenue = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('totalRevenue').innerText = revenue.toLocaleString('id-ID');
    
    if (adminChart) adminChart.destroy();
    const ctx = document.getElementById('salesChart').getContext('2d');
    adminChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
            datasets: [{ label: 'Penjualan (Rp Juta)', data: [120, 145, 168, 190, 210, 245], borderColor: '#d4af37', tension: 0.3 }]
        }
    });
}

// ==================== NAVIGASI SMOOTH SCROLL ====================
const sections = {
    home: document.getElementById('homeSection'),
    about: document.getElementById('aboutSection'),
    skills: document.getElementById('skillsSection'),
    projects: document.getElementById('projectsSection'),
    contact: document.getElementById('contactSection')
};

document.querySelectorAll('[data-nav]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const navValue = link.getAttribute('data-nav');
        if (sections[navValue]) {
            sections[navValue].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// ==================== HAMBURGER MENU (3 GARIS) ====================
document.getElementById('hamburgerBtn')?.addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('active');
});

// ==================== SHOP NOW ====================
document.getElementById('shopNowBtn')?.addEventListener('click', () => {
    document.getElementById('productsSection').scrollIntoView({ behavior: 'smooth' });
});

// ==================== CHECKOUT ====================
document.getElementById('checkoutBtn')?.addEventListener('click', () => {
    if (cart.length === 0) {
        showNotification('Keranjang kosong!');
        return;
    }
    showNotification('Terima kasih! Pesanan Anda sedang diproses.');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    document.getElementById('cartModal').classList.remove('active');
});

// ==================== INIT ====================
renderProducts();
updateCartUI();

// Auth tabs
document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab + 'Form').classList.add('active');
    });
});

// Close modal klik luar
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});
