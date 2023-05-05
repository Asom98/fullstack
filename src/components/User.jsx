import React, {useState} from "react";
import { Button,Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./css/User.css"

function User() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [editEmailMode, setEditEmailMode] = useState(false);
  const [editPhoneNumberMode, setEditPhoneNumberMode] = useState(false);

  const handleUpdateEmailClick = async () => {
    const response = await fetch("http://localhost:3000/admin/updateUser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user._id,
        email,
      }),
    });

    if (response.ok) {
      setEditEmailMode(false);
      const updatedUser = { ...user, email };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setEmail(email);
    }
  };

  const handleUpdatePhoneNumberClick = async () => {
    const response = await fetch("http://localhost:3000/admin/updateUser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user._id,
        phoneNumber,
      }),
    });

    if (response.ok) {
      setEditPhoneNumberMode(false);
      const updatedUser = { ...user, phoneNumber };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setPhoneNumber(phoneNumber);
    }
  };

  return (
    <div className="container">
      <h1 className="welcome-text">Welcome, {user.username}!</h1>
      <Card>
        <Card.Body>

          <Card.Subtitle className="mb-2 text-muted">
            Email:{" "} {editEmailMode ? (
            <span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
              <Button variant="primary" onClick={handleUpdateEmailClick}>Save</Button>
              <Button variant="secondary" onClick={() => setEditEmailMode(false)}> Cancel </Button>
            </span>

            ) : (

              <span>
                {user.email}{" "}
                <Button variant="link" onClick={() => setEditEmailMode(true)}> Edit </Button>
              </span>
            )}

            Phone Number:{" "}
            {editPhoneNumberMode ? (
              <span>
                <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                <Button variant="primary" onClick={handleUpdatePhoneNumberClick}>Save</Button>
                <Button variant="secondary" onClick={() => setEditPhoneNumberMode(false)}>Cancel</Button>
              </span>

            ) : (

              <span>
                {user.phoneNumber}{" "}
                <Button variant="link" onClick={() => setEditPhoneNumberMode(true)}>Edit</Button>
              </span>
            )}
          </Card.Subtitle>
        </Card.Body>
      </Card>
    </div>
  );
}

export default User;