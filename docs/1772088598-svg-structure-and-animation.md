# SVG Structure and Animation

## Context

20 hand-crafted SVGs across three blog posts (ai-wins: 10, orchestration-leap: 7, stop-calling-it-taste: 3). All authored in this repo, not imported. One failed attempt at scroll-driven animation. This thread consolidates what we know and what's worth pursuing.

## SVG anatomy (established pattern)

Every diagram follows the same structure:

```xml
<svg viewBox="0 0 W H" xmlns="http://www.w3.org/2000/svg"
     role="img" aria-labelledby="prefix-title prefix-desc">
  <title id="prefix-title">...</title>
  <desc id="prefix-desc">...</desc>

  <defs>
    <filter id="prefix-shadow">...</filter>
    <linearGradient id="prefix-bg">...</linearGradient>
    <marker id="prefix-arrow">...</marker>  <!-- if arrows needed -->
    <style>
      .prefix .class { ... }
    </style>
  </defs>

  <g class="prefix">
    <rect width="W" height="H" fill="url(#prefix-bg)"/>
    <!-- content -->
  </g>
</svg>
```

Key conventions:
- **Namespace prefix** on all IDs and class scopes (e.g., `bs-shadow`, `.bs .title`) to prevent collisions when multiple SVGs coexist
- **Accessibility**: `role="img"`, `aria-labelledby` pointing to `<title>` and `<desc>`, `aria-label` on semantic groups
- **Background**: linear gradient from `#f7f9fc` to `#ebeef4`
- **Drop shadows**: `feGaussianBlur` filter — apply to `<rect>` elements only, NOT to `<g>` elements (rasterizes text, causes fuzziness)
- **Fonts**: `sans-serif` throughout, no web font dependencies
- **No external references**: everything self-contained

## Color palette

Consistent across all 20 SVGs. Based on the Okabe-Ito colorblind-safe palette:

| Color     | Hex       | Usage                              |
|-----------|-----------|------------------------------------|
| Blue      | `#0072B2` | Primary, intellectual, structural  |
| Orange    | `#D55E00` | Warning, critique, gates           |
| Amber     | `#E69F00` | Secondary, economic, warm          |
| Green     | `#009E73` | Positive, growth, earned           |
| Pink      | `#CC79A7` | Tertiary, exclusion                |
| Sky blue  | `#56B4E9` | Highlight, aspiration              |
| Text dark | `#1a1a1a` | Titles                             |
| Text mid  | `#555-#666` | Body, subtitles                  |
| Text light| `#888-#aaa` | Annotations, ghost labels        |
| Axis/line | `#999-#ddd` | Structural lines, dividers       |

## Animation retrospective (scroll-driven, reverted)

**What was attempted**: WAAPI scroll-driven animations on 7 orchestration-leap SVGs. Paused animations with `currentTime` driven by scroll position. Worked for 2 SVGs, failed for 2 others, then a CSS style leak from inlined SVG `<style>` blocks broke page heading fonts. All reverted.

**The hard problem**: SVG style isolation. Inlining SVGs (necessary for JS to reach internal elements) dumps their `<style>` blocks into document scope. Even scoped selectors (`.gta .title`) leaked.

**Stashed work**: Full animation experiment preserved in git stash (`stash-before-restore: animation experiment + lightbox`).

**Viable paths forward**:
1. **Strip `<style>`, convert to inline `style=""` attributes** before inlining — eliminates the leak entirely
2. **CSS `@scope`** — `@scope (.prefix) { ... }` provides true isolation (Chrome 118+, Safari 17.4+)
3. **Prefix all class names** — `.gta-title` instead of `.gta .title` — no scoping needed
4. **Shadow DOM encapsulation** — cleanest isolation but more complex JS setup

**WAAPI on SVG elements**: Opacity animations on `<g>` elements may not work consistently across browsers. Needs minimal test cases in Safari/Chrome/Firefox before building a full registry.

**What's worth animating**: Progressive reveal (fade-in + translateY on groups) is the highest-value, lowest-risk animation. The orchestration-leap diagrams have natural sequential narratives that benefit from scroll-driven reveal. The taste-machine feedback loop could animate its cycle. Gate-vs-ladder could reveal panels sequentially.

## Open questions

- Is scroll-driven animation worth the engineering cost, or are the static SVGs already effective?
- Should the site move to a single shared `<style>` block for SVG classes, rather than per-SVG `<defs>` styles?
- Could a build-time SVG preprocessor (Zola shortcode + regex) handle the style-to-inline-attribute conversion automatically?
