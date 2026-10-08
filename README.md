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

Section order follows §7.3 of the MAYEIN Website Rebuild Brief:

Hero carousel · About · Mission & Vision · Four programme pillars · Impact numbers · SMILS feature · Latest news & projects · Shop strip · Testimonials · Partners & donors · Call to action · Contact footer

## Outstanding before this page can go live

Flagged in the markup with `IMAGE NEEDED`, `FIGURE NEEDED`, `CONTENT NEEDED` or `TODO(copy)`. Brief Rule 2 — never invent content — so these are visibly unfinished rather than filled with guesses.

| What | Blocked on | Brief |
|---|---|---|
| Schools / Communities / States figures | Programmes | §8 #4 |
| Homepage, shop and partner images | Google Drive access | §2.1, §4.2 |
| Partner logo list + permission to display | Partnerships | §8 #5 |
| News / project card content | Programmes | §8 #9 |
| Copy sign-off | Unassigned | §8 #7 |
| Testimonial photos | — | §7.3 item 10 |

The `about.html`, `programs.html`, `smils.html`, `news.html`, `shop.html`, `donate.html` and `volunteer.html` links 404 until those pages exist.

## Animation

All motion runs through a small easing layer at the top of `script.js` — an `Ease` object (`inOutCubic`, `outExpo`, `outQuad`…) and a single `animate(duration, easing, onUpdate)` helper built on `requestAnimationFrame`. It drives:

- **Hero carousel** — crossfade with a slow zoom, autoplay, arrows, dots, arrow keys and swipe; pauses on hover and when the tab is hidden
- **Testimonial slider** — one card at a time, dots, autoplay, keyboard and swipe; same controls as the hero at a slower pace
- **Scroll reveals** — `IntersectionObserver`, with per-element stagger via `data-reveal-delay`
- **Impact counters** — ease-out count-up, firing once when scrolled into view; counters marked `data-count-pending` are skipped until a real figure exists
- **Partner marquee** — CSS keyframe scroll; `script.js` duplicates the track so the loop has no seam
- **Smooth scrolling** — eased anchor jumps and back-to-top

`prefers-reduced-motion` disables all of it.

## Design tokens

Colours, radii, shadows and breakpoints come from the project's extracted design system and are defined as custom properties on `:root` in `style.css`. Typography is matched to the reference design: Poppins for headings, DM Sans for body text.

Responsive from 390px upward.
