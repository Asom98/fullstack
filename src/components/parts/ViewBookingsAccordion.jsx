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

  useEffect(() => {
    (async () => {
      const bookings = await (
        await fetch(`http://localhost:5000/bookings/getBookings`)
      ).json();

      const tempServiceList = await Promise.all(
        bookings.map(async (booking) => {
          const service = await (
            await fetch(
              `http://localhost:5000/services/getServiceById/${booking.service_id}`
            )
          ).json();
          return service.name;
        })
      );

      setBookingList(bookings);
      setServiceNames(tempServiceList);
    })();
  }, []);

    let email = member.email;
    let phoneNumber = member.phoneNumber;
    let username = member.username;
    const id = member._id;
    if (editedName && editedName !== member.username) {
      username = editedName;
    }
    if (editedEmail && editedEmail !== member.email) {
      email = editedEmail;
    }
    if (editedPhone && editedPhone !== member.phoneNumber) {
      phoneNumber = editedPhone;
    }

    (async () => {
      const packet = { id, username, email, phoneNumber };
      console.log(editedName, editedEmail, editedPhone);
      let response = await fetch(`http://localhost:5000/admin/updateUser`, {
        method: "PUT",
        body: JSON.stringify(packet),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
      } else {
        setRegistrationSentence("Can't update");
        setShowModal(true);
      }
    })();
  };

  const handleDelete = (_id) => {
    (async () => {
      const packet = { _id };
      let response = await fetch(
        `http://localhost:5000/bookings/deleteBooking`,
        {
          method: "DELETE",
          body: JSON.stringify(packet),
          headers: {
            "Content-Type": "application/json",
          },
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
      <Accordion.Body>
        <Container
          className="bookings"
          style={{ maxHeight: "400px", overflowY: "auto" }}
        >
          {bookingList.map((booking, index) => (
            <Row className="booking-row mb-4" key={index}>
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
      </Accordion.Body>
      {showModal && (
        <ConfirmationModal
          sentance={registrationSentence}
          onClose={() => setShowModal(false)}
        />
      )}
    </Accordion.Item>
  );
}
