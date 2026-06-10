// ==================== DATA PRODUK 17 TAS MEWAH DENGAN FOTO UNIK ====================
const products = [
    { id: 1, name: "Hermès Birkin 30", brand: "HERMÈS", price: 325000000, desc: "Tas tangan mewah ikonik, kulit Togo premium", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=280&fit=crop" },
    { id: 2, name: "Chanel Classic Flap", brand: "CHANEL", price: 185000000, desc: "Classic Flap dengan quilted leather dan chain strap emas", image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&h=280&fit=crop" },
    { id: 3, name: "Louis Vuitton Neverfull", brand: "LOUIS VUITTON", price: 28500000, desc: "Tas tote spacious dengan canvas monogram iconic", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=280&fit=crop" },
    { id: 4, name: "Gucci Dionysus", brand: "GUCCI", price: 32500000, desc: "Tas dengan closure tiger head signature, sangat elegan", image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400&h=280&fit=crop" },
    { id: 5, name: "Prada Saffiano", brand: "PRADA", price: 22800000, desc: "Tas kulit saffiano elegan dengan hardware gold", image: "https://images.unsplash.com/photo-1584278860047-22db9ff82bed?w=400&h=280&fit=crop" },
    { id: 6, name: "Dior Lady Dior", brand: "DIOR", price: 125000000, desc: "Tas ikonik dengan quilting cannage dan charm DIOR", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=280&fit=crop" },
    { id: 7, name: "YSL Cassandra", brand: "SAINT LAURENT", price: 32500000, desc: "Tas flap dengan logo YSL besar yang statement", image: "https://images.unsplash.com/photo-1591561954555-6c640d980efe?w=400&h=280&fit=crop" },
    { id: 8, name: "Fendi Baguette", brand: "FENDI", price: 42500000, desc: "Tas Baguette klasik dengan FF logo iconic", image: "https://images.unsplash.com/photo-1566473965997-3de9c817e938?w=400&h=280&fit=crop" },
    { id: 9, name: "Celine Triomphe", brand: "CELINE", price: 48500000, desc: "Tas dengan logo Triomphe yang chic dan minimalis", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=280&fit=crop" },
    { id: 10, name: "Bottega Cassette", brand: "BOTTEGA VENETA", price: 52000000, desc: "Tas anyaman leather signature BV, sangat stylish", image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&h=280&fit=crop" },
    { id: 11, name: "Loewe Puzzle", brand: "LOEWE", price: 39800000, desc: "Tas dengan desain puzzle unik dan geometris", image: "https://images.unsplash.com/photo-1591561954555-6c640d980efe?w=400&h=280&fit=crop" },
    { id: 12, name: "Goyard St. Louis", brand: "GOYARD", price: 28500000, desc: "Tas tote mewah dengan motif Chevron hand-painted", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=280&fit=crop" },
    { id: 13, name: "Miu Miu Wander", brand: "MIU MIU", price: 22900000, desc: "Tas dengan desain playful namun tetap elegant", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=280&fit=crop" },
    { id: 14, name: "Balenciaga City", brand: "BALENCIAGA", price: 27500000, desc: "Tas motor edgy iconic dengan studs", image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400&h=280&fit=crop" },
    { id: 15, name: "Givenchy Antigona", brand: "GIVENCHY", price: 35800000, desc: "Tas structured dengan silhouette tegas dan mewah", image: "https://images.unsplash.com/photo-1584278860047-22db9ff82bed?w=400&h=280&fit=crop" },
    { id: 16, name: "Coach Tabby", brand: "COACH", price: 5500000, desc: "Tas flap dengan desain modern dan vintage vibe", image: "https://images.unsplash.com/photo-1566473965997-3de9c817e938?w=400&h=280&fit=crop" },
    { id: 17, name: "Michael Kors Jet Set", brand: "MICHAEL KORS", price: 4250000, desc: "Tas tote casual mewah untuk sehari-hari", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=280&fit=crop" }
];

// ==================== GLOBAL STATE ====================
let currentUser = null;
let cart = [];
let users = JSON.parse(localStorage.getItem('users')) || [];
let chartInstance = null;

// ==================== LOADING CEPAT ====================
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loadingScreen');
        loader.classList.add('hide');
        setTimeout(() => loader.style.display = 'none', 300);
    }, 1000); // Cuma 1 detik
});

// ==================== NOTIFICATION ====================
function showNotification(message, type = 'success') {
    const toast = document.getElementById('notificationToast');
    let icon = '';
    if (type === 'success') icon = '<i class="fas fa-check-circle"></i>';
    if (type === 'error') icon = '<i class="fas fa-times-circle"></i>';
    if (type === 'warning') icon = '<i class="fas fa-exclamation-triangle"></i>';
    
    toast.innerHTML = `${icon} ${message}`;
    toast.className = `notification-toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ==================== LOAD SAVED DATA ====================
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
            <div class="product-image" style="background-image: url('${p.image}'); background-size: cover; background-position: center;">
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
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity++;
        showNotification(`Jumlah ${product.name} ditambah!`, 'success');
    } else {
        cart.push({ ...product, quantity: 1 });
        showNotification(`${product.name} ditambahkan!`, 'success');
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
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
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            cancelOrder(id);
        });
    });
}

function cancelOrder(id) {
    const product = cart.find(item => item.id === id);
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    renderCart();
    showNotification(`${product.name} dibatalkan`, 'warning');
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
    
    if (!email || !password) {
        showNotification('Harap isi email dan password!', 'error');
        return;
    }
    
    // ADMIN LOGIN - KHUSUS ADMIN SAJA
    if (email === 'admin@daniel.com' && password === 'admin123') {
        currentUser = { email: 'admin@daniel.com', name: 'Administrator', role: 'admin' };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        document.getElementById('dropdownUserName').innerText = 'Administrator';
        closeAuthModal();
        showNotification('Selamat datang, Admin!', 'success');
        location.reload();
        return;
    }
    
    // USER BIASA - TIDAK BISA JADI ADMIN
    const user = users.find(u => u.email === email && u.password === password);
    if (user && user.role !== 'admin') {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        document.getElementById('dropdownUserName').innerText = user.name;
        closeAuthModal();
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
    
    if (!name || !email || !password) {
        showNotification('Harap isi semua field!', 'error');
        return;
    }
    
    if (users.find(u => u.email === email)) {
        showNotification('Email sudah terdaftar!', 'error');
        return;
    }
    
    // USER BIASA SAJA, TIDAK BISA JADI ADMIN
    const newUser = { name, email, password, role: 'user', joined: new Date().toLocaleDateString('id-ID') };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    document.getElementById('dropdownUserName').innerText = name;
    closeAuthModal();
    showNotification(`Pendaftaran berhasil! Selamat datang, ${name}!`, 'success');
    location.reload();
});

document.getElementById('logoutMenuBtn')?.addEventListener('click', () => {
    currentUser = null;
    localStorage.removeItem('currentUser');
    document.getElementById('dropdownUserName').innerText = 'Guest';
    document.getElementById('userDropdown').classList.remove('active');
    showNotification('Anda telah logout', 'warning');
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
        document.getElementById('profileSince').innerText = currentUser.joined || '2026';
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
    if (currentUser?.role === 'admin') {
        updateAdminStats();
        document.getElementById('adminModal').classList.add('active');
    } else {
        showNotification('🔐 Akses Admin khusus administrator! Login dengan admin@daniel.com / admin123', 'error');
    }
    document.getElementById('userDropdown').classList.remove('active');
});

function updateAdminStats() {
    document.getElementById('statUsers').innerText = users.length;
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
                datasets: [{ label: 'Penjualan (Rp Juta)', data: [85, 110, 135, 160, 190, 220], borderColor: '#D4AF37', tension: 0.3, fill: false }]
            },
            options: { responsive: true, maintainAspectRatio: true }
        });
    }
}

// Close modals
const closeButtons = ['closeAuthModal', 'closeProfileModal', 'closeSettingsModal', 'closeAdminModal', 'closeCartModal', 'closeProfileBtn', 'closeSettingsBtn', 'closeAdminBtn'];
closeButtons.forEach(id => {
    document.getElementById(id)?.addEventListener('click', () => {
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

// ==================== NAVIGASI ====================
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
        document.getElementById('navMenu')?.classList.remove('active');
    });
});

document.getElementById('shopBtn')?.addEventListener('click', () => {
    showPage('home');
    document.getElementById('productsSection').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('checkoutBtn')?.addEventListener('click', () => {
    if (cart.length === 0) {
        showNotification('Keranjang kosong!', 'warning');
        return;
    }
    showNotification('🎉 Terima kasih! Pesanan diproses.', 'success');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    renderCart();
    document.getElementById('cartModal').classList.remove('active');
});

// ==================== HAMBURGER MENU ====================
document.getElementById('hamburgerBtn')?.addEventListener('click', () => {
    document.getElementById('navMenu').classList.toggle('active');
});

// Close dropdown klik di luar
window.addEventListener('click', (e) => {
    if (!e.target.closest('#userBtn') && !e.target.closest('#userDropdown')) {
        document.getElementById('userDropdown')?.classList.remove('active');
    }
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
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

// Auth tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.tab + 'Tab').classList.add('active');
    });
});

// ==================== INIT ====================
renderProducts();
showPage('home');
updateCartBadge();
