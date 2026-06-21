const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => console.log("MongoDB connected"));
db.on("error", (err) => console.error("MongoDB error:", err));
db.on("disconnected", () => console.log("MongoDB disconnected"));

module.exports = db;
