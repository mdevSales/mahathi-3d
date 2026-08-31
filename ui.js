// Skills tabs
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".tab-panel");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    panels.forEach((p) => p.classList.remove("active"));
    tab.classList.add("active");
    const target = document.querySelector(`.tab-panel[data-panel="${tab.dataset.tab}"]`);
    if (target) target.classList.add("active");
  });
});

// Mobile nav — hamburger toggles the menu
const navToggle = document.querySelector(".nav-toggle");
const primaryNav = document.getElementById("primary-nav");
function setNav(open) {
  if (!navToggle || !primaryNav) return;
  primaryNav.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}
navToggle?.addEventListener("click", () => setNav(!primaryNav.classList.contains("open")));
primaryNav?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setNav(false)));

// Bookcase — click a spine to open the book in a modal
const modal = document.getElementById("bookModal");
const modalCard = modal?.querySelector(".book-modal-card");
const modalBody = modal?.querySelector(".book-modal-body");

function openBook(spine) {
  const detail = spine.querySelector(".spine-detail");
  if (!detail || !modal) return;
  modalBody.innerHTML = detail.innerHTML;
  // carry the spine's cover colors onto the opened book
  modalCard.style.setProperty("--c1", spine.style.getPropertyValue("--c1"));
  modalCard.style.setProperty("--c2", spine.style.getPropertyValue("--c2"));
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}
function closeBook() {
  if (!modal) return;
  modal.hidden = true;
  document.body.style.overflow = "";
}

document.querySelectorAll(".spine").forEach((spine) => {
  spine.addEventListener("click", () => openBook(spine));
});
modal?.querySelectorAll("[data-close]").forEach((el) => el.addEventListener("click", closeBook));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeBook(); setNav(false); } });

// Reveal sections on scroll
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
