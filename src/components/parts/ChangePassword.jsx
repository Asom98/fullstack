import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function ChangePassword(props) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordError, setPasswordError] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleSave = async () => {

    const response = await fetch("https://backend-saloon.onrender.com/users/newPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        currentPassword,
        password,
      }),
    });

    if (response.ok) {
      setSuccessMessage(true);
      setPasswordError(false);
      setCurrentPassword("");
      setPassword("");
      setConfirmPassword("");
    } else if (response.status === 400) {
      setPasswordError(true);
    } else {
      alert("An error occurred. Please try again later.");
    }
  };

  const handleClose = () => {
    setCurrentPassword("");
    setPassword("");
    setConfirmPassword("");
    setPasswordError(false);
    setPasswordsMatch(true);
    props.onClose();
    setSuccessMessage("");
  };

  return (
    <Modal show={props.show} onHide={handleClose} className="main-modal">
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {successMessage && (
        <div className="text-success">Password changed successfully!</div>
        )}
        <Form className="d-flex flex-column mx-auto">
          <Form.Group controlId="currentPassword">
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            {passwordError && (
              <div className="text-danger">Incorrect current password</div>
            )}
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setPasswordsMatch(e.target.value === password);
              }}
            />
            {!passwordsMatch && (
              <div className="text-danger">Passwords do not match</div>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ChangePassword;
