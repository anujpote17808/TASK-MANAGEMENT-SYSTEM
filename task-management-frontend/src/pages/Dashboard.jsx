import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

import { useTasks } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext";


function Dashboard() {

    const {
        tasks,
        loading,
        error
    } = useTasks();

    const {
        user
    } = useAuth();


    const totalTasks = tasks.length;

    const pendingTasks = tasks.filter(
        (task) => task.status === "Pending"
    ).length;

    const inProgressTasks = tasks.filter(
        (task) => task.status === "In Progress"
    ).length;

    const completedTasks = tasks.filter(
        (task) => task.status === "Completed"
    ).length;


    const statCards = [

        {
            title: "Total Tasks",
            value: totalTasks,
            icon: "📋"
        },

        {
            title: "Pending",
            value: pendingTasks,
            icon: "⏳"
        },

        {
            title: "In Progress",
            value: inProgressTasks,
            icon: "🔄"
        },

        {
            title: "Completed",
            value: completedTasks,
            icon: "✅"
        }

    ];


    return (

        <Container className="mt-5">

            {/* Welcome */}

            <div className="mb-5 fade-in">

                <h1 className="fw-bold">
                    Welcome, {user?.name || "User"} 👋
                </h1>

                <p className="text-muted">
                    Here's an overview of your tasks.
                </p>

            </div>


            {/* Error */}

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
                        />

                        <p className="mt-3 mb-0 text-muted">
                            Loading your tasks...
                        </p>

                    </Card.Body>

                </Card>

            ) : (

                <>

                    {/* Statistics */}

                    <Row className="g-4 mb-5">

                        {statCards.map((stat) => (

                            <Col
                                md={6}
                                lg={3}
                                key={stat.title}
                            >

                                <Card className="stat-card h-100 shadow-sm">

                                    <Card.Body className="p-4">

                                        <div className="d-flex justify-content-between align-items-center">

                                            <div>

                                                <p className="text-muted mb-2">
                                                    {stat.title}
                                                </p>

                                                <h2 className="fw-bold mb-0">
                                                    {stat.value}
                                                </h2>

                                            </div>

                                            <div
                                                className="rounded-circle d-flex align-items-center justify-content-center"
                                                style={{
                                                    width: "55px",
                                                    height: "55px",
                                                    background:
                                                        "rgba(99, 102, 241, 0.1)",
                                                    fontSize: "24px"
                                                }}
                                            >
                                                {stat.icon}
                                            </div>

                                        </div>

                                    </Card.Body>

                                </Card>

                            </Col>

                        ))}

                    </Row>


                    {/* Recent Tasks */}

                    <Card className="shadow-sm">

                        <Card.Body className="p-4">

                            <h3 className="fw-bold mb-4">
                                Recent Tasks
                            </h3>


                            {tasks.length === 0 ? (

                                <div className="text-center py-4">

                                    <h5>
                                        No tasks yet
                                    </h5>

                                    <p className="text-muted mb-0">
                                        Create your first task from the Tasks page.
                                    </p>

                                </div>

                            ) : (

                                <div>

                                    {tasks
                                        .slice(-5)
                                        .reverse()
                                        .map((task) => (

                                            <div
                                                key={task.id}
                                                className="d-flex justify-content-between align-items-center border-bottom py-3"
                                            >

                                                <div>

                                                    <h6 className="fw-bold mb-1">
                                                        {task.title}
                                                    </h6>

                                                    <small className="text-muted">
                                                        {task.description}
                                                    </small>

                                                </div>


                                                <Badge
                                                    bg={
                                                        task.status === "Completed"
                                                            ? "success"
                                                            : task.status === "In Progress"
                                                            ? "warning"
                                                            : "secondary"
                                                    }
                                                >
                                                    {task.status}
                                                </Badge>

                                            </div>

                                        ))}

                                </div>

                            )}

                        </Card.Body>

                    </Card>

                </>

            )}

        </Container>

    );

}


export default Dashboard;