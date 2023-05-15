import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
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
          "https://backend-saloon.onrender.com/services/getServices",
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

  function containerStyle(backgroundImageUrl) {
    return {
      backgroundImage: `url(/src/components/Images/${backgroundImageUrl})`,
      height: "250px",
      width: "300px",
      backgroundSize: "cover",
    };
  }

  return (
    <div className=" service-container d-flex flex-column justify-content-center align-items-center">
      <div className="d-flex justify-content-center fs-1 fst-italic font-monospace text-white mt-5">
        Our Services
      </div>
      <div className="card-columns mt-4 custom-card-columns">

        { isLoading ? (
              <div className="spinner-border text-primary"></div>
            ) : (
        servicesData.map((service) => (
          <div key={service._id} className="custom card">
            <Card className="custom">
              <div className="d-flex">
                <div style={containerStyle(service.img)}></div>
                <Card.Body>
                <Card.Title className="card-serviceName">{service.name}</Card.Title>
                <Card.Text className="card-description">{service.description}</Card.Text>
                <Card.Text className="card-text duration">Duration: {service.duration}min</Card.Text>
                <Card.Text className="card-text price">Price: ${service.price}</Card.Text>
                <Button onClick={() => handleBookClick(service)}>Book Now</Button>
                </Card.Body>
              </div>
            </Card>
          </div>
        )))
      }

        {isLoading ? (
          <div className="spinner-border text-primary"></div>
        ) : (
          servicesData.map((service) => (
            <div key={service._id} className="custom card">
              <Card className="custom">
                <div className="d-flex">
                  <Card.Img
                    className="card-img w-50"
                    src={`/src/components/Images/${service.img}`}
                  />
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
                </div>
              </Card>
            </div>
          ))
        )}

      </div>
      {showModal && (
        <ConfirmationModal
          sentance={bookingSentence}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};
