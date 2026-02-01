# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal blog/portfolio website built with Zola (v0.21.0), a static site generator written in Rust. The site uses a customized version of the Serene theme (managed as a git submodule) and is deployed on Netlify.

## Build & Development Commands

```bash
# Build the site (outputs to public/ directory)
zola build

# Start development server with live reload
zola serve

# Deploy (handled automatically by Netlify on push to main)
# Netlify runs: zola build
```

## Architecture & Structure

### Content Organization

The site has three main content sections, each with different rendering behavior:

1. **Posts** (`content/posts/`): Traditional blog posts rendered as a simple list
   - Uses `blog.html` template for the section listing
   - Individual posts use `post.html` template
   - Not categorized by default
   - Sorted by date (newest first)

2. **TIL (Today I Learned)** (`content/til/`): Short learnings rendered as collapsible details
   - Uses custom `til.html` template with `<details>` elements for compact display
   - Paginated (5 items per page)
   - Individual items can expand/collapse inline

3. **About** (`content/about/`): Static prose pages
   - Uses `prose.html` template for rich content formatting

### Theme Architecture

The theme is managed as a git submodule at `themes/serene/`:
- Base templates live in `themes/serene/templates/`
- Custom template overrides exist at root level `templates/` (e.g., `blog.html`, `til.html`)
- Template overrides take precedence over theme defaults

Key template concepts:
- Templates extend `serene/templates/_base.html`
- Custom partials like `_section_title.html` and `_giscus_script.html` can be overridden at root level
- The theme uses Tera templating engine

### Data Collections

Collections are stored as TOML files in `content/collections/`:
- `projects.toml`, `skills.toml`, `books.toml`, etc.
- Rendered via the `collection` shortcode in markdown files
- Each collection entry typically has: name, desc, tags, and optional links/img fields

### Static Assets

- **Location**: `static/` directory
- **Resume PDF**: `static/bharat-agarwal-2025-v6.pdf` (linked from nav)
- **Syntax highlighting**: Custom theme CSS at `static/hl-light.css` and `static/hl-dark.css`
- **Avatar**: `static/me.png`

### Configuration (`config.toml`)

Critical configuration patterns:
- Base URL: `https://bharatagarwal.io`
- Theme: `serene` (git submodule)
- Custom syntax highlighting themes defined in `[markdown]` section
  - References `themes/serene/highlight_themes` for theme definitions
  - Generates separate `hl-light.css` and `hl-dark.css` files
- Navigation sections defined in `[extra.sections]` array
- Taxonomies: tags and categories (though categories not actively used in posts)

### Template Customization Pattern

When customizing the Serene theme:
1. Check if a template exists in `themes/serene/templates/`
2. Copy it to root `templates/` directory with same name
3. Modify the copied version (it will override the theme version)
4. Example: `blog.html` and `til.html` are customized overrides

### Content File Structure

All content files use TOML frontmatter (between `+++` markers):
```toml
+++
title = "Page Title"
template = "template-name.html"
[extra]
# Custom variables here
+++

Content goes here...
```

## Theme Submodule Management

```bash
# Update theme to latest commit
cd themes/serene
git pull origin main
cd ../..
git add themes/serene
git commit -m "Update Serene theme"

# Initialize submodule (for fresh clones)
git submodule update --init --recursive
```

## Important Notes

- The `public/` directory is generated (git-ignored) and should never be edited directly
- Netlify build uses Zola v0.21.0 specifically (configured in `netlify.toml`)
- Syntax highlighting is set to generate CSS mode, not inline styles
- External links are configured to open in new tab with `no-follow` and `no-referrer`
- Search index is built but feeds are disabled (`generate_feeds = false`)
