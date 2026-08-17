const pageTransition = document.querySelector('#page-transition');

window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
        pageTransition.classList.add('no-transition');
        pageTransition.classList.remove('in', 'out');
        pageTransition.getBoundingClientRect();
        pageTransition.classList.remove('no-transition');
    }
});

const displayTransition = sessionStorage.getItem('pageTransition');
if (displayTransition === 'true') {
    sessionStorage.removeItem('pageTransition');
    requestAnimationFrame(() => {
        document.documentElement.classList.remove('page-transitioning');
        pageTransition.classList.add('in');
        requestAnimationFrame(() => {
            setTimeout(() => {
                pageTransition.classList.remove('in');
                pageTransition.classList.add('out');
            }, 150);
        });
    });
}

pageTransition.addEventListener('transitionend', () => {
    if (pageTransition.classList.contains('out')) {
        pageTransition.classList.add('no-transition');
        pageTransition.classList.remove('out');
        pageTransition.getBoundingClientRect();
        pageTransition.classList.remove('no-transition');
        window.dispatchEvent(new Event('pageTransitionComplete'));
    }
});

const pageLinks = document.querySelectorAll('a');
pageLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        if (link.classList.contains('lightBoxImg')) return;
        if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
        if (e.button !== 0) return;
        if (link.target === '_blank') return;

        const href = link.getAttribute('href');
        if (!href || href.startsWith('#')) return;

        const url = new URL(link.href);

        if (url.hostname !== window.location.hostname) return;
        if (url.pathname === window.location.pathname && url.search === window.location.search) return;

        e.preventDefault();

        if (prefersReducedMotion) {
            window.location.href = link.href;
            return;
        }

        pageTransition.classList.add('in');

        setTimeout(() => {
            sessionStorage.setItem('pageTransition', 'true');
            window.location.href = link.href;
        }, 800);
    });
});