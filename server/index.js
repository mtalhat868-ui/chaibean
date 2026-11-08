const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Load .env reliably from server directory, then fallback to root directory
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
if (!process.env.MONGO_URI) {
  require("dotenv").config({ path: path.resolve(process.cwd(), ".env") });
}

const app = express();

app.use(cors());
app.use(express.json({ limit: "32kb" }));

const menuRoutes = require("./routes/menuRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

app.use("/api/menu", menuRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/", (req, res) => {
  res.json({
    name: "ChaiBean API",
    status: "running",
    database: mongoose.connection.readyState === 1 ? "connected" : "connecting/disconnected",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    dbState: mongoose.connection.readyState,
  });
});

const PORT = process.env.PORT || 5000;

// Start Express server immediately
const server = app.listen(PORT, () => {
  console.log(`ChaiBean Server running on port ${PORT}`);
});

// Connect to MongoDB with robust error reporting and retry
function connectMongoDB() {
  if (!process.env.MONGO_URI) {
    console.warn("WARNING: MONGO_URI is not defined in .env file.");
    return;
  }

  mongoose
    .connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    })
    .then(() => {
      console.log("MongoDB connected successfully to ChaiBean cluster.");
    })
    .catch((err) => {
      console.error("MongoDB initial connection error:", err.message);
      console.log("Note: If using MongoDB Atlas, verify your current IP is whitelisted under Network Access.");
    });
}

connectMongoDB();

mongoose.connection.on("connected", () => {
  console.log("Mongoose event: Connected to MongoDB.");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose event error:", err.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose event: Disconnected from MongoDB.");
});

module.exports = { app, server };
