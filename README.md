# CLONEFLIX

A frontend-only Netflix clone built for practice with HTML, CSS, and Bootstrap 5. No backend, no real authentication — just a static UI with a bit of vanilla JavaScript for interactivity.

> This is a practice project for learning purposes only. Not affiliated with Netflix, Inc.

## Pages

| File | Description |
|---|---|
| `index.html` | Home page — hero banner, trending/popular/top-10 rows, genre grid |
| `movies.html` | Movies catalog |
| `tvshows.html` | TV shows catalog |
| `popular.html` | New & Popular catalog |
| `mylist.html` | User's saved list (static placeholder data) |
| `login.html` | Sign in form (no real auth) |
| `signup.html` | Create account form (no real auth) |

## Features

- **Responsive layout** — Bootstrap 5 grid, mobile-friendly navbar with collapse menu.
- **Netflix-style UI** — hero banner, hover-expand movie cards, badges, genre tiles.
- **Skeleton loading** — every card grid shows animated shimmer placeholders for ~3 seconds on page load before the real cards fade in (see `script.js` → `initSkeletonLoading()`). Purely a UI simulation of a network fetch; no real data is loaded.
- **Live search** — clicking the search icon in the navbar expands an input field. Typing filters the visible cards on the current page by title and genre in real time, and shows a "no matches" message when nothing fits (see `script.js` → `initSearch()`).

## File structure

```
cloneflix/
├── index.html
├── movies.html
├── tvshows.html
├── popular.html
├── mylist.html
├── login.html
├── signup.html
├── style.css      # all custom styling (Bootstrap is loaded via CDN)
└── script.js       # skeleton loading + search bar logic
```

## Tech used

- HTML5 / CSS3
- [Bootstrap 5.3.3](https://getbootstrap.com/) (via CDN — layout, grid, navbar, forms)
- Vanilla JavaScript (no frameworks, no build step)
- [Lorem Picsum](https://picsum.photos/) for placeholder poster/banner images

## Running it locally

No build tools or dependencies required — it's static HTML/CSS/JS.

1. Download/clone the files into one folder (they all reference each other with relative paths, e.g. `./style.css`, `./script.js`).
2. Open `index.html` directly in a browser, **or** serve the folder locally for the most accurate behavior:
   ```bash
   npx serve .
   # or
   python3 -m http.server 8000
   ```
3. Navigate the site from the navbar — Home, TV Shows, Movies, New & Popular, My List, Sign In / Sign Up.

## Known limitations

- No backend — sign in / sign up forms don't create or validate real accounts.
- "My List", "+ My List" buttons, and notifications are static/decorative.
- Search only filters cards already present on the current page; it doesn't fetch or search across the whole site.
- All movie/show data is hardcoded in the HTML.

## Credits

Built as a frontend practice project. Poster and banner images from Lorem Picsum; icons are inline SVGs (Bootstrap Icons paths).
