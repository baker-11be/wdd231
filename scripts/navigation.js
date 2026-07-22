/**
 * navigation.js
 * Handles hamburger menu, ARIA attributes, and wayfinding.
 */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {

        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');

        if (!hamburger || !navMenu) {
            console.warn('Navigation elements not found.');
            return;
        }

        // Toggle hamburger menu
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('open');
            const isOpen = navMenu.classList.contains('open');
            hamburger.setAttribute('aria-expanded', isOpen);
            hamburger.textContent = isOpen ? '✕' : '☰';
        });

        // Close menu when link is clicked (mobile)
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navMenu.classList.contains('open')) {
                    navMenu.classList.remove('open');
                    hamburger.setAttribute('aria-expanded', 'false');
                    hamburger.textContent = '☰';
                }
            });
        });

        // Wayfinding: Highlight current page
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Handle root path
        if (currentPage === '' || currentPage === '/') {
            navLinks.forEach(link => {
                if (link.getAttribute('href') === 'index.html' || link.getAttribute('href') === '/') {
                    link.classList.add('active');
                }
            });
        }

        hamburger.setAttribute('aria-expanded', 'false');
        console.log('Navigation initialized.');

    });

})();