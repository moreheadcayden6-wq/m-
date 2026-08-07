/* 
    RS Sports Cards - Interactive Functionality
    Logic: Animations, Navigation, UI Interactions
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Loading Animation
    const loader = document.querySelector('.loader-wrapper');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            document.body.style.overflow = 'auto';
            // Trigger initial reveals
            reveal();
        }, 1000);
    });

    // 2. Sticky Navbar & Active Link Highlighting
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Sticky class
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });

        // Back to top button visibility
        const backToTop = document.getElementById('backToTop');
        if (window.scrollY > 500) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });

    // 3. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinksContainer.classList.toggle('mobile-active');
        // Add styles dynamically for mobile menu if needed
        if (navLinksContainer.classList.contains('mobile-active')) {
            navLinksContainer.style.display = 'flex';
            navLinksContainer.style.flexDirection = 'column';
            navLinksContainer.style.position = 'absolute';
            navLinksContainer.style.top = '100%';
            navLinksContainer.style.left = '0';
            navLinksContainer.style.width = '100%';
            navLinksContainer.style.background = 'white';
            navLinksContainer.style.padding = '20px';
            navLinksContainer.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
            mobileMenuBtn.children[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            mobileMenuBtn.children[1].style.opacity = '0';
            mobileMenuBtn.children[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            navLinksContainer.style.display = '';
            mobileMenuBtn.children[0].style.transform = '';
            mobileMenuBtn.children[1].style.opacity = '1';
            mobileMenuBtn.children[2].style.transform = '';
        }
    });

    // 4. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    const reveal = () => {
        revealElements.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', reveal);

    // 5. Animated Counter
    const counters = document.querySelectorAll('.counter');
    let counterStarted = false;

    const startCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const increment = target / 100;
            
            const updateCounter = () => {
                const count = +counter.innerText;
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
    };

    // Check if counters are in view
    window.addEventListener('scroll', () => {
        const statsSection = document.querySelector('.stats-container');
        if (statsSection) {
            const sectionTop = statsSection.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight - 100 && !counterStarted) {
                startCounters();
                counterStarted = true;
            }
        }
    });

    // 6. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // 7. Back to Top Click
    const backToTop = document.getElementById('backToTop');
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 8. Contact Form Submission (Mock)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Sending...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerText = 'Message Sent!';
                btn.style.background = '#28a745';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});
