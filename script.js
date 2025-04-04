// script.js
document.addEventListener("DOMContentLoaded", function () {
    console.log("Portfolio Loaded!");

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate skill bars when skills section is visible
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
                
                // Animate project cards when projects section is visible
                if (entry.target.id === 'projects') {
                    animateProjectCards();
                }
                
                // Animate about container when about section is visible
                if (entry.target.id === 'about') {
                    const aboutContainer = document.querySelector('.about-container');
                    if (aboutContainer) {
                        aboutContainer.classList.add('visible');
                    }
                }
                
                // Animate timeline when education section is visible
                if (entry.target.id === 'education') {
                    const timeline = document.querySelector('.timeline');
                    if (timeline) {
                        timeline.classList.add('visible');
                    }
                }
                
                // Animate experience items when experience section is visible
                if (entry.target.id === 'experience') {
                    const experienceItems = document.querySelectorAll('.experience-item');
                    experienceItems.forEach(item => item.classList.add('visible'));
                }
                
                // Animate contact elements when contact section is visible
                if (entry.target.id === 'contact') {
                    const contactContainer = document.querySelector('.contact-container');
                    const socialLinks = document.querySelector('.social-links');
                    
                    if (contactContainer) {
                        contactContainer.classList.add('visible');
                    }
                    
                    if (socialLinks) {
                        socialLinks.classList.add('visible');
                    }
                }
                
                // Animate contact form when contact-form section is visible
                if (entry.target.id === 'contact-form') {
                    const contactForm = document.querySelector('.contact-form');
                    if (contactForm) {
                        contactForm.classList.add('visible');
                    }
                }
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach((section) => {
        observer.observe(section);
    });

    // Animate skill bars
    function animateSkillBars() {
        // First ensure all skills elements are visible
        document.querySelectorAll('#skills, .skills-container, .skills-category, .skill-item').forEach(element => {
            element.style.opacity = '1';
            element.style.visibility = 'visible';
            element.style.transform = 'none';
        });
        
        // Then animate the progress bars
        document.querySelectorAll('.progress').forEach(progress => {
            // Store the original width
            const width = progress.style.width;
            
            // Only animate if the width is not already set
            if (width && !progress.classList.contains('animated')) {
                // Set initial width to 0
                progress.style.width = '0';
                progress.classList.add('animated');
                
                // Animate to the target width
                setTimeout(() => {
                    progress.style.width = width;
                    // Ensure the width stays at the target value
                    progress.style.transition = 'width 1s ease-in-out';
                }, 100);
            } else if (width) {
                // If already animated, ensure the width is set correctly
                progress.style.width = width;
            }
        });
    }

    // Animate project cards
    function animateProjectCards() {
        document.querySelectorAll('.project-card').forEach((card, index) => {
            // Only animate if not already animated
            if (!card.classList.contains('animated')) {
                card.classList.add('animated');
                
                // Set initial styles
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }

    // Add typing effect to the header
    const headerText = document.querySelector('header h1');
    const text = headerText.textContent;
    headerText.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            headerText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    typeWriter();

    // Enhanced hover effects for project images
    document.querySelectorAll('#projects img').forEach(img => {
        img.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        img.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Form submission handling with animation
    const messageForm = document.getElementById('messageForm');
    if (messageForm) {
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            submitBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                submitBtn.style.transform = 'scale(1)';
            }, 200);
            
            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            const formData = new FormData(this);
            console.log('Form submitted:', Object.fromEntries(formData));
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Message sent successfully!';
            this.appendChild(successMessage);
            
            // Clear form
            this.reset();
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        });
    }
    
    // Title transition effect
    const titleElement = document.getElementById('title-transition');
    if (titleElement) {
        const titles = ['Full Stack Developer', 'Web Developer', 'Software Engineer'];
        let currentIndex = 0;
        
        function changeTitle() {
            titleElement.style.opacity = '0';
            
            setTimeout(() => {
                titleElement.textContent = titles[currentIndex];
                titleElement.style.opacity = '1';
                
                currentIndex = (currentIndex + 1) % titles.length;
            }, 500);
        }
        
        // Start the title transition after a delay
        setTimeout(() => {
            changeTitle();
            setInterval(changeTitle, 4000);
        }, 2000);
    }

    // Add scroll-to-top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll-to-top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
