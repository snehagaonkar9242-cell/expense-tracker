const Transaction = require("../models/Transaction");

const getTransactions = async (req, res) => {
  try {
    const data = await Transaction.find().sort({ date: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addTransaction = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    const newTxn = new Transaction({
      date: req.body.date,
      amount: Number(req.body.amount),
      type: req.body.type,
      category: req.body.category
    });

    const saved = await newTxn.save();
    res.status(201).json(saved);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getTransactions,
  addTransaction,
  deleteTransaction
};