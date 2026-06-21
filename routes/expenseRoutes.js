const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");
const { jwtAuthMiddleware } = require("../jwt");


router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.post("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const { title, amount, category, date, note } = req.body;
    if (!title || !amount || !category || !date)
      return res.status(400).json({ error: "All fields required" });

    const expense = new Expense({
      user: req.user.id,
      title,
      amount: parseFloat(amount),
      category,
      date,
      note: note || "",
    });
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.delete("/:id", jwtAuthMiddleware, async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, user: req.user.id });
    if (!expense) return res.status(404).json({ error: "Not found" });
    await expense.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
