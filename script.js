/* script.js - Updated for Tayassar School */

// 1. Language Switch Toggle
// 1. Three-Way Language Switch Toggle (EN -> AR -> FR)
function toggleLanguage() {
    const btn = document.querySelector('.lang-switch');
    if (!btn) return;

    let currentLang = btn.textContent.trim();
    let nextLang = 'EN';

    // Cycle through languages
    if (currentLang === 'EN') {
        nextLang = 'AR';
    } else if (currentLang === 'AR') {
        nextLang = 'FR';
    } else if (currentLang === 'FR') {
        nextLang = 'EN';
    }

    // Update the button text to show the active language
    btn.textContent = nextLang;

    // Find all elements marked for translation
    const translateElements = document.querySelectorAll('[data-en]');

    translateElements.forEach(el => {
        if (nextLang === 'AR') {
            // Switch to Arabic
            el.textContent = el.getAttribute('data-ar') || el.getAttribute('data-en');
            el.classList.add('arabic-text');
            if (el.hasAttribute('dir')) el.setAttribute('dir', 'rtl');
        } else if (nextLang === 'FR') {
            // Switch to French
            el.textContent = el.getAttribute('data-fr') || el.getAttribute('data-en');
            el.classList.remove('arabic-text');
            if (el.hasAttribute('dir')) el.setAttribute('dir', 'ltr');
        } else {
            // Switch back to English
            el.textContent = el.getAttribute('data-en');
            el.classList.remove('arabic-text');
            if (el.hasAttribute('dir')) el.setAttribute('dir', 'ltr');
        }
    });
}

// 2. Scroll Reveal Animation
// This makes the cards fade in smoothly as you scroll down
const revealCards = () => {
    const cards = document.querySelectorAll('.card, .trial-banner');
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight - 100;

        if(cardTop < triggerPoint) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
};

// 3. Initialize Elements
// Sets the starting position for animations
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card, .trial-banner');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.8s ease-out';
    });

    // Run once on load in case elements are already in view
    revealCards();
});

// Listen for scroll events
window.addEventListener('scroll', revealCards);

// 4. Active Link Highlighter
// Underlines the current page in the navbar
document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add('active');
    }
});


