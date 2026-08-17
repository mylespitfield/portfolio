const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

let mouseX = 0;
let mouseY = 0;
let ringX = 0;
let ringY = 0;

const ringSpeed = 0.2;

function animateCursor() {
    ringX += (mouseX - ringX) * ringSpeed;
    ringY += (mouseY - ringY) * ringSpeed;
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;
    requestAnimationFrame(animateCursor);
}

animateCursor();

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
});

window.addEventListener('mousedown', () => {
    cursorDot.classList.add('clicked');
});

window.addEventListener('mouseup', () => {
    cursorDot.classList.remove('clicked');
});

document.addEventListener('mouseleave', () => {
    cursorDot.classList.add('hidden');
    cursorRing.classList.add('hidden');
});

document.addEventListener('mouseenter', () => {
    cursorDot.classList.remove('hidden');
    cursorRing.classList.remove('hidden');
});