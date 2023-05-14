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
        await fetch(`https://backend-saloon.onrender.com/admin/getUsers`)
      ).json();
      setMemberList(users);
    })();
  }, []);

  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPhone, setEditedPhone] = useState("");
  const [editedCoupon, setEditedCoupon] = useState("");

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
    let couponAmount = member.couponAmount;
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
    if (editedCoupon && editedCoupon !== member.couponAmount) {
      couponAmount = editedCoupon;
    }
    (async () => {
      const packet = { id, username, email, phoneNumber, couponAmount };
      let response = await fetch(`https://backend-saloon.onrender.com/admin/updateUser`, {
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
      } else if (name === "couponAmount") {
        setEditedCoupon(value);
        updatedMember.couponAmount = value;
      }
      updatedMemberList[index] = updatedMember;
      return updatedMemberList;
    });
  };

  const handleDelete = (index, id) => {
    (async () => {
      const packet = { id };
      let response = await fetch(`https://backend-saloon.onrender.com/admin/removeUser`, {
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
            <Col md={2} className="table-title">
              Name
            </Col>
            <Col md={3} className="table-title">
              Email
            </Col>
            <Col md={2} className="table-title">
              Phone Number
            </Col>
            <Col md={1} className="table-title">
              Coupon amount
            </Col>
            <Col md={1} className="table-title">
              Amount spent
            </Col>
            <Col md={1} className="table-title">
              Booking amount
            </Col>
            <Col md={2} className="table-title">
              Controls
            </Col>
          </Row>
          {memberList.map((member, index) => (
            <>
              <Row className="member-row mb-4" key={index}>
                <Col className="info-section" md={2}>
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
                <Col className="info-section" md={3}>
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
                <Col className="info-section" md={2}>
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
                <Col className="info-section" md={1}>
                  {member.isEditable ? (
                    <Form.Control
                      name="couponAmount"
                      value={member.couponAmount}
                      onChange={(event) => handleChange(event, index)}
                    />
                  ) : (
                    member.couponAmount
                  )}
                </Col>
                <Col className="info-section" md={1}>
                  {member.amountSpent}
                </Col>
                <Col className="info-section" md={1}>
                  {member.bookingAmount}
                </Col>
                <Col className="info-section" md={1}>
                  {member.isEditable ? (
                    <Button
                      className="colored-btn"
                      onClick={() => handleSave(index, member)}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      className="colored-btn"
                      onClick={() => handleUpdate(index, member._id)}
                    >
                      Edit
                    </Button>
                  )}
                </Col>
                <Col className="info-section" md={1}>
                  <Button
                    className="colored-btn"
                    onClick={() => handleDelete(index, member._id)}
                  >
                    Delete
                  </Button>
                </Col>
              </Row>
              <Row></Row>
            </>
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
