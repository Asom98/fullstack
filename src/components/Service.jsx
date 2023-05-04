import React, {useState, useEffect} from "react";
import { Card, Button } from "react-bootstrap";
import "./css/Service.css";
import axios from "axios";

export const ServicePage = () => {
  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:3000/services/getServices");
        setServicesData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchServices();
  }, []);

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
                <Card.Text>Duration: {service.duration}min</Card.Text>
                <Card.Text>Price: {service.price}</Card.Text>
                <Button>Book Now</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
