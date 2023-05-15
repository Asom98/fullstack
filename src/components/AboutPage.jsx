import React, { useState } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import "./css/About.css";

export function AboutPage() {
  return (
    <Container className="about-container">
      <Container className="about-in-container rounded-circle">
        <h2 className="team-title">FrontEnd Team:</h2>
        <Row className="developer-row rounded-6">
          <Col xs={12} md={4}>
            <Container className="developer-pic-Farah rounded-circle"></Container>
            <h2 className="developer-name">Farah Mallah</h2>
          </Col>
          <Col xs={12} md={8}>
            <Container className="about-info rounded-circle">
              <p>
                Creted, styled and made Admin page responsive
                <br /> <span style={{ color: "green" }}>*</span> Made Admin
                control the users on the frontend
                <br />
                <span style={{ color: "green" }}>*</span> Made Admin control the
                other admins on the frontend
                <br />
                <span style={{ color: "green" }}>*</span> Made Admin control the
                bookings on the frontend
                <br />
                Creted, styled and made Registration page responsive
                <br />
                <span style={{ color: "green" }}>*</span> Creted checking for
                the registration fileds
                <br />
                Creted, styled and made Booking page responsive
                <br />
                Creted, styled and made About page responsive
                <br />
                Creted, styled and made the Footer responsive
              </p>
            </Container>
          </Col>
        </Row>
        <Row className="developer-row rounded-6">
          <Col xs={12} md={4}>
            <Container className="developer-pic-Arunee rounded-circle mt-4 mb-4"></Container>
            <h2 className="developer-name">Arunee Thongkrathok</h2>
          </Col>
          <Col xs={12} md={8}>
            <Container className="about-info rounded-circle">
              <p>
                Made Navigation bar
                <br />
                Created, styled and made Login modal
                <br />
                Created, styled and made Home page responsive
                <br />
                Created, styled and made User page responsive
                <br />
                <span style={{ color: "green" }}>*</span> Fetched user
                information and bookings from backend and displayed it <br />
                Created, styled and made Service page responsive
                <br />
                <span style={{ color: "green" }}>*</span> Fetched services from
                backend <br />
                Created, styled and made Contact us page responsive
                <br />
                <span style={{ color: "green" }}>*</span> Displayed the map
                using Google Maps API links.
              </p>
            </Container>
          </Col>
        </Row>
        <h2 className="team-title">BackEnd Team:</h2>
        <Row className="developer-row rounded-6">
          <Col xs={12} md={4}>
            <Container className="developer-pic-david rounded-circle mt-4 mb-4"></Container>
            <h2 className="developer-name">David Kalla</h2>
          </Col>
          <Col xs={12} md={8}>
            <Container className="about-info rounded-circle">
              <p>
                Handled creating routes and the calendar for the booking system
                <br />
                Handled the security and re-routing <br />
                <span style={{ color: "green" }}>*</span> Used cookies in the
                backend.
                <br />
                Created and managed the Database in MongoDB <br />
                Handled routes for login / finished registration <br />
                Handled routes for adding/removing users
                <br />
                Helped with bug fixing
                <br />
                Deployed the website
                <br />
                Structured the repo
                <br />
                Contributed to the documentation
              </p>
            </Container>
          </Col>
        </Row>
        <Row className="developer-row rounded-6">
          <Col xs={12} md={4}>
            <Container className="developer-pic-Simon rounded-circle mt-4 mb-4"></Container>
            <h2 className="developer-name">Simon Eriksson</h2>
          </Col>
          <Col xs={12} md={8}>
            <Container className="about-info rounded-circle">
              <p>
                Planning initial backend and database structure
                <br />
                Initial basic registration implementation. Finished
                implementation made by David.
                <br />
                Services <br />
                Database management:
                <br />
                <span style={{ color: "green" }}>*</span> Adding multiple
                developers for Atlas access <br />
                <span style={{ color: "green" }}>*</span> Assisting frontend
                team with database issues <br />
                <span style={{ color: "green" }}>*</span> Service table data
                management <br />
                Assisting with render deployment <br />
                Google login feature
              </p>
            </Container>
          </Col>
        </Row>
        <Row className="developer-row rounded-6">
          <Col xs={12} md={4}>
            <Container className="developer-pic-Kassim rounded-circle mt-4 mb-4"></Container>
            <h2 className="developer-name">Kassem Alsheikh</h2>
          </Col>
          <Col xs={12} md={8}>
            <Container className="about-info rounded-circle">
              <p>
                Creating a functional model for the website <br />
                Making the admin functional in the backend <br />
                Created a mailer to send confirmations to the users <br />
                Making APIs for: admin, statistics, etc
              </p>
            </Container>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
