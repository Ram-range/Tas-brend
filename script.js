// ==================== DATABASE (LocalStorage) ====================
// Inisialisasi Database
if (!localStorage.getItem('users')) {
    const defaultUsers = [
        { id: 1, name: "Admin Daniel", email: "admin@daniel.com", password: "admin123", role: "admin", address: "Jakarta", joined: "2024-01-01" }
    ];
    localStorage.setItem('users', JSON.stringify(defaultUsers));
}

if (!localStorage.getItem('orders')) {
    localStorage.setItem('orders', JSON.stringify([]));
}

let users = JSON.parse(localStorage.getItem('users'));
let orders = JSON.parse(localStorage.getItem('orders'));

// ==================== DATA PRODUK ====================
const products = [
    { id: 1, name: "Hermès Birkin 30", brand: "HERMÈS", price: 325000000, desc: "Tas tangan mewah ikonik", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=280&fit=crop" },
    { id: 2, name: "Chanel Classic Flap", brand: "CHANEL", price: 185000000, desc: "Classic Flap dengan quilted leather", image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&h=280&fit=crop" },
    { id: 3, name: "Louis Vuitton Neverfull", brand: "LOUIS VUITTON", price: 28500000, desc: "Tas tote spacious", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=280&fit=crop" },
    { id: 4, name: "Gucci Dionysus", brand: "GUCCI", price: 32500000, desc: "Tas dengan closure tiger head", image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400&h=280&fit=crop" },
    { id: 5, name: "Prada Saffiano", brand: "PRADA", price: 22800000, desc: "Tas kulit saffiano elegan", image: "https://images.unsplash.com/photo-1584278860047-22db9ff82bed?w=400&h=280&fit=crop" },
    { id: 6, name: "Dior Lady Dior", brand: "DIOR", price: 125000000, desc: "Tas ikonik dengan quilting", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=280&fit=crop" },
    { id: 7, name: "YSL Cassandra", brand: "SAINT LAURENT", price: 32500000, desc: "Tas flap logo YSL", image: "https://images.unsplash.com/photo-1591561954555-6c640d980efe?w=400&h=280&fit=crop" },
    { id: 8, name: "Fendi Baguette", brand: "FENDI", price: 42500000, desc: "Tas Baguette klasik", image: "https://images.unsplash.com/photo-1566473965997-3de9c817e938?w=400&h=280&fit=crop" },
    { id: 9, name: "Celine Triomphe", brand: "CELINE", price: 48500000, desc: "Tas dengan logo Triomphe", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=280&fit=crop" },
    { id: 10, name: "Bottega Cassette", brand: "BOTTEGA VENETA", price: 52000000, desc: "Tas anyaman leather", image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&h=280&fit=crop" },
    { id: 11, name: "Loewe Puzzle", brand: "LOEWE", price: 39800000, desc: "Tas desain puzzle unik", image: "https://images.unsplash.com/photo-1591561954555-6c640d980efe?w=400&h=280&fit=crop" },
    { id: 12, name: "Goyard St. Louis", brand: "GOYARD", price: 28500000, desc: "Tas tote motif Chevron", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=280&fit=crop" },
    { id: 13, name: "Miu Miu Wander", brand: "MIU MIU", price: 22900000, desc: "Desain playful elegant", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=280&fit=crop" },
    { id: 14, name: "Balenciaga City", brand: "BALENCIAGA", price: 27500000, desc: "Tas motor edgy", image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400&h=280&fit=crop" },
    { id: 15, name: "Givenchy Antigona", brand: "GIVENCHY", price: 35800000, desc: "Tas structured silhouette", image: "https://images.unsplash.com/photo-1584278860047-22db9ff82bed?w=400&h=280&fit=crop" },
    { id: 16, name: "Coach Tabby", brand: "COACH", price: 5500000, desc: "Tas flap modern", image: "https://images.unsplash.com/photo-1566473965997-3de9c817e938?w=400&h=280&fit=crop" },
    { id: 17, name: "Michael Kors Jet Set", brand: "MICHAEL KORS", price: 4250000, desc: "Tas tote casual", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=280&fit=crop" }
];

// ==================== GLOBAL STATE ====================
let currentUser = null;
let cart = [];

// ==================== LOADING ====================
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loadingScreen');
        loader.classList.add('hide');
        setTimeout(() => loader.style.display = 'none', 300);
    }, 1000);
    
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        document.getElementById('dropdownUserName').innerText = currentUser.name || currentUser.email;
        const savedCart = localStorage.getItem(`cart_${currentUser.id}`);
        if (savedCart) {
            cart = JSON.parse(savedCart);
        }
    }
    updateCartBadge();
    renderProducts();
    showPage('home');
    updateDbStats();
});

// ==================== NOTIFICATION ====================
function showNotification(message, type = 'success') {
    const toast = document.getElementById('notificationToast');
    let icon = type === 'success' ? '<i class="fas fa-check-circle"></i>' : 
               type === 'error' ? '<i class="fas fa-times-circle"></i>' : 
               '<i class="fas fa-exclamation-triangle"></i>';
    
    toast.innerHTML = `${icon} ${message}`;
    toast.className = `notification-toast ${type} show`;
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// ==================== DATABASE MANAGEMENT ====================
function updateDbStats() {
    const stats = document.getElementById('dbStats');
    if (stats) {
        const usersCount = JSON.parse(localStorage.getItem('users') || '[]').length;
        const ordersCount = JSON.parse(localStorage.getItem('orders') || '[]').length;
        stats.innerHTML = `${usersCount} User | ${ordersCount} Order`;
    }
}

// EXPORT DATABASE
document.getElementById('exportDataBtn')?.addEventListener('click', () => {
    const dbData = {
        users: JSON.parse(localStorage.getItem('users') || '[]'),
        orders: JSON.parse(localStorage.getItem('orders') || '[]'),
        exportedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(dbData, null, 2);
    const blob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `luxurybags_backup_${new Date().toISOString().slice(0,19).replace(/:/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showNotification('Database berhasil diekspor!', 'success');
});

// IMPORT DATABASE
document.getElementById('importFileInput')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const importedData = JSON.parse(event.target.result);
            if (importedData.users) {
                localStorage.setItem('users', JSON.stringify(importedData.users));
            }
            if (importedData.orders) {
                localStorage.setItem('orders', JSON.stringify(importedData.orders));
            }
            showNotification('Database berhasil diimport! Halaman akan di-refresh.', 'success');
            setTimeout(() => location.reload(), 1500);
        } catch (err) {
            showNotification('File tidak valid!', 'error');
        }
    };
    reader.readAsText(file);
    e.target.value = '';
});

// RESET DATABASE
document.getElementById('resetDataBtn')?.addEventListener('click', () => {
    if (confirm('⚠️ PERINGATAN: Ini akan menghapus SEMUA data pengguna dan pesanan!\nAdmin default akan tetap ada.\n\nYakin ingin melanjutkan?')) {
        const defaultUsers = [
            { id: 1, name: "Admin Daniel", email: "admin@daniel.com", password: "admin123", role: "admin", address: "Jakarta", joined: new Date().toLocaleDateString('id-ID') }
        ];
        localStorage.setItem('users', JSON.stringify(defaultUsers));
        localStorage.setItem('orders', JSON.stringify([]));
        
        // Hapus semua cart user
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('cart_')) {
                localStorage.removeItem(key);
            }
        }
        
        localStorage.removeItem('currentUser');
        showNotification('Database telah direset! Halaman akan di-refresh.', 'warning');
        setTimeout(() => location.reload(), 1500);
    }
});

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
    document.getElementById('cartBadge').innerText = total;
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
        btn.addEventListener('click', () => cancelOrder(parseInt(btn.dataset.id)));
    });
}

function cancelOrder(id) {
    const product = cart.find(item => item.id === id);
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem(`cart_${currentUser.id}`, JSON.stringify(cart));
    updateCartBadge();
    renderCart();
    showNotification(`${product.name} dibatalkan`, 'warning');
}

// ==================== AUTHENTICATION ====================
function openAuthModal() {
    document.getElementById('authModal').classList.add('active');
}

document.getElementById('doLoginBtn')?.addEventListener('click', () => {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showNotification('Harap isi email dan password!', 'error');
        return;
    }
    
    const user = users.find(u => u.email === email && u.password === password);
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
    
    if (users.find(u => u.email === email)) {
        showNotification('Email sudah terdaftar!', 'error');
        return;
    }
    
    const newUser = { 
        id: users.length + 1,
        name, email, password, address,
        role: 'user', 
        joined: new Date().toLocaleDateString('id-ID') 
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    document.getElementById('dropdownUserName').innerText = name;
    cart = [];
    localStorage.setItem(`cart_${newUser.id}`, JSON.stringify(cart));
    
    document.getElementById('authModal').classList.remove('active');
    showNotification(`Pendaftaran berhasil!`, 'success');
    location.reload();
});

document.getElementById('logoutMenuBtn')?.addEventListener('click', () => {
    currentUser = null;
    localStorage.removeItem('currentUser');
    cart = [];
    document.getElementById('dropdownUserName').innerText = 'Guest';
    document.getElementById('userDropdown').classList.remove('active');
    showNotification('Anda telah logout', 'warning');
    location.reload();
});

// ==================== CHECKOUT DENGAN ALAMAT ====================
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
    
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const newOrder = {
        id: orders.length + 1,
        userId: currentUser.id,
        userName: currentUser.name,
        userEmail: currentUser.email,
        userAddress: address,
        items: [...cart],
        total: cart.reduce((sum, i) => sum + (i.price * i.quantity), 0),
        date: new Date().toLocaleString('id-ID'),
        status: 'pending'
    };
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    showNotification('🎉 Pesanan berhasil! Cek Admin Panel untuk detail.', 'success');
    
    cart = [];
    localStorage.setItem(`cart_${currentUser.id}`, JSON.stringify(cart));
    updateCartBadge();
    renderCart();
    document.getElementById('orderAddress').value = '';
    document.getElementById('cartModal').classList.remove('active');
    updateDbStats();
});

// ==================== ADMIN PANEL ====================
document.getElementById('adminMenuBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentUser?.role === 'admin') {
        updateAdminDashboard();
        document.getElementById('adminModal').classList.add('active');
    } else {
        showNotification('🔐 Akses Admin khusus administrator!', 'error');
    }
    document.getElementById('userDropdown').classList.remove('active');
});

function updateAdminDashboard() {
    const usersData = JSON.parse(localStorage.getItem('users') || '[]');
    const ordersData = JSON.parse(localStorage.getItem('orders') || '[]');
    
    document.getElementById('statUsers').innerText = usersData.length;
    document.getElementById('statProducts').innerText = products.length;
    document.getElementById('statOrders').innerText = ordersData.length;
    const totalRevenue = ordersData.reduce((sum, order) => sum + order.total, 0);
    document.getElementById('statRevenue').innerText = totalRevenue.toLocaleString('id-ID');
    
    const ctx = document.getElementById('adminChart')?.getContext('2d');
    if (ctx) {
        if (window.adminChart) window.adminChart.destroy();
        window.adminChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
                datasets: [{ label: 'Penjualan (Rp Juta)', data: [85, 110, 135, 160, 190, 220], borderColor: '#D4AF37', tension: 0.3, fill: false }]
            }
        });
    }
    
    const ordersContainer = document.getElementById('ordersList');
    if (ordersContainer) {
        if (ordersData.length === 0) {
            ordersContainer.innerHTML = '<p style="text-align:center;padding:30px;">Belum ada pesanan</p>';
        } else {
            ordersContainer.innerHTML = ordersData.map(order => `
                <div class="order-card">
                    <div class="order-header">
                        <span class="order-id">#ORDER-${order.id}</span>
                        <span class="order-date"><i class="far fa-calendar"></i> ${order.date}</span>
                    </div>
                    <div class="order-customer">
                        <strong><i class="fas fa-user"></i> ${order.userName}</strong> (${order.userEmail})
                    </div>
                    <div class="order-address">
                        <i class="fas fa-map-marker-alt"></i> ${order.userAddress}
                    </div>
                    <div class="order-items">
                        <strong>Pesanan:</strong>
                        <ul style="margin-left:20px; margin-top:5px;">
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

// ==================== MODAL & NAVIGASI ====================
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

document.getElementById('settingsMenuBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    updateDbStats();
    document.getElementById('settingsModal').classList.add('active');
    document.getElementById('userDropdown').classList.remove('active');
});

// Admin tabs
document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.admin-tab-btn').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.admin-tab-content').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(`admin${btn.dataset.adminTab.charAt(0).toUpperCase() + btn.dataset.adminTab.slice(1)}Tab`).classList.add('active');
    });
});

// Dark mode
document.getElementById('darkModeBtn')?.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const icon = document.querySelector('#darkModeBtn i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});

document.getElementById('settingsDarkBtn')?.addEventListener('click', () => {
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

// Page navigation
function showPage(pageId) {
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.querySelector(`.nav-link[data-page="${pageId}"]`).classList.add('active');
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

window.addEventListener('click', (e) => {
    if (!e.target.closest('#userBtn') && !e.target.closest('#userDropdown')) {
        document.getElementById('userDropdown')?.classList.remove('active');
    }
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});
