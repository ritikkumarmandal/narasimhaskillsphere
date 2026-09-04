/* =========================================================
   NAVIGATION
========================================================= */

const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

if (navToggle) {

    navToggle.addEventListener("click", () => {

        mainNav.classList.toggle("show");

    });

}


/* Close mobile menu after clicking */

document.querySelectorAll(".main-nav a").forEach((link) => {

    link.addEventListener("click", () => {

        mainNav.classList.remove("show");

    });

});


/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

const siteHeader = document.getElementById("siteHeader");

window.addEventListener("scroll", () => {

    if (window.scrollY > 60) {

        siteHeader.classList.add("scrolled");

    } else {

        siteHeader.classList.remove("scrolled");

    }

});


/* =========================================================
   HERO VIDEO
========================================================= */

const heroBackgroundVideo =
    document.querySelector(".hero-bg-video");


if (heroBackgroundVideo) {

    heroBackgroundVideo.play().catch(() => {

        console.log(
            "Background video autoplay waiting for browser permission."
        );

    });

}


/* =========================================================
   RIGHT SIDE VIDEO SLIDER
========================================================= */

const sliderVideos =
    document.querySelectorAll(".slider-video");

const currentCounter =
    document.querySelector(".counter-current");


let currentVideoIndex = 0;


/*
    Function:
    Stop all videos
*/

function stopAllSliderVideos() {

    sliderVideos.forEach((video) => {

        video.pause();

        video.currentTime = 0;

        video.classList.remove("active");

    });

}


/*
    Function:
    Play selected video
*/

function playSliderVideo(index) {

    if (!sliderVideos.length) {
        return;
    }


    stopAllSliderVideos();


    const video =
        sliderVideos[index];


    video.classList.add("active");


    /*
        Update counter
    */

    if (currentCounter) {

        currentCounter.textContent =
            String(index + 1).padStart(2, "0");

    }


    /*
        Start video
    */

    video.currentTime = 0;

    video.play().catch(() => {

        console.log(
            "Slider video autoplay blocked."
        );

    });


}


/*
    When video ends:
    Move to next video
*/

sliderVideos.forEach((video, index) => {

    video.addEventListener("ended", () => {

        currentVideoIndex++;

        if (currentVideoIndex >= sliderVideos.length) {

            currentVideoIndex = 0;

        }

        playSliderVideo(currentVideoIndex);

    });

});


/*
    Start first video
*/

if (sliderVideos.length > 0) {

    playSliderVideo(0);

}


/* =========================================================
   FALLBACK TIMER
========================================================= */

/*
   If a video doesn't have duration
   or gets stuck, move to next video
   after 8 seconds.
*/

let fallbackTimer;


function startFallbackTimer() {

    clearTimeout(fallbackTimer);


    fallbackTimer = setTimeout(() => {

        if (!sliderVideos.length) {
            return;
        }


        currentVideoIndex++;

        if (currentVideoIndex >= sliderVideos.length) {

            currentVideoIndex = 0;

        }


        playSliderVideo(currentVideoIndex);


        startFallbackTimer();

    }, 8000);

}


if (sliderVideos.length) {

    startFallbackTimer();

}


/* =========================================================
   COURSE TABS
========================================================= */

const tabButtons =
    document.querySelectorAll(".tab-btn");

const tabPanels =
    document.querySelectorAll(".tab-panel");


tabButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const target =
            button.getAttribute("data-tab");


        /*
            Remove active from buttons
        */

        tabButtons.forEach((btn) => {

            btn.classList.remove("active");

        });


        /*
            Add active to clicked button
        */

        button.classList.add("active");


        /*
            Hide all panels
        */

        tabPanels.forEach((panel) => {

            panel.classList.remove("active");

        });


        /*
            Show selected panel
        */

        const selectedPanel =
            document.getElementById(target);


        if (selectedPanel) {

            selectedPanel.classList.add("active");

        }

    });

});


/* =========================================================
   ACTIVE NAV ON SCROLL
========================================================= */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".main-nav a");


window.addEventListener("scroll", () => {

    let currentSection = "";


    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 180;

        const sectionHeight =
            section.offsetHeight;


        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active");


        const href =
            link.getAttribute("href");


        if (href === `#${currentSection}`) {

            link.classList.add("active");

        }

    });

});


/* =========================================================
   NEWSLETTER
========================================================= */

const newsletterForm =
    document.getElementById("newsletterForm");


if (newsletterForm) {

    newsletterForm.addEventListener("submit", (event) => {

        event.preventDefault();


        const emailInput =
            newsletterForm.querySelector("input");


        if (!emailInput.value) {
            return;
        }


        alert(
            "Thank you! You have joined our innovation community."
        );


        emailInput.value = "";

    });

}


/* =========================================================
   SCROLL TO TOP
========================================================= */

const scrollTop =
    document.getElementById("scrollTop");


window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        scrollTop.classList.add("show");

    } else {

        scrollTop.classList.remove("show");

    }

});


scrollTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* =========================================================
   PAUSE MARQUEE ON HOVER
========================================================= */

const marqueeTrack =
    document.querySelector(".marquee-track");


if (marqueeTrack) {

    marqueeTrack.addEventListener("mouseenter", () => {

        marqueeTrack.style.animationPlayState =
            "paused";

    });


    marqueeTrack.addEventListener("mouseleave", () => {

        marqueeTrack.style.animationPlayState =
            "running";

    });

}


/* =========================================================
   PAUSE RIGHT VIDEO WHEN TAB IS NOT ACTIVE
========================================================= */

document.addEventListener("visibilitychange", () => {

    if (document.hidden) {

        sliderVideos.forEach((video) => {

            video.pause();

        });

        if (heroBackgroundVideo) {

            heroBackgroundVideo.pause();

        }

    } else {

        if (heroBackgroundVideo) {

            heroBackgroundVideo.play().catch(() => {});

        }


        if (sliderVideos.length) {

            sliderVideos[currentVideoIndex]
                .play()
                .catch(() => {});

        }

    }

});