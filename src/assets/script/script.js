        // ==================== MOBILE MENU ====================

        const mobileMenuBtn = document.getElementById("mobileMenuBtn");
        const navLinks = document.getElementById("navLinks");

        mobileMenuBtn.addEventListener("click", () => {

            navLinks.classList.toggle("hidden");

            if (navLinks.classList.contains("hidden")) {

                mobileMenuBtn.innerHTML =
                    '<i class="fas fa-bars"></i>';

            } else {

                mobileMenuBtn.innerHTML =
                    '<i class="fas fa-times"></i>';

            }

        });


        // Close mobile menu when clicking a link

        document.querySelectorAll("#navLinks a").forEach((link) => {

            link.addEventListener("click", () => {

                if (window.innerWidth < 768) {

                    navLinks.classList.add("hidden");

                    mobileMenuBtn.innerHTML =
                        '<i class="fas fa-bars"></i>';

                }

            });

        });


        // Close mobile menu when resizing to desktop

        window.addEventListener("resize", () => {

            if (window.innerWidth >= 768) {

                navLinks.classList.remove("hidden");

                mobileMenuBtn.innerHTML =
                    '<i class="fas fa-bars"></i>';

            } else {

                navLinks.classList.add("hidden");

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
                    "h-2.5 w-2.5 rounded-full border-0 cursor-pointer";

                if (i === currentIndex) {

                    dot.classList.add(
                        "bg-[rgb(220,53,69)]"
                    );

                } else {

                    dot.classList.add(
                        "bg-[rgb(249,224,227)]"
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
                        "bg-[rgb(220,53,69)]",
                        i === currentIndex
                    );

                    dot.classList.toggle(
                        "bg-[rgb(249,224,227)]",
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