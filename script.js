/* script.js - Updated for Tayassar School */

// 1. Language Switch Toggle
// Changes the button text between EN and AR
function toggleLanguage() {
    const btn = document.querySelector('.lang-switch');
    if (btn) {
        btn.textContent = btn.textContent === 'EN' ? 'AR' : 'EN';
        alert("Language switching feature coming soon!");
    }
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


