        // Mobile Menu Toggle
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close menu when clicking a link
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }

        // Header scroll effect
        const header = document.querySelector('.header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // FAQ Accordion
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Close other open items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        });

        // Scroll Reveal Animation
        const revealElements = document.querySelectorAll('.reveal');

        function revealOnScroll() {
            const windowHeight = window.innerHeight;
            const revealPoint = 150;

            revealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;

                if (elementTop < windowHeight - revealPoint) {
                    element.classList.add('active');
                }
            });
        }

        // Initial check and scroll listener
        revealOnScroll();
        window.addEventListener('scroll', revealOnScroll);

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Counter animation for stats
        const statItems = document.querySelectorAll('.stat-item h3');

        function animateCounter(element) {
            const text = element.textContent;
            const isPercentage = text.includes('%');
            const isPlus = text.includes('+');
            const isM = text.includes('M');
            const hasDollar = text.includes('$');
            
            let target = parseInt(text.replace(/[^0-9]/g, ''));
            
            // Handle millions - scale target appropriately
            if (isM && target < 100) {
                target = target * 1000000; // Convert to actual number for animation
            }
            
            let current = 0;
            const duration = 2000;
            const stepTime = duration / 50;
            const increment = target / 50;

            const timer = setInterval(() => {
                current += increment;
                
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                let displayValue;
                
                if (isM && hasDollar) {
                    // Format as $XM format for millions
                    const millions = (current / 1000000).toFixed(0);
                    displayValue = '$' + millions + 'M+';
                } else if (isPercentage) {
                    displayValue = '+' + Math.floor(current) + '%';
                } else if (isPlus) {
                    displayValue = Math.floor(current).toLocaleString() + '+';
                } else {
                    displayValue = Math.floor(current).toLocaleString();
                }
                
                element.textContent = displayValue;
            }, stepTime);
        }

        // Trigger counter animation when stats section is visible
        const statsSection = document.querySelector('.stats-grid');
        let hasAnimated = false;

        if (statsSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !hasAnimated) {
                        hasAnimated = true;
                        statItems.forEach(stat => {
                            animateCounter(stat);
                        });
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(statsSection);
        }
