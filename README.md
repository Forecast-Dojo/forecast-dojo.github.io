# Forecast Dojo website

Source for [forecast-dojo.github.io](https://forecast-dojo.github.io).
This is a static React and Vite site with hash-based navigation.

## Run locally

Requires Node.js 20 or newer. From this repository's root:

```powershell
npm ci
npm run dev
```

Open the local address printed by Vite. To check the production build:

```powershell
npm run build
npm run preview
```

## Publish

In the GitHub repository, select **Settings → Pages → Source → GitHub Actions**.
The included workflow builds and deploys the site when changes are pushed to
`main`, and can also be run manually from the Actions tab.

## Website files and data

- `src/`: pages, charts, navigation, and styles.
- `public/`: the site icon, paper figure, and published data snapshot.
- `index.html`, `package.json`, `package-lock.json`, and the TypeScript and Vite
  configuration: files needed to develop and build the site.
- `.github/workflows/pages.yml`: GitHub Pages deployment.

The summaries, question index, and question chunks in `public/data/` are sufficient
to build and publish the site. Forecast trajectories, notebooks, and tool records
load on demand from the public Hugging Face dataset at the revision pinned in
`public/data/manifest.json`; no API key or backend is required.

Data generation stays in the research repository. To publish a refreshed snapshot,
replace `public/data/` with its generated website data and retain a matching
Hugging Face revision in the manifest.
