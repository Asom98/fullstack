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
            <Container className="developer-pic rounded-5 mt-4 mb-4"></Container>
          </Col>
          <Col xs={12} md={9} className="mb-5 mt-5">
            <h4>Farah</h4>
            <p>Did this</p>
          </Col>
        </Row>
        <Row className="developer-row rounded-5">
          <Col xs={12} md={3}>
            <Container className="developer-pic rounded-5 mt-4 mb-4"></Container>
          </Col>
          <Col xs={12} md={9} className="mb-5 mt-5">
            <h4>Arrunee</h4>
            <p>Did this</p>
          </Col>
        </Row>
        <h2 className="team-title">BackEnd Team:</h2>
        <Row className="developer-row rounded-5">
          <Col xs={12} md={3}>
            <Container className="developer-pic rounded-5 mt-4 mb-4"></Container>
          </Col>
          <Col xs={12} md={9} className="mb-5 mt-5">
            <h4>David</h4>
            <p>Did this</p>
          </Col>
        </Row>
        <Row className="developer-row rounded-5">
          <Col xs={12} md={3}>
            <Container className="developer-pic rounded-5 mt-4 mb-4"></Container>
          </Col>
          <Col xs={12} md={9} className="mb-5 mt-5">
            <h4>Simon</h4>
            <p>Did this</p>
          </Col>
        </Row>
        <Row className="developer-row rounded-5">
          <Col xs={12} md={3}>
            <Container className="developer-pic rounded-5 mt-4 mb-4"></Container>
          </Col>
          <Col xs={12} md={9} className="mb-5 mt-5">
            <h4>Kassim</h4>
            <p>Did this</p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
