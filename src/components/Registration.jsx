import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

export function Registration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    phoneNumber: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    phoneNumber: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    /*Add checks later*/
  };

  return (
    <Container className="my-5 py-5 border rounded">
      <h1 className="text-center mb-4">Registration</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="formName">
          <Form.Label column sm={2}>
            Name:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              isInvalid={formErrors.name}
              required
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.name}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formEmail">
          <Form.Label column sm={2}>
            Email:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              isInvalid={formErrors.email}
              required
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.email}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPassword">
          <Form.Label column sm={2}>
            Password:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              isInvalid={formErrors.password}
              required
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.password}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formRepeatPassword">
          <Form.Label column sm={2}>
            Repeat Password:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="password"
              name="repeatPassword"
              value={formData.repeatPassword}
              onChange={handleInputChange}
              isInvalid={formErrors.repeatPassword}
              required
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.repeatPassword}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPhoneNumber">
          <Form.Label column sm={2}>
            Phone Number:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              isInvalid={formErrors.phoneNumber}
              required
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.phoneNumber}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Button type="submit" className="mt-4">
          Register
        </Button>
      </Form>
    </Container>
  );
}
