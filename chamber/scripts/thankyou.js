// thankyou.js — chamber thank-you page logic

(function() {
    'use strict';

    // ============================================================
    // 1. URL-PARAM HELPERS — read GET query string.
    // ============================================================
    function getParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name) || '';
    }

    function formatTimestamp(timestamp) {
        if (!timestamp) return 'Not recorded';
        try {
            const date = new Date(timestamp);
            if (isNaN(date.getTime())) return timestamp;
            return date.toLocaleString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
        } catch (_) {
            return timestamp;
        }
    }

    function getMembershipInfo(value) {
        const map = {
            'np':     { label: 'NP (Non-Profit – No Fee)', cls: 'np' },
            'bronze': { label: 'Bronze',                    cls: 'bronze' },
            'silver': { label: 'Silver',                    cls: 'silver' },
            'gold':   { label: 'Gold',                      cls: 'gold' }
        };
        const lower = (value || '').toLowerCase();
        const info  = map[lower] || { label: value || 'Not selected', cls: '' };
        return info;
    }

    // ============================================================
    // 2. BUILD THE SUBMISSION SUMMARY TABLE.
    // ============================================================
    function buildDataRows() {
        const firstname   = getParam('firstname');
        const lastname    = getParam('lastname');
        const orgtitle    = getParam('orgtitle');
        const email       = getParam('email');
        const phone       = getParam('phone');
        const business    = getParam('business');
        const membership  = getParam('membership');
        const description = getParam('description');
        const timestamp   = getParam('timestamp');

        const memInfo = getMembershipInfo(membership);
        const membershipDisplay = memInfo.label;
        const membershipClass   = memInfo.cls;

        const formattedTime = formatTimestamp(timestamp);

        const fields = [
            { label: 'FIRST NAME',             value: firstname || '—' },
            { label: 'LAST NAME',              value: lastname  || '—' },
            { label: 'ORGANIZATIONAL TITLE',   value: orgtitle  || '—' },
            { label: 'EMAIL ADDRESS',          value: email     || '—' },
            { label: 'MOBILE NUMBER',          value: phone     || '—' },
            { label: 'BUSINESS/ORG NAME',      value: business  || '—' },
            { label: 'SELECTED TIER',          value: membershipDisplay, extra: 'membership-badge ' + membershipClass },
            { label: 'BUSINESS DESCRIPTION',   value: description || '—' },
            { label: 'SUBMISSION TIME',        value: formattedTime, extra: 'timestamp' }
        ];

        let html = '';
        fields.forEach(field => {
            const valueClass = field.extra ? 'data-value ' + field.extra : 'data-value';
            const displayValue = field.value || '—';
            html += `
                <div class="data-label">${field.label}</div>
                <div class="${valueClass}">${displayValue}</div>
            `;
        });
        return html;
    }

    function renderData() {
        const container = document.getElementById('submitted-data');
        if (!container) return;

        const hasParams = window.location.search.length > 1;
        if (!hasParams) {
            container.innerHTML = `
                <div class="no-data">
                    <p>No application data found. Please <a href="join.html">fill out the form</a> first.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = buildDataRows();
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderData);
    } else {
        renderData();
    }

    // ============================================================
    // 3. HAMBURGER MENU (same pattern as join.html — custom bar
    //    spans, UL inside header).
    // ============================================================
    (function initHamburger() {
        const hamburger = document.getElementById('hamburger');
        const navMenu   = document.querySelector('#primary-nav ul');
        if (!hamburger || !navMenu) return;

        function closeMenu() {
            navMenu.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-label', 'Toggle navigation menu');
        }

        hamburger.addEventListener('click', function() {
            const isOpen = navMenu.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            hamburger.setAttribute(
                'aria-label',
                isOpen ? 'Close navigation menu' : 'Toggle navigation menu'
            );
        });

        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => link.addEventListener('click', closeMenu));
    })();

    // ============================================================
    // 4. WAYFINDING — highlight the current page in the nav.
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
    // 5. FOOTER DYNAMIC TEXT.
    // ============================================================
    const yearSpan = document.getElementById('footer-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    const modSpan = document.getElementById('footer-modified');
    if (modSpan) modSpan.textContent = document.lastModified;

})();
