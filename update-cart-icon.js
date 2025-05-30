const fs = require('fs');
const path = require('path');

// List of all HTML files to update
const htmlFiles = [
    'about.html',
    'cart.html',
    'contact.html',
    'gallery.html',
    'services.html',
    'shop.html',
    'index.html' // Already updated, but included for completeness
];

// The new cart icon HTML to insert
const newCartIcon = `
    <!-- Shopping Cart Icon (Moved from Navbar) -->
    <div class="cart-icon-container">
        <a href="cart.html" class="cart-link">
            <i class="fas fa-shopping-cart"></i>
            <span class="cart-count">0</span>
        </a>
    </div>`;

// The cart icon HTML to remove from nav
const oldCartIcon = `
                <li class="cart-icon">
                    <a href="cart.html">
                        <i class="fas fa-shopping-cart"></i>
                        <span class="cart-count">0</span>
                    </a>
                </li>`;

// Process each HTML file
htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    
    // Skip if file doesn't exist
    if (!fs.existsSync(filePath)) {
        console.log(`Skipping ${file} - file not found`);
        return;
    }
    
    try {
        // Read the file
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Remove old cart icon from nav if it exists
        if (content.includes(oldCartIcon)) {
            content = content.replace(oldCartIcon, '');
            console.log(`Removed old cart icon from ${file}`);
        }
        
        // Add new cart icon after opening body tag if not already present
        const bodyTag = '<body>';
        if (content.includes(bodyTag) && !content.includes('cart-icon-container')) {
            content = content.replace(
                bodyTag, 
                `${bodyTag}${newCartIcon}`
            );
            console.log(`Added new cart icon to ${file}`);
            
            // Write changes back to file
            fs.writeFileSync(filePath, content, 'utf8');
        } else if (content.includes('cart-icon-container')) {
            console.log(`Skipping ${file} - already has new cart icon`);
        } else {
            console.log(`Could not find body tag in ${file}`);
        }
    } catch (error) {
        console.error(`Error processing ${file}:`, error.message);
    }
});

console.log('Cart icon update complete!');
