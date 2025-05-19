// Sample product data - in a real app, this would come from a backend API
const products = [
    {
        id: '1',
        name: 'Luxury Gift Box',
        category: 'For Her',
        description: 'Premium curated gift box with luxury items',
        price: 850.00,
        image: 'images/gift-box-1.jpg',
        tags: ['premium', 'for-her']
    },
    // Add more sample products as needed
];

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Shop script loaded');
    
    // Initialize the shop
    initShop();
    
    // Set up event listeners
    setupEventListeners();
});

// Initialize the shop
function initShop() {
    displayProducts(products);
}

// Display products in the grid
function displayProducts(productsToShow) {
    const productsGrid = document.querySelector('.products-grid');
    
    if (!productsGrid) return;
    
    if (productsToShow.length === 0) {
        productsGrid.innerHTML = '<div class="no-results">No products found matching your criteria.</div>';
        return;
    }
    
    let productsHTML = '';
    
    productsToShow.forEach(product => {
        productsHTML += `
            <div class="product-card" data-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-details">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">R${product.price.toFixed(2)}</p>
                    <button class="btn btn-primary add-to-cart" data-product='${JSON.stringify(product).replace(/'/g, '&#39;')}'>
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
            </div>
        `;
    });
    
    productsGrid.innerHTML = productsHTML;
    
    // Add event listeners to the new Add to Cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCartHandler);
    });
}

// Handle Add to Cart button click
function addToCartHandler(event) {
    event.preventDefault();
    
    const button = event.currentTarget;
    const product = JSON.parse(button.dataset.product.replace(/&#39;/g, "'"));
    
    // Add the product to the cart
    if (typeof window.addToCart === 'function') {
        window.addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image,
            category: product.category
        });
        
        // Show success message
        showNotification(`${product.name} added to cart!`);
    } else {
        console.error('addToCart function not found');
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Add the 'show' class after a short delay to trigger the animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove the notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Set up event listeners
function setupEventListeners() {
    // Add any additional event listeners here
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 15px 25px;
        border-radius: 4px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
    }
    
    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }
    
    .products-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 20px;
        padding: 20px 0;
    }
    
    .product-card {
        background: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .product-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
    }
    
    .product-image {
        height: 200px;
        overflow: hidden;
    }
    
    .product-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .product-details {
        padding: 15px;
    }
    
    .product-title {
        margin: 0 0 10px;
        font-size: 1.1rem;
        color: #333;
    }
    
    .product-price {
        font-weight: bold;
        color: #2c3e50;
        margin-bottom: 15px;
    }
    
    .add-to-cart {
        width: 100%;
        padding: 8px;
        background-color: #3498db;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    
    .add-to-cart:hover {
        background-color: #2980b9;
    }
`;

document.head.appendChild(notificationStyles);
