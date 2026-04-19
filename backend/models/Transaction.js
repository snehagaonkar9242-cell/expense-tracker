const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  date: String,
  amount: Number,
  type: String,
  category: String,
});

module.exports = mongoose.model("Transaction", transactionSchema);