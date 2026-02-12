        document.addEventListener('DOMContentLoaded', function() {
            // Mobile Menu Toggle   
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const navLinks = document.getElementById('navLinks');
            
            mobileMenuBtn.addEventListener('click', function() {
                navLinks.classList.toggle('active');
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', function(event) {
                if (!navLinks.contains(event.target) && 
                    !mobileMenuBtn.contains(event.target) && 
                    navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            });
            
            // Menu Category Tabs
            const tabs = document.querySelectorAll('.category-tab');
            const categories = document.querySelectorAll('.menu-category');
            
            // Function to switch categories
            function switchCategory(categoryId) {
                // Update tabs
                tabs.forEach(tab => {
                    tab.classList.remove('active');
                    if (tab.dataset.category === categoryId) {
                        tab.classList.add('active');
                    }
                });
                
                // Update categories
                categories.forEach(category => {
                    category.classList.remove('active');
                    if (category.id === categoryId) {
                        category.classList.add('active');
                    }
                });
                
                // Close mobile menu if open
                navLinks.classList.remove('active');
            }
            
            // Add click event listeners to tabs
            tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    const categoryId = this.dataset.category;
                    switchCategory(categoryId);
                    
                    // Smooth scroll to category on mobile
                    if (window.innerWidth <= 900) {
                        setTimeout(() => {
                            this.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 100);
                    }
                });
                
                // Add keyboard support
                tab.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        const categoryId = this.dataset.category;
                        switchCategory(categoryId);
                    }
                });
            });
            
            // Handle URL hash for direct category navigation
            function handleHashChange() {
                const hash = window.location.hash.substring(1);
                if (hash && ['starters', 'main-course', 'desserts', 'beverages', 'tasting'].includes(hash)) {
                    switchCategory(hash);
                }
            }
            
            // Initial hash check
            handleHashChange();
            
            // Listen for hash changes
            window.addEventListener('hashchange', handleHashChange);
            
            // Set tabindex for better keyboard navigation
            tabs.forEach((tab, index) => {
                tab.setAttribute('tabindex', '0');
                
                // Add arrow key navigation between tabs
                tab.addEventListener('keydown', function(e) {
                    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                        e.preventDefault();
                        const nextIndex = (index + 1) % tabs.length;
                        tabs[nextIndex].focus();
                    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                        e.preventDefault();
                        const prevIndex = (index - 1 + tabs.length) % tabs.length;
                        tabs[prevIndex].focus();
                    }
                });
            });
            
            // Sticky category tabs behavior
            const categoryTabs = document.querySelector('.category-tabs');
            const initialOffset = categoryTabs.offsetTop;
            
            window.addEventListener('scroll', function() {
                if (window.scrollY > initialOffset) {
                    categoryTabs.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
                    categoryTabs.style.backdropFilter = 'blur(10px)';
                } else {
                    categoryTabs.style.backgroundColor = 'var(--charcoal)';
                    categoryTabs.style.backdropFilter = 'none';
                }
            });
            
            // Smooth scroll for reservation button
            document.querySelector('.reservation-btn').addEventListener('click', function(e) {
                e.preventDefault();
                // In a real implementation, this would link to the reservations page
                alert('Reservation system would open here. For demo purposes only.');
            });
        });
    