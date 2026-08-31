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

// Bookshelf horizontal scroll arrows
document.querySelectorAll(".shelf-block").forEach((block) => {
  const shelf = block.querySelector(".shelf");
  block.querySelectorAll(".shelf-arrow").forEach((btn) => {
    btn.addEventListener("click", () => {
      const dir = Number(btn.dataset.dir) || 1;
      shelf.scrollBy({ left: dir * 320, behavior: "smooth" });
    });
  });
});

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
