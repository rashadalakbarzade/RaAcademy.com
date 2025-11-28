// =============================================
// RA Trading Academy - Main JavaScript
// =============================================

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// =============================================
// Navigation Functions
// =============================================

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class for styling
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// =============================================
// Stats Counter Animation
// =============================================

const statsNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const animateStats = () => {
    if (statsAnimated) return;
    
    statsNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCount = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target;
            }
        };
        
        updateCount();
    });
    
    statsAnimated = true;
};

// Trigger stats animation when in viewport
const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    const observerOptions = {
        threshold: 0.5
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
            }
        });
    }, observerOptions);
    
    statsObserver.observe(statsSection);
}

// =============================================
// Scroll to Top Button
// =============================================

const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// =============================================
// Active Navigation Link Highlighting
// =============================================

const sections = document.querySelectorAll('section[id]');

const highlightNavigation = () => {
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (navLink) {
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
};

window.addEventListener('scroll', highlightNavigation);

// =============================================
// Prevent external links from being intercepted
// =============================================

document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});

// =============================================
// Loading Animation
// =============================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// =============================================
// Console Message
// =============================================

console.log('%cRA Trading Academy', 'color: #4FC3F7; font-size: 24px; font-weight: bold;');
console.log('%cСайт создан для профессионального обучения трейдингу', 'color: #81D4FA; font-size: 14px;');
console.log('%cСвязаться: https://wa.me/905531519830', 'color: #B0BEC5; font-size: 12px;');

// =============================================
// Parallax Effect for Hero Section
// =============================================

const heroBg = document.querySelector('.hero-bg');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    
    if (heroBg && scrolled < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// =============================================
// Intersection Observer for Fade-in Animations
// =============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// =============================================
// Form Validation (if contact form is added later)
// =============================================

// Placeholder for future contact form validation
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// =============================================
// WhatsApp Click Tracking
// =============================================

document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', () => {
        console.log('WhatsApp link clicked');
        // Here you could add analytics tracking
    });
});

// =============================================
// Telegram Click Tracking
// =============================================

document.querySelectorAll('a[href*="t.me"]').forEach(link => {
    link.addEventListener('click', () => {
        console.log('Telegram link clicked');
        // Here you could add analytics tracking
    });
});

// =============================================
// Dynamic Year for Copyright
// =============================================

const updateCopyrightYear = () => {
    const yearElement = document.querySelector('.footer-text');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2025', currentYear);
    }
};

updateCopyrightYear();