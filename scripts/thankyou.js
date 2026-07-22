/**
 * thankyou.js
 * Reads URL parameters, extracts form data,
 * displays user information, and formats the timestamp.
 */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {

        // --- 1. Read URL Parameters ---
        const params = new URLSearchParams(window.location.search);

        // --- 2. Extract Form Data ---
        const formData = {};
        for (let [key, value] of params.entries()) {
            formData[key] = decodeURIComponent(value.replace(/\+/g, ' '));
        }

        // --- 3. Display User Information ---
        const container = document.getElementById('submitted-data');

        if (!container) {
            console.warn('Container #submitted-data not found.');
            return;
        }

        if (Object.keys(formData).length === 0) {
            container.innerHTML = `
                <p class="error-msg">No data was submitted. Please go back and fill out the form.</p>
            `;
            return;
        }

        // Build the display list
        let html = `<ul class="data-list">`;

        // Define the fields we want to display (in order)
        const displayFields = [
            { key: 'first-name', label: 'First Name' },
            { key: 'last-name', label: 'Last Name' },
            { key: 'email', label: 'Email Address' },
            { key: 'phone', label: 'Phone Number' },
            { key: 'business', label: 'Organization Name' },
            { key: 'timestamp', label: 'Application Date' }
        ];

        displayFields.forEach(field => {
            let value = formData[field.key] || '—';

            // Format the timestamp nicely
            if (field.key === 'timestamp' && value !== '—') {
                try {
                    const date = new Date(value);
                    if (!isNaN(date)) {
                        value = date.toLocaleString('en-US', {
                            timeZone: 'Africa/Kampala',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                        });
                    }
                } catch (e) {
                    // Keep raw value if parsing fails
                }
            }

            html += `
                <li>
                    <strong>${field.label}</strong>
                    <span>${value}</span>
                </li>
            `;
        });

        html += `</ul>`;

        // Add a thank you message
        html += `
            <p class="thankyou-message" style="margin-top:1.5rem; color:#1a73e8; font-weight:600;">
                ✅ We have received your application. A confirmation email will be sent shortly.
            </p>
        `;

        container.innerHTML = html;

        // --- 4. Footer Year ---
        const yearSpan = document.getElementById('year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }

        console.log('Thank you page loaded with data:', formData);

    }); // end DOMContentLoaded

})();