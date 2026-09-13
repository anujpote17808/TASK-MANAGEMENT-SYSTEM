import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";


function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();


    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);


    async function handleLogin(event) {

        event.preventDefault();

        setError("");


        if (!email.trim() || !password.trim()) {

            setError(
                "Email and password are required."
            );

            return;
        }


        try {

            setLoading(true);


            const data = await loginUser(
                email.trim(),
                password
            );


            // Save token and user
            login(
                data.token,
                data.user
            );


            // Go to dashboard
            navigate("/");

        } catch (error) {

            console.error(error);

            setError(
                error.message || "Login failed."
            );

        } finally {

            setLoading(false);

        }

    }


    return (

        <Container
            className="d-flex align-items-center justify-content-center"
            style={{
                minHeight: "calc(100vh - 70px)"
            }}
        >

            <Card
                className="shadow-sm"
                style={{
                    width: "100%",
                    maxWidth: "450px"
                }}
            >

                <Card.Body className="p-4">

                    <div className="text-center mb-4">

                        <h2 className="fw-bold">
                            Welcome Back
                        </h2>

                        <p className="text-muted">
                            Login to your task management account
                        </p>

                    </div>


                    {error && (

                        <Alert variant="danger">
                            {error}
                        </Alert>

                    )}


                    <Form onSubmit={handleLogin}>

                        <Form.Group className="mb-3">

                            <Form.Label>
                                Email
                            </Form.Label>

                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(
                                        event.target.value
                                    )
                                }
                            />

                        </Form.Group>


                        <Form.Group className="mb-4">

                            <Form.Label>
                                Password
                            </Form.Label>

                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(
                                        event.target.value
                                    )
                                }
                            />

                        </Form.Group>


                        <Button
                            type="submit"
                            variant="primary"
                            className="w-100"
                            disabled={loading}
                        >

                            {loading ? (

                                <>
                                    <Spinner
                                        animation="border"
                                        size="sm"
                                        className="me-2"
                                    />

                                    Logging in...
                                </>

                            ) : (

                                "Login"

                            )}

                        </Button>

                    </Form>


                    <div className="text-center mt-4">

                        <span className="text-muted">
                            Don't have an account?{" "}
                        </span>

                        <Link to="/register">
                            Create account
                        </Link>

                    </div>

                </Card.Body>

            </Card>

        </Container>

    );

}


export default Login;