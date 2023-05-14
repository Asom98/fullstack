import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Accordion,
} from "react-bootstrap";
import "../css/Admin.css";
import { ConfirmationModal } from "./ConfirmationModal";

export function ViewAdminsAccordion() {
  const [adminList, setAdminList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [registrationSentence, setRegistrationSentence] = useState("");

  useEffect(() => {
    (async () => {
      let admins = await (
        await fetch(`https://backend-saloon.onrender.com/admin/getAdmins`)
      ).json();
      setAdminList(admins);
    })();
  }, []);

  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPhone, setEditedPhone] = useState("");

  const handleUpdate = (index, adminId) => {
    setAdminList((prevAdminList) => {
      const updatedAdminList = [...prevAdminList];
      updatedAdminList[index].isEditable = true;
      return updatedAdminList;
    });
  };

  const handleSave = (index, admin) => {
    setAdminList((prevAdminList) => {
      const updatedAdminList = [...prevAdminList];
      const updatedAdmin = {
        ...updatedAdminList[index],
        isEditable: false,
      };
      updatedAdminList[index] = updatedAdmin;
      return updatedAdminList;
    });

    let email = admin.email;
    let phoneNumber = admin.phoneNumber;
    let username = admin.username;
    const id = admin._id;
    if (editedName && editedName !== admin.username) {
      username = editedName;
    }
    if (editedEmail && editedEmail !== admin.email) {
      email = editedEmail;
    }
    if (editedPhone && editedPhone !== admin.phoneNumber) {
      phoneNumber = editedPhone;
    }

    (async () => {
      const packet = { id, username, email, phoneNumber };
      let response = await fetch(`https://backend-saloon.onrender.com/admin/updateAdmin`, {
        method: "PUT",
        body: JSON.stringify(packet),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
      } else {
        setRegistrationSentence("Can't update");
        setShowModal(true);
      }
    })();
  };

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    setAdminList((prevAdminList) => {
      const updatedAdminList = [...prevAdminList];
      const updatedAdmin = {
        ...updatedAdminList[index],
        [name]: value,
      };
      if (name === "name") {
        setEditedName(value);
        updatedAdmin.username = value;
      } else if (name === "email") {
        setEditedEmail(value);
        updatedAdmin.email = value;
      } else if (name === "phoneNumber") {
        setEditedPhone(value);
        updatedAdmin.phoneNumber = value;
      }
      updatedAdminList[index] = updatedAdmin;
      return updatedAdminList;
    });
  };

  const handleDelete = (id) => {
    (async () => {
      const packet = { id };
      let response = await fetch(`https://backend-saloon.onrender.com/admin/removeAdmin`, {
        method: "DELETE",
        body: JSON.stringify(packet),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        setAdminList((prevAdminList) => {
          const updatedAdminList = prevAdminList.filter(
            (admin) => admin._id !== id
          );
          return updatedAdminList;
        });
      } else {
        setRegistrationSentence("Can't delete user");
        setShowModal(true);
      }
    })();
  };

  return (
    <Accordion.Item eventKey="1">
      <Accordion.Header>View Admins</Accordion.Header>
      <Accordion.Body>
        <Container
          className="admins"
          style={{ maxHeight: "400px", overflowY: "auto" }}
        >
          <Row className="admin-row mb-4">
            <Col md={3} className="table-title">
              Name
            </Col>
            <Col md={3} className="table-title">
              Email
            </Col>
            <Col md={3} className="table-title">
              Phone Number
            </Col>
            <Col md={3} className="table-title">
              Controls
            </Col>
          </Row>
          {adminList.map((admin, index) => (
            <Row className="admin-row mb-4" key={index}>
              <Col md={3} className="info-section">
                {admin.isEditable ? (
                  <Form.Control
                    name="name"
                    value={admin.username}
                    onChange={(event) => handleChange(event, index)}
                  />
                ) : (
                  admin.username
                )}
              </Col>
              <Col md={3} className="info-section">
                {admin.isEditable ? (
                  <Form.Control
                    name="email"
                    value={admin.email}
                    onChange={(event) => handleChange(event, index)}
                  />
                ) : (
                  admin.email
                )}
              </Col>
              <Col md={2} className="info-section">
                {admin.isEditable ? (
                  <Form.Control
                    name="phoneNumber"
                    value={admin.phoneNumber}
                    onChange={(event) => handleChange(event, index)}
                  />
                ) : (
                  admin.phoneNumber
                )}
              </Col>

              <Col md={2} className="info-section">
                <Button
                  className="colored-btn"
                  onClick={() => handleDelete(admin._id)}
                >
                  Delete admin
                </Button>
              </Col>
              <Col md={2} className="info-section">
                {admin.isEditable ? (
                  <Button
                    className="colored-btn"
                    onClick={() => handleSave(index, admin)}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    className="colored-btn"
                    onClick={() => handleUpdate(index, admin._id)}
                  >
                    Edit
                  </Button>
                )}
              </Col>
            </Row>
          ))}
        </Container>
      </Accordion.Body>
      {showModal && (
        <ConfirmationModal
          sentance={registrationSentence}
          onClose={() => setShowModal(false)}
        />
      )}
    </Accordion.Item>
  );
}
