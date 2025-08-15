document.addEventListener('DOMContentLoaded', function () {
    // Preloader
    const preloader = document.querySelector('.preloader');

    window.addEventListener('load', function () {
        setTimeout(function () {
            preloader.classList.add('fade-out');
        }, 1000);
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');

    mobileMenuBtn.addEventListener('click', function () {
        this.classList.toggle('active');
        navList.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function () {
            if (navList.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navList.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    // Sticky Header
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Service Modal Functionality
    const learnMoreBtns = document.querySelectorAll('.learn-more');
    const modal = document.getElementById('service-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    // modal close on button click functionality


    const modalBookBtn = document.querySelector('.modal-book-button');
    if (modalBookBtn) {
        modalBookBtn.addEventListener('click', closeModalFunc);
    }

    learnMoreBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const service = this.getAttribute('data-service');

            // Set modal content based on service
            switch (service) {
                case 'panchakarma':
                    modalTitle.textContent = 'Panchakarma';
                    modalImage.src = 'assets/panchakarma-modal.jpg';
                    break;
                case 'abhyanga':
                    modalTitle.textContent = 'Abhyanga';
                    modalImage.src = 'assets/abhyanga-modal.jpg';
                    break;
                case 'shirodhara':
                    modalTitle.textContent = 'Shirodhara';
                    modalImage.src = 'assets/shirodhara-modal.jpg';
                    break;
                case 'agni-karma':
                    modalTitle.textContent = 'Agni Karma';
                    modalImage.src = 'assets/agni-karma-modal.jpg';
                    break;
                default:
                    modalTitle.textContent = 'Service Details';
            }

            // Show modal
            modal.style.display = 'block';
            document.body.classList.add('no-scroll');
        });
    });

    // Close modal
    function closeModalFunc() {
        modal.style.display = 'none';
        document.body.classList.remove('no-scroll');
    }

    closeModal.addEventListener('click', closeModalFunc);
    modalOverlay.addEventListener('click', closeModalFunc);

    // Close modal when pressing Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModalFunc();
        }
    });

    // Product Details Toggle
    const productDetailBtns = document.querySelectorAll('.product-details-btn');

    productDetailBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const details = this.nextElementSibling;
            details.classList.toggle('active');

            // Change button icon
            const icon = this.querySelector('.btn-icon i');
            if (details.classList.contains('active')) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
                this.querySelector('.btn-text').textContent = 'Hide Details';
            } else {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
                this.querySelector('.btn-text').textContent = 'View Details';
            }
        });
    });

    // Health Tips Tab Functionality
    const tabBtns = document.querySelectorAll('.tab-btn');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove active class from all buttons and content
            tabBtns.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });

            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Daily Routines Tab Functionality
    const routineTabBtns = document.querySelectorAll('.routine-tab-btn');

    routineTabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove active class from all buttons and content
            routineTabBtns.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.routine-content').forEach(content => {
                content.classList.remove('active');
            });

            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const routineId = this.getAttribute('data-routine');
            document.getElementById(`${routineId}-routine`).classList.add('active');
        });
    });

    // Rotate Doctor's Tip
    const tips = [
        "Today's Wellness Tip: Start your morning with a glass of warm water infused with copper to boost immunity and digestion.",
        "Ayurvedic Wisdom: Eat your largest meal at lunch when your digestive fire (agni) is strongest.",
        "Health Tip: Practice oil pulling with sesame oil for 5-10 minutes daily to promote oral health.",
        "Seasonal Advice: Include warming spices like ginger and black pepper in your diet during colder months.",
        "Mindfulness Tip: Take 5 deep breaths before each meal to activate your parasympathetic nervous system for better digestion."
    ];

    const tipText = document.querySelector('.tip-text');
    let currentTip = 0;

    function changeTip() {
        tipText.style.opacity = 0;
        setTimeout(() => {
            currentTip = (currentTip + 1) % tips.length;
            tipText.textContent = tips[currentTip];
            tipText.style.opacity = 1;
        }, 500);
    }

    // Change tip every 8 seconds
    setInterval(changeTip, 8000);

    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('[data-animation]');
        const windowHeight = window.innerHeight;
        const scrollPosition = window.scrollY;

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top + scrollPosition;
            const animation = element.getAttribute('data-animation');
            const delay = element.getAttribute('data-delay') || 0;

            if (scrollPosition > elementPosition - windowHeight + 100) {
                setTimeout(() => {
                    element.classList.add('animate__animated', `animate__${animation}`);
                }, delay * 1000);
            }
        });
    }

    // Run on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Initialize first tab as active
    if (tabBtns.length > 0) {
        tabBtns[0].click();
    }

    if (routineTabBtns.length > 0) {
        routineTabBtns[0].click();
    }

    // Functionality for Footer Service Links
    const footerServiceLinks = document.querySelectorAll('.footer-service-link');

    footerServiceLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Find the corresponding "Explore Treatments" button on the service card
            const serviceName = this.getAttribute('data-service');
            const correspondingButton = document.querySelector(`.learn-more[data-service="${serviceName}"]`);

            if (correspondingButton) {
                // Trigger the click event of the button, which will open the modal
                correspondingButton.click();
            }

            // The smooth scroll will be handled by the existing script for 'a[href^="#"]'
        });
    });
});