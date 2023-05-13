import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function ChangePassword (props) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userInfo, setUserInfo] = useState({})

    const fetchUserData = async () => {
        const response = await fetch(`http://localhost:3000/users/getUserData`, {
          method: "GET",
          headers: {
          },
          credentials: "include"
        });
        
        if (response.ok) {
          const result = await response.json()
          setUserInfo(result)
          return
        }

        if (response.status === 403) {
          navigate("/")
        }
    };
  
    const handleSave = async () => {
        const response = await fetch("http://localhost:3000/admin/updateUser", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: userInfo._id,
                password: newPassword,
            }),
        });
        props.onClose();
        console.log(newPassword)
    };

    useEffect(() => {
        fetchUserData();
    }, []);
  
    return (
      <Modal show={props.show} onHide={props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="currentPassword">
              <Form.Label>Current Password</Form.Label>
              <Form.Control type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
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