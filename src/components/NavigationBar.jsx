import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavigationBar.css";

function NavigationBar() {
  return (
    <Navbar bg="light" expand="lg" className="navbar-custom">
      <Navbar.Brand>Company name</Navbar.Brand>
      <Navbar.Toggle aria-controls="my-navbar" />
      <Navbar.Collapse id="my-navbar">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/services">Services</Nav.Link>
        </Nav>
        <Nav>
          <Button variant="primary" as={Link} to="/login">Login</Button>
          <Button variant="primary" as={Link} to="/register">Register</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;