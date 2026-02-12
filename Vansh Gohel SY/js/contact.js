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
            
            // Form Submission Handler
            const reservationForm = document.getElementById('reservationForm');
            const successMessage = document.getElementById('successMessage');
            
            reservationForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Simple form validation
                const requiredFields = reservationForm.querySelectorAll('[required]');
                let isValid = true;
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.style.borderColor = 'var(--muted-gold)';
                    } else {
                        field.style.borderColor = 'var(--input-border)';
                    }
                });
                
                if (isValid) {
                    // Show success message
                    successMessage.classList.add('active');
                    
                    // Scroll to success message
                    successMessage.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                    
                    // Reset form after 5 seconds
                    setTimeout(() => {
                        reservationForm.reset();
                        successMessage.classList.remove('active');
                    }, 5000);
                } else {
                    // Show error feedback
                    alert('Please fill in all required fields.');
                }
            });
            
            // Set minimum date to today for date picker
            const dateInput = document.getElementById('date');
            const today = new Date().toISOString().split('T')[0];
            dateInput.min = today;
            
            // Set a default date (tomorrow)
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
            dateInput.value = tomorrowFormatted;
            
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