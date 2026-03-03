document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressBar = document.getElementById('progressBar');

    let currentSlide = 0;
    const totalSlides = slides.length;

    // Initialize
    updateSlides();

    // Event Listeners
    nextBtn.addEventListener('click', goNext);
    prevBtn.addEventListener('click', goPrev);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'Space') {
            goNext();
        } else if (e.key === 'ArrowLeft') {
            goPrev();
        }
    });

    function goNext() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlides();
        }
    }

    function goPrev() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlides();
        }
    }

    function updateSlides() {
        // Update slides visibility
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Update progress bar
        const progress = ((currentSlide) / (totalSlides - 1)) * 100;
        progressBar.style.width = `${progress}%`;

        // Update button states
        prevBtn.style.opacity = currentSlide === 0 ? '0.3' : '1';
        prevBtn.style.cursor = currentSlide === 0 ? 'default' : 'pointer';

        nextBtn.style.opacity = currentSlide === totalSlides - 1 ? '0.3' : '1';
        nextBtn.style.cursor = currentSlide === totalSlides - 1 ? 'default' : 'pointer';
    }

    // Touch Swipe Support
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            goNext(); // Swipe left
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            goPrev(); // Swipe right
        }
    }
});
