# GuessMaster Pro — Zero-to-Offer Guesstimate Coach

An interactive, zero-dependency web app for mastering consulting & Product Management guesstimates—packed with **87 solved cases**, visual issue trees, live sensitivity sliders, guided step-by-step coaching, flashcards, rapid-fire mental math drills, and a timed mock interview workbench.

---

## Features
- **Crash Course Roadmap:** 5-stage fast-track checklist designed for zero-experience beginners.
- **Learn the Approach:** 6-step universal algorithm with word-for-word scripts, Approach Decision Wizard, 12 pattern-recognition drills, and 6 master archetypes.
- **87 Solved Cases:** Compiled from 180DC SRCC (Vol 1 & 2), IIT Guwahati *Guess-It-Matters*, and top MBB/PM interview questions with live "What-If" sliders and sanity checks.
- **Guided Practice Coach & Mock Workbench:** 5-step solver with order-of-magnitude grading, 10/15/20-min timer, interactive tree builder, and 30-second Pyramid pitch generator.
- **Eye-Care Themes & Progress Backup:** Switch between *Midnight Aurora*, *Warm Paper*, and *Nordic Slate*, adjust font size, and export/import progress JSON via **Settings & Backup**.

---

## Option 1: Push & Host on GitHub Pages (Free)

This folder is already a ready-to-push Git repository!

1. Create a new empty repository on [GitHub](https://github.com/new) (e.g., `guessmaster-pro` — do **not** initialize with README/gitignore).
2. Double-click **`push-to-github.bat`** (or run `./push-to-github.ps1` in PowerShell) and paste your GitHub repo URL when prompted.
   Or run manually in PowerShell inside this folder:
   ```powershell
   git remote add origin https://github.com/YOUR_USERNAME/guessmaster-pro.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions** (the included `.github/workflows/deploy-pages.yml` handles deployment automatically on every push!).

---

## Option 2: Host on Vercel (1-Click Auto-Deploy)

1. Push this folder to GitHub using the steps above.
2. Go to [Vercel](https://vercel.com/new), import your `guessmaster-pro` GitHub repository, and click **Deploy** (no build step needed — `vercel.json` is pre-configured!).
   - Or deploy directly from your terminal with Vercel CLI:
     ```bash
     npx vercel --prod
     ```

---

## Updating Settings, Content, or Fixing Bugs Later

- To add/edit cases: edit `data/problems_vol1.js`, `data/problems_vol2.js`, or `data/problems_iitg_web.js`.
- To update benchmarks/flashcards: edit `data/cheatsheet.js`.
- To tweak UI colors/themes: edit CSS variables in `styles.css`.
- Whenever you make changes inside this folder, simply double-click **`push-to-github.bat`** — it commits your changes and pushes to `main`, automatically redeploying your live GitHub Pages / Vercel site!
