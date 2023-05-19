import React, { useState, useEffect } from "react";
import { Card, Button, Container, Col, Row } from "react-bootstrap";
import "./css/Service.css";
import { useNavigate } from "react-router-dom";
import { ConfirmationModal } from "./parts/ConfirmationModal";

export const ServicePage = () => {
  const [servicesData, setServicesData] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [bookingSentence, setbookingSentence] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/services/getServices",
          {
            method: "GET",
          }
        );
        const result = await response.json();
        setServicesData(result);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchServices();
  }, []);

  const handleBookClick = (service) => {
    navigate(`/booking/${service._id}`);
  };

  return (
    <Container className=" service-container d-flex flex-column justify-content-center align-items-center">
      <Container className="d-flex justify-content-center fs-1 fst-italic font-monospace text-white mt-5">
        Our Services
      </Container>
      <Container className="card-columns mt-4 custom-card-columns">
        {isLoading ? (
          <Container className="spinner-border text-primary"></Container>
        ) : (
          servicesData.map((service) => (
            <Container key={service._id} className={`custom card`}>
              <Col className="custom">
                <Row className="d-flex">
                  <Col
                    className={`${service.name.replace(/\s+/g, "-")}`}
                    sm={11}
                    lg={6}
                  ></Col>
                  <Col sm={11} lg={6}>
                    <Card.Body>
                      <Card.Title className="card-serviceName">
                        {service.name}
                      </Card.Title>
                      <Card.Text className="card-description">
                        {service.description}
                      </Card.Text>
                      <Card.Text className="card-text duration">
                        Duration: {service.duration}min
                      </Card.Text>
                      <Card.Text className="card-text price">
                        Price: ${service.price}
                      </Card.Text>
                      <Button onClick={() => handleBookClick(service)}>
                        Book Now
                      </Button>
                    </Card.Body>
                  </Col>
                </Row>
              </Col>
            </Container>
          ))
        )}
      </Container>
      {showModal && (
        <ConfirmationModal
          sentance={bookingSentence}
          onClose={() => setShowModal(false)}
        />
      )}
    </Container>
  );
};
