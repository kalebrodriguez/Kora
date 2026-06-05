# Design Language: Coursue Learning Platform Dashboard by Fireart UI/UX for Fireart Studio on Dribbble

> Extracted from `https://dribbble.com/shots/23027887-Coursue-Learning-Platform-Dashboard` on June 5, 2026
> 884 elements analyzed

This document describes the complete design language of the website. It is structured for AI/LLM consumption — use it to faithfully recreate the visual design in any framework.

## Color Palette

### Primary Colors

| Role | Hex | RGB | HSL | Usage Count |
|------|-----|-----|-----|-------------|
| Primary | `#0d0c22` | rgb(13, 12, 34) | hsl(243, 48%, 9%) | 749 |
| Secondary | `#ea4c89` | rgb(234, 76, 137) | hsl(337, 79%, 61%) | 6 |
| Accent | `#f3f3f6` | rgb(243, 243, 246) | hsl(240, 14%, 96%) | 11 |

### Neutral Colors

| Hex | HSL | Usage Count |
|-----|-----|-------------|
| `#000000` | hsl(0, 0%, 0%) | 432 |
| `#060318` | hsl(249, 78%, 5%) | 297 |
| `#ffffff` | hsl(0, 0%, 100%) | 91 |
| `#6e6d7a` | hsl(245, 6%, 45%) | 75 |
| `#655c7a` | hsl(258, 14%, 42%) | 38 |
| `#9e9ea7` | hsl(240, 5%, 64%) | 21 |
| `#e7e7e9` | hsl(240, 4%, 91%) | 18 |
| `#524b63` | hsl(258, 14%, 34%) | 18 |
| `#262627` | hsl(240, 1%, 15%) | 14 |
| `#dbdbde` | hsl(240, 4%, 86%) | 10 |
| `#807ea3` | hsl(243, 17%, 57%) | 6 |
| `#9890ac` | hsl(257, 14%, 62%) | 4 |

### Background Colors

Used on large-area elements: `#ffffff`, `#0d0c22`, `#000000`

### Text Colors

Text color palette: `#000000`, `#0d0c22`, `#ffffff`, `#9e9ea7`, `#060318`, `#262627`, `#3e34d3`, `#807ea3`, `#3a3546`, `#3d3d4e`

### Gradients

```css
background-image: linear-gradient(172deg, rgb(74, 96, 113) 14.52%, rgb(0, 0, 0) 108.51%);
```

### Full Color Inventory

| Hex | Contexts | Count |
|-----|----------|-------|
| `#0d0c22` | text, border, background | 749 |
| `#000000` | text, border, background | 432 |
| `#060318` | text, border, background | 297 |
| `#ffffff` | background, text, border | 91 |
| `#6e6d7a` | text, border | 75 |
| `#655c7a` | text, border | 38 |
| `#3d3d4e` | background, text, border | 30 |
| `#9e9ea7` | text, border, background | 21 |
| `#e7e7e9` | border, background | 18 |
| `#524b63` | text, border | 18 |
| `#262627` | text, border, background | 14 |
| `#f3f3f6` | background, border | 11 |
| `#3e34d3` | text, border | 10 |
| `#dbdbde` | text, border | 10 |
| `#807ea3` | text, border | 6 |
| `#ea4c89` | background, border, text | 6 |
| `#727ac0` | text, border | 4 |
| `#9890ac` | text, border | 4 |
| `#4daa57` | text, border | 2 |
| `#808080` | text, border | 2 |

## Typography

### Font Families

- **Mona Sans** — used for all (660 elements)
- **Times** — used for body (210 elements)
- **Arial** — used for all (14 elements)

### Type Scale

| Size (px) | Size (rem) | Weight | Line Height | Letter Spacing | Used On |
|-----------|------------|--------|-------------|----------------|---------|
| 24px | 1.5rem | 600 | 29px | normal | h1 |
| 20px | 1.25rem | 400 | 32px | normal | p, div, a |
| 16px | 1rem | 400 | normal | normal | html, head, meta, style |
| 15px | 0.9375rem | 500 | 21px | normal | h3 |
| 14px | 0.875rem | 400 | 28px | normal | input, button, span, slot |
| 13.3333px | 0.8333rem | 400 | normal | normal | button, span, svg, path |
| 13px | 0.8125rem | 600 | 13px | normal | button, svg, path, a |
| 12px | 0.75rem | 500 | 12px | normal | a, div, svg, path |
| 11px | 0.6875rem | 400 | 11px | normal | div, button, a, span |
| 10px | 0.625rem | 600 | 10px | normal | a |
| 8px | 0.5rem | 700 | 8px | normal | span |

### Heading Scale

```css
h1 { font-size: 24px; font-weight: 600; line-height: 29px; }
h4 { font-size: 16px; font-weight: 400; line-height: normal; }
h3 { font-size: 15px; font-weight: 500; line-height: 21px; }
```

### Body Text

```css
body { font-size: 14px; font-weight: 400; line-height: 28px; }
```

### Font Weights in Use

`400` (724x), `600` (122x), `500` (29x), `700` (7x), `450` (2x)

## Spacing

**Base unit:** 2px

| Token | Value | Rem |
|-------|-------|-----|
| spacing-1 | 1px | 0.0625rem |
| spacing-4 | 4px | 0.25rem |
| spacing-24 | 24px | 1.5rem |
| spacing-30 | 30px | 1.875rem |
| spacing-36 | 36px | 2.25rem |
| spacing-40 | 40px | 2.5rem |
| spacing-50 | 50px | 3.125rem |
| spacing-56 | 56px | 3.5rem |
| spacing-60 | 60px | 3.75rem |
| spacing-64 | 64px | 4rem |
| spacing-70 | 70px | 4.375rem |
| spacing-80 | 80px | 5rem |
| spacing-120 | 120px | 7.5rem |
| spacing-260 | 260px | 16.25rem |

## Border Radii

| Label | Value | Count |
|-------|-------|-------|
| sm | 3px | 4 |
| md | 6px | 2 |
| md | 10px | 1 |
| lg | 16px | 1 |
| full | 50px | 12 |

## Box Shadows

**sm** — blur: 6px
```css
box-shadow: rgba(0, 0, 0, 0.03) 0px 2px 6px 0px;
```

**md** — blur: 10px
```css
box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px 0px;
```

**md** — blur: 10px
```css
box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 10px 0px;
```

**lg** — blur: 20px
```css
box-shadow: rgba(123, 123, 198, 0.25) 0px 12px 20px 0px, rgba(0, 0, 0, 0.08) 0px 2px 3px 0px;
```

**xl** — blur: 40px
```css
box-shadow: rgba(0, 0, 0, 0.06) 0px -6px 40px 0px;
```

**xl** — blur: 50px
```css
box-shadow: rgba(27, 32, 50, 0.1) 0px 15px 50px 0px;
```

## CSS Custom Properties

### Colors

```css
--sl-color-warning-400: hsl(43.3 96.4% 56.3%);
--sl-color-gray-200: hsl(240 5.9% 90%);
--sl-color-yellow-200: hsl(52.8 98.3% 76.9%);
--sl-color-emerald-900: hsl(164.2 85.7% 16.5%);
--sl-color-teal-950: hsl(176.5 58.6% 11.4%);
--sl-color-emerald-800: hsl(163.1 88.1% 19.8%);
--sl-color-yellow-400: hsl(47.9 95.8% 53.1%);
--sl-panel-border-width: 1px;
--sl-color-yellow-700: hsl(35.5 91.7% 32.9%);
--sl-color-neutral-500: hsl(240 3.8% 46.1%);
--sl-color-amber-700: hsl(26 90.5% 37.1%);
--sl-color-fuchsia-800: hsl(295.4 70.2% 32.9%);
--sl-color-amber-600: hsl(32.1 94.6% 43.7%);
--sl-color-pink-950: hsl(336.2 65.4% 15.9%);
--sl-input-placeholder-color: hsl(240 3.8% 46.1%);
--aa-panel-border-color-alpha: .3;
--sl-color-danger-200: hsl(0 96.3% 89.4%);
--sl-color-orange-500: hsl(24.6 95% 53.1%);
--sl-input-focus-ring-offset: 0;
--sl-color-amber-100: hsl(48 96.5% 88.8%);
--sl-color-green-50: hsl(138.5 76.5% 96.7%);
--sl-color-sky-800: hsl(201 90% 27.5%);
--sl-color-blue-500: hsl(217.2 91.2% 59.8%);
--sl-color-emerald-100: hsl(149.3 80.4% 90%);
--sl-input-border-width: 1px;
--sl-color-success-800: hsl(142.8 64.2% 24.1%);
--btn-text-color-hover: #fff;
--sl-input-filled-background-color-hover: hsl(240 4.8% 95.9%);
--sl-color-rose-300: hsl(352.6 95.7% 81.8%);
--sl-color-lime-50: hsl(78.3 92% 95.1%);
--sl-overlay-background-color: hsl(240 3.8% 46.1% / 33%);
--aa-selected-color-rgb: 179, 173, 214;
--aa-overlay-color-alpha: .4;
--sl-input-required-content-color: ;
--sl-color-amber-200: hsl(48 96.6% 76.7%);
--sl-input-color-hover: hsl(240 5.3% 26.1%);
--sl-color-teal-400: hsl(172.5 66% 50.4%);
--sl-color-primary-800: rgb(155 50 91);
--sl-color-primary-600: rgb(228 74 133);
--sl-color-neutral-0: hsl(0, 0%, 100%);
--sl-color-red-400: hsl(0 90.6% 70.8%);
--sl-color-emerald-50: hsl(151.8 81% 95.9%);
--sl-color-gray-400: hsl(240 5% 64.9%);
--sl-color-fuchsia-950: hsl(297.1 56.8% 14.5%);
--sl-color-red-700: hsl(0 73.7% 41.8%);
--aa-icon-color-rgb: 119, 119, 163;
--sl-input-background-color: hsl(0, 0%, 100%);
--sl-color-sky-700: hsl(201.3 96.3% 32.2%);
--sl-panel-background-color: hsl(0, 0%, 100%);
--sl-color-gray-700: hsl(240 5.3% 26.1%);
--sl-input-filled-background-color-focus: hsl(240 4.8% 95.9%);
--sl-color-emerald-600: hsl(161.4 93.5% 30.4%);
--sl-color-pink-50: hsl(327.3 73.3% 97.1%);
--sl-input-background-color-disabled: hsl(240 4.8% 95.9%);
--sl-color-lime-100: hsl(79.6 89.1% 89.2%);
--sl-color-warning-200: hsl(48 96.6% 76.7%);
--sl-color-neutral-200: hsl(240 5.9% 90%);
--sl-color-blue-800: hsl(225.9 70.7% 40.2%);
--sl-color-cyan-900: hsl(196.4 63.6% 23.7%);
--sl-color-warning-700: hsl(26 90.5% 37.1%);
--sl-color-danger-400: hsl(0 90.6% 70.8%);
--aa-text-color-rgb: 38, 38, 39;
--sl-color-gray-50: hsl(0 0% 97.5%);
--sl-color-green-400: hsl(141.9 69.2% 58%);
--sl-color-gray-950: hsl(240 7.3% 8%);
--aa-background-color-rgb: 255, 255, 255;
--sl-color-blue-700: hsl(224.3 76.3% 48%);
--sl-input-filled-color-focus: hsl(240 5.3% 26.1%);
--sl-color-orange-100: hsl(34.3 100% 91.8%);
--sl-color-warning-300: hsl(45.9 96.7% 64.5%);
--sl-color-sky-500: hsl(198.6 88.7% 48.4%);
--sl-input-icon-color-focus: hsl(240 5.2% 33.9%);
--sl-color-teal-200: hsl(168.4 83.8% 78.2%);
--sl-color-purple-500: hsl(270.7 91% 65.1%);
--sl-color-red-100: hsl(0 93.3% 94.1%);
--sl-color-rose-950: hsl(341.3 70.1% 17.1%);
--sl-color-sky-200: hsl(200.6 94.4% 86.1%);
--sl-input-icon-color: hsl(240 3.8% 46.1%);
--sl-color-success-600: hsl(142.1 76.2% 36.3%);
--sl-color-rose-900: hsl(341.5 75.5% 30.4%);
--sl-color-indigo-200: hsl(228 96.5% 88.8%);
--sl-color-warning-950: hsl(22.9 74.1% 16.7%);
--sl-color-yellow-50: hsl(54.5 91.7% 95.3%);
--sl-border-radius-large: .5rem;
--sl-color-teal-600: hsl(174.7 83.9% 31.6%);
--sl-color-pink-700: hsl(335.1 77.6% 42%);
--aa-muted-color-alpha: .6;
--sl-color-danger-500: hsl(0 84.2% 60.2%);
--sl-color-danger-50: hsl(0 85.7% 97.3%);
--sl-color-violet-600: hsl(262.1 83.3% 57.8%);
--sl-color-indigo-500: hsl(238.7 83.5% 66.7%);
--sl-color-fuchsia-50: hsl(289.1 100% 97.8%);
--sl-color-orange-200: hsl(32.1 97.7% 83.1%);
--sl-color-indigo-600: hsl(243.4 75.4% 58.6%);
--aa-primary-color-alpha: .2;
--sl-input-border-color-hover: hsl(240 5% 64.9%);
--aa-input-border-color-rgb: 128, 126, 163;
--sl-color-danger-700: hsl(0 73.7% 41.8%);
--sl-color-amber-900: hsl(21.7 77.8% 26.5%);
--sl-color-purple-800: hsl(272.9 67.2% 39.4%);
--sl-color-blue-900: hsl(224.4 64.3% 32.9%);
--sl-color-teal-500: hsl(173.4 80.4% 40%);
--sl-color-teal-800: hsl(176.1 69.4% 21.8%);
--sl-color-gray-900: hsl(240 5.9% 10%);
--sl-color-violet-500: hsl(258.3 89.5% 66.3%);
--sl-input-border-color: hsl(240 4.9% 83.9%);
--sl-color-fuchsia-900: hsl(296.7 63.6% 28%);
--sl-color-pink-600: hsl(333.3 71.4% 50.6%);
--sl-input-filled-background-color: hsl(240 4.8% 95.9%);
--sl-color-neutral-600: hsl(240 5.2% 33.9%);
--sl-color-indigo-100: hsl(226.5 100% 93.9%);
--sl-color-pink-800: hsl(335.8 74.4% 35.3%);
--sl-color-orange-950: hsl(15.2 69.1% 19%);
--sl-color-fuchsia-400: hsl(292 91.4% 72.5%);
--sl-color-rose-600: hsl(346.8 77.2% 49.8%);
--sl-color-violet-300: hsl(252.5 94.7% 85.1%);
--sl-color-amber-500: hsl(37.7 92.1% 50.2%);
--sl-input-border-radius-small: .25rem;
--sl-color-success-50: hsl(138.5 76.5% 96.7%);
--sl-input-color: hsl(240 5.3% 26.1%);
--sl-color-lime-950: hsl(86.5 60.6% 13.9%);
--sl-color-gray-500: hsl(240 3.8% 46.1%);
--sl-color-emerald-300: hsl(156.2 71.6% 66.9%);
--sl-border-radius-small: .1875rem;
--sl-color-orange-800: hsl(15 79.1% 33.7%);
--sl-color-cyan-100: hsl(185.1 95.9% 90.4%);
--sl-color-warning-900: hsl(21.7 77.8% 26.5%);
--sl-color-indigo-800: hsl(243.7 54.5% 41.4%);
--sl-border-radius-x-large: 1rem;
--sl-color-cyan-500: hsl(188.7 94.5% 42.7%);
--sl-color-orange-300: hsl(30.7 97.2% 72.4%);
--sl-color-yellow-300: hsl(50.4 97.8% 63.5%);
--sl-color-teal-50: hsl(166.2 76.5% 96.7%);
--sl-color-gray-300: hsl(240 4.9% 83.9%);
--sl-tooltip-color: hsl(0, 0%, 100%);
--sl-color-red-950: hsl(0 60% 19.6%);
--sl-color-primary-400: rgb(244 162 194);
--sl-color-indigo-700: hsl(244.5 57.9% 50.6%);
--sl-color-danger-950: hsl(0 60% 19.6%);
--sl-color-purple-200: hsl(268.6 100% 91.8%);
--sl-color-purple-600: hsl(271.5 81.3% 55.9%);
--sl-input-background-color-focus: hsl(0, 0%, 100%);
--aa-scrollbar-track-background-color-alpha: 1;
--sl-focus-ring-style: solid;
--sl-input-filled-color: hsl(240 3.7% 15.9%);
--sl-color-yellow-600: hsl(40.6 96.1% 40.4%);
--aa-input-background-color-alpha: 1;
--aa-panel-border-color-rgb: 128, 126, 163;
--sl-color-success-300: hsl(141.7 76.6% 73.1%);
--sl-border-radius-medium: .25rem;
--sl-input-color-focus: hsl(240 5.3% 26.1%);
--sl-color-violet-100: hsl(251.4 91.3% 95.5%);
--sl-color-emerald-700: hsl(162.9 93.5% 24.3%);
--sl-color-violet-700: hsl(263.4 70% 50.4%);
--sl-color-fuchsia-200: hsl(288.3 95.8% 90.6%);
--sl-color-amber-400: hsl(43.3 96.4% 56.3%);
--aa-input-border-color-alpha: .8;
--sl-color-fuchsia-700: hsl(294.7 72.4% 39.8%);
--sl-color-emerald-950: hsl(164.3 87.5% 9.4%);
--sl-color-gray-800: hsl(240 3.7% 15.9%);
--sl-color-rose-100: hsl(355.6 100% 94.7%);
--sl-color-emerald-200: hsl(152.4 76% 80.4%);
--sl-color-sky-100: hsl(204 93.8% 93.7%);
--sl-input-filled-color-hover: hsl(240 3.7% 15.9%);
--sl-color-blue-50: hsl(213.8 100% 96.9%);
--sl-color-emerald-400: hsl(158.1 64.4% 51.6%);
--sl-color-violet-800: hsl(263.4 69.3% 42.2%);
--sl-color-fuchsia-500: hsl(292.2 84.1% 60.6%);
--site-nav-link-hover-color: #7b7194;
--sl-color-success-900: hsl(143.8 61.2% 20.2%);
--sl-color-pink-200: hsl(325.9 84.6% 89.8%);
--sl-color-blue-950: hsl(226.2 55.3% 18.4%);
--sl-color-cyan-50: hsl(183.2 100% 96.3%);
--sl-color-green-900: hsl(143.8 61.2% 20.2%);
--sl-color-rose-50: hsl(355.7 100% 97.3%);
--sl-color-amber-50: hsl(48 100% 96.1%);
--sl-color-neutral-900: hsl(240 5.9% 10%);
--sl-color-indigo-50: hsl(225.9 100% 96.7%);
--sl-color-primary-500: rgb(234 76 137);
--sl-color-primary-100: rgb(252 231 239);
--sl-color-yellow-900: hsl(28.4 72.5% 25.7%);
--sl-color-danger-100: hsl(0 93.3% 94.1%);
--sl-color-pink-900: hsl(335.9 69% 30.4%);
--sl-color-emerald-500: hsl(160.1 84.1% 39.4%);
--sl-color-amber-300: hsl(45.9 96.7% 64.5%);
--aa-scrollbar-track-background-color-rgb: 234, 234, 234;
--aa-description-highlight-background-color-alpha: .5;
--sl-color-teal-700: hsl(175.3 77.4% 26.1%);
--sl-color-yellow-500: hsl(45.4 93.4% 47.5%);
--sl-color-rose-700: hsl(345.3 82.7% 40.8%);
--sl-color-success-200: hsl(141 78.9% 85.1%);
--sl-color-blue-200: hsl(213.3 96.9% 87.3%);
--zi-jobs-bg-effect: 10;
--sl-color-blue-100: hsl(214.3 94.6% 92.7%);
--sl-color-primary-950: rgb(69 22 40);
--sl-color-neutral-800: hsl(240 3.7% 15.9%);
--sl-input-background-color-hover: hsl(0, 0%, 100%);
--sl-color-blue-600: hsl(221.2 83.2% 53.3%);
--sl-color-pink-100: hsl(325.7 77.8% 94.7%);
--sl-color-violet-950: hsl(265.1 61.5% 21.4%);
--sl-color-green-700: hsl(142.4 71.8% 29.2%);
--aa-background-color-alpha: 1;
--sl-color-primary-50: rgb(254 248 250);
--sl-color-purple-900: hsl(273.6 65.6% 32%);
--sl-color-rose-800: hsl(343.4 79.7% 34.7%);
--sl-color-lime-900: hsl(87.6 61.2% 20.2%);
--sl-color-danger-600: hsl(0 72.2% 50.6%);
--sl-color-lime-400: hsl(82.7 78% 55.5%);
--sl-color-fuchsia-100: hsl(287 100% 95.5%);
--sl-border-radius-pill: 9999px;
--sl-color-lime-800: hsl(86.3 69% 22.7%);
--sl-color-orange-400: hsl(27 96% 61%);
--sl-color-red-600: hsl(0 72.2% 50.6%);
--sl-color-indigo-400: hsl(234.5 89.5% 73.9%);
--sl-color-purple-100: hsl(268.7 100% 95.5%);
--sl-panel-border-color: hsl(240 5.9% 90%);
--sl-focus-ring-width: 3px;
--sl-tooltip-background-color: hsl(240 3.7% 15.9%);
--sl-color-lime-200: hsl(80.9 88.5% 79.6%);
--sl-color-green-800: hsl(142.8 64.2% 24.1%);
--btn-bg-color: #0d0c22;
--sl-color-cyan-200: hsl(186.2 93.5% 81.8%);
--aa-scrollbar-thumb-background-color-alpha: 1;
--sl-color-neutral-400: hsl(240 5% 64.9%);
--sl-color-gray-600: hsl(240 5.2% 33.9%);
--sl-color-green-200: hsl(141 78.9% 85.1%);
--sl-color-lime-700: hsl(85.9 78.4% 27.3%);
--aa-description-highlight-background-color-rgb: 245, 223, 77;
--sl-focus-ring-color: rgb(228 74 133);
--sl-color-warning-500: hsl(37.7 92.1% 50.2%);
--sl-color-lime-600: hsl(84.8 85.2% 34.5%);
--aa-overlay-color-rgb: 115, 114, 129;
--sl-color-sky-900: hsl(202 80.3% 23.9%);
--sl-color-red-50: hsl(0 85.7% 97.3%);
--sl-color-indigo-300: hsl(229.7 93.5% 81.8%);
--sl-color-warning-100: hsl(48 96.5% 88.8%);
--sl-color-pink-400: hsl(328.6 85.5% 70.2%);
--sl-color-sky-300: hsl(199.4 95.5% 73.9%);
--sl-color-yellow-800: hsl(31.8 81% 28.8%);
--sl-color-primary-700: rgb(187 61 110);
--btn-text-color: #fff;
--sl-color-cyan-300: hsl(187 92.4% 69%);
--sl-color-violet-400: hsl(255.1 91.7% 76.3%);
--sl-color-sky-400: hsl(198.4 93.2% 59.6%);
--sl-color-warning-50: hsl(48 100% 96.1%);
--sl-color-warning-800: hsl(22.7 82.5% 31.4%);
--aa-input-background-color-rgb: 255, 255, 255;
--sl-input-label-color: ;
--sl-color-indigo-950: hsl(243.5 43.6% 22.9%);
--sl-color-primary-300: rgb(248 191 213);
--sl-color-orange-50: hsl(33.3 100% 96.5%);
--sl-color-red-800: hsl(0 70% 35.3%);
--sl-color-success-500: hsl(142.1 70.6% 45.3%);
--sl-color-danger-900: hsl(0 62.8% 30.6%);
--aa-scrollbar-thumb-background-color-rgb: 255, 255, 255;
--sl-color-sky-950: hsl(202.3 73.8% 16.5%);
--sl-color-primary-900: rgb(111 36 65);
--btn-border-color: #0d0c22;
--sl-input-help-text-color: hsl(240 3.8% 46.1%);
--sl-color-lime-500: hsl(83.7 80.5% 44.3%);
--sl-color-red-500: hsl(0 84.2% 60.2%);
--sl-color-pink-300: hsl(327.4 87.1% 81.8%);
--sl-color-success-950: hsl(144.3 60.7% 12%);
--sl-color-cyan-950: hsl(196.8 61% 16.1%);
--sl-color-cyan-800: hsl(194.4 69.6% 27.1%);
--sl-color-green-100: hsl(140.6 84.2% 92.5%);
--sl-input-color-disabled: hsl(240 5.9% 10%);
--sl-color-primary-200: rgb(250 212 227);
--sl-color-fuchsia-600: hsl(293.4 69.5% 48.8%);
--sl-color-neutral-300: hsl(240 4.9% 83.9%);
--sl-border-radius-circle: 50%;
--sl-input-border-color-focus: rgb(234 76 137);
--sl-color-purple-300: hsl(269.2 97.4% 85.1%);
--sl-input-filled-background-color-disabled: hsl(240 4.8% 95.9%);
--sl-input-border-color-disabled: hsl(240 4.9% 83.9%);
--sl-color-teal-100: hsl(167.2 85.5% 89.2%);
--sl-color-pink-500: hsl(330.4 81.2% 60.4%);
--sl-input-filled-color-disabled: hsl(240 3.7% 15.9%);
--aa-text-color-alpha: 1;
--sl-color-danger-300: hsl(0 93.5% 81.8%);
--sl-color-blue-300: hsl(211.7 96.4% 78.4%);
--sl-color-green-500: hsl(142.1 70.6% 45.3%);
--btn-border-color-hover: #3d3d4e;
--sl-color-orange-700: hsl(17.5 88.3% 40.4%);
--sl-color-green-600: hsl(142.1 76.2% 36.3%);
--sl-color-cyan-400: hsl(187.9 85.7% 53.3%);
--sl-tooltip-border-radius: .25rem;
--aa-icon-color-alpha: 1;
--sl-color-rose-500: hsl(349.7 89.2% 60.2%);
--sl-focus-ring: solid 3px rgb(228 74 133);
--sl-color-success-100: hsl(140.6 84.2% 92.5%);
--sl-color-purple-950: hsl(276 59.5% 16.5%);
--sl-color-amber-800: hsl(22.7 82.5% 31.4%);
--sl-color-fuchsia-300: hsl(291.1 93.1% 82.9%);
--sl-color-red-300: hsl(0 93.5% 81.8%);
--sl-input-border-radius-medium: .25rem;
--sl-color-neutral-950: hsl(240 7.3% 8%);
--sl-focus-ring-offset: 1px;
--sl-color-neutral-700: hsl(240 5.3% 26.1%);
--sl-color-rose-200: hsl(352.7 96.1% 90%);
--sl-input-border-radius-large: .25rem;
--sl-input-icon-color-hover: hsl(240 5.2% 33.9%);
--sl-color-gray-100: hsl(240 4.8% 95.9%);
--sl-color-purple-700: hsl(272.1 71.7% 47.1%);
--sl-color-purple-400: hsl(270 95.2% 75.3%);
--sl-color-violet-900: hsl(263.5 67.4% 34.9%);
--sl-color-violet-50: hsl(250 100% 97.6%);
--sl-color-orange-600: hsl(20.5 90.2% 48.2%);
--aa-muted-color-rgb: 128, 126, 163;
--sl-color-red-900: hsl(0 62.8% 30.6%);
--sl-color-green-950: hsl(144.3 60.7% 12%);
--sl-color-danger-800: hsl(0 70% 35.3%);
--aa-selected-color-alpha: .205;
--sl-color-teal-300: hsl(170.6 76.9% 64.3%);
--sl-color-rose-400: hsl(351.3 94.5% 71.4%);
--aa-primary-color-rgb: 62, 52, 211;
--sl-color-success-400: hsl(141.9 69.2% 58%);
--sl-color-blue-400: hsl(213.1 93.9% 67.8%);
--zi-hovercard: calc(calc(9996 + 1) + 1);
--sl-color-lime-300: hsl(82 84.5% 67.1%);
--sl-color-violet-200: hsl(250.5 95.2% 91.8%);
--sl-color-sky-600: hsl(200.4 98% 39.4%);
--sl-color-cyan-600: hsl(191.6 91.4% 36.5%);
--sl-color-indigo-900: hsl(242.2 47.4% 34.3%);
--sl-color-teal-900: hsl(175.9 60.8% 19%);
--sl-color-neutral-1000: hsl(0, 0%, 0%);
--sl-color-yellow-100: hsl(54.9 96.7% 88%);
--sl-color-purple-50: hsl(270 100% 98%);
--sl-color-cyan-700: hsl(192.9 82.3% 31%);
--tagify-dd-color-primary: 234, 100, 217;
--sl-color-orange-900: hsl(15.3 74.6% 27.8%);
--sl-color-red-200: hsl(0 96.3% 89.4%);
--sl-input-focus-ring-color: hsl(198.6 88.7% 48.4% / 40%);
--btn-bg-color-hover: #3d3d4e;
--sl-color-neutral-100: hsl(240 4.8% 95.9%);
--sl-color-yellow-950: hsl(33.1 69% 13.9%);
--sl-color-neutral-50: hsl(0 0% 97.5%);
--sl-color-success-700: hsl(142.4 71.8% 29.2%);
--sl-color-green-300: hsl(141.7 76.6% 73.1%);
--sl-color-sky-50: hsl(204 100% 97.1%);
--sl-color-warning-600: hsl(32.1 94.6% 43.7%);
--sl-color-amber-950: hsl(22.9 74.1% 16.7%);
--sl-input-placeholder-color-disabled: hsl(240 5.2% 33.9%);
```

### Spacing

```css
--sl-spacing-3x-small: .125rem;
--sl-tooltip-arrow-size: 6px;
--sl-input-spacing-medium: 1rem;
--sl-input-help-text-font-size-large: 1rem;
--aa-input-icon-size: 20px;
--sl-letter-spacing-looser: .15em;
--sl-spacing-x-small: .5rem;
--sl-spacing-2x-small: .25rem;
--aa-spacing-half: calc(calc(16 * 1 * 1px) / 2);
--sl-input-help-text-font-size-medium: .875rem;
--sl-spacing-3x-large: 3rem;
--sl-toggle-size-large: 1.375rem;
--aa-action-icon-size: 20px;
--sl-button-font-size-large: 1rem;
--sl-font-size-3x-large: 3rem;
--sl-input-spacing-small: .75rem;
--sl-font-size-large: 1.25rem;
--sl-spacing-small: .75rem;
--sl-spacing-large: 1.25rem;
--sl-spacing-2x-large: 2.25rem;
--sl-button-font-size-medium: .875rem;
--sl-font-size-2x-large: 2.25rem;
--aa-font-size: calc(16 * 1px);
--sl-spacing-4x-large: 4.5rem;
--sl-font-size-medium: 1rem;
--sl-input-help-text-font-size-small: .75rem;
--sl-input-label-font-size-small: .875rem;
--sl-input-label-font-size-medium: 1rem;
--sl-font-size-4x-large: 4.5rem;
--sl-button-font-size-small: .75rem;
--btn-font-size: 13px;
--input-padding-right: 12px;
--sl-spacing-medium: 1rem;
--aa-spacing: calc(16 * 1 * 1px);
--sl-input-font-size-small: .875rem;
--aa-icon-size: 20px;
--sl-toggle-size-small: .875rem;
--sl-input-label-font-size-large: 1.25rem;
--sl-spacing-x-large: 1.75rem;
--sl-letter-spacing-normal: normal;
--aa-spacing-factor: 1;
--sl-letter-spacing-denser: -.03em;
--sl-letter-spacing-dense: -.015em;
--sl-font-size-x-large: 1.5rem;
--sl-input-letter-spacing: normal;
--sl-font-size-x-small: .75rem;
--sl-font-size-2x-small: .625rem;
--input-padding-left: 12px;
--btn-icon-size: 16px;
--sl-toggle-size-medium: 1.125rem;
--sl-tooltip-font-size: .875rem;
--sl-font-size-small: .875rem;
--sl-input-font-size-medium: 1rem;
--btn-padding: 20px;
--sl-tooltip-padding: .25rem .5rem;
--clearable-input-padding: 8px;
--clearable-input-size: 16px;
--sl-letter-spacing-loose: .075em;
--sl-input-spacing-large: 1.25rem;
--sl-input-font-size-large: 1.25rem;
```

### Typography

```css
--sl-line-height-dense: 1.4;
--sl-tooltip-line-height: 1.4;
--sl-line-height-loose: 2.2;
--sl-font-serif: Georgia, "Times New Roman", serif;
--sl-tooltip-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
--sl-line-height-normal: 1.8;
--aa-font-weight-semibold: 600;
--sl-font-weight-light: 300;
--sl-line-height-looser: 2.6;
--aa-font-family: inherit;
--sl-font-weight-normal: 400;
--sl-line-height-denser: 1;
--aa-font-weight-bold: 700;
--aa-font-weight-medium: 500;
--sl-tooltip-font-weight: 400;
--sl-input-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
--sl-font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
--sl-font-mono: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
--sl-font-weight-bold: 700;
--sl-input-font-weight: 400;
--sl-font-weight-semibold: 500;
```

### Shadows

```css
--sl-shadow-x-small: 0 1px 2px hsl(240 3.8% 46.1% / 6%);
--sl-shadow-large: 0 2px 8px hsl(240 3.8% 46.1% / 12%);
--aa-panel-shadow: 0 0 0 1px rgba(35, 38, 59, .1), 0 6px 16px -4px rgba(35, 38, 59, .15);
--sl-shadow-medium: 0 2px 4px hsl(240 3.8% 46.1% / 12%);
--sl-shadow-small: 0 1px 2px hsl(240 3.8% 46.1% / 12%);
--sl-shadow-x-large: 0 4px 16px hsl(240 3.8% 46.1% / 12%);
```

### Other

```css
--aa-base-z-index: 9999;
--announcement-height: 66px;
--zi-playbook-notice: calc(calc(9996 + 1) - 1);
--sl-input-height-small: 1.875rem;
--sl-transition-fast: .15s;
--site-nav-search-height: 56px;
--aa-scrollbar-width: 13px;
--zi-filter: 1000;
--sl-z-index-toast: 950;
--sl-transition-slow: .5s;
--zi-default-overlay: calc(calc(9996 + 1) + 3);
--zi-header: 9996;
--sl-input-height-medium: 2.5rem;
--aa-base-unit: 16;
--sl-input-required-content-offset: -2px;
--btn-height: 40px;
--sl-input-height-large: 3.125rem;
--sl-input-required-content: "*";
--site-nav-height: 92px;
--aa-panel-max-height: 650px;
--attachment-min-height: 100px;
--aa-search-input-height: 44px;
--zi-dropdown: 1000;
--zi-max: 99999999999;
--sl-z-index-tooltip: 1000;
--announcements-gutter: 0;
--zi-playbook-head: 2;
--site-nav-gutter: 40px;
--sl-transition-x-slow: 1s;
--aa-icon-stroke-width: 1.6;
--attachment-min-width: 100px;
--banner-gutter: 72px;
--attachment-max-width: 252px;
--zi-dialog: calc(calc(calc(9996 + 1) + 3) + 5);
--sl-z-index-drawer: 700;
--zi-playbook-customize: calc(calc(calc(9996 + 1) - 1) + 1);
--zi-shot-overlay: calc(9996 + 1);
--zi-sticky-job-header: calc(calc(calc(9996 + 1) + 1) + 1);
--zi-header-behind: calc(9996 - 1);
--zi-playbook-edit-links: calc(2 + 1);
--zi-autocomplete: calc(calc(9996 + 1) + 1);
--sl-transition-medium: .25s;
--sl-transition-x-fast: 50ms;
--aa-detached-modal-max-width: 680px;
--zi-tipsy: calc(calc(calc(9996 + 1) + 3) + 1);
--aa-detached-media-query: (max-width: 680px);
--aa-detached-modal-media-query: (min-width: 680px);
--aa-detached-modal-max-height: 500px;
--sl-z-index-dropdown: 900;
--zi-playbook-overlay: calc(9996 + 1);
--attachment-max-height: 252px;
--sl-z-index-dialog: calc(calc(9996 + 1) + 3);
--zi-attachment-overlay: calc(calc(9996 + 1) + 1);
```

### Semantic

```css
success: [object Object];
warning: [object Object];
error: [object Object];
info: [object Object];
```

## Breakpoints

| Name | Value | Type |
|------|-------|------|
| xs | 375px | max-width |
| 400px | 400px | min-width |
| sm | 460px | max-width |
| sm | 499px | max-width |
| sm | 500px | min-width |
| sm | 520px | max-width |
| sm | 530px | max-width |
| sm | 600px | max-width |
| sm | 660px | max-width |
| sm | 700px | max-width |
| md | 739px | max-width |
| md | 767px | max-width |
| md | 768px | min-width |
| md | 789px | max-width |
| md | 790px | min-width |
| md | 800px | min-width |
| md | 801px | min-width |
| 905px | 905px | min-width |
| 919px | 919px | max-width |
| 920px | 920px | min-width |
| 921px | 921px | min-width |
| 958px | 958px | max-width |
| 959px | 959px | max-width |
| lg | 960px | min-width |
| lg | 980px | max-width |
| lg | 990px | max-width |
| lg | 1010px | min-width |
| lg | 1050px | max-width |
| 1100px | 1100px | max-width |
| 1199px | 1199px | max-width |
| 1200px | 1200px | min-width |
| 1204px | 1204px | max-width |
| 1205px | 1205px | min-width |
| xl | 1228px | max-width |
| xl | 1240px | min-width |
| 1350px | 1350px | min-width |
| 1410px | 1410px | max-width |
| 1445px | 1445px | min-width |
| 2xl | 1600px | min-width |
| 1800px | 1800px | min-width |
| 1921px | 1921px | min-width |

## Transitions & Animations

**Easing functions:** `[object Object]`, `[object Object]`, `[object Object]`, `[object Object]`, `[object Object]`

**Durations:** `0.4s`, `0.3s`, `0.05s`, `0.1s`, `0.25s`, `0.2s`, `0.45s`, `0.15s`, `0.6s`, `0.5s`, `0.65s`, `0.07s`

### Common Transitions

```css
transition: all;
transition: 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
transition: 0.3s cubic-bezier(0.32, 0, 0.59, 0.03);
transition: color 0.05s cubic-bezier(0.32, 0, 0.59, 0.03), background-color 0.05s cubic-bezier(0.32, 0, 0.59, 0.03), border 0.05s cubic-bezier(0.32, 0, 0.59, 0.03), border-radius 0.05s cubic-bezier(0.32, 0, 0.59, 0.03), padding 0.05s cubic-bezier(0.32, 0, 0.59, 0.03);
transition: opacity 0.4s ease-in-out 0.1s;
transition: opacity 0.25s ease-in-out, visibility 0.25s;
transition: background-color 0.25s ease-out;
transition: 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
transition: color 0.1s;
transition: background-color 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Keyframe Animations

**skeleton-translate-d82d0ff5**
```css
@keyframes skeleton-translate-d82d0ff5 {
  100% { transform: translate(100%); }
}
```

**skeleton-translate-24eaf5a2**
```css
@keyframes skeleton-translate-24eaf5a2 {
  100% { transform: translate(100%); }
}
```

## Component Patterns

Detected UI component patterns and their most common styles:

### Buttons (26 instances)

```css
.button {
  background-color: rgb(255, 255, 255);
  color: rgb(13, 12, 34);
  font-size: 13px;
  font-weight: 600;
  padding-top: 0px;
  padding-right: 0px;
  border-radius: 50%;
}
```

### Cards (7 instances)

```css
.card {
  background-color: rgb(255, 255, 255);
  border-radius: 8px;
  box-shadow: rgba(27, 32, 50, 0.1) 0px 15px 50px 0px;
  padding-top: 0px;
  padding-right: 0px;
}
```

### Inputs (1 instances)

```css
.input {
  color: rgb(6, 3, 24);
  border-color: rgb(6, 3, 24);
  border-radius: 12px;
  font-size: 14px;
  padding-top: 0px;
  padding-right: 0px;
}
```

### Links (101 instances)

```css
.link {
  color: rgb(13, 12, 34);
  font-size: 14px;
  font-weight: 400;
}
```

### Navigation (136 instances)

```css
.navigatio {
  background-color: rgb(255, 255, 255);
  color: rgb(6, 3, 24);
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
  position: static;
  box-shadow: rgba(27, 32, 50, 0.1) 0px 15px 50px 0px;
}
```

### Footer (95 instances)

```css
.foote {
  background-color: rgb(158, 158, 167);
  color: rgb(13, 12, 34);
  padding-top: 0px;
  padding-bottom: 0px;
  font-size: 16px;
}
```

### Modals (17 instances)

```css
.modal {
  background-color: rgb(255, 255, 255);
  border-radius: 0px;
  box-shadow: rgba(27, 32, 50, 0.1) 0px 15px 50px 0px;
  padding-top: 0px;
  padding-right: 0px;
  max-width: 310px;
}
```

### Dropdowns (7 instances)

```css
.dropdown {
  background-color: rgb(255, 255, 255);
  border-radius: 8px;
  border-color: rgb(61, 61, 78);
  padding-top: 0px;
}
```

### Badges (2 instances)

```css
.badge {
  background-color: rgb(234, 76, 137);
  color: rgb(255, 255, 255);
  font-size: 8px;
  font-weight: 700;
  padding-top: 5px;
  padding-right: 10px;
  border-radius: 12px;
}
```

### Avatars (4 instances)

```css
.avatar {
  border-radius: 0px;
}
```

### Tooltips (6 instances)

```css
.tooltip {
  color: rgb(13, 12, 34);
  font-size: 14px;
  border-radius: 0px;
  padding-top: 0px;
  padding-right: 0px;
}
```

## Component Clusters

Reusable component instances grouped by DOM structure and style similarity:

### Button — 4 instances, 3 variants

**Variant 1** (2 instances)

```css
  background: rgb(61, 61, 78);
  color: rgb(158, 158, 167);
  padding: 0px 0px 0px 0px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0);
  font-size: 13px;
  font-weight: 600;
```

**Variant 2** (1 instance)

```css
  background: rgb(255, 255, 255);
  color: rgb(13, 12, 34);
  padding: 0px 0px 0px 0px;
  border-radius: 50%;
  border: 1px solid rgb(231, 231, 233);
  font-size: 13px;
  font-weight: 600;
```

**Variant 3** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(58, 53, 70);
  padding: 0px 0px 0px 0px;
  border-radius: 4px;
  border: 0px none rgb(58, 53, 70);
  font-size: 12px;
  font-weight: 400;
```

### Input — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(6, 3, 24);
  padding: 0px 0px 0px 24px;
  border-radius: 12px;
  border: 0px none rgb(6, 3, 24);
  font-size: 14px;
  font-weight: 400;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(58, 53, 70);
  padding: 0px 18.5px 0px 0px;
  border-radius: 8px;
  border: 0px none rgb(58, 53, 70);
  font-size: 14px;
  font-weight: 600;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(77, 170, 87);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(77, 170, 87);
  font-size: 11px;
  font-weight: 400;
```

### Button — 2 instances, 1 variant

**Variant 1** (2 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(13, 12, 34);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(13, 12, 34);
  font-size: 12px;
  font-weight: 400;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgb(13, 12, 34);
  color: rgb(255, 255, 255);
  padding: 0px 20px 0px 20px;
  border-radius: 1e+07px;
  border: 1px solid rgb(13, 12, 34);
  font-size: 13px;
  font-weight: 600;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(13, 12, 34);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(13, 12, 34);
  font-size: 14px;
  font-weight: 400;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgb(255, 255, 255);
  color: rgb(13, 12, 34);
  padding: 0px 0px 0px 0px;
  border-radius: 50%;
  border: 1px solid rgb(231, 231, 233);
  font-size: 13px;
  font-weight: 600;
```

### Button — 2 instances, 1 variant

**Variant 1** (2 instances)

```css
  background: rgb(255, 255, 255);
  color: rgb(13, 12, 34);
  padding: 0px 0px 0px 0px;
  border-radius: 50%;
  border: 1px solid rgb(231, 231, 233);
  font-size: 13px;
  font-weight: 600;
```

### Button — 2 instances, 1 variant

**Variant 1** (2 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(110, 109, 122);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(110, 109, 122);
  font-size: 12px;
  font-weight: 400;
```

### Button — 2 instances, 1 variant

**Variant 1** (2 instances)

```css
  background: rgb(243, 243, 244);
  color: rgb(110, 109, 122);
  padding: 0px 0px 0px 0px;
  border-radius: 50%;
  border: 0px none rgb(110, 109, 122);
  font-size: 12px;
  font-weight: 400;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgb(255, 255, 255);
  color: rgb(13, 12, 34);
  padding: 0px 24px 0px 24px;
  border-radius: 1e+07px;
  border: 1px solid rgb(231, 231, 233);
  font-size: 10px;
  font-weight: 600;
```

## Layout System

**22 grid containers** and **149 flex containers** detected.

### Container Widths

| Max Width | Padding |
|-----------|---------|
| 1172px | 0px |
| 1024px | 0px |
| 100% | 0px |
| 752px | 0px |
| 1200px | 32px |

### Grid Column Patterns

| Columns | Usage Count |
|---------|-------------|
| 2-column | 14x |
| 1-column | 4x |
| 4-column | 3x |
| 16-column | 1x |

### Grid Templates

```css
grid-template-columns: 204px 204px 204px 204px 204px 204px 204px 204px 204px 204px 204px 204px 204px 204px 204px 204px;
gap: 32px;
grid-template-columns: 293px 293px 293px 293px;
gap: 36px;
grid-template-columns: 320px 186.094px;
grid-template-columns: 230px 230px 230px 230px;
gap: 40px;
grid-template-columns: 320px 168.969px;
```

### Flex Patterns

| Direction/Wrap | Count |
|----------------|-------|
| row/nowrap | 123x |
| column/nowrap | 22x |
| row/wrap | 4x |

**Gap values:** `0px normal`, `10px`, `12px`, `12px 43.52px`, `14px`, `16px`, `16px 24px`, `32px`, `36px`, `40px`, `4px`, `4px 16px`, `5px`, `6px 12px`, `8px`, `normal 6px`

## Accessibility (WCAG 2.1)

**Overall Score: 80%** — 4 passing, 1 failing color pairs

### Failing Color Pairs

| Foreground | Background | Ratio | Level | Used On |
|------------|------------|-------|-------|---------|
| `#ffffff` | `#ea4c89` | 3.56:1 | FAIL | span (1x) |

### Passing Color Pairs

| Foreground | Background | Ratio | Level |
|------------|------------|-------|-------|
| `#0d0c22` | `#ffffff` | 19.22:1 | AAA |
| `#ffffff` | `#0d0c22` | 19.22:1 | AAA |
| `#6e6d7a` | `#ffffff` | 5.08:1 | AA |

## Design System Score

**Overall: 85/100 (Grade: B)**

| Category | Score |
|----------|-------|
| Color Discipline | 92/100 |
| Typography Consistency | 80/100 |
| Spacing System | 100/100 |
| Shadow Consistency | 90/100 |
| Border Radius Consistency | 90/100 |
| Accessibility | 80/100 |
| CSS Tokenization | 100/100 |

**Strengths:** Tight, disciplined color palette, Well-defined spacing scale, Clean elevation system, Consistent border radii, Good CSS variable tokenization

**Issues:**
- 1 WCAG contrast failures
- 187 !important rules — prefer specificity over overrides
- 91% of CSS is unused — consider purging
- 15022 duplicate CSS declarations

## Gradients

**1 unique gradients** detected.

| Type | Direction | Stops | Classification |
|------|-----------|-------|----------------|
| linear | 172deg | 2 | brand |

```css
background: linear-gradient(172deg, rgb(74, 96, 113) 14.52%, rgb(0, 0, 0) 108.51%);
```

## Z-Index Map

**10 unique z-index values** across 4 layers.

| Layer | Range | Elements |
|-------|-------|----------|
| modal | 9995,10000 | div.a.n.n.o.u.n.c.e.m.e.n.t.s. .a.n.n.o.u.n.c.e.m.e.n.t.s.-.-.d.a.r.k, div.s.i.t.e.-.n.a.v._._.d.a.r.k.-.o.v.e.r.l.a.y, div.s.i.t.e.-.n.a.v |
| dropdown | 899,999 | span.p.o.p.u.p.-.h.o.v.e.r.-.b.r.i.d.g.e, span.p.o.p.u.p.-.h.o.v.e.r.-.b.r.i.d.g.e, span.p.o.p.u.p.-.h.o.v.e.r.-.b.r.i.d.g.e |
| sticky | 11,11 | div.s.h.o.t.-.s.i.d.e.b.a.r |
| base | 1,3 | a, img.v.-.i.m.g. .c.o.n.t.e.n.t.-.b.l.o.c.k. .b.o.r.d.e.r.-.r.a.d.i.u.s.-.8, a |

**Issues:**
- [object Object]

## SVG Icons

**35 unique SVG icons** detected. Dominant style: **outlined**.

| Size Class | Count |
|------------|-------|
| xs | 3 |
| sm | 15 |
| md | 15 |
| xl | 2 |

**Icon colors:** `currentColor`, `#655C7A`, `rgb(13, 12, 34)`, `white`, `rgb(110, 109, 122)`, `#979797`

## Font Files

| Family | Source | Weights | Styles |
|--------|--------|---------|--------|
| IBM Plex Mono | google-fonts | 500 | normal |
| Source Serif 4 | google-fonts | 400, 600 | normal |
| Mona Sans | self-hosted | 200 900 | normal |
| WF Visual Sans | self-hosted | 600, normal | normal |
| Inter Regular | self-hosted | normal | normal |
| Inter Semibold | self-hosted | 600 | normal |
| Walsheim | self-hosted | 400 | normal |

**Google Fonts URL:** `https://fonts.googleapis.com/`

## Image Style Patterns

| Pattern | Count | Key Styles |
|---------|-------|------------|
| thumbnail | 55 | objectFit: fill, borderRadius: 0px, shape: square |
| avatar | 2 | objectFit: fill, borderRadius: 50%, shape: circular |
| general | 2 | objectFit: contain, borderRadius: 8px, shape: rounded |

**Aspect ratios:** 1:1 (41x), 4:3 (17x), 3.24:1 (1x)

## Motion Language

**Feel:** springy · **Scroll-linked:** yes

### Duration Tokens

| name | value | ms |
|---|---|---|
| `instant` | `50ms` | 50 |
| `xs` | `100ms` | 100 |
| `sm` | `200ms` | 200 |
| `md` | `300ms` | 300 |
| `lg` | `450ms` | 450 |

### Easing Families

- **spring** (10 uses) — `cubic-bezier(0.34, 1.56, 0.64, 1)`, `cubic-bezier(0.68, -0.55, 0.265, 1.2)`
- **ease-in** (20 uses) — `cubic-bezier(0.32, 0, 0.59, 0.03)`
- **ease-in-out** (34 uses) — `ease`
- **custom** (2 uses) — `cubic-bezier(0.87, 0, 0.13, 1)`
- **linear** (1 uses) — `linear`

### Spring / Overshoot Easings

- `cubic-bezier(0.34, 1.56, 0.64, 1)`
- `cubic-bezier(0.68, -0.55, 0.265, 1.2)`

## Component Anatomy

### button — 18 instances

**Slots:** label, icon
**Variants:** tertiary · primary

| variant | count | sample label |
|---|---|---|
| default | 11 | Shots |
| tertiary | 6 | View comments
71 |
| primary | 1 |  |

## Brand Voice

**Tone:** neutral · **Pronoun:** third-person · **Headings:** unknown (tight)

### Top CTA Verbs

- **client** (2)
- **get** (2)
- **view** (2)
- **shots** (1)
- **available** (1)
- **share** (1)
- **detail** (1)
- **previous** (1)

### Button Copy Patterns

- "client@fireart.studio" (2×)
- "shots" (1×)
- "available for work" (1×)
- "get in touch" (1×)
- "view comments
71
share actions
detail actions" (1×)
- "view comments
71" (1×)
- "share actions" (1×)
- "detail actions" (1×)
- "previous" (1×)
- "next" (1×)

## Page Intent

**Type:** `blog-post` (confidence 0.6)
**Description:** Coursue Learning Platform Dashboard designed by Fireart UI/UX for Fireart Studio. Connect with them on Dribbble; the global community for designers and creative professionals.

## Section Roles

Reading order (top→bottom): nav → nav → content → content → footer

| # | Role | Heading | Confidence |
|---|------|---------|------------|
| 0 | nav | — | 0.9 |
| 1 | nav | — | 0.4 |
| 2 | content | — | 0.3 |
| 3 | content | — | 0.3 |
| 4 | footer | — | 0.4 |

## Material Language

**Label:** `flat` (confidence 0)

| Metric | Value |
|--------|-------|
| Avg saturation | 0.261 |
| Shadow profile | soft |
| Avg shadow blur | 0px |
| Max radius | 50px |
| backdrop-filter in use | no |
| Gradients | 1 |

## Imagery Style

**Label:** `flat-illustration` (confidence 0.023)
**Counts:** total 59, svg 39, icon 39, screenshot-like 0, photo-like 0
**Dominant aspect:** square-ish
**Radius profile on images:** square

## Component Screenshots

8 retina crops written to `screenshots/`. Index: `*-screenshots.json`.

| Cluster | Variant | Size (px) | File |
|---------|---------|-----------|------|
| button--tertiary | 0 | 24 × 24 | `screenshots/button-tertiary-0.png` |
| button--tertiary | 1 | 40 × 40 | `screenshots/button-tertiary-1.png` |
| button--tertiary | 2 | 40 × 40 | `screenshots/button-tertiary-2.png` |
| input--default | 0 | 273 × 54 | `screenshots/input-default-0.png` |
| button--default | 0 | 57 × 40 | `screenshots/button-default-0.png` |
| button--default | 1 | 87 × 12 | `screenshots/button-default-1.png` |
| button--default | 2 | 111 × 15 | `screenshots/button-default-2.png` |
| button--primary | 0 | 40 × 40 | `screenshots/button-primary-0.png` |

Full-page: `screenshots/full-page.png`

## Quick Start

To recreate this design in a new project:

1. **Install fonts:** Add `Mona Sans` from Google Fonts or your font provider
2. **Import CSS variables:** Copy `variables.css` into your project
3. **Tailwind users:** Use the generated `tailwind.config.js` to extend your theme
4. **Design tokens:** Import `design-tokens.json` for tooling integration
