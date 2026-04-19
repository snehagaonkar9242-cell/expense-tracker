const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect("mongodb://localhost:27017/expense_tracker")
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch(err => {
    console.error("❌ MongoDB connection error:");
    console.error(err);
    process.exit(1); // Stop server if DB fails
  });

// ✅ Define a schema and model for expenses
const expenseSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  category: String,
  date: { type: Date, default: Date.now }
});

const Expense = mongoose.model("Expense", expenseSchema);

// ✅ POST /add – save expense to MongoDB
app.post("/add", async (req, res) => {
  console.log("DATA RECEIVED:", req.body);

  try {
    // Create a new expense document from request body
    const newExpense = new Expense(req.body);
    await newExpense.save();

    res.status(200).json({
      message: "Added successfully",
      data: req.body
    });
  } catch (err) {
    console.error("Error saving expense:", err);
    res.status(500).json({ error: "Failed to save expense" });
  }
});

// ✅ (Optional) GET /expenses – fetch all expenses
app.get("/expenses", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});