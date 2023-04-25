import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { ConfirmationModal } from "./parts/ConfirmationModal";
import "./Registration.css";

export function Registration() {
  const [showModal, setShowModal] = useState(false);
  const [registrationSentence, setRegistrationSentence] = useState("");
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

  async function submitRegister() {
    const packet = {
      username: formData.name,
      password: formData.password,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
    };

    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      body: JSON.stringify(packet),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 201) {
      setRegistrationSentence("You have succesfuly registered!");
      setShowModal(true);
    } else {
      setRegistrationSentence("This user already exists");
      setShowModal(true);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      // form is valid, submit data to server or do something else
      console.log("Form data:", formData);
      setFormErrors({
        name: "",
        email: "",
        password: "",
        repeatPassword: "",
        phoneNumber: "",
      });
      submitRegister();
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) {
      errors.name = "Name is required";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Email is not valid";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 10) {
      errors.password = "Password must be at least 10 characters long";
    } else if (!/(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.password =
        "Password must include at least one capital letter and one number";
    }
    if (formData.password !== formData.repeatPassword) {
      errors.repeatPassword = "Passwords do not match";
      setFormData((prevState) => ({
        ...prevState,
        password: "",
        repeatPassword: "",
      }));
    }
    if (!formData.phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    } else if (!/^\+46\d{9}$/.test(formData.phoneNumber)) {
      errors.phoneNumber =
        "Phone number is not valid. Please use the format +46XXXXXXXXX";
    }
    return errors;
  };

  return (
    <Container className="formCard my-5 py-5 border rounded justify-content-center">
      <h1 className="text-center mb-4 fw-bold">Registration</h1>
      <Form onSubmit={handleSubmit} className="justify-content-center">
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
      {showModal && <ConfirmationModal sentance={registrationSentence} />}
    </Container>
  );
}
