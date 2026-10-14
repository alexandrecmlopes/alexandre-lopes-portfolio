document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS
       ===================================================== */

    const header = document.getElementById("header");

    const progressBar =
        document.getElementById("progressBar");

    const menuButton =
        document.getElementById("menuButton");

    const mobileNav =
        document.getElementById("mobileNav");

    const backToTop =
        document.getElementById("backToTop");

    const currentYear =
        document.getElementById("currentYear");

    const navLinks =
        document.querySelectorAll(".desktop-nav .nav-link");

    const mobileLinks =
        document.querySelectorAll(".mobile-nav a");

    const revealElements =
        document.querySelectorAll(".reveal");


    /* =====================================================
       ANO AUTOMÁTICO
       ===================================================== */

    if (currentYear) {
        currentYear.textContent =
            new Date().getFullYear();
    }


    /* =====================================================
       MENU MOBILE
       ===================================================== */

    function openMenu() {

        mobileNav.classList.add("open");

        document.body.classList.add("menu-open");

        menuButton.setAttribute(
            "aria-expanded",
            "true"
        );

        menuButton.setAttribute(
            "aria-label",
            "Fechar menu"
        );
    }


    function closeMenu() {

        mobileNav.classList.remove("open");

        document.body.classList.remove("menu-open");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        menuButton.setAttribute(
            "aria-label",
            "Abrir menu"
        );
    }


    if (menuButton) {

        menuButton.addEventListener(
            "click",
            () => {

                const isOpen =
                    mobileNav.classList.contains("open");

                if (isOpen) {
                    closeMenu();
                } else {
                    openMenu();
                }

            }
        );

    }


    mobileLinks.forEach((link) => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {
                closeMenu();
            }

        }
    );


    /* =====================================================
       SCROLL
       ===================================================== */

    function handleScroll() {

        const scrollTop =
            window.scrollY;


        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;


        const progress =
            documentHeight > 0
                ? (scrollTop / documentHeight) * 100
                : 0;


        progressBar.style.width =
            `${progress}%`;


        if (scrollTop > 30) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }


        if (scrollTop > 600) {

            backToTop.classList.add(
                "visible"
            );

        } else {

            backToTop.classList.remove(
                "visible"
            );

        }

    }


    window.addEventListener(
        "scroll",
        handleScroll,
        {
            passive: true
        }
    );


    handleScroll();


    /* =====================================================
       VOLTAR AO TOPO
       ===================================================== */

    if (backToTop) {

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       NAVEGAÇÃO ATIVA
       ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const sectionObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        const currentId =
                            entry.target.getAttribute(
                                "id"
                            );


                        navLinks.forEach(
                            (link) => {

                                const href =
                                    link.getAttribute(
                                        "href"
                                    );


                                link.classList.toggle(
                                    "active",
                                    href ===
                                    `#${currentId}`
                                );

                            }
                        );

                    }
                );

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px",

                threshold: 0
            }
        );


    sections.forEach(
        (section) => {

            sectionObserver.observe(
                section
            );

        }
    );


    /* =====================================================
       REVEAL ON SCROLL
       ===================================================== */

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(
                    (entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        entry.target.classList.add(
                            "visible"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }
                );

            },
            {
                threshold: 0.10,

                rootMargin:
                    "0px 0px -40px 0px"
            }
        );


    revealElements.forEach(
        (element) => {

            revealObserver.observe(
                element
            );

        }
    );


    /* =====================================================
       GLOW SUTIL NO HERO
       ===================================================== */

    const hero =
        document.querySelector(".hero");

    const heroGlow =
        document.querySelector(".hero-glow");


    if (
        hero &&
        heroGlow &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        hero.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    hero.getBoundingClientRect();


                const x =
                    (
                        (event.clientX -
                            rect.left) /
                        rect.width -
                        0.5
                    ) * 25;


                const y =
                    (
                        (event.clientY -
                            rect.top) /
                        rect.height -
                        0.5
                    ) * 25;


                heroGlow.style.transform =
                    `translate(${x}px, ${y}px)`;

            }
        );

    }


    /* =====================================================
       EFEITO 3D DISCRETO NO PROJETO JARVIS
       ===================================================== */

    const featuredProject =
        document.querySelector(
            ".project-featured"
        );


    if (
        featuredProject &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        featuredProject.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    featuredProject.getBoundingClientRect();


                const x =
                    (event.clientX -
                        rect.left) /
                    rect.width;


                const y =
                    (event.clientY -
                        rect.top) /
                    rect.height;


                const rotateX =
                    (0.5 - y) * 2.2;


                const rotateY =
                    (x - 0.5) * 2.2;


                featuredProject.style.transform =
                    `perspective(1200px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;

            }
        );


        featuredProject.addEventListener(
            "mouseleave",
            () => {

                featuredProject.style.transform =
                    "";

            }
        );

    }


    /* =====================================================
       LOG
       ===================================================== */

    console.log(
        "%cAlexandre Lopes",
        "font-size: 18px; font-weight: 700;"
    );

    console.log(
        "%cTecnologia, negócios e construção.",
        "font-size: 12px;"
    );

});