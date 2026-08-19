# Basketful — Mini E-Commerce Store

A small storefront built with plain **HTML, CSS, and JavaScript** — no frameworks, no backend, no build tools.

## Features

- **Product catalog** — 12 products across 4 categories, defined as plain JS data (`products.js`)
- **Search** — live filtering by product name or category
- **Category filter** — chip-style navigation
- **Sort** — by price (low/high) or rating
- **Quick view** — click a product to see a larger description
- **Shopping cart** — add/remove items, adjust quantity, running subtotal
- **Cart persistence** — the basket is saved to `localStorage`, so it survives a page refresh
- **Checkout flow** — clears the cart and shows an order confirmation
- **Fully responsive** — works down to small mobile screens
- **Keyboard support** — Escape closes any open modal or the cart drawer; all interactive elements are reachable by keyboard

## Why I built this

I wanted a project that goes beyond a static page — something with real interactive logic (state, filtering, cart math, persistence) that's still small enough to fully understand and explain end to end. Every line here is something I can walk through and justify.

## Tech stack

- HTML5
- CSS3 (custom properties, Grid/Flexbox, no frameworks)
- Vanilla JavaScript (ES6+, no libraries)
- `localStorage` for cart persistence
- Fonts: Fraunces, Inter, IBM Plex Mono (Google Fonts)

## How to run it

No build step, no dependencies. Two ways:

**Option A — just open it**
Double-click `index.html` and it opens in your browser. Everything works client-side.

**Option B — serve it locally** (recommended, avoids some browser file:// quirks)
```bash
# from inside the project folder
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```
If you don't have Python, any static server works, e.g. with Node:
```bash
npx serve .
```

## Project structure

```
.
├── index.html      # page structure and markup
├── styles.css      # design system: colors, type, layout, components
├── products.js     # product catalog data
├── script.js       # app logic: filtering, cart, checkout, modals
└── README.md
```

## Possible next steps

- [ ] Product image gallery instead of icon placeholders
- [ ] Wishlist / "save for later"
- [ ] Order history using localStorage
- [ ] Form validation on checkout

## About me

Computer engineering graduate based in Iran, applying to IT/network and web development Ausbildung programs in Germany. Open to internships and entry-level opportunities.

**Arta Solhivand**
- Email: itsartasolhi@gmail.com
- GitHub: [@artasolhivand](https://github.com/artasolhivand)
