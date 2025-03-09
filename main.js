// Initialize Feather Icons
document.addEventListener('DOMContentLoaded', function() {
    feather.replace();
    
    // Function to toggle the mobile menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuOverlay = document.getElementById('menuOverlay');

    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        mobileMenuBtn.classList.toggle('open');
        mobileMenu.classList.toggle('open');
        menuOverlay.classList.toggle('active');
        
        // Prevent body scrolling when menu is open
        if (mobileMenu.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
            mobileMenu.style.display = 'block'; // Explicitly show the menu
        } else {
            document.body.style.overflow = '';
            // Don't hide immediately to allow for transition
            setTimeout(() => {
                if (!mobileMenu.classList.contains('open')) {
                    mobileMenu.style.display = 'none';
                }
            }, 300); // Match transition duration
        }
    });
    
    // Close mobile menu when clicking on the overlay
    menuOverlay.addEventListener('click', function() {
        mobileMenuBtn.classList.remove('open');
        mobileMenu.classList.remove('open');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close mobile menu when clicking on a menu item
    const mobileMenuItems = mobileMenu.querySelectorAll('a');
    mobileMenuItems.forEach(item => {
        item.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('open');
            mobileMenu.classList.remove('open');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Adjust navbar on scroll for better UI
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('shadow-lg', 'py-2');
            nav.classList.remove('py-3');
        } else {
            nav.classList.remove('shadow-lg', 'py-2');
            nav.classList.add('py-3');
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            mobileMenuBtn.classList.remove('open');
            mobileMenu.classList.remove('open');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                mobileMenuBtn.classList.remove('open');
                mobileMenu.classList.remove('open');
            }
        });
    });
    
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeToggleMobile = document.getElementById('darkModeToggleMobile');
    const body = document.body;
    
    function toggleDarkMode() {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        
        darkModeToggle.innerHTML = isDarkMode ? 
            '<i class="fas fa-sun"></i>' : 
            '<i class="fas fa-moon"></i>';
            
        darkModeToggleMobile.innerHTML = isDarkMode ? 
            '<i class="fas fa-sun"></i>' : 
            '<i class="fas fa-moon"></i>';
            
        localStorage.setItem('darkMode', isDarkMode);
    }
    
    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        darkModeToggleMobile.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    darkModeToggle.addEventListener('click', toggleDarkMode);
    darkModeToggleMobile.addEventListener('click', toggleDarkMode);
    
    // Animation on scroll
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate elements on scroll
    gsap.utils.toArray('.reveal-element').forEach(element => {
        gsap.from(element, {
            y: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    });
    
    // Feature cards hover effect
    gsap.utils.toArray('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
});