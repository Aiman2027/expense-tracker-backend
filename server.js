const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db");

const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/expenses", expenseRoutes);

app.get("/", (req, res) => res.send("Expense Tracker API running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
