import React, { useState } from "react";
import "./css/LoginForm.css";
import { useNavigate } from "react-router-dom";

export const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(null);
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
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setLoginStatus(true);

        console.log(data[1].role);

        if(data[1].role === "admin"){
          navigate("/admin");
        }else if (data[1].role === "user"){
          navigate("/user")
        }
        props.onLoginSuccess();

        localStorage.setItem("user", JSON.stringify(data[1]));
        
      } else {
        setLoginStatus(false);
      }
    } catch (error) {
      console.error("Error submitting login form:", error);
      setLoginStatus(false);
    }
  };

  return (
    <div className="login-form-container">
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
        </form>
        {loginStatus !== null && (
            <p className={`message ${loginStatus ? "success" : "error"}`}>
            {loginStatus ? "Login Successful" : "Login Failed"}
            </p>
        )}
    </div>
  );
};