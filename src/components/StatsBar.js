import React from 'react';
import styles from './StatsBar.module.css';

export default function StatsBar({ total, filtered, cols }) {
  return (
    <div className={styles.bar}>
      <Stat label="Total Rows" value={total} />
      <Stat label="Filtered" value={filtered} accent={filtered < total} />
      <Stat label="Columns" value={cols} />
    </div>
  );
}

function Stat({ label, value, accent }) {
  return (
    <div className={styles.stat}>
      <span className={`${styles.value} ${accent ? styles.accent : ''}`}>{value}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
