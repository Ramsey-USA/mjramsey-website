// Main JavaScript for Matt Ramsey's Professional Website

document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    // Toggle mobile menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function () {
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (event) {
        if (!event.target.closest('nav') && !event.target.closest('.mobile-menu-btn')) {
            navMenu.classList.remove('active');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll to top button
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.animate');
    
    function checkIfInView() {
        const windowHeight = window.innerHeight;
        const windowTopPosition = window.pageYOffset;
        const windowBottomPosition = windowTopPosition + windowHeight;
        
        animateElements.forEach(element => {
            const elementHeight = element.offsetHeight;
            const elementTopPosition = element.offsetTop;
            const elementBottomPosition = elementTopPosition + elementHeight;
            
            // Check if element is in viewport
            if (
                (elementBottomPosition >= windowTopPosition) &&
                (elementTopPosition <= windowBottomPosition)
            ) {
                element.classList.add('animated');
            }
        });
    }
    
    // Run on page load
    checkIfInView();
    
    // Run on scroll
    window.addEventListener('scroll', checkIfInView);
    
    // Skills progress bars animation
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const percentage = bar.getAttribute('data-percentage');
            bar.style.width = percentage + '%';
        });
    }
    
    // Run skills animation when skills section is in view
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(skillsSection);
    }
    
    // Form validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Simple validation
            if (!nameInput.value.trim()) {
                isValid = false;
                showError(nameInput, 'Name is required');
            } else {
                removeError(nameInput);
            }
            
            if (!emailInput.value.trim()) {
                isValid = false;
                showError(emailInput, 'Email is required');
            } else if (!isValidEmail(emailInput.value)) {
                isValid = false;
                showError(emailInput, 'Please enter a valid email');
            } else {
                removeError(emailInput);
            }
            
            if (!messageInput.value.trim()) {
                isValid = false;
                showError(messageInput, 'Message is required');
            } else {
                removeError(messageInput);
            }
            
            if (isValid) {
                // For demo purposes, show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
                
                contactForm.innerHTML = '';
                contactForm.appendChild(successMessage);
            }
        });
    }
    
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
        
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorElement);
        }
        
        input.classList.add('error');
    }
    
    function removeError(input) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
        
        input.classList.remove('error');
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});

/* Animations */
.animate {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
}

.animate.visible {
    opacity: 1;
    transform: translateY(0);
}
