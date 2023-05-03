import React, { useState } from "react";
import { Navbar, Nav, Button, Modal } from "react-bootstrap";
import { Link, useNavigate} from "react-router-dom";
import "./css/NavigationBar.css";
import { Login } from "./LoginForm";


function NavigationBar() {
  
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    if (!loggedIn) {
      setShowLoginForm(true);
    }
  };

  const handleLoginClose = () => {
    setShowLoginForm(false);
  };

  const handleLoginSuccess = () => {
    setLoggedIn(true);
    setShowLoginForm(false);
  };

  const handleUserIconClick = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role === "admin") {
      navigate("/admin");
    } else if (user && user.role === "user") {
      navigate("/user");
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
        {!loggedIn ? (
        <Button variant="primary" onClick={handleLoginClick}>Login</Button>
        ) : (
        <img className="user-icon" src="./src/components/Images/icons8-male-user-48.png" alt="User Icon" onClick={handleUserIconClick} />)}
        <Button variant="primary" as={Link} to="/registration">Register</Button>
        </Nav>
      </Navbar.Collapse>
      <Modal show={showLoginForm} onHide={handleLoginClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login onLoginSuccess={handleLoginSuccess}/>
        </Modal.Body>
      </Modal>
    </Navbar>
  );
}

export default NavigationBar;