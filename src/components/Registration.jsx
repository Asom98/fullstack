import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
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
    <Container className="formCard my-5 py-5 rounded justify-content-center">
      <h1 className="register-title text-center fw-bold">Registration</h1>
      <Form onSubmit={handleSubmit} className="form">
        <Form.Group as={Row} controlId="formName">
          <Col sm={12} className="col-des">
            <Form.Control
              type="text"
              name="name"
              placeholder={"Your name"}
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
          <Col sm={12} className="col-des">
            <Form.Control
              type="email"
              name="email"
              placeholder={"Email"}
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
          <Col sm={12} className="col-des">
            <Form.Control
              type="password"
              name="password"
              placeholder={"Password"}
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
          <Col sm={12} className="col-des">
            <Form.Control
              type="password"
              name="repeatPassword"
              placeholder={"Repeated Password"}
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
          <Col sm={12} className="col-des">
            <Form.Control
              type="tel"
              name="phoneNumber"
              placeholder={"PhoneNumber"}
              onChange={handleInputChange}
              isInvalid={formErrors.phoneNumber}
              required
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.phoneNumber}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <row class="btnRow ">
          <column class="btnCol">
            <button
              type="submit"
              className="register-btn rounded fw-bold py-2 px-4 mt-4"
            >
              Sign up!
            </button>
          </column>
        </row>
      </Form>
      {showModal && (
        <ConfirmationModal
          sentance={registrationSentence}
          onClose={() => setShowModal(false)}
        />
      )}
    </Container>
  );
}
