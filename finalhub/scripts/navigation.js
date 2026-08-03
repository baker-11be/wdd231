document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('primary-nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            const expanded = nav.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', expanded);
        });
    }

    // Wayfinding: highlight current page
    const current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('#primary-nav a').forEach(link => {
        if (link.getAttribute('href') === current) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});