const mongoose = require("mongoose");
const Task = require("../models/Task");


// Check whether MongoDB ID is valid
function isValidObjectId(id) {

    return mongoose.Types.ObjectId.isValid(id);

}


// GET all tasks for logged-in user
const getTasks = async (req, res) => {

    try {

        const tasks = await Task.find({
            user: req.user.id
        });

        res.status(200).json(tasks);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch tasks",
            error: error.message
        });

    }

};


// GET single task
const getTaskById = async (req, res) => {

    try {

        // Validate task ID
        if (!isValidObjectId(req.params.id)) {

            return res.status(400).json({
                message: "Invalid task ID"
            });

        }


        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user.id
        });


        if (!task) {

            return res.status(404).json({
                message: "Task not found"
            });

        }


        res.status(200).json(task);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch task",
            error: error.message
        });

    }

};


// CREATE task
const createTask = async (req, res) => {

    try {

        const {
            title,
            description,
            status
        } = req.body;


        // Validate required fields
        if (!title || !description) {

            return res.status(400).json({
                message: "Title and description are required"
            });

        }


        const task = await Task.create({

            title,

            description,

            status: status || "Pending",

            // Automatically assign logged-in user
            user: req.user.id

        });


        res.status(201).json(task);

    } catch (error) {

        res.status(500).json({
            message: "Failed to create task",
            error: error.message
        });

    }

};


// UPDATE task
const updateTask = async (req, res) => {

    try {

        // Validate task ID
        if (!isValidObjectId(req.params.id)) {

            return res.status(400).json({
                message: "Invalid task ID"
            });

        }


        const task = await Task.findOneAndUpdate(

            {
                _id: req.params.id,

                // Only allow owner to update
                user: req.user.id
            },

            {
                // Only update allowed fields
                title: req.body.title,

                description: req.body.description,

                status: req.body.status
            },

            {
                new: true,

                runValidators: true
            }

        );


        if (!task) {

            return res.status(404).json({
                message: "Task not found"
            });

        }


        res.status(200).json(task);

    } catch (error) {

        res.status(500).json({
            message: "Failed to update task",
            error: error.message
        });

    }

};


// DELETE task
const deleteTask = async (req, res) => {

    try {

        // Validate task ID
        if (!isValidObjectId(req.params.id)) {

            return res.status(400).json({
                message: "Invalid task ID"
            });

        }


        const task = await Task.findOneAndDelete({

            _id: req.params.id,

            // Only allow owner to delete
            user: req.user.id

        });


        if (!task) {

            return res.status(404).json({
                message: "Task not found"
            });

        }


        res.status(200).json({

            message: "Task deleted successfully"

        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to delete task",
            error: error.message
        });

    }

};


// Export controllers
module.exports = {

    getTasks,

    getTaskById,

    createTask,

    updateTask,

    deleteTask

};