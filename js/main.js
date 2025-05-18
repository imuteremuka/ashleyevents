document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }


    // Hero Slider
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Show current slide
        slides[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
    
    // Auto slide every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        heroSlider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
    }
    
    // Initialize first slide
    if (slides.length > 0) {
        showSlide(0);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            // Only handle internal links
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100, // Adjust for fixed header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Testimonial Slider
    let testimonialIndex = 0;
    const testimonials = [
        {
            quote: "Ashel Events made our wedding day absolutely perfect! Their attention to detail and creative vision exceeded our expectations.",
            author: "Sarah & Michael",
            role: "Wedding Clients"
        },
        {
            quote: "The gift boxes from Ashel Events are always beautifully curated and delivered on time. Our clients love them!",
            author: "Jessica T.",
            role: "Corporate Client"
        },
        {
            quote: "From planning to execution, the team at Ashel Events was professional, creative, and a joy to work with.",
            author: "David R.",
            role: "Event Host"
        }
    ];
    
    const testimonialContainer = document.querySelector('.testimonial-slider');
    
    function updateTestimonial() {
        if (testimonialContainer) {
            const testimonial = testimonials[testimonialIndex];
            testimonialContainer.innerHTML = `
                <div class="testimonial">
                    <div class="testimonial-content">
                        <p>"${testimonial.quote}"</p>
                        <div class="testimonial-author">
                            <h4>${testimonial.author}</h4>
                            <span>${testimonial.role}</span>
                        </div>
                    </div>
                </div>
            `;
            
            testimonialIndex = (testimonialIndex + 1) % testimonials.length;
        }
    }
    
    // Change testimonial every 7 seconds
    if (testimonialContainer) {
        updateTestimonial();
        setInterval(updateTestimonial, 7000);
    }

    // Product Data
    const products = [
        // Premium Gifts
        {
            id: 1,
            name: "Luxury Gift Box",
            category: "premium",
            price: "R1,299.99",
            image: "images/gift-box-1.jpg",
            isNew: true,
            inWishlist: false
        },
        // Home & Living
        {
            id: 2,
            name: "Elegant Candle Set",
            category: "home",
            price: "R899.99",
            image: "images/gift-box-2.jpg",
            isNew: false,
            inWishlist: false
        },
        // Food & Drinks
        {
            id: 3,
            name: "Gourmet Chocolate Collection",
            category: "food",
            price: "R1,099.99",
            image: "images/gift-box-3.jpg",
            isNew: true,
            inWishlist: false
        },
        // Self Care
        {
            id: 4,
            name: "Spa Relaxation Box",
            category: "selfcare",
            price: "R1,499.99",
            image: "images/gift-box-4.jpg",
            isNew: false,
            inWishlist: false
        },
        // Corporate
        {
            id: 5,
            name: "Executive Gift Set",
            category: "corporate",
            price: "R1,799.99",
            image: "images/gift-box-5.jpg",
            isNew: true,
            inWishlist: false
        },
        // Premium Gifts
        {
            id: 6,
            name: "Deluxe Gift Hamper",
            category: "premium",
            price: "R2,199.99",
            image: "images/gift-box-6.jpg",
            isNew: false,
            inWishlist: false
        },
        // Home & Living
        {
            id: 7,
            name: "Aromatherapy Set",
            category: "home",
            price: "R1,199.99",
            image: "images/gift-box-7.jpg",
            isNew: true,
            inWishlist: false
        },
        // Food & Drinks
        {
            id: 8,
            name: "Wine & Cheese Platter",
            category: "food",
            price: "R1,599.99",
            image: "images/gift-box-8.jpg",
            isNew: false,
            inWishlist: false
        }
    ];

    // DOM Elements
    const productsGrid = document.querySelector('.products-grid');
    const categoryTabs = document.querySelectorAll('.tab-btn');
    
    // Current filter
    let currentCategory = 'all';
    
    // Render products based on current filter
    function renderProducts() {
        if (!productsGrid) return;
        
        // Filter products based on category
        const filteredProducts = currentCategory === 'all' 
            ? products 
            : products.filter(product => product.category === currentCategory);
        
        // Clear existing products
        productsGrid.innerHTML = '';
        
        // Show message if no products found
        if (filteredProducts.length === 0) {
            productsGrid.innerHTML = `
                <div class="no-products">
                    <i class="fas fa-box-open"></i>
                    <p>No products found in this category.</p>
                </div>
            `;
            return;
        }
        
        // Render each product
        filteredProducts.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product-card';
            productElement.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    ${product.isNew ? '<span class="product-badge">New</span>' : ''}
                    <div class="product-wishlist" data-product-id="${product.id}">
                        <i class="${product.inWishlist ? 'fas' : 'far'} fa-heart"></i>
                    </div>
                </div>
                <div class="product-details">
                    <span class="product-category">${getCategoryName(product.category)}</span>
                    <h3 class="product-title">${product.name}</h3>
                    <span class="product-price">${product.price}</span>
                    <div class="product-actions">
                        <button class="btn-outline">View Details</button>
                        <button class="btn-icon">
                            <i class="fas fa-shopping-cart"></i>
                        </button>
                    </div>
                </div>
            `;
            
            productsGrid.appendChild(productElement);
        });
        
        // Add event listeners to wishlist buttons
        document.querySelectorAll('.product-wishlist').forEach(button => {
            button.addEventListener('click', toggleWishlist);
        });
    }
    
    // Helper function to get category name from slug
    function getCategoryName(slug) {
        const categories = {
            'premium': 'Premium Gifts',
            'home': 'Home & Living',
            'food': 'Food & Drinks',
            'selfcare': 'Self Care',
            'corporate': 'Corporate'
        };
        return categories[slug] || slug;
    }
    
    // Toggle product wishlist status
    function toggleWishlist(e) {
        const button = e.currentTarget;
        const productId = parseInt(button.dataset.productId);
        const product = products.find(p => p.id === productId);
        
        if (product) {
            product.inWishlist = !product.inWishlist;
            const icon = button.querySelector('i');
            icon.className = product.inWishlist ? 'fas fa-heart' : 'far fa-heart';
            
            // Optional: Add animation
            button.style.transform = 'scale(1.2)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 200);
        }
    }
    
    // Handle category tab clicks
    function handleCategoryClick(e) {
        // Update active tab
        categoryTabs.forEach(tab => tab.classList.remove('active'));
        e.currentTarget.classList.add('active');
        
        // Update current category and re-render products
        currentCategory = e.currentTarget.dataset.category;
        renderProducts();
        
        // Scroll to products section
        document.querySelector('.products-section').scrollIntoView({
            behavior: 'smooth'
        });
    }
    
    // Add event listeners
    if (categoryTabs.length > 0) {
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', handleCategoryClick);
        });
    }
    
    // Initial render
    renderProducts();

    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && validateEmail(email)) {
                // Here you would typically send this to your server
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Email validation helper
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Add animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .product-card, .testimonial');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animations
    document.addEventListener('DOMContentLoaded', () => {
        const animatedElements = document.querySelectorAll('.service-card, .product-card, .testimonial');
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        });
        
        // Trigger initial check
        animateOnScroll();
    });
    
    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes heartBeat {
            0% { transform: scale(1); }
            14% { transform: scale(1.3); }
            28% { transform: scale(1); }
            42% { transform: scale(1.3); }
            70% { transform: scale(1); }
        }
        
        .product-wishlist i {
            transition: all 0.3s ease;
        }
        
        .product-wishlist i.active {
            color: #ff4757;
        }
        
        .service-card, .product-card, .testimonial {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
    `;
    document.head.appendChild(style);
});
