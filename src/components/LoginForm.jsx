import React, { useState } from "react";
import { Navbar, Nav, Button, Modal } from "react-bootstrap";
import "./css/LoginForm.css";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorPopup } from "./parts/ErrorPopup";
import { GoogleLogin } from "./GoogleLogin";

export const Login = (props) => {
  const { showPopup } = useParams();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(null);
  const [showModal, setShowModal] = useState(showPopup === "true");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://backend-saloon.onrender.com/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setLoginStatus(true);

        if (data.user.role === "admin") {
          navigate("/admin");
        } else if (data.user.role === "user") {
          navigate("/user");
        }

        props.onLoginSuccess();
      } else if (response.status === 404) {
        setLoginStatus(false);
        setErrorMessage("User does not exist. Please check your username.");
      } else {
        setLoginStatus(false);
        setErrorMessage("Wrong username or password. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting login form:", error);
      setLoginStatus(false);
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="login-form-container">
      {showModal ? <ErrorPopup onClose={() => setShowModal(false)} /> : null}
      <form onSubmit={handleLoginSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="username"
          id="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="********"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <button type="submit">Log In</button>
        <Button className="googleButton" variant="primary">
          <GoogleLogin />
        </Button>
      </form>
      {loginStatus !== null && (
        <p className={`message ${loginStatus ? "success" : "error"}`}>
          {loginStatus ? "Login Successful" : "Invalid username or password"}
        </p>
      )}
    </div>
  );
};
