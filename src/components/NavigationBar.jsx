import React, { useState } from "react";
import { Navbar, Nav, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./css/NavigationBar.css";
import { Login } from "./LoginForm";


function NavigationBar() {

  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  const handleLoginClose = () => {
    setShowLoginForm(false);
  };

  const handleImgClick = () => {
    if (!loggedIn) {
      setShowLoginForm(true);
    }
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
          <img className="user-icon" src="./src/components/Images/icons8-male-user-48.png" alt="" onClick={handleImgClick} />
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