// SP Heating Interactive Scripts

document.addEventListener('DOMContentLoaded', () => {

    // --- Cookie Banner Logic ---
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptCookiesBtn = document.getElementById('acceptCookies');

    // Check if user has already accepted cookies
    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            if (cookieBanner) cookieBanner.style.display = 'block';
        }, 1000);
    }

    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            if (cookieBanner) {
                cookieBanner.style.opacity = '0';
                setTimeout(() => {
                    cookieBanner.style.display = 'none';
                }, 500);
            }
        });
    }

    // --- Emergency Banner Close ---
    const closeBanner = document.getElementById('closeBanner');
    const emergencyBanner = document.getElementById('emergencyBanner');

    if (closeBanner && emergencyBanner) {
        closeBanner.addEventListener('click', () => {
            emergencyBanner.style.transform = 'translateY(-100%)';
            emergencyBanner.style.transition = 'transform 0.3s ease';
            document.body.classList.remove('banner-visible');

            // Store preference in session
            sessionStorage.setItem('bannerClosed', 'true');
        });

        // Check if banner was previously closed this session
        if (sessionStorage.getItem('bannerClosed') === 'true') {
            emergencyBanner.style.display = 'none';
            document.body.classList.remove('banner-visible');
        }
    }

    // --- Mobile Menu Toggle ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // --- Navbar Scroll Effect (Glassmorphism enhancement) ---
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Smooth Scroll Behaviour (extra polish) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Adjust offset based on banner visibility
                const bannerOffset = document.body.classList.contains('banner-visible') ? 120 : 80;
                window.scrollTo({
                    top: target.offsetTop - bannerOffset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Intersection Observer for Animations ---
    const animatedElements = document.querySelectorAll('[data-animate]');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // If it has a delay style, ensure it respects that
                const delay = entry.target.style.getPropertyValue('--delay');
                if (delay) {
                    entry.target.style.transitionDelay = delay;
                }

                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // --- Ripple Effect ---
    // Simple JS implementation for the ripple effect on buttons
    const buttons = document.querySelectorAll('.ripple');

    buttons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            // Don't prevent default if it's a link, just show effect then navigate

            let x = e.clientX - e.target.getBoundingClientRect().left;
            let y = e.clientY - e.target.getBoundingClientRect().top;

            let ripples = document.createElement('span');
            ripples.style.left = x + 'px';
            ripples.style.top = y + 'px';
            ripples.classList.add('ripple-span');

            this.appendChild(ripples);

            setTimeout(() => {
                ripples.remove();
            }, 1000);
        });
    });

    // --- CSS Animation Classes Injection ---
    // Injecting dynamic styles for specific animation types to keep HTML clean
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        /* Utility Animation Classes */
        [data-animate] {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        [data-animate].visible {
            opacity: 1;
            transform: translateY(0);
        }

        [data-animate="fade-in-right"] {
            transform: translateX(30px);
        }
        
        [data-animate="fade-in-right"].visible {
            transform: translateX(0);
        }

        [data-animate="fade-in-left"] {
            transform: translateX(-30px);
        }

        [data-animate="fade-in-left"].visible {
            transform: translateX(0);
        }

        /* Ripple Keyframes */
        .ripple {
            position: relative;
            overflow: hidden;
        }

        .ripple-span {
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            transform: translate(-50%, -50%);
            pointer-events: none;
            border-radius: 50%;
            animation: rippleAnimate 1s linear infinite;
        }

        @keyframes rippleAnimate {
            0% {
                width: 0px;
                height: 0px;
                opacity: 0.5;
            }
            100% {
                width: 500px;
                height: 500px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(styleSheet);
    // --- Sticky Call Button Scroll Visibility ---
    const stickyCall = document.querySelector('.sticky-call');

    if (stickyCall) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                stickyCall.classList.add('visible');
            } else {
                stickyCall.classList.remove('visible');
            }
        });
    }

});
