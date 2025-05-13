document.addEventListener('DOMContentLoaded', () => {
    // ============================
    // Smooth Scrolling
    // ============================
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

    // ============================
    // Mobile Menu Toggle
    // ============================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('header nav ul');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

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
    const awardsCarousel = () => {
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
    awardsCarousel();

    // ============================
    // Testimonials Carousel
    // ============================
    const testimonialsCarousel = () => {
        const testimonials = document.querySelectorAll('.testimonial-content');
        const prevButton = document.querySelector('.testimonial-tabs .prev');
        const nextButton = document.querySelector('.testimonial-tabs .next');
        let currentIndex = 0;

        const updateCarousel = () => {
            testimonials.forEach((testimonial, index) => {
                testimonial.style.display = index === currentIndex ? 'block' : 'none';
            });
        };

        if (prevButton && nextButton) {
            prevButton.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
                updateCarousel();
            });

            nextButton.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % testimonials.length;
                updateCarousel();
            });
        }

        updateCarousel(); // Initialize the carousel
    };
    testimonialsCarousel();

    // ============================
    // Modal Functionality
    // ============================
    const modals = () => {
        const educationCards = document.querySelectorAll('.education-card');
        const modals = document.querySelectorAll('.modal');
        const closeButtons = document.querySelectorAll('.close-modal');

        // Open modal
        educationCards.forEach(card => {
            card.addEventListener('click', () => {
                const modalId = card.getAttribute('data-modal');
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.style.display = 'flex';
                }
            });
        });

        // Close modal
        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = button.closest('.modal');
                if (modal) {
                    modal.style.display = 'none';
                }
            });
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            modals.forEach(modal => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });
    };
    modals();

    // ============================
    // Dropdown Functionality
    // ============================
    const dropdowns = () => {
        document.querySelectorAll('.dropdown-toggle').forEach(button => {
            button.addEventListener('click', () => {
                const content = button.nextElementSibling;

                // Toggle the visibility of the dropdown content
                if (content.style.display === 'block') {
                    content.style.display = 'none';
                } else {
                    // Close all dropdowns within the same parent container
                    const parent = button.closest('.dropdown-menu');
                    if (parent) {
                        parent.querySelectorAll('.dropdown-content').forEach(item => {
                            item.style.display = 'none';
                        });
                    }

                    // Open the clicked dropdown
                    content.style.display = 'block';
                }
            });
        });
    };
    dropdowns();

    // ============================
    // Accordion Functionality
    // ============================
    const accordions = () => {
        document.querySelectorAll('.accordion-header').forEach(header => {
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;
                const isOpen = content.classList.contains('open');

                // Close all accordion items
                document.querySelectorAll('.accordion-content').forEach(item => {
                    item.classList.remove('open');
                    item.style.display = 'none';
                });

                // Toggle the clicked item
                if (!isOpen) {
                    content.classList.add('open');
                    content.style.display = 'block';
                }
            });
        });
    };
    accordions();

    // ============================
    // Hover Effects for Skill Icons
    // ============================
    const skillIcons = () => {
        document.querySelectorAll('.skill-icon').forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                icon.classList.add('hovered');
            });

            icon.addEventListener('mouseleave', () => {
                icon.classList.remove('hovered');
            });
        });
    };
    skillIcons();
});