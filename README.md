# FedCareAI website

A scrolling presentation for Vedant Bahel's PyCon Ireland talk. Black background, blue/green accents, and locally hosted Space Grotesk typography. Built with static HTML, CSS, and JavaScript; no dependencies or build step.

Live: https://fedcareai.github.io/fedcareai-web/

## Present

Scroll normally, use the footer arrows, or navigate with the keyboard:

| Key | Action |
| --- | --- |
| Arrow keys / Page Up / Page Down | Previous or next section |
| Space / Shift+Space | Next or previous section |
| Home / End | First or last section |
| F | Toggle fullscreen |
| N | Toggle speaker notes for the current section |
| Escape | Close an enlarged screenshot or speaker notes |

The top navigation jumps to the three chapters. Click a platform screenshot to enlarge it. Code panels have copy buttons. Speaker notes appear in the current window, so keep them closed while projecting to the audience.

The presentation follows 19 sections over a 25-minute talk, with five minutes for questions. The displayed times are planned cues, not a running timer. All fonts, screenshots, styles, and scripts are local, so a checkout can be presented without internet access; GitHub and reading links require a connection.

## Preview

```powershell
python -m http.server 8080 --directory site
```

Open http://localhost:8080. Stop with Ctrl+C.

## Edit and deploy

- `site/index.html`: presentation content, section timing, and `data-notes` speaker notes.
- `site/styles.css`: dark theme, responsive presentation layout, and print styles.
- `site/script.js`: navigation, progress, notes, fullscreen, image enlargement, and copying.
- `site/assets/`: screenshots, favicon, and the font with its OFL license.

Push to `main` to deploy `site/` through `.github/workflows/static.yml`. GitHub Pages must use **GitHub Actions** as its source. One workflow is retained to avoid competing deployments.

## Content and assets

Platform screenshots are actual local UI captures from synthetic browser tests in the sibling `fedcareai-platform` checkout. They contain example.org accounts and synthetic project/results data; the shown accuracy is a test value, not clinical evidence. They are saved images, not a live platform connection.

Commands and schema examples follow the public [FedCareAI library](https://github.com/FedCareAI/fedcareai) and its integration guide. The standalone Python example expects the synthetic demo setup described in that repository. CLI multi-line examples use POSIX shell continuations; on PowerShell use one line or replace the trailing backslashes with PowerShell backticks.

The talk's clinical motivation is supported by [pediatric AI governance](https://www.nature.com/articles/s41746-025-02000-7) and [federated digital health](https://pmc.ncbi.nlm.nih.gov/articles/PMC7490367/). Speaker notes distinguish current implementation from design goals and future work.

Space Grotesk is bundled from [Google Fonts](https://github.com/google/fonts/tree/main/ofl/spacegrotesk) under the SIL Open Font License; see `site/assets/fonts/OFL-SpaceGrotesk.txt`. The Python library and separately maintained platform have their own licensing terms.

