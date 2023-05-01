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
      <Accordion defaultActiveKey="0">
        <ViewMembersAccordion />
        <Accordion.Item eventKey="1">
          <Accordion.Header>Add member</Accordion.Header>
          <Accordion.Body>
            <Registration />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}
