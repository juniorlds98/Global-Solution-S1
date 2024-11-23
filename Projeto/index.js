document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const btnNext = document.querySelector('.btn-prev');
    const btnPrev = document.querySelector('.btn-next');
    const items = document.querySelectorAll('.noticia');
    const itemWidth = items[0].offsetWidth + parseInt(getComputedStyle(items[0]).marginRight);
    function updateCarouselPosition() {
        track.style.transition = 'none';
        track.style.transform = `translateX(${-itemWidth+200}px)`;
    }
    function moveToStart() {
        const lastItem = track.lastElementChild;
        track.insertBefore(lastItem, track.firstElementChild);
        updateCarouselPosition();
    }
    function moveToEnd() {
        const firstItem = track.firstElementChild;
        track.appendChild(firstItem);
        updateCarouselPosition();
    }
    btnPrev.addEventListener('click', () => {
        track.style.transition = 'transform 0.5s ease-in-out';
        track.style.transform = `translateX(0)`;
        track.addEventListener(
            'transitionend',
            () => {
                moveToStart();
            },
            { once: true }
        );
    });
    btnNext.addEventListener('click', () => {
        track.style.transition = 'transform 0.5s ease-in-out';
        track.style.transform = `translateX(${-2 * itemWidth+200}px)`;
        track.addEventListener(
            'transitionend',
            () => {
                moveToEnd();
            },
            { once: true }
        );
    });
    moveToStart();
});
