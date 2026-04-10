# Gautam Jagthap — Developer Portfolio

A personal portfolio website built with vanilla HTML, CSS, and JavaScript. Dark editorial design with smooth animations, fully responsive across all devices, and **data-driven** — all content is managed through a single `data.json` file with zero framework overhead.

---

## Live Demo

> 🔗 [https://gautamjagthap.vercel.app/](https://gautamjagthap.vercel.app/)

---

## Project Structure

```
portfolio/
├── index.html       # Markup shell — no hardcoded content
├── style.css        # All styles, animations, and responsive breakpoints
├── script.js        # Data fetching, DOM rendering, and interactions
└── data.json        # ✦ Single source of truth for all content
```

---

## How It Works

`script.js` fetches `data.json` on page load and dynamically renders every section of the page — hero text, skills, projects, contact links, and footer. To update any content, you only ever touch `data.json`.

```
data.json → fetch() → render functions → DOM
```

No build step. No framework. No dependencies.

---

## Updating Your Content

Open `data.json` and edit the relevant section. Every field maps directly to what's visible on the page.

### Personal Info & Meta
```json
"meta": {
  "title": "Your Name — Your Role",
  "logo": "YN.dev",
  "availableText": "Available for Opportunities"
}
```

### Hero Section
```json
"hero": {
  "firstName": "Your",
  "lastName": "Name",
  "role": "Data Engineer",
  "roleAccent": "Analyst",
  "description": "Your one-liner bio here."
}
```

### Adding / Editing a Project
```json
{
  "id": "001",
  "size": "large",
  "title": "Project Title",
  "description": "What problem it solves and what you built.",
  "tags": ["Python", "SQL", "Power BI"],
  "links": [
    { "label": "GitHub", "url": "https://github.com/you/project" },
    { "label": "Live",   "url": "https://yourproject.com" }
  ]
}
```

**Project sizes** control the grid layout:

| Size | Columns spanned | Best for |
|------|----------------|----------|
| `large` | 7 / 12 | Featured project, long description |
| `medium` | 5 / 12 | Secondary project |
| `full` | 12 / 12 | Standalone full-width card |

### Adding an Experience Entry
```json
{
  "date": "Jun 2024 – Aug 2024",
  "role": "Data Analyst Intern",
  "company": "Company Name · City",
  "description": "What you did and what impact you made.",
  "tags": ["Python", "SQL", "Power BI"]
}
```

### Resume Download Link
```json
"resume": {
  "downloadUrl": "/Gautam_Jagthap_Resume.pdf"
}
```
Place your PDF in the same folder as `index.html` and update the path.

---

## Running Locally

Because `script.js` uses `fetch('data.json')`, you need a local server — browsers block file fetches for security. Two easy options:

**Option 1 — VS Code Live Server**
Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), right-click `index.html` → *Open with Live Server*.

**Option 2 — Python**
```bash
python -m http.server 3000
# then open http://localhost:3000
```

**Option 3 — Node.js**
```bash
npx serve .
```

---

## Deploying

### Vercel (recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project folder
vercel
```
Or drag and drop the folder at [vercel.com/new](https://vercel.com/new).

### Netlify
Drag and drop the project folder at [app.netlify.com](https://app.netlify.com).

### GitHub Pages
1. Push the folder to a GitHub repository
2. Go to **Settings → Pages → Source → Deploy from branch**
3. Select `main` branch → Save

---

## Features

- **JSON-driven content** — edit one file, everything updates
- **Dark editorial design** — custom typography with Syne, Instrument Serif & DM Mono
- **Custom animated cursor** with a lagging ring (hidden on touch devices)
- **Tabbed About section** — Intro, Experience, Skills, Resume tabs
- **Animated mobile nav drawer** — wipe-down open, staggered link entrance, ESC / backdrop / close button to dismiss
- **Hamburger → X morph** animation
- **Infinite skills marquee** ticker
- **Scroll reveal** animations on all sections
- **Fully responsive** — 8 breakpoints from 4K down to 360px
- **`prefers-reduced-motion`** support — all animations disabled for accessibility
- **Zero dependencies** — no npm, no build step, no framework

---

## Customisation

### Changing the Accent Color
Open `style.css` and update the two accent variables at the top:

```css
:root {
  --accent:  #4fffb0;  /* Primary green — change this */
  --accent2: #4f8fff;  /* Secondary blue — change this */
}
```

### Changing Fonts
Replace the Google Fonts `<link>` in `index.html` and update the three font variables:

```css
:root {
  --font-display: 'Syne', sans-serif;
  --font-serif:   'Instrument Serif', serif;
  --font-mono:    'DM Mono', monospace;
}
```

---

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome / Edge | ✅ Full |
| Firefox | ✅ Full |
| Safari (iOS + macOS) | ✅ Full (`-webkit-` prefixes included) |
| Samsung Internet | ✅ Full |
| Opera | ✅ Full |

---

## License

This portfolio is personal. Feel free to use it as a reference or starting point, but please don't deploy it as-is with someone else's content.

---

*Built with intention — Gautam Jagthap, 2026*
