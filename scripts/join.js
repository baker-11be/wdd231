/**
 * join.js
 * Handles:
 * - Hamburger menu toggle (if not already handled by navigation.js)
 * - Timestamp injection
 * - Modal open/close
 * - Card entrance animation (already in CSS, but ensures dynamic)
 * - Form validation enhancement
 */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {

        // --- 1. Hamburger Menu (fallback in case navigation.js is missing) ---
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function() {
                navMenu.classList.toggle('open');
                const expanded = navMenu.classList.contains('open');
                hamburger.setAttribute('aria-expanded', expanded);
            });
        }

        // --- 2. Inject Current Timestamp into Hidden Field ---
        const timestampInput = document.getElementById('timestamp');
        if (timestampInput) {
            const now = new Date();
            // ISO format: YYYY-MM-DDTHH:mm:ss.sssZ (universal)
            timestampInput.value = now.toISOString();
        }

        // --- 3. Modal Logic ---
        // Open modal when "Learn More" buttons are clicked
        const openButtons = document.querySelectorAll('.modal-open-btn');
        const overlays = document.querySelectorAll('.modal-overlay');

        openButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const targetId = this.dataset.modal;
                const targetModal = document.getElementById(targetId);
                if (targetModal) {
                    targetModal.classList.add('active');
                    // Trap focus inside modal (optional improvement)
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
                }
            });
        });

        // Close modal by clicking outside the content area (on the overlay)
        overlays.forEach(overlay => {
            overlay.addEventListener('click', function(e) {
                // Only close if the click is directly on the overlay (not its children)
                if (e.target === this) {
                    this.classList.remove('active');
                }
            });
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const activeModal = document.querySelector('.modal-overlay.active');
                if (activeModal) {
                    activeModal.classList.remove('active');
                }
            }
        });

        // --- 4. Form Validation Enhancement (HTML5 + custom feedback) ---
        const form = document.getElementById('membership-form');
        if (form) {
            form.addEventListener('submit', function(e) {
                // HTML5 validation will run automatically.
                // If you want custom validation, check here.
                // Example: Ensure title has a certain format if filled.
                const title = document.getElementById('title');
                if (title && title.value && title.value.length < 2) {
                    e.preventDefault();
                    alert('Organization Title must be at least 2 characters.');
                    title.focus();
                    return;
                }

                // If valid, the form submits via GET to thankyou.html
                // The timestamp is already set.
                console.log('Form submitted with timestamp:', document.getElementById('timestamp').value);
            });
        }

        // --- 5. Footer Year (if not in main.js) ---
        const yearSpan = document.getElementById('year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
        const modifiedSpan = document.getElementById('last-modified');
        if (modifiedSpan) {
            modifiedSpan.textContent = new Date(document.lastModified).toLocaleDateString('en-US', {
                year: 'numeric', month: 'short', day: 'numeric'
            });
        }

    }); // end DOMContentLoaded

})();