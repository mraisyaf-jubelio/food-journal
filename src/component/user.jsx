import React, { useState } from "react";
import { Button, Col, Container, Row, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { uploadImage } from "./api";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import poto from "./assets/img/potoDefault.png";

const User = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const local = localStorage.getItem("myObject");
  const obj = JSON.parse(local);
  let sesi = {};
  for (const i in obj) {
    sesi = obj[i];
  }

  const schema = yup.object({
    poto: yup
      .mixed()
      .required("You need to provide a file")
      .test("fileSize", "the file is top large", (value) => {
        return value && value[0].size <= 1000000;
      })
      .test("type", "not a picture", (value) => {
        return (
          value &&
          (value[0].type === "image/jpeg" ||
            value[0].type === "image/webp" ||
            value[0].type === "image/png" ||
            value[0].type === "application/jpg")
        );
      }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (data) => {
    const imgUser = data.poto[0];
    console.log(data);
    uploadImage(imgUser)
      .then((respon) => console.log(respon))
      .catch((eror) => console.log(eror));
  };

  return (
    <Container>
      <div className="poto">
        <h1 className="text-center pt-lg-5">Profile</h1>
      </div>
      <Row className="head-user justify-content-center">
        <Col md={5} sm={9} xs={9} className="body-user text-center p-3 p-sm-3">
          <div className="user-img text-center">
            <img src={sesi.pict ? sesi.pict : poto} className="img-fluid" alt="poto User" />
          </div>
          <div className="mt-3">
            <p className="fs-5">
              <FontAwesomeIcon icon={faUser} className="me-2" />
              {sesi.name}
            </p>
          </div>
          <div className="mt-3">
            <p className="fs-5">
              <FontAwesomeIcon icon={faEnvelope} className="me-2" />
              {sesi.email}
            </p>
          </div>
          <div className="mt-3">
            <p className="fs-5">
              <FontAwesomeIcon icon={faPhoneAlt} className="me-2" />
              {sesi.num}
            </p>
          </div>
          <Button onClick={handleShow} className="btn-light edit-user text-white">
            Edit
          </Button>
        </Col>
      </Row>

      {/* modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" {...register("name")} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" {...register("email")} />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-4">
              <Form.Label>Poto</Form.Label>
              <Form.Control {...register("poto")} type="file" name="poto" />
            </Form.Group>
            {/* <p className="text-danger">{errors.poto?.message}</p> */}
            <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="number" {...register("num")} />
            </Form.Group>
            <div className="d-flex justify-content-around mt-3">
              <Button variant="outline-light" className="back-color" type="submit">
                Submit
              </Button>
              <Button variant="outline-light" className="back-color" type="reset">
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default User;
