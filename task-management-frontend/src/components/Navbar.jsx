import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import {
    Link,
    useNavigate
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";


function AppNavbar() {

    const navigate = useNavigate();

    const {
        user,
        isAuthenticated,
        logout
    } = useAuth();


    function handleLogout() {

        logout();

        navigate("/login");

    }


    return (

        <Navbar
            bg="dark"
            variant="dark"
            expand="lg"
        >

            <Container>

                <Navbar.Brand
                    as={Link}
                    to="/"
                >
                    Task Management
                </Navbar.Brand>


                <Navbar.Toggle
                    aria-controls="basic-navbar-nav"
                />


                <Navbar.Collapse
                    id="basic-navbar-nav"
                >

                    <Nav className="ms-auto">

                        {isAuthenticated ? (

                            <>

                                <Nav.Link
                                    as={Link}
                                    to="/"
                                >
                                    Dashboard
                                </Nav.Link>


                                <Nav.Link
                                    as={Link}
                                    to="/tasks"
                                >
                                    Tasks
                                </Nav.Link>


                                <Nav.Link
                                    as={Link}
                                    to="/profile"
                                >
                                    Profile
                                </Nav.Link>


                                <span className="navbar-text text-light mx-3">
                                    Hello, {user?.name}
                                </span>


                                <Button
                                    variant="outline-light"
                                    size="sm"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>

                            </>

                        ) : (

                            <Nav.Link
                                as={Link}
                                to="/login"
                            >
                                Login
                            </Nav.Link>

                        )}

                    </Nav>

                </Navbar.Collapse>

            </Container>

        </Navbar>

    );

}


export default AppNavbar;