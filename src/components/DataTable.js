import React, { useState, useEffect } from 'react';
import styles from './DataTable.module.css';

const PAGE_SIZE = 20;

export default function DataTable({ headers, rows, totalRows }) {
  const [page, setPage] = useState(1);

  useEffect(() => { setPage(1); }, [rows]);

  const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const pageRows = rows.slice(start, start + PAGE_SIZE);

  if (rows.length === 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>⌀</span>
        <p>No rows match your filters</p>
        <p className={styles.emptyHint}>Try adjusting or clearing the filters above</p>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={`${styles.th} ${styles.rowNum}`}>#</th>
              {headers.map((h) => (
                <th key={h} className={styles.th} title={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row, i) => (
              <tr key={start + i} className={styles.tr}>
                <td className={`${styles.td} ${styles.rowNum}`}>{start + i + 1}</td>
                {headers.map((h) => (
                  <td key={h} className={styles.td} title={String(row[h] ?? '')}>
                    {row[h] ?? <span className={styles.null}>—</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <span className={styles.pageInfo}>
            Rows {start + 1}–{Math.min(start + PAGE_SIZE, rows.length)} of {rows.length}
            {rows.length < totalRows && <span className={styles.filtered}> (filtered from {totalRows})</span>}
          </span>
          <div className={styles.pageBtns}>
            <button
              className={styles.pageBtn}
              disabled={page === 1}
              onClick={() => setPage(1)}
            >«</button>
            <button
              className={styles.pageBtn}
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >‹</button>
            <span className={styles.pageNum}>{page} / {totalPages}</span>
            <button
              className={styles.pageBtn}
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >›</button>
            <button
              className={styles.pageBtn}
              disabled={page === totalPages}
              onClick={() => setPage(totalPages)}
            >»</button>
          </div>
        </div>
      )}
    </div>
  );
}
