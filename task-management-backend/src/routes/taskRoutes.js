const express = require("express");

const {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
} = require("../controller/taskController");

const {
    protect
} = require("../middleware/authMiddleware");


const router = express.Router();


// Get all tasks
router.get("/", protect, getTasks);


// Get single task
router.get("/:id", protect, getTaskById);


// Create task
router.post("/", protect, createTask);


// Update task
router.put("/:id", protect, updateTask);


// Delete task
router.delete("/:id", protect, deleteTask);


module.exports = router;