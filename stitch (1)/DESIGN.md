# Design System Specification: Technical Precision & Industrial Elegance

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Precision Monolith."** 

Aluminum welding is an intersection of raw industrial strength and extreme molecular accuracy. This design system moves away from "web-standard" templates by adopting a high-end editorial aesthetic that mirrors the characteristics of machined metal: weighted, polished, and structurally impeccable. 

We break the traditional "boxed" web layout by utilizing **Intentional Asymmetry** and **Tonal Depth**. Instead of separating content with lines, we use the weight of typography and the shifting "temperatures" of gray to guide the eye. The interface should feel like a high-end technical blueprint—clean, authoritative, and sophisticated.

---

## 2. Colors: The Metallic Spectrum
The palette is rooted in the industrial reality of aluminum fabrication: deep oxides, raw silver finishes, and the high-heat glow of the welding arc (`primary`).

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to define sections. Layout boundaries must be established solely through background color shifts. For instance, a `surface-container-low` (`#f6f3f2`) section should sit directly against a `surface` (`#fcf9f8`) background. This creates a "milled" look rather than a "printed" look.

### Surface Hierarchy & Nesting
Treat the UI as a physical assembly of stacked materials. 
- **Base Layer:** `surface` (#fcf9f8) for the main canvas.
- **Structural Insets:** Use `surface-container-high` (#eae7e7) for recessed areas like sidebars or technical spec sheets.
- **Floating Precision:** Use `surface-container-lowest` (#ffffff) for high-priority cards to make them "pop" against the industrial gray backgrounds.

### The "Glass & Gradient" Rule
To evoke the "High-Quality Finish" of aluminum, use Glassmorphism for floating navigation bars or technical overlays. Combine `surface` at 80% opacity with a `backdrop-blur` of 12px. 
- **Signature Texture:** Apply a subtle linear gradient to main CTAs (from `primary` #a92f32 to `primary-container` #ca4748) at a 135-degree angle to mimic the sheen of anodized metal.

---

## 3. Typography: Editorial Authority
We utilize a high-contrast scale to emphasize technical precision.

*   **Display & Headlines (Space Grotesk):** This font provides a "machined" feel. Use `display-lg` (3.5rem) with tight letter-spacing (-0.02em) for hero sections to create a bold, monolithic presence.
*   **Body & Labels (Inter):** Inter provides the "legible sans-serif" requirement. It acts as the functional "fine print" of the system.
*   **The Hierarchy Strategy:** Use `label-sm` (uppercase, tracked out to 0.1em) for technical categories. Contrast this against `headline-md` for product names. This creates an editorial rhythm that feels premium and intentional.

---

## 4. Elevation & Depth
In this design system, depth is a result of material density, not artificial shadows.

*   **The Layering Principle:** Achieve hierarchy by "stacking" tones. A `surface-container-lowest` card placed on a `surface-dim` background creates a natural focal point without a single drop shadow.
*   **Ambient Shadows:** Where floating elements (like Modals) are required, use "Industrial Ambient" shadows: `box-shadow: 0 20px 40px rgba(27, 27, 27, 0.06)`. The shadow must be low-opacity and highly diffused to mimic natural workshop lighting.
*   **The "Ghost Border" Fallback:** If a divider is mandatory for accessibility, use the `outline-variant` (#dfbfbd) at 15% opacity. Never use 100% opaque lines.
*   **Glassmorphism:** Use semi-transparent `surface-variant` containers for hovering tooltips to allow the industrial photography beneath to bleed through, maintaining a sense of spatial depth.

---

## 5. Components: Machined Elements

### Buttons
- **Primary:** Anodized finish. Gradient from `primary` to `primary-container`. `radius-sm` (0.125rem) to maintain a sharp, industrial edge.
- **Secondary:** Tonal integration. `surface-container-highest` background with `on-surface` text. No border.
- **Tertiary:** Text-only. `label-md` styling with a 2px `primary` underline that appears only on hover.

### Input Fields
- **Base:** `surface-container-low` background. 
- **State:** No border on idle. On focus, a 2px "Ghost Border" of `primary` at 40% opacity appears.
- **Labels:** Always use `label-sm` in `secondary` color, positioned 0.5rem above the field.

### Cards & Lists
- **The Divider Ban:** Strictly forbid `hr` lines. Use `spacing-8` (2rem) of vertical whitespace to separate list items, or alternate background colors between `surface` and `surface-container-low`.
- **Industrial Chips:** Small, `radius-none` or `radius-sm` containers using `secondary-container` for technical tags (e.g., "ISO 9001", "TIG WELDED").

### Specific Components: "Technical Spec Overlay"
For a manufacturer like Aluon, create a custom "Spec Grid" component: a 2-column layout with `label-md` on the left (low opacity) and `title-sm` on the right (high contrast), separated by a subtle `surface-variant` background shift every other row.

---

## 6. Do's and Don'ts

### Do:
- **Do** use generous whitespace (`spacing-16` and `spacing-20`) to let the high-quality aluminum finishes in photography breathe.
- **Do** use `primary` (#a92f32) sparingly as a "technical highlight"—save it for critical CTAs or status indicators.
- **Do** align everything to a strict 4px grid to mirror the precision of welding tolerances.

### Don't:
- **Don't** use rounded corners above `radius-md` (0.375rem). Rounded "bubbly" UI contradicts the robust industrial nature of the brand.
- **Don't** use pure black (#000000). Use `on-surface` (#1b1b1b) to maintain a sophisticated metallic tone.
- **Don't** use standard "Drop Shadows." If an element needs to feel elevated, use tonal contrast first.

---

## 7. Token Reference Summary

| Token | Value | Usage |
| :--- | :--- | :--- |
| **Primary Accent** | `#a92f32` | The "Heat": CTAs, critical alerts, active states. |
| **Base Surface** | `#fcf9f8` | The "Clean Room": Primary background. |
| **Industrial Gray** | `#605b77` | The "Raw Metal": Secondary text and icons. |
| **Sharp Radius** | `0.125rem` | Standard for buttons and inputs (Technical). |
| **Soft Radius** | `0.5rem` | Max radius for large cards or image containers. |