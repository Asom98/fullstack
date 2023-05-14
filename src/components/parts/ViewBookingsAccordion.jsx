import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Accordion,
} from "react-bootstrap";
import "../css/Admin.css";
import { ConfirmationModal } from "./ConfirmationModal";

export function ViewBookingsAccordion() {
  const [bookingList, setBookingList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [registrationSentence, setRegistrationSentence] = useState("");
  const [serviceNames, setServiceNames] = useState([]);
  const [userNames, setUserNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const bookings = await (
        await fetch(`http://localhost:3000/bookings/getBookings`, {
          method: "GET",
          headers: {},
          credentials: "include",
        })
      ).json();

      const tempServiceList = await Promise.all(
        bookings.map(async (booking) => {
          const service = await (
            await fetch(
              `http://localhost:3000/services/getServiceById/${booking.service_id}`
            )
          ).json();
          return service.name;
        })
      );
      setBookingList(bookings);
      setServiceNames(tempServiceList);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const tempUserNames = await Promise.all(
        bookingList.map(async (booking) => {
          const user = await (
            await fetch(
              `http://localhost:3000/users/getUserData/${booking.user_id}`
            )
          ).json();
          return user.username;
        })
      );
      setUserNames(tempUserNames);
      if (tempUserNames.length > 0) {
        console.log(tempUserNames);
        setIsLoading(false);
      }
    })();
  }, [bookingList]);

  const handleDelete = (_id) => {
    (async () => {
      const packet = { _id };
      let response = await fetch(
        `http://localhost:3000/bookings/deleteBooking`,
        {
          method: "DELETE",
          body: JSON.stringify(packet),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.status === 200) {
        setBookingList((prevBookingList) => {
          const updatedBookingList = prevBookingList.filter(
            (booking) => booking._id !== _id
          );
          return updatedBookingList;
        });
      } else {
        setRegistrationSentence("Can't delete booking");
        setShowModal(true);
      }
    })();
  };

  /*{
    "_id": "644fc306d2e036b3637de91a",
    "service_id": "644c378a049948fffb0a19d7",
    "employee_id": "644a83d1f0a732d4a429ab87",
    "user_id": "64482117371250416b683ec6",
    "startTime": "2023-12-12T08:00:00.000Z",
    "endTime": "2023-12-12T09:00:00.000Z",
    "contact_email": "asd@asd.com",
    "status": true,
    "count": 1,
    "__v": 0
  }*/

  return (
    <Accordion.Item eventKey="2">
      <Accordion.Header>Handle bookings</Accordion.Header>
      <div>
        <Accordion.Body>
          {isLoading ? (
            <div className="spinner-border"></div>
          ) : (
            <>
              <Container
                className="bookings"
                style={{ maxHeight: "400px", overflowY: "auto" }}
              >
                {bookingList.map((booking, index) => (
                  <Row className="booking-row mb-4" key={index}>
                    <Col>{userNames[index]}</Col>
                    <Col>{serviceNames[index]}</Col>
                    <Col>
                      {new Date(booking.startTime).toLocaleString("en-UK", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        timeZone: "UTC",
                      })}
                    </Col>
                    <Col>
                      <Button
                        className="colored-btn"
                        onClick={() => handleDelete(booking._id)}
                      >
                        Cancel booking
                      </Button>
                    </Col>
                  </Row>
                ))}
              </Container>
              {showModal && (
                <ConfirmationModal
                  sentance={registrationSentence}
                  onClose={() => setShowModal(false)}
                />
              )}
            </>
          )}
        </Accordion.Body>
      </div>
    </Accordion.Item>
  );
}
