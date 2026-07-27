// join.js — chamber join page logic

(function() {
    'use strict';

    // ============================================================
    // 1. HIDDEN TIMESTAMP — set when the page loads (do NOT reset
    //    on submit; the spec asks for the form-load time).
    // ============================================================
    const form = document.getElementById('membership-form');
    const timestampField = document.getElementById('timestamp');

    if (form && timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // ============================================================
    // 2. HAMBURGER MENU (custom, matches the join.html structure
    //    where the nav UL is inside <header> and the hamburger
    //    uses CSS bar spans instead of text glyphs).
    // ============================================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('#primary-nav ul');

    function closeHamburgerMenu() {
        if (navMenu && navMenu.classList.contains('open')) {
            navMenu.classList.remove('open');
            if (hamburger) {
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.setAttribute('aria-label', 'Toggle navigation menu');
            }
        }
    }

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            const isOpen = navMenu.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            hamburger.setAttribute(
                'aria-label',
                isOpen ? 'Close navigation menu' : 'Toggle navigation menu'
            );
        });

        // Close menu when a nav link is clicked (mobile UX).
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', closeHamburgerMenu);
        });
    }

    // ============================================================
    // 3. WAYFINDING — add "active" class to the current page link.
    //    (Replaces navigation.js which we can't use here because
    //    the join.html header structure is different.)
    // ============================================================
    (function setActiveNavLink() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const links = document.querySelectorAll('#primary-nav ul li a');
        links.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.remove('active');
            if (href === 'index.html' && (currentPath === '' || currentPath === 'index.html')) {
                link.classList.add('active');
            } else if (href === currentPath) {
                link.classList.add('active');
            }
        });
    })();

    // ============================================================
    // 4. MEMBERSHIP MODALS — open/close, escape key, backdrop.
    // ============================================================
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

    // ============================================================
    // 5. CARD ENTRY ANIMATION (staggered fade + slide-up on
    //    initial page load — only on viewports ≥ 768px).
    // ============================================================
    const cards = document.querySelectorAll('.membership-card');
    const isMobile = window.innerWidth < 768;

    if (cards.length && !isMobile) {
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 150 + index * 150);
        });
    } else {
        cards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }

    // ============================================================
    // 6. FOOTER DYNAMIC TEXT — year and document last-modified.
    // ============================================================
    const yearSpan = document.getElementById('footer-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    const modSpan = document.getElementById('footer-modified');
    if (modSpan) modSpan.textContent = document.lastModified;

})();
