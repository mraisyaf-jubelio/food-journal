import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import insta from "./assets/img/Instagram.png";
import link from "./assets/img/LinkedIn.png";
import fb from "./assets/img/Facebook.png";
import tik from "./assets/img/Tiktok.png";

const Footer = () => {
  return (
    <footer className="bd-footer py-md-3 mt-5 bg-light">
      <Container className="py-4 py-md-5 px-4 px-md-3">
        <Row className="justify-content-around">
          <Col lg={3} className="mb-3 ">
            <h2>Mangan</h2>
            <ul className="list-unstyled small text-muted">
              <li className="mb-2">
                a website that can display food/drinks that can be saved along with recipes and if you like it, just add it to
                the food you like. <a href="https://github.com/raisyaf20/food-journal">Github</a>.
              </li>
            </ul>
            <div className="d-flex">
              <div style={{ width: "3rem" }}>
                <a href="https://www.instagram.com/lib.rei/">
                  <img src={insta} className="img-fluid" alt="" />
                </a>
              </div>
              <div style={{ width: "3rem" }}>
                <a href="https://www.linkedin.com/in/muhamad-raisyaf-875486246/">
                  <img src={link} className="img-fluid" alt="" />
                </a>
              </div>
              <div style={{ width: "3rem" }}>
                <a href="https://www.facebook.com/">
                  <img src={fb} className="img-fluid" alt="" />
                </a>
              </div>
              <div style={{ width: "3rem" }}>
                <a href="https://www.tiktok.com/id-ID/">
                  <img src={tik} className="img-fluid" alt="" />
                </a>
              </div>
            </div>
          </Col>
          <Col xs={6} lg={2} className="mb-3">
            <h6 className="fw-bolder">OVERVIEW</h6>
            <ul className="list-unstyled">
              <li className="mb-2">About us</li>
              <li className="mb-2">Terms of Use</li>
              <li className="mb-2">Privacy Police</li>
              <li className="mb-2">Contact us</li>
            </ul>
          </Col>
          <Col xs={6} lg={2} className=" mb-3">
            <h6 className="fw-bolder">COMUNITY</h6>
            <ul className="list-unstyled">
              <li className="mb-2">Comunity Central</li>
              <li className="mb-2">Support</li>
              <li className="mb-2">Help</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
