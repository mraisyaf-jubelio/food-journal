import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import { Outlet, NavLink } from "react-router-dom";
import "../component.css";
import { Link } from "react-router-dom";

const NavigasiAdmin = () => {
  const local = localStorage.getItem("myObject");
  const obj = JSON.parse(local);
  let sesi = {};
  for (const i in obj) {
    sesi = obj[i];
  }
  const keluar = () => {
    localStorage.removeItem("myObject");
    window.location.assign("/");
  };

  return (
    <>
      <Navbar bg="light" className="shadow-sm " expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto align-items-center w-100 justify-content-end">
              <NavLink to="/admin" className="nav-link">
                Home
              </NavLink>
              <NavLink to="addFoodAdmin" className="nav-link">
                Add Food
              </NavLink>
              <NavDropdown title={sesi.name} id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="profile">
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
export default NavigasiAdmin;
