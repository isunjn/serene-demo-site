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
- **Zola version**: Pinned to v0.21.0 in both `.mise.toml` (local) and `netlify.toml` (deploy). The v0.22+ config format is incompatible — don't upgrade without migrating `config.toml`.
- **Highlight themes**: Custom CSS-based highlighting configured in `config.toml` — themes live in `themes/serene/highlight_themes/`.
- **TOML frontmatter**: Posts use `+++` delimiters (TOML), not `---` (YAML).
- **Collections are data-driven**: Each collection (books, projects, etc.) is a `.toml` file in `content/collections/`, not individual markdown files.
