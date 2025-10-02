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
    const menuOverlay = document.getElementById('menu-overlay'); // ADD THIS LINE
    const backToTopBtn = document.querySelector('.back-to-top');
    const heroScrollArrow = document.querySelector('.hero-scroll-down');



    mobileMenuBtn.addEventListener('click', function () {
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        this.classList.toggle('active');
        navList.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        menuOverlay.classList.toggle('active'); // ADD THIS LINE

    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function () {
            if (navList.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navList.classList.remove('active');
                document.body.classList.remove('no-scroll');
                menuOverlay.classList.remove('active'); // ADD THIS LINE

            }
        });
    });

    // Sticky Header
    const header = document.querySelector('.header');
    // ▼▼▼ PASTE THIS ENTIRE NEW BLOCK HERE ▼▼▼

    // Single scroll event handler for performance
    function handleScroll() {
        const scrollPosition = window.scrollY;

        // Sticky Header Logic
        if (scrollPosition > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to Top Button Logic
        if (backToTopBtn && scrollPosition > 300) {
            backToTopBtn.classList.add('visible');
        } else if (backToTopBtn) {
            backToTopBtn.classList.remove('visible');
        }

        // Hide Hero Scroll Arrow Logic
        if (heroScrollArrow) {
            if (scrollPosition > 200) {
                heroScrollArrow.classList.add('fade-out');
            } else {
                heroScrollArrow.classList.remove('fade-out');
            }
        }

        // Animate on Scroll Logic
        animateOnScroll();
    }

    // Attach the single scroll listener
    window.addEventListener('scroll', handleScroll);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Check if we are on a mobile device
                if (window.innerWidth <= 768) {
                    // Mobile logic: wait for menu to close, then scroll
                    setTimeout(() => {
                        window.scrollTo({
                            top: targetElement.offsetTop - 70, // Mobile header offset
                            behavior: 'smooth'
                        });
                    }, 300);
                } else {
                    // Desktop logic: scroll immediately
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Desktop header offset
                        behavior: 'smooth'
                    });
                }
            }
        });
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
            // Hide all detail sections first
            document.querySelectorAll('.service-details').forEach(div => div.style.display = 'none');

            // Set modal content based on the clicked service
            switch (service) {
                case 'panchakarma':
                    modalTitle.textContent = 'Panchakarma';
                    modalImage.src = 'assets/panchakarma-modal.png';
                    document.getElementById('panchakarma-details').style.display = 'block';
                    break;
                case 'abhyanga':
                    modalTitle.textContent = 'Abhyanga';
                    modalImage.src = 'assets/abhyanga-modal.png'; // Make sure you have this image
                    document.getElementById('abhyanga-details').style.display = 'block';
                    break;
                case 'shirodhara':
                    modalTitle.textContent = 'Shirodhara';
                    modalImage.src = 'assets/shirodhara-modal.png';
                    document.getElementById('shirodhara-details').style.display = 'block';
                    break;
                case 'agni-karma':
                    modalTitle.textContent = 'Agni Karma';
                    modalImage.src = 'assets/agni-karma-modal.png';
                    document.getElementById('agni-karma-details').style.display = 'block';
                    break;
                case 'sthanik-basti':
                    modalTitle.textContent = 'Sthanik Basti';
                    modalImage.src = 'assets/sthanik-basti-modal.png';
                    document.getElementById('sthanik-basti-details').style.display = 'block';
                    break;
                case 'patrapottali':
                    modalTitle.textContent = 'Patrapottali';
                    modalImage.src = 'assets/patrapottali-modal.png';
                    document.getElementById('patrapottali-details').style.display = 'block';
                    break;
                case 'takradhara':
                    modalTitle.textContent = 'Takradhara';
                    modalImage.src = 'assets/takradhara-modal.png'; // Make sure you have this image
                    document.getElementById('takradhara-details').style.display = 'block';
                    break;
                case 'akshitarpan':
                    modalTitle.textContent = 'Akshitarpan';
                    modalImage.src = 'assets/akshitarpan-modal.png';
                    document.getElementById('akshitarpan-details').style.display = 'block';
                    break;
                case 'yogopchar':
                    modalTitle.textContent = 'Yogopchar';
                    modalImage.src = 'assets/yogopchar-modal.png';
                    document.getElementById('yogopchar-details').style.display = 'block';
                    break;
                default:
                    modalTitle.textContent = 'Service Details';
                    document.getElementById('panchakarma-details').style.display = 'block';
            }

            // Show modal
            modal.style.display = 'block';
            document.body.classList.add('no-scroll');
        });
    });


    // When we need to add more services, just add more cases in the switch statement above or there's a better/easier version

    //     const serviceData = {
    //   'panchakarma': { title: 'Panchakarma', image: 'assets/panchakarma-modal.png' },
    //   'abhyanga': { title: 'Abhyanga', image: 'assets/abhyanga-modal.png' },
    //   'shirodhara': { title: 'Shirodhara', image: 'assets/shirodhara-modal.png' },
    //   // ...add all other services here
    //   'yogopchar': { title: 'Yogopchar', image: 'assets/yogopchar-modal.png' }
    // }; 


    // click listener
    // learnMoreBtns.forEach(btn => {
    //     btn.addEventListener('click', function () {
    //         const serviceId = this.getAttribute('data-service');
    //         const data = serviceData[serviceId];

    //         if (data) {
    //             modalTitle.textContent = data.title;
    //             modalImage.src = data.image;

    //             document.querySelectorAll('.service-details').forEach(div => div.style.display = 'none');
    //             document.getElementById(`${serviceId}-details`).style.display = 'block';

    //             modal.style.display = 'block';
    //             document.body.classList.add('no-scroll');
    //         }
    //     });
    // });


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
    // const tips = [
    //     "Today's Wellness Tip: Start your morning with a glass of warm water infused with copper to boost immunity and digestion.",
    //     "Ayurvedic Wisdom: Eat your largest meal at lunch when your digestive fire (agni) is strongest.",
    //     "Health Tip: Practice oil pulling with sesame oil for 5-10 minutes daily to promote oral health.",
    //     "Seasonal Advice: Include warming spices like ginger and black pepper in your diet during colder months.",
    //     "Mindfulness Tip: Take 5 deep breaths before each meal to activate your parasympathetic nervous system for better digestion."
    // ];
    // Find and replace this entire array in script.js

    // const tips = [
    //     "Ayurvedic Wisdom: Eat your largest meal at lunch (ideally 11 AM - 1 PM) when your digestive fire (agni) is strongest.",
    //     "Health Tip: To improve digestion, enjoy a glass of buttermilk at the end of your lunch.",
    //     "Mindful Eating: Chew your food properly and avoid distractions like watching TV for better nutrient absorption.",
    //     "Stomach Rule: Fill your stomach 1/2 with solids, 1/4 with liquids, and leave 1/4 empty for optimal digestion.",
    //     "Pro Tip: Having your evening meal as early as possible is one of the best habits for digestive health.",
    //     "Did you know? According to Ayurveda, it's best to eat sweet-tasting foods at the beginning of your meal.",
    //     "Health Tip: Practice oil pulling with sesame oil for 5-10 minutes daily to promote oral health.",
    //     "Mindfulness Tip: Take 5 deep breaths before each meal to activate your parasympathetic nervous system for better digestion."
    // ];

    const tips = [
    "Eat your largest meal at lunch, when your digestive fire (Agni) is strongest.",
    "Enjoy a glass of buttermilk after lunch to aid digestion.",
    "Chew your food mindfully and avoid screen time while eating for better absorption.",
    "For optimal digestion, fill your stomach 1/2 with solids and 1/4 with liquids, leaving 1/4 empty.",
    "An early, light dinner is one of the best habits for digestive and overall health.",
    "Did you know? Ayurveda suggests eating sweet foods at the beginning of your meal.",
    "Practice daily oil pulling with sesame oil to promote excellent oral health.",
    "Take 5 deep breaths before each meal to prepare your body for digestion.",
    "Use medicated nasal drops (Nasya) daily to help prevent respiratory infections.",
    "Incorporate gentle stretching into your day to feel more energized.",
    "Keep track of your water intake; proper hydration is key to wellness.",
    "Chanting 'Aum' daily can help boost your energy levels and calm your mind.",
    "Regulated breathing while chanting 'Aum' sharpens focus and mental clarity.",
    "Simple breathing exercises like 'Anulom Vilom' Pranayama can be done by anyone, anytime.",
    "Take a brief, gentle walk after each meal whenever possible.",
    "Treat every meal as a vital ritual. Don't just 'grab a bite'—nourish your body.",
    "Proper eating involves chewing thoroughly, not gulping your food.",
    "For better digestion and mindfulness, avoid talking while you eat.",
    "Regularly perform simple eye exercises to combat screen-related strain."
];

/*
"Practise Kaval dharan -I.E. oil pulling or gargles like procedure daily",
"Practise Gandush:- keeping mouthful of medicated liquid for a few minutes inside oral cavity.",
"Kaval and Gandush help to cleanse oral cavity, prevent infection, strengthen facial muscle as well.",
*/

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


    // 1. Handle viewport scaling on iOS
    function setViewportScale() {
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport && window.innerWidth <= 480) {
            viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';
        }
    }
    setViewportScale();
    window.addEventListener('resize', setViewportScale);

    // 2. Better touch feedback for buttons
    document.querySelectorAll('.btn, .nav-link, .tab-btn').forEach(button => {
        button.addEventListener('touchstart', function () {
            this.classList.add('active-touch');
        });
        button.addEventListener('touchend', function () {
            this.classList.remove('active-touch');
        });
    });

    // 3. Prevent zooming on double-tap
    let lastTap = 0;
    document.addEventListener('touchend', function (event) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        if (tapLength < 300 && tapLength > 0) {
            event.preventDefault();
        }
        lastTap = currentTime;
    }, false);

    // FAQ Accordion Functionality
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.faq-item.active');
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }
            item.classList.toggle('active');
        });
    });

    // Copy to Clipboard Functionality
    const copyBtns = document.querySelectorAll('.copy-btn');

    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Add 'copied' class to show tooltip
                btn.classList.add('copied');

                // Remove the class after 2 seconds
                setTimeout(() => {
                    btn.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    });
}); // This is the final closing brace of your file