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

export function ViewMembersAccordion() {
  const [memberList, setMemberList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [registrationSentence, setRegistrationSentence] = useState("");

  useEffect(() => {
    (async () => {
      let users = await (
        await fetch(`http://localhost:5000/admin/getUsers`)
      ).json();
      setMemberList(users);
    })();
  }, []);

  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPhone, setEditedPhone] = useState("");

  const handleUpdate = (index, memberId) => {
    setMemberList((prevMemberList) => {
      const updatedMemberList = [...prevMemberList];
      updatedMemberList[index].isEditable = true;
      return updatedMemberList;
    });
  };

  const handleSave = (index, member) => {
    setMemberList((prevMemberList) => {
      const updatedMemberList = [...prevMemberList];
      const updatedMember = {
        ...updatedMemberList[index],
        isEditable: false,
      };
      updatedMemberList[index] = updatedMember;
      return updatedMemberList;
    });

    let email = member.email;
    let phoneNumber = member.phoneNumber;
    let username = member.username;
    const id = member._id;
    if (editedName && editedName !== member.username) {
      username = editedName;
    }
    if (editedEmail && editedEmail !== member.email) {
      email = editedEmail;
    }
    if (editedPhone && editedPhone !== member.phoneNumber) {
      phoneNumber = editedPhone;
    }

    (async () => {
      const packet = { id, username, email, phoneNumber };
      console.log(editedName, editedEmail, editedPhone);
      let response = await fetch(`http://localhost:5000/admin/updateUser`, {
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
    setMemberList((prevMemberList) => {
      const updatedMemberList = [...prevMemberList];
      const updatedMember = {
        ...updatedMemberList[index],
        [name]: value,
      };
      if (name === "name") {
        setEditedName(value);
        updatedMember.username = value;
      } else if (name === "email") {
        setEditedEmail(value);
        updatedMember.email = value;
      } else if (name === "phoneNumber") {
        setEditedPhone(value);
        updatedMember.phoneNumber = value;
      }
      updatedMemberList[index] = updatedMember;
      return updatedMemberList;
    });
  };

  const handleDelete = (index, id) => {
    (async () => {
      const packet = { id };
      let response = await fetch(`http://localhost:5000/admin/removeUser`, {
        method: "DELETE",
        body: JSON.stringify(packet),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        setMemberList((prevMemberList) => {
          const updatedMemberList = prevMemberList.filter(
            (member) => member._id !== id
          );
          return updatedMemberList;
        });
      } else {
        setRegistrationSentence("Can't delete user");
        setShowModal(true);
      }
    })();
  };

  return (
    <Accordion.Item eventKey="1">
      <Accordion.Header>View members</Accordion.Header>
      <Accordion.Body>
        <Container
          className="members"
          style={{ maxHeight: "400px", overflowY: "auto" }}
        >
          <Row className="member-row mb-4">
            <Col>Name</Col>
            <Col>Email</Col>
            <Col>Phone Number</Col>
            <Col></Col>
            <Col>Controls</Col>
          </Row>
          {memberList.map((member, index) => (
            <Row className="member-row mb-4" key={index}>
              <Col>
                {member.isEditable ? (
                  <Form.Control
                    name="name"
                    value={member.username}
                    onChange={(event) => handleChange(event, index)}
                  />
                ) : (
                  member.username
                )}
              </Col>
              <Col className="email">
                {member.isEditable ? (
                  <Form.Control
                    name="email"
                    value={member.email}
                    onChange={(event) => handleChange(event, index)}
                  />
                ) : (
                  member.email
                )}
              </Col>
              <Col className="phone">
                {member.isEditable ? (
                  <Form.Control
                    name="phoneNumber"
                    value={member.phoneNumber}
                    onChange={(event) => handleChange(event, index)}
                  />
                ) : (
                  member.phoneNumber
                )}
              </Col>
              <Col>{member.count}</Col>
              <Col>
                <Button onClick={() => handleDelete(index, member._id)}>
                  Delete Member
                </Button>
              </Col>
              <Col>
                {member.isEditable ? (
                  <Button onClick={() => handleSave(index, member)}>
                    Save
                  </Button>
                ) : (
                  <Button onClick={() => handleUpdate(index, member._id)}>
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
