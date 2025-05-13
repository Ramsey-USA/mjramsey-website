// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// JavaScript for Filtering Jobs
document.addEventListener('DOMContentLoaded', () => {
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

    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = document.querySelector(header.getAttribute('data-target'));

            // Check if the clicked content is already open
            const isOpen = content.classList.contains('open');

            // Close all accordion items
            document.querySelectorAll('.accordion-content').forEach(item => {
                item.classList.remove('open');
                item.style.display = 'none'; // Hide all content
            });

            // Toggle the clicked item
            if (!isOpen) {
                content.classList.add('open');
                content.style.display = 'block'; // Show the clicked content
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

    const testimonials = document.querySelectorAll('.testimonial');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentIndex = 0;

    const updateCarousel = () => {
        testimonials.forEach((testimonial, index) => {
            testimonial.classList.remove('active'); // Remove active class from all testimonials
            if (index === currentIndex) {
                testimonial.classList.add('active'); // Add active class to the current testimonial
            }
        });
    };

    // Event listener for the "Previous" button
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length; // Loop back to the last testimonial if at the beginning
        updateCarousel();
    });

    // Event listener for the "Next" button
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % testimonials.length; // Loop back to the first testimonial if at the end
        updateCarousel();
    });

    // Initialize the carousel
    updateCarousel();
});

// Dropdown functionality
document.querySelectorAll('.dropdown-toggle').forEach(button => {
    button.addEventListener('click', () => {
        console.log('Dropdown clicked!');
        const content = button.nextElementSibling;

        // Toggle the visibility of the dropdown content
        if (content.style.display === 'block') {
            content.style.display = 'none';
        } else {
            // Close all other dropdowns
            document.querySelectorAll('.dropdown-content').forEach(item => {
                item.style.display = 'none';
            });

            // Open the clicked dropdown
            content.style.display = 'block';
        }
    });
});

document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        content.classList.toggle('open');
        header.querySelector('i').classList.toggle('fa-chevron-down');
        header.querySelector('i').classList.toggle('fa-chevron-up');
    });
});

// Ensure the testimonial tabs work correctly
document.querySelectorAll('.tab-label').forEach(label => {
    label.addEventListener('click', () => {
        const content = label.nextElementSibling;

        // Toggle the visibility of the testimonial content
        if (content.style.display === 'block') {
            content.style.display = 'none';
        } else {
            // Close all other testimonial contents
            document.querySelectorAll('.testimonial-content').forEach(item => {
                item.style.display = 'none';
            });

            // Open the clicked testimonial
            content.style.display = 'block';
        }
    });
});

// Add hover event listeners to progress bars
document.querySelectorAll('.progress-bar').forEach((bar) => {
    bar.addEventListener('mouseenter', () => {
        const progress = bar.querySelector('.progress');
        const percentage = progress.getAttribute('data-percentage');
        progress.style.width = `${percentage}%`; // Set the width dynamically
    });

    bar.addEventListener('mouseleave', () => {
        const progress = bar.querySelector('.progress');
        progress.style.width = '0%'; // Reset the width when hover ends
    });
});

// Add hover event listeners to skill icons
document.querySelectorAll('.skill-icon').forEach((icon) => {
    icon.addEventListener('mouseenter', () => {
        icon.classList.add('hovered'); // Add the hovered class to show the percentage
    });

    icon.addEventListener('mouseleave', () => {
        icon.classList.remove('hovered'); // Remove the hovered class to show the icon again
    });
});