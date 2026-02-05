// DOM Elements
const bgElements = document.getElementById('bgElements');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const celebration = document.getElementById('celebration');
const celebrationBg = document.getElementById('celebrationBg');

// ========== Background Floating Elements ==========
function createFloatingElements() {
    const emojis = ['❤️', '💕', '💗', '🩷', '💖', '🎈'];

    for (let i = 0; i < 15; i++) {
        setTimeout(() => createFloating(emojis), i * 400);
    }

    setInterval(() => createFloating(emojis), 1500);
}

function createFloating(emojis) {
    const el = document.createElement('div');
    el.className = 'floating';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    const size = 20 + Math.random() * 25;
    const left = Math.random() * 100;
    const duration = 12 + Math.random() * 8;

    el.style.fontSize = size + 'px';
    el.style.left = left + '%';
    el.style.animationDuration = duration + 's';

    bgElements.appendChild(el);

    setTimeout(() => el.remove(), duration * 1000);
}

// ========== No Button Escape Logic ==========
// Track mouse position
let mouseX = 0;
let mouseY = 0;

// Track button's transform offset (cumulative)
let offsetX = 0;
let offsetY = 0;

// Store initial button position (center of button in its original spot)
let initialRect = null;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    checkProximity();
});

document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
        checkProximity();
    }
});

function checkProximity() {
    // Get button's current visual position
    const rect = noBtn.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;

    // Distance from mouse to button center
    const dx = mouseX - btnCenterX;
    const dy = mouseY - btnCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Trigger escape when mouse gets within 100px
    if (distance < 100) {
        escapeButton();
    }
}

function escapeButton() {
    // Store initial position on first escape
    if (initialRect === null) {
        initialRect = noBtn.getBoundingClientRect();
    }

    const rect = noBtn.getBoundingClientRect();
    const btnW = rect.width;
    const btnH = rect.height;

    // Direction away from mouse
    const btnCenterX = rect.left + btnW / 2;
    const btnCenterY = rect.top + btnH / 2;

    const dx = btnCenterX - mouseX;
    const dy = btnCenterY - mouseY;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;

    // Normalize and scale escape distance
    const escapeDistance = 100;
    const moveX = (dx / dist) * escapeDistance;
    const moveY = (dy / dist) * escapeDistance;

    // Calculate new offset
    let newOffsetX = offsetX + moveX;
    let newOffsetY = offsetY + moveY;

    // Calculate where button would be visually
    const newLeft = initialRect.left + newOffsetX;
    const newTop = initialRect.top + newOffsetY;
    const newRight = newLeft + btnW;
    const newBottom = newTop + btnH;

    // Viewport bounds with padding
    const padding = 20;
    const viewW = window.innerWidth;
    const viewH = window.innerHeight;

    // Clamp to keep button on screen
    if (newLeft < padding) {
        newOffsetX = padding - initialRect.left;
    }
    if (newTop < padding) {
        newOffsetY = padding - initialRect.top;
    }
    if (newRight > viewW - padding) {
        newOffsetX = viewW - padding - btnW - initialRect.left;
    }
    if (newBottom > viewH - padding) {
        newOffsetY = viewH - padding - btnH - initialRect.top;
    }

    // Update state
    offsetX = newOffsetX;
    offsetY = newOffsetY;

    // Apply transform
    noBtn.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
}

// Prevent clicking the No button
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    escapeButton();
});

// ========== Yes Button - Celebration ==========
yesBtn.addEventListener('click', () => {
    celebration.classList.add('active');
    createConfetti();
});

function createConfetti() {
    const emojis = ['❤️', '💖', '💕', '🎈', '🩷', '💗'];

    // Initial burst
    for (let i = 0; i < 30; i++) {
        setTimeout(() => createConfettiPiece(emojis), i * 50);
    }

    // Continuous confetti
    setInterval(() => createConfettiPiece(emojis), 200);
}

function createConfettiPiece(emojis) {
    const el = document.createElement('div');
    el.className = 'confetti';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    const size = 1.5 + Math.random() * 1.5;
    const left = Math.random() * 100;
    const duration = 2 + Math.random() * 2;

    el.style.fontSize = size + 'rem';
    el.style.left = left + '%';
    el.style.top = '-50px';
    el.style.animationDuration = duration + 's';

    celebrationBg.appendChild(el);

    setTimeout(() => el.remove(), duration * 1000);
}

// ========== Initialize ==========
function init() {
    createFloatingElements();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}