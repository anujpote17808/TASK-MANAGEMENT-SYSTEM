import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

import { registerUser } from "../services/api";


function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    const [loading, setLoading] = useState(false);


    async function handleRegister(event) {

        event.preventDefault();

        setError("");

        setSuccess("");


        // Validate fields
        if (
            !name.trim() ||
            !email.trim() ||
            !password.trim() ||
            !confirmPassword.trim()
        ) {

            setError(
                "All fields are required."
            );

            return;
        }


        // Validate password
        if (password.length < 6) {

            setError(
                "Password must be at least 6 characters."
            );

            return;
        }


        // Confirm password
        if (password !== confirmPassword) {

            setError(
                "Passwords do not match."
            );

            return;
        }


        try {

            setLoading(true);


            await registerUser(
                name.trim(),
                email.trim(),
                password
            );


            setSuccess(
                "Registration successful! Redirecting to login..."
            );


            setTimeout(() => {

                navigate("/login");

            }, 1500);


        } catch (error) {

            console.error(error);

            setError(
                error.message ||
                "Registration failed."
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
                            Create Account
                        </h2>

                        <p className="text-muted">
                            Create your task management account
                        </p>

                    </div>


                    {error && (

                        <Alert variant="danger">
                            {error}
                        </Alert>

                    )}


                    {success && (

                        <Alert variant="success">
                            {success}
                        </Alert>

                    )}


                    <Form onSubmit={handleRegister}>

                        {/* Name */}

                        <Form.Group className="mb-3">

                            <Form.Label>
                                Full Name
                            </Form.Label>

                            <Form.Control
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(event) =>
                                    setName(
                                        event.target.value
                                    )
                                }
                            />

                        </Form.Group>


                        {/* Email */}

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


                        {/* Password */}

                        <Form.Group className="mb-3">

                            <Form.Label>
                                Password
                            </Form.Label>

                            <Form.Control
                                type="password"
                                placeholder="Minimum 6 characters"
                                value={password}
                                onChange={(event) =>
                                    setPassword(
                                        event.target.value
                                    )
                                }
                            />

                        </Form.Group>


                        {/* Confirm Password */}

                        <Form.Group className="mb-4">

                            <Form.Label>
                                Confirm Password
                            </Form.Label>

                            <Form.Control
                                type="password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(event) =>
                                    setConfirmPassword(
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

                                    Creating account...
                                </>

                            ) : (

                                "Create Account"

                            )}

                        </Button>

                    </Form>


                    <div className="text-center mt-4">

                        <span className="text-muted">
                            Already have an account?{" "}
                        </span>

                        <Link to="/login">
                            Login
                        </Link>

                    </div>

                </Card.Body>

            </Card>

        </Container>

    );

}


export default Register;
