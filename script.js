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
    const icons = { success: '✅', error: '❌', warning: '⚠️' };
    toast.innerHTML = `${icons[type] || '✅'} ${message}`;
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
document.getElementById('doLoginBtn')?.addEventListener('click', () => {
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
        document.getElementById('dropdownUserName').innerText = user.name;
        
        const savedCart = localStorage.getItem(`cart_${user.id}`);
        cart = savedCart ? JSON.parse(savedCart) : [];
        updateCartBadge();
        
        closeAuthModal();
        showNotification(`Login berhasil! Selamat datang, ${user.name}!`, 'success');
        setTimeout(() => location.reload(), 800);
    } else {
        showNotification('Email atau password salah!', 'error');
    }
});

// SIGNUP
document.getElementById('doSignupBtn')?.addEventListener('click', () => {
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
    document.getElementById('dropdownUserName').innerText = name;
    cart = [];
    
    closeAuthModal();
    showNotification(`Pendaftaran berhasil! Selamat datang, ${name}!`, 'success');
    setTimeout(() => location.reload(), 800);
});

// LOGOUT
document.getElementById('logoutMenuBtn')?.addEventListener('click', () => {
    currentUser = null;
    localStorage.removeItem('currentUser');
    cart = [];
    document.getElementById('dropdownUserName').innerText = 'Guest';
    document.getElementById('userDropdown').classList.remove('active');
    showNotification('Anda telah logout', 'warning');
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

// ==================== ADMIN PANEL (FULLY FIXED) ====================
function openAdminPanel() {
    // Cek login
    if (!currentUser) {
        showNotification('Silakan login terlebih dahulu!', 'warning');
        openAuthModal();
        return;
    }
    
    // Cek role admin
    if (currentUser.role !== 'admin' && currentUser.email !== 'admin@daniel.com') {
        showNotification('🔐 Akses Admin khusus administrator!', 'error');
        return;
    }
    
    // Update data
    updateAdminDashboard();
    
    // Tampilkan modal
    const adminModal = document.getElementById('adminModal');
    if (adminModal) {
        adminModal.classList.add('active');
        console.log('✅ Admin Modal dibuka');
    } else {
        console.error('❌ Admin Modal tidak ditemukan!');
        showNotification('Error: Modal admin tidak ditemukan!', 'error');
    }
}

function updateAdminDashboard() {
    const usersData = getUsers();
    const ordersData = JSON.parse(localStorage.getItem('orders') || '[]');
    
    // 1. Update Statistik
    document.getElementById('statUsers').innerText = usersData.length;
    document.getElementById('statProducts').innerText = products.length;
    document.getElementById('statOrders').innerText = ordersData.length;
    const totalRevenue = ordersData.reduce((sum, order) => sum + order.total, 0);
    document.getElementById('statRevenue').innerText = 'Rp ' + totalRevenue.toLocaleString('id-ID');
    
    // 2. Chart (pakai canvas biasa, tanpa Chart.js biar simple dan pasti jalan)
    drawSimpleChart(ordersData);
    
    // 3. Orders List
    const ordersContainer = document.getElementById('ordersList');
    if (ordersContainer) {
        if (ordersData.length === 0) {
            ordersContainer.innerHTML = `
                <div style="text-align:center;padding:40px;color:var(--gray);">
                    <i class="fas fa-inbox" style="font-size:3rem;display:block;margin-bottom:15px;"></i>
                    Belum ada pesanan masuk
                </div>
            `;
        } else {
            ordersContainer.innerHTML = ordersData.map(order => `
                <div class="order-card" style="border-left:4px solid var(--gold);">
                    <div class="order-header">
                        <span class="order-id">🆔 #ORDER-${order.id}</span>
                        <span class="order-date">📅 ${order.date}</span>
                        <span style="background:var(--gold);padding:2px 10px;border-radius:20px;font-size:0.7rem;color:var(--dark);">${order.status === 'pending' ? '⏳ Menunggu' : '✅ Selesai'}</span>
                    </div>
                    <div class="order-customer">
                        <strong>👤 ${order.userName}</strong> (${order.userEmail})
                    </div>
                    <div class="order-address" style="background:#f5f5f5;padding:8px 12px;border-radius:8px;margin:8px 0;font-size:0.85rem;">
                        📍 ${order.userAddress}
                    </div>
                    <div class="order-items" style="font-size:0.85rem;">
                        <strong>🛍️ Pesanan:</strong>
                        <ul style="margin-left:20px;margin-top:5px;">
                            ${order.items.map(item => `<li>${item.name} x ${item.quantity} = Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="order-total" style="font-weight:700;color:var(--gold);text-align:right;margin-top:10px;font-size:1.1rem;">
                        💰 Total: Rp ${order.total.toLocaleString('id-ID')}
                    </div>
                </div>
            `).join('');
        }
    }
    
    // 4. Users List (tanpa password)
    const usersContainer = document.getElementById('usersList');
    if (usersContainer) {
        usersContainer.innerHTML = usersData.map(user => `
            <div class="user-card" style="display:flex;justify-content:space-between;align-items:center;padding:12px;background:#f5f5f5;border-radius:8px;margin-bottom:10px;">
                <div class="user-info">
                    <h4 style="font-size:0.95rem;">${user.name}</h4>
                    <p style="font-size:0.8rem;color:var(--gray);"><i class="fas fa-envelope"></i> ${user.email}</p>
                    <p style="font-size:0.8rem;color:var(--gray);"><i class="fas fa-map-marker-alt"></i> ${user.address || 'Belum diisi'}</p>
                    <p style="font-size:0.7rem;color:var(--gray);"><i class="far fa-calendar"></i> Bergabung: ${user.joined}</p>
                </div>
                <div class="user-role" style="background:var(--gold);padding:4px 12px;border-radius:20px;font-size:0.7rem;font-weight:600;color:var(--dark);">
                    ${user.role === 'admin' ? '👑 Admin' : '👤 User'}
                </div>
            </div>
        `).join('');
    }
}

// Simple Chart tanpa Chart.js (pasti jalan)
function drawSimpleChart(ordersData) {
    const canvas = document.getElementById('adminChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const w = canvas.width || 400;
    const h = canvas.height || 200;
    
    ctx.clearRect(0, 0, w, h);
    
    // Data dummy untuk chart (6 bulan terakhir)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'];
    const salesData = [85, 110, 135, 160, 190, 220];
    const maxVal = Math.max(...salesData) + 50;
    
    // Grid
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 5; i++) {
        const y = h - 20 - (i * (h - 40) / 5);
        ctx.beginPath();
        ctx.moveTo(40, y);
        ctx.lineTo(w - 10, y);
        ctx.stroke();
        ctx.fillStyle = '#999';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(Math.round(maxVal * i / 5 / 10) * 10 + 'Jt', 35, y + 3);
    }
    
    // Area chart
    ctx.beginPath();
    ctx.moveTo(40, h - 20);
    for (let i = 0; i < salesData.length; i++) {
        const x = 40 + (i * (w - 60) / (salesData.length - 1));
        const y = h - 20 - ((salesData[i] / maxVal) * (h - 40));
        if (i === 0) ctx.lineTo(x, y);
        else {
            const prevX = 40 + ((i - 1) * (w - 60) / (salesData.length - 1));
            const prevY = h - 20 - ((salesData[i - 1] / maxVal) * (h - 40));
            ctx.lineTo((prevX + x) / 2, prevY);
            ctx.lineTo((prevX + x) / 2, y);
        }
    }
    ctx.lineTo(40 + (salesData.length - 1) * (w - 60) / (salesData.length - 1), h - 20);
    ctx.closePath();
    ctx.fillStyle = 'rgba(212, 175, 55, 0.2)';
    ctx.fill();
    
    // Line chart
    ctx.beginPath();
    for (let i = 0; i < salesData.length; i++) {
        const x = 40 + (i * (w - 60) / (salesData.length - 1));
        const y = h - 20 - ((salesData[i] / maxVal) * (h - 40));
        if (i === 0) ctx.moveTo(x, y);
        else {
            const prevX = 40 + ((i - 1) * (w - 60) / (salesData.length - 1));
            const prevY = h - 20 - ((salesData[i - 1] / maxVal) * (h - 40));
            ctx.bezierCurveTo((prevX + x) / 2, prevY, (prevX + x) / 2, y, x, y);
        }
    }
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Labels
    ctx.fillStyle = '#666';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    for (let i = 0; i < salesData.length; i++) {
        const x = 40 + (i * (w - 60) / (salesData.length - 1));
        ctx.fillText(months[i], x, h - 5);
    }
    
    // Points
    for (let i = 0; i < salesData.length; i++) {
        const x = 40 + (i * (w - 60) / (salesData.length - 1));
        const y = h - 20 - ((salesData[i] / maxVal) * (h - 40));
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#D4AF37';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

// ==================== EVENT LISTENERS ====================

// User dropdown
document.getElementById('userBtn')?.addEventListener('click', () => {
    if (!currentUser) {
        openAuthModal();
    } else {
        document.getElementById('userDropdown').classList.toggle('active');
    }
});

// Cart button
document.getElementById('cartBtn')?.addEventListener('click', () => {
    if (!currentUser) {
        showNotification('Silakan login terlebih dahulu!', 'warning');
        openAuthModal();
        return;
    }
    renderCart();
    document.getElementById('cartModal').classList.add('active');
});

// Profile menu
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

// Settings menu
document.getElementById('settingsMenuBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('settingsModal').classList.add('active');
    document.getElementById('userDropdown').classList.remove('active');
});

// ADMIN PANEL BUTTON - PASTI BISA DI KLIK!
document.getElementById('adminMenuBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('🔑 Admin Panel diklik!');
    openAdminPanel();
    document.getElementById('userDropdown').classList.remove('active');
});

// Dark mode
document.getElementById('darkModeBtn')?.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const icon = document.querySelector('#darkModeBtn i');
    if (icon) {
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    }
});

document.getElementById('settingsDarkBtn')?.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const icon = document.querySelector('#darkModeBtn i');
    if (icon) {
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    }
});

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

document.querySelectorAll('.nav-link, .footer-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.getAttribute('data-page');
        if (page) showPage(page);
        document.getElementById('navMenu')?.classList.remove('active');
    });
});

// BELANJA SEKARANG - SCROLL KE PRODUK
document.getElementById('shopBtn')?.addEventListener('click', () => {
    const productsSection = document.getElementById('productsSection');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
    }
});

// Hamburger
document.getElementById('hamburgerBtn')?.addEventListener('click', () => {
    document.getElementById('navMenu').classList.toggle('active');
});

// Contact form
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

// Tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        const tabId = btn.dataset.tab + 'Tab';
        const tabContent = document.getElementById(tabId);
        if (tabContent) tabContent.classList.add('active');
    });
});

// Admin tabs
document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.admin-tab-btn').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.admin-tab-content').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        const tabId = `admin${btn.dataset.adminTab.charAt(0).toUpperCase() + btn.dataset.adminTab.slice(1)}Tab`;
        const tabContent = document.getElementById(tabId);
        if (tabContent) tabContent.classList.add('active');
    });
});

// Click outside
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
    console.log('🚀 Website Luxury Bags Dimulai!');
    initDatabase();
    renderProducts();
    
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
    
    // Loading screen cepat
    setTimeout(() => {
        const loader = document.getElementById('loadingScreen');
        if (loader) {
            loader.classList.add('hide');
            setTimeout(() => loader.style.display = 'none', 300);
        }
    }, 500);
    
    console.log('✅ Website siap!');
    console.log('🔐 Login Admin: admin@daniel.com / admin123');
});
