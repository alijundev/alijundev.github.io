
(function () {
    "use strict";

    // smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener("click", function (e) {
            var targetId = this.getAttribute("href");
            if (targetId === "#") return;

            var target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();

          
            closeMobileNav();

            target.scrollIntoView({ behavior: "smooth" });
        });
    });

    // scroll aniamtion
    var fadeElements = document.querySelectorAll(".fade-in");

    if ("IntersectionObserver" in window) {
        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        fadeElements.forEach(function (el) {
            observer.observe(el);
        });
    } else {
      
        fadeElements.forEach(function (el) {
            el.classList.add("visible");
        });
    }

    // mobile nav
    var hamburger = document.getElementById("hamburger-btn");
    var nav = document.getElementById("main-nav");
    var overlay = null;

  
    function createOverlay() {
        overlay = document.createElement("div");
        overlay.classList.add("nav-overlay");
        document.body.appendChild(overlay);
        overlay.addEventListener("click", closeMobileNav);
    }

    createOverlay();

    function openMobileNav() {
        nav.classList.add("open");
        hamburger.classList.add("active");
        hamburger.setAttribute("aria-expanded", "true");
        if (overlay) overlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeMobileNav() {
        nav.classList.remove("open");
        hamburger.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
        if (overlay) overlay.classList.remove("active");
        document.body.style.overflow = "";
    }

    hamburger.addEventListener("click", function () {
        var isOpen = nav.classList.contains("open");
        if (isOpen) {
            closeMobileNav();
        } else {
            openMobileNav();
        }
    });

    
    var form = document.getElementById("contact-form");
    var successMessage = document.getElementById("form-success");

    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    
    function clearErrors() {
        form.querySelectorAll(".error").forEach(function (el) {
            el.classList.remove("error");
        });
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        clearErrors();
        successMessage.textContent = "";

        var nameInput = document.getElementById("name");
        var emailInput = document.getElementById("email");
        var messageInput = document.getElementById("message");
        var hasError = false;

      
        if (nameInput.value.trim() === "") {
            nameInput.classList.add("error");
            hasError = true;
        }

      
        if (
            emailInput.value.trim() === "" ||
            !isValidEmail(emailInput.value.trim())
        ) {
            emailInput.classList.add("error");
            hasError = true;
        }

      
        if (messageInput.value.trim() === "") {
            messageInput.classList.add("error");
            hasError = true;
        }

        if (hasError) return;

      
        var waNumber = "6287778818443";
        var text =
            "Hi Sulfikar! 👋\n\n" +
            "Name: " + nameInput.value.trim() + "\n" +
            "Email: " + emailInput.value.trim() + "\n\n" +
            "Message:\n" + messageInput.value.trim();

        var waUrl =
            "https://wa.me/" + waNumber + "?text=" + encodeURIComponent(text);

        window.open(waUrl, "_blank");

      
        successMessage.textContent =
            "Redirecting to WhatsApp…";
        form.reset();
    });
})();
