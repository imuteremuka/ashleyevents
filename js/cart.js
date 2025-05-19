// Cart functionality

// Check if cart exists in localStorage, if not, create it
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Add item to cart
function addToCart(product) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += product.quantity || 1;
    } else {
        cart.push({
            ...product,
            quantity: product.quantity || 1
        });
    }
    
    saveCart(cart);
    return cart;
}

// Remove item from cart
function removeFromCart(productId) {
    const cart = getCart().filter(item => item.id !== productId);
    saveCart(cart);
    return cart;
}

// Update item quantity in cart
function updateCartItemQuantity(productId, newQuantity) {
    if (newQuantity < 1) return removeFromCart(productId);
    
    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity = newQuantity;
        saveCart(cart);
    }
    
    return cart;
}

// Calculate cart total
function calculateCartTotal(cart) {
    return cart.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
}

// Update cart count in the header
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    if (!cartCountElements.length) return;
    
    const cart = getCart();
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        element.textContent = itemCount;
        element.style.display = itemCount > 0 ? 'inline-block' : 'none';
    });
}

// Initialize cart functionality when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Cart script loaded');
    updateCartCount();
    
    // If we're on the cart page, initialize the cart UI
    if (document.querySelector('.cart-page')) {
        initCartPage();
    }
});

// Initialize the cart page
function initCartPage() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartSummary = document.querySelector('.cart-summary');
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    
    if (!cartItemsContainer) return;
    
    const cart = getCart();
    
    if (cart.length === 0) {
        if (emptyCartMessage) emptyCartMessage.style.display = 'block';
        if (cartSummary) cartSummary.style.display = 'none';
        cartItemsContainer.innerHTML = '';
        return;
    }
    
    if (emptyCartMessage) emptyCartMessage.style.display = 'none';
    if (cartSummary) cartSummary.style.display = 'block';
    
    // Render cart items
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-image">
                <img src="${item.image || 'images/placeholder-product.jpg'}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-category">${item.category || 'Gift Box'}</p>
                <p class="cart-item-price">R${item.price.toFixed(2)}</p>
                <button class="remove-item" data-id="${item.id}">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-id="${item.id}">
                <button class="quantity-btn plus" data-id="${item.id}">+</button>
            </div>
            <div class="cart-item-total">
                R${(item.price * item.quantity).toFixed(2)}
            </div>
        </div>
    `).join('');
    
    // Update cart summary
    updateCartSummary(cart);
    
    // Add event listeners
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.id;
            removeFromCart(productId);
            initCartPage();
        });
    });
    
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.id;
            const input = document.querySelector(`.quantity-input[data-id="${productId}"]`);
            let newQuantity = parseInt(input.value);
            
            if (this.classList.contains('plus')) {
                newQuantity++;
            } else if (this.classList.contains('minus')) {
                newQuantity--;
            }
            
            updateCartItemQuantity(productId, newQuantity);
            initCartPage();
        });
    });
    
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', function() {
            const productId = this.dataset.id;
            const newQuantity = parseInt(this.value) || 1;
            updateCartItemQuantity(productId, newQuantity);
            initCartPage();
        });
    });
    
    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Proceeding to checkout...');
            // In a real app, you would redirect to the checkout page
            // window.location.href = 'checkout.html';
        });
    }
}

// Update cart summary
function updateCartSummary(cart) {
    const subtotal = calculateCartTotal(cart);
    const shipping = subtotal > 0 ? 100 : 0; // Example shipping cost
    const total = subtotal + shipping;
    
    document.querySelector('.subtotal-amount').textContent = `R${subtotal.toFixed(2)}`;
    document.querySelector('.shipping-amount').textContent = shipping > 0 ? `R${shipping.toFixed(2)}` : 'Free';
    document.querySelector('.total-amount').textContent = `R${total.toFixed(2)}`;
}

// Make functions available globally
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartItemQuantity = updateCartItemQuantity;
window.calculateCartTotal = calculateCartTotal;
window.updateCartCount = updateCartCount;
