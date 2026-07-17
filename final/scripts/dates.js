// ===== CURRENT YEAR =====
const yearSpan = document.getElementById('currentyear');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// ===== LAST MODIFIED DATE =====
const lastModified = document.getElementById('lastModified');
if (lastModified) {
    lastModified.textContent = `Last Modified: ${document.lastModified}`;
}