# Brand Building Skills

This repo is two things:

1. **`skills/home-service-brand-machine/`** — the portable operating system
   (a Claude Code skill) for building high-converting home-service brands:
   design system, capture funnel, copy frameworks, creative factory, local
   SEO, lead economics. When working on ANY brand/website/funnel task in this
   repo, read that skill's SKILL.md first and follow it.

2. **`glacier-site/`** — the reference build (callglacier.com, Glacier
   Heating & Air, San Antonio) that every law in the skill shipped on.
   Its own AGENTS.md applies when working inside it. Deploys from the
   `gh-pages` worktree; source commits on the development branch.

## Using the skill from another project or session

- Plugin install (any Claude Code session):
  `/plugin marketplace add carsoncodingbot-cloud/Brand-building-skills`
  then `/plugin install home-service-brand-machine@carson-brand-skills`
- Or copy `skills/home-service-brand-machine/` into the other project's
  `.claude/skills/` directory.
- Or save the packaged `.skill` file to your profile (works across claude.ai
  and Claude Code sessions).

The skill is the single source of law. When a law changes in practice,
update the skill — not just the site.
