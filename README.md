# MAYEIN — homepage prototype

A static homepage for **MAYEIN (Mentoring Assistance for Youth and Entrepreneurs Initiative)**, a nonprofit based in Ibadan, Nigeria.

Built with plain HTML, CSS and JavaScript — no build step and no dependencies. Open `index.html` in a browser to view it.

## Files

| File | Purpose |
|---|---|
| `index.html` | The homepage markup |
| `style.css` | Design tokens, layout and responsive rules |
| `script.js` | Carousel, scroll reveals, counters, navigation |
| `assets_1791032993965/` | Logos, photography and the footer wave SVG |

## Sections

Hero carousel · Introduction · Mission & Vision · Four programme pillars · What We Do · Impact statistics · Testimonials · Call to action · Contact footer

## Animation

All motion runs through a small easing layer at the top of `script.js` — an `Ease` object (`inOutCubic`, `outExpo`, `outQuad`…) and a single `animate(duration, easing, onUpdate)` helper built on `requestAnimationFrame`. It drives:

- **Hero carousel** — crossfade with a slow zoom, autoplay, arrows, dots, arrow keys and swipe; pauses on hover and when the tab is hidden
- **Scroll reveals** — `IntersectionObserver`, with per-element stagger via `data-reveal-delay`
- **Impact counters** — ease-out count-up, firing once when scrolled into view
- **Smooth scrolling** — eased anchor jumps and back-to-top

`prefers-reduced-motion` disables all of it.

## Design tokens

Colours, radii, shadows and breakpoints come from the project's extracted design system and are defined as custom properties on `:root` in `style.css`. Typography is matched to the reference design: Poppins for headings, DM Sans for body text.

Responsive from 390px upward.
