# Morrowe design tokens

Source of truth: `tailwind.config.js` and the `:root` block in `app/globals.css`. Brand colours are fixed; tints are derived and listed here.

| Token | Value | Use |
|---|---|---|
| forest-950 | `#0B1713` | Footer, darkest sections, text |
| forest-800 | `#123C2F` | Brand primary, buttons, dark sections |
| forest-600 | `#2F6B56` (derived) | Hover, focus ring, gradients |
| sage-300 | `#A8C5A0` | Accent on dark, badges, highlights |
| sage-100 | `#E3ECDD` (derived) | Alternating sections, tiles |
| cream-50 | `#F5F3EA` | Page background |
| cream-200 | `#EBE7D6` (derived) | Cards on cream |
| ink-muted | `#3F5149` (derived) | Secondary text |
| white | `#FFFFFF` | Glass overlays, inputs |

## Contrast (WCAG 2.1, computed)

| Text on background | Ratio | Result |
|---|---|---|
| cream-50 on forest-800 | 11.03 | AA / AAA |
| cream-50 on forest-950 | 16.48 | AA / AAA |
| cream-50 on forest-600 | 5.63 | AA |
| forest-950 on cream-50 | 16.48 | AA / AAA |
| forest-800 on cream-50 | 11.03 | AA / AAA |
| forest-800 on sage-100 | 10.10 | AA / AAA |
| forest-800 on cream-200 | 9.88 | AA / AAA |
| forest-800 on sage-300 | 6.51 | AA |
| sage-300 on forest-800 | 6.51 | AA |
| sage-300 on forest-950 | 9.74 | AA / AAA |
| ink-muted on cream-50 | 7.60 | AA / AAA |
| ink-muted on cream-200 | 6.82 | AA |
| ink-muted on sage-100 | 6.97 | AA |
| ink-muted on white | 8.45 | AA / AAA |
| red-700 error text on white | 6.57 | AA |

## Type
Four self-hosted font files in `app/fonts/` (latin, `display: swap`): Sora (display, tight tracking), Inter (body), Space Grotesk (eyebrows, prices, numerals), Instrument Serif Italic (one accent word per headline). The accent font is the single `--font-accent` token in `app/layout.js`; to remove accents, delete that font and set `.accent-word` to `font-display` in `globals.css`.

## Motion
fast 150ms, base 300ms, slow 600ms, hero 900ms. Easings: out-expo `cubic-bezier(.22,1,.36,1)`, in-out `cubic-bezier(.65,0,.35,1)`. Stagger 60ms. Everything animates `transform` / `opacity` only (two exceptions: the nav pill and filter underline also change `width` on an absolutely positioned element, so nothing reflows). All keyframes use `from` only, so with `prefers-reduced-motion` (animations removed) every element is in its final, visible state.
