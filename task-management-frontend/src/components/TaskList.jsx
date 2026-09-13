import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function TaskList({
    tasks,
    onStatusChange,
    onEdit,
    onDelete
}) {
    if (tasks.length === 0) {
        return (
            <Card className="text-center shadow-sm">
                <Card.Body>
                    <h5>No tasks found</h5>

                    <p className="text-muted mb-0">
                        Try a different search or filter.
                    </p>
                </Card.Body>
            </Card>
        );
    }

    return (
        <Row className="g-4">
            {tasks.map((task) => (
                <Col md={4} key={task.id}>
                    <Card className="h-100 shadow-sm">
                        <Card.Body>

                            <Card.Title>
                                {task.title}
                            </Card.Title>

                            <Card.Text>
                                {task.description}
                            </Card.Text>

                            <Badge
                                bg={
                                    task.status === "Completed"
                                        ? "success"
                                        : task.status === "In Progress"
                                        ? "warning"
                                        : "secondary"
                                }
                                className="mb-3"
                            >
                                {task.status}
                            </Badge>

                            <Form.Select
                                className="mb-3"
                                value={task.status}
                                onChange={(event) =>
                                    onStatusChange(
                                        task.id,
                                        event.target.value
                                    )
                                }
                            >
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

                            <Button
                                variant="primary"
                                size="sm"
                                className="me-2"
                                onClick={() => onEdit(task)}
                            >
                                Edit
                            </Button>

                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => onDelete(task.id)}
                            >
                                Delete
                            </Button>

                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default TaskList;