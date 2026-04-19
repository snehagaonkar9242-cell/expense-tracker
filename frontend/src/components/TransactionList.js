// src/components/TransactionList.js
import React from 'react';
import { TrendingUp, TrendingDown, Calendar, Tag, Trash2 } from 'lucide-react';

const TransactionList = ({ transactions, loading, onDelete }) => {
  if (loading) {
    return <div style={styles.loading}>Loading transactions...</div>;
  }

  if (transactions.length === 0) {
    return (
      <div style={styles.emptyState}>
        <p>No transactions yet</p>
        <small>Add your first transaction using the form above</small>
      </div>
    );
  }

  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleDelete = (id) => {
  if (window.confirm('Delete this transaction?')) {
    // Get current transactions from localStorage
    const stored = localStorage.getItem('transactions');
    if (stored) {
      const transactions = JSON.parse(stored);
      // Filter out the deleted transaction
      const updated = transactions.filter(t => t.id !== id);
      // Save back to localStorage
      localStorage.setItem('transactions', JSON.stringify(updated));
      // Refresh the parent component (Dashboard)
      if (onDelete) onDelete();
    }
  }
};

  return (
    <div>
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Amount</th>
              <th style={styles.th}>Type</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map((transaction) => (
              <tr key={transaction.id} style={styles.tableRow}>
                <td style={styles.td}>
                  <Calendar size={14} style={styles.tdIcon} />
                  <span>{transaction.date}</span>
                </td>
                <td style={styles.td}>
                  <Tag size={14} style={styles.tdIcon} />
                  <span style={styles.categoryBadge}>{transaction.category}</span>
                </td>
                <td style={{...styles.td, textAlign: 'right', color: transaction.type === 'income' ? '#4caf50' : '#f44336'}}>
                  {transaction.type === 'income' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  <span style={{ fontWeight: 600 }}>₹{transaction.amount.toLocaleString()}</span>
                </td>
                <td style={styles.tdCenter}>
                  <span style={{...styles.typeBadge, background: transaction.type === 'income' ? '#e8f5e9' : '#ffebee', color: transaction.type === 'income' ? '#4caf50' : '#f44336'}}>
                    {transaction.type}
                  </span>
                </td>
                <td style={styles.tdCenter}>
                  <button onClick={() => handleDelete(transaction.id)} style={styles.deleteBtn} title="Delete transaction">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={styles.footer}>
        <small>Showing {sortedTransactions.length} transaction{sortedTransactions.length !== 1 ? 's' : ''}</small>
      </div>
    </div>
  );
};

const styles = {
  loading: { textAlign: 'center', padding: '40px', color: '#666' },
  emptyState: { textAlign: 'center', padding: '40px', color: '#999' },
  tableWrapper: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHeader: { borderBottom: '2px solid #e0e0e0' },
  th: { textAlign: 'left', padding: '12px', fontWeight: '600', color: '#666', fontSize: '13px', textTransform: 'uppercase' },
  tableRow: { borderBottom: '1px solid #f0f0f0', transition: 'background 0.3s' },
  td: { padding: '14px 12px', fontSize: '14px', verticalAlign: 'middle' },
  tdCenter: { padding: '14px 12px', fontSize: '14px', textAlign: 'center', verticalAlign: 'middle' },
  tdIcon: { verticalAlign: 'middle', marginRight: '6px' },
  categoryBadge: { background: '#f5f5f5', padding: '4px 10px', borderRadius: '12px', fontSize: '12px' },
  typeBadge: { padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '500', textTransform: 'capitalize', display: 'inline-block' },
  deleteBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#f44336', padding: '4px 8px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center' },
  footer: { textAlign: 'center', padding: '15px', color: '#999', fontSize: '12px', borderTop: '1px solid #f0f0f0', marginTop: '10px' }
};

export default TransactionList;