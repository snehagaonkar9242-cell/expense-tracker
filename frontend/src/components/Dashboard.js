// src/components/Dashboard.js
import React, { useState, useEffect } from "react";
import AddTransaction from "./AddTransaction";
import TransactionList from "./TransactionList";
import Charts from "./Charts";
import { TrendingUp, TrendingDown, Wallet, RefreshCw } from "lucide-react";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("transactions");

  // Load from localStorage (no backend)
  const fetchTransactions = () => {
    setLoading(true);
    const stored = localStorage.getItem("transactions");
    if (stored) {
      setTransactions(JSON.parse(stored));
    } else {
      // Sample data to show something
      const sample = [
        { id: 1, date: "2026-04-19", amount: 50000, type: "income", category: "Salary" },
        { id: 2, date: "2026-04-18", amount: 2000, type: "expense", category: "Food" },
        { id: 3, date: "2026-04-17", amount: 1500, type: "expense", category: "Transport" }
      ];
      localStorage.setItem("transactions", JSON.stringify(sample));
      setTransactions(sample);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>💰 Financial Dashboard</h1>
          <p style={styles.subtitle}>Track your income and expenses</p>
        </div>
        <button onClick={fetchTransactions} style={styles.refreshBtn}>
          <RefreshCw size={18} /> Refresh
        </button>
      </div>

      <div style={styles.statsGrid}>
        <div style={{...styles.statCard, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
          <div style={styles.statIcon}><TrendingUp size={24} /></div>
          <div>
            <p style={styles.statLabel}>Total Income</p>
            <h2 style={styles.statValue}>₹{totalIncome.toLocaleString()}</h2>
          </div>
        </div>
        <div style={{...styles.statCard, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}>
          <div style={styles.statIcon}><TrendingDown size={24} /></div>
          <div>
            <p style={styles.statLabel}>Total Expense</p>
            <h2 style={styles.statValue}>₹{totalExpense.toLocaleString()}</h2>
          </div>
        </div>
        <div style={{...styles.statCard, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'}}>
          <div style={styles.statIcon}><Wallet size={24} /></div>
          <div>
            <p style={styles.statLabel}>Balance</p>
            <h2 style={{...styles.statValue, color: balance >= 0 ? '#4caf50' : '#f44336'}}>
              ₹{balance.toLocaleString()}
            </h2>
          </div>
        </div>
      </div>

      <AddTransaction refresh={fetchTransactions} />

      <div style={styles.tabsContainer}>
        <button 
          style={{...styles.tab, ...(activeTab === "transactions" ? styles.activeTab : {})}}
          onClick={() => setActiveTab("transactions")}
        >
          📋 Recent Transactions
        </button>
        <button 
          style={{...styles.tab, ...(activeTab === "charts" ? styles.activeTab : {})}}
          onClick={() => setActiveTab("charts")}
        >
          📊 Analytics & Charts
        </button>
      </div>

      <div style={styles.contentCard}>
        {activeTab === "transactions" ? (
          <TransactionList transactions={transactions} loading={loading} onDelete={fetchTransactions} />
        ) : (
          <Charts transactions={transactions} />
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    minHeight: '100vh',
    background: '#f8f9fa'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    flexWrap: 'wrap',
    gap: '15px'
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    margin: '0 0 5px 0',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  subtitle: {
    color: '#666',
    margin: 0,
    fontSize: '14px'
  },
  refreshBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    background: '#f0f0f0',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '20px',
    borderRadius: '15px',
    color: 'white',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
  },
  statIcon: {
    background: 'rgba(255,255,255,0.2)',
    padding: '12px',
    borderRadius: '12px'
  },
  statLabel: {
    margin: 0,
    fontSize: '14px',
    opacity: 0.9
  },
  statValue: {
    margin: '5px 0 0 0',
    fontSize: '28px',
    fontWeight: 'bold'
  },
  tabsContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    borderBottom: '2px solid #e0e0e0'
  },
  tab: {
    padding: '12px 24px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '500',
    color: '#666'
  },
  activeTab: {
    color: '#667eea',
    borderBottom: '2px solid #667eea',
    marginBottom: '-2px'
  },
  contentCard: {
    background: 'white',
    borderRadius: '15px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
  }
};

export default Dashboard;