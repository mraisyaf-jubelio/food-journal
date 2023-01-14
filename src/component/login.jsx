import { Col, Row, Form, Button, Container } from "react-bootstrap";
import loginBg from "./assets/img/Login.png";
import "./component.css";
import React from "react";
import { useForm } from "react-hook-form";
import { logging } from "./assets/auth/login";
const Login = () => {
  const { register, handleSubmit } = useForm();
  const submit = (data) => {
    const email = data.email;
    const pw = data.password;
    logging(email, pw)
      .then((respon) => {
        const el = respon.data.user;
        const user = [
          {
            id: el.id,
            name: el.name,
            email: el.email,
            pict: el.profilePictureUrl,
            token: respon.data.token,
            num: el.phoneNumber,
            role: el.role,
          },
        ];

        localStorage.setItem("myObject", JSON.stringify(user));
        if (el.role === "user") {
          window.location.assign("/dashboard");
        } else {
          window.location.assign("/admin");
        }
      })
      .catch((err) => alert(err.response.data.message));
  };
  return (
    <>
      <Container fluid className="font cont">
        <Row className="p-3 justify-content-center">
          <Col md={4} sm={5}>
            <img src={loginBg} className="img-fluid rounded-start" alt="ilustrasi" />
          </Col>
          <Col md={4} sm={5} className="kolom-login p-3 rounded-end">
            <h3 className="fw-bold judul">Login</h3>
            <p className="text-muted mb-2">Masukan email dan password untuk masuk</p>
            <Form onSubmit={handleSubmit(submit)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" {...register("email")} placeholder="Masukan email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" {...register("password")} placeholder="Masukan Password" />
              </Form.Group>

              <Button variant="outline-light" className="back-color mb-3 w-100" type="submit">
                Submit
              </Button>
              <Form.Text className="text-center text-capitalize">
                Tidak punya akun? <a href="register">Register</a>
              </Form.Text>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
