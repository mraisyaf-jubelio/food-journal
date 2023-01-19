import React from "react";
import { Container, Row, Col, FloatingLabel, Form, Button, Alert } from "react-bootstrap";
import "./component.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { regisImg } from "./api";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Register = () => {
  const schema = yup.object({
    poto: yup
      .mixed()
      .required("You need to provide a file")
      .test("fileSize", "the file is top large, max 1mb", (value) => {
        return value && value[0].size <= 1000000;
      })
      .test("type", "not a picture, only jpg/png/jpeg", (value) => {
        return value && (value[0].type === "image/jpeg" || value[0].type === "image/png" || value[0].type === "image/jpg");
      }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    if (data.password !== data.password2) {
      throw new Error("Password tidak sama");
    }
    const photo = data.poto[0];
    regisImg(photo).then((response) => {
      axios
        .post(
          `${process.env.REACT_APP_BASEURL}/api/v1/register`,
          {
            name: data.name,
            email: data.email,
            password: data.password,
            passwordRepeat: data.password2,
            role: "user",
            profilePictureUrl: response,
            phoneNumber: data.number,
          },
          {
            headers: {
              apiKey: `${process.env.REACT_APP_APIKEY}`,
              "Content-Type": `application/json`,
            },
          }
        )
        .then((respon) => {
          window.location.assign("/");
        })
        .catch((err) => {
          if (err.response.data.message) {
            alert(err.response.data.message);
          } else {
            const showErr = err.response.data.errors;
            showErr.map((e) => alert(e.message));
          }
        });
    });
  };
  return (
    <section className="font position-relative">
      <Container>
        <Row className="p-4 justify-content-center align-items-center">
          <Col md={6} lg={4} sm={10} className="register">
            <h2 className="fw-bold text-center">Sign up</h2>
            <p className="text-center">Sign up into your account</p>
            <Form onSubmit={handleSubmit(onSubmit)}>
              {errors.poto?.message ? (
                <Alert variant="danger" className="msg">
                  {errors.poto?.message}
                </Alert>
              ) : (
                <></>
              )}
              <FloatingLabel controlId="floatingText" className="mb-3" label="Nama Lengkap">
                <Form.Control {...register("name")} autoFocus required placeholder="enter your name" />
              </FloatingLabel>
              <FloatingLabel controlId="floatingInput" className="mb-3" label="Email address">
                <Form.Control type="email" {...register("email")} placeholder="name@example.com" />
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" className="mb-3" label="Password">
                <Form.Control type="password" {...register("password")} placeholder="Password" />
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword2" className="" label="Confirm Password">
                <Form.Control type="password" {...register("password2")} label="confirm password" />
              </FloatingLabel>
              <Form.Group controlId="formFile" className="mb-4">
                <Form.Label>Photo</Form.Label>
                <Form.Control {...register("poto")} type="file" name="poto" />
              </Form.Group>
              <FloatingLabel controlId="floatingText" className="mb-3" label="Phone Number">
                <Form.Control type="number" {...register("number")} />
              </FloatingLabel>
              <Button variant="outline-light" type="submit" className="back-color w-100">
                Sign up
              </Button>{" "}
            </Form>
            <div className="mt-2">
              Allready have account? <Link to="/">Login</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default Register;
