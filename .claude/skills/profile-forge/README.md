# profile-forge

A Claude Code skill that writes a **GitHub profile README** — the special
`<username>/<username>` repo that renders as a banner at the top of a person's GitHub
profile — that is unmistakably *theirs*, driven by their voice and story rather than a
badge-soup template.

## The problem it solves

Most Solutions/Sales Engineer GitHub profiles look identical: a wave emoji, a wall of
shields.io badges, "tech stack" icon rows, and auto-generated stats cards. They're
interchangeable and forgettable. profile-forge does the opposite — it produces a profile
that reads like the person, so if two teammates run it, the results feel authored by two
different people.

Crucially for SEs, it **bakes in customer-confidentiality discipline** so nobody
accidentally publishes something that makes an employer or customer uncomfortable.

## How it works

1. **Interview first (always).** Asks in small conversational batches about voice, identity,
   what they've actually built, what they're deep in vs. learning, hobbies, and what they
   want a reader to *do* next. Then plays back a short "voice + content brief" for a
   thumbs-up before writing.
2. **Picks a structure that fits them** — short manifesto, field notes, terminal/README-as-code,
   or editorial bio. One concept, committed — never a mashup of all four.
3. **Writes it** — a specific hook line (who they are as a practitioner, not a job title),
   what they work on described by *capability not customer*, a human beat, links with intent,
   and a warm close.
4. **Enforces confidentiality** — never names customers, never fabricates metrics or
   recognition, no third-party names without consent, no internal codenames, no confidential
   screenshots. When unsure, ask, then default to less.
5. **Ships it** — creates the `<username>/<username>` public repo, commits the README, and
   confirms the banner renders (including on mobile).

## Anti-patterns it refuses

- Shields.io badge walls and tech-stack icon rows as the *substance* of a profile
- The default `👋 Hi, I'm X` template and auto-stats cards presented as personality
- Buzzword soup ("passionate, results-driven, synergy") with no point of view
- Styling with HTML/CSS that GitHub strips — the design lives in words, structure, restraint
- Inventing achievements, or showing a real customer name/screen

## How to use it

Tell Claude Code:

> Use the profile-forge skill to help me write my GitHub profile README. Interview me about
> my voice, what I actually build, and what I care about — then write a README that sounds
> like me, not a badge template. Enforce customer confidentiality throughout.

The skill lives at `.claude/skills/profile-forge/SKILL.md`. A worked example (a finished
profile README) is included alongside it.

## What "done well" looks like

Someone reads the finished profile in ten seconds and comes away knowing who this person *is*
and why they'd want to follow their work — and it could not be mistaken for anyone else's.
Nothing on it would make their employer or customers uncomfortable.
