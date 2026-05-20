// ==========================================
// 1. Global Language Switch Logic
// ==========================================
function toggleLanguage() {
    const btn = document.querySelector('.lang-switch');
    if (!btn) return;

    let currentLang = btn.textContent.trim();
    let nextLang = 'EN';

    if (currentLang === 'EN') {
        nextLang = 'AR';
    } else if (currentLang === 'AR') {
        nextLang = 'FR';
    } else {
        nextLang = 'EN';
    }

    btn.textContent = nextLang;

    const translateElements = document.querySelectorAll('[data-en]');
    
    translateElements.forEach(el => {
        try {
            const enText = el.getAttribute('data-en') || '';
            const arText = el.getAttribute('data-ar') || enText;
            const frText = el.getAttribute('data-fr') || enText;

            let targetedText = enText;
            if (nextLang === 'AR') targetedText = arText;
            if (nextLang === 'FR') targetedText = frText;

            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.setAttribute('placeholder', targetedText);
            } else if (el.tagName === 'OPTION') {
                el.text = targetedText;
            } else {
                el.innerHTML = targetedText;
            }

            if (nextLang === 'AR') {
                el.classList.add('arabic-text');
            } else {
                el.classList.remove('arabic-text');
            }
        } catch (error) {
            console.warn("Skipped translating element:", error);
        }
    });

    if (nextLang === 'AR') {
        document.body.setAttribute('dir', 'rtl');
        document.body.classList.add('arabic-font');
    } else {
        document.body.setAttribute('dir', 'ltr');
        document.body.classList.remove('arabic-font');
    }
}

// ==========================================
// 2. Scroll Reveal Animation Mechanics
// ==========================================
function revealCards() {
    const cards = document.querySelectorAll('.card, .trial-banner');
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight - 100;

        if (cardTop < triggerPoint) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
}

// ==========================================
// 3. Document Initialization & Listeners
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card, .trial-banner');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.8s ease-out';
    });

    // Run once on load
    revealCards();

    // Active Link Highlighter
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });
});

// Listen for scroll events safely
window.addEventListener('scroll', revealCards);
