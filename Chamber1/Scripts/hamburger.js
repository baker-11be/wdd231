// ===== HAMBURGER MENU TOGGLE =====

const hamburger = document.getElementById('hamburger-menu');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
});

// Close menu when a link is clicked (for mobile)
document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.textContent = '☰';
    });
});