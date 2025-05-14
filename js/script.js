document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed'); // Debugging log

    // ============================
    // Smooth Scrolling
    // ============================
    const initSmoothScrolling = () => {
        const anchors = document.querySelectorAll('a[href^="#"]');
        if (anchors.length === 0) {
            console.warn('No anchor links found for smooth scrolling.');
            return;
        }

        anchors.forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                } else {
                    console.error(`Target not found for anchor: ${this.getAttribute('href')}`);
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

        if (!menuToggle || !navMenu) {
            console.warn('Menu toggle or navigation menu not found.');
            return;
        }

        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active'); // Add active state to the toggle button
        });
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

        if (!track || items.length === 0) {
            console.warn('Awards carousel track or items not found.');
            return;
        }

        const updateCarousel = () => {
            const itemWidth = items[0].getBoundingClientRect().width;
            track.style.transform = `translateX(-${currentIndex * (itemWidth + 30)}px)`; // Include margin
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

        if (testimonials.length === 0 || labels.length === 0 || inputs.length === 0) {
            console.warn('Testimonials carousel elements not found.');
            return;
        }

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

        if (educationCards.length === 0 || modals.length === 0) {
            console.warn('No education cards or modals found.');
            return;
        }

        // Open modal when an education card is clicked
        educationCards.forEach(card => {
            card.addEventListener('click', () => {
                const modalId = card.getAttribute('data-modal');
                const modal = document.getElementById(modalId);

                if (modal) {
                    modal.style.display = 'flex';
                    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
                } else {
                    console.error(`No modal found for ID: ${modalId}`);
                }
            });
        });

        // Close modal when the close button is clicked
        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = button.closest('.modal');
                if (modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = ''; // Restore scrolling
                }
            });
        });

        // Close modal when clicking outside the modal content
        window.addEventListener('click', (e) => {
            modals.forEach(modal => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = ''; // Restore scrolling
                }
            });
        });
    };

    // ============================
    // Tab Functionality
    // ============================
    const initTabs = () => {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');

        if (tabButtons.length === 0 || tabContents.length === 0) {
            console.warn('No tab buttons or tab contents found.');
            return;
        }

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');

                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Add active class to the clicked button and corresponding content
                button.classList.add('active');
                const targetContent = document.getElementById(targetTab);

                if (targetContent) {
                    targetContent.classList.add('active');
                } else {
                    console.error(`No tab content found for ID: ${targetTab}`);
                }
            });
        });
    };

    // ============================
    // Initialize All Functions
    // ============================
    initSmoothScrolling();
    initMobileMenu();
    initTabs(); // Ensure tabs are initialized
    initAwardsCarousel();
    initTestimonialsCarousel();
    initModals(); // Ensure modals are initialized
});

