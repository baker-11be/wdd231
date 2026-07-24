/**
 * join.js – Handles:
 * - Setting the timestamp in the hidden field at form submission time
 * - Membership card animations (optional)
 * - Modal open/close for membership benefits
 * - Hamburger menu toggle (if not handled elsewhere)
 */

(function() {
    'use strict';

    // --- 1. Timestamp on submit ---
    const form = document.getElementById('membership-form');
    const timestampField = document.getElementById('timestamp');

    if (form && timestampField) {
        form.addEventListener('submit', function() {
            // Set timestamp to current ISO string (UTC)
            const now = new Date();
            timestampField.value = now.toISOString(); // e.g., "2026-07-23T18:44:00.000Z"
            // You can also use toLocaleString if you prefer local format, but ISO is safe.
        });
    }

    // --- 2. Modal functionality ---
    const modalLinks = document.querySelectorAll('.learn-more');
    const modalOverlays = document.querySelectorAll('.modal-overlay');
    const closeButtons = document.querySelectorAll('.modal-close');

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal(modal) {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    // Open modal when "Learn More" clicked
    modalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            openModal(modalId);
        });
    });

    // Close modal on close button click
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal-overlay');
            closeModal(modal);
        });
    });

    // Close modal on click outside the modal box
    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modalOverlays.forEach(overlay => {
                if (overlay.style.display === 'flex') {
                    closeModal(overlay);
                }
            });
        }
    });

    // --- 3. Membership card animation on load (optional) ---
    // Add a class after a small delay to trigger CSS transitions
    const cards = document.querySelectorAll('.membership-card');
    if (cards.length) {
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 150 + index * 100);
        });
    }

})();