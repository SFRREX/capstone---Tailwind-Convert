// ==================== MOBILE MENU ====================

const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.getElementById("navLinks");

function closeMobileMenu() {

    navLinks.classList.add("hidden");

    mobileMenuBtn.innerHTML =
        '<i class="fas fa-bars"></i>';

    mobileMenuBtn.setAttribute("aria-expanded", "false");

    mobileMenuBtn.classList.remove(
        "bg-red-600",
        "text-white"
    );

    mobileMenuBtn.classList.add(
        "bg-gray-100",
        "text-gray-800"
    );

}


function openMobileMenu() {

    navLinks.classList.remove("hidden");

    mobileMenuBtn.innerHTML =
        '<i class="fas fa-times"></i>';

    mobileMenuBtn.setAttribute("aria-expanded", "true");

    mobileMenuBtn.classList.remove(
        "bg-gray-100",
        "text-gray-800"
    );

    mobileMenuBtn.classList.add(
        "bg-red-600",
        "text-white"
    );

}


mobileMenuBtn.addEventListener("click", () => {

    if (navLinks.classList.contains("hidden")) {

        openMobileMenu();

    } else {

        closeMobileMenu();

    }

});


// Close menu when clicking a link

document.querySelectorAll("#navLinks a").forEach((link) => {

    link.addEventListener("click", () => {

        if (window.innerWidth < 768) {

            closeMobileMenu();

        }

    });

});


// Reset menu when switching to desktop

window.addEventListener("resize", () => {

    if (window.innerWidth >= 768) {

        navLinks.classList.remove("hidden");

        mobileMenuBtn.innerHTML =
            '<i class="fas fa-bars"></i>';

        mobileMenuBtn.setAttribute(
            "aria-expanded",
            "false"
        );

        mobileMenuBtn.classList.remove(
            "bg-red-600",
            "text-white"
        );

        mobileMenuBtn.classList.add(
            "bg-gray-100",
            "text-gray-800"
        );

    } else {

        closeMobileMenu();

    }

});

// ==================== TESTIMONIAL CAROUSEL ====================

const track =
    document.getElementById("testimonialTrack");

const cards =
    track.querySelectorAll(".testimonial-card");

const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");

const dotsContainer =
    document.getElementById("testimonialDots");


let cardsPerView = 3;
let currentIndex = 0;


// Decide how many cards are visible

function getCardsPerView() {

    if (window.innerWidth < 768) {
        return 1;
    }

    if (window.innerWidth < 1024) {
        return 2;
    }

    return 3;

}


// Create dots

function buildDots() {

    dotsContainer.innerHTML = "";

    const totalSlides =
        Math.max(1, cards.length - cardsPerView + 1);

    for (let i = 0; i < totalSlides; i++) {

        const dot =
            document.createElement("button");

        dot.type = "button";

        dot.className =
            "h-2.5 w-2.5 cursor-pointer rounded-full border-0";

        if (i === currentIndex) {

            dot.classList.add(
                "bg-red-600"
            );

        } else {

            dot.classList.add(
                "bg-red-100"
            );

        }

        dot.addEventListener("click", () => {

            goToSlide(i);

        });

        dotsContainer.appendChild(dot);

    }

}


// Update carousel position

function updateCarousel() {

    if (!cards.length) {
        return;
    }

    const cardWidth =
        cards[0].getBoundingClientRect().width;

    const gap = 32;

    const offset =
        (cardWidth + gap) * currentIndex;

    track.style.transform =
        `translateX(-${offset}px)`;


    [...dotsContainer.children].forEach(
        (dot, i) => {

            dot.classList.toggle(
                "bg-red-600",
                i === currentIndex
            );

            dot.classList.toggle(
                "bg-red-100",
                i !== currentIndex
            );

        }
    );

}


// Go to specific slide

function goToSlide(index) {

    const maxIndex =
        Math.max(0, cards.length - cardsPerView);

    currentIndex =
        Math.max(
            0,
            Math.min(index, maxIndex)
        );

    updateCarousel();

}


// Next button

nextBtn.addEventListener("click", () => {

    const maxIndex =
        Math.max(0, cards.length - cardsPerView);

    if (currentIndex >= maxIndex) {

        currentIndex = 0;

    } else {

        currentIndex++;

    }

    updateCarousel();

});


// Previous button

prevBtn.addEventListener("click", () => {

    const maxIndex =
        Math.max(0, cards.length - cardsPerView);

    if (currentIndex <= 0) {

        currentIndex = maxIndex;

    } else {

        currentIndex--;

    }

    updateCarousel();

});


// Initialize carousel

function initCarousel() {

    cardsPerView =
        getCardsPerView();

    const maxIndex =
        Math.max(0, cards.length - cardsPerView);

    if (currentIndex > maxIndex) {

        currentIndex = maxIndex;

    }

    buildDots();

    updateCarousel();

}


window.addEventListener(
    "resize",
    initCarousel
);

window.addEventListener(
    "load",
    initCarousel
);

initCarousel();