require("dotenv").config({ override: true });

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Task Management Backend is running"
    });
});

// Authentication Routes
app.use("/api/auth", authRoutes);

// Task Routes
app.use("/api/tasks", taskRoutes);

// Start Server
const PORT = process.env.PORT || 5001;

app.listen(PORT, "0.0.0.0", () => {
    console.log(
        `Server running on port ${PORT}`
    );
});