// ==================== DATA PRODUK ====================
const products = [
    { id: 1, name: "Hermès Birkin 30", brand: "HERMÈS", price: 325000000, desc: "Tas tangan mewah ikonik", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=280&fit=crop" },
    { id: 2, name: "Chanel Classic Flap", brand: "CHANEL", price: 185000000, desc: "Classic Flap quilted leather", image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&h=280&fit=crop" },
    { id: 3, name: "Louis Vuitton Neverfull", brand: "LOUIS VUITTON", price: 28500000, desc: "Tas tote spacious", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=280&fit=crop" },
    { id: 4, name: "Gucci Dionysus", brand: "GUCCI", price: 32500000, desc: "Closure tiger head signature", image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400&h=280&fit=crop" },
    { id: 5, name: "Prada Saffiano", brand: "PRADA", price: 22800000, desc: "Tas kulit saffiano elegan", image: "https://images.unsplash.com/photo-1584278860047-22db9ff82bed?w=400&h=280&fit=crop" },
    { id: 6, name: "Dior Lady Dior", brand: "DIOR", price: 125000000, desc: "Tas ikonik quilting", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=280&fit=crop" },
    { id: 7, name: "YSL Cassandra", brand: "SAINT LAURENT", price: 32500000, desc: "Tas flap logo YSL", image: "https://images.unsplash.com/photo-1591561954555-6c640d980efe?w=400&h=280&fit=crop" },
    { id: 8, name: "Fendi Baguette", brand: "FENDI", price: 42500000, desc: "Tas Baguette klasik", image: "https://images.unsplash.com/photo-1566473965997-3de9c817e938?w=400&h=280&fit=crop" },
    { id: 9, name: "Celine Triomphe", brand: "CELINE", price: 48500000, desc: "Logo Triomphe chic", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=280&fit=crop" },
    { id: 10, name: "Bottega Cassette", brand: "BOTTEGA VENETA", price: 52000000, desc: "Tas anyaman leather", image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&h=280&fit=crop" },
    { id: 11, name: "Loewe Puzzle", brand: "LOEWE", price: 39800000, desc: "Desain puzzle unik", image: "https://images.unsplash.com/photo-1591561954555-6c640d980efe?w=400&h=280&fit=crop" },
    { id: 12, name: "Goyard St. Louis", brand: "GOYARD", price: 28500000, desc: "Motif Chevron", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=280&fit=crop" },
    { id: 13, name: "Miu Miu Wander", brand: "MIU MIU", price: 22900000, desc: "Playful elegant", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=280&fit=crop" },
    { id: 14, name: "Balenciaga City", brand: "BALENCIAGA", price: 27500000, desc: "Tas motor edgy", image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400&h=280&fit=crop" },
    { id: 15, name: "Givenchy Antigona", brand: "GIVENCHY", price: 35800000, desc: "Structured silhouette", image: "https://images.unsplash.com/photo-1584278860047-22db9ff82bed?w=400&h=280&fit=crop" },
    { id: 16, name: "Coach Tabby", brand: "COACH", price: 5500000, desc: "Tas flap modern", image: "https://images.unsplash.com/photo-1566473965997-3de9c817e938?w=400&h=280&fit=crop" },
    { id: 17, name: "Michael Kors Jet Set", brand: "MICHAEL KORS", price: 4250000, desc: "Tas tote casual", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=280&fit=crop" }
];

// ==================== DEFAULT USERS ====================
const defaultUsers = [
    { id: 1, name: "Admin Daniel", email: "admin@daniel.com", password: "admin123", role: "admin", address: "Jakarta, Indonesia", joined: "2024-01-01" }
];

// ==================== GLOBAL STATE ====================
let currentUser = null;
let cart = [];

// ==================== INIT DATABASE ====================
function initDatabase() {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
    if (!localStorage.getItem('orders')) {
        localStorage.setItem('orders', JSON.stringify([]));
    }
}

function getUsers() {
    return JSON.parse(localStorage.getItem('users'));
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// ==================== NOTIFICATION ====================
function showNotification(message, type = 'success') {
    let toast = document.getElementById('notificationToast');
    if (!toast) {
        const div = document.createElement('div');
        div.id = 'notificationToast';
        div.className = 'notification-toast';
        document.body.appendChild(div);
        toast = div;
    }
    let icon = type === 'success' ? '✅' : type === 'error' ? '❌' : '⚠️';
    toast.innerHTML = `${icon} ${message}`;
    toast.className = `notification-toast ${type} show`;
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// ==================== RENDER PRODUCTS ====================
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    grid.innerHTML = products.map(p => `
        <div class="product-card">
            <div class="product-image" style="background-image: url('${p.image}');">
                <span class="product-badge">PREMIUM</span>
            </div>
            <div class="product-info">
                <h3>${p.name}</h3>
                <p class="product-brand">${p.brand}</p>
                <p class="product-desc">${p.desc.substring(0, 45)}...</p>
                <p class="product-price">Rp ${p.price.toLocaleString('id-ID')}</p>
                <button class="add-to-cart-btn" data-id="${p.id}"><i class="fas fa-cart-plus"></i> Tambah</button>
            </div>
        </div>
    `).join('');
    
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            addToCart(parseInt(btn.dataset.id));
        });
    });
}

function addToCart(id) {
    if (!currentUser) {
        showNotification('Silakan login terlebih dahulu!', 'warning');
        openAuthModal();
        return;
    }
    
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem(`cart_${currentUser.id}`, JSON.stringify(cart));
    updateCartBadge();
    showNotification(`${product.name} ditambahkan!`, 'success');
}

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
                <h4 style="font-size:0.9rem;">${item.name}</h4>
                <p style="font-size:0.8rem;">Rp ${item.price.toLocaleString('id-ID')} x ${item.quantity}</p>
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

// ==================== AUTHENTICATION ====================
function openAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) modal.classList.add('active');
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) modal.classList.remove('active');
}

// LOGIN
const loginBtn = document.getElementById('doLoginBtn');
if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        if (!email || !password) {
            showNotification('Harap isi email dan password!', 'error');
            return;
        }
        
        const users = getUsers();
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            const userNameSpan = document.getElementById('dropdownUserName');
            if (userNameSpan) userNameSpan.innerText = user.name;
            
            const savedCart = localStorage.getItem(`cart_${user.id}`);
            cart = savedCart ? JSON.parse(savedCart) : [];
            updateCartBadge();
            
            closeAuthModal();
            showNotification(`Login berhasil! Selamat datang, ${user.name}!`, 'success');
            setTimeout(() => location.reload(), 1000);
        } else {
            showNotification('Email atau password salah!', 'error');
        }
    });
}

// SIGNUP
const signupBtn = document.getElementById('doSignupBtn');
if (signupBtn) {
    signupBtn.addEventListener('click', () => {
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const address = document.getElementById('signupAddress').value;
        
        if (!name || !email || !password || !address) {
            showNotification('Harap isi semua field!', 'error');
            return;
        }
        
        let users = getUsers();
        
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
        saveUsers(users);
        
        currentUser = newUser;
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        const userNameSpan = document.getElementById('dropdownUserName');
        if (userNameSpan) userNameSpan.innerText = name;
        cart = [];
        
        closeAuthModal();
        showNotification(`Pendaftaran berhasil! Selamat datang, ${name}!`, 'success');
        setTimeout(() => location.reload(), 1000);
    });
}

// LOGOUT
const logoutBtn = document.getElementById('logoutMenuBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        currentUser = null;
        localStorage.removeItem('currentUser');
        cart = [];
        const userNameSpan = document.getElementById('dropdownUserName');
        if (userNameSpan) userNameSpan.innerText = 'Guest';
        const dropdown = document.getElementById('userDropdown');
        if (dropdown) dropdown.classList.remove('active');
        showNotification('Anda telah logout', 'warning');
        location.reload();
    });
}

// ==================== CHECKOUT ====================
const checkoutBtn = document.getElementById('checkoutBtn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showNotification('Keranjang kosong!', 'warning');
            return;
        }
        
        const address = document.getElementById('orderAddress').value;
        if (!address) {
            showNotification('Harap isi alamat pengiriman!', 'error');
            return;
        }
        
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
        const cartModal = document.getElementById('cartModal');
        if (cartModal) cartModal.classList.remove('active');
    });
}

// ==================== ADMIN PANEL (FIXED - MODAL PASTI MUNCUL) ====================
function openAdminPanel() {
    console.log("openAdminPanel dipanggil");
    
    // Cek apakah user sudah login
    if (!currentUser) {
        showNotification('Silakan login terlebih dahulu!', 'warning');
        openAuthModal();
        return;
    }
    
    // Cek apakah user adalah admin
    if (currentUser.role !== 'admin' && currentUser.email !== 'admin@daniel.com') {
        showNotification('🔐 Akses Admin khusus administrator! Login dengan admin@daniel.com / admin123', 'error');
        return;
    }
    
    // Update data dashboard
    updateAdminDashboard();
    
    // Tampilkan modal admin
    const adminModal = document.getElementById('adminModal');
    if (adminModal) {
        console.log("Menampilkan admin modal");
        adminModal.classList.add('active');
    } else {
        console.error("Element adminModal tidak ditemukan!");
        showNotification('Error: Modal admin tidak ditemukan!', 'error');
    }
}

function updateAdminDashboard() {
    const usersData = getUsers();
    const ordersData = JSON.parse(localStorage.getItem('orders') || '[]');
    
    // Update stats
    const statUsers = document.getElementById('statUsers');
    const statProducts = document.getElementById('statProducts');
    const statOrders = document.getElementById('statOrders');
    const statRevenue = document.getElementById('statRevenue');
    
    if (statUsers) statUsers.innerText = usersData.length;
    if (statProducts) statProducts.innerText = products.length;
    if (statOrders) statOrders.innerText = ordersData.length;
    const totalRevenue = ordersData.reduce((sum, order) => sum + order.total, 0);
    if (statRevenue) statRevenue.innerText = totalRevenue.toLocaleString('id-ID');
    
    // Chart
    const ctx = document.getElementById('adminChart')?.getContext('2d');
    if (ctx) {
        if (window.adminChart) window.adminChart.destroy();
        window.adminChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
                datasets: [{ 
                    label: 'Penjualan (Rp Juta)', 
                    data: [85, 110, 135, 160, 190, 220], 
                    borderColor: '#D4AF37', 
                    tension: 0.3, 
                    fill: false 
                }]
            }
        });
    }
    
    // Orders list
    const ordersContainer = document.getElementById('ordersList');
    if (ordersContainer) {
        if (ordersData.length === 0) {
            ordersContainer.innerHTML = '<p style="text-align:center;padding:30px;">📭 Belum ada pesanan</p>';
        } else {
            ordersContainer.innerHTML = ordersData.map(order => `
                <div class="order-card">
                    <div class="order-header">
                        <span class="order-id">#ORDER-${order.id}</span>
                        <span class="order-date">📅 ${order.date}</span>
                    </div>
                    <div class="order-customer">
                        <strong>👤 ${order.userName}</strong> (${order.userEmail})
                    </div>
                    <div class="order-address">
                        📍 ${order.userAddress}
                    </div>
                    <div class="order-items">
                        <strong>🛍️ Pesanan:</strong>
                        <ul style="margin-left:20px; margin-top:5px;">
                            ${order.items.map(item => `<li>${item.name} x ${item.quantity} - Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="order-total">
                        💰 Total: Rp ${order.total.toLocaleString('id-ID')}
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
                <div class="user-role">${user.role === 'admin' ? '👑 Admin' : '👤 User'}</div>
            </div>
        `).join('');
    }
}

// ==================== EVENT LISTENERS ====================

// User dropdown
const userBtn = document.getElementById('userBtn');
if (userBtn) {
    userBtn.addEventListener('click', () => {
        if (!currentUser) {
            openAuthModal();
        } else {
            const dropdown = document.getElementById('userDropdown');
            if (dropdown) dropdown.classList.toggle('active');
        }
    });
}

// Cart button
const cartBtn = document.getElementById('cartBtn');
if (cartBtn) {
    cartBtn.addEventListener('click', () => {
        if (!currentUser) {
            showNotification('Silakan login terlebih dahulu!', 'warning');
            openAuthModal();
            return;
        }
        renderCart();
        const cartModal = document.getElementById('cartModal');
        if (cartModal) cartModal.classList.add('active');
    });
}

// Profile menu
const profileMenuBtn = document.getElementById('profileMenuBtn');
if (profileMenuBtn) {
    profileMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentUser) {
            const profileName = document.getElementById('profileName');
            const profileEmail = document.getElementById('profileEmail');
            const profileAddress = document.getElementById('profileAddress');
            const profileRole = document.getElementById('profileRole');
            const profileSince = document.getElementById('profileSince');
            if (profileName) profileName.innerText = currentUser.name;
            if (profileEmail) profileEmail.innerText = currentUser.email;
            if (profileAddress) profileAddress.innerText = currentUser.address || 'Belum diisi';
            if (profileRole) profileRole.innerText = currentUser.role === 'admin' ? 'Administrator' : 'Pengguna';
            if (profileSince) profileSince.innerText = currentUser.joined || '2026';
            const profileModal = document.getElementById('profileModal');
            if (profileModal) profileModal.classList.add('active');
        } else {
            openAuthModal();
        }
        const dropdown = document.getElementById('userDropdown');
        if (dropdown) dropdown.classList.remove('active');
    });
}

// Settings menu
const settingsMenuBtn = document.getElementById('settingsMenuBtn');
if (settingsMenuBtn) {
    settingsMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const settingsModal = document.getElementById('settingsModal');
        if (settingsModal) settingsModal.classList.add('active');
        const dropdown = document.getElementById('userDropdown');
        if (dropdown) dropdown.classList.remove('active');
    });
}

// ADMIN PANEL BUTTON - YANG PALING PENTING!
const adminMenuBtn = document.getElementById('adminMenuBtn');
if (adminMenuBtn) {
    console.log("Admin menu button ditemukan");
    adminMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log("Admin menu button diklik! Membuka admin panel...");
        openAdminPanel();
        const dropdown = document.getElementById('userDropdown');
        if (dropdown) dropdown.classList.remove('active');
    });
} else {
    console.error("Admin menu button TIDAK ditemukan di DOM!");
}

// Dark mode
const darkModeBtn = document.getElementById('darkModeBtn');
if (darkModeBtn) {
    darkModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const icon = darkModeBtn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-moon');
            icon.classList.toggle('fa-sun');
        }
    });
}

const settingsDarkBtn = document.getElementById('settingsDarkBtn');
if (settingsDarkBtn) {
    settingsDarkBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const icon = document.querySelector('#darkModeBtn i');
        if (icon) {
            icon.classList.toggle('fa-moon');
            icon.classList.toggle('fa-sun');
        }
    });
}

// Close modals
const closeModalButtons = ['closeAuthModal', 'closeProfileModal', 'closeSettingsModal', 'closeAdminModal', 'closeCartModal', 'closeProfileBtn', 'closeSettingsBtn', 'closeAdminBtn'];
closeModalButtons.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
        });
    }
});

// Navigation
function showPage(pageId) {
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
    const targetPage = document.getElementById(pageId);
    if (targetPage) targetPage.classList.add('active');
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    const activeLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
    if (activeLink) activeLink.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

const navLinks = document.querySelectorAll('.nav-link, .footer-links a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.getAttribute('data-page');
        if (page) showPage(page);
        const navMenu = document.getElementById('navMenu');
        if (navMenu) navMenu.classList.remove('active');
    });
});

const shopBtn = document.getElementById('shopBtn');
if (shopBtn) {
    shopBtn.addEventListener('click', () => {
        showPage('home');
        const productsSection = document.getElementById('productsSection');
        if (productsSection) productsSection.scrollIntoView({ behavior: 'smooth' });
    });
}

const hamburgerBtn = document.getElementById('hamburgerBtn');
if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
        const navMenu = document.getElementById('navMenu');
        if (navMenu) navMenu.classList.toggle('active');
    });
}

const sendContactBtn = document.getElementById('sendContactBtn');
if (sendContactBtn) {
    sendContactBtn.addEventListener('click', () => {
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
}

// Tabs for login/signup
const tabBtns = document.querySelectorAll('.tab-btn');
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        const tabId = btn.dataset.tab + 'Tab';
        const tabContent = document.getElementById(tabId);
        if (tabContent) tabContent.classList.add('active');
    });
});

// Admin tabs
const adminTabBtns = document.querySelectorAll('.admin-tab-btn');
adminTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        adminTabBtns.forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.admin-tab-content').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        const tabId = `admin${btn.dataset.adminTab.charAt(0).toUpperCase() + btn.dataset.adminTab.slice(1)}Tab`;
        const tabContent = document.getElementById(tabId);
        if (tabContent) tabContent.classList.add('active');
    });
});

// Click outside to close dropdown
window.addEventListener('click', (e) => {
    const userBtnEl = document.getElementById('userBtn');
    const userDropdownEl = document.getElementById('userDropdown');
    if (userBtnEl && userDropdownEl && !userBtnEl.contains(e.target) && !userDropdownEl.contains(e.target)) {
        userDropdownEl.classList.remove('active');
    }
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// ==================== INIT ====================
window.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded, initializing...");
    initDatabase();
    renderProducts();
    
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        const userNameSpan = document.getElementById('dropdownUserName');
        if (userNameSpan) userNameSpan.innerText = currentUser.name || currentUser.email;
        const savedCart = localStorage.getItem(`cart_${currentUser.id}`);
        if (savedCart) {
            cart = JSON.parse(savedCart);
        }
        updateCartBadge();
    }
    
    showPage('home');
    
    // Loading screen cepat
    setTimeout(() => {
        const loader = document.getElementById('loadingScreen');
        if (loader) {
            loader.classList.add('hide');
            setTimeout(() => loader.style.display = 'none', 300);
        }
    }, 500);
});
