# Deployment Guide

## First-time setup

### 1. Install dependencies and run locally

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # production build → dist/
npm run preview      # preview the production build locally
```

### 2. Push to GitHub

Make sure your repository is pushed to GitHub. The Actions workflow in
`.github/workflows/deploy.yml` will trigger automatically on every push to `main`.

### 3. Enable GitHub Pages

In your repository on GitHub:

1. Go to **Settings → Pages**
2. Under **Source**, select **GitHub Actions** (not "Deploy from a branch")
3. Save — the first workflow run will deploy your site

Your site will be live at `https://yourusername.github.io/your-repo-name/` (or your custom domain).

---

## Custom domain setup

### Option A — Apex domain (`yourdomain.com`)

1. Buy the domain from any registrar (Namecheap, Cloudflare, etc.)

2. In your DNS provider, add **four A records** pointing to GitHub's IP addresses:

   | Type | Host | Value          |
   |------|------|----------------|
   | A    | @    | 185.199.108.153 |
   | A    | @    | 185.199.109.153 |
   | A    | @    | 185.199.110.153 |
   | A    | @    | 185.199.111.153 |

   Also add a `CNAME` for `www` → `yourusername.github.io`

3. Add a `CNAME` file to `public/` containing only your domain:

   ```
   yourdomain.com
   ```

4. In GitHub → **Settings → Pages → Custom domain**, enter `yourdomain.com`
   and check **Enforce HTTPS** (available once DNS propagates, ~30 min).

5. In `vite.config.js`, confirm `base: '/'` (already set).

6. In `astro.config.mjs` / `index.html` / anywhere you reference the site URL,
   update to `https://yourdomain.com`.

### Option B — Subdomain (`www.yourdomain.com`)

1. Add a `CNAME` DNS record:

   | Type  | Host | Value                        |
   |-------|------|------------------------------|
   | CNAME | www  | yourusername.github.io       |

2. Put `www.yourdomain.com` in `public/CNAME` and in GitHub Pages settings.

### Option C — No custom domain (`yourusername.github.io/repo-name`)

1. In `vite.config.js`, change the `base` to match your repo name:

   ```js
   base: '/your-repo-name/',
   ```

2. In `public/404.html`, change `pathSegmentsToKeep` from `0` to `1`:

   ```js
   var pathSegmentsToKeep = 1;
   ```

3. No DNS changes needed — just enable GitHub Pages as above.

---

## Adding a new project

Open [`src/data/projects.js`](src/data/projects.js) and add a new entry to the
`projects` array:

```js
{
  id: 'my-new-project',        // becomes the URL: /projects/my-new-project
  title: 'My New Project',
  shortDescription: 'One-sentence summary shown on the project card.',
  thumbnail: '/images/projects/my-new-project-thumb.jpg',
  date: '2025-06',
  role: 'Pipeline TD',
  tools: ['Python', 'Houdini'],
  tags: ['Pipeline'],
  featured: true,              // show on the home page grid

  sections: [
    { type: 'text', heading: 'Overview', body: 'What this project is...' },
    { type: 'video', src: '/videos/my-new-project.mp4', caption: 'Demo' },
    { type: 'code', language: 'python', code: 'print("hello")', caption: 'Example' },
    { type: 'gallery', images: [{ src: '/images/...', alt: 'Screenshot' }] },
    {
      type: 'stats',
      heading: 'Results',
      rows: [{ metric: 'Time saved', before: '2 hrs', after: '5 min' }],
    },
  ],
},
```

Drop videos under `public/videos/` and images under `public/images/projects/`.
That's it — the project card and detail page are generated automatically.

---

## Available section types

| Type          | Required fields                              | Optional fields            |
|---------------|----------------------------------------------|----------------------------|
| `text`        | `body`                                       | `heading`                  |
| `video`       | `src` (or `sources` array)                   | `poster`, `caption`, `gif` |
| `code`        | `code`, `language`                           | `caption`                  |
| `gallery`     | `images` (array of `{ src, alt }`)           | `heading`                  |
| `before-after`| `before`, `after` (each `{ src, alt }`)     | `initialSplit`, `caption`  |
| `stats`       | `rows` (array of `{ metric, before, after }`)| `heading`                  |

For `video`, you can supply multiple formats for broader browser support:

```js
{
  type: 'video',
  sources: [
    { src: '/videos/demo.webm', type: 'video/webm' },
    { src: '/videos/demo.mp4',  type: 'video/mp4' },
  ],
  caption: 'Demo',
}
```
