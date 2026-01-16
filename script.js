// Personal Website JavaScript
// Version: 2.0
// Date: 2026-01-16

// DOM Elements
const elements = {
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    mobileMenu: document.getElementById('mobileMenu'),
    navbar: document.getElementById('navbar'),
    toast: document.getElementById('toast'),
    backToTopBtn: document.getElementById('backToTop'),
    timeGreeting: document.getElementById('time-greeting')
};

// Mobile Menu Toggle
function initMobileMenu() {
    if (elements.mobileMenuBtn && elements.mobileMenu) {
        elements.mobileMenuBtn.addEventListener('click', () => {
            const isHidden = elements.mobileMenu.classList.contains('hidden');
            elements.mobileMenu.classList.toggle('hidden');
            elements.mobileMenuBtn.setAttribute('aria-expanded', !isHidden);
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('#mobileMenu a').forEach(link => {
            link.addEventListener('click', () => {
                elements.mobileMenu.classList.add('hidden');
                elements.mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

// Copy to Clipboard Functionality
function initCopyToClipboard() {
    document.querySelectorAll('.copy-text').forEach(element => {
        const text = element.dataset.copy;
        const button = element.nextElementSibling;
        
        if (button && text) {
            button.addEventListener('click', () => {
                navigator.clipboard.writeText(text)
                    .then(() => showToast())
                    .catch(err => console.error('Failed to copy: ', err));
            });
        }
    });
}

// Toast Notification
function showToast() {
    if (elements.toast) {
        elements.toast.classList.remove('translate-y-20', 'opacity-0');
        elements.toast.classList.add('translate-y-0', 'opacity-100');
        
        setTimeout(() => {
            elements.toast.classList.remove('translate-y-0', 'opacity-100');
            elements.toast.classList.add('translate-y-20', 'opacity-0');
        }, 2000);
    }
}

// Scroll Reveal Animation
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with opacity-0 class
    const animatedElements = document.querySelectorAll('[class*="opacity-0"]');
    animatedElements.forEach(element => observer.observe(element));
}

// Sticky Navigation Background Change
function initStickyNavigation() {
    if (elements.navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                elements.navbar.classList.add('shadow-md', 'bg-white');
                elements.navbar.classList.remove('bg-white/80');
            } else {
                elements.navbar.classList.remove('shadow-md', 'bg-white');
                elements.navbar.classList.add('bg-white/80');
            }
        }, { passive: true });
    }
}

// Time-based Greeting Function
function updateGreeting() {
    if (!elements.timeGreeting) return;
    
    const now = new Date();
    const hour = now.getHours();
    
    let greeting;
    if (hour < 6) {
        greeting = 'Hi~ 凌晨好！';
    } else if (hour < 12) {
        greeting = 'Hi~ 上午好！';
    } else if (hour < 18) {
        greeting = 'Hi~ 下午好！';
    } else {
        greeting = 'Hi~ 晚上好！';
    }
    
    elements.timeGreeting.textContent = greeting;
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Back to Top Button
function initBackToTop() {
    if (elements.backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                elements.backToTopBtn.classList.remove('translate-y-20', 'opacity-0');
                elements.backToTopBtn.classList.add('translate-y-0', 'opacity-100');
            } else {
                elements.backToTopBtn.classList.add('translate-y-20', 'opacity-0');
                elements.backToTopBtn.classList.remove('translate-y-0', 'opacity-100');
            }
        });
        
        // Smooth scroll to top when button is clicked
        elements.backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initCopyToClipboard();
    initScrollReveal();
    initStickyNavigation();
    initSmoothScrolling();
    initBackToTop();
    
    // Update greeting when page loads
    updateGreeting();
    
    // Update greeting every minute
    setInterval(updateGreeting, 60000);
});