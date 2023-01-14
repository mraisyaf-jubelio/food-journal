import React from "react";
import { Container, Row, Col, FloatingLabel, Form, Button } from "react-bootstrap";
import "./component.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";
import bg from "./assets/img/register.png";
import { regisImg } from "./api";
import { Link } from "react-router-dom";

const Register = () => {
  const schema = yup.object({
    poto: yup
      .mixed()
      .required("You need to provide a fila")
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
          alert(respon.data.data.message);
          window.location.assign("/");
        })
        .catch((err) => {
          const showErr = err.response.data.errors;
          showErr.map((e) => alert(e.message));
        });
    });
  };
  return (
    <section className="font position-relative">
      {/* <div className=" img-register">
      </div> */}
      <Container>
        <Row className=" p-2 justify-content-center align-items-center">
          <Col md={4} className="register">
            <h2 className="fw-bold text-center ">Register</h2>
            <p className="text-center ">Silahkan isi data diri anda</p>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FloatingLabel controlId="floatingText" className="mb-3" label="Nama Lengkap">
                <Form.Control {...register("name")} autoFocus required />
              </FloatingLabel>
              <FloatingLabel controlId="floatingInput" className="mb-3" label="Email address">
                <Form.Control type="email" {...register("email")} placeholder="name@example.com" />
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" className="mb-3" label="Password">
                <Form.Control type="password" {...register("password")} placeholder="Password" />
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword2" className="" label="Ulangi Password">
                <Form.Control type="password" {...register("password2")} placeholder="Password" />
              </FloatingLabel>
              <Form.Group controlId="formFile" className="mb-4">
                <Form.Label>Poto</Form.Label>
                <Form.Control {...register("poto")} type="file" name="poto" />
              </Form.Group>
              <p className="text-danger">{errors.poto?.message}</p>
              <FloatingLabel controlId="floatingText" className="mb-3" label="Nomor Telepon">
                <Form.Control type="number" {...register("number")} />
              </FloatingLabel>
              <Button variant="success" type="submit" className=" w-100">
                Submit
              </Button>{" "}
            </Form>
            <div className="mt-2">
              have'nt a acount? <Link to="/">Login</Link>
            </div>
          </Col>
          <Col md={6} sm={5} xs={6} className="ms-4">
            <img src={bg} alt="imageFood" className="img-fluid spin" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default Register;
