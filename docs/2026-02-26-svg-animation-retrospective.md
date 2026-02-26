# SVG Scroll-Driven Animation Retrospective

Date: 2026-02-26

## Goal

Add scroll-driven animations to 7 SVG diagrams in the "Orchestration Leap" blog post, so that diagram elements reveal progressively as the reader scrolls. Scrolling back up should reverse the animation.

## Approach

Used the **Web Animations API** (`element.animate()`) with paused animations whose `currentTime` is driven by scroll position. This avoids CSS `scroll-timeline` (poor Safari/Firefox support) and works cross-browser.

### Key components:

1. **Scroll progress function**: Maps a figure's vertical position in the viewport to a 0-1 range. At 0 the figure has just entered the bottom of the viewport; at 1 it's near the top.

2. **Animation registry**: A JS object mapping each diagram identifier (e.g., `sac`, `gta`, `ms`) to an array of animation specs. Each spec defines CSS selectors for target elements, WAAPI keyframes, and a `[start, end]` range within the 0-1 scroll progress.

3. **Diagram detection**: Each SVG wraps its content in a `<g class="PREFIX">` element. The JS checks for these wrapper classes to identify which diagram a figure contains.

4. **SVG inlining**: The `figure_svg()` Zola shortcode uses `load_data()` to inline SVG source directly into the HTML, which is necessary for JS to reach internal SVG elements.

5. **SVG namespacing**: Each inlined SVG had all its IDs prefixed (e.g., `shadow` -> `gta-shadow`) and `<style>` selectors scoped under the wrapper class (e.g., `.gta .title` instead of `.title`), to prevent collisions when multiple SVGs coexist on one page.

## What worked

- **WAAPI scroll-driven system**: The core JS architecture worked correctly for the 2 SVGs that were already inlined and namespaced (`single-agent-ceiling` and `orchestrator-evolution`). Animations progressed with scroll and reversed on scroll-up.

- **Build pipeline**: Zola's `figure_svg()` shortcode successfully inlined all 7 SVGs. The build passed cleanly with all namespaced SVGs.

- **Registry pattern**: Having all animation definitions in a single JS registry made it easy to tune timing ranges and add new diagrams.

## What needed refinement

### Animation pacing (fixed, minor)

Initial scroll range was too narrow (70% of viewport height), causing animations to complete too quickly. Widened to 105%, then 135% of viewport height at user's request. This was a straightforward tuning exercise.

### Two diagrams not animating (unresolved)

`three-loops` and `factory-vs-workbench` diagrams showed no animation despite the JS registry containing their specs. Possible causes investigated:

- **Nesting issues**: The `tl-outer`, `tl-middle`, `tl-inner` animation classes might have been on `<g>` elements where WAAPI opacity animations don't propagate as expected in some browsers.
- **Scroll range**: Diagrams near the bottom of the page might not have scroll progress reaching their animation ranges before the page ends.
- **Safari WAAPI + SVG**: Safari may handle `element.animate()` on SVG `<g>` elements differently than on HTML elements.

Root cause was never definitively identified.

### Heading font regression (critical, caused revert)

Inlining SVGs via `figure_svg()` placed their `<style>` blocks directly into the HTML document. Despite scoping selectors under wrapper classes (e.g., `.gta .title`), the page's heading font changed from Merriweather to sans-serif.

The likely mechanism: SVG `<style>` blocks containing rules like `.gta .title { font: bold 19px sans-serif; }` — while these shouldn't match HTML elements (they're scoped under `.gta`), some combination of specificity, the `font` shorthand (which resets `font-family`), or browser SVG-in-HTML style scoping behavior caused the leak.

The two SVGs that were already inlined from a previous session (`single-agent-ceiling`, `orchestrator-evolution`) may have also contributed — their `<style>` blocks used `.title`, `.subtitle` etc. which, if not perfectly scoped, could affect the page.

This was the breaking issue that prompted reverting all SVG and animation changes.

## Decision

Reverted all SVG modifications, animation JS, animation CSS, and markdown shortcode changes. Kept only the unrelated lightbox improvements (overflow handling, background color, dark mode support).

## Stashed work

The full animation experiment is preserved in git stash (`stash-before-restore: animation experiment + lightbox`). It contains:

- Complete WAAPI scroll-driven animation system in `main.js`
- 5 namespaced SVG files (gta, ms, sl, tl, fvw)
- Dark mode CSS overrides for all 7 diagram prefixes
- Markdown with `figure_svg()` shortcode calls

## Lessons for future attempt

1. **SVG style isolation is the hard problem.** Inlining SVGs dumps their `<style>` blocks into the document scope. Options:
   - Strip `<style>` blocks entirely and convert all styling to inline `style=""` attributes before inlining
   - Use Shadow DOM to encapsulate inlined SVGs
   - Use `<iframe>` or `<object>` instead of direct inlining (but then JS can't reach internal elements due to cross-origin restrictions)
   - Prefix ALL class names in SVG styles, not just scope under a parent (e.g., `.gta-title` instead of `.gta .title`)

2. **Test with real page CSS early.** The font regression wasn't caught until multiple SVGs were already inlined. A single-SVG test on the actual page would have revealed the issue sooner.

3. **WAAPI on SVG elements needs browser testing.** The `three-loops` and `factory-vs-workbench` failures suggest that WAAPI's behavior on SVG group elements varies across browsers. Need to verify with minimal test cases in Safari, Chrome, and Firefox before building a full registry.

4. **Consider CSS `@scope`**: The `@scope (.gta) { ... }` rule (supported in Chrome 118+, Safari 17.4+) could properly isolate inlined SVG styles. Check browser support before adopting.
