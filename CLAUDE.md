# Personal Site — bharatagarwal.io

## Stack
- Zola v0.21.0 (pinned via `mise` — see `.mise.toml`)
- `serene` theme (inlined at `themes/serene/`, forked from bharatagarwal/serene)
- Deployed on Netlify

## Commands
```bash
zola serve          # Dev server with hot reload (http://127.0.0.1:1111)
zola build          # Build to public/
zola check          # Validate links and config
```

## Content Structure
- `content/posts/` — Blog posts (markdown + TOML frontmatter `+++`)
- `content/til/` — Today I Learned snippets
- `content/about/` — About page
- `content/resume/` — Resume data (TOML: education, work-experience)
- `content/collections/` — Structured data as TOML (books, projects, skills, etc.)
- `static/` — Static assets (images, PDFs, highlight CSS)

## Theme
The `serene` theme lives directly in `themes/serene/` (no submodule).
- Originally forked from https://github.com/bharatagarwal/serene

## Gotchas
- **Zola version**: Pinned to v0.21.0 via `.mise.toml` (Netlify also picks this up). Deliberately staying on 0.21 — upgrading to 0.22+ requires migrating `config.toml` (highlighting fields move under `[markdown.highlighting]`) and updating 3 template files (`post.html`, `home.html`, `prose.html`). Low benefit for the effort.
- **Highlight themes**: Custom CSS-based highlighting configured in `config.toml` — themes live in `themes/serene/highlight_themes/`.
- **TOML frontmatter**: Posts use `+++` delimiters (TOML), not `---` (YAML).
- **Collections are data-driven**: Each collection (books, projects, etc.) is a `.toml` file in `content/collections/`, not individual markdown files.

## Issue Tracking

This project uses **bd (beads)** for issue tracking.
Run `bd prime` for workflow context, or install hooks (`bd hooks install`) for auto-injection.

**Quick reference:**
- `bd ready` - Find unblocked work
- `bd create "Title" --type task --priority 2` - Create issue
- `bd close <id>` - Complete work
- `bd sync` - Sync with git (run at session end)

**Coaching:** Actively coach me on idiomatic beads usage. When I do something manually that beads has a built-in workflow for (e.g. hand-wiring dependencies vs. formulas/swarm, creating tasks ad-hoc vs. using molecules), pause and show me the idiomatic way before proceeding. Always check Context7 (`/steveyegge/beads`) for beads documentation before suggesting the idiomatic approach.

## Agent Preferences

- **No agents.** Do not use the Task tool (neither foreground nor background). Work directly in the main conversation, collaborating with the user step by step. Tackle tasks one at a time.
