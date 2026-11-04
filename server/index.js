const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "32kb" }));

const menuRoutes = require("./routes/menuRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

app.use("/api/menu", menuRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/", (req, res) => {
res.send("ChaiBean API is running");
});

const PORT = process.env.PORT || 5000;

mongoose
.connect(process.env.MONGO_URI)
.then(() => {
console.log("MongoDB connected");
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => console.log("MongoDB connection error:", err.message));