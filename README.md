# FedCareAI website

The public introduction to FedCareAI, prepared as an independent repository for GitHub Pages. Plain HTML, CSS, and JavaScript; no package installation or build step is required.

This repository contains website content only. The [public Python library](https://github.com/FedCareAI/fedcareai) and the separately maintained private coordination platform remain independent projects. The website does not host the platform or run model training.

## Preview locally

From this folder:

```powershell
python -m http.server 8080 --directory site
```

Open http://localhost:8080. Stop the server with Ctrl+C.

## GitHub repository

The website repository is [FedCareAI/fedcareai-web](https://github.com/FedCareAI/fedcareai-web), using the `main` branch. To work from a fresh checkout:

```powershell
git clone https://github.com/FedCareAI/fedcareai-web.git
cd fedcareai-web
```

Commit website changes and push to `main` to trigger the deployment workflow.

## Enable GitHub Pages

In the new repository, open **Settings → Pages** and choose **GitHub Actions** as the source. If the initial workflow ran before Pages was enabled, run **Actions → Deploy website to GitHub Pages → Run workflow** again.

Every push to `main` deploys `site/` using `.github/workflows/deploy-pages.yml`. The workflow reports the deployed URL. The project website address is `https://fedcareai.github.io/fedcareai-web/` once Pages is enabled and deployment succeeds. Relative asset paths support this project subpath.

See [GitHub's custom Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Edit the site

- `site/index.html`: copy, sections, code examples, and public library links.
- `site/styles.css`: responsive layout, colors, and typography.
- `site/script.js`: accessible workflow tabs and installation copy button.
- `site/assets/favicon.svg`: site icon.

All assets are local. There are no trackers, external font dependencies, signup forms, or backend services. CLI examples follow the library README and use its synthetic demo files. The installation section creates those files; the training example assumes each participating site has produced its own update.

No website license has been selected. Choose one before inviting reuse; the linked Python library has its own GPL-3.0-only license.
