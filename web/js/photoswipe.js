import PhotoSwipeLightbox from 'https://unpkg.com/photoswipe@5/dist/photoswipe-lightbox.esm.js';
const lightbox = new PhotoSwipeLightbox({
    gallery: '#lightbox-gallery',
    children: '.lightBoxImg',
    pswpModule: () => import('https://unpkg.com/photoswipe@5/dist/photoswipe.esm.js'),
    paddingFn: (viewportSize) => {
        if (viewportSize.x < 768) {
            return { top: 30, bottom: 30, left: 15, right: 15 };
        }
        return {
            top: viewportSize.y * 0.1,
            bottom: viewportSize.y * 0.1,
            left: viewportSize.x * 0.1,
            right: viewportSize.x * 0.1
        };
    }
});

lightbox.init();