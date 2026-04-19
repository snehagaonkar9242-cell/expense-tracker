const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// ✅ ADD transaction
router.post("/add", async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body);
    const saved = await newTransaction.save();

    res.status(200).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET all transactions
router.get("/", async (req, res) => {
  try {
    const data = await Transaction.find().sort({ date: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;