# CSV Viewer

A React app to upload, view, and filter CSV files in the browser.

## Features
- Drag & drop CSV upload
- Per-column text filtering
- Live stats (total rows, filtered count, columns)
- Paginated table (20 rows per page)
- Responsive design

## Tech Stack
- React 18
- PapaParse (CSV parsing)
- CSS Modules

---

## Run Locally

```bash
npm install
npm start
```

App runs at `http://localhost:3000`

---

## Deploy to Vercel

### Option 1 — Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option 2 — GitHub + Vercel Dashboard
1. Push this repo to GitHub
2. Go to https://vercel.com/new
3. Import your GitHub repo
4. Framework: **Create React App** (auto-detected)
5. Click **Deploy**

No environment variables needed.
