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

    // Mobile Menu Toggle
    initMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const nav = document.getElementById('nav');
        
        if (!mobileMenuToggle || !nav) return;
        
        let isMenuOpen = false;

        mobileMenuToggle.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            this.toggleMobileMenu(isMenuOpen);
        });

        // Close menu when clicking on nav links
        const navLinks = nav.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (isMenuOpen) {
                    isMenuOpen = false;
                    this.toggleMobileMenu(false);
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (isMenuOpen && !nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                isMenuOpen = false;
                this.toggleMobileMenu(false);
            }
        });
    }

    toggleMobileMenu(isOpen) {
        const nav = document.getElementById('nav');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        
        if (!nav || !mobileMenuToggle) return;
        
        const spans = mobileMenuToggle.querySelectorAll('span');

        if (isOpen) {
            nav.style.display = 'block';
            nav.style.position = 'absolute';
            nav.style.top = '100%';
            nav.style.left = '0';
            nav.style.right = '0';
            nav.style.background = 'var(--color-background)';
            nav.style.padding = '2rem';
            nav.style.borderTop = '2px solid var(--color-border)';
            nav.style.boxShadow = 'var(--shadow-md)';
            nav.style.zIndex = '1000';
            
            const navList = nav.querySelector('.nav__list');
            if (navList) {
                navList.style.flexDirection = 'column';
                navList.style.gap = '2rem';
            }

            // Animate hamburger to X
            spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            nav.style.display = '';
            
            // Reset hamburger
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
            
            // Reset any other styles that might cause issues
            setTimeout(() => {
                if (window.innerWidth > 768) {
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
            }, 300);
        }
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
                ripple.style.animation = 'ripple 0.6s linear';
                ripple.style.background = 'rgba(255, 255, 255, 0.3)';
                ripple.style.pointerEvents = 'none';
                
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
                ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
                
                button.style.position = 'relative';
                button.appendChild(ripple);
                
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.remove();
                    }
                }, 600);
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
            transform: scale(4);
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

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main app
    new PortfolioApp();
    new EnhancedInteractions();
    new PerformanceOptimizer();
    new LogoManager();
    
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