document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed'); // Debugging log

    // ============================
    // Smooth Scrolling
    // ============================
    const initSmoothScrolling = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    };

    // ============================
    // Mobile Menu Toggle
    // ============================
    const initMobileMenu = () => {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('header nav ul');

        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                menuToggle.classList.toggle('active'); // Add active state to the toggle button
            });
        }
    };

    // Ensure the overlay doesn't block button clicks
    const heroOverlay = document.querySelector('#hero .hero-overlay');
    if (heroOverlay) {
        heroOverlay.style.pointerEvents = 'none'; // Disable pointer events on the overlay
    }

    // JavaScript for Filtering Jobs
    const filterButtons = document.querySelectorAll('.filter-button');
    const jobs = document.querySelectorAll('.job');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'active' class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add 'active' class to the clicked button
            button.classList.add('active');

            const category = button.getAttribute('data-category');

            // Show/Hide jobs based on category
            let firstVisibleJob = null;
            jobs.forEach(job => {
                if (category === 'all' || job.getAttribute('data-category') === category) {
                    job.style.display = 'block';
                    if (!firstVisibleJob) {
                        firstVisibleJob = job; // Capture the first visible job
                    }
                } else {
                    job.style.display = 'none';
                }
            });

            // Scroll to the first visible job
            if (firstVisibleJob) {
                firstVisibleJob.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    document.querySelectorAll('.open-lightbox').forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault();
            const lightboxId = button.getAttribute('href');
            document.querySelector(lightboxId).style.display = 'flex';
        });
    });

    document.querySelectorAll('.close-lightbox').forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.lightbox').style.display = 'none';
        });
    });

    document.addEventListener('click', event => {
        if (event.target.classList.contains('lightbox')) {
            event.target.style.display = 'none';
        }
    });

    // ============================
    // Awards Carousel
    // ============================
    const initAwardsCarousel = () => {
        const track = document.querySelector('#awards-track');
        const items = Array.from(track?.children || []);
        const prevButton = document.querySelector('.awards-btn.prev');
        const nextButton = document.querySelector('.awards-btn.next');
        let currentIndex = 0;

        const updateCarousel = () => {
            if (track && items.length > 0) {
                const itemWidth = items[0].getBoundingClientRect().width;
                track.style.transform = `translateX(-${currentIndex * (itemWidth + 30)}px)`; // Include margin
            }
        };

        if (prevButton && nextButton) {
            prevButton.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + items.length) % items.length;
                updateCarousel();
            });

            nextButton.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % items.length;
                updateCarousel();
            });
        }

        updateCarousel(); // Initialize the carousel position
    };

    // ============================
    // Testimonials Carousel
    // ============================
    const initTestimonialsCarousel = () => {
        const testimonials = document.querySelectorAll('.testimonial-content');
        const labels = document.querySelectorAll('.tab-label');
        const inputs = document.querySelectorAll('input[name="testimonial"]');

        const updateActiveTestimonial = (index) => {
            testimonials.forEach((testimonial, i) => {
                testimonial.style.display = i === index ? 'block' : 'none';
            });
        };

        labels.forEach((label, index) => {
            label.addEventListener('click', () => {
                inputs[index].checked = true; // Check the corresponding input
                updateActiveTestimonial(index); // Show the corresponding testimonial
            });
        });

        updateActiveTestimonial(0); // Initialize the first testimonial as active
    };

    // ============================
    // Modal Functionality
    // ============================
    const initModals = () => {
        const educationCards = document.querySelectorAll('.education-card');
        const modals = document.querySelectorAll('.modal');
        const closeButtons = document.querySelectorAll('.close-modal');

        educationCards.forEach(card => {
            card.addEventListener('click', () => {
                const modalId = card.getAttribute('data-modal');
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.style.display = 'flex';
                }
            });
        });

        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = button.closest('.modal');
                if (modal) {
                    modal.style.display = 'none';
                }
            });
        });

        window.addEventListener('click', (e) => {
            modals.forEach(modal => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });
    };

    // ============================
    // Accordion Functionality
    // ============================
    const initAccordion = () => {
        const accordionHeaders = document.querySelectorAll('.accordion-header');

        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                console.log('Accordion header clicked:', header); // Debugging log
                const content = header.nextElementSibling;

                // Close other open accordion items
                document.querySelectorAll('.accordion-content.open').forEach(openContent => {
                    if (openContent !== content) {
                        openContent.classList.remove('open');
                    }
                });

                // Toggle the current accordion content
                content.classList.toggle('open');
            });
        });
    };

    // ============================
    // Tab Functionality
    // ============================
    const initTabs = () => {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Add active class to the clicked button and corresponding content
                button.classList.add('active');
                const tabId = button.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    };

    // ============================
    // Initialize All Functions
    // ============================
    initSmoothScrolling();
    initMobileMenu();
    initAccordion();
    initTabs();
    initAwardsCarousel();
    initTestimonialsCarousel();
    initModals();
});
