import React, { useState } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import "./css/About.css";

export function AboutPage() {
  return (
    <Container className="about-container justify-content-center">
      <Container className="about-in-container justify-content-center rounded-5">
        <h2 className="team-title">FrontEnd Team:</h2>
        <Row className="developer-row rounded-5">
          <Col xs={12} md={3}>
            <Container className="developer-pic-Farah rounded-5 mt-4 mb-4"></Container>
          </Col>
          <Col xs={12} md={9} className="mb-5 mt-5">
            <h3>Farah Mallah</h3>
            <p>
              - Creted, styled and made Admin page responsive <br />{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;* Made Admin control the users on the
              frontend:
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;* Made Admin control the other admins on
              the frontend.
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;* Made Admin control the bookings on the
              frontend.
              <br />- Creted, styled and made Registration page responsive:
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;* Creted checking for the registration
              fileds.
              <br />- Creted, styled and made Booking page responsive.
              <br />- Creted, styled and made About page responsive.
            </p>
          </Col>
        </Row>
        <Row className="developer-row rounded-5">
          <Col xs={12} md={3}>
            <Container className="developer-pic rounded-5 mt-4 mb-4"></Container>
          </Col>
          <Col xs={12} md={9} className="mb-5 mt-5">
            <h3>Arrunee</h3>
            <p>
              - Created, styled and made Navigation bar responsive: <br />
              &nbsp;&nbsp;&nbsp;&nbsp;* Rerouted to different pages <br />
              &nbsp;&nbsp;&nbsp;&nbsp;* Added different buttons depending on the
              state of the user like login, logout, register buttons
              <br />- Created, styled and made Login modal. <br />- Created,
              styled and made Home page responsive.
              <br />- Created, styled and made User page responsive: <br />
              &nbsp;&nbsp;&nbsp;&nbsp;* Fetched user information and bookings
              from backend and displayed it <br />
              - Created, styled and made Service page responsive: <br />
              &nbsp;&nbsp;&nbsp;&nbsp;* Fetched services from backend <br />-
              Created, styled and made Contact us page responsive: <br />
              &nbsp;&nbsp;&nbsp;&nbsp;* Displayed the map using Google Maps API
              links.
            </p>
          </Col>
        </Row>
        <h2 className="team-title">BackEnd Team:</h2>
        <Row className="developer-row rounded-5">
          <Col xs={12} md={3}>
            <Container className="developer-pic-david rounded-5 mt-4 mb-4"></Container>
          </Col>
          <Col xs={12} md={9} className="mb-5 mt-5">
            <h3>David Kalla</h3>
            <p>- Booking system</p>
            <p>- Security</p>
            <p>- Database</p>
          </Col>
        </Row>
        <Row className="developer-row rounded-5">
          <Col xs={12} md={3}>
            <Container className="developer-pic rounded-5 mt-4 mb-4"></Container>
          </Col>
          <Col xs={12} md={9} className="mb-5 mt-5">
            <h3>Simon</h3>
            <p>Did this</p>
          </Col>
        </Row>
        <Row className="developer-row rounded-5">
          <Col xs={12} md={3}>
            <Container className="developer-pic-Kassim rounded-5 mt-4 mb-4"></Container>
          </Col>
          <Col xs={12} md={9} className="mb-5 mt-5">
            <h3>Kassem Alsheikh</h3>
            <p>
              - Creating a functional model for the website <br />
              - Making the admin functional in the backend <br />
              - Created a mailer to send confirmations to the users <br />-
              Making APIs for: admin, statistics, etc
            </p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
