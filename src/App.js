import React, { useState, useCallback } from 'react';
import Papa from 'papaparse';
import styles from './App.module.css';
import Uploader from './components/Uploader';
import FilterBar from './components/FilterBar';
import DataTable from './components/DataTable';
import StatsBar from './components/StatsBar';

export default function App() {
  const [fileName, setFileName] = useState('');
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);
  const [filters, setFilters] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFile = useCallback((file) => {
    if (!file) return;
    if (!file.name.endsWith('.csv')) {
      setError('Please upload a valid .csv file.');
      return;
    }
    setError('');
    setLoading(true);
    setFilters({});

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        setFileName(file.name);
        setHeaders(result.meta.fields || []);
        setRows(result.data);
        setLoading(false);
      },
      error: () => {
        setError('Failed to parse CSV. Please check the file format.');
        setLoading(false);
      },
    });
  }, []);

  const filteredRows = rows.filter((row) =>
    Object.entries(filters).every(([col, val]) => {
      if (!val) return true;
      return String(row[col] ?? '').toLowerCase().includes(val.toLowerCase());
    })
  );

  const handleReset = () => {
    setFileName('');
    setHeaders([]);
    setRows([]);
    setFilters({});
    setError('');
  };

  return (
    <div className={styles.app}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            <span className={styles.logoAccent}>▶</span>
            <span className={styles.logoText}>CSV<span className={styles.logoSub}>viewer</span></span>
          </div>
          <p className={styles.tagline}>Upload · Inspect · Filter</p>
        </div>
        <div className={styles.headerLine} />
      </header>

      <main className={styles.main}>
        {/* Upload Section */}
        {rows.length === 0 && (
          <section className={styles.uploadSection}>
            <div className={styles.uploadHeading}>
              <h1 className={styles.h1}>Drop your CSV file</h1>
              <p className={styles.subtitle}>Upload any comma-separated file to explore and filter its contents instantly.</p>
            </div>
            <Uploader onFile={handleFile} loading={loading} />
            {error && <p className={styles.error}>⚠ {error}</p>}
          </section>
        )}

        {/* Data Section */}
        {rows.length > 0 && (
          <section className={styles.dataSection}>
            <div className={styles.dataHeader}>
              <div className={styles.fileInfo}>
                <span className={styles.fileTag}>
                  <span className={styles.fileIcon}>📄</span>
                  {fileName}
                </span>
                <button className={styles.resetBtn} onClick={handleReset}>
                  ✕ Clear
                </button>
              </div>
              <StatsBar total={rows.length} filtered={filteredRows.length} cols={headers.length} />
            </div>

            <FilterBar headers={headers} filters={filters} onChange={setFilters} />

            <DataTable headers={headers} rows={filteredRows} totalRows={rows.length} />
          </section>
        )}
      </main>

      <footer className={styles.footer}>
        <span>Built with React · CSV Viewer Assignment</span>
      </footer>
    </div>
  );
}
