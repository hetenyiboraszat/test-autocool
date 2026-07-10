document.addEventListener("DOMContentLoaded", () => {
  // --- Mobile Menu Toggle ---
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  const toggleMenu = () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  };

  hamburger.addEventListener("click", toggleMenu);

  // Close menu when a link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("active")) {
        toggleMenu();
      }
    });
  });

  // --- Dynamic Active Navigation Highlighting ---
  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      // Checks if user has scrolled past 1/3rd of the section height
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(currentSection)) {
        link.classList.add("active");
      }
    });
  });

  // --- Contact Form Submission Handling ---
  const form = document.getElementById("appointment-form");
  const successMsg = document.getElementById("form-success");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Stop standard form submission reload

    // 1. Automatically bundle all the inputs (including our explicit hidden field)
    const formData = new FormData(form);

    // 2. Post the data quietly to Netlify backend via AJAX URL encoding
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        // UI Transition only runs when the network request yields a real response
        form.style.display = "none";
        successMsg.classList.remove("hidden");
        console.log("Form data successfully delivered to Netlify database!");
      })
      .catch((error) => {
        console.error("Netlify submission error:", error);
        alert("Something went wrong. Please try again!");
      });
  });
});