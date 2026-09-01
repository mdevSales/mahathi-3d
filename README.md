# Mahathi Devulapalli — Portfolio

A hand-built, editorial portfolio for a creative technologist. Near-black canvas,
a single violet accent, an interactive **bookcase** where each spine opens to a project,
and a floating "live code" card in the hero. No framework, no build step — just
HTML, CSS, and a little vanilla JavaScript.

**Live:** https://mdevsales.github.io/mahathi-3d/

![Portfolio hero](./me.png)

---

## Why it looks the way it does

This is intentionally **not** a corporate resume or a LinkedIn export. It's meant to feel
immersive, artistic, and memorable — a creative technologist's space. A few principles hold
the whole thing together:

- **One accent, not three.** A single violet (`--accent: #b98bf5`) does all the work —
  links, the one primary CTA, active states, icon highlights. No rainbow gradients.
- **Editorial typography.** Fraunces (an optical display serif) for headlines, Manrope for
  body, IBM Plex Mono for labels, and one poetic beat of Cormorant italic. Type contrast is
  the personality.
- **Restraint + one signature idea.** The bookcase is the memorable hook. Everything else
  stays quiet so it can stand out.
- **Confidentiality by design.** Customer work is shown by *what it does*, never by customer
  name. Illustrative graphics (`caseworker-agent.svg`, `safeguard-demo.svg`) carry a
  "No customer data" caption. No fabricated metrics, no internal codenames, no third-party
  names without consent.

---

## Stack

| Layer      | Choice                                                        |
|------------|---------------------------------------------------------------|
| Markup     | A single `index.html`                                         |
| Styles     | One `style.css` with a small design-token `:root`            |
| Behavior   | `ui.js` — tabs, the bookcase modal, mobile nav, scroll reveal |
| Type       | Google Fonts: Fraunces · Manrope · Cormorant · IBM Plex Mono  |
| Icons      | Inline Lucide monoline SVG (shared `.ico` class)              |
| Graphics   | Hand-authored inline SVG (project mockups)                    |
| Hosting    | GitHub Pages (`master` branch, project site)                  |

No dependencies to install. No bundler. Open the file and it runs.

---

## Project structure

```
.
├── index.html          # all content and structure
├── style.css           # design system + every component
├── ui.js               # tabs, bookcase modal, mobile nav, reveal-on-scroll
├── README.md
├── me.png              # portrait
├── *.svg               # icons + illustrative project graphics
├── *.jpeg              # "Moments" gallery photos
└── .claude/
    └── skills/
        └── portfolio-forge/   # a skill teammates can use to build their own
```

### The sections
Hero → About (with three pillars) → Work (the bookcase) → Experience & certs →
Skills → Community → Moments (photo gallery) → Contact.

### How the bookcase works
Each `.spine` button holds a hidden `<template class="spine-detail">` with its full detail
HTML. Clicking a spine (`ui.js` → `openBook`) injects that template into the modal body and
carries the spine's cover colors (`--c1` / `--c2`) onto the opened card. Escape or a click on
the backdrop closes it.

---

## Run it locally

It's static, so any of these work from the repo root:

```bash
# Python
python3 -m http.server 8000

# or Node
npx serve .
```

Then open `http://localhost:8000`. (Opening `index.html` via `file://` mostly works, but a
local server avoids any path quirks.)

---

## Deploy

Hosted on GitHub Pages from `master`:

```bash
git add -A
git commit -m "Update portfolio"
git push origin master
```

Pages rebuilds automatically. Check status with:

```bash
gh api repos/mdevSales/mahathi-3d/pages --jq '.status'   # -> "built"
```

**Cache-busting:** assets are versioned with a query string (`style.css?v=21`, `ui.js?v=11`).
Bump the number in `index.html` whenever you change CSS or JS, or returning visitors will see
a stale file.

---

## Accessibility & polish notes

- Respects `prefers-reduced-motion` — the drifting backdrop, entrance animations, the floating
  code card, and the blinking caret all switch off.
- Mobile nav is a real hamburger with a full slide-down menu and 44px tap targets.
- The bookcase modal caps its height and scrolls its body on short screens, with a pinned close
  button.

---

## Related: your GitHub profile

Want a GitHub **profile** README (the one that shows at the top of your profile page) that
reads like a person and not a badge wall? This repo ships a Claude skill, **profile-forge**,
that interviews you about your voice, craft, and story, then writes a profile README that's
unmistakably yours.

- The skill: [`.claude/skills/profile-forge/SKILL.md`](./.claude/skills/profile-forge/SKILL.md)
- A worked example (Mahathi's own profile README): [`github-profile/README.md`](./github-profile/README.md)

Tell Claude: *"use the profile-forge skill to help me write my GitHub profile."*

---

Built by Mahathi Devulapalli. The site you're deploying is the same one described above —
yes, the portfolio explains how it was made.
