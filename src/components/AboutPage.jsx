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
              - Creted and styled Admin page <br /> &nbsp;&nbsp;&nbsp;&nbsp;*
              Made Admin control the users on the frontend
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;* Made Admin control the other admins on
              the frontend
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;* Made Admin control the bookings on the
              frontend
              <br />- Creted and styled Registration page
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;* Creted checking for the registration
              fileds
              <br />- Creted and styled Booking page
              <br />- Creted and styled About page
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
              <br />- Created, styled and made Login responsive: <br />
              &nbsp;&nbsp;&nbsp;&nbsp;* Fetched user from backend <br />
              &nbsp;&nbsp;&nbsp;&nbsp;* Rerouted to user page <br />- Created,
              styled and made Home page responsive.
              <br />- Created, styled and made User page responsive: <br />
              &nbsp;&nbsp;&nbsp;&nbsp;* Fetched user information and bookings
              from backend and displayed it <br />
              - Created, styled and made Service page responsive: <br />
              &nbsp;&nbsp;&nbsp;&nbsp;* Fetched services from backend <br />-
              Created, styled and made Contact us page responsive: <br />
              &nbsp;&nbsp;&nbsp;&nbsp;* Displayed the map using Google Maps API
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;* Made contact information clickable
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
            <Container className="developer-pic rounded-5 mt-4 mb-4"></Container>
          </Col>
          <Col xs={12} md={9} className="mb-5 mt-5">
            <h3>Kassim</h3>
            <p>Did this</p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
