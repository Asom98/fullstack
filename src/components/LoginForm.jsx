import React from "react";
import "./LoginForm.css";


export const Login = ({ onClose }) => {
  const handleLoginSubmit = (event) => {
    event.preventDefault();
    //  Handle login logic here!
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleLoginSubmit}>
        <label for="email">Email</label>
        <input type="email" placeholder="youremail@gmail.com" id="email" name="email" required />
        <label for="password">Password</label>
        <input type="password" placeholder="********" id="password" name="password" required />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};