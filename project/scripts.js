/**
 * Mgahinga Mountain Hiking — Site Plan
 * scripts.js
 *
 * Provides a simple dark/light theme toggle for previewing
 * the color scheme in different contexts.
 */

document.addEventListener('DOMContentLoaded', function () {

    // ---- Theme Toggle ----
    const toggleBtn = document.getElementById('themeToggle');
    const body = document.body;

    // Check for saved preference
    const savedTheme = localStorage.getItem('mgahinga-theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        toggleBtn.textContent = '☀️ Light Preview';
    } else {
        toggleBtn.textContent = '🌙 Dark Preview';
    }

    // Toggle on click
    toggleBtn.addEventListener('click', function () {
        body.classList.toggle('dark-theme');

        if (body.classList.contains('dark-theme')) {
            localStorage.setItem('mgahinga-theme', 'dark');
            toggleBtn.textContent = '☀️ Light Preview';
        } else {
            localStorage.setItem('mgahinga-theme', 'light');
            toggleBtn.textContent = '🌙 Dark Preview';
        }
    });

    // ---- Optional: Console info ----
    console.log('🌿 Mgahinga Mountain Hiking — Site Plan loaded.');
    console.log('🎨 Enhanced color scheme: Green, Cream, Brown, Gold/Terracotta.');
});