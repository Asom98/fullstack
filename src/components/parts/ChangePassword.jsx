import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import bcrypt from 'bcryptjs';

function ChangePassword (props) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userInfo, setUserInfo] = useState({})
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);

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

        if (newPassword !== confirmPassword) {
            setPasswordsMatch(false);
            return;
        }

        const isMatch = await bcrypt.compare(currentPassword, userInfo.password);
        if (!isMatch) {
            setPasswordError(true);
            return;
        }

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
        if (response.ok) {
            setPasswordChanged(true);
            setTimeout(() => {
                setPasswordChanged(false);
                props.onClose();
            }, );
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        if (!props.show) {
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setPasswordsMatch(true);
            setPasswordError(false);
            setPasswordChanged(false);
        }
    }, [props.show]);
  
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
                {passwordError && <div className="text-danger">Incorrect current password</div>}
            </Form.Group>
            <Form.Group controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control type="password" value={confirmPassword} onChange={e => {
                    setConfirmPassword(e.target.value);
                    setPasswordsMatch(e.target.value === newPassword);
                    }} />
                    {!passwordsMatch && <div className="text-danger">Passwords do not match</div>}
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