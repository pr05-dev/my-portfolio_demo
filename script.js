const navLinks = document.querySelectorAll(".site-nav a");
const sections = document.querySelectorAll("main .section");
const form = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");
const openCertificationsButton = document.getElementById("openCertifications");
const closeCertificationsButton = document.getElementById("closeCertifications");
const certificationModal = document.getElementById("certificationModal");
const rippleLayer = document.getElementById("rippleLayer");
const cursorTrail = document.getElementById("cursorTrail");

let cursorX = window.innerWidth / 2;
let cursorY = window.innerHeight / 2;
let trailX = cursorX;
let trailY = cursorY;
let pointerActive = false;

const setActiveLink = () => {
  let currentSection = "";

  sections.forEach((section) => {
    const top = window.scrollY;
    const offset = section.offsetTop - 140;
    const height = section.offsetHeight;

    if (top >= offset && top < offset + height) {
      currentSection = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${currentSection}`;
    link.classList.toggle("active", isActive);
  });
};

window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);

const openModal = () => {
  certificationModal.classList.remove("hidden");
  certificationModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  certificationModal.classList.add("hidden");
  certificationModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

openCertificationsButton.addEventListener("click", openModal);
closeCertificationsButton.addEventListener("click", closeModal);

certificationModal.addEventListener("click", (event) => {
  if (event.target.dataset.closeModal === "true") {
    closeModal();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !certificationModal.classList.contains("hidden")) {
    closeModal();
  }
});

document.addEventListener("click", (event) => {
  if (event.target.closest(".modal-panel")) {
    return;
  }

  const ripple = document.createElement("span");
  ripple.className = "click-ripple";
  ripple.style.left = `${event.clientX}px`;
  ripple.style.top = `${event.clientY}px`;
  rippleLayer.appendChild(ripple);

  if (rippleLayer.childElementCount > 8) {
    rippleLayer.firstElementChild?.remove();
  }

  window.setTimeout(() => {
    ripple.remove();
  }, 1450);
});

window.addEventListener("mousemove", (event) => {
  cursorX = event.clientX;
  cursorY = event.clientY;

  if (!pointerActive) {
    pointerActive = true;
    cursorTrail.style.opacity = "1";
  }
});

window.addEventListener("mouseleave", () => {
  pointerActive = false;
  cursorTrail.style.opacity = "0";
});

const animateCursorTrail = () => {
  trailX += (cursorX - trailX) * 0.14;
  trailY += (cursorY - trailY) * 0.14;
  cursorTrail.style.transform = `translate3d(${trailX}px, ${trailY}px, 0) translate(-50%, -50%)`;
  window.requestAnimationFrame(animateCursorTrail);
};

window.requestAnimationFrame(animateCursorTrail);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = form.elements.name.value.trim();
  formNote.textContent = `Thank you ${name}. Your message is noted successfully.`;
  form.reset();
});
