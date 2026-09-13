const Task = require("../src/models/Task");


// GET all tasks
const getTasks = async (req, res) => {

    try {

        const tasks = await Task.find()
            .sort({ createdAt: -1 });

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

        const task = await Task.findById(
            req.params.id
        );

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
            description
        } = req.body;


        if (!title || !description) {

            return res.status(400).json({
                message: "Title and description are required"
            });

        }


        const newTask = await Task.create({
            title,
            description,
            status: "Pending"
        });


        res.status(201).json(newTask);

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

        const {
            title,
            description,
            status
        } = req.body;


        const updatedTask =
            await Task.findByIdAndUpdate(
                req.params.id,

                {
                    ...(title !== undefined && {
                        title
                    }),

                    ...(description !== undefined && {
                        description
                    }),

                    ...(status !== undefined && {
                        status
                    })
                },

                {
                    new: true,
                    runValidators: true
                }
            );


        if (!updatedTask) {

            return res.status(404).json({
                message: "Task not found"
            });

        }


        res.status(200).json(updatedTask);

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

        const deletedTask =
            await Task.findByIdAndDelete(
                req.params.id
            );


        if (!deletedTask) {

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


module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};