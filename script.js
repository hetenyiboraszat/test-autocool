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

    // 1. Automatically grab all the form data inputs
    const formData = new FormData(form);

    // 2. Netlify requires us to pass the form's name in the payload
    formData.append("form-name", "appointment");

    // 3. Post the data quietly to Netlify in the background
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        // UI Transition to show success state once Netlify confirms receipt
        form.style.display = "none";
        successMsg.classList.remove("hidden");
      })
      .catch((error) => {
        console.error("Netlify submission error:", error);
        alert("Something went wrong. Please try again!");
      });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Stop standard form submission reload

    // Capture data values if needed later for backend integration
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      service: document.getElementById("service").value,
      message: document.getElementById("message").value,
    };

    // UI Transition to show success state
    form.style.display = "none";
    successMsg.classList.remove("hidden");

    // Optional console test log
    console.log("Form Submitted Successfully:", formData);
  });
});
