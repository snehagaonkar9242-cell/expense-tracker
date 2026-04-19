import React from "react";
import {
  PieChart, Pie, Cell,
  BarChart, Bar,
  XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444"];

const Charts = ({ transactions = [] }) => {

  // ✅ HANDLE EMPTY DATA
  if (!transactions || transactions.length === 0) {
    return (
      <div style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        textAlign: "center",
        marginBottom: "20px"
      }}>
        <h4>No data available for charts</h4>
      </div>
    );
  }

  const categoryData = {};
  const monthlyData = {};

  transactions.forEach((t) => {
    const amount = Number(t.amount) || 0;

    // Pie Chart (Category)
    categoryData[t.category] =
      (categoryData[t.category] || 0) + amount;

    // Bar Chart (Monthly)
    const month = new Date(t.date).toLocaleString("default", {
      month: "short"
    });

    if (!monthlyData[month]) {
      monthlyData[month] = { name: month, income: 0, expense: 0 };
    }

    if (t.type === "income") {
      monthlyData[month].income += amount;
    } else {
      monthlyData[month].expense += amount;
    }
  });

  const pieData = Object.keys(categoryData).map((key) => ({
    name: key,
    value: categoryData[key],
  }));

  const barData = Object.values(monthlyData);

  return (
    <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>

      {/* 🔵 OVERVIEW PIE */}
      <div style={{
        flex: 1,
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
      }}>
        <h3>Overview</h3>

        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={pieData} dataKey="value" outerRadius={80}>
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 🟢 INCOME EXPENSE BAR */}
      <div style={{
        flex: 2,
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
      }}>
        <h3>Income & Expense Chart</h3>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#22c55e" />
            <Bar dataKey="expense" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default Charts;