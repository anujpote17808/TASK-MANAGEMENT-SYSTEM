// Load environment variables FIRST
require("dotenv").config({ override: true });


const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");


const app = express();

const PORT = 5001;


// Connect MongoDB
connectDB();


// Middleware
app.use(cors());

app.use(express.json());


// Home Route
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
app.listen(PORT, () => {

    console.log(
        `Server running on http://localhost:${PORT}`
    );

});