# CSV Viewer

A React app to upload, view, and filter CSV files — entirely in the browser.

🔗 **Live Demo:** [csv-viewer-livid.vercel.app](https://csv-viewer-livid.vercel.app/)

---

## Features

- 📂 Drag & drop or click-to-upload CSV files
- 🔍 Per-column text filtering (works with any CSV structure)
- 📊 Live stats — total rows, filtered count, column count
- 📄 Paginated table (20 rows per page)
- ♻️ Clear all filters in one click
- 📱 Fully responsive — works on mobile too

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| PapaParse | CSV parsing |
| CSS Modules | Scoped component styling |
| Vercel | Deployment |

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/AVNEESH707/CSV-viewer.git
cd CSV-viewer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run locally

```bash
npm start
```

App runs at `http://localhost:3000`

### 4. Build for production

```bash
npm run build
```

---

## Project Structure

```
csv-viewer/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── DataTable.js        # Paginated table display
│   │   ├── DataTable.module.css
│   │   ├── FilterBar.js        # Per-column filter inputs
│   │   ├── FilterBar.module.css
│   │   ├── StatsBar.js         # Row count stats
│   │   ├── StatsBar.module.css
│   │   ├── Uploader.js         # Drag & drop CSV uploader
│   │   └── Uploader.module.css
│   ├── App.js                  # Main app logic & state
│   ├── App.module.css
│   ├── index.js
│   └── index.css
├── vercel.json
└── package.json
```

---

## How It Works

1. User uploads a `.csv` file via drag & drop or file browser
2. **PapaParse** parses the CSV into a JavaScript array of objects
3. Column headers are extracted automatically
4. **FilterBar** renders one search input per column
5. Rows are filtered in real-time using `.filter()` + `.includes()`
6. **DataTable** paginates and displays the filtered results
7. **StatsBar** shows live counts of total vs filtered rows

---

## Deployment

Deployed on **Vercel** via GitHub integration.

Every push to `main` triggers an automatic redeployment.

---

## Assignment

Built as part of the selection task for **Constems AI Systems Pvt. Ltd.**

> Create a React page that allows users to upload a CSV file and display its data in the browser, with functionality to filter the data based on different columns.
