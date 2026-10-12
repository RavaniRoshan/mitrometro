# DESIGN.md: tines.com

## Source
- URL: https://www.tines.com/
- Capture date: 2026-10-12
- Evidence: live DOM (browser-act session `metroresolve-qa`), full-page screenshot, computed-style token dump

## Design Tokens (extracted from live DOM)

### Colors (sRGB hex, converted from display-p3 via canvas readback)
| Token | Hex | Role |
|---|---|---|
| cream | `#FCF9F5` | page background, text on purple |
| ink | `#101010` | near-black text, logo strip |
| purpleMain | `#714BD0` | primary headline + brand color |
| purpleDeep | `#542F9C` | primary button background |
| purpleCard | `#6741BF` | filled feature cards |
| purpleDark | `#4A288A` | dark accents / footer text |
| lavender | `#ECE8FD` | secondary button bg, light fills |
| green | `#007F4A` | positive accent |
| teal | `#008784` | accent |
| orange | `#C05100` | accent |
| blue | `#3565CC` | accent |
| sage | `#CAE4D4` | soft fill |

### Typography
- **Roobert** (sans, weight 400 for headings) → fallback `system-ui, Arial, sans-serif`
- **Reckless** (serif, weight 400/700) → fallback `Georgia, 'Times New Roman', serif`
- **Roobert Mono** (mono, 700 uppercase for eyebrows/buttons) → fallback `ui-monospace, Menlo, monospace`
- H1: 64px / 1.05 / -1.92px tracking / weight 400, color purpleMain
- H2 big: 56px / 1.05 / -1.68px
- H2 serif: 52px / 1.10 / -1.56px (Reckless)
- H3: 24px / 1.10 / -0.24px / weight 700 (Reckless)
- Eyebrow: mono, 13px, uppercase, weight 700

### Layout
- Container max-width **1520px**, horizontal padding **40px**
- Narrow reading column **832px**
- Card radius **12px**, large section-card radius ~24px
- Buttons: fully-rounded pills (`990px`), padding `10px 20px`
- Nav links: pill radius `50px`, padding `8px 12px`, 14px weight 600

### Page pattern
1. Sticky cream nav — logo left, pill links center, log-in + purple pill CTA right
2. Hero — oversized H1 in purple, subhead, two pill CTAs, horizontal "works with" strip
3. Decorative wordmark/illustration band + product screenshot
4. Eyebrow + centered serif H2 with side decorations, narrow body
5. Large filled purple card — left headline, right 2x2 feature grid, outlined cream pill CTA
6. Eyebrow + left-aligned big headline, body
7. Eyebrow + headline + row of 4 filled purple cards
8. Oversized display CTA wordmark, subhead, two pill CTAs
9. Cream multi-column footer

## Build Instructions
- Recreate the palette, type scale, pill buttons, eyebrow labels, and section rhythm.
- Do NOT copy Tines' copy, logos, customer marks, or illustrations. Draw original SVG decoration (jali/metro motifs) instead.
- Use system-font fallbacks only — no remote font loading.
