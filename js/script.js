document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed'); // Debugging log

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
    // Testimonials Functionality
    // ============================
    const testimonialsCarousel = () => {
        const testimonials = document.querySelectorAll('.testimonial-content');
        const labels = document.querySelectorAll('.tab-label');
        const inputs = document.querySelectorAll('input[name="testimonial"]');

        // Function to update the active testimonial
        const updateActiveTestimonial = (index) => {
            testimonials.forEach((testimonial, i) => {
                testimonial.style.display = i === index ? 'block' : 'none';
            });
        };

        // Add event listeners to labels
        labels.forEach((label, index) => {
            label.addEventListener('click', () => {
                inputs[index].checked = true; // Check the corresponding input
                updateActiveTestimonial(index); // Show the corresponding testimonial
            });
        });

        // Initialize the first testimonial as active
        updateActiveTestimonial(0);
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
    console.log('Dropdown functionality initialized'); // Debugging log

    // Select all dropdown toggle buttons
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    console.log('Dropdown toggles found:', dropdownToggles.length); // Debugging log

    // Attach click event listeners to each toggle button
    dropdownToggles.forEach(button => {
        console.log('Attaching event listener to:', button); // Debugging log

        button.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent click from propagating to the document
            console.log('Dropdown clicked:', button); // Debugging log

            const content = button.nextElementSibling; // Get the dropdown content
            console.log('Dropdown content:', content); // Debugging log

            // Ensure the content exists
            if (!content || !content.classList.contains('dropdown-content')) {
                console.error('Dropdown content not found for:', button);
                return;
            }

            // Check if the clicked dropdown is already open
            const isVisible = content.classList.contains('open');
            console.log('Is dropdown visible?', isVisible); // Debugging log

            // Close all dropdowns within the same parent container
            const parent = button.closest('.dropdown-menu');
            if (parent) {
                parent.querySelectorAll('.dropdown-content').forEach(item => {
                    item.classList.remove('open'); // Remove the 'open' class
                });
            }

            // Open the clicked dropdown if it was not already visible
            if (!isVisible) {
                content.classList.add('open'); // Add the 'open' class
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (event) => {
        const isDropdown = event.target.closest('.dropdown-item');
        if (!isDropdown) {
            console.log('Clicked outside dropdown, closing all dropdowns'); // Debugging log
            document.querySelectorAll('.dropdown-content.open').forEach(content => {
                content.classList.remove('open'); // Close all open dropdowns
            });
        }
    });
});
