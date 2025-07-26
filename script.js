// Global variables
let cart = [];
let isLoggedIn = false;
let currentUser = null;

// Vanquish Toys product data
const products = [
    {
        id: 1,
        name: "VT MG3",
        description: "High-performance tactical MG3 with authentic design and superior build quality. Features realistic details and smooth operation for tactical enthusiasts.",
        price: 37.99,
        image: "Images/ProductPhotos/VTMG3/Screenshot 2025-07-26 152831.png",
        category: "machine-guns"
    },
    {
        id: 2,
        name: "VT SNUBBY",
        description: "Compact and powerful VT SNUBBY pistol with exceptional accuracy and reliable performance. Perfect for close-quarters tactical scenarios.",
        price: 18.99,
        image: "Images/ProductPhotos/VTSNUBBY/Screenshot 2025-07-26 152739.png",
        category: "pistols"
    },
    {
        id: 3,
        name: "VT479",
        description: "Precision-engineered VT479 tactical rifle with advanced features and superior accuracy. Designed for professional tactical applications.",
        price: 20.99,
        image: "Images/ProductPhotos/VT479/Screenshot 2025-07-26 152649.png",
        category: "rifles"
    },
    {
        id: 4,
        name: "VT ARX",
        description: "Innovative VT ARX assault rifle with cutting-edge design and exceptional reliability. Features modular construction for maximum versatility.",
        price: 35.99,
        image: "Images/ProductPhotos/VT ARX/Screenshot 2025-07-26 152537.png",
        category: "assault-rifles"
    },
    {
        id: 5,
        name: "VT G17XL",
        description: "Extended range VT G17XL pistol with enhanced accuracy and extended barrel design. Perfect for precision shooting and tactical training.",
        price: 19.99,
        image: "Images/ProductPhotos/VTG17XL/Screenshot 2025-07-26 154721.png",
        category: "pistols"
    }
];

// DOM Elements
const accountBtn = document.getElementById('accountBtn');
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const accountModal = document.getElementById('accountModal');
const cartModal = document.getElementById('cartModal');
const closeAccount = document.getElementById('closeAccount');
const closeCart = document.getElementById('closeCart');
const productGrid = document.getElementById('productGrid');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

// Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Load products
    loadProducts();
    
    // Load cart from localStorage
    loadCart();
    
    // Update cart count
    updateCartCount();
});

// Product Management
function loadProducts() {
    productGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: contain;">
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">£${product.price.toFixed(2)}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `;
    
    return card;
}

// Cart Management
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartCount();
    showNotification('Product added to cart!');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    updateCartDisplay();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartCount();
            updateCartDisplay();
        }
    }
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function updateCartDisplay() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666;">Your cart is empty</p>';
        cartTotal.textContent = '0.00';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: contain;">
            </div>
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">£${item.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    });
    
    cartTotal.textContent = total.toFixed(2);
}

function saveCart() {
    localStorage.setItem('vanquishCart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('vanquishCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Modal Management
accountBtn.addEventListener('click', () => {
    accountModal.style.display = 'block';
});

cartBtn.addEventListener('click', () => {
    cartModal.style.display = 'block';
    updateCartDisplay();
});

closeAccount.addEventListener('click', () => {
    accountModal.style.display = 'none';
});

closeCart.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === accountModal) {
        accountModal.style.display = 'none';
    }
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// Authentication
const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form');

authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.getAttribute('data-tab');
        
        // Update active tab
        authTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Show corresponding form
        authForms.forEach(form => {
            form.classList.remove('active');
            if (form.id === `${targetTab}Form`) {
                form.classList.add('active');
            }
        });
    });
});

// Login form
document.getElementById('loginFormElement').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;
    
    // Simple validation - in a real app, you'd validate against a backend
    if (email && password) {
        isLoggedIn = true;
        currentUser = { email, name: email.split('@')[0] };
        accountModal.style.display = 'none';
        showNotification('Successfully logged in!');
        updateAccountButton();
        e.target.reset();
    } else {
        showNotification('Please fill in all fields', 'error');
    }
});

// Register form
document.getElementById('registerFormElement').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = e.target.querySelector('input[type="text"]').value;
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelectorAll('input[type="password"]')[0].value;
    const confirmPassword = e.target.querySelectorAll('input[type="password"]')[1].value;
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    if (name && email && password) {
        isLoggedIn = true;
        currentUser = { email, name };
        accountModal.style.display = 'none';
        showNotification('Account created successfully!');
        updateAccountButton();
        e.target.reset();
    } else {
        showNotification('Please fill in all fields', 'error');
    }
});

function updateAccountButton() {
    if (isLoggedIn) {
        accountBtn.innerHTML = '<i class="fas fa-user-check"></i>';
        accountBtn.title = `Logged in as ${currentUser.name}`;
    } else {
        accountBtn.innerHTML = '<i class="fas fa-user"></i>';
        accountBtn.title = 'Login/Register';
    }
}

// Checkout
checkoutBtn.addEventListener('click', () => {
    if (!isLoggedIn) {
        cartModal.style.display = 'none';
        accountModal.style.display = 'block';
        showNotification('Please login to checkout', 'error');
        return;
    }
    
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }
    
    // Show basket review before checkout
    showBasketReview();
});

// Basket Review Functionality
function showBasketReview() {
    // Close cart modal
    cartModal.style.display = 'none';
    
    // Create basket review modal
    const basketModal = document.createElement('div');
    basketModal.className = 'modal';
    basketModal.id = 'basketModal';
    basketModal.style.display = 'block';
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 5.99;
    const finalTotal = total + shipping;
    
    basketModal.innerHTML = `
        <div class="modal-content basket-modal">
            <span class="close" id="closeBasket">&times;</span>
            <h3>Review Your Basket</h3>
            <div class="basket-items" id="basketItems">
                ${cart.map(item => `
                    <div class="basket-item">
                        <div class="basket-item-image">
                            <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: contain;">
                        </div>
                        <div class="basket-item-info">
                            <div class="basket-item-title">${item.name}</div>
                            <div class="basket-item-details">
                                <span class="basket-item-price">£${item.price.toFixed(2)}</span>
                                <span class="basket-item-quantity">Qty: ${item.quantity}</span>
                            </div>
                        </div>
                        <div class="basket-item-total">
                            £${(item.price * item.quantity).toFixed(2)}
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="basket-summary">
                <div class="summary-row">
                    <span>Subtotal:</span>
                    <span>£${total.toFixed(2)}</span>
                </div>
                <div class="summary-row">
                    <span>Shipping:</span>
                    <span>£${shipping.toFixed(2)}</span>
                </div>
                <div class="summary-row total">
                    <span>Total:</span>
                    <span>£${finalTotal.toFixed(2)}</span>
                </div>
            </div>
            <div class="basket-actions">
                <button class="back-to-cart-btn" id="backToCart">Back to Cart</button>
                <button class="proceed-checkout-btn" id="proceedCheckout">Proceed to Checkout</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(basketModal);
    
    // Add event listeners
    document.getElementById('closeBasket').addEventListener('click', () => {
        document.body.removeChild(basketModal);
    });
    
    document.getElementById('backToCart').addEventListener('click', () => {
        document.body.removeChild(basketModal);
        cartModal.style.display = 'block';
        updateCartDisplay();
    });
    
    document.getElementById('proceedCheckout').addEventListener('click', () => {
        document.body.removeChild(basketModal);
        proceedToCheckout();
    });
    
    // Close modal when clicking outside
    basketModal.addEventListener('click', (e) => {
        if (e.target === basketModal) {
            document.body.removeChild(basketModal);
        }
    });
}

function proceedToCheckout() {
    // In a real app, this would redirect to a payment processor
    showNotification('Redirecting to checkout...', 'success');
    setTimeout(() => {
        alert('Checkout functionality would be implemented here with a payment processor like Stripe or PayPal.');
    }, 1000);
}

// Utility Functions
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: ${type === 'error' ? '#ff4444' : '#87CEEB'};
        color: ${type === 'error' ? '#ffffff' : '#000000'};
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Scroll spy for navigation
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Initialize
updateAccountButton(); 