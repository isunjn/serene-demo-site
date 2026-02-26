# Visual Style Guide

## Context

Establishing a visual language for the site's diagrams that is both agent-friendly (Claude can produce it reliably from a prompt) and aligned with the author's preferences. 20 SVGs exist. The patterns below are extracted from what's worked.

## What agents produce well

SVG diagrams with:
- **Geometric primitives**: rounded rects, circles, lines, polylines — no freehand curves or illustration
- **Explicit coordinates**: agents work best with absolute positioning via `transform="translate(x,y)"`, not relative layout
- **Consistent spacing**: grid-aligned elements, deliberate whitespace
- **Text as data**: labels, titles, annotations — not decorative typography
- **Flat color with subtle depth**: solid fills + light drop shadows, no gradients on shapes (only on backgrounds)

What agents struggle with:
- Organic illustration, human figures (the stick figures in gate-vs-ladder were removed for this reason)
- Complex bezier paths (L-shaped polylines worked better than curved arrows)
- Layout that requires visual balancing by eye — explicit coordinate systems work better
- Decorative elements that don't carry information

## The established aesthetic

**Feel**: Clean, academic, slightly editorial. Closer to a well-typeset textbook diagram than an infographic. Information-dense but not cluttered. Generous whitespace.

**Palette**: Okabe-Ito colorblind-safe (see SVG thread for full table). Key principle: color carries meaning, not decoration. Blue = structural/intellectual, orange/red = critique/warning, green = positive/growth, amber = secondary/economic.

**Typography**: System sans-serif throughout SVGs. Sizes: 17-19px titles, 10-12px body, 8-10px annotations. Bold for emphasis, italic for academic terms and subtitles. Text anchored to center where possible.

**Backgrounds**: Subtle vertical gradient (`#f7f9fc` → `#ebeef4`). White card panels with `#e0e0e0` borders and light drop shadows for content groupings.

**Lines**: `#999-#ddd` for structural axes. `#D55E00` with arrowhead markers for directional flow. Dashed lines (`stroke-dasharray`) for conceptual connections, zones, and de-emphasized boundaries.

## Diagram archetypes that work

1. **Two-panel comparison** (gate-vs-ladder): Side-by-side panels with a dashed divider. Each panel has a title, a central visual, and trait labels below. Good for before/after, this-vs-that.

2. **Cycle/feedback loop** (taste-machine): Nodes at cardinal positions connected by L-shaped arrows. Center label for the driving concept. Good for self-reinforcing mechanisms.

3. **Annotated coordinate space** (bourdieu-social-space): Two axes with labeled endpoints. Content positioned in the resulting quadrants. Annotations (dashed zones, connecting lines) overlay the space. Good for mapping relationships between two dimensions.

4. **Vertical flow/stack** (single-agent-ceiling, orchestrator-evolution): Elements stacked or layered vertically with flow arrows. Good for hierarchies, pipelines, progression.

5. **Causal chain** (contagion-cascade, causal-chain): Horizontal sequence of cause → effect with arrows. Good for explaining mechanisms.

## Prompting pattern for new SVGs

When asking an agent to create a diagram, provide:
1. **Archetype** from the list above
2. **Content**: exact labels, titles, descriptions
3. **Palette assignment**: which concept maps to which color
4. **Namespace prefix** for the SVG (e.g., `tm` for taste-machine)
5. **ViewBox dimensions** (typically 700-880 wide, 380-540 tall)
6. Reference an existing SVG by name for structural precedent

Example prompt shape: "Create a two-panel comparison SVG (like gate-vs-ladder). Left panel: [concept A] with [visual]. Right panel: [concept B] with [visual]. Use prefix `xyz`. Blue for A, green for B. 880×400 viewBox."

## Open questions

- Should there be a dark mode variant strategy? Currently the site has dark mode but SVGs use fixed light backgrounds.
- Is there a case for a shared SVG component library (common defs, shared styles) vs fully self-contained SVGs?
- Photo selection criteria: what makes a photo work alongside the diagrammatic SVGs? The craftsman-hands JPEG works because it's warm, textured, and human against the clean geometry. Is that the rule?
