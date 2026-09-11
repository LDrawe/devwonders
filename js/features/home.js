import { renderHomeCards } from '../utils/dom.js';

// Render the cards dynamically
renderHomeCards();

// Interactive card radial gradient glow tracking mouse movement
function handleGlow(e) {
    const card = e.target.closest('.card');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
}

document.addEventListener('mousemove', handleGlow, { passive: true });
