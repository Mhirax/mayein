---
version: alpha
name: "MAYEIN – Mentoring Assistance for Youth and Entrepreneurs Initiative"
description: "Converted from Webmimic extraction of https://mayein.org/"
colors:
  primary: "#FFFFFF"
  secondary: "#000000"
  tertiary: "#007BB6"
  neutral: "#1C1C1C"
  on-primary: "#1C1C1C"
  on-tertiary: "#FFFFFF"
  color-dark-gray-2: "#474747"
  color-dark-blue: "#000066"
  color-blue: "#0000FF"
  color-yellow: "#FFCC00"
  color-blue-2: "#2292F1"
  color-light-gray-2: "#F5F3EE"
  color-blue-4: "#1A73E8"
  color-light-gray-3: "#F2EBE4"
  color-orange: "#EF8451"
  color-red: "#EA2C59"
  color-dark-cyan-4: "rgba(0, 39, 37, 0.1)"
  color-blue-5: "rgba(26, 115, 232, 0.1)"
  color-cyan: "#6B8483"
  color-dark-cyan: "#0F393B"
  color-dark-cyan-2: "#002725"
  color-dark-cyan-3: "#093532"
  color-light-gray: "#DDDDDD"
  color-dark-gray-4: "#262626"
  color-dark-gray-5: "#0E0C19"
  color-dark-gray-3: "#333333"
  color-blue-3: "rgba(34, 146, 241, 0.32)"
  color-dark-blue-2: "rgba(0, 0, 102, 0.74)"
  dark-gray-2: "#474747"
  cyan: "#6B8483"
  dark-blue: "#000066"
  dark-cyan: "#0F393B"
  blue: "#0000FF"
  dark-cyan-2: "#002725"
  dark-gray-3: "#333333"
  yellow: "#FFCC00"
  blue-2: "#2292F1"
  dark-cyan-3: "#093532"
  light-gray: "#DDDDDD"
  light-gray-2: "#F5F3EE"
  blue-3: "rgba(34, 146, 241, 0.32)"
  dark-gray-4: "#262626"
  dark-gray-5: "#0E0C19"
  blue-4: "#1A73E8"
  light-gray-3: "#F2EBE4"
  orange: "#EF8451"
  dark-blue-2: "rgba(0, 0, 102, 0.74)"
  red: "#EA2C59"
  dark-cyan-4: "rgba(0, 39, 37, 0.1)"
  blue-5: "rgba(26, 115, 232, 0.1)"
typography:
  display:
    fontFamily: "Times New Roman"
    fontSize: 72px
    fontWeight: 500
    lineHeight: 72px
    letterSpacing: -0.76px
  h1:
    fontFamily: "Times New Roman"
    fontSize: 60px
    fontWeight: 500
    lineHeight: 60px
    letterSpacing: -0.76px
  h2:
    fontFamily: "Times New Roman"
    fontSize: 53px
    fontWeight: 500
    lineHeight: 57.5px
    letterSpacing: -0.76px
  h3:
    fontFamily: "Times New Roman"
    fontSize: 50px
    fontWeight: 500
    lineHeight: 53px
    letterSpacing: -0.76px
  body-lg:
    fontFamily: "Times New Roman"
    fontSize: 48px
    fontWeight: 500
    lineHeight: 43.5px
    letterSpacing: -0.76px
  body-md:
    fontFamily: "Times New Roman"
    fontSize: 40px
    fontWeight: 500
    lineHeight: 40px
    letterSpacing: -0.76px
  body-sm:
    fontFamily: "Times New Roman"
    fontSize: 38px
    fontWeight: 500
    lineHeight: 35.2px
    letterSpacing: -0.76px
  caption:
    fontFamily: "Times New Roman"
    fontSize: 32px
    fontWeight: 500
    lineHeight: 31.5px
    letterSpacing: -0.76px
  code:
    fontFamily: "DM Sans"
    fontSize: 15px
    fontWeight: 400
rounded:
  sm: "0px 0px 40px"
  md: 3px
  lg: 7px
  xl: 20px
  2xl: "20px 20px 0px 0px"
  full: 22px
spacing:
  xs: 3px
  sm: 8px
  md: 16px
  lg: 26px
  xl: 31px
  2xl: 500px
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
    rounded: "{rounded.md}"
    padding: 12px
  button-primary-hover:
    backgroundColor: "{colors.dark-cyan}"
  surface:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
  text-muted:
    textColor: "{colors.secondary}"
    typography: body-sm
---

## Overview

This design system was auto-extracted from https://mayein.org/ (26 colors · 59 type tokens · 44 spacing steps · 9 breakpoints · 5 motion tokens).

The UI favors a dark, developer-focused aesthetic with high-contrast typography and a single accent color for interactive elements.

Original extraction date: 2026-10-03T13:12:35.377Z.

## Colors

The palette combines neutral surfaces, readable text colors, and an accent used for primary actions.

- **primary (#FFFFFF):** Core surface and headline color.
- **secondary (#000000):** Muted text, borders, and metadata.
- **tertiary (#007BB6):** Primary accent for links, buttons, and focus states.
- **neutral (#1C1C1C):** Primary readable text on dark surfaces.
- **on-primary (#1C1C1C):** Text and icons placed on primary surfaces.
- **on-tertiary (#FFFFFF):** Text and icons placed on accent surfaces.
- **color-dark-gray-2 (#474747):** Supporting token from the extracted palette.
- **color-dark-blue (#000066):** Supporting token from the extracted palette.
- **color-blue (#0000FF):** Supporting token from the extracted palette.
- **color-yellow (#FFCC00):** Supporting token from the extracted palette.
- **color-blue-2 (#2292F1):** Supporting token from the extracted palette.
- **color-light-gray-2 (#F5F3EE):** Supporting token from the extracted palette.
- **color-blue-4 (#1A73E8):** Supporting token from the extracted palette.
- **color-light-gray-3 (#F2EBE4):** Supporting token from the extracted palette.
- **color-orange (#EF8451):** Supporting token from the extracted palette.
- **color-red (#EA2C59):** Supporting token from the extracted palette.
- **color-dark-cyan-4 (rgba(0, 39, 37, 0.1)):** Supporting token from the extracted palette.
- **color-blue-5 (rgba(26, 115, 232, 0.1)):** Supporting token from the extracted palette.
- **color-cyan (#6B8483):** Supporting token from the extracted palette.
- **color-dark-cyan (#0F393B):** Supporting token from the extracted palette.
- **color-dark-cyan-2 (#002725):** Supporting token from the extracted palette.
- **color-dark-cyan-3 (#093532):** Supporting token from the extracted palette.
- **color-light-gray (#DDDDDD):** Supporting token from the extracted palette.
- **color-dark-gray-4 (#262626):** Supporting token from the extracted palette.
- **color-dark-gray-5 (#0E0C19):** Supporting token from the extracted palette.
- **color-dark-gray-3 (#333333):** Supporting token from the extracted palette.
- **color-blue-3 (rgba(34, 146, 241, 0.32)):** Supporting token from the extracted palette.
- **color-dark-blue-2 (rgba(0, 0, 102, 0.74)):** Supporting token from the extracted palette.
- **dark-gray-2 (#474747):** Supporting token from the extracted palette.
- **cyan (#6B8483):** Supporting token from the extracted palette.
- **dark-blue (#000066):** Supporting token from the extracted palette.
- **dark-cyan (#0F393B):** Supporting token from the extracted palette.
- **blue (#0000FF):** Supporting token from the extracted palette.
- **dark-cyan-2 (#002725):** Supporting token from the extracted palette.
- **dark-gray-3 (#333333):** Supporting token from the extracted palette.
- **yellow (#FFCC00):** Supporting token from the extracted palette.
- **blue-2 (#2292F1):** Supporting token from the extracted palette.
- **dark-cyan-3 (#093532):** Supporting token from the extracted palette.
- **light-gray (#DDDDDD):** Supporting token from the extracted palette.
- **light-gray-2 (#F5F3EE):** Supporting token from the extracted palette.
- **blue-3 (rgba(34, 146, 241, 0.32)):** Supporting token from the extracted palette.
- **dark-gray-4 (#262626):** Supporting token from the extracted palette.
- **dark-gray-5 (#0E0C19):** Supporting token from the extracted palette.
- **blue-4 (#1A73E8):** Supporting token from the extracted palette.
- **light-gray-3 (#F2EBE4):** Supporting token from the extracted palette.
- **orange (#EF8451):** Supporting token from the extracted palette.
- **dark-blue-2 (rgba(0, 0, 102, 0.74)):** Supporting token from the extracted palette.
- **red (#EA2C59):** Supporting token from the extracted palette.
- **dark-cyan-4 (rgba(0, 39, 37, 0.1)):** Supporting token from the extracted palette.
- **blue-5 (rgba(26, 115, 232, 0.1)):** Supporting token from the extracted palette.

## Typography

Primary typeface: **DM Sans, Arial, Montserrat, FontAwesome, ETmodules, Poppins, Work Sans, monospace, Family, Times New Roman**. Scale tokens map extracted font sizes to semantic roles for headings and body copy.

- **display:** font Times New Roman, 72px, weight 500.
- **h1:** font Times New Roman, 60px, weight 500.
- **h2:** font Times New Roman, 53px, weight 500.
- **h3:** font Times New Roman, 50px, weight 500.
- **body-lg:** font Times New Roman, 48px, weight 500.
- **body-md:** font Times New Roman, 40px, weight 500.
- **body-sm:** font Times New Roman, 38px, weight 500.
- **caption:** font Times New Roman, 32px, weight 500.
- **code:** font DM Sans, 15px, weight 400.

## Layout

Spacing follows a modular scale derived from extracted layout tokens.

- **xs (3px):** Layout rhythm and component padding.
- **sm (8px):** Layout rhythm and component padding.
- **md (16px):** Layout rhythm and component padding.
- **lg (26px):** Layout rhythm and component padding.
- **xl (31px):** Layout rhythm and component padding.
- **2xl (500px):** Layout rhythm and component padding.

**Breakpoints**
- **xs (479px):** Responsive layout threshold.
- **sm (480px):** Responsive layout threshold.
- **md (767px):** Responsive layout threshold.
- **lg (768px):** Responsive layout threshold.
- **xl (782px):** Responsive layout threshold.
- **2xl (980px):** Responsive layout threshold.
- **3xl (981px):** Responsive layout threshold.
- **bp-8 (1100px):** Responsive layout threshold.
- **bp-9 (1350px):** Responsive layout threshold.
- **breakpoint-xs (479px):** Responsive layout threshold.
- **breakpoint-sm (480px):** Responsive layout threshold.
- **breakpoint-md (767px):** Responsive layout threshold.
- **breakpoint-lg (768px):** Responsive layout threshold.
- **breakpoint-xl (782px):** Responsive layout threshold.
- **breakpoint-2xl (980px):** Responsive layout threshold.
- **breakpoint-3xl (981px):** Responsive layout threshold.
- **breakpoint-bp-8 (1100px):** Responsive layout threshold.
- **breakpoint-bp-9 (1350px):** Responsive layout threshold.

## Elevation & Depth

Shadow tokens define depth for overlays, cards, and elevated panels.

- **sm:** `rgba(0, 0, 0, 0.1) 0px 2px 5px 0px`
- **md:** `rgba(0, 0, 0, 0.1) 0px 1px 0px 0px`
- **shadow-sm:** `rgba(0, 0, 0, 0.1) 0px 2px 5px 0px`
- **shadow-md:** `rgba(0, 0, 0, 0.1) 0px 1px 0px 0px`

## Shapes

Corner radii create a consistent component silhouette across buttons, inputs, and cards.

- **sm (0px 0px 40px):** Border radius token.
- **md (3px):** Border radius token.
- **lg (7px):** Border radius token.
- **xl (20px):** Border radius token.
- **2xl (20px 20px 0px 0px):** Border radius token.
- **full (22px):** Border radius token.

## Components

Component tokens map semantic colors and shapes to reusable UI patterns.

- **button-primary:** backgroundColor {colors.tertiary}, textColor {colors.on-tertiary}, rounded {rounded.md}, padding 12px.
- **button-primary-hover:** backgroundColor {colors.dark-cyan}.
- **surface:** backgroundColor {colors.primary}, textColor {colors.on-primary}.
- **text-muted:** textColor {colors.secondary}, typography body-sm.

## Do's and Don'ts

- **Do** use the accent color sparingly for primary actions and active states.
- **Do** maintain high contrast between text and background tokens.
- **Don't** introduce new colors outside the extracted palette without updating the YAML tokens.
- **Don't** mix arbitrary spacing values — use the spacing scale.

**Accessibility notes from extraction:**
- Avoid pairing --color-dark-gray on --color-dark-gray-2 (1.83:1, Fail).
- Avoid pairing --color-dark-gray on --color-dark-blue (1.03:1, Fail).
- Avoid pairing --color-dark-gray on --color-blue (1.98:1, Fail).