import React, { useRef, useState } from 'react';
import styles from './Uploader.module.css';

export default function Uploader({ onFile, loading }) {
  const inputRef = useRef();
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onFile(file);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) onFile(file);
  };

  return (
    <div
      className={`${styles.zone} ${dragging ? styles.dragging : ''}`}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && inputRef.current.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        className={styles.hidden}
        onChange={handleChange}
      />
      {loading ? (
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <p>Parsing CSV…</p>
        </div>
      ) : (
        <div className={styles.inner}>
          <div className={styles.iconWrap}>
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.icon}>
              <rect x="6" y="4" width="28" height="36" rx="3" stroke="currentColor" strokeWidth="2" />
              <path d="M28 4v10h10" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M15 22h18M15 28h12M15 34h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <p className={styles.label}>
            {dragging ? 'Release to upload' : 'Drag & drop your CSV here'}
          </p>
          <p className={styles.sub}>or click to browse files</p>
          <span className={styles.badge}>.CSV only</span>
        </div>
      )}
    </div>
  );
}
