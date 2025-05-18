/**
 * Contact Page JavaScript
 * Handles form validation, submission, FAQ accordion, and other interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the contact page functionality
    initContactPage();
});

function initContactPage() {
    // Initialize FAQ accordion
    initFAQAccordion();
    
    // Initialize form validation
    initContactForm();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize mobile menu toggle if it exists
    initMobileMenu();
}

/**
 * Initialize FAQ accordion functionality
 */
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const faqItem = this.parentNode;
                const isOpen = faqItem.classList.contains('active');
                
                // Close all other FAQ items
                document.querySelectorAll('.faq-item').forEach(item => {
                    if (item !== faqItem) {
                        item.classList.remove('active');
                    }
                });
                
                // Toggle current item
                if (isOpen) {
                    faqItem.classList.remove('active');
                } else {
                    faqItem.classList.add('active');
                }
                
                // Close FAQ answer when clicking on an already open question
                if (isOpen) {
                    // The click will be handled by the event listener above
                    return;
                }
            });
        });
    }
}

/**
 * Initialize contact form validation and submission
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Add input event listeners for real-time validation
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            // Skip the newsletter checkbox
            if (input.type !== 'checkbox') {
                input.addEventListener('input', function() {
                    validateField(this);
                });
                
                // For select elements, validate on change
                if (input.tagName === 'SELECT') {
                    input.addEventListener('change', function() {
                        validateField(this);
                    });
                }
            }
        });
        
        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all required fields
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!validateField(field)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                // If form is valid, prepare the data for submission
                const formData = new FormData(contactForm);
                const formObject = {};
                
                // Convert FormData to object
                formData.forEach((value, key) => {
                    formObject[key] = value;
                });
                
                // Here you would typically send the data to a server
                // For now, we'll just show a success message
                showFormMessage('Thank you for your message! We will get back to you soon.', 'success');
                
                // Reset the form
                contactForm.reset();
                
                // Scroll to the success message
                setTimeout(() => {
                    const messageElement = document.querySelector('.form-message');
                    if (messageElement) {
                        messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 100);
            } else {
                // Scroll to the first error
                const firstError = contactForm.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }
}

/**
 * Validate a form field
 * @param {HTMLElement} field - The form field to validate
 * @returns {boolean} - Whether the field is valid
 */
function validateField(field) {
    // Remove any existing error messages
    const errorElement = field.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.remove();
    }
    
    field.classList.remove('error');
    
    // Skip validation if the field is not required and empty
    if (!field.required && !field.value.trim()) {
        return true;
    }
    
    let isValid = true;
    let errorMessage = '';
    
    // Check required fields
    if (field.required && !field.value.trim()) {
        errorMessage = 'This field is required';
        isValid = false;
    } 
    // Validate email format
    else if (field.type === 'email' && field.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value.trim())) {
            errorMessage = 'Please enter a valid email address';
            isValid = false;
        }
    }
    // Validate phone number format (basic validation)
    else if (field.type === 'tel' && field.value.trim()) {
        const phoneRegex = /^[+\d\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(field.value.trim())) {
            errorMessage = 'Please enter a valid phone number';
            isValid = false;
        }
    }
    
    // If there's an error, display it
    if (!isValid) {
        field.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = errorMessage;
        errorElement.style.color = '#e74c3c';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '5px';
        errorElement.style.display = 'block';
        
        // Insert the error message after the field
        field.parentNode.insertBefore(errorElement, field.nextSibling);
    }
    
    return isValid;
}

/**
 * Show a form message (success or error)
 * @param {string} message - The message to display
 * @param {string} type - The type of message (success, error, etc.)
 */
function showFormMessage(message, type = 'success') {
    // Remove any existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    
    // Style the message
    messageElement.style.padding = '15px';
    messageElement.style.margin = '20px 0';
    messageElement.style.borderRadius = '6px';
    messageElement.style.fontWeight = '500';
    messageElement.style.textAlign = 'center';
    
    if (type === 'success') {
        messageElement.style.backgroundColor = '#e8f5e9';
        messageElement.style.color = '#2e7d32';
        messageElement.style.border = '1px solid #a5d6a7';
    } else {
        messageElement.style.backgroundColor = '#ffebee';
        messageElement.style.color = '#c62828';
        messageElement.style.border = '1px solid #ef9a9a';
    }
    
    // Insert the message after the form header or at the top of the form
    const formHeader = document.querySelector('.form-header');
    const contactForm = document.getElementById('contactForm');
    
    if (formHeader) {
        formHeader.insertAdjacentElement('afterend', messageElement);
    } else if (contactForm) {
        contactForm.insertBefore(messageElement, contactForm.firstChild);
    }
    
    // Auto-hide the message after 5 seconds
    setTimeout(() => {
        messageElement.style.opacity = '0';
        messageElement.style.transition = 'opacity 0.5s ease';
        
        // Remove the element after the fade out animation
        setTimeout(() => {
            messageElement.remove();
        }, 500);
    }, 5000);
}

/**
 * Initialize back to top button
 */
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        // Show/hide the button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.style.opacity = '1';
                backToTopButton.style.visibility = 'visible';
                backToTopButton.style.transform = 'translateY(0)';
            } else {
                backToTopButton.style.opacity = '0';
                backToTopButton.style.visibility = 'hidden';
                backToTopButton.style.transform = 'translateY(20px)';
            }
        });
        
        // Scroll to top when clicked
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Initialize mobile menu toggle
 */
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Toggle body scroll when mobile menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close mobile menu when clicking on a nav link
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

/**
 * Initialize Google Map
 */
function initMap() {
    // Check if the map container exists
    const mapContainer = document.getElementById('map');
    
    if (!mapContainer) return;
    
    // Default coordinates (New York City)
    const defaultCoords = { lat: 40.7128, lng: -74.0060 };
    
    // Create map
    const map = new google.maps.Map(mapContainer, {
        center: defaultCoords,
        zoom: 15,
        styles: [
            {
                "featureType": "all",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "weight": "2.00"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#9c9c9c"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "gamma": 0.01
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "saturation": -31
                    },
                    {
                        "lightness": -33
                    },
                    {
                        "weight": 2
                    },
                    {
                        "gamma": 0.8
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "lightness": 30
                    },
                    {
                        "saturation": 30
                    },
                    {
                        "color": "#f2f2f2"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "saturation": 20
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "lightness": 20
                    },
                    {
                        "saturation": -20
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "lightness": 10
                    },
                    {
                        "saturation": -30
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "saturation": 25
                    },
                    {
                        "lightness": 25
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "lightness": -20
                    }
                ]
            }
        ]
    });
    
    // Add a marker
    const marker = new google.maps.Marker({
        position: defaultCoords,
        map: map,
        title: 'Ashel Events',
        icon: {
            url: 'data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23DEB4A8"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>',
            scaledSize: new google.maps.Size(40, 40),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(20, 40)
        }
    });
    
    // Add info window
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div style="max-width: 200px;">
                <h3 style="margin: 0 0 10px; color: var(--primary);">Ashel Events</h3>
                <p style="margin: 5px 0;">123 Event Street</p>
                <p style="margin: 5px 0;">City, State 12345</p>
                <p style="margin: 10px 0 0;">
                    <a href="https://maps.google.com/maps?q=40.7128,-74.0060" target="_blank" style="color: var(--primary); text-decoration: none; font-weight: 500;">
                        Get Directions <i class="fas fa-arrow-right" style="margin-left: 5px;"></i>
                    </a>
                </p>
            </div>
        `
    });
    
    // Show info window on marker click
    marker.addListener('click', function() {
        infoWindow.open(map, marker);
    });
}

// Make initMap globally available for Google Maps API
window.initMap = initMap;
