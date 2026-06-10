// ==================== DATABASE FROM JSON FILE ====================
let database = {
    users: [],
    orders: [],
    products: [],
    settings: {}
};

let currentUser = null;
let cart = [];

// ==================== LOAD DATABASE FROM JSON FILE ====================
async function loadDatabase() {
    try {
        const response = await fetch('database.json');
        if (!response.ok) {
            throw new Error('Gagal load database.json');
        }
        database = await response.json();
        console.log('Database loaded:', database);
        
        // Inisialisasi localStorage dari database jika belum ada
        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify(database.users));
        }
        if (!localStorage.getItem('products_backup')) {
            localStorage.setItem('products_backup', JSON.stringify(database.products));
        }
        
        renderProductsFromDB();
    } catch (error) {
        console.error('Error loading database:', error);
        showNotification('Gagal load database! Pastikan file database.json ada.', 'error');
    }
}

// ==================== RENDER PRODUCTS FROM DATABASE ====================
function renderProductsFromDB() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    const productsToRender = database.products || [];
    
    if (productsToRender.length === 0) {
        grid.innerHTML = '<p style="text-align:center;padding:40px;">Belum ada produk. Tambahkan di database.json</p>';
        return;
    }
    
    grid.innerHTML = productsToRender.map(p => `
        <div class="product-card">
            <div class="product-image" style="background-image: url('${p.image}'); background-size: cover; background-position: center;">
                <span class="product-badge">PREMIUM</span>
            </div>
            <div class="product-info">
                <h3>${p.name}</h3>
                <p class="product-brand">${p.brand}</p>
                <p class="product-desc">${p.desc.substring(0, 45)}...</p>
                <p class="product-price">Rp ${p.price.toLocaleString('id-ID')}</p>
                <p class="product-stock" style="font-size:0.7rem; color:var(--gray);">Stok: ${p.stock} pcs</p>
                <button class="add-to-cart-btn" data-id="${p.id}"><i class="fas fa-cart-plus"></i> Tambah</button>
            </div>
        </div>
    `).join('');
    
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            addToCart(id);
        });
    });
}

function addToCart(id) {
    if (!currentUser) {
        showNotification('Silakan login terlebih dahulu!', 'warning');
        openAuthModal();
        return;
    }
    
    const product = database.products.find(p => p.id === id);
    if (!product) return;
    
    // Cek stok
    if (product.stok <= 0) {
        showNotification('Maaf, stok produk ini habis!', 'error');
        return;
    }
    
    const existing = cart.find(item => item.id === id);
    if (existing) {
        if (existing.quantity >= product.stok) {
            showNotification('Stok tidak mencukupi!', 'error');
            return;
        }
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem(`cart_${currentUser.id}`, JSON.stringify(cart));
    updateCartBadge();
    showNotification(`${product.name} ditambahkan!`, 'success');
}

// ==================== LOAD USERS FROM DATABASE ====================
function loadUsersFromDB() {
    const savedUsers = localStorage.getItem('users');
    if (!savedUsers || JSON.parse(savedUsers).length === 0) {
        localStorage.setItem('users', JSON.stringify(database.users));
    }
    return JSON.parse(localStorage.getItem('users'));
}

// ==================== AUTHENTICATION ====================
function authenticateUser(email, password) {
    const users = loadUsersFromDB();
    return users.find(u => u.email === email && u.password === password);
}

document.getElementById('doLoginBtn')?.addEventListener('click', () => {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showNotification('Harap isi email dan password!', 'error');
        return;
    }
    
    const user = authenticateUser(email, password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        document.getElementById('dropdownUserName').innerText = user.name;
        
        const savedCart = localStorage.getItem(`cart_${user.id}`);
        cart = savedCart ? JSON.parse(savedCart) : [];
        updateCartBadge();
        
        document.getElementById('authModal').classList.remove('active');
        showNotification(`Login berhasil! Selamat datang, ${user.name}!`, 'success');
        location.reload();
    } else {
        showNotification('Email atau password salah!', 'error');
    }
});

document.getElementById('doSignupBtn')?.addEventListener('click', () => {
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const address = document.getElementById('signupAddress').value;
    
    if (!name || !email || !password || !address) {
        showNotification('Harap isi semua field!', 'error');
        return;
    }
    
    let users = loadUsersFromDB();
    
    if (users.find(u => u.email === email)) {
        showNotification('Email sudah terdaftar!', 'error');
        return;
    }
    
    const newUser = { 
        id: users.length + 1,
        name, 
        email, 
        password, 
        address,
        role: 'user', 
        joined: new Date().toLocaleDateString('id-ID') 
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    document.getElementById('dropdownUserName').innerText = name;
    cart = [];
    
    document.getElementById('authModal').classList.remove('active');
    showNotification(`Pendaftaran berhasil!`, 'success');
    location.reload();
});

// ==================== CHECKOUT ====================
document.getElementById('checkoutBtn')?.addEventListener('click', () => {
    if (cart.length === 0) {
        showNotification('Keranjang kosong!', 'warning');
        return;
    }
    
    const address = document.getElementById('orderAddress').value;
    if (!address) {
        showNotification('Harap isi alamat pengiriman!', 'error');
        return;
    }
    
    // Load existing orders
    let existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    
    const newOrder = {
        id: existingOrders.length + 1,
        userId: currentUser.id,
        userName: currentUser.name,
        userEmail: currentUser.email,
        userAddress: address,
        items: cart.map(item => ({
            id: item.id,
            name: item.name,
            brand: item.brand,
            price: item.price,
            quantity: item.quantity
        })),
        total: cart.reduce((sum, i) => sum + (i.price * i.quantity), 0),
        date: new Date().toLocaleString('id-ID'),
        status: 'pending'
    };
    
    existingOrders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(existingOrders));
    
    showNotification('🎉 Pesanan berhasil!', 'success');
    
    cart = [];
    localStorage.setItem(`cart_${currentUser.id}`, JSON.stringify(cart));
    updateCartBadge();
    renderCart();
    document.getElementById('orderAddress').value = '';
    document.getElementById('cartModal').classList.remove('active');
});

// ==================== ADMIN PANEL ====================
function updateAdminDashboard() {
    const usersData = JSON.parse(localStorage.getItem('users') || '[]');
    const ordersData = JSON.parse(localStorage.getItem('orders') || '[]');
    
    document.getElementById('statUsers').innerText = usersData.length;
    document.getElementById('statProducts').innerText = database.products?.length || 0;
    document.getElementById('statOrders').innerText = ordersData.length;
    const totalRevenue = ordersData.reduce((sum, order) => sum + order.total, 0);
    document.getElementById('statRevenue').innerText = totalRevenue.toLocaleString('id-ID');
    
    // Orders list
    const ordersContainer = document.getElementById('ordersList');
    if (ordersContainer) {
        if (ordersData.length === 0) {
            ordersContainer.innerHTML = '<p style="text-align:center;padding:30px;">Belum ada pesanan</p>';
        } else {
            ordersContainer.innerHTML = ordersData.map(order => `
                <div class="order-card">
                    <div class="order-header">
                        <span class="order-id">#ORDER-${order.id}</span>
                        <span class="order-date">${order.date}</span>
                    </div>
                    <div class="order-customer">
                        <strong>${order.userName}</strong> (${order.userEmail})
                    </div>
                    <div class="order-address">
                        <i class="fas fa-map-marker-alt"></i> ${order.userAddress}
                    </div>
                    <div class="order-items">
                        <strong>Pesanan:</strong>
                        <ul style="margin-left:20px;">
                            ${order.items.map(item => `<li>${item.name} x ${item.quantity} - Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="order-total">
                        Total: Rp ${order.total.toLocaleString('id-ID')}
                    </div>
                </div>
            `).join('');
        }
    }
    
    // Users list (tanpa password)
    const usersContainer = document.getElementById('usersList');
    if (usersContainer) {
        usersContainer.innerHTML = usersData.map(user => `
            <div class="user-card">
                <div class="user-info">
                    <h4>${user.name}</h4>
                    <p><i class="fas fa-envelope"></i> ${user.email}</p>
                    <p><i class="fas fa-map-marker-alt"></i> ${user.address || 'Belum diisi'}</p>
                    <p><i class="far fa-calendar"></i> Bergabung: ${user.joined}</p>
                </div>
                <div class="user-role">${user.role === 'admin' ? 'Admin' : 'User'}</div>
            </div>
        `).join('');
    }
}

// ==================== UTILITY FUNCTIONS ====================
function updateCartBadge() {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cartBadge');
    if (badge) badge.innerText = total;
}

function renderCart() {
    const container = document.getElementById('cartList');
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align:center;padding:30px;">✨ Keranjang kosong ✨</p>';
        document.getElementById('cartTotalItems').innerText = '0';
        document.getElementById('cartTotalPrice').innerText = 'Rp 0';
        return;
    }
    
    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <h4>${item.name}</h4>
                <p>Rp ${item.price.toLocaleString('id-ID')} x ${item.quantity}</p>
            </div>
            <button class="cancel-btn" data-id="${item.id}"><i class="fas fa-trash"></i> Batal</button>
        </div>
    `).join('');
    
    const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    document.getElementById('cartTotalItems').innerText = totalItems;
    document.getElementById('cartTotalPrice').innerText = `Rp ${totalPrice.toLocaleString('id-ID')}`;
    
    document.querySelectorAll('.cancel-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            const product = cart.find(item => item.id === id);
            cart = cart.filter(item => item.id !== id);
            localStorage.setItem(`cart_${currentUser.id}`, JSON.stringify(cart));
            updateCartBadge();
            renderCart();
            showNotification(`${product.name} dibatalkan`, 'warning');
        });
    });
}

function showNotification(message, type = 'success') {
    const toast = document.getElementById('notificationToast');
    let icon = type === 'success' ? '<i class="fas fa-check-circle"></i>' : 
               type === 'error' ? '<i class="fas fa-times-circle"></i>' : 
               '<i class="fas fa-exclamation-triangle"></i>';
    
    toast.innerHTML = `${icon} ${message}`;
    toast.className = `notification-toast ${type} show`;
    setTimeout(() => toast.classList.remove('show'), 3000);
}

function openAuthModal() {
    document.getElementById('authModal').classList.add('active');
}

// ==================== PAGE NAVIGATION ====================
function showPage(pageId) {
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    const activeLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
    if (activeLink) activeLink.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==================== EVENT LISTENERS ====================
document.getElementById('userBtn')?.addEventListener('click', () => {
    if (!currentUser) openAuthModal();
    else document.getElementById('userDropdown').classList.toggle('active');
});

document.getElementById('cartBtn')?.addEventListener('click', () => {
    renderCart();
    document.getElementById('cartModal').classList.add('active');
});

document.getElementById('profileMenuBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentUser) {
        document.getElementById('profileName').innerText = currentUser.name;
        document.getElementById('profileEmail').innerText = currentUser.email;
        document.getElementById('profileAddress').innerText = currentUser.address || 'Belum diisi';
        document.getElementById('profileRole').innerText = currentUser.role === 'admin' ? 'Administrator' : 'Pengguna';
        document.getElementById('profileSince').innerText = currentUser.joined || '2026';
        document.getElementById('profileModal').classList.add('active');
    } else {
        openAuthModal();
    }
    document.getElementById('userDropdown').classList.remove('active');
});

document.getElementById('adminMenuBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentUser?.role === 'admin' || currentUser?.email === 'admin@daniel.com') {
        updateAdminDashboard();
        document.getElementById('adminModal').classList.add('active');
    } else {
        showNotification('🔐 Akses Admin khusus administrator!', 'error');
    }
    document.getElementById('userDropdown').classList.remove('active');
});

// Dark mode
document.getElementById('darkModeBtn')?.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const icon = document.querySelector('#darkModeBtn i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});

// Close modals
const closeButtons = ['closeAuthModal', 'closeProfileModal', 'closeSettingsModal', 'closeAdminModal', 'closeCartModal', 'closeProfileBtn', 'closeSettingsBtn', 'closeAdminBtn'];
closeButtons.forEach(id => {
    document.getElementById(id)?.addEventListener('click', () => {
        document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
    });
});

// Navigation
document.querySelectorAll('.nav-link, .footer-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.getAttribute('data-page');
        if (page) showPage(page);
        document.getElementById('navMenu')?.classList.remove('active');
    });
});

document.getElementById('shopBtn')?.addEventListener('click', () => {
    showPage('home');
    document.getElementById('productsSection').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('hamburgerBtn')?.addEventListener('click', () => {
    document.getElementById('navMenu').classList.toggle('active');
});

document.getElementById('sendContactBtn')?.addEventListener('click', () => {
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const msg = document.getElementById('contactMsg').value;
    if (name && email && msg) {
        showNotification('Pesan terkirim!', 'success');
        document.getElementById('contactName').value = '';
        document.getElementById('contactEmail').value = '';
        document.getElementById('contactMsg').value = '';
    } else {
        showNotification('Harap isi semua field!', 'error');
    }
});

// Auth tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.tab + 'Tab').classList.add('active');
    });
});

// Admin tabs
document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.admin-tab-btn').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.admin-tab-content').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        const tabId = `admin${btn.dataset.adminTab.charAt(0).toUpperCase() + btn.dataset.adminTab.slice(1)}Tab`;
        document.getElementById(tabId).classList.add('active');
    });
});

// Click outside close
window.addEventListener('click', (e) => {
    if (!e.target.closest('#userBtn') && !e.target.closest('#userDropdown')) {
        document.getElementById('userDropdown')?.classList.remove('active');
    }
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// ==================== INIT ====================
window.addEventListener('DOMContentLoaded', async () => {
    await loadDatabase();
    
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        document.getElementById('dropdownUserName').innerText = currentUser.name || currentUser.email;
        const savedCart = localStorage.getItem(`cart_${currentUser.id}`);
        if (savedCart) {
            cart = JSON.parse(savedCart);
        }
        updateCartBadge();
    }
    
    showPage('home');
});
