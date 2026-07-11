// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('primary-nav');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
    const isOpen = nav.classList.contains('open');
    hamburger.textContent = isOpen ? '✕' : '☰';
    hamburger.setAttribute('aria-label', isOpen ? 'Close Navigation Menu' : 'Toggle Navigation Menu');
});

// ===== CLOSE MENU ON LINK CLICK (Mobile UX) =====
const navLinks = document.querySelectorAll('#primary-nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('open');
        hamburger.textContent = '☰';
        hamburger.setAttribute('aria-label', 'Toggle Navigation Menu');
    });
});

// ===== WAYFINDING: Highlight current page =====
const currentPath = window.location.pathname;
navLinks.forEach(link => {
    const href = link.getAttribute('href');
    // Remove any existing active class
    link.classList.remove('active');
    // Check if this link matches the current page
    if (href === 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('index.html'))) {
        link.classList.add('active');
    } else if (currentPath.includes(href) && href !== 'index.html') {
        link.classList.add('active');
    }
});