import React, { useState } from "react";
import { Navbar, Nav, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavigationBar.css";
import { Login } from "./LoginForm";


function NavigationBar() {

  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  const handleLoginClose = () => {
    setShowLoginForm(false);
  };

  return (
    <Navbar bg="light" expand="lg" className="navbar-custom">
      <Navbar.Brand>Company name</Navbar.Brand>
      <Navbar.Toggle aria-controls="my-navbar" />
      <Navbar.Collapse id="my-navbar">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/services">Services</Nav.Link>
        </Nav>
        <Nav className="navbar-nav">
          <Button variant="primary" onClick={handleLoginClick}>Login</Button>
          <Button variant="primary" as={Link} to="/registration">Register</Button>
        </Nav>
      </Navbar.Collapse>
      <Modal show={showLoginForm} onHide={handleLoginClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login />
        </Modal.Body>
      </Modal>
    </Navbar>
  );
}

export default NavigationBar;