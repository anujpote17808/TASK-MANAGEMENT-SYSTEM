const mongoose = require("mongoose");


const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "In Progress",
                "Completed"
            ],
            default: "Pending"
        },

        // User who owns this task
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },

    {
        timestamps: true
    }
);


const Task = mongoose.model(
    "Task",
    taskSchema
);


module.exports = Task;