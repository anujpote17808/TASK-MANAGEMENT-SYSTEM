import { useState } from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

import { useTasks } from "../context/TaskContext";
import TaskList from "../components/TaskList";


function Tasks() {

    const {
        tasks,
        loading,
        error,
        addTask,
        updateTask,
        deleteTask,
        changeStatus
    } = useTasks();


    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [editingTaskId, setEditingTaskId] = useState(null);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");

    const [formError, setFormError] = useState("");


    // Add Task
    function handleAddTask(event) {

        event.preventDefault();


        if (title.trim() === "") {

            setFormError(
                "Task title is required."
            );

            return;
        }


        if (description.trim() === "") {

            setFormError(
                "Task description is required."
            );

            return;
        }


        setFormError("");


        addTask(
            title.trim(),
            description.trim()
        );


        setTitle("");

        setDescription("");

    }


    // Start editing a task
    function editTask(task) {

        setEditingTaskId(task.id);

        setTitle(task.title);

        setDescription(task.description);

        setFormError("");

    }


    // Update Task
    function handleUpdateTask(event) {

        event.preventDefault();


        if (title.trim() === "") {

            setFormError(
                "Task title is required."
            );

            return;
        }


        if (description.trim() === "") {

            setFormError(
                "Task description is required."
            );

            return;
        }


        setFormError("");


        updateTask(
            editingTaskId,
            title.trim(),
            description.trim()
        );


        setTitle("");

        setDescription("");

        setEditingTaskId(null);

    }


    // Cancel editing
    function cancelEdit() {

        setEditingTaskId(null);

        setTitle("");

        setDescription("");

        setFormError("");

    }


    // Delete Task with confirmation
    function handleDeleteTask(id) {

        const confirmed = window.confirm(
            "Are you sure you want to delete this task?"
        );


        if (!confirmed) {
            return;
        }


        deleteTask(id);

    }


    // Search and filter
    const filteredTasks = tasks.filter(
        (task) => {

            const matchesSearch =
                task.title
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );


            const matchesStatus =
                statusFilter === "All" ||
                task.status === statusFilter;


            return (
                matchesSearch &&
                matchesStatus
            );

        }
    );


    return (

        <div className="container mt-5">

            <h1 className="text-center mb-4">
                Tasks
            </h1>


            {/* Backend Error */}
            {error && (
                <Alert variant="danger">
                    {error}
                </Alert>
            )}


            {/* Loading */}
            {loading ? (

                <Card className="text-center shadow-sm">

                    <Card.Body className="py-5">

                        <Spinner
                            animation="border"
                            variant="primary"
                            className="mb-3"
                        />

                        <h5>
                            Loading tasks...
                        </h5>

                        <p className="text-muted mb-0">
                            Fetching tasks from the server.
                        </p>

                    </Card.Body>

                </Card>

            ) : (

                <>

                    {/* Add / Edit Task */}
                    <Card className="mb-4 shadow-sm">

                        <Card.Body>

                            <h4 className="mb-3">

                                {editingTaskId !== null
                                    ? "Edit Task"
                                    : "Add New Task"}

                            </h4>


                            {/* Form Validation Error */}
                            {formError && (
                                <Alert variant="danger">
                                    {formError}
                                </Alert>
                            )}


                            <Form
                                onSubmit={
                                    editingTaskId !== null
                                        ? handleUpdateTask
                                        : handleAddTask
                                }
                            >

                                <Form.Group className="mb-3">

                                    <Form.Label>
                                        Task Title
                                    </Form.Label>

                                    <Form.Control
                                        type="text"
                                        placeholder="Enter task title"
                                        value={title}
                                        onChange={(event) => {

                                            setTitle(
                                                event.target.value
                                            );

                                            setFormError("");

                                        }}
                                    />

                                </Form.Group>


                                <Form.Group className="mb-3">

                                    <Form.Label>
                                        Description
                                    </Form.Label>

                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter task description"
                                        value={description}
                                        onChange={(event) => {

                                            setDescription(
                                                event.target.value
                                            );

                                            setFormError("");

                                        }}
                                    />

                                </Form.Group>


                                <Button
                                    type="submit"
                                    variant={
                                        editingTaskId !== null
                                            ? "success"
                                            : "primary"
                                    }
                                >

                                    {editingTaskId !== null
                                        ? "Update Task"
                                        : "Add Task"}

                                </Button>


                                {editingTaskId !== null && (

                                    <Button
                                        type="button"
                                        variant="secondary"
                                        className="ms-2"
                                        onClick={cancelEdit}
                                    >
                                        Cancel
                                    </Button>

                                )}

                            </Form>

                        </Card.Body>

                    </Card>


                    {/* Search and Filter */}
                    <Card className="mb-4 shadow-sm">

                        <Card.Body>

                            <Row className="g-3">

                                <Col md={8}>

                                    <Form.Label>
                                        Search Tasks
                                    </Form.Label>

                                    <Form.Control
                                        type="text"
                                        placeholder="Search by task title..."
                                        value={search}
                                        onChange={(event) =>
                                            setSearch(
                                                event.target.value
                                            )
                                        }
                                    />

                                </Col>


                                <Col md={4}>

                                    <Form.Label>
                                        Filter by Status
                                    </Form.Label>

                                    <Form.Select
                                        value={statusFilter}
                                        onChange={(event) =>
                                            setStatusFilter(
                                                event.target.value
                                            )
                                        }
                                    >

                                        <option value="All">
                                            All
                                        </option>

                                        <option value="Pending">
                                            Pending
                                        </option>

                                        <option value="In Progress">
                                            In Progress
                                        </option>

                                        <option value="Completed">
                                            Completed
                                        </option>

                                    </Form.Select>

                                </Col>

                            </Row>

                        </Card.Body>

                    </Card>


                    {/* Task List */}
                    <h3 className="mb-3">
                        My Tasks
                    </h3>


                    <TaskList
                        tasks={filteredTasks}
                        onStatusChange={changeStatus}
                        onEdit={editTask}
                        onDelete={handleDeleteTask}
                    />

                </>

            )}

        </div>

    );

}


export default Tasks;