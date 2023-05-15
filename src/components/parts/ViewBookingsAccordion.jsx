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
  const [service, setService] = useState([]);
  const [userNames, setUserNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const perPage = 5;

  useEffect(() => {
    (async () => {
      const bookings = await (
        await fetch(`https://backend-saloon.onrender.com/bookings/getBookings`, {
          method: "GET",
          headers: {},
          credentials: "include",
        })
      ).json();

      const tempServiceList = await Promise.all(
        bookings.map(async (booking) => {
          const service = await (
            await fetch(
              `https://backend-saloon.onrender.com/services/getServiceById/${booking.service_id}`
            )
          ).json();
          return service;
        })
      );
      setTotalPages(Math.ceil(bookings.length / perPage));
      setBookingList(bookings);
      setService(tempServiceList);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const tempUserNames = await Promise.all(
        bookingList.map(async (booking) => {
          const user = await (
            await fetch(
              `https://backend-saloon.onrender.com/users/getUserData/${booking.user_id}`
            )
          ).json();
          return user.username;
        })
      );
      setUserNames(tempUserNames);
      if (tempUserNames.length > 0) {
        setIsLoading(false);
      }
    })();
  }, [bookingList]);

  const handleDelete = (_id) => {
    (async () => {
      const packet = { _id };
      let response = await fetch(
        `https://backend-saloon.onrender.com/bookings/deleteBooking`,
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

  const handleConfirmBooking = async (_id) => {
    const packet = { _id }
    await fetch("https://backend-saloon.onrender.com/users/updateAmountSpent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(packet),
    })
    .then(response => {
      if (response.ok) {
        console.log("The booking has been confirmed");
        setBookingList(bookingList.map(booking => {
          if (booking._id === _id) {
            return { ...booking, confirm: true };
          }
          return booking;
        }))
      }
    })
  }

  const handlePageChange = (page) => {
    setCurrentPage(page - 1);
  };

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
                <Row className="member-row mb-4 text-center">
                  <Col md={2} className="table-title-book">
                    Customer
                  </Col>
                  <Col md={2} className="table-title">
                    Service
                  </Col>
                  <Col md={2} className="table-title-book">
                    Price
                  </Col>
                  <Col md={2} className="table-title">
                    Date and time
                  </Col>
                  <Col md={2} className="table-title">
                    Confirm
                  </Col>
                  <Col md={2} className="table-title">
                    Controls
                  </Col>
                </Row>
                {bookingList
                  .slice(currentPage * perPage, (currentPage + 1) * perPage)
                  .map((booking, index) => (
                    <Row className="booking-row mb-4" key={index}>
                      <Col>{userNames[index + currentPage * perPage]}</Col>
                      <Col>{service[index + currentPage * perPage].name}</Col>
                      {booking.useCoupon ? (
                        <Col>
                          {service[index + currentPage * perPage].price - 15}
                        </Col>
                      ) : (
                        <Col>
                          {service[index + currentPage * perPage].price}
                        </Col>
                      )}
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
                      {booking.confirm ? 
                          <p>CONFIRMED</p> :
                          <Button
                          className="colored-btn"
                          onClick={() => {handleConfirmBooking(booking._id); booking.confirm = true}}
                        >
                          Confirm bookin
                        </Button>}

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
              <div>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      className="page-btn btn btn-secondary"
                      key={page}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>
            </>
          )}
        </Accordion.Body>
      </div>
    </Accordion.Item>
  );
}
