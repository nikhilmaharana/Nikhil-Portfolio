# Nikhil Maharana — Portfolio

A self-contained, database-free personal portfolio site. Plain HTML/CSS/JS
with a Three.js "Digital Core" hero — no build step required.

## Structure

```
index.html          Page markup (all sections)
css/style.css        Design system + all styling
js/data.js            <- EDIT THIS to change any text, links, or content
js/render.js          Reads data.js and fills in the page (no content lives here)
js/os.js               NIKHIL.OS — local search/command palette (no external API)
js/core3d.js           The Digital Core hero scene (Three.js, loaded from CDN)
js/main.js             Entry screen, nav, orientation modes, scroll reveal
images/                 Photos used across the site
resume/                 The résumé PDF served for viewing/downloading
robots.txt, sitemap.xml SEO basics
```

## Run locally

No build tools needed. From this folder, run any static file server, e.g.:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

(Opening `index.html` directly by double-clicking also works in most browsers,
though a local server is recommended so the fetch of `resume/*.pdf` behaves
consistently.)

## Edit content

Everything text-based — name, links, résumé filename, journey steps,
experience, skills, projects, music links, contact copy — lives in
**`js/data.js`**. Change a value there and reload; no other file needs
touching for content edits.

## Replace photos

Drop a new image into `images/` and update the matching path in
`js/data.js` under `images: { ... }`, or swap the `src` directly in
`index.html` if you're replacing an image 1:1.

## Replace the résumé

Put the new PDF in `resume/` and update `resume.path` /
`resume.fileName` in `js/data.js`.

## Update social links

Edit the `socialLinks` object in `js/data.js`. Every card on the site
(nav, Signal section, social hub, contact) reads from this one object.

## The Digital Core (3D)

`js/core3d.js` loads Three.js from a public CDN
(`unpkg.com/three@0.128.0`) and builds a particle sphere with a
drifting outer field and connective rings. It fails silently if
Three.js doesn't load (e.g. offline, blocked CDN, or `prefers-reduced-motion`
reduces it to a single static frame) — the rest of the site works fully
without it. To swap in a real 3D model later, replace the geometry setup
in `core3d.js` with a `GLTFLoader` call; keep the same canvas element.

## NIKHIL.OS

`js/os.js` is a local keyword-matching index over the same content in
`data.js` — no external LLM call, no fabricated answers. To add new
searchable entries (e.g. a new project), add an `add(...)` line inside
`buildIndex()`.

## Deploy — Cloudflare Pages (free)

1. Push this folder to a GitHub repository.
2. In Cloudflare Pages, create a new project connected to that repo.
3. Build command: *(none)* — leave blank.
4. Build output directory: `/` (project root).
5. Deploy. Your site is live on a free `*.pages.dev` subdomain.
6. Optional: add a custom domain under the Pages project's **Custom domains** tab.

Any other static host (GitHub Pages, Netlify, Vercel static) works the
same way — there's no server, database, or environment variable to
configure.

## Contact form

There is no backend or database. The Contact section uses a `mailto:`
link straight to Nikhil's email. If a richer form is wanted later, wire
the same section up to a static-compatible form service (e.g. Formspree)
without adding a database.

## Accessibility & performance notes

- All content is real HTML — nothing is hidden behind the 3D canvas.
- Keyboard navigation, visible focus states, and `prefers-reduced-motion`
  are all respected (`core3d.js` and `style.css`).
- The hero 3D scene pauses rendering when scrolled out of view, and
  scales particle count down on small viewports.
- Images use `loading="lazy"`.
