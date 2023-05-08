import React, {useState, useEffect} from "react";
import { Card, Button } from "react-bootstrap";
import "./css/Service.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ConfirmationModal } from "./parts/ConfirmationModal";

export const ServicePage = () => {
  const [servicesData, setServicesData] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [bookingSentence, setbookingSentence] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:3000/services/getServices",{
          method: "GET"
        });
        const result = await response.json()
        setServicesData(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchServices();
  }, []);

  const handleBookClick = (service) => {
    const user = JSON.parse(localStorage.getItem('user'));
    navigate(`/booking/${service._id}`);
    console.log(service)
  }

  return (
    <div className=" service-container d-flex flex-column justify-content-center align-items-center">
      <div className="d-flex justify-content-center fs-1 fst-italic font-monospace text-white mt-5">
        Our Services
      </div>
      <div className="card-columns mt-4 custom-card-columns">
        {servicesData.map((service) => (
          <div key={service._id} className="custom card">
            <Card>
              <Card.Body>
                <Card.Title className="card-serviceName">{service.name}</Card.Title>
                <Card.Text className="card-description">{service.description}</Card.Text>
                <Card.Text className="card-text duration">Duration: {service.duration}min</Card.Text>
                <Card.Text className="card-text price">Price: ${service.price}</Card.Text>
                <Button onClick={() => handleBookClick(service)}>Book Now</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
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
