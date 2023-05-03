import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function User() {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <p>Email: {user.email}</p>
      <p>Phone Number: {user.phoneNumber}</p>

      <Button variant="primary" onClick={handleLogoutClick}>Logout</Button>
    </div>
  );
}

export default User;