        // Wait for DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', function() {
            // Hide loading screen
            setTimeout(function() {
                document.getElementById('loading').classList.add('hidden');
            }, 800);
            
            // Mobile menu toggle
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const navLinks = document.getElementById('navLinks');
            const navLinksItems = document.querySelectorAll('.nav-link');
            
            mobileMenuBtn.addEventListener('click', function() {
                navLinks.classList.toggle('active');
                const isExpanded = navLinks.classList.contains('active');
                mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
                mobileMenuBtn.innerHTML = isExpanded ? 
                    '<i class="fas fa-times"></i>' : 
                    '<i class="fas fa-bars"></i>';
            });
            
            // Close mobile menu when clicking on a link
            navLinksItems.forEach(item => {
                item.addEventListener('click', function() {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                });
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', function(event) {
                if (!navLinks.contains(event.target) && 
                    !mobileMenuBtn.contains(event.target) && 
                    navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
            
            // Navbar scroll effect
            window.addEventListener('scroll', function() {
                const nav = document.getElementById('mainNav');
                if (window.scrollY > 50) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
                
                // Animate dish items on scroll
                const dishItems = document.querySelectorAll('.dish-item');
                dishItems.forEach(item => {
                    const rect = item.getBoundingClientRect();
                    if (rect.top < window.innerHeight - 100) {
                        item.classList.add('visible');
                    }
                });
                
                // Show/hide back to top button
                const backToTop = document.getElementById('backToTop');
                if (window.scrollY > 300) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            });
            
            // Back to top functionality
            document.getElementById('backToTop').addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            // Scroll indicator functionality
            document.getElementById('scrollIndicator').addEventListener('click', function() {
                document.querySelector('.welcome-section').scrollIntoView({
                    behavior: 'smooth'
                });
            });
            
            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if(targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if(targetElement) {
                        // Calculate offset based on header height
                        const headerHeight = document.getElementById('mainNav').offsetHeight;
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                        
                        window.scrollTo({
                            top: targetPosition - headerHeight,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Testimonial slider
            const testimonials = document.querySelectorAll('.testimonial');
            const dots = document.querySelectorAll('.dot');
            let currentTestimonial = 0;
            let testimonialInterval;
            
            function showTestimonial(index) {
                testimonials.forEach(testimonial => {
                    testimonial.classList.remove('active');
                });
                dots.forEach(dot => {
                    dot.classList.remove('active');
                });
                
                testimonials[index].classList.add('active');
                dots[index].classList.add('active');
                currentTestimonial = index;
            }
            
            function startTestimonialRotation() {
                testimonialInterval = setInterval(() => {
                    let nextIndex = (currentTestimonial + 1) % testimonials.length;
                    showTestimonial(nextIndex);
                }, 5000);
            }
            
            function stopTestimonialRotation() {
                clearInterval(testimonialInterval);
            }
            
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    stopTestimonialRotation();
                    showTestimonial(index);
                    // Restart rotation after user interaction
                    setTimeout(startTestimonialRotation, 10000);
                });
                
                // Keyboard navigation for dots
                dot.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        stopTestimonialRotation();
                        showTestimonial(index);
                        setTimeout(startTestimonialRotation, 10000);
                    }
                });
            });
            
            // Start testimonial rotation
            startTestimonialRotation();
            
            // Pause rotation when user interacts with slider
            const testimonialSlider = document.querySelector('.testimonial-slider');
            testimonialSlider.addEventListener('mouseenter', stopTestimonialRotation);
            testimonialSlider.addEventListener('mouseleave', startTestimonialRotation);
            testimonialSlider.addEventListener('focusin', stopTestimonialRotation);
            testimonialSlider.addEventListener('focusout', startTestimonialRotation);
            
            // Animate dish items on load
            window.addEventListener('load', function() {
                const dishItems = document.querySelectorAll('.dish-item');
                dishItems.forEach((item, index) => {
                    setTimeout(() => {
                        const rect = item.getBoundingClientRect();
                        if (rect.top < window.innerHeight - 100) {
                            item.classList.add('visible');
                        }
                    }, index * 300);
                });
            });
            
            // Touch device detection
            if ('ontouchstart' in window || navigator.maxTouchPoints) {
                document.body.classList.add('touch-device');
            }
            
            // Handle reduced motion preferences
            const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
            if (mediaQuery.matches) {
                document.documentElement.style.scrollBehavior = 'auto';
            }
        });