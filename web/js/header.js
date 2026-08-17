const header = document.querySelector('header');
function updateHeader() {
    const headerHeight = header.offsetHeight;
    if (window.scrollY > headerHeight) {
        header.classList.add('scrolled');
    } else if (window.scrollY < headerHeight * 0.4) {
        header.classList.remove('scrolled');
    }
}
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();