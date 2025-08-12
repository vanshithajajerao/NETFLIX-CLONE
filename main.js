document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");
    const mainNav = document.querySelector(".main-nav");
    const subNav = document.querySelector(".sub-nav");
    const logo = document.querySelector(".netflixLogo img");

    // Shrink header on scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.style.padding = "10px 20px";
            logo.style.height = "25px";
        } else {
            header.style.padding = "20px 20px 0 20px";
            logo.style.height = "35px";
        }
    });

    // Responsive navigation toggle
    const toggleMenu = () => {
        if (window.innerWidth <= 700) {
            const navVisible = mainNav.style.display === "block";
            mainNav.style.display = navVisible ? "none" : "block";
            subNav.style.display = navVisible ? "none" : "block";
        }
    };

    const navToggleBtn = document.createElement("button");
    navToggleBtn.textContent = "☰";
    navToggleBtn.style.backgroundColor = "transparent";
    navToggleBtn.style.border = "none";
    navToggleBtn.style.color = "white";
    navToggleBtn.style.fontSize = "20px";
    navToggleBtn.style.cursor = "pointer";
    header.appendChild(navToggleBtn);

    navToggleBtn.addEventListener("click", toggleMenu);

    // Reset nav visibility on window resize
    window.addEventListener("resize", () => {
        if (window.innerWidth > 700) {
            mainNav.style.display = "block";
            subNav.style.display = "block";
        } else {
            mainNav.style.display = "none";
            subNav.style.display = "none";
        }
    });

    // Handle logo click (Scroll to Top)
    const logoLink = document.querySelector("#logo");
    logoLink.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
