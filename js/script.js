document.addEventListener('DOMContentLoaded', function () {
    // Preloader add in this preloder time
    const preloader = document.querySelector('.preloader');
    if (preloader) {

        setTimeout(() => {
            preloader.style.display = 'none';
        }, 2000);
    }
    // const preloader = document.querySelector('.preloader');
    // if (preloader) {
    //     window.addEventListener('load', function () {
    //         preloader.style.display = 'none';
    //     });
    // }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function () {
            mobileMenu.classList.add('active');
        });

        mobileMenuClose.addEventListener('click', function () {
            mobileMenu.classList.remove('active');
        });
    }

    // Search Functionality
    const searchBtn = document.querySelector('.search-btn');
    const searchPopup = document.querySelector('.search-popup');
    const searchPopupClose = document.querySelector('.search-popup-close');
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-form input');
    const searchResults = document.querySelector('.search-results');

    // Sample product data (replace with your actual product data)
    const products = [
        { id: 1, name: 'iPhone 14 Pro', price: 999, category: 'Smartphones', image: 'img/iPhone14pro.png' },
        { id: 2, name: 'Samsung Galaxy S23', price: 799, category: 'Smartphones', image: 'img/samsung-galaxy-s23-ultra.png' },
        { id: 3, name: 'Google Pixel 7', price: 599, category: 'Smartphones', image: 'img/google-pixel-7-pro.png' },
        { id: 4, name: 'OnePlus 11', price: 249, category: 'Smartphones', image: 'img/oneplus-11.png' },
        { id: 5, name: 'Apple Watch Series 8', price: 399, category: 'Wearables', image: 'img/apple-watch-series-8.jpg' },

    ];

    // Toggle search popup
    if (searchBtn && searchPopup) {
        searchBtn.addEventListener('click', function (e) {
            e.preventDefault();
            searchPopup.classList.add('active');
            searchInput.focus();
        });

        searchPopupClose.addEventListener('click', function () {
            searchPopup.classList.remove('active');
        });
    }

    // Handle search form submission
    if (searchForm) {
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            performSearch(searchInput.value.trim());
        });

        // Live search as user types
        searchInput.addEventListener('input', function () {
            performSearch(this.value.trim());
        });
    }

    // Perform search function
    function performSearch(query) {
        if (!query) {
            searchResults.innerHTML = '<p>Please enter a search term</p>';
            return;
        }

        const results = products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        );

        displaySearchResults(results);
    }

    // Display search results
    function displaySearchResults(results) {
        if (results.length === 0) {
            searchResults.innerHTML = '<p>No products found. Try a different search term.</p>';
            return;
        }

        let html = '<div class="search-results-grid">';
        results.forEach(product => {
            html += `
                <div class="search-result-item">
                    <a href="product-detail.html?id=${product.id}" class="prevent-barba">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="search-result-info">
                            <h4>${product.name}</h4>
                            <p>$${product.price}</p>
                            <span class="search-result-category">${product.category}</span>
                        </div>
                    </a>
                </div>
            `;
        });
        html += '</div>';

        searchResults.innerHTML = html;
    }

    // Close mobile menu when clicking on a link
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-links a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function () {
            mobileMenu.classList.remove('active');
        });
    });

    // Product thumbnail click event
    const productThumbnails = document.querySelectorAll('.product-thumbnail');
    const productMainImage = document.querySelector('.product-main-image');

    if (productThumbnails.length && productMainImage) {
        productThumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function () {
                productThumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                productMainImage.src = this.src;
            });
        });
    }

    // Quantity selector
    const quantityMinus = document.querySelector('.quantity-btn:first-child');
    const quantityPlus = document.querySelector('.quantity-btn:last-child');
    const quantityInput = document.querySelector('.quantity-input');

    if (quantityMinus && quantityPlus && quantityInput) {
        quantityMinus.addEventListener('click', function () {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });

        quantityPlus.addEventListener('click', function () {
            let value = parseInt(quantityInput.value);
            quantityInput.value = value + 1;
        });
    }

    // FAQ Accordion Functionality
    function setupFAQAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');

        if (faqItems.length > 0) {
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');

                question.addEventListener('click', () => {
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                    item.classList.toggle('active');
                });
            });
        }
    }
    setupFAQAccordion();

    // Update active navigation link
    function updateActiveNavLink() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.navbar ul li a, .mobile-menu-links a');

        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href').split('/').pop();
            if (linkPath === currentPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    updateActiveNavLink();

    // Animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('[data-aos]');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                const animation = element.getAttribute('data-aos');
                const delay = element.getAttribute('data-aos-delay') || 0;

                element.style.transitionDelay = `${delay}ms`;
                element.classList.add(animation);
                element.removeAttribute('data-aos');
                element.removeAttribute('data-aos-delay');
            }
        });
    }
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // Initialize Barba.js
    if (typeof barba !== 'undefined') {
        barba.init({
            transitions: [
                {
                    name: 'default-transition',
                    leave(data) {
                        return gsap.to(data.current.container, {
                            opacity: 0,
                            duration: 0.5
                        });
                    },
                    enter(data) {
                        return gsap.from(data.next.container, {
                            opacity: 0,
                            duration: 0.5
                        });
                    }
                },
                {
                    name: 'product-transition',
                    to: {
                        namespace: ['product']
                    },
                    leave(data) {
                        return gsap.to(data.current.container, {
                            opacity: 0,
                            y: 50,
                            duration: 0.5
                        });
                    },
                    enter(data) {
                        return gsap.from(data.next.container, {
                            opacity: 0,
                            y: 50,
                            duration: 0.5
                        });
                    }
                },
                {
                    name: 'home-transition',
                    to: {
                        namespace: ['homepage']
                    },
                    leave(data) {
                        return gsap.to(data.current.container, {
                            opacity: 0,
                            x: -100,
                            duration: 0.5
                        });
                    },
                    enter(data) {
                        return gsap.from(data.next.container, {
                            opacity: 0,
                            x: 100,
                            duration: 0.5
                        });
                    }
                }
            ],
            views: [
                {
                    namespace: 'product',
                    beforeEnter(data) {
                        window.scrollTo(0, 0);
                    }
                }
            ],
            prevent: ({ el }) => el.classList && el.classList.contains('prevent-barba')
        });

        barba.hooks.after(() => {
            updateActiveNavLink();
            setupFAQAccordion();
            animateOnScroll();
        });
    }

    // Bind Add to Cart button on product-detail.html
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function () {
            const product = {
                id: Date.now(), // Generate a unique ID for the product
                name: document.querySelector('.product-info h1').textContent.trim(),
                price: parseFloat(document.querySelector('.current-price').textContent.replace('$', '')),
                image: document.querySelector('.product-main-image').src,
            };

            const quantity = parseInt(document.querySelector('.quantity-input').value) || 1;

            addToCart(product, quantity);
            updateCartUI();
            showNotification(`${product.name} added to cart`);
        });
    }
});

// Product Tabs Functionality
function setupProductTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    if (tabButtons.length && tabPanels.length) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                tabButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                // Get the target panel ID or index
                const targetPanel = button.textContent.trim().toLowerCase();

                // Hide all panels
                tabPanels.forEach(panel => panel.classList.remove('active'));

                // Show the target panel
                const panelsArray = Array.from(tabPanels);
                const targetIndex = Array.from(tabButtons).indexOf(button);
                if (panelsArray[targetIndex]) {
                    panelsArray[targetIndex].classList.add('active');
                }
            });
        });
    }
}

// Initialize product tabs when page loads
document.addEventListener('DOMContentLoaded', function () {
    setupProductTabs();

    // Re-initialize when Barba.js completes a page transition
    if (typeof barba !== 'undefined') {
        document.addEventListener('barbaAfterEnter', function () {
            setupProductTabs();
        });
    }
});


// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const addToCartBtn = document.querySelector('.add-to-cart-btn');
const cartModal = document.querySelector('.cart-modal');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.total-price');
const openCartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const continueShoppingBtn = document.querySelector('.continue-shopping');
const checkoutBtn = document.querySelector('.checkout-btn');
const checkoutModal = document.querySelector('.checkout-modal');
const closeCheckoutBtn = document.querySelector('.close-checkout');
const checkoutForm = document.querySelector('.checkout-form');

// Product data (replace with your actual product data)
// const currentProduct = {
//     id: 1,
//     name: 'iPhone 14 Pro',
//     price: 999,
//     image: 'img/iPhone14pro.png'
// };

// Add to cart functionality
// if (addToCartBtn) {
//     addToCartBtn.addEventListener('click', () => {
//         const quantity = parseInt(document.querySelector('.quantity-input').value);
//         addToCart(currentProduct, quantity);
//         updateCartUI();
//         showNotification(`${currentProduct.name} added to cart`);
//     });
// }
function bindCartButtons() {
    document.querySelectorAll('.add-to-cart-btn, .btn-add-to-cart').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            // Get product details from the closest product card
            const productCard = this.closest('.product-card');
            if (!productCard) return;

            const product = {
                id: productCard.dataset.id || Date.now(), // Use data-id if available
                name: productCard.querySelector('.product-title a').textContent.trim(),
                price: parseFloat(productCard.querySelector('.price').textContent.replace('$', '')),
                image: productCard.querySelector('img').src
            };

            // Get quantity (for product detail page)
            const quantityInput = document.querySelector('.quantity-input');
            const quantity = quantityInput ? parseInt(quantityInput.value) : 1;

            addToCart(product, quantity);
            updateCartUI();
            showNotification(`${product.name} added to cart`);
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', bindCartButtons);

// Re-bind after Barba.js page transitions
if (typeof barba !== 'undefined') {
    barba.hooks.after(() => {
        bindCartButtons();
    });
}

function addToCart(product, quantity = 1) {
    // Show loading state
    const btn = document.querySelector('.add-to-cart-btn');
    if (btn) {
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';
        btn.disabled = true;
    }

    // Simulate async operation
    setTimeout(() => {
        // Your existing cart logic

        // Restore button state
        if (btn) {
            btn.textContent = 'Add to Cart';
            btn.disabled = false;
        }
    }, 500);
}


// Add item to cart
function addToCart(product, quantity = 1) {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity
        });
    }

    saveCart();
    updateCartCount();
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
    updateCartCount();
}

// Update item quantity
function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartUI();
            updateCartCount();
        }
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart count in header
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-btn span').textContent = count;
}

// Update cart UI
function updateCartUI() {
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
        cartTotal.textContent = '$0.00';
        return;
    }

    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                <div class="cart-item-actions">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <input type="number" value="${item.quantity}" min="1" class="cart-item-quantity" data-id="${item.id}">
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    <span class="remove-item" data-id="${item.id}">&times;</span>
                </div>
            </div>
        `;

        cartItemsContainer.appendChild(cartItemElement);
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;

    // Add event listeners to dynamic elements
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });

    document.querySelectorAll('.cart-item-quantity').forEach(input => {
        input.addEventListener('change', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const newQuantity = parseInt(e.target.value);
            updateQuantity(productId, newQuantity);
        });
    });

    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const item = cart.find(item => item.id === productId);
            if (item && item.quantity > 1) {
                updateQuantity(productId, item.quantity - 1);
            }
        });
    });

    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const item = cart.find(item => item.id === productId);
            if (item) {
                updateQuantity(productId, item.quantity + 1);
            }
        });
    });
}

// Cart modal controls
if (openCartBtn) {
    openCartBtn.addEventListener('click', () => {
        cartModal.classList.add('active');
        updateCartUI();
    });
}

if (closeCartBtn) {
    closeCartBtn.addEventListener('click', () => {
        cartModal.classList.remove('active');
    });
}

if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener('click', () => {
        cartModal.classList.remove('active');
    });
}

if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        cartModal.classList.remove('active');
        checkoutModal.classList.add('active');
    });
}

if (closeCheckoutBtn) {
    closeCheckoutBtn.addEventListener('click', () => {
        checkoutModal.classList.remove('active');
    });
}

// Checkout form submission
if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Here you would typically send the order to your backend
        // For this example, we'll just show a success message
        alert('Order placed successfully!');

        // Clear the cart
        cart = [];
        saveCart();
        updateCartUI();
        updateCartCount();

        // Close modals
        checkoutModal.classList.remove('active');
    });
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialize cart count on page load
updateCartCount();

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.classList.remove('active');
    }
    if (e.target === checkoutModal) {
        checkoutModal.classList.remove('active');
    }
});

function bindCartButtons() {
    document.querySelectorAll('.add-to-cart-btn, .btn-add-to-cart').forEach(button => {
        button.removeEventListener('click', handleAddToCart); // remove previous to avoid duplicates
        button.addEventListener('click', handleAddToCart);
    });
}

function handleAddToCart(e) {
    e.preventDefault();
    const button = e.currentTarget;
    const productCard = button.closest('.product-card');
    const productTitle = productCard.querySelector('.product-title a').textContent.trim();
    const productImage = productCard.querySelector('img').getAttribute('src');
    const productPrice = parseFloat(productCard.querySelector('.price').textContent.replace('$', ''));

    const product = {
        id: Date.now(),
        name: productTitle,
        price: productPrice,
        image: productImage
    };

    addToCart(product);
    updateCartUI();
    showNotification(`${product.name} added to cart`);
}

// Run on load
document.addEventListener('DOMContentLoaded', () => {
    bindCartButtons();
});

if (typeof barba !== 'undefined') {
    document.addEventListener('barbaAfterEnter', () => {
        bindCartButtons();
    });
}

// Sorting functionality for products
document.getElementById('sort').addEventListener('change', function () {
    const sortValue = this.value;
    const productsGrid = document.querySelector('.products-grid');
    const productCards = Array.from(productsGrid.querySelectorAll('.product-card'));

    productCards.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('.price').textContent.replace('$', ''));
        const priceB = parseFloat(b.querySelector('.price').textContent.replace('$', ''));

        if (sortValue === 'price-low') {
            return priceA - priceB;
        } else if (sortValue === 'price-high') {
            return priceB - priceA;
        } else if (sortValue === 'popular') {
            return parseInt(b.dataset.id) - parseInt(a.dataset.id); // Example for popularity
        } else if (sortValue === 'newest') {
            return parseInt(b.dataset.id) - parseInt(a.dataset.id); // Example for newest
        } else {
            return 0; // Default sorting
        }
    });

    // Clear and re-append sorted product cards
    productsGrid.innerHTML = '';
    productCards.forEach(card => productsGrid.appendChild(card));
});


// Wishlist Functionality
document.addEventListener('DOMContentLoaded', function () {
    // Initialize wishlist from localStorage
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Function to toggle wishlist
    function toggleWishlist(product) {
        const index = wishlist.findIndex(item => item.id === product.id);
        if (index > -1) {
            wishlist.splice(index, 1); // Remove from wishlist
        } else {
            wishlist.push(product); // Add to wishlist
        }
        saveWishlist();
        updateWishlistUI();
    }

    // Save wishlist to localStorage
    function saveWishlist() {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }

    // Update wishlist UI
    function updateWishlistUI() {
        document.querySelectorAll('.far.fa-heart').forEach(icon => {
            const productCard = icon.closest('.product-card');
            const productId = productCard ? productCard.dataset.id : null;
            if (wishlist.some(item => item.id === productId)) {
                icon.classList.add('fas'); // Change to solid heart
                icon.classList.remove('far');
            } else {
                icon.classList.add('far'); // Change to outline heart
                icon.classList.remove('fas');
            }
        });
    }

    // Bind wishlist buttons
    function bindWishlistButtons() {
        document.querySelectorAll('.far.fa-heart, .fas.fa-heart').forEach(icon => {
            icon.addEventListener('click', function (e) {
                e.preventDefault();
                const productCard = this.closest('.product-card');
                if (!productCard) return;

                const product = {
                    id: productCard.dataset.id,
                    name: productCard.querySelector('.product-title a').textContent.trim(),
                    price: parseFloat(productCard.querySelector('.price').textContent.replace('$', '')),
                    image: productCard.querySelector('img').src
                };

                toggleWishlist(product);
            });
        });
    }

    // Initialize wishlist functionality
    bindWishlistButtons();
    updateWishlistUI();

    // Re-bind after Barba.js page transitions
    if (typeof barba !== 'undefined') {
        barba.hooks.after(() => {
            bindWishlistButtons();
            updateWishlistUI();
        });
    }
});