// ==================== DATA PRODUK (15+ TAS FAMOUS) ====================
const products = [
    { id: 1, name: "Hermès Birkin 30", brand: "Hermès", price: 325000000, desc: "Tas tangan mewah ikonik dari Hermès, kulit Togo premium, sangat eksklusif" },
    { id: 2, name: "Chanel Classic Flap", brand: "Chanel", price: 185000000, desc: "Classic Flap bag dengan quilted leather dan chain strap emas" },
    { id: 3, name: "Louis Vuitton Neverfull", brand: "Louis Vuitton", price: 28500000, desc: "Tas tote spacious dengan canvas monogram iconic LV" },
    { id: 4, name: "Gucci Dionysus", brand: "Gucci", price: 32500000, desc: "Tas dengan closure tiger head signature, sangat elegan" },
    { id: 5, name: "Prada Saffiano", brand: "Prada", price: 22800000, desc: "Tas kulit saffiano elegan dengan hardware gold" },
    { id: 6, name: "Dior Lady Dior", brand: "Dior", price: 125000000, desc: "Tas ikonik dengan quilting cannage dan charm DIOR" },
    { id: 7, name: "YSL Cassandra", brand: "Saint Laurent", price: 32500000, desc: "Tas flap dengan logo YSL besar yang statement" },
    { id: 8, name: "Fendi Baguette", brand: "Fendi", price: 42500000, desc: "Tas Baguette klasik dengan FF logo iconic" },
    { id: 9, name: "Celine Triomphe", brand: "Celine", price: 48500000, desc: "Tas dengan logo Triomphe yang chic dan minimalis" },
    { id: 10, name: "Bottega Cassette", brand: "Bottega Veneta", price: 52000000, desc: "Tas anyaman leather signature BV, sangat stylish" },
    { id: 11, name: "Loewe Puzzle", brand: "Loewe", price: 39800000, desc: "Tas dengan desain puzzle unik dan geometris" },
    { id: 12, name: "Goyard St. Louis", brand: "Goyard", price: 28500000, desc: "Tas tote mewah dengan motif Chevron hand-painted" },
    { id: 13, name: "Miu Miu Wander", brand: "Miu Miu", price: 22900000, desc: "Tas dengan desain playful namun tetap elegant" },
    { id: 14, name: "Balenciaga City", brand: "Balenciaga", price: 27500000, desc: "Tas motor edgy iconic dengan studs" },
    { id: 15, name: "Givenchy Antigona", brand: "Givenchy", price: 35800000, desc: "Tas structured dengan silhouette tegas dan mewah" },
    { id: 16, name: "Coach Tabby", brand: "Coach", price: 5500000, desc: "Tas flap dengan desain modern dan vintage vibe" },
    { id: 17, name: "Michael Kors Jet Set", brand: "Michael Kors", price: 4250000, desc: "Tas tote casual mewah untuk sehari-hari" }
];

// ==================== GLOBAL STATE ====================
let currentUser = null;
let cart = [];
let users = JSON.parse(localStorage.getItem('users')) || [];
let chartInstance = null;

// LOADING ANIMATION
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loadingOverlay');
        loader.classList.add('hide');
        setTimeout(() => loader.style.display = 'none', 500);
    }, 1500);
});

// Load saved data
const savedUser = localStorage.getItem('currentUser');
if (savedUser) {
    currentUser = JSON.parse(savedUser);
    document.getElementById('dropdownUserName').innerText = currentUser.name || currentUser.email;
}
const savedCart = localStorage.getItem('cart');
if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartBadge();
}

// ==================== RENDER PRODUCTS ====================
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    grid.innerHTML = products.map(p => `
        <div class="product-card">
            <div class="product-img"><i class="fas fa-bag-shopping"></i></div>
            <div class="product-info">
                <h3>${p.name}</h3>
                <p class="product-brand">${p.brand}</p>
                <p class="product-desc">${p.desc.substring(0, 60)}...</p>
                <p class="product-price">Rp ${p.price.toLocaleString('id-ID')}</p>
                <button class="add-cart-btn" data-id="${p.id}"><i class="fas fa-cart-plus"></i> Tambah ke Keranjang</button>
            </div>
        </div>
    `).join('');
    
    document.querySelectorAll('.add-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            addToCart(id);
        });
    });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    showNotification(`${product.name} ditambahkan ke keranjang!`, 'success');
}

function updateCartBadge() {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartBadge').innerText = total;
}

function renderCart() {
    const container = document.getElementById('cartList');
    if (!container) return;
    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align:center;padding:40px">Keranjang kosong</p>';
        document.getElementById('cartTotal').innerText = 'Rp 0';
        document.getElementById('cartItemCount').innerText = '0';
        return;
    }
    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <h4>${item.name}</h4>
                <p>Rp ${item.price.toLocaleString('id-ID')} x ${item.quantity}</p>
            </div>
            <button class="cancel-item-btn" data-id="${item.id}"><i class="fas fa-trash"></i> Batalkan</button>
        </div>
    `).join('');
    
    const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    document.getElementById('cartTotal').innerText = `Rp ${totalPrice.toLocaleString('id-ID')}`;
    document.getElementById('cartItemCount').innerText = totalItems;
    
    document.querySelectorAll('.cancel-item-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            cancelOrder(id);
        });
    });
}

function cancelOrder(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    renderCart();
    showNotification('Pesanan dibatalkan', 'info');
}

function showNotification(msg, type = 'info') {
    const notif = document.createElement('div');
    notif.innerText = msg;
    notif.style.position = 'fixed';
    notif.style.bottom = '20px';
    notif.style.right = '20px';
    notif.style.backgroundColor = type === 'success' ? '#28a745' : '#d4af37';
    notif.style.color = '#0a0a0a';
    notif.style.padding = '12px 24px';
    notif.style.borderRadius = '40px';
    notif.style.zIndex = '9999';
    notif.style.fontWeight = '500';
    notif.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
}

// ==================== AUTHENTICATION ====================
function openAuthModal() {
    document.getElementById('authModal').classList.add('active');
}

function closeAuthModal() {
    document.getElementById('authModal').classList.remove('active');
}

document.getElementById('doLoginBtn')?.addEventListener('click', () => {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Admin login
    if (email === 'admin@luxury.com' && password === 'admin123') {
        currentUser = { email: 'admin@luxury.com', name: 'Administrator', role: 'admin' };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        document.getElementById('dropdownUserName').innerText = 'Administrator';
        closeAuthModal();
        showNotification('Selamat datang, Admin!', 'success');
        location.reload();
        return;
    }
    
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        document.getElementById('dropdownUserName').innerText = user.name;
        closeAuthModal();
        showNotification(`Selamat datang, ${user.name}!`, 'success');
        location.reload();
    } else {
        showNotification('Email atau password salah!', 'error');
    }
});

document.getElementById('doSignupBtn')?.addEventListener('click', () => {
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    if (users.find(u => u.email === email)) {
        showNotification('Email sudah terdaftar!', 'error');
        return;
    }
    
    const newUser = { name, email, password, role: 'user', joined: new Date().toLocaleDateString() };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    document.getElementById('dropdownUserName').innerText = name;
    closeAuthModal();
    showNotification('Pendaftaran berhasil!', 'success');
    location.reload();
});

document.getElementById('logoutMenuBtn')?.addEventListener('click', () => {
    currentUser = null;
    localStorage.removeItem('currentUser');
    document.getElementById('dropdownUserName').innerText = 'Guest';
    document.getElementById('userDropdown').classList.remove('active');
    showNotification('Anda telah logout', 'info');
    location.reload();
});

// ==================== MODAL CONTROLS ====================
document.getElementById('userBtn')?.addEventListener('click', () => {
    if (!currentUser) {
        openAuthModal();
    } else {
        document.getElementById('userDropdown').classList.toggle('active');
    }
});

document.getElementById('cartBtn')?.addEventListener('click', () => {
    renderCart();
    document.getElementById('cartModal').classList.add('active');
});

document.getElementById('profileMenuBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentUser) {
        document.getElementById('profileName').innerText = currentUser.name || currentUser.email;
        document.getElementById('profileEmail').innerText = currentUser.email;
        document.getElementById('profileRole').innerText = currentUser.role === 'admin' ? 'Administrator' : 'Pengguna';
        document.getElementById('profileModal').classList.add('active');
    } else {
        openAuthModal();
    }
    document.getElementById('userDropdown').classList.remove('active');
});

document.getElementById('settingsMenuBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('settingsModal').classList.add('active');
    document.getElementById('userDropdown').classList.remove('active');
});

document.getElementById('adminMenuBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentUser?.role === 'admin' || currentUser?.email === 'admin@luxury.com') {
        updateAdminStats();
        document.getElementById('adminModal').classList.add('active');
    } else {
        showNotification('Akses Admin hanya untuk administrator!', 'error');
    }
    document.getElementById('userDropdown').classList.remove('active');
});

function updateAdminStats() {
    document.getElementById('statUsers').innerText = users.length + 1;
    document.getElementById('statProducts').innerText = products.length;
    const orders = cart.length;
    document.getElementById('statOrders').innerText = orders;
    const revenue = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    document.getElementById('statRevenue').innerText = revenue.toLocaleString('id-ID');
    
    const ctx = document.getElementById('adminChart')?.getContext('2d');
    if (ctx) {
        if (chartInstance) chartInstance.destroy();
        chartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
                datasets: [{ label: 'Penjualan (Rp Juta)', data: [85, 110, 135, 160, 190, 220], borderColor: '#d4af37', tension: 0.3 }]
            }
        });
    }
}

// Close all modals
document.querySelectorAll('.modal-close, #closeProfileBtn, #closeSettingsBtn, #closeAdminBtn, #closeCartModal').forEach(btn => {
    btn?.addEventListener('click', () => {
        document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
    });
});

// ==================== DARK MODE ====================
document.getElementById('darkModeBtn')?.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const icon = document.querySelector('#darkModeBtn i');
    if (document.body.classList.contains('dark')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

document.getElementById('settingsDarkBtn')?.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const icon = document.querySelector('#darkModeBtn i');
    if (document.body.classList.contains('dark')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

// ==================== NAVIGATION PAGE ====================
function showPage(pageId) {
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('.nav-link, .footer-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.getAttribute('data-page');
        if (page) showPage(page);
    });
});

document.getElementById('shopBtn')?.addEventListener('click', () => {
    showPage('home');
    document.getElementById('productsSection').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('checkoutBtn')?.addEventListener('click', () => {
    if (cart.length === 0) {
        showNotification('Keranjang kosong!', 'error');
        return;
    }
    showNotification('Terima kasih! Pesanan Anda sedang diproses.', 'success');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    renderCart();
    document.getElementById('cartModal').classList.remove('active');
});

// ==================== HAMBURGER MENU (3 GARIS) ====================
document.getElementById('hamburgerBtn')?.addEventListener('click', () => {
    document.getElementById('navMenu').classList.toggle('active');
});

// Close dropdown when clicking outside
window.addEventListener('click', (e) => {
    if (!e.target.closest('#userBtn') && !e.target.closest('#userDropdown')) {
        document.getElementById('userDropdown')?.classList.remove('active');
    }
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// ==================== INIT ====================
renderProducts();
showPage('home');
updateCartBadge();

// Auth tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.tab + 'Tab').classList.add('active');
    });
});

// Contact form
document.getElementById('sendContactBtn')?.addEventListener('click', () => {
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const msg = document.getElementById('contactMsg').value;
    if (name && email && msg) {
        showNotification('Pesan terkirim! Kami akan menghubungi Anda.', 'success');
        document.getElementById('contactName').value = '';
        document.getElementById('contactEmail').value = '';
        document.getElementById('contactMsg').value = '';
    } else {
        showNotification('Harap isi semua field!', 'error');
    }
});
