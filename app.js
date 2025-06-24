// Modern Portfolio Website JavaScript

class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.initThemeToggle();
        this.initMobileMenu();
        this.initSmoothScrolling();
        this.initScrollAnimations();
        this.initFixedHeader();
        this.initServiceButtons();
        this.initExpertiseFilter();
        this.initLogoHandling();
    }

    // Theme Toggle Functionality - Enhanced with proper icons
    initThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        const html = document.documentElement;

        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem('theme') || 'light';
        
        this.setTheme(savedTheme);

        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = body.getAttribute('data-theme') || 'light';
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                this.setTheme(newTheme);
            });
        }

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            // Only update if user hasn't manually set a theme
            if (!localStorage.getItem('theme')) {
                const theme = e.matches ? 'dark' : 'light';
                this.setTheme(theme);
            }
        });
    }

    setTheme(theme) {
        const body = document.body;
        const html = document.documentElement;
        
        // Set theme on both body and html
        body.setAttribute('data-theme', theme);
        html.setAttribute('data-theme', theme);
        
        // Save to localStorage
        localStorage.setItem('theme', theme);
        
        // Add a subtle animation to the theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.style.transform = 'scale(0.9)';
            setTimeout(() => {
                themeToggle.style.transform = 'scale(1)';
            }, 150);
        }

        // Update header background immediately
        const header = document.querySelector('.header');
        if (header) {
            // Header background is now handled by CSS variables
            header.style.background = 'var(--color-background)';
        }
    }

    // 🍔 COMPLETE MOBILE MENU SOLUTION - Fixed and Working
    initMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuClose = document.querySelector('.mobile-menu-close');
        
        console.log('🔍 Checking mobile menu elements:');
        console.log('Toggle button:', mobileMenuToggle);
        console.log('Menu:', mobileMenu);
        console.log('Close button:', mobileMenuClose);
        
        if (!mobileMenuToggle || !mobileMenu) {
            console.log('❌ Mobile menu elements not found!');
            return;
        }

        // 🍔 HAMBURGER CLICK - Open/Close Menu
        mobileMenuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('🍔 Hamburger clicked!');
            console.log('Menu currently has active class:', mobileMenu.classList.contains('active'));
            
            // Toggle the menu
            if (mobileMenu.classList.contains('active')) {
                // CLOSE menu
                console.log('🔒 Closing menu...');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
                this.resetHamburgerIcon(mobileMenuToggle);
            } else {
                // OPEN menu
                console.log('📂 Opening menu...');
                mobileMenu.classList.add('active');
                document.body.style.overflow = 'hidden';
                this.transformHamburgerToX(mobileMenuToggle);
            }
        });

        // ❌ CLOSE BUTTON CLICK
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('❌ Close button clicked!');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
                this.resetHamburgerIcon(mobileMenuToggle);
            });
        }

        // 🔗 MENU LINK CLICKS - Close menu when clicking any link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                console.log('🔗 Menu link clicked!');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
                this.resetHamburgerIcon(mobileMenuToggle);
            });
        });

        // 🖱️ CLICK OUTSIDE - Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('active')) {
                // Check if click was outside menu and toggle button
                if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                    console.log('🖱️ Clicked outside menu - closing...');
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = 'auto';
                    this.resetHamburgerIcon(mobileMenuToggle);
                }
            }
        });
    }

    // 🍔 Hamburger Animation Helper Functions
    transformHamburgerToX(hamburgerButton) {
        const spans = hamburgerButton.querySelectorAll('span');
        if (spans.length >= 3) {
            spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            spans[0].style.transition = 'transform 0.3s ease';
            
            spans[1].style.opacity = '0';
            spans[1].style.transition = 'opacity 0.3s ease';
            
            spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            spans[2].style.transition = 'transform 0.3s ease';
        }
    }

    resetHamburgerIcon(hamburgerButton) {
        const spans = hamburgerButton.querySelectorAll('span');
        spans.forEach((span) => {
            span.style.transform = 'none';
            span.style.opacity = '1';
            span.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
        });
    }

    // Smooth Scrolling for Navigation Links
    initSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Scroll Animations
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Elements to animate on scroll
        const animateElements = document.querySelectorAll(`
            .service-card,
            .expertise__item,
            .recognition__item,
            .result-card,
            .stat
        `);

        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Stagger animation for stats
        const stats = document.querySelectorAll('.stat');
        stats.forEach((stat, index) => {
            stat.style.transitionDelay = `${index * 0.1}s`;
        });

        // Stagger animation for service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.2}s`;
        });
        
        // Stagger animation for expertise items
        const expertiseItems = document.querySelectorAll('.expertise__item');
        expertiseItems.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
        });
    }

    // Fixed Header - Always visible
    initFixedHeader() {
        const header = document.querySelector('.header');
        
        // Ensure header stays fixed and visible
        if (header) {
            header.style.position = 'fixed';
            header.style.top = '0';
            header.style.transform = 'translateY(0)';
            header.style.transition = 'none';
        }

        // Optional: Add scroll effect for background opacity/blur
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 50) {
                header.style.backdropFilter = 'blur(20px)';
                header.style.webkitBackdropFilter = 'blur(20px)';
                header.style.boxShadow = 'var(--shadow-lg)';
            } else {
                header.style.backdropFilter = 'blur(10px)';
                header.style.webkitBackdropFilter = 'blur(10px)';
                header.style.boxShadow = 'var(--shadow-md)';
            }
        });
    }

    // Service Buttons Functionality
    initServiceButtons() {
        const serviceButtons = document.querySelectorAll('.service-card__action .btn');
        
        serviceButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Add click animation
                button.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    button.style.transform = 'scale(1)';
                }, 150);
                
                // You can add specific functionality here for each service
                // For now, we'll show a simple alert or redirect to contact
                const serviceCard = button.closest('.service-card');
                const serviceTitle = serviceCard.querySelector('.service-card__title').textContent;
                
                // Scroll to contact section
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = contactSection.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Expertise Filter Functionality
    initExpertiseFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const expertiseItems = document.querySelectorAll('.expertise__item');
        
        if (!filterButtons.length || !expertiseItems.length) return;
        
        // Show all items initially
        expertiseItems.forEach(item => {
            item.style.display = 'flex';
        });
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('filter-btn--active'));
                button.classList.add('filter-btn--active');
                
                const filter = button.getAttribute('data-filter');
                
                expertiseItems.forEach(item => {
                    // Reset animations
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(30px)';
                    
                    // Show/hide based on filter
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'flex';
                        // Stagger animation for visible items
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50 * Array.from(expertiseItems).indexOf(item));
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // NEW: Logo Handling Functionality
    initLogoHandling() {
        const logos = document.querySelectorAll('.expertise__logo');
        
        logos.forEach(logo => {
            // Handle logo loading errors
            logo.addEventListener('error', (e) => {
                console.log(`Failed to load logo: ${e.target.src}`);
                // Hide the broken image and show fallback
                e.target.style.display = 'none';
                this.showLogoFallback(e.target);
            });
            
            // Handle successful logo loading
            logo.addEventListener('load', (e) => {
                console.log(`Successfully loaded logo: ${e.target.src}`);
                e.target.style.opacity = '1';
            });
            
            // Set initial opacity to 0 for fade-in effect
            logo.style.opacity = '0';
        });
    }

    // Show fallback for broken logo images
    showLogoFallback(logoElement) {
        const container = logoElement.closest('.expertise__logo-container');
        if (container) {
            // Create a fallback icon
            const fallback = document.createElement('div');
            fallback.innerHTML = '🏢';
            fallback.style.fontSize = '2rem';
            fallback.style.color = 'var(--color-text-secondary)';
            fallback.classList.add('logo-fallback');
            
            container.appendChild(fallback);
        }
    }
}

// Additional utility functions
class Utils {
    // Throttle function for performance
    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Debounce function for performance
    static debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // Check if element is in viewport
    static isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
}

// Enhanced interactions
class EnhancedInteractions {
    constructor() {
        this.initButtonHoverEffects();
        this.initCardHoverEffects();
        this.initProfileImageInteraction();
    }

    initButtonHoverEffects() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                const ripple = document.createElement('div');
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.transform = 'scale(0)';
                
                // 🎯 Subtle ripple effect changes:
                
                // Change 1: Shorter animation time (was 0.6s, now 0.3s)
                ripple.style.animation = 'ripple 0.3s linear';
                
                // Change 2: Much lighter background opacity (was 0.3, now 0.1)
                ripple.style.background = 'rgba(255, 255, 255, 0.1)';
                
                ripple.style.pointerEvents = 'none';
                
                const rect = button.getBoundingClientRect();
                
                // Change 3: Smaller ripple size (reduce the multiplier)
                const size = Math.max(rect.width, rect.height) * 0.7; // was just size, now size * 0.7
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
                ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
                
                button.style.position = 'relative';
                button.appendChild(ripple);
                
                // Change 4: Remove ripple faster (was 600ms, now 300ms)
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.remove();
                    }
                }, 300); // matches the animation duration
            });
        });
    }

    initCardHoverEffects() {
        const cards = document.querySelectorAll('.service-card, .result-card, .recognition__item, .expertise__item, .case-study-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, background-color 0.3s ease';
            });
            
            card.addEventListener('mouseleave', () => {
                if (!card.classList.contains('case-study-card')) {
                    card.style.transform = 'translateY(0)';
                }
            });
        });
    }

    initProfileImageInteraction() {
        const profilePlaceholder = document.querySelector('.profile-image-placeholder');
        
        if (profilePlaceholder) {
            profilePlaceholder.addEventListener('click', () => {
                // Add a subtle bounce animation
                profilePlaceholder.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    profilePlaceholder.style.transform = 'scale(1)';
                }, 150);
                
                // You could add file upload functionality here in the future
                console.log('Profile image placeholder clicked - ready for image upload');
            });
        }
    }
}

// Performance and accessibility enhancements
class PerformanceOptimizer {
    constructor() {
        this.initLazyLoading();
        this.initPreconnects();
        this.initAccessibilityFeatures();
    }

    initLazyLoading() {
        // Lazy load images when they're added later
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
        
        // Also handle regular logo images for better loading experience
        const logoImages = document.querySelectorAll('.expertise__logo');
        logoImages.forEach(img => {
            if (img.complete) {
                img.style.opacity = '1';
            }
        });
    }

    initPreconnects() {
        // Preconnect to external domains for better performance
        const preconnects = [
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com'
        ];

        preconnects.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = url;
            document.head.appendChild(link);
        });
    }

    initAccessibilityFeatures() {
        // Add keyboard navigation support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });

        // Add focus visible styles
        const style = document.createElement('style');
        style.textContent = `
            .keyboard-navigation *:focus {
                outline: 2px solid var(--color-primary) !important;
                outline-offset: 2px !important;
            }
        `;
        document.head.appendChild(style);
        
        // Make case study cards keyboard accessible
        const caseStudyCards = document.querySelectorAll('.case-study-card');
        caseStudyCards.forEach(card => {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });
        });
    }
}

// Logo Manager Class - NEW
class LogoManager {
    constructor() {
        this.logoData = {
            'university-of-glasgow': {
                src: 'logos/university-of-glasgow.png',
                alt: 'University of Glasgow',
                fallback: '🎓'
            },
            'university-of-oxford': {
                src: 'logos/university-of-oxford.png',
                alt: 'University of Oxford',
                fallback: '🏛️'
            },
            'postech': {
                src: 'logos/postech.png',
                alt: 'POSTECH',
                fallback: '🔬'
            },
            'national-subsea-centre': {
                src: 'logos/national-subsea-centre.png',
                alt: 'National Subsea Centre',
                fallback: '🌊'
            },
            'mit': {
                src: 'logos/mit.png',
                alt: 'MIT',
                fallback: '⚛️'
            },
            'stanford': {
                src: 'logos/stanford.png',
                alt: 'Stanford',
                fallback: '🌲'
            },
            'subsea7': {
                src: 'logos/subsea7.png',
                alt: 'Subsea7',
                fallback: '🔧'
            },
            'saudi-aramco': {
                src: 'logos/saudi-aramco.png',
                alt: 'Saudi Aramco',
                fallback: '⛽'
            },
            'hyundai': {
                src: 'logos/hyundai.png',
                alt: 'Hyundai',
                fallback: '🚗'
            },
            'net-zero-tech-centre': {
                src: 'logos/net-zero-tech-centre.png',
                alt: 'Net Zero Tech Centre',
                fallback: '♻️'
            },
            'google': {
                src: 'logos/google.png',
                alt: 'Google',
                fallback: '🔍'
            },
            'microsoft': {
                src: 'logos/microsoft.png',
                alt: 'Microsoft',
                fallback: '💻'
            }
        };
        
        this.initFallbacks();
    }
    
    initFallbacks() {
        const logos = document.querySelectorAll('.expertise__logo');
        
        logos.forEach(logo => {
            const logoKey = this.getLogoKey(logo.src);
            const logoInfo = this.logoData[logoKey];
            
            if (logoInfo) {
                logo.addEventListener('error', () => {
                    this.showFallback(logo, logoInfo.fallback);
                });
            }
        });
    }
    
    getLogoKey(src) {
        // Extract logo key from src path
        const filename = src.split('/').pop().split('.')[0];
        return filename;
    }
    
    showFallback(logoElement, fallbackIcon) {
        const container = logoElement.closest('.expertise__logo-container');
        if (container) {
            logoElement.style.display = 'none';
            
            const fallback = document.createElement('div');
            fallback.innerHTML = fallbackIcon;
            fallback.style.fontSize = '2.5rem';
            fallback.style.color = 'var(--color-text)';
            fallback.classList.add('logo-fallback');
            
            container.appendChild(fallback);
        }
    }
}

// Add CSS for animations
const animationStyles = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes rotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @keyframes logoFadeIn {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    .animate-fade-in-up {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    .logo-fallback {
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }
    
    .case-study-card:focus {
        outline: 2px solid var(--color-primary);
        outline-offset: 2px;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = animationStyles;
document.head.appendChild(styleSheet);

// Dashboard functionality for CBM pages
// Think of this like a super smart power plant control room!
// Now with individual AI models for each machine

// Step 1: Define our 9 sensors with detailed signal ranges
const sensors = [
    { 
        id: 'turbine1', 
        name: '🌪️ Steam Turbine #1', 
        type: 'rotation',
        unit: 'RPM',
        minRange: 2700,
        maxRange: 3300,
        normalRange: [2900, 3100],
        warningRange: [2800, 3200],
        criticalRange: [2700, 3300]
    },
    { 
        id: 'generator1', 
        name: '⚡ Generator #1', 
        type: 'electrical',
        unit: 'MW',
        minRange: 350,
        maxRange: 650,
        normalRange: [450, 550],
        warningRange: [400, 600],
        criticalRange: [350, 650]
    },
    { 
        id: 'boiler1', 
        name: '🔥 Boiler #1', 
        type: 'temperature',
        unit: '°C',
        minRange: 500,
        maxRange: 620,
        normalRange: [540, 580],
        warningRange: [520, 600],
        criticalRange: [500, 620]
    },
    { 
        id: 'pump1', 
        name: '💧 Water Pump #1', 
        type: 'pressure',
        unit: 'Bar',
        minRange: 8,
        maxRange: 35,
        normalRange: [15, 25],
        warningRange: [10, 30],
        criticalRange: [8, 35]
    },
    { 
        id: 'compressor1', 
        name: '🌀 Air Compressor', 
        type: 'pressure',
        unit: 'PSI',
        minRange: 80,
        maxRange: 200,
        normalRange: [120, 150],
        warningRange: [100, 180],
        criticalRange: [80, 200]
    },
    { 
        id: 'cooling1', 
        name: '❄️ Cooling System', 
        type: 'temperature',
        unit: '°C',
        minRange: 25,
        maxRange: 65,
        normalRange: [35, 45],
        warningRange: [30, 55],
        criticalRange: [25, 65]
    },
    { 
        id: 'transformer1', 
        name: '🔌 Main Transformer', 
        type: 'electrical',
        unit: 'kV',
        minRange: 190,
        maxRange: 260,
        normalRange: [220, 240],
        warningRange: [200, 250],
        criticalRange: [190, 260]
    },
    { 
        id: 'motor1', 
        name: '⚙️ Feed Motor', 
        type: 'vibration',
        unit: 'mm/s',
        minRange: 0.5,
        maxRange: 10,
        normalRange: [2, 4],
        warningRange: [1, 8],
        criticalRange: [0.5, 10]
    },
    { 
        id: 'valve1', 
        name: '🚰 Control Valve', 
        type: 'position',
        unit: '%',
        minRange: 10,
        maxRange: 100,
        normalRange: [45, 85],
        warningRange: [20, 95],
        criticalRange: [10, 100]
    }
];

// Step 2: Define AI models with their characteristics
const aiModels = {
    'lstm': { 
        name: 'LSTM Neural Network', 
        baseAccuracy: 94.2, 
        description: 'Deep learning for time series',
        strength: 'Sequential patterns'
    },
    'rf': { 
        name: 'Random Forest', 
        baseAccuracy: 91.8, 
        description: 'Ensemble tree-based model',
        strength: 'Feature importance'
    },
    'svm': { 
        name: 'Support Vector Machine', 
        baseAccuracy: 88.5, 
        description: 'Non-linear classification',
        strength: 'Anomaly detection'
    },
    'arima': { 
        name: 'ARIMA Time Series', 
        baseAccuracy: 85.3, 
        description: 'Statistical forecasting',
        strength: 'Trend analysis'
    },
    'transformer': { 
        name: 'Transformer Model', 
        baseAccuracy: 96.1, 
        description: 'Attention-based architecture',
        strength: 'Complex patterns'
    }
};

// Step 3: Store data and model selections
let sensorData = {};
let sensorModels = {}; // Individual model selection for each sensor
let notifications = [];
let lastRefreshTime = null;

// Step 4: Initialize model selections (each sensor starts with a different model)
function initializeModelSelections() {
    const modelKeys = Object.keys(aiModels);
    sensors.forEach((sensor, index) => {
        sensorModels[sensor.id] = modelKeys[index % modelKeys.length];
    });
}

// Step 5: Generate dummy data with more realistic patterns
function generateDummyData(sensor) {
    const dataPoints = 100; // More data points for better spectrograms
    const data = [];
    let currentValue = (sensor.normalRange[0] + sensor.normalRange[1]) / 2;
    
    for (let i = 0; i < dataPoints; i++) {
        // Add sine wave pattern + noise (like real sensor behavior)
        const timePattern = Math.sin(i * 0.1) * 5;
        const randomNoise = (Math.random() - 0.5) * 10;
        currentValue += timePattern + randomNoise;
        
        // Keep values within realistic bounds
        currentValue = Math.max(sensor.criticalRange[0] * 0.9, 
                              Math.min(sensor.criticalRange[1] * 1.1, currentValue));
        
        data.push({
            timestamp: new Date(Date.now() - (dataPoints - i) * 30000), // 30 second intervals
            value: Math.round(currentValue * 100) / 100,
            frequency: Math.random() * 100 // For spectrogram
        });
    }
    
    return data;
}

// Step 6: Check sensor status based on ranges
function getSensorStatus(sensor, currentValue) {
    if (currentValue >= sensor.normalRange[0] && currentValue <= sensor.normalRange[1]) {
        return 'normal';
    } else if (currentValue >= sensor.warningRange[0] && currentValue <= sensor.warningRange[1]) {
        return 'warning';
    } else {
        return 'critical';
    }
}

// Step 7: Create range bar with current value indicator
function createRangeBar(sensor, currentValue) {
    const totalRange = sensor.maxRange - sensor.minRange;
    const currentPosition = ((currentValue - sensor.minRange) / totalRange) * 100;
    
    return `
        <div class="sensor-ranges">
            <div class="range-title">Signal Range: ${sensor.minRange} - ${sensor.maxRange} ${sensor.unit}</div>
            <div class="range-bar">
                <div class="range-indicator" style="left: ${Math.min(95, Math.max(5, currentPosition))}%;"></div>
            </div>
            <div class="range-labels">
                <span>Min: ${sensor.minRange}</span>
                <span>Normal: ${sensor.normalRange[0]}-${sensor.normalRange[1]}</span>
                <span>Max: ${sensor.maxRange}</span>
            </div>
        </div>
    `;
}

// Step 8: Create enhanced sensor cards with individual model selection
function createSensorCard(sensor) {
    const data = sensorData[sensor.id];
    const currentValue = data[data.length - 1].value;
    const previousValue = data[data.length - 2].value;
    const status = getSensorStatus(sensor, currentValue);
    const selectedModel = sensorModels[sensor.id];
    const modelInfo = aiModels[selectedModel];
    
    // Calculate model-specific accuracy (varies based on sensor type and model)
    const baseAccuracy = modelInfo.baseAccuracy;
    const variation = (Math.random() - 0.5) * 4; // ±2% variation
    const currentAccuracy = Math.max(75, Math.min(99, baseAccuracy + variation));
    
    // Generate prediction based on current status and model
    const predictions = ['Normal Operation', 'Minor Adjustment Needed', 'Schedule Maintenance', 'Immediate Attention'];
    const prediction = status === 'normal' ? predictions[0] : 
                     status === 'warning' ? predictions[Math.floor(Math.random() * 2) + 1] : 
                     predictions[3];
    
    const trend = currentValue > previousValue ? '📈' : currentValue < previousValue ? '📉' : '➡️';
    
    return `
        <div class="sensor-card">
            <div class="sensor-header">
                <div class="sensor-name">${sensor.name}</div>
                <div class="status-indicator status-${status}"></div>
            </div>
            
            <div class="sensor-model-selector">
                <label>AI Model:</label>
                <select onchange="changeSensorModel('${sensor.id}', this.value)">
                    ${Object.keys(aiModels).map(key => 
                        `<option value="${key}" ${key === selectedModel ? 'selected' : ''}>${aiModels[key].name}</option>`
                    ).join('')}
                </select>
            </div>
            
            ${createRangeBar(sensor, currentValue)}
            
            <div class="sensor-values">
                <div class="value-item">
                    <div class="value-label">Current Value</div>
                    <div class="value-number">${currentValue} ${sensor.unit}</div>
                </div>
                <div class="value-item">
                    <div class="value-label">Trend ${trend}</div>
                    <div class="value-number">${Math.abs(currentValue - previousValue).toFixed(2)}</div>
                </div>
                <div class="value-item">
                    <div class="value-label">Status</div>
                    <div class="value-number">${status.toUpperCase()}</div>
                </div>
                <div class="value-item">
                    <div class="value-label">Model Strength</div>
                    <div class="value-number">${modelInfo.strength}</div>
                </div>
            </div>
            
            <div class="chart-container" id="chart-${sensor.id}">
                <!-- Chart will be inserted here -->
            </div>
            
            <div class="chart-legend">
                <div class="chart-legend-title">📈 Time Series Chart Legend</div>
                <div class="chart-legend-items">
                    <div class="chart-legend-item">
                        <span class="legend-indicator" style="background: #4CAF50;"></span>
                        <span>Normal Range</span>
                    </div>
                    <div class="chart-legend-item">
                        <span class="legend-indicator" style="background: #FF9800;"></span>
                        <span>Warning Zone</span>
                    </div>
                    <div class="chart-legend-item">
                        <span class="legend-indicator" style="background: #f44336;"></span>
                        <span>Critical Alert</span>
                    </div>
                </div>
                <div style="margin-top: 0.5rem; font-size: 0.75rem;">
                    <strong>X-Axis:</strong> Time (Last 100 readings, 30s intervals) | 
                    <strong>Y-Axis:</strong> ${sensor.unit} Values (${sensor.minRange}-${sensor.maxRange})
                </div>
            </div>
            
            <div class="model-prediction">
                <div class="prediction-title">${modelInfo.name} Prediction</div>
                <div class="prediction-value">${prediction}</div>
                <div class="prediction-accuracy">Accuracy: ${currentAccuracy.toFixed(1)}%</div>
            </div>
        </div>
    `;
}

// Step 9: Create enhanced charts with critical level indicators and axis labels
function createEnhancedChart(data, sensor, status) {
    const canvas = document.createElement('canvas');
    canvas.width = 350;
    canvas.height = 150;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Get current theme
    const isDarkMode = document.body.getAttribute('data-theme') === 'dark';
    const textColor = isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';
    
    // Reserve space for axis labels
    const chartLeft = 40;
    const chartRight = canvas.width - 20;
    const chartTop = 20;
    const chartBottom = canvas.height - 30;
    const chartWidth = chartRight - chartLeft;
    const chartHeight = chartBottom - chartTop;
    
    // Draw background grid
    ctx.strokeStyle = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = chartTop + (i / 5) * chartHeight;
        ctx.beginPath();
        ctx.moveTo(chartLeft, y);
        ctx.lineTo(chartRight, y);
        ctx.stroke();
    }
    
    // Draw time grid lines
    for (let i = 0; i <= 4; i++) {
        const x = chartLeft + (i / 4) * chartWidth;
        ctx.beginPath();
        ctx.moveTo(x, chartTop);
        ctx.lineTo(x, chartBottom);
        ctx.stroke();
    }
    
    // Draw Y-axis labels (sensor values)
    ctx.fillStyle = textColor;
    ctx.font = '10px Arial';
    ctx.textAlign = 'right';
    const maxVal = sensor.maxRange;
    const minVal = sensor.minRange;
    for (let i = 0; i <= 5; i++) {
        const value = minVal + (maxVal - minVal) * (1 - i / 5);
        const y = chartTop + (i / 5) * chartHeight;
        ctx.fillText(value.toFixed(0), chartLeft - 5, y + 3);
    }
    
    // Draw X-axis labels (time)
    ctx.textAlign = 'center';
    for (let i = 0; i <= 4; i++) {
        const x = chartLeft + (i / 4) * chartWidth;
        const timeAgo = (4 - i) * 25; // 25 minutes ago intervals
        ctx.fillText(`-${timeAgo}m`, x, chartBottom + 15);
    }
    
    // Draw axis lines
    ctx.strokeStyle = textColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(chartLeft, chartTop);
    ctx.lineTo(chartLeft, chartBottom);
    ctx.lineTo(chartRight, chartBottom);
    ctx.stroke();
    
    // Draw critical level lines
    const normalMin = chartTop + (1 - (sensor.normalRange[0] - minVal) / (maxVal - minVal)) * chartHeight;
    const normalMax = chartTop + (1 - (sensor.normalRange[1] - minVal) / (maxVal - minVal)) * chartHeight;
    
    // Normal range background
    ctx.fillStyle = 'rgba(76, 175, 80, 0.1)';
    ctx.fillRect(chartLeft, normalMax, chartWidth, normalMin - normalMax);
    
    // Warning lines
    ctx.strokeStyle = '#FF9800';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    
    const warningMinY = chartTop + (1 - (sensor.warningRange[0] - minVal) / (maxVal - minVal)) * chartHeight;
    const warningMaxY = chartTop + (1 - (sensor.warningRange[1] - minVal) / (maxVal - minVal)) * chartHeight;
    
    ctx.beginPath();
    ctx.moveTo(chartLeft, warningMinY);
    ctx.lineTo(chartRight, warningMinY);
    ctx.moveTo(chartLeft, warningMaxY);
    ctx.lineTo(chartRight, warningMaxY);
    ctx.stroke();
    
    // Reset line dash
    ctx.setLineDash([]);
    
    // Draw main data line
    let lineColor = '#4CAF50';
    if (status === 'warning') lineColor = '#FF9800';
    if (status === 'critical') lineColor = '#f44336';
    
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 3;
    
    ctx.beginPath();
    data.forEach((point, index) => {
        const x = chartLeft + (index / (data.length - 1)) * chartWidth;
        const y = chartTop + (1 - (point.value - minVal) / (maxVal - minVal)) * chartHeight;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();
    
    // Add current value indicator
    const lastPoint = data[data.length - 1];
    const lastX = chartRight - 5;
    const lastY = chartTop + (1 - (lastPoint.value - minVal) / (maxVal - minVal)) * chartHeight;
    
    ctx.fillStyle = lineColor;
    ctx.beginPath();
    ctx.arc(lastX, lastY, 6, 0, 2 * Math.PI);
    ctx.fill();
    
    // Add axis labels
    ctx.fillStyle = textColor;
    ctx.font = 'bold 11px Arial';
    ctx.textAlign = 'center';
    
    // Y-axis label
    ctx.save();
    ctx.translate(15, chartTop + chartHeight / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(`${sensor.unit}`, 0, 0);
    ctx.restore();
    
    // X-axis label
    ctx.fillText('Time (minutes ago)', chartLeft + chartWidth / 2, canvas.height - 5);
    
    return canvas;
}

// Step 10: Create spectrogram visualization
function createSpectrogram(sensorId) {
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 280;
    const ctx = canvas.getContext('2d');
    
    const data = sensorData[sensorId];
    const sensor = sensors.find(s => s.id === sensorId);
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Create frequency analysis visualization
    const timeSteps = 20;
    const freqBins = 15;
    const cellWidth = canvas.width / timeSteps;
    const cellHeight = canvas.height / freqBins;
    
    // Generate spectrogram data (simulated FFT)
    for (let t = 0; t < timeSteps; t++) {
        for (let f = 0; f < freqBins; f++) {
            // Simulate frequency intensity based on sensor data
            const dataIndex = Math.floor((t / timeSteps) * data.length);
            const value = data[dataIndex] ? data[dataIndex].value : 0;
            const normalizedValue = (value - sensor.minRange) / (sensor.maxRange - sensor.minRange);
            
            // Create frequency pattern
            const freqIntensity = Math.sin(f * 0.5 + t * 0.3) * normalizedValue + 
                                 Math.random() * 0.3;
            const intensity = Math.max(0, Math.min(1, freqIntensity));
            
            // Color mapping: blue (low) -> green -> yellow -> red (high)
            let color;
            if (intensity < 0.25) {
                color = `rgb(${Math.floor(intensity * 4 * 255)}, 0, 255)`;
            } else if (intensity < 0.5) {
                color = `rgb(0, ${Math.floor((intensity - 0.25) * 4 * 255)}, ${255 - Math.floor((intensity - 0.25) * 4 * 255)})`;
            } else if (intensity < 0.75) {
                color = `rgb(${Math.floor((intensity - 0.5) * 4 * 255)}, 255, 0)`;
            } else {
                color = `rgb(255, ${255 - Math.floor((intensity - 0.75) * 4 * 255)}, 0)`;
            }
            
            ctx.fillStyle = color;
            ctx.fillRect(t * cellWidth, (freqBins - f - 1) * cellHeight, cellWidth, cellHeight);
        }
    }
    
    // Add frequency labels
    const isDarkMode = document.body.getAttribute('data-theme') === 'dark';
    ctx.fillStyle = isDarkMode ? 'white' : 'black';
    ctx.font = '10px Arial';
    ctx.fillText('High Freq', 5, 15);
    ctx.fillText('Low Freq', 5, canvas.height - 5);
    ctx.fillText('Time →', canvas.width - 50, canvas.height - 5);
    
    return canvas;
}

// Step 11: Handle model selection change for individual sensors
function changeSensorModel(sensorId, modelKey) {
    sensorModels[sensorId] = modelKey;
    console.log(`🔄 Changed model for ${sensorId} to ${aiModels[modelKey].name}`);
    updateDashboard();
}

// Step 12: Generate global analytics
function generateGlobalAnalytics() {
    const totalSensors = sensors.length;
    const normalCount = sensors.filter(sensor => {
        const currentValue = sensorData[sensor.id][sensorData[sensor.id].length - 1].value;
        return getSensorStatus(sensor, currentValue) === 'normal';
    }).length;
    
    const warningCount = sensors.filter(sensor => {
        const currentValue = sensorData[sensor.id][sensorData[sensor.id].length - 1].value;
        return getSensorStatus(sensor, currentValue) === 'warning';
    }).length;
    
    const criticalCount = totalSensors - normalCount - warningCount;
    
    const overallHealth = (normalCount / totalSensors) * 100;
    const avgAccuracy = Object.keys(sensorModels).reduce((sum, sensorId) => {
        return sum + aiModels[sensorModels[sensorId]].baseAccuracy;
    }, 0) / totalSensors;
    
    return `
        <div class="analytics-card">
            <div class="analytics-card__title">Overall Health</div>
            <div class="analytics-card__value" style="color: ${overallHealth > 75 ? '#4CAF50' : overallHealth > 50 ? '#FF9800' : '#f44336'}">${overallHealth.toFixed(1)}%</div>
        </div>
        <div class="analytics-card">
            <div class="analytics-card__title">Normal Systems</div>
            <div class="analytics-card__value" style="color: #4CAF50">${normalCount}/${totalSensors}</div>
        </div>
        <div class="analytics-card">
            <div class="analytics-card__title">Warning Systems</div>
            <div class="analytics-card__value" style="color: #FF9800">${warningCount}/${totalSensors}</div>
        </div>
        <div class="analytics-card">
            <div class="analytics-card__title">Critical Systems</div>
            <div class="analytics-card__value" style="color: #f44336">${criticalCount}/${totalSensors}</div>
        </div>
        <div class="analytics-card">
            <div class="analytics-card__title">Avg AI Accuracy</div>
            <div class="analytics-card__value">${avgAccuracy.toFixed(1)}%</div>
        </div>
        <div class="analytics-card">
            <div class="analytics-card__title">Active Models</div>
            <div class="analytics-card__value">${new Set(Object.values(sensorModels)).size}</div>
        </div>
    `;
}

// Step 13: Generate notifications with model-specific insights
function generateNotifications() {
    const possibleNotifications = [
        { type: 'info', message: '🔧 LSTM model detected pattern in Turbine #1 - maintenance window optimized' },
        { type: 'warning', message: '⚠️ Random Forest model predicts temperature spike in Boiler #1 within 2 hours' },
        { type: 'critical', message: '🚨 SVM model detected anomaly in Cooling System - immediate inspection required' },
        { type: 'info', message: '📊 ARIMA model forecasts stable operations for next 48 hours' },
        { type: 'warning', message: '⚡ Transformer model identified vibration pattern in Feed Motor' },
        { type: 'info', message: '🤖 Model ensemble accuracy improved to 96.2% after latest data integration' },
        { type: 'critical', message: '🔴 Multiple models agree: Pump #1 pressure approaching critical threshold' },
        { type: 'info', message: '✅ All AI models successfully updated with latest sensor calibrations' }
    ];
    
    // Add new notification occasionally
    if (Math.random() > 0.85 && notifications.length < 6) {
        const newNotification = possibleNotifications[Math.floor(Math.random() * possibleNotifications.length)];
        newNotification.timestamp = new Date();
        notifications.unshift(newNotification);
    }
    
    return notifications.map(notification => `
        <div class="notification-item notification-${notification.type}">
            <div class="notification-message">${notification.message}</div>
            <div class="notification-timestamp">
                ${notification.timestamp.toLocaleTimeString()}
            </div>
        </div>
    `).join('');
}

// Step 14: Initialize everything
function initializeDashboard() {
    console.log('🚀 Starting enhanced dashboard with individual AI models...');
    
    // Initialize model selections
    initializeModelSelections();
    
    // Generate data for all sensors
    sensors.forEach(sensor => {
        sensorData[sensor.id] = generateDummyData(sensor);
    });
    
    // Populate spectrogram selector if it exists
    const spectrogramSelect = document.getElementById('spectrogramSelect');
    if (spectrogramSelect) {
        spectrogramSelect.innerHTML = sensors.map(sensor => 
            `<option value="${sensor.id}">${sensor.name}</option>`
        ).join('');
        
        // Set initial spectrogram
        spectrogramSelect.addEventListener('change', updateSpectrogram);
    }
    
    // Update the display
    updateDashboard();
    if (typeof updateSpectrogram === 'function') {
        updateSpectrogram();
    }
    
    // Set up automatic updates every 5 seconds
    setInterval(() => {
        updateSensorData();
        updateDashboard();
    }, 5000);
}

// Step 15: Update sensor data with new readings
function updateSensorData() {
    sensors.forEach(sensor => {
        const lastValue = sensorData[sensor.id][sensorData[sensor.id].length - 1].value;
        const variation = (Math.random() - 0.5) * 8;
        let newValue = lastValue + variation;
        
        // Keep values realistic
        newValue = Math.max(sensor.criticalRange[0] * 0.9, 
                          Math.min(sensor.criticalRange[1] * 1.1, newValue));
        
        sensorData[sensor.id].push({
            timestamp: new Date(),
            value: Math.round(newValue * 100) / 100,
            frequency: Math.random() * 100
        });
        
        // Keep only last 100 data points
        if (sensorData[sensor.id].length > 100) {
            sensorData[sensor.id].shift();
        }
    });
}

// Step 16: Update the entire dashboard
function updateDashboard() {
    console.log('🔄 Updating enhanced dashboard...');
    
    // Update sensor cards if element exists
    const sensorsGrid = document.getElementById('sensorsGrid');
    if (sensorsGrid) {
        sensorsGrid.innerHTML = sensors.map(sensor => createSensorCard(sensor)).join('');
        
        // Add enhanced charts to each sensor card
        sensors.forEach(sensor => {
            const chartContainer = document.getElementById(`chart-${sensor.id}`);
            if (chartContainer) {
                const currentValue = sensorData[sensor.id][sensorData[sensor.id].length - 1].value;
                const status = getSensorStatus(sensor, currentValue);
                const chart = createEnhancedChart(sensorData[sensor.id], sensor, status);
                chartContainer.innerHTML = '';
                chartContainer.appendChild(chart);
            }
        });
    }
    
    // Update global analytics if element exists
    const globalAnalytics = document.getElementById('globalAnalytics');
    if (globalAnalytics) {
        globalAnalytics.innerHTML = generateGlobalAnalytics();
    }
    
    // Update notifications if element exists
    const notificationsList = document.getElementById('notificationsList');
    if (notificationsList) {
        notificationsList.innerHTML = generateNotifications();
    }
    
    // Update timestamp if element exists
    const lastUpdate = document.getElementById('lastUpdate');
    if (lastUpdate) {
        lastUpdate.textContent = new Date().toLocaleTimeString();
    }
}

// Step 17: Update spectrogram
function updateSpectrogram() {
    const spectrogramSelect = document.getElementById('spectrogramSelect');
    const spectrogramContainer = document.getElementById('spectrogramContainer');
    
    if (spectrogramSelect && spectrogramContainer) {
        const selectedSensorId = spectrogramSelect.value;
        const spectrogram = createSpectrogram(selectedSensorId);
        spectrogramContainer.innerHTML = '';
        spectrogramContainer.appendChild(spectrogram);
    }
}

// Step 18: Manual refresh function
function refreshData() {
    console.log('🔄 Manual refresh triggered with model updates');
    lastRefreshTime = new Date();
    
    const lastRefresh = document.getElementById('lastRefresh');
    if (lastRefresh) {
        lastRefresh.textContent = lastRefreshTime.toLocaleTimeString();
    }
    
    // Generate fresh data for all sensors
    sensors.forEach(sensor => {
        sensorData[sensor.id] = generateDummyData(sensor);
    });
    
    updateDashboard();
    if (typeof updateSpectrogram === 'function') {
        updateSpectrogram();
    }
    
    // Add refresh notification
    notifications.unshift({
        type: 'info',
        message: '🔄 Data refreshed - All AI models retrained with latest sensor readings',
        timestamp: new Date()
    });
}

// Step 19: Emergency trigger function
function triggerEmergency() {
    alert('🚨 EMERGENCY ALERT TRIGGERED!\n\nActions Taken:\n• Human operator notified\n• Maintenance team dispatched\n• Operations supervisor alerted\n• All AI models flagged for emergency protocols\n• Safety systems activated');
    
    // Add emergency notification
    notifications.unshift({
        type: 'critical',
        message: '🚨 EMERGENCY: Human-in-the-loop intervention activated - All AI systems in safety mode',
        timestamp: new Date()
    });
    
    // Update display
    updateDashboard();
}

// Gallery Slider Functionality
function initGallerySlider() {
    const track = document.querySelector('.gallery-slider__track');
    const slides = document.querySelectorAll('.gallery__item');
    const prevBtn = document.querySelector('.gallery-slider__btn--prev');
    const nextBtn = document.querySelector('.gallery-slider__btn--next');
    
    if (!track || !slides.length) return;
    
    let current = 0;
    let autoSlideInterval;

    function updateSlider() {
        track.style.transform = `translateX(-${current * 100}vw)`;
    }

    function goToPrev() {
        current = (current - 1 + slides.length) % slides.length;
        updateSlider();
    }

    function goToNext() {
        current = (current + 1) % slides.length;
        updateSlider();
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToPrev();
            resetAutoSlide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToNext();
            resetAutoSlide();
        });
    }

    // Optional: swipe support for mobile
    let startX = null;
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    track.addEventListener('touchend', (e) => {
        if (startX === null) return;
        let endX = e.changedTouches[0].clientX;
        if (endX - startX > 50) {
            goToPrev();
            resetAutoSlide();
        } else if (startX - endX > 50) {
            goToNext();
            resetAutoSlide();
        }
        startX = null;
    });

    // Auto-slide every 4 seconds
    function startAutoSlide() {
        autoSlideInterval = setInterval(goToNext, 4000);
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    startAutoSlide();
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main app
    new PortfolioApp();
    new EnhancedInteractions();
    new PerformanceOptimizer();
    new LogoManager();
    
    // Initialize gallery slider if elements exist
    initGallerySlider();
    
    // Initialize dashboard if on dashboard page
    if (document.getElementById('sensorsGrid')) {
        initializeDashboard();
    }
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Handle window resize for mobile menu
    window.addEventListener('resize', Utils.debounce(() => {
        const nav = document.getElementById('nav');
        if (window.innerWidth > 768 && nav) {
            nav.style.display = '';
            nav.style.position = '';
            nav.style.top = '';
            nav.style.left = '';
            nav.style.right = '';
            nav.style.background = '';
            nav.style.padding = '';
            nav.style.borderTop = '';
            nav.style.boxShadow = '';
            
            const navList = nav.querySelector('.nav__list');
            if (navList) {
                navList.style.flexDirection = '';
                navList.style.gap = '';
            }
        }
    }, 250));
});

// Add event listeners for dashboard controls if they exist
window.addEventListener('load', function() {
    // Dashboard time range change listener
    const timeRange = document.getElementById('timeRange');
    if (timeRange) {
        timeRange.addEventListener('change', function() {
            console.log('📊 Time range changed to:', this.value);
            updateDashboard();
        });
    }
    
    console.log('🏭 Portfolio Website fully loaded and initialized!');
});

// Handle page visibility change for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when page becomes visible
        document.body.style.animationPlayState = 'running';
    }
});

// Error handling for better UX
window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
    // You could implement error reporting here
});