import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import { Outlet, NavLink } from "react-router-dom";
import "./component.css";
import { Link } from "react-router-dom";
import { sesi } from "./api";
const NavigasiBar = () => {
  const keluar = () => {
    localStorage.removeItem("myObject");
    window.location.assign("/");
  };
  return (
    <>
      <Navbar className="shadow-sm font" bg="light" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="#home">Mangan</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto align-items-center w-100 justify-content-end">
              <NavLink to="/dashboard" className="nav-link">
                Home
              </NavLink>
              <NavLink to="like-food" className="nav-link">
                Favorite Foods
              </NavLink>
              <NavDropdown title={sesi.name} id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="user">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2" onClick={keluar}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};
export default NavigasiBar;
