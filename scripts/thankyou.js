/**
 * thankyou.js
 * Reads URL parameters, extracts form data,
 * displays user information, and formats timestamp.
 */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {

        // --- 1. Read URL Parameters ---
        const params = new URLSearchParams(window.location.search);

        // --- 2. Extract Form Data into an object ---
        const formData = {};
        for (let [key, value] of params.entries()) {
            // Decode URL-encoded characters (e.g., %40 -> @, + -> space)
            formData[key] = decodeURIComponent(value.replace(/\+/g, ' '));
        }

        // --- 3. Display User Information ---
        const container = document.getElementById('submitted-data');
        if (!container) return;

        if (Object.keys(formData).length === 0) {
            container.innerHTML = `<p>No data was submitted.</p>`;
            return;
        }

        // Build a clean list
        let html = `<ul class="data-list">`;
        for (const [key, value] of Object.entries(formData)) {
            // Capitalize and format the key name
            let label = key
                .replace(/-/g, ' ')          // Replace hyphens with spaces
                .replace(/_/g, ' ')          // Replace underscores with spaces
                .replace(/\b\w/g, l => l.toUpperCase()); // Capitalize first letters

            // Special display for timestamp: format it nicely
            let displayValue = value || '—';
            if (key === 'timestamp' && value) {
                try {
                    const date = new Date(value);
                    if (!isNaN(date)) {
                        displayValue = date.toLocaleString('en-US', {
                            timeZone: 'Africa/Kampala', // Adjust to your local time
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                        });
                    }
                } catch (e) { /* fallback to raw value */ }
            }

            html += `<li><strong>${label}</strong> <span>${displayValue}</span></li>`;
        }
        html += `</ul>`;
        html += `<p class="thanks-msg">We have received your application. You will hear from us shortly.</p>`;

        container.innerHTML = html;

        // --- 4. Format and display a dedicated timestamp (if needed elsewhere) ---
        // The timestamp is already shown in the list, but we can also put it in a footer span.
        // Not needed, but we update the year in footer.
        const yearSpan = document.getElementById('year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }

        console.log('Form data displayed:', formData);

    }); // end DOMContentLoaded

})();