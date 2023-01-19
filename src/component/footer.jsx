import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bd-footer py-md-3 mt-5 bg-light">
      <Container className="py-4 py-md-5 px-4 px-md-3">
        <Row>
          <Col lg={3} className="mb-3">
            <h2>Mangan</h2>
            <ul class="list-unstyled small text-muted">
              <li class="mb-2">
                a website that can display food/drinks that can be saved along with recipes and if you like it, just add it to
                the food you like. <a href="https://github.com/raisyaf20/food-journal">Github</a>.
              </li>
            </ul>
          </Col>
          <Col xs={6} lg={2} className="offset-lg-1 mb-3">
            <h5>Media Social</h5>
            <ul class="list-unstyled">
              <li class="mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-brand-instagram bg-transparent"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <rect x="4" y="4" width="16" height="16" rx="4"></rect>
                  <circle cx="12" cy="12" r="3"></circle>
                  <line x1="16.5" y1="7.5" x2="16.5" y2="7.501"></line>
                </svg>
                <a href="https://www.instagram.com/lib.rei">Instagram</a>
              </li>
              <li class="mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-brand-linkedin bg-transparent"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <rect x="4" y="4" width="16" height="16" rx="2"></rect>
                  <line x1="8" y1="11" x2="8" y2="16"></line>
                  <line x1="8" y1="8" x2="8" y2="8.01"></line>
                  <line x1="12" y1="16" x2="12" y2="11"></line>
                  <path d="M16 16v-3a2 2 0 0 0 -4 0"></path>
                </svg>
                <a href="https://www.linkedin.com/in/muhamad-raisyaf-875486246/">Linkedin</a>
              </li>
            </ul>
          </Col>

          <Col xs={6} lg={2} className="mb-3">
            <h5>Projects</h5>
            <ul class="list-unstyled">
              <li class="mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-brand-github bg-transparent"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path>
                </svg>
                <a href="https://github.com/raisyaf20">Github</a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
