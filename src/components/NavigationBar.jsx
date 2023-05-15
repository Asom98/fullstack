import React, { useEffect, useState } from "react";
import { Navbar, Nav, Button, Modal } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./css/NavigationBar.css";
import { Login } from "./LoginForm";
import { ConfirmationModal } from "./parts/ConfirmationModal";

function NavigationBar() {
  const navigate = useNavigate();

  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loggedIn, setLoggedIn] = useState(checkToken);
  const [showModal, setShowModal] = useState(false);

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
    fetch("https://backend-saloon.onrender.com/users/getUserData", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          setLoggedIn(false);
          setShowModal(true);
        }
      })
      .then((result) => {
        const user = result;
        if (user && user.role === "admin") {
          navigate("/admin");
        } else if (user && user.role === "user") {
          navigate("/user");
        }
      });
  };

  const handleLogoutClick = () => {
    navigate("/");
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setLoggedIn(false);
  };

  function checkToken() {
    if (
      document.cookie
        .split(";")
        .some((item) => item.trim().startsWith("accessToken="))
    ) {
      // Cookie exists
      return true;
    } else {
      // Cookie does not exist
      return false;
    }
  }

  return (
    <>
      <Navbar
        bg="light"
        expand="lg"
        sticky="top"
        className="navbar-custom"
        collapseOnSelect={true}
      >
        {showModal ? (
          <ConfirmationModal
            sentance={"Your session has expired"}
            onClose={() => setShowModal(false)}
          />
        ) : null}
        <Navbar.Brand className="brand-name">HKR Beauty Salon</Navbar.Brand>
        <Navbar.Toggle aria-controls="my-navbar" />
        <Navbar.Collapse id="my-navbar">
          <Nav className="mr-auto menu">
            <Nav.Link as={Link} to="/">
              {" "}
              Home{" "}
            </Nav.Link>
            <Nav.Link as={Link} to="/services">
              {" "}
              Services{" "}
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              {" "}
              About{" "}
            </Nav.Link>
            <Nav.Link as={Link} to="/contactus">
              {" "}
              Contact us{" "}
            </Nav.Link>
          </Nav>
          <Nav className="navbar-nav">
            {!loggedIn ? (
              <div>
                <Button
                  className="loginButton"
                  variant="primary"
                  onClick={handleLoginClick}
                >
                  Login
                </Button>
                <Button
                  className="registerButton"
                  variant="primary"
                  as={Link}
                  to="/registration"
                >
                  Register
                </Button>
              </div>
            ) : (
              <div className="d-flex justify-content-center nav-loggedin">
                <div className="user-icon" onClick={handleUserIconClick} />
                <Button
                  className="ml-3 logoutButton"
                  variant="primary"
                  onClick={handleLogoutClick}
                >
                  Logout
                </Button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={showLoginForm} onHide={handleLoginClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login onLoginSuccess={handleLoginSuccess} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavigationBar;
