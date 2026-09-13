import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import { Link } from "react-router-dom";


function NotFound() {

    return (

        <Container
            className="text-center d-flex flex-column align-items-center justify-content-center"
            style={{
                minHeight: "70vh"
            }}
        >

            <div
                style={{
                    fontSize: "100px",
                    fontWeight: "800"
                }}
            >
                404
            </div>


            <h2 className="fw-bold mb-3">
                Page Not Found
            </h2>


            <p className="text-muted mb-4">
                The page you are looking for does not exist.
            </p>


            <Button
                as={Link}
                to="/"
                variant="primary"
            >
                Back to Dashboard
            </Button>

        </Container>

    );

}


export default NotFound;