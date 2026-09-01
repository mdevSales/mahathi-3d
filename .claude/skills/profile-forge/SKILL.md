---
name: profile-forge
description: >
  Write a distinctive GitHub PROFILE README (the special <username>/<username> repo that
  renders at the top of a person's GitHub profile) that is unmistakably THEIRS — driven by
  their voice, craft, and story, not a badge-soup template. Use when a Solutions/Sales
  Engineer or any technologist says "help me with my GitHub profile," "write my profile
  README," or "make my GitHub not look generic." Bakes in customer-confidentiality discipline.
---

# Profile Forge

You help a colleague craft the README that shows at the top of their GitHub profile page.
This is the `<username>/<username>` repo (e.g. `janedoe/janedoe`) with a `README.md` at its
root — GitHub renders it as a banner on `github.com/<username>`.

Most SE/technologist profiles look identical: a wave emoji, "tech stack" icon rows, a wall of
shields.io badges, and auto-generated stats cards. **Your job is the opposite of that.** Make
one that reads like the person — their voice, what they actually care about, what they build.

If two people run this skill, the results should feel authored by two different people.

---

## Prime directive: it should sound like them, not like a template

A great profile README has **a voice and a point of view.** Before writing anything, understand
who they are. Never skip the interview. Never default to badge rows and stats cards as the
*substance* — at most they're seasoning, and often they're skippable.

---

## Step 1 — Interview first (always)

Ask in small, conversational batches (2–4 questions). Mine for voice and specifics, not a form.

**Voice & identity**
- What's your role, and what do you actually do that you're proud of? (past the title)
- If a teammate described you in one line, what would they say?
- What's the throughline across your work and the rest of your life?
- How should the writing sound — plainspoken, warm, dry/witty, poetic, irreverent?

**Substance**
- What have you built or shipped that mattered? (we describe *what it does*, never client names)
- What are you genuinely deep in vs. competent vs. learning right now?
- Anything public worth linking — a portfolio, blog/Substack, talks, OSS repos, LinkedIn?
- Certifications / recognition / community roles worth a mention (lightly)?

**Personality**
- A hobby or obsession most colleagues don't know about?
- What do you want someone to *do* after reading — connect, read your writing, see your work?

**Practical**
- Confirm the exact GitHub username (the repo must match it exactly, case-insensitive).
- Anything off-limits (employer rules, topics, names)?

Then play back a 3–4 line "voice + content brief" and get a thumbs-up before writing.

---

## Step 2 — Pick a structure that fits them

Choose a shape from their answers. A few patterns (invent your own; don't just pick one):

- **The short manifesto** — 3–5 sentences of real point of view, then a couple of links. Best
  for strong writers / storytellers. Minimal, confident, very memorable.
- **The field notes** — a few labeled lines ("Building:", "Thinking about:", "Off the clock:")
  in a personal voice. Warm and human.
- **The terminal / README-as-code** — a fenced code block styled like a config file or shell
  session, for CLI-brained people. Do it once, keep it clean, don't overdo the gimmick.
- **The editorial bio** — a tight lede paragraph + a small "what I work on" list + links.
  Professional but with personality.

**One concept, committed.** Not a manifesto *and* a terminal *and* badge rows.

---

## Step 3 — Write it

Cover, in their voice:

1. **A hook line** — who they are as a *person/practitioner*, not their job title. This is the
   most important sentence. Make it specific and true, not "passionate about technology."
2. **What they work on** — a few concrete lines. For an SE: the kind of problems they solve and
   the tools they reach for, described by capability, not customer.
3. **A human beat** — the hobby/throughline that makes them a person.
4. **Links with intent** — portfolio, writing, LinkedIn, talks. Only what they want traffic to.
5. **A warm close / invitation** — what to do next (connect, read, collaborate).

**Formatting for GitHub-flavored Markdown:**
- GitHub renders GFM. Emoji shortcodes, tables, task lists, and collapsible `<details>` all work.
  Most raw HTML/CSS is stripped or ignored, and `<script>` never runs — so the design lives in
  *words, structure, and restraint*, not styling.
- A single tasteful cover image or GIF is fine (host it in the repo). Alt text always.
- Headings, a rule or two, short paragraphs, generous whitespace. Let it breathe.
- Keep it scannable — a profile README earns ~10 seconds. Front-load the best line.

---

## Step 4 — Confidentiality discipline (critical for SEs)

Enforced, not optional:

- **Never name customers.** Describe work by what it does, not who it was for.
- **Never fabricate metrics, outcomes, or recognition.** If they didn't say it, don't write it.
- **No third-party colleague names** without consent. No internal project codenames.
- **No confidential screenshots.** If a visual is wanted, use something anonymized and generic.
- When unsure, ask — then default to less.

---

## Step 5 — Ship it

1. Create the repo named **exactly** their username (`<username>/<username>`), public, with a README.
   ```bash
   gh repo create <username>/<username> --public --add-readme
   ```
2. Put the content in `README.md`, commit, push to the default branch.
   ```bash
   git add README.md && git commit -m "Add profile README" && git push
   ```
3. Open `github.com/<username>` and confirm the banner renders. Check it on mobile too.
4. If they added an image, confirm it loads (use a repo-relative or raw GitHub URL).

---

## Anti-patterns to refuse

- Shields.io badge walls and long "tech stack" icon rows as the *substance* of the profile.
- The default `👋 Hi, I'm X` template. Auto-stats cards presented as personality.
- Buzzword soup ("passionate, results-driven, synergy") with no point of view.
- Trying to style it with CSS/HTML that GitHub will strip. Design with words instead.
- Inventing achievements. Naming a customer or showing a real customer screen.

## What "done well" looks like

Someone reads it in ten seconds and comes away knowing who this person *is* and why they'd want
to follow their work — and it could not be mistaken for anyone else's profile. Nothing on it
would make their employer or customers uncomfortable.
