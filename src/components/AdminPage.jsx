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
  return (
    <Container className={"admin-full"}>
      <h3>Admin Page!</h3>
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
