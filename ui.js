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
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeBook(); });

// Charm bracelet — tap a charm to open a little cert popover
const VERIFY_URL = "https://www.salesforce.com/trailblazer/mdevulapalli2020";
let charmPop = null;
function closeCharm() {
  if (charmPop) { charmPop.remove(); charmPop = null; }
  document.querySelectorAll(".charm.open").forEach((c) => c.classList.remove("open"));
}
document.querySelectorAll(".charm").forEach((charm) => {
  charm.addEventListener("click", (e) => {
    e.stopPropagation();
    const wasOpen = charm.classList.contains("open");
    closeCharm();
    if (wasOpen) return;
    charm.classList.add("open");
    charmPop = document.createElement("div");
    charmPop.className = "charm-pop";
    charmPop.innerHTML =
      `<b>${charm.dataset.title}</b><p>${charm.dataset.blurb}</p>` +
      `<a href="${VERIFY_URL}" target="_blank" rel="noopener">Verify on Trailblazer ↗</a>`;
    document.body.appendChild(charmPop);
    const r = charm.getBoundingClientRect();
    const w = 250;
    let left = r.left + r.width / 2 - w / 2;
    left = Math.max(12, Math.min(left, window.innerWidth - w - 12));
    charmPop.style.left = left + "px";
    charmPop.style.top = r.bottom + 12 + "px";
    charmPop.addEventListener("click", (ev) => ev.stopPropagation());
  });
});
document.addEventListener("click", closeCharm);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeCharm(); });
window.addEventListener("scroll", closeCharm, { passive: true });

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
