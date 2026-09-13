const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5001/api";


// Get authentication token
function getToken() {

    return localStorage.getItem("token");

}


// Common headers
function getHeaders() {

    const token = getToken();

    return {

        "Content-Type": "application/json",

        ...(token && {
            Authorization: `Bearer ${token}`
        })

    };

}


// Convert MongoDB _id to frontend id
function formatTask(task) {

    return {

        ...task,

        id: task._id

    };

}


// GET all tasks
export async function getTasks() {

    const response = await fetch(
        `${API_URL}/tasks`,
        {
            method: "GET",
            headers: getHeaders()
        }
    );


    const data = await response.json();


    if (!response.ok) {

        throw new Error(
            data.message || "Failed to fetch tasks"
        );

    }


    return data.map(formatTask);

}


// GET single task
export async function getTaskById(id) {

    const response = await fetch(
        `${API_URL}/tasks/${id}`,
        {
            method: "GET",
            headers: getHeaders()
        }
    );


    const data = await response.json();


    if (!response.ok) {

        throw new Error(
            data.message || "Failed to fetch task"
        );

    }


    return formatTask(data);

}


// CREATE task
export async function createTask(
    title,
    description
) {

    const response = await fetch(
        `${API_URL}/tasks`,
        {
            method: "POST",
            headers: getHeaders(),

            body: JSON.stringify({

                title,

                description

            })
        }
    );


    const data = await response.json();


    if (!response.ok) {

        throw new Error(
            data.message || "Failed to create task"
        );

    }


    return formatTask(data);

}


// UPDATE task
export async function updateTask(
    id,
    title,
    description,
    status
) {

    const response = await fetch(
        `${API_URL}/tasks/${id}`,
        {
            method: "PUT",
            headers: getHeaders(),

            body: JSON.stringify({

                title,

                description,

                status

            })
        }
    );


    const data = await response.json();


    if (!response.ok) {

        throw new Error(
            data.message || "Failed to update task"
        );

    }


    return formatTask(data);

}


// DELETE task
export async function deleteTask(id) {

    const response = await fetch(
        `${API_URL}/tasks/${id}`,
        {
            method: "DELETE",
            headers: getHeaders()
        }
    );


    const data = await response.json();


    if (!response.ok) {

        throw new Error(
            data.message || "Failed to delete task"
        );

    }


    return data;

}


// LOGIN user
export async function loginUser(
    email,
    password
) {

    const response = await fetch(
        `${API_URL}/auth/login`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                email,

                password

            })
        }
    );


    const data = await response.json();


    if (!response.ok) {

        throw new Error(
            data.message || "Login failed"
        );

    }


    return data;

}


// REGISTER user
export async function registerUser(
    name,
    email,
    password
) {

    const response = await fetch(
        `${API_URL}/auth/register`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                name,

                email,

                password

            })
        }
    );


    const data = await response.json();


    if (!response.ok) {

        throw new Error(
            data.message || "Registration failed"
        );

    }


    return data;

}