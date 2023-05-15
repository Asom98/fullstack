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
import "./css/Admin.css";
import { Registration } from "./Registration";
import { ViewMembersAccordion } from "./parts/ViewMembersAccordion";
import { ViewBookingsAccordion } from "./parts/ViewBookingsAccordion";
import { ViewAdminsAccordion } from "./parts/ViewAdminsAccordion";

export function AdminPage() {
  const [loyalList, setLoyalList] = useState([]);
  const [memberAmount, setMemberAmount] = useState([]);
  const [monthlyList, setMonthlyList] = useState(0);

  useEffect(() => {
    (async () => {
      let loyal = await (
        await fetch(`https://backend-saloon.onrender.com/statistic/getMostLoyal`)
      ).json();
      setLoyalList(loyal);
    })();
    (async () => {
      let memberAmount = await (
        await fetch(`http://localhost:3000/statistic/getUsersCount`)
      ).json();
      setMemberAmount(memberAmount);
    })();
    (async () => {
      let loyal = await (
        await fetch(`https://backend-saloon.onrender.com/statistic/getMostLoyal`)
      ).json();
      setLoyalList(loyal);
    })();
  }, []);

  return (
    <Container className={"admin-full"}>
      <h2>Admin Page!</h2>
      <Container className="statistics-row mb-4">
        <Row className="loyal-title">
          <Col md={8} className="statistic-container">
            <Row className="statistic-title">Most loyal member/s</Row>
            <Row>
              {loyalList.map((member, index) => (
                <Row key={index}>
                  <Col md={2} className="loyal-list-item text-center">
                    {member.username}
                  </Col>
                </Row>
              ))}
            </Row>
          </Col>
          <Col md={4} className="statistic-container">
            <Row className="statistic-title">Amount of members</Row>
            <Row>
              <Col md={4} className="member-amount text-center">
                {memberAmount}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Accordion defaultActiveKey={null}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Handle Admin</Accordion.Header>
          <Accordion.Body className={"accordion-section"}>
            <Accordion defaultActiveKey={null}>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Add Admins</Accordion.Header>
                <Accordion.Body>
                  <Registration isAdmin={true} />
                </Accordion.Body>
              </Accordion.Item>
              <ViewAdminsAccordion />
            </Accordion>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Handle Members</Accordion.Header>
          <Accordion.Body>
            <Accordion defaultActiveKey={null}>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Add Members</Accordion.Header>
                <Accordion.Body>
                  <Registration isAdmin={false} />
                </Accordion.Body>
              </Accordion.Item>
              <ViewMembersAccordion />
            </Accordion>
          </Accordion.Body>
        </Accordion.Item>
        <ViewBookingsAccordion />
      </Accordion>
    </Container>
  );
}
