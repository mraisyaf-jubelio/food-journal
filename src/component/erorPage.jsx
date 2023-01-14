import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import bg from "./assets/img/bg-eror.png"
import ilus from "./assets/img/emoji.png"
const Error = () => {
    return (
        <Container fluid className="position-relative">
            <Row className="eror align-items-center ">
                <Col md={5} className="ms-4">
                    <h1 className="fw-bolder" style={{ fontSize: "5rem" }}>Ooops...</h1>
                    <p className="text-capitalize mt-2" style={{ fontSize: "1.3rem" }}>page not found</p>
                    <div className="text-eror">
                    <p className="mt-3">The page you are looking for doesn’t exist or an
                        other error occurred, go back to home page.
                    </p>
                    </div>
                    <Link to="/" className="btn bg-info mt-3 p-2" >
                        <div className="btn-eror fs-5">
                            Go Back
                        </div>
                    </Link>
                </Col>
            </Row>
            <div className="d-flex flex-column head-4">
                <div className="text-404">4</div>
                <div className="text-404">0</div>
                <div className="text-404">4</div>
            </div>
            <div className="bg-eror">
                <img src={bg} alt="" className="img-fluid"/>
            </div>
            <div className="vektor">
                <img src={ilus} alt="vektor" className="img-fluid"/>
            </div>

        </Container>
    )
}

export default Error;