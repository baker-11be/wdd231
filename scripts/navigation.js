/**
 * navigation.js
 * Handles:
 * - Hamburger menu toggle (responsive)
 * - ARIA accessibility for mobile menu
 * - Wayfinding: highlights the active page in the navigation
 * - Closes menu automatically after link click (mobile UX)
 */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {

        // --- 1. Get elements ---
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');

        // If either element is missing, exit silently (prevents errors)
        if (!hamburger || !navMenu) {
            console.warn('Navigation elements not found. Ensure #hamburger and #nav-menu exist.');
            return;
        }

        // --- 2. Hamburger toggle ---
        hamburger.addEventListener('click', function() {
            // Toggle the 'open' class on the navigation list
            navMenu.classList.toggle('open');

            // Toggle ARIA attribute for accessibility
            const isOpen = navMenu.classList.contains('open');
            hamburger.setAttribute('aria-expanded', isOpen);

            // Optional: change hamburger icon text (☰ / ✕)
            hamburger.textContent = isOpen ? '✕' : '☰';
        });

        // --- 3. Close menu when a link is clicked (mobile) ---
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Only close if the menu is currently open (on mobile)
                if (navMenu.classList.contains('open')) {
                    navMenu.classList.remove('open');
                    hamburger.setAttribute('aria-expanded', 'false');
                    hamburger.textContent = '☰';
                }
            });
        });

        // --- 4. Wayfinding: Highlight the current page ---
        // Get the current page filename (e.g., 'index.html', 'join.html', etc.)
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            // If the link's href matches the current page, add 'active' class
            if (href === currentPage) {
                link.classList.add('active');
            } else {
                // Ensure other links don't have the 'active' class (cleanup)
                link.classList.remove('active');
            }
        });

        // --- 5. Handle hash links or query strings (optional) ---
        // If your links have parameters (e.g., index.html?foo=bar), strip them.
        // We already compare exact filenames, so this is a fallback.
        // For 'index.html' vs '/', we treat them as the same.
        if (currentPage === '' || currentPage === '/') {
            // If the page is the root (e.g., just 'https://site.com/'),
            // we manually highlight the Home link.
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href === 'index.html' || href === '/') {
                    link.classList.add('active');
                }
            });
        }

        // --- 6. Ensure hamburger starts with correct ARIA state ---
        // If the menu is closed by default, aria-expanded should be 'false'
        if (!navMenu.classList.contains('open')) {
            hamburger.setAttribute('aria-expanded', 'false');
        }

        console.log('Navigation initialized. Current page:', currentPage);

    }); // end DOMContentLoaded

})();