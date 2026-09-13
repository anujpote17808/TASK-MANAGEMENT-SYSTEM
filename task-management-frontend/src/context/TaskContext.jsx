import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import {
    getTasks,
    createTask as apiCreateTask,
    updateTask as apiUpdateTask,
    deleteTask as apiDeleteTask
} from "../services/api";

import { useAuth } from "./AuthContext";


const TaskContext = createContext();


export function TaskProvider({ children }) {

    const {
        isAuthenticated
    } = useAuth();


    const [tasks, setTasks] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");


    // Load tasks only after login
    useEffect(() => {

        async function loadTasks() {

            try {

                setLoading(true);

                setError("");

                const data = await getTasks();

                setTasks(data);

            } catch (error) {

                console.error(error);

                setError("Failed to load tasks.");

            } finally {

                setLoading(false);

            }

        }


        if (isAuthenticated) {

            loadTasks();

        } else {

            setTasks([]);

            setLoading(false);

            setError("");

        }

    }, [isAuthenticated]);


    // Add task
    async function addTask(title, description) {

        try {

            const newTask = await apiCreateTask(
                title,
                description
            );

            setTasks((currentTasks) => [

                ...currentTasks,

                newTask

            ]);

        } catch (error) {

            console.error(error);

            setError("Failed to create task.");

        }

    }


    // Update task
    async function updateTask(
        id,
        title,
        description,
        status
    ) {

        try {

            const updatedTask = await apiUpdateTask(
                id,
                title,
                description,
                status
            );


            setTasks((currentTasks) =>

                currentTasks.map((task) =>

                    task._id === id || task.id === id

                        ? updatedTask

                        : task

                )

            );

        } catch (error) {

            console.error(error);

            setError("Failed to update task.");

        }

    }


    // Delete task
    async function deleteTask(id) {

        try {

            await apiDeleteTask(id);


            setTasks((currentTasks) =>

                currentTasks.filter(

                    (task) =>

                        task._id !== id &&
                        task.id !== id

                )

            );

        } catch (error) {

            console.error(error);

            setError("Failed to delete task.");

        }

    }


    // Change task status
    async function changeStatus(
        id,
        newStatus
    ) {

        const task = tasks.find(

            (task) =>

                task._id === id ||
                task.id === id

        );


        if (!task) {

            return;

        }


        await updateTask(

            id,

            task.title,

            task.description,

            newStatus

        );

    }


    return (

        <TaskContext.Provider
            value={{
                tasks,
                loading,
                error,
                addTask,
                updateTask,
                deleteTask,
                changeStatus
            }}
        >

            {children}

        </TaskContext.Provider>

    );

}


export function useTasks() {

    return useContext(TaskContext);

}