import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";


function Profile() {

    const navigate = useNavigate();

    const {
        user,
        logout
    } = useAuth();


    function handleLogout() {

        logout();

        navigate("/login");

    }


    return (

        <Container className="mt-5">

            <h1 className="text-center mb-4">
                My Profile
            </h1>


            <Card
                className="shadow-sm mx-auto"
                style={{
                    maxWidth: "600px"
                }}
            >

                <Card.Body className="p-4">

                    <div className="text-center mb-4">

                        <div
                            className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                            style={{
                                width: "80px",
                                height: "80px",
                                background:
                                    "rgba(99, 102, 241, 0.1)",
                                fontSize: "35px"
                            }}
                        >
                            👤
                        </div>

                        <h3 className="fw-bold">
                            {user?.name || "User"}
                        </h3>

                        <Badge bg="primary">
                            {user?.role || "user"}
                        </Badge>

                    </div>


                    <div className="border-top pt-4">

                        <p>
                            <strong>Name:</strong>{" "}
                            {user?.name || "Not available"}
                        </p>


                        <p>
                            <strong>Email:</strong>{" "}
                            {user?.email || "Not available"}
                        </p>


                        <p>
                            <strong>Role:</strong>{" "}
                            {user?.role || "user"}
                        </p>

                    </div>


                    <div className="d-flex gap-2 mt-4">

                        <Button
                            variant="secondary"
                            onClick={() => navigate("/tasks")}
                        >
                            View My Tasks
                        </Button>


                        <Button
                            variant="danger"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>

                    </div>

                </Card.Body>

            </Card>

        </Container>

    );

}


export default Profile;