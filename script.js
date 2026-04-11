


function handleBooking(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const course = document.getElementById('course').value;
    
    const message = `Assalamu Alaikum ${name}! Your session for the ${course} course has been requested. We will contact you via email shortly.`;
    
    alert(message);
    event.target.reset();
}


function toggleLanguage() {
    const btn = document.querySelector('.lang-switch');
    btn.textContent = btn.textContent === 'EN' ? 'AR' : 'EN';
    alert("Language switching feature coming soon!");
}


window.addEventListener('scroll', () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if(cardTop < window.innerHeight - 100) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
});

// Initialize cards for reveal
document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease-out';
});