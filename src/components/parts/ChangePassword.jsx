import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";


function ChangePassword(props) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const response = await fetch(`http://localhost:3000/users/getUserData`, {
      method: "GET",
      headers: {},
      credentials: "include",
    });

    if (response.ok) {
      const result = await response.json();
      setUserInfo(result);
    }

    if (response.status === 403) {
      navigate("/");
    }
  };

  const handleSave = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      setShowError(true);
      return;
    }

    const response = await fetch("http://localhost:3000/users/newPassword", {
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
      setPasswordChanged(true);
      setTimeout(() => {
        setPasswordChanged(false);
        props.onClose();
        setCurrentPassword("");
        setPassword("");
        setConfirmPassword("");
      }, 2000);
    } else {
      const error = await response.text();
      setErrorMessage(error);
      setShowError(true);
    }
  };

  const onHide = () => {
    setCurrentPassword("");
    setPassword("");
    setConfirmPassword("");
    setErrorMessage("");
    setShowError(false);
    props.onClose();
  };
  
    return (
      <Modal show={props.show} onHide={props.onClose} className="main-modal">
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {passwordChanged && <div className="text-success mb-3">Password changed successfully.</div>}
          <Form className="d-flex flex-column mx-auto">
            <Form.Group controlId="currentPassword">
                <Form.Label>Current Password</Form.Label>
                <Form.Control type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control type="password" value={confirmPassword} onChange={e => {
                    setConfirmPassword(e.target.value);
                    setPasswordsMatch(e.target.value === password);
                    }} />
                </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onClose}>
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