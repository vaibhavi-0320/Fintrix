# Design System Document: High-End Web3 Editorial

## 1. Overview & Creative North Star: "The Obsidian Lens"
The Creative North Star for this design system is **"The Obsidian Lens."** In the volatile world of Web3, we move away from the "neon-and-grid" clichés toward a sophisticated, editorial aesthetic that feels like a luxury physical gallery. 

This system rejects the "template" look by embracing **Atmospheric Depth**. We do not use lines to define space; we use light and shadow to imply it. Through intentional asymmetry, expansive negative space (using the `20` and `24` spacing tokens), and "General Sans" as a high-contrast typographic anchor, we create a UI that feels curated, not constructed. The goal is to make the user feel they are peering into a deep, premium space where data flows with intentionality.

---

## 2. Colors & Atmospheric Layering
The palette is rooted in pure black (`#000000`), but we use the Material naming convention to manage tonal depth.

*   **Primary Background:** `surface` (#131313) and `surface_container_lowest` (#0e0e0e) for the deepest immersion.
*   **The "No-Line" Rule:** Standard 1px solid borders are strictly prohibited for sectioning. Use `surface_container_low` (#1b1b1b) sections against `surface` (#131313) backgrounds to define boundaries. 
*   **Surface Hierarchy:** 
    *   **Layer 0 (Base):** `surface` (#131313).
    *   **Layer 1 (Cards/Sections):** `surface_container` (#1f1f1f).
    *   **Layer 2 (Elevated Floating):** `surface_container_highest` (#353535) with a `backdrop-blur` of 20px.
*   **Signature Textures:** For primary CTAs, use a linear gradient from `primary` (#ffffff) to `primary_container` (#d4d4d4) to give buttons a "die-cast" metallic feel.

---

## 3. Typography: Editorial Authority
We utilize **General Sans** for its geometric precision and **Manrope/Inter** for functional clarity.

*   **Display (Manrope):** Use `display-lg` (3.5rem) for hero statements. Apply a 20% tracking reduction and a gradient effect (from `primary` to `on_surface_variant`) to create a "shimmer" as the user scrolls.
*   **Headlines (Manrope):** `headline-lg` (2rem) should be used sparingly to break the layout. Use intentional asymmetry—place headlines in the first column of a 12-column grid, leaving the middle empty.
*   **Body (Inter):** All body text must use `on_surface_variant` (#c6c6c6) at 70% opacity for `body-lg` and 60% for `body-md` to ensure a soft, high-end readability that isn't jarring against the black background.
*   **Labels (Inter):** `label-md` (0.75rem) should be all-caps with +10% letter spacing to mimic high-end fashion branding.

---

## 4. Elevation & Depth: Tonal Layering
We do not use drop shadows to create "lift"; we use light.

*   **The Layering Principle:** Depth is achieved by "stacking" surface tiers. An input field should be `surface_container_lowest` carved into a `surface_container` card.
*   **Ambient Glows:** For floating elements, use a shadow with a 64px blur at 4% opacity, using the `primary` (#ffffff) color token. This mimics a soft "light leak" rather than a shadow.
*   **The "Ghost Border":** When structural containment is required for accessibility, use `outline_variant` (#474747) at a 0.6px weight. For high-interactivity components, use a 1px border at 20% opacity.
*   **Glassmorphism:** Navigation bars and floating menus must use `surface_container_highest` at 40% opacity with a `saturate(180%)` and `blur(30px)` filter.

---

## 5. Components

### Navigation (The Refined Bar)
*   **Structure:** Centered pill-shape or full-width with 0.6px `outline_variant` bottom border.
*   **Interactions:** Navigation links use `label-md`. Chevrons next to dropdowns should be 0.5px weight and rotate 180 degrees on hover with a `cubic-bezier(0.4, 0, 0.2, 1)` transition.

### Buttons (Layered Pills)
*   **Primary:** A "full" rounded pill. Background is `primary` (#ffffff). 
*   **The "Glow" Detail:** Add a pseudo-element inner-shadow or a top-edge 1px gradient (White to Transparent) to simulate a light source hitting the top of the button.
*   **Secondary:** Ghost variant with a 0.6px `outline` (#919191) border and `on_surface` text.

### Hero Section (Fullscreen Video)
*   **Overlay:** A `surface_container_lowest` (#0e0e0e) gradient overlay at the bottom 30% of the video to ensure the hero text (centered) remains legible.
*   **Content:** Centered `display-lg` text with a 45-degree linear gradient from `#ffffff` to `#919191`.

### Cards & Lists
*   **Rule:** No dividers. Use `Spacing-8` (2.75rem) to separate list items.
*   **Hover State:** On hover, the background of a card should shift from `surface` to `surface_container_low`.

---

## 6. Do's and Don'ts

### Do:
*   **Use Asymmetry:** Place a small label (label-sm) far to the left of a centered headline to create an editorial "magazine" feel.
*   **Respect the "Pure Black":** Use `#000000` for the absolute background to allow OLED screens to achieve true depth.
*   **Micro-interactions:** Use subtle 2px Y-axis translations on hover for all interactive cards.

### Don't:
*   **No Heavy Borders:** Never use a 100% opaque white border. It breaks the "Obsidian" immersion.
*   **No Standard Grids:** Avoid the "three-column feature row." Instead, try a two-column layout where one side is offset by `Spacing-12`.
*   **No Pure White Body Text:** Avoid 100% opacity white for long-form text; it causes visual "halo" effects on dark backgrounds. Stick to 70% (`on_surface_variant`).