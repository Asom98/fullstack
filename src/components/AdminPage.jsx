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

export function AdminPage() {
  return (
    <Container>
      <h3>Admin Page!</h3>
      <Accordion defaultActiveKey={null}>
        <ViewMembersAccordion />
        <Accordion.Item eventKey="1">
          <Accordion.Header>Handle Bookings</Accordion.Header>
          <Accordion.Body></Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Add Admin</Accordion.Header>
          <Accordion.Body>
            <Registration isAdmin={true} />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Add member</Accordion.Header>
          <Accordion.Body>
            <Registration isAdmin={false} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}
