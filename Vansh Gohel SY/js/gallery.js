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
            
            // Add year to footer
            const currentYear = new Date().getFullYear();
            const footer = document.querySelector('.page-footer');
            const yearElement = document.createElement('p');
            yearElement.style.marginTop = '5px';
            yearElement.style.fontSize = '0.8rem';
            yearElement.style.opacity = '0.7';
            yearElement.textContent = `© ${currentYear} VelvetFork Restaurant. All rights reserved.`;
            footer.appendChild(yearElement);
            
            // Preload images for better user experience
            const imageUrls = [
                'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
                'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1351&q=80',
                'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1347&q=80',
                'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
                'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
                'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80'
            ];
            
            // Preload images
            imageUrls.forEach(url => {
                const img = new Image();
                img.src = url;
            });
        });