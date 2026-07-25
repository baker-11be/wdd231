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
            const now = new Date();
            timestampField.value = now.toISOString();
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

    modalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            openModal(modalId);
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal-overlay');
            closeModal(modal);
        });
    });

    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modalOverlays.forEach(overlay => {
                if (overlay.style.display === 'flex') {
                    closeModal(overlay);
                }
            });
        }
    });

    // --- 3. Membership card animation on load ---
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

    // --- 4. Hamburger (if not already handled by navigation.js) ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('#primary-nav ul');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('open');
        });
    }

    // --- 5. Footer year and last modified ---
    const yearSpan = document.getElementById('footer-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    const modSpan = document.getElementById('footer-modified');
    if (modSpan) modSpan.textContent = document.lastModified;

})();