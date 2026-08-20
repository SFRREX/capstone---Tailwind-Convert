// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.getElementById("navLinks");

mobileMenuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    mobileMenuBtn.innerHTML = navLinks.classList.contains("active")
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Testimonial carousel
const track = document.getElementById("testimonialTrack");
const cards = track.querySelectorAll(".testimonial-card");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsContainer = document.getElementById("testimonialDots");

let cardsPerView = 3;
let currentIndex = 0;

function getCardsPerView() {
    if (window.innerWidth <= 576) return 1;
    if (window.innerWidth <= 992) return 2;
    return 3;
}

function buildDots() {
    dotsContainer.innerHTML = "";
    const totalSlides = cards.length - cardsPerView + 1;
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement("span");
        if (i === currentIndex) dot.classList.add("active");
        dot.addEventListener("click", () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }git
}

function updateCarousel() {
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = 32; // 2rem
    const offset = (cardWidth + gap) * currentIndex;
    track.style.transform = `translateX(-${offset}px)`;

    [...dotsContainer.children].forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
    });
}

function goToSlide(index) {
    const maxIndex = cards.length - cardsPerView;
    currentIndex = Math.max(0, Math.min(index, maxIndex));
    updateCarousel();
}

nextBtn.addEventListener("click", () => {
    const maxIndex = cards.length - cardsPerView;
    currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    updateCarousel();
});

prevBtn.addEventListener("click", () => {
    const maxIndex = cards.length - cardsPerView;
    currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
    updateCarousel();
});

function initCarousel() {
    cardsPerView = getCardsPerView();
    currentIndex = 0;
    buildDots();
    updateCarousel();
}

window.addEventListener("resize", initCarousel);
window.addEventListener("load", initCarousel);
initCarousel();
