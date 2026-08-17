const randomTypewriters = document.querySelectorAll('.typewriter-random');

function generateRandomCharacter() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return characters[Math.floor(Math.random() * characters.length)];
}

function renderRandomTypewriter(element, targetWord, progress) {
    let output = '';

    targetWord.split('').forEach((letter, i) => {
        if (i < progress) {
            output += `<span class="correct">${letter}</span>`;
        } else {
            output += `<span class="random">${generateRandomCharacter()}</span>`;
        }
    });

    element.innerHTML = output;
}

function runRandomTypewriter(element, targetWord) {
    let progress = 0;
    let scrambleCount = 0;

    const scrambleSpeed = 30;
    const scramblesPerReveal = 2;

    const interval = setInterval(() => {
        renderRandomTypewriter(element, targetWord, progress);

        scrambleCount++;

        if (scrambleCount >= scramblesPerReveal) {
            progress++;
            scrambleCount = 0;
        }

        if (progress > targetWord.length) {
            clearInterval(interval);
            renderRandomTypewriter(element, targetWord, targetWord.length);
        }
    }, scrambleSpeed);
}

const randomTypewriterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const targetWord = element.dataset.word;

            runRandomTypewriter(element, targetWord);

            randomTypewriterObserver.unobserve(element);
        }
    });
}, {
    threshold: 0.3
});

function initRandomTypewriters() {
    randomTypewriters.forEach((element) => {
        if (prefersReducedMotion) {
            element.textContent = element.dataset.word;
            return;
        }
        randomTypewriterObserver.observe(element);
    });
}

if (document.documentElement.classList.contains('page-transitioning')) {
    window.addEventListener('pageTransitionComplete', initRandomTypewriters, {
        once: true
    });
} else {
    initRandomTypewriters();
}