import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

function TaskCard({ title, description, status }) {

    // Decide the badge color based on task status
    const getStatusColor = () => {

        if (status === "Completed") {
            return "success";
        }

        if (status === "In Progress") {
            return "warning";
        }

        return "secondary";
    };


    // Decide the icon based on task status
    const getStatusIcon = () => {

        if (status === "Completed") {
            return "✓";
        }

        if (status === "In Progress") {
            return "↗";
        }

        return "○";
    };


    return (
        <Card className="task-card h-100 shadow-sm">

            <Card.Body className="p-4">

                {/* Task Header */}
                <div className="d-flex justify-content-between align-items-start mb-3">

                    {/* Task Icon */}
                    <div
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                            width: "45px",
                            height: "45px",
                            background: "rgba(99, 102, 241, 0.1)",
                            fontSize: "20px"
                        }}
                    >
                        📋
                    </div>


                    {/* Task Status */}
                    <Badge
                        bg={getStatusColor()}
                        className="status-badge px-3 py-2"
                    >
                        {getStatusIcon()} {status}
                    </Badge>

                </div>


                {/* Task Title */}
                <Card.Title className="fw-bold mb-2">
                    {title}
                </Card.Title>


                {/* Task Description */}
                <Card.Text className="text-muted">
                    {description}
                </Card.Text>


                {/* Bottom Section */}
                <div className="mt-4 pt-3 border-top">

                    <div className="d-flex justify-content-between align-items-center">

                        <small className="text-muted">
                            Task status
                        </small>

                        <small className="fw-semibold">
                            {status}
                        </small>

                    </div>

                </div>

            </Card.Body>

        </Card>
    );
}

export default TaskCard;