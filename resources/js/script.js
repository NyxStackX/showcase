// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, initializing theme toggle...');
    
    const themeToggle = document.getElementById('theme-toggle');
    
    if (!themeToggle) {
        console.error('Theme toggle button not found!');
        return;
    }
    
    const html = document.documentElement;
    const icon = themeToggle.querySelector('i');
    
    if (!icon) {
        console.error('Icon not found in theme toggle!');
        return;
    }

    // Check for saved theme preference or default to dark mode
    const currentTheme = localStorage.getItem('theme') || 'dark';
    console.log('Current theme:', currentTheme);
    
    if (currentTheme === 'light') {
        html.classList.add('light-mode');
        icon.className = 'bx bx-sun';
    } else {
        html.classList.remove('light-mode');
        icon.className = 'bx bx-moon';
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', function() {
        if (html.classList.contains('light-mode')) {
            // Switch to dark mode
            html.classList.remove('light-mode');
            icon.className = 'bx bx-moon';
            localStorage.setItem('theme', 'dark');
        } else {
            // Switch to light mode
            html.classList.add('light-mode');
            icon.className = 'bx bx-sun';
            localStorage.setItem('theme', 'light');
        }
        
        // Force a repaint
        void html.offsetWidth;
    });

    // Menu toggle functionality
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.querySelector('.navbar');

    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', function() {
            navbar.classList.toggle('active');
        });
    }

    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.navbar a');
    if (navbar) {
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbar.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            const clickedInsideMenu = navbar.contains(e.target);
            const clickedMenuIcon = menuIcon && menuIcon.contains(e.target);

            if (!clickedInsideMenu && !clickedMenuIcon) {
                navbar.classList.remove('active');
            }
        });
    }

    // Back to top functionality
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Reliable active nav link based on current page
    setActiveNavLink();

    // Page Transition Functionality
    initPageTransitions();
    
    // Initialize elegant custom cursor
    initCustomCursor();
});

// Keep active nav link in sync with current page
function setActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar a');

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Page Transition System
function initPageTransitions() {
    // Create transition overlay if it doesn't exist
    let transitionOverlay = document.querySelector('.page-transition');
    if (!transitionOverlay) {
        transitionOverlay = document.createElement('div');
        transitionOverlay.className = 'page-transition';
        document.body.appendChild(transitionOverlay);
    }

    // Add page-content class to main content for entrance animation
    const mainContent = document.querySelector('section') || document.querySelector('main');
    if (mainContent && !mainContent.classList.contains('page-content')) {
        mainContent.classList.add('page-content');
    }

    // Handle internal link clicks for transition
    const internalLinks = document.querySelectorAll('a[href]:not([href^="#"]):not([href^="http"]):not([href^="mailto"]):not([href^="tel"])');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's the current page
            if (href === window.location.pathname.split('/').pop() || 
                (href === 'index.html' && window.location.pathname.endsWith('/'))) {
                return;
            }

            e.preventDefault();
            
            // Start transition
            document.body.classList.add('transitioning');
            transitionOverlay.classList.add('slide-up');
            
            // Navigate after animation
            setTimeout(() => {
                window.location.href = href;
            }, 600);
        });
    });

    // Handle page entrance animation
    window.addEventListener('pageshow', function(e) {
        // Remove transitioning class
        document.body.classList.remove('transitioning');
        
        // If coming from cache (back button), remove animation classes
        if (e.persisted) {
            transitionOverlay.classList.remove('slide-up', 'slide-down', 'active');
            return;
        }

        // Play entrance animation
        if (transitionOverlay.classList.contains('slide-up')) {
            transitionOverlay.classList.remove('slide-up');
            transitionOverlay.classList.add('slide-down');
            
            setTimeout(() => {
                transitionOverlay.classList.remove('slide-down', 'active');
            }, 600);
        }
    });

    // Handle initial page load
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        transitionOverlay.classList.add('slide-down');
        setTimeout(() => {
            transitionOverlay.classList.remove('slide-down', 'active');
        }, 600);
    }
}

// Curseur Luxe Premium - Multi-couches avec effets avancés
function initCustomCursor() {
    // Only on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    // Create main cursor element
    const cursor = document.createElement('div');
    cursor.className = 'cursor-luxe';
    document.body.appendChild(cursor);
    
    // Create trail particles array
    const trails = [];
    const trailCount = 5;
    
    for (let i = 0; i < trailCount; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.width = (8 - i) + 'px';
        trail.style.height = (8 - i) + 'px';
        document.body.appendChild(trail);
        trails.push({
            element: trail,
            x: 0,
            y: 0
        });
    }
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let isMoving = false;
    let mouseTimeout = null;
    
    // Smooth follow animation with trails
    function animate() {
        
        // Smooth interpolation for main cursor
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        // Update trails with staggered delay
        trails.forEach((trail, index) => {
            trail.x += (cursorX - trail.x) * (0.1 - index * 0.015);
            trail.y += (cursorY - trail.y) * (0.1 - index * 0.015);
            
            trail.element.style.left = trail.x + 'px';
            trail.element.style.top = trail.y + 'px';
            
            // Fade trails based on distance from cursor
            const distance = Math.sqrt(
                Math.pow(cursorX - trail.x, 2) + 
                Math.pow(cursorY - trail.y, 2)
            );
            const opacity = Math.max(0, 0.4 - distance * 0.005);
            trail.element.style.opacity = isMoving ? opacity : 0;
        });
        
        requestAnimationFrame(animate);
    }
    
    // Start animation
    setTimeout(() => {
        cursor.classList.add('visible');
        animate();
    }, 100);
    
    // Track mouse movement on entire document
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (!isMoving) {
            isMoving = true;
        }
        
        clearTimeout(mouseTimeout);
        mouseTimeout = setTimeout(() => {
            isMoving = false;
        }, 100);
    });
    
    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll(
        'a, button, .magazine-btn, .gradient-btn, .service-box, .project-card, ' +
        '.contact-item, input, textarea, .social-link, .info-box, ' +
        '.competency-card, .service-magazine-card, .project-magazine-card, ' +
        '.theme-toggle, #menu-icon, .footer-link, .project-link'
    );
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
    
    // Text hover detection
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, span');
    textElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (!el.closest('a, button')) {
                cursor.classList.add('text-hover');
            }
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('text-hover');
        });
    });
    
    // Click effects
    document.addEventListener('mousedown', () => {
        cursor.classList.add('click');
    });
    
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('click');
    });
    
    // Hide/show on window leave/enter
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        trails.forEach(t => t.element.style.opacity = '0');
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
}

// ===== MODALE PROJETS =====
(function () {
    const modal = document.getElementById('projModal');
    if (!modal) return;
    const cards = document.querySelectorAll('.mcard');
    const img = document.getElementById('pmImg');
    const cat = document.getElementById('pmCat');
    const title = document.getElementById('pmTitle');
    const desc = document.getElementById('pmDesc');
    const tech = document.getElementById('pmTech');
    const demo = document.getElementById('pmDemo');
    const code = document.getElementById('pmCode');

    function open(card) {
        img.src = card.dataset.img;
        img.alt = card.dataset.title;
        cat.textContent = card.dataset.cat;
        title.textContent = card.dataset.title;
        desc.textContent = card.dataset.desc;
        tech.innerHTML = card.dataset.tech.split(',')
            .map(t => '<span>' + t.trim() + '</span>').join('');
        const d = card.dataset.demo;
        if (d && d !== '#') { demo.href = d; demo.style.display = ''; }
        else { demo.style.display = 'none'; }
        code.href = card.dataset.code;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
    function close() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    cards.forEach(card => {
        card.addEventListener('click', () => open(card));
        card.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(card); }
        });
    });
    modal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', close));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();
