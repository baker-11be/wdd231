document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const dataContainer = document.getElementById('submitted-data');
    const fields = [
        { label: 'Full Name', key: 'name' },
        { label: 'Email Address', key: 'email' },
        { label: 'Phone Number', key: 'phone' },
        { label: 'Subject', key: 'subject' },
        { label: 'Message', key: 'message' }
    ];

    let hasData = false;
    let html = '';

    fields.forEach(field => {
        const value = params.get(field.key);
        if (value) {
            hasData = true;
            html += `
                <div class="data-row">
                    <span class="data-label">${field.label}</span>
                    <span class="data-value">${escapeHtml(value)}</span>
                </div>
            `;
        }
    });

    if (hasData) {
        dataContainer.innerHTML = html;
    } else {
        dataContainer.innerHTML = `
            <div class="data-row">
                <span class="data-label">Status</span>
                <span class="data-value">No form data submitted</span>
            </div>
        `;
    }

    renderVisitSummary();
});

function renderVisitSummary() {
    const storageKey = 'cattleHubVisitData';
    const now = Date.now();
    let visitData = { count: 0, lastVisit: null };
    const stored = localStorage.getItem(storageKey);

    if (stored) {
        try {
            visitData = JSON.parse(stored);
        } catch (error) {
            visitData = { count: 0, lastVisit: null };
        }
    }

    const previousVisit = Number(visitData.lastVisit);
    const count = (Number(visitData.count) || 0) + 1;
    const visitCountElement = document.getElementById('visit-count');
    const visitLastElement = document.getElementById('visit-last');

    if (visitCountElement) {
        visitCountElement.textContent = String(count);
    }

    if (visitLastElement) {
        if (previousVisit && !Number.isNaN(previousVisit)) {
            visitLastElement.textContent = new Date(previousVisit).toLocaleString();
        } else {
            visitLastElement.textContent = 'First recorded visit.';
        }
    }

    localStorage.setItem(storageKey, JSON.stringify({ count, lastVisit: now }));
}

function escapeHtml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
