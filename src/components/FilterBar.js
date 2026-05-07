import React, { useState } from 'react';
import styles from './FilterBar.module.css';

export default function FilterBar({ headers, filters, onChange }) {
  const [open, setOpen] = useState(true);
  const activeCount = Object.values(filters).filter(Boolean).length;

  const handleChange = (col, value) => {
    onChange((prev) => ({ ...prev, [col]: value }));
  };

  const clearAll = () => {
    const cleared = {};
    headers.forEach((h) => (cleared[h] = ''));
    onChange(cleared);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.topBar}>
        <button className={styles.toggle} onClick={() => setOpen((o) => !o)}>
          <span className={styles.toggleIcon}>{open ? '▾' : '▸'}</span>
          <span>Filters</span>
          {activeCount > 0 && <span className={styles.badge}>{activeCount} active</span>}
        </button>
        {activeCount > 0 && (
          <button className={styles.clearBtn} onClick={clearAll}>Clear all</button>
        )}
      </div>

      {open && (
        <div className={styles.grid}>
          {headers.map((col) => (
            <div key={col} className={styles.field}>
              <label className={styles.label} title={col}>{col}</label>
              <input
                className={styles.input}
                type="text"
                placeholder={`Filter "${col}"…`}
                value={filters[col] || ''}
                onChange={(e) => handleChange(col, e.target.value)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
