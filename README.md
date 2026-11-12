# helloabdulsamad.github.io

Abdulsamad Osunlana's portfolio. Live at [helloabdulsamad.github.io](https://helloabdulsamad.github.io).

## How the site is put together

The site has two parts. The deploy builds both and joins them into one folder.

| Page | Comes from | Built with |
|---|---|---|
| `/` home page with the work cards | `site/index.html`, `site/data.js`, `site/main.js`, `site/styles.css` | Plain HTML, CSS and JavaScript. No build step |
| `/milo/` Milo product page | `site/milo/` | Plain HTML |
| `/about` | `app/about/` | Next.js (static export) |
| `/sitemap.xml`, `/robots.txt`, social preview image | `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx` | Next.js |

`.github/workflows/deploy-pages.yml` runs `npm run build` with `GITHUB_PAGES=true`, which writes the Next.js pages to `out/`. It then copies everything in `site/` over `out/` and publishes `out/` to GitHub Pages. Every push to `main` publishes the live site.

## Folders

```
site/                 Home page and Milo page, served as they are
  index.html          Home page markup
  data.js             The work cards and their case studies
  main.js             Cards, case study sheet, menu and scroll motion
  styles.css          Home page styles
  img/work/           One 1600 x 1000 image per work card
  milo/               Milo product page
  fonts/, vendor/     Geist fonts, GSAP, ScrollTrigger and Lenis
app/                  Next.js: the About page and site metadata
  about/              About page
  components/         Menu, header, footer and theme switch used by About
  lib/site.ts         Name, title, description and site URL
public/               Images used by the About page
```

## Adding a project to the home page

1. Add an entry to `site/data.js`. The cards appear in the order of the list.
2. Add a 1600 x 1000 WebP image to `site/img/work/` and point `shot` at it.
3. Change the `?v=` number on the `styles.css`, `data.js` and `main.js` links in `site/index.html`, so visitors get the new files.

Each entry holds the card text (`name`, `status`, `period`, `tag`, `ink`, `paper`) and the five parts of the case study (`problem`, `role_text`, `approach`, `decisions`, `outcome`).

## Working on it locally

```bash
npm install
```

```bash
npm run dev
```

`npm run dev` serves the About page at http://localhost:3000/about. To see the home page as it will look live, build it the way the deploy does and serve `out/`:

```bash
GITHUB_PAGES=true npm run build && cp -R site/. out/ && npx serve out
```
