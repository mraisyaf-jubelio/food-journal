import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { getUser, sesi, uploadImage } from "./api";
import poto from "./assets/img/potoDefault.png";
import axios from "axios";

const User = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    let respon = data.defImg;
    const imgUser = data.poto[0];

    if (data.poto) {
      try {
        respon = await uploadImage(imgUser);
      } catch (error) {
        console.log(error.response.data);
      }
    }
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/api/v1/update-profile`,
        {
          name: data.name,
          email: data.email,
          profilePictureUrl: respon,
          phoneNumber: data.num,
        },
        {
          headers: {
            apiKey: process.env.REACT_APP_APIKEY,
            Authorization: `Bearer ${sesi.token}`,
          },
        }
      )
      .then((response) => {
        alert(response.data.message);
        window.location.reload(false);
      })
      .catch((err) => console.log(err.response.data));
  };

  useEffect(() => {
    getUser().then((respon) => setData(respon));
  }, []);
  return (
    <Container className="font">
      <div className="poto">
        <h1 className="text-center pt-lg-5">Profile</h1>
      </div>
      <Row className="head-user justify-content-center">
        <Col md={5} sm={9} xs={9} className="body-user p-3 p-sm-3 text-center">
          <div className="user-img text-center">
            <img src={data.profilePictureUrl ? data.profilePictureUrl : poto} className="img-fluid" alt="poto User" />
          </div>
          <div className="mt-3">
            <p className="fs-5 fw-700">
              <FontAwesomeIcon icon={faUser} className="me-2 color" />
              {data.name}
            </p>
          </div>
          <div className="mt-3">
            <p className="fs-5 fw-700">
              <FontAwesomeIcon icon={faEnvelope} className="me-2 color" />
              {data.email}
            </p>
          </div>
          <div className="mt-3">
            <p className="fs-5 fw-700">
              <FontAwesomeIcon icon={faPhoneAlt} className="me-2 color" />
              {data.phoneNumber}
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
              <Form.Control type="text" {...register("name")} defaultValue={data.name} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" {...register("email")} defaultValue={data.email} />
            </Form.Group>
            <Form.Control type="hidden" value={data.profilePictureUrl} {...register("defImg")} />
            <Form.Group controlId="formFile" className="mb-4">
              <Form.Label>Poto</Form.Label>
              <Form.Control {...register("poto")} type="file" name="poto" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="number" {...register("num")} defaultValue={data.phoneNumber} />
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
