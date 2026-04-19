// src/components/AddTransaction.js
import React, { useState } from "react";
import { PlusCircle, DollarSign, Calendar, Tag, Type } from "lucide-react";

const AddTransaction = ({ refresh }) => {
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: "",
    type: "expense",
    category: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const categories = {
    income: ["Salary", "Freelance", "Investment", "Gift", "Refund", "Other"],
    expense: ["Food", "Transport", "Shopping", "Entertainment", "Bills", "Healthcare", "Education", "Other"]
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const amountNum = parseFloat(form.amount);
    if (!form.amount || isNaN(amountNum) || amountNum <= 0) {
      setError("Please enter a valid amount (>0)");
      return;
    }
    if (!form.category) {
      setError("Please select a category");
      return;
    }

    setIsSubmitting(true);

    // Create new transaction
    const newTransaction = {
      id: Date.now(),
      date: form.date,
      amount: amountNum,
      type: form.type,
      category: form.category
    };

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem("transactions") || "[]");
    const updated = [newTransaction, ...existing];
    localStorage.setItem("transactions", JSON.stringify(updated));

    // Reset form
    setForm({
      date: new Date().toISOString().split('T')[0],
      amount: "",
      type: "expense",
      category: ""
    });

    // Refresh parent
    if (refresh && typeof refresh === "function") {
      refresh();
    }

    setIsSubmitting(false);
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>
        <PlusCircle size={20} /> Add New Transaction
      </h3>
      {error && <div style={styles.errorMessage}>⚠️ {error}</div>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGrid}>
          <div style={styles.inputGroup}>
            <label><Calendar size={16} /> Date</label>
            <input type="date" value={form.date} onChange={(e) => setForm({...form, date: e.target.value})} required style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label><DollarSign size={16} /> Amount (₹)</label>
            <input type="number" placeholder="0.00" value={form.amount} onChange={(e) => setForm({...form, amount: e.target.value})} min="1" step="1" required style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label><Type size={16} /> Type</label>
            <select value={form.type} onChange={(e) => setForm({...form, type: e.target.value, category: ""})} style={styles.select}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <div style={styles.inputGroup}>
            <label><Tag size={16} /> Category</label>
            <select value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} required style={styles.select}>
              <option value="">Select category</option>
              {categories[form.type].map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <button type="submit" disabled={isSubmitting} style={styles.submitBtn}>
            {isSubmitting ? "Adding..." : "➕ Add Transaction"}
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  card: {
    background: 'white',
    borderRadius: '15px',
    padding: '25px',
    marginBottom: '30px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
  },
  cardTitle: {
    margin: '0 0 20px 0',
    fontSize: '18px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  errorMessage: {
    background: '#fee2e2',
    color: '#dc2626',
    padding: '10px 15px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '14px'
  },
  form: { width: '100%' },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
    alignItems: 'end'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  input: {
    padding: '10px 12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none'
  },
  select: {
    padding: '10px 12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    background: 'white'
  },
  submitBtn: {
    padding: '10px 20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    height: '42px'
  }
};

export default AddTransaction;