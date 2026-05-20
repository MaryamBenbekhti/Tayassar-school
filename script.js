
// Your global language switch logic continues below...
/* script.js - Updated for Tayassar School */

// 1. Language Switch Toggle
// Global Language Switch Logic (EN -> AR -> FR)
// Global Language Switch Logic (Error-Tolerant Version)
// Global Language Switch Logic (Form-Protected Version)
function toggleLanguage() {
    const btn = document.querySelector('.lang-switch');
    if (!btn) return;

    let currentLang = btn.textContent.trim();
    let nextLang = 'EN';

    // 1. Precise Language Cycle Logic
    if (currentLang === 'EN') {
        nextLang = 'AR';
    } else if (currentLang === 'AR') {
        nextLang = 'FR';
    } else {
        nextLang = 'EN';
    }

    // Update the button indicator text visually
    btn.textContent = nextLang;

    // 2. Fetch all elements tagged for translation
    const translateElements = document.querySelectorAll('[data-en]');
    
    translateElements.forEach(el => {
        try {
            const enText = el.getAttribute('data-en') || '';
            const arText = el.getAttribute('data-ar') || enText;
            const frText = el.getAttribute('data-fr') || enText;

            let targetedText = enText;
            if (nextLang === 'AR') targetedText = arText;
            if (nextLang === 'FR') targetedText = frText;

            // Handle standard input fields & placeholders safely
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.setAttribute('placeholder', targetedText);
            } 
            // Handle select dropdown options safely without destroying Formspree values
            else if (el.tagName === 'OPTION') {
                el.text = targetedText;
            } 
            // Handle regular structural elements
            else {
                el.innerHTML = targetedText;
            }
        } catch (error) {
            console.warn("Skipped translating element:", error);
        }
    });

    // 3. Dynamic RTL Layout Toggling
    if (nextLang === 'AR') {
        document.body.setAttribute('dir', 'rtl');
        document.body.classList.add('arabic-font');
    } else {
        document.body.setAttribute('dir', 'ltr');
        document.body.classList.remove('arabic-font');
    }
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


