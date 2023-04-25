import React from "react";
import { Card, Button } from "react-bootstrap";
import servicesData from "../json/services.json";
import "./Service.css";

export const ServicePage = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="d-flex justify-content-center fs-1 fst-italic font-monospace">Our Services</div>
            <div className="card-columns mt-4 custom-card-columns">
                {servicesData.map((service) => (
                    <div key={service._id} className="custom card">
                        <Card>
                            <Card.Body>
                                <Card.Title>{service.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{service.employee_name}</Card.Subtitle>
                                <Card.Text>{service.details}</Card.Text>
                                <Card.Text>Price: {service.price}</Card.Text>
                                <Button variant="primary">Book Now</Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    )
}

