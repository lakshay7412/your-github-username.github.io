/* =================================
   PAGE LOADER
================================= */

const loader = document.querySelector(".loader");
const loaderNumber = document.querySelector(".loader-number");
const loaderLine = document.querySelector(".loader-line");

let loading = 0;

const loadingInterval = setInterval(() => {

    loading += Math.floor(Math.random() * 8) + 3;

    if (loading >= 100) {
        loading = 100;
        clearInterval(loadingInterval);

        setTimeout(() => {

            loader.style.opacity = "0";
            loader.style.transition = "opacity .8s ease";

            setTimeout(() => {
                loader.style.display = "none";
                revealHero();
            }, 800);

        }, 300);
    }

    loaderNumber.textContent =
        String(loading).padStart(2, "0");

    loaderLine.style.transform =
        `scaleX(${loading / 100})`;

}, 50);



/* =================================
   HERO REVEAL
================================= */

function revealHero() {

    const heroWords =
        document.querySelectorAll(".hero-title span");

    heroWords.forEach((word, index) => {

        setTimeout(() => {

            word.style.opacity = "1";
            word.style.transform = "translateY(0)";

            word.style.transition =
                "opacity 1s ease, transform 1s cubic-bezier(.2,.8,.2,1)";

        }, index * 180);

    });

}



/* =================================
   CUSTOM CURSOR
================================= */

const cursor =
    document.querySelector(".cursor");

const follower =
    document.querySelector(".cursor-follower");

let mouseX = 0;
let mouseY = 0;

let followerX = 0;
let followerY = 0;

document.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;

});


function animateCursor() {

    followerX +=
        (mouseX - followerX) * 0.15;

    followerY +=
        (mouseY - followerY) * 0.15;

    follower.style.left =
        `${followerX}px`;

    follower.style.top =
        `${followerY}px`;

    requestAnimationFrame(animateCursor);
}

animateCursor();



/* =================================
   CURSOR HOVER
================================= */

const interactiveElements =
    document.querySelectorAll(
        "a, button, .project, .service"
    );

interactiveElements.forEach((element) => {

    element.addEventListener("mouseenter", () => {

        follower.style.width = "70px";
        follower.style.height = "70px";
        follower.style.background =
            "rgba(255,255,255,.08)";

    });

    element.addEventListener("mouseleave", () => {

        follower.style.width = "38px";
        follower.style.height = "38px";
        follower.style.background =
            "transparent";

    });

});



/* =================================
   SCROLL REVEAL
================================= */

const revealElements = document.querySelectorAll(
    ".section-heading, .project, .about-grid, .service, .statement-line, .contact-content"
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
});


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach((element) => {
    revealObserver.observe(element);
});



/* =================================
   PARALLAX HERO
================================= */

const hero =
    document.querySelector(".hero");

const heroShape =
    document.querySelector(".hero-shape");

const glowOne =
    document.querySelector(".glow-one");

const glowTwo =
    document.querySelector(".glow-two");


window.addEventListener("scroll", () => {

    const scrollY = window.scrollY;

    if (scrollY < window.innerHeight) {

        if (heroShape) {

            heroShape.style.transform =
                `translateY(${scrollY * .15}px) rotate(${45 + scrollY * .08}deg)`;

        }

        if (glowOne) {

            glowOne.style.transform =
                `translateY(${scrollY * .12}px)`;

        }

        if (glowTwo) {

            glowTwo.style.transform =
                `translateY(${-scrollY * .08}px)`;

        }

    }

});



/* =================================
   MAGNETIC BUTTONS
================================= */

const magneticElements =
    document.querySelectorAll(
        ".nav-button, .scroll-button, .email-link"
    );


magneticElements.forEach((element) => {

    element.addEventListener("mousemove", (e) => {

        const rect =
            element.getBoundingClientRect();

        const x =
            e.clientX -
            rect.left -
            rect.width / 2;

        const y =
            e.clientY -
            rect.top -
            rect.height / 2;

        element.style.transform =
            `translate(${x * .15}px, ${y * .15}px)`;

    });


    element.addEventListener("mouseleave", () => {

        element.style.transform =
            "translate(0, 0)";

    });

});



/* =================================
   PROJECT TILT
================================= */

const projects =
    document.querySelectorAll(".project-image");


projects.forEach((project) => {

    project.addEventListener("mousemove", (e) => {

        const rect =
            project.getBoundingClientRect();

        const x =
            e.clientX - rect.left;

        const y =
            e.clientY - rect.top;

        const rotateX =
            ((y / rect.height) - .5) * -4;

        const rotateY =
            ((x / rect.width) - .5) * 4;

        project.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)`;

    });


    project.addEventListener("mouseleave", () => {

        project.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0)";

    });

});



/* =================================
   SMOOTH ANCHOR LINKS
================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach((anchor) => {

    anchor.addEventListener("click", function(e) {

        const target =
            document.querySelector(
                this.getAttribute("href")
            );

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});



/* =================================
   MOBILE MENU
================================= */

const menuButton =
    document.querySelector(".menu-button");

const navbar =
    document.querySelector(".navbar");

let menuOpen = false;


if (menuButton) {

    menuButton.addEventListener("click", () => {

        menuOpen = !menuOpen;

        if (menuOpen) {

            navbar.classList.add("menu-open");

        } else {

            navbar.classList.remove("menu-open");

        }

    });

}



/* =================================
   TEXT MOUSE PARALLAX
================================= */

const heroTitle =
    document.querySelector(".hero-title");


document.addEventListener("mousemove", (e) => {

    if (!heroTitle) return;

    const x =
        (e.clientX / window.innerWidth - .5);

    const y =
        (e.clientY / window.innerHeight - .5);

    heroTitle.style.transform =
        `translate(${x * 8}px, ${y * 8}px)`;

});



/* =================================
   SERVICE HOVER NUMBER
================================= */

const services =
    document.querySelectorAll(".service");

services.forEach((service) => {

    service.addEventListener("mouseenter", () => {

        service.style.transform =
            "translateX(10px)";

    });

    service.addEventListener("mouseleave", () => {

        service.style.transform =
            "translateX(0)";

    });

});



/* =================================
   CURRENT YEAR
================================= */

const year =
    document.querySelector(
        ".contact-bottom span:last-child"
    );

if (year) {

    year.textContent =
        `© ${new Date().getFullYear()} LAKSHAY POONIA`;

}