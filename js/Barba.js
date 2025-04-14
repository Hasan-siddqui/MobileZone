// Update the Barba.js init code
if (typeof barba !== 'undefined') {
    barba.init({
        transitions: [
            {
                name: 'default-transition',
                leave(data) {
                    return gsap.to(data.current.container, {
                        opacity: 0,
                        y: 50,
                        duration: 0.5
                    });
                },
                enter(data) {
                    return gsap.from(data.next.container, {
                        opacity: 0,
                        y: -50,
                        duration: 0.5
                    });
                }
            },
            {
                name: 'product-transition',
                to: {
                    namespace: ['product']
                },
                leave(data) {
                    return gsap.to(data.current.container, {
                        opacity: 0,
                        scale: 0.9,
                        duration: 0.5
                    });
                },
                enter(data) {
                    return gsap.from(data.next.container, {
                        opacity: 0,
                        scale: 1.1,
                        duration: 0.5
                    });
                }
            },
            {
                name: 'home-transition',
                from: {
                    namespace: ['product', 'about', 'contact']
                },
                to: {
                    namespace: ['homepage']
                },
                leave(data) {
                    return gsap.to(data.current.container, {
                        opacity: 0,
                        x: -100,
                        duration: 0.5
                    });
                },
                enter(data) {
                    return gsap.from(data.next.container, {
                        opacity: 0,
                        x: 100,
                        duration: 0.5
                    });
                }
            }
        ],
        views: [
            {
                namespace: 'product',
                beforeEnter(data) {
                    scrollTo(0, 0);
                    setupProductTabs();
                }
            }
        ],
        prevent: ({ el }) => el.classList && el.classList.contains('prevent-barba')
    });

    barba.hooks.after(() => {
        updateActiveNavLink();
        setupFAQAccordion();
        animateOnScroll();
        bindCartButtons();
    });
}