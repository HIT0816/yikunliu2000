// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Copy to Clipboard Functionality
const copyTexts = document.querySelectorAll('.copy-text');

copyTexts.forEach(element => {
    const text = element.dataset.copy;
    const button = element.nextElementSibling;
    
    button.addEventListener('click', () => {
        navigator.clipboard.writeText(text).then(() => {
            showToast();
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    });
});

// Toast Notification
const toast = document.getElementById('toast');

function showToast() {
    toast.classList.remove('translate-y-20', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
    
    setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 2000);
}

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    observer.observe(section);
});

// Sticky Navigation Background Change
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-md');
        navbar.classList.remove('bg-white/80');
        navbar.classList.add('bg-white');
    } else {
        navbar.classList.remove('shadow-md');
        navbar.classList.add('bg-white/80');
        navbar.classList.remove('bg-white');
    }
});

// Time-based Greeting Function
function updateGreeting() {
    const greetingElement = document.getElementById('time-greeting');
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
    
    greetingElement.textContent = greeting;
}

// Update greeting when page loads
updateGreeting();

// Update greeting every minute
setInterval(updateGreeting, 60000);