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

export function ViewMembersAccordion() {
  const [memberList, setMemberList] = useState([
    {
      id: 1,
      name: "Farah",
      email: "Farah@gmail.com",
      phoneNumber: "00467999888",
    },
    {
      id: 2,
      name: "Albert",
      email: "Albert@gmail.com",
      phoneNumber: "004671234123",
    },
    {
      id: 3,
      name: "Sarah",
      email: "Sarah@gmail.com",
      phoneNumber: "00467656543",
    },
    {
      id: 4,
      name: "Shane",
      email: "Shane@gmail.com",
      phoneNumber: "004622334455",
    },
    {
      id: 1,
      name: "Farah",
      email: "Farah@gmail.com",
      phoneNumber: "00467999888",
    },
    {
      id: 1,
      name: "Farah",
      email: "Farah@gmail.com",
      phoneNumber: "00467999888",
    },
    {
      id: 1,
      name: "Farah",
      email: "Farah@gmail.com",
      phoneNumber: "00467999888",
    },
    {
      id: 1,
      name: "Farah",
      email: "Farah@gmail.com",
      phoneNumber: "00467999888",
    },
    {
      id: 1,
      name: "Farah",
      email: "Farah@gmail.com",
      phoneNumber: "00467999888",
    },
    {
      id: 1,
      name: "Farah",
      email: "Farah@gmail.com",
      phoneNumber: "00467999888",
    },
    {
      id: 1,
      name: "Farah",
      email: "Farah@gmail.com",
      phoneNumber: "00467999888",
    },
    {
      id: 1,
      name: "Farah",
      email: "Farah@gmail.com",
      phoneNumber: "00467999888",
    },
    {
      id: 1,
      name: "Farah",
      email: "Farah@gmail.com",
      phoneNumber: "00467999888",
    },
    {
      id: 1,
      name: "Farah",
      email: "Farah@gmail.com",
      phoneNumber: "00467999888",
    },
  ]);

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

  const handleSave = (index, memberId) => {
    setMemberList((prevMemberList) => {
      const updatedMemberList = [...prevMemberList];
      const updatedMember = {
        ...updatedMemberList[index],
        isEditable: false,
      };
      updatedMemberList[index] = updatedMember;
      return updatedMemberList;
    });
  };

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    console.log(name);
    setMemberList((prevMemberList) => {
      const updatedMemberList = [...prevMemberList];
      const updatedMember = {
        ...updatedMemberList[index],
        [name]: value,
      };
      updatedMemberList[index] = updatedMember;
      if (name === "name") {
        setEditedName(value);
      } else if (name === "email") {
        setEditedEmail(value);
      } else if (name === "phoneNumber") {
        setEditedPhone(value);
      }
      return updatedMemberList;
    });
  };

  const handleDelete = (index, memberId) => {
    setMemberList((prevMemberList) => {
      const updatedMemberList = prevMemberList.filter(
        (member) => member.id !== memberId
      );
      return updatedMemberList;
    });
  };

  return (
    <Accordion.Item eventKey="0">
      <Accordion.Header>View members</Accordion.Header>
      <Accordion.Body>
        <Container
          className="members"
          style={{ maxHeight: "400px", overflowY: "auto" }}
        >
          {memberList.map((member, index) => (
            <Row className="member-row mb-4" key={index}>
              <Col>
                {member.isEditable ? (
                  <Form.Control
                    name="name"
                    value={member.name}
                    onChange={(event) => handleChange(event, index)}
                  />
                ) : (
                  member.name
                )}
              </Col>
              <Col>
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
              <Col>
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
              <Col>
                <Button onClick={() => handleDelete(index, member.id)}>
                  Delete Member
                </Button>
              </Col>
              <Col>
                {member.isEditable ? (
                  <Button onClick={() => handleSave(index, member.id)}>
                    Save
                  </Button>
                ) : (
                  <Button onClick={() => handleUpdate(index, member.id)}>
                    Edit
                  </Button>
                )}
              </Col>
            </Row>
          ))}
        </Container>
      </Accordion.Body>
    </Accordion.Item>
  );
}
