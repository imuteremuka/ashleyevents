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

    // Featured Products (sample data)
    const products = [
        {
            id: 1,
            name: "Luxury Gift Box",
            category: "Premium Gifts",
            price: "R1,299.99",
            image: "../images/gift-box-1.jpg",
            isNew: true,
            inWishlist: false
        },
        {
            id: 2,
            name: "Elegant Candle Set",
            category: "Home Decor",
            price: "R899.99",
            image: "../images/gift-box-2.jpg",
            isNew: false,
            inWishlist: false
        },
        {
            id: 3,
            name: "Gourmet Chocolate Collection",
            category: "Food & Drinks",
            price: "R1,099.99",
            image: "../images/gift-box-3.jpg",
            isNew: true,
            inWishlist: false
        },
        {
            id: 4,
            name: "Spa Relaxation Box",
            category: "Self Care",
            price: "R1,499.99",
            image: "../images/gift-box-4.jpg",
            isNew: false,
            inWishlist: false
        }
    ];
    
    const productsGrid = document.querySelector('.products-grid');
    
    function renderProducts() {
        if (productsGrid) {
            // Clear loading message
            productsGrid.innerHTML = '';
            
            // Render each product
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.className = 'product-card';
                productElement.innerHTML = `
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                        ${product.isNew ? '<span class="product-badge">New</span>' : ''}
                        <div class="product-wishlist" data-product-id="${product.id}">
                            <i class="far fa-heart"></i>
                        </div>
                    </div>
                    <div class="product-details">
                        <span class="product-category">${product.category}</span>
                        <h3 class="product-title">${product.name}</h3>
                        <span class="product-price">${product.price}</span>
                        <button class="btn btn-primary btn-block">Add to Cart</button>
                    </div>
                `;
                
                productsGrid.appendChild(productElement);
            });
            
            // Add event listeners for wishlist buttons
            document.querySelectorAll('.product-wishlist').forEach(button => {
                button.addEventListener('click', function() {
                    const icon = this.querySelector('i');
                    icon.classList.toggle('far');
                    icon.classList.toggle('fas');
                    icon.classList.toggle('active');
                    
                    // Add animation
                    this.style.animation = 'heartBeat 0.5s';
                    setTimeout(() => {
                        this.style.animation = '';
                    }, 500);
                });
            });
        }
    }
    
    // Initialize products
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
