import React, { useEffect, useState } from "react";
import { Navbar, Nav, Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./css/NavigationBar.css";
import { Login } from "./LoginForm";

function NavigationBar() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loggedIn, setLoggedIn] = useState(checkToken);
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
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role === "admin") {
      navigate("/admin");
    } else if (user && user.role === "user") {
      navigate("/user");
    }
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    navigate("/");
    setLoggedIn(false);
   };

  function checkToken() {
    const token = localStorage.getItem("token")

    if (token == null) {
      return false
    } else {
      return true
    }
  }


  return (
    <Navbar
      bg="light"
      expand="md"
      sticky="top"
      className="navbar-custom"
      collapseOnSelect={true}
    >
      <Navbar.Brand>Company name</Navbar.Brand>
      <Navbar.Toggle aria-controls="my-navbar" />
      <Navbar.Collapse id="my-navbar">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/services">
            Services
          </Nav.Link>
          <Nav.Link as={Link} to="/about">
            About
          </Nav.Link>
          <Nav.Link as={Link} to="/contactus">
            Contact
          </Nav.Link>
        </Nav>
        <Nav className="navbar-nav">
          {!loggedIn ? (
            <div>
              <Button className="loginButton" variant="primary" onClick={handleLoginClick}>
                Login
              </Button>
              <Button className="registerButton" variant="primary" as={Link} to="/registration">
                Register
              </Button>
            </div>
          ) : (
            <div className="d-flex justify-content-center">
             <img className="user-icon" src="./src/components/Images/icons8-male-user-48.png" alt="User Icon" onClick={handleUserIconClick} />
             <Button variant="primary" className="ml-3 logoutButton" onClick={handleLogoutClick}>Logout</Button>
           </div>
          )}
        </Nav>
      </Navbar.Collapse>
      <Modal show={showLoginForm} onHide={handleLoginClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login onLoginSuccess={handleLoginSuccess} />
        </Modal.Body>
      </Modal>
    </Navbar>
  );
}

export default NavigationBar;
