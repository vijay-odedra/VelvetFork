        document.addEventListener('DOMContentLoaded', function() {
            // Mobile Menu Toggle
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const navLinks = document.getElementById('navLinks');
            
            mobileMenuBtn.addEventListener('click', function() {
                navLinks.classList.toggle('active');
                mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', function(event) {
                if (!navLinks.contains(event.target) && 
                    !mobileMenuBtn.contains(event.target) && 
                    navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.innerHTML = '☰';
                }
            });
            
            // Close mobile menu when clicking a link
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function() {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.innerHTML = '☰';
                });
            });
            
            // Smooth scroll for reservation button
            document.querySelector('.cta-button').addEventListener('click', function(e) {
                e.preventDefault();
                // In a real implementation, this would link to the reservations page
                alert('Reservation system would open here. For demo purposes only.');
            });
            
            // Scroll animations
            const animateElements = document.querySelectorAll('.team-member, .timeline-item, .recognition-item');
            
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);
            
            animateElements.forEach(element => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(element);
            });
            
            // Animate timeline markers
            const timelineMarkers = document.querySelectorAll('.timeline-marker');
            
            const markerObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.transform = 'translate(-50%, -50%) scale(1.2)';
                        setTimeout(() => {
                            entry.target.style.transform = 'translate(-50%, -50%) scale(1)';
                        }, 300);
                    }
                });
            }, { threshold: 0.5 });
            
            timelineMarkers.forEach(marker => {
                marker.style.transition = 'transform 0.3s ease';
                markerObserver.observe(marker);
            });
            
            // Reduce motion preference
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                animateElements.forEach(element => {
                    element.style.transition = 'none';
                    element.style.opacity = '1';
                    element.style.transform = 'none';
                });
                
                timelineMarkers.forEach(marker => {
                    marker.style.transition = 'none';
                });
            }
            
            // Add year to footer
            const currentYear = new Date().getFullYear();
            const footer = document.querySelector('.page-footer');
            const yearElement = document.createElement('p');
            yearElement.style.marginTop = '5px';
            yearElement.style.fontSize = '0.8rem';
            yearElement.style.opacity = '0.7';
            yearElement.textContent = `© ${currentYear} VelvetFork Restaurant. All rights reserved.`;
            footer.appendChild(yearElement);
        });