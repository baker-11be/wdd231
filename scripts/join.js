/**
 * join.js
 * Handles:
 * - Timestamp injection into hidden field
 * - Modal open/close functionality
 * - Form validation enhancement
 * - Hamburger menu (if navigation.js is missing)
 */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {

        // --- 1. Hamburger Menu (fallback if navigation.js not loaded) ---
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function() {
                navMenu.classList.toggle('open');
                const isOpen = navMenu.classList.contains('open');
                hamburger.setAttribute('aria-expanded', isOpen);
                hamburger.textContent = isOpen ? '✕' : '☰';
            });

            // Close menu when a link is clicked (mobile UX)
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
        }

        // --- 2. Inject Current Timestamp into Hidden Field ---
        const timestampInput = document.getElementById('timestamp');
        if (timestampInput) {
            const now = new Date();
            timestampInput.value = now.toISOString();
            console.log('Timestamp set:', timestampInput.value);
        }

        // --- 3. Modal Logic ---

        // Open modal when "Learn More" buttons are clicked
        const openButtons = document.querySelectorAll('.modal-open-btn');
        const overlays = document.querySelectorAll('.modal-overlay');

        openButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const targetId = this.getAttribute('data-modal');
                const targetModal = document.getElementById(targetId);
                if (targetModal) {
                    targetModal.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Prevent scrolling
                }
            });
        });

        // Close modal with the "X" button
        const closeButtons = document.querySelectorAll('.modal-close-btn');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const modal = this.closest('.modal-overlay');
                if (modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = ''; // Restore scrolling
                }
            });
        });

        // Close modal by clicking outside the content area
        overlays.forEach(overlay => {
            overlay.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const activeModal = document.querySelector('.modal-overlay.active');
                if (activeModal) {
                    activeModal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });

        // --- 4. Form Validation Enhancement ---
        const form = document.getElementById('membership-form');

        if (form) {
            form.addEventListener('submit', function(e) {
                // HTML5 validation will run automatically

                // Additional validation: ensure title meets pattern if filled
                const titleInput = document.getElementById('title');
                if (titleInput && titleInput.value) {
                    const pattern = /^[A-Za-z\s\-]{7,}$/;
                    if (!pattern.test(titleInput.value)) {
                        e.preventDefault();
                        alert('Organization Title must contain at least 7 letters, spaces, or hyphens only.');
                        titleInput.focus();
                        titleInput.setCustomValidity('Must contain at least 7 letters, spaces, or hyphens only.');
                        return;
                    } else {
                        titleInput.setCustomValidity('');
                    }
                }

                // Ensure timestamp is set
                const ts = document.getElementById('timestamp');
                if (ts && !ts.value) {
                    ts.value = new Date().toISOString();
                }

                console.log('Form submitted successfully.');
            });

            // Clear custom validity on input
            const titleInput = document.getElementById('title');
            if (titleInput) {
                titleInput.addEventListener('input', function() {
                    this.setCustomValidity('');
                });
            }
        }

        // --- 5. Footer Year ---
        const yearSpan = document.getElementById('year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }

        const modifiedSpan = document.getElementById('last-modified');
        if (modifiedSpan) {
            const lastMod = new Date(document.lastModified);
            modifiedSpan.textContent = lastMod.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }

        console.log('join.js initialized successfully.');

    }); // end DOMContentLoaded

})();