import React from "react";
import { Card, Button } from "react-bootstrap";
import servicesData from "../json/services.json";

export const ServicePage = () => {
    return (
        <div>
            <div className="d-flex justify-content-center fs-1 fst-italic font-monospace">Service page!</div>
            <div className="card-deck">
                {servicesData.map((service) => (
                    <div key={service._id} className="card mt-4">
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

