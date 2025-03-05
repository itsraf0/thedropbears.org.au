// Navigation initialization
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Navigation scroll effect
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

async function loadNavigation() {
    const navPlaceholder = document.getElementById('nav-placeholder');
    if (!navPlaceholder) return;

    try {
        const response = await fetch('/nav.html');
        const html = await response.text();
        navPlaceholder.innerHTML = html;

        // Set active state based on current path
        const currentPath = window.location.pathname;
        const navId = `nav-${currentPath.split('/')[1] || 'home'}`;
        const activeLink = document.getElementById(navId);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        initializeNavigation();
    } catch (error) {
        console.error('Error loading navigation:', error);
    }
}

// Call loadNavigation when the page loads
document.addEventListener('DOMContentLoaded', loadNavigation); 