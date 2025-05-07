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
});