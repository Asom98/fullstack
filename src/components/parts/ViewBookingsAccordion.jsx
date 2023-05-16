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
              `http://localhost:3000/users/getUserData/${booking.user_id}`
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

  const handleConfirmBooking = async (_id) => {
    const packet = { _id };
    await fetch("http://localhost:3000/users/updateAmountSpent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(packet),
    }).then((response) => {
      if (response.ok) {
        console.log("The booking has been confirmed");
        setBookingList(
          bookingList.map((booking) => {
            if (booking._id === _id) {
              return { ...booking, confirm: true };
            }
            return booking;
          })
        );
      }
    });
  };

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
                  <Col md={2} className="table-title-book d-md-block d-none">
                    Customer
                  </Col>
                  <Col md={2} className="table-title d-md-block d-none">
                    Service
                  </Col>
                  <Col md={1} className="table-title-book d-md-block d-none">
                    Price
                  </Col>
                  <Col md={3} className="table-title d-md-block d-none">
                    Date and time
                  </Col>
                  <Col md={2} className="table-title d-md-block d-none">
                    Confirm booking
                  </Col>
                  <Col md={2} className="table-title d-md-block d-none">
                    Controls
                  </Col>
                </Row>
                {bookingList
                  .slice(currentPage * perPage, (currentPage + 1) * perPage)
                  .map((booking, index) => (
                    <Row className="booking-row mb-4" key={index}>
                      <Col md={2}>
                        {userNames[index + currentPage * perPage]}
                      </Col>
                      <Col md={2}>
                        {service[index + currentPage * perPage].name}
                      </Col>
                      {booking.useCoupon ? (
                        <Col md={1}>
                          {service[index + currentPage * perPage].price - 15}
                        </Col>
                      ) : (
                        <Col md={1}>
                          {service[index + currentPage * perPage].price}
                        </Col>
                      )}
                      <Col md={3}>
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
                      <Col className="confirmed" md={2}>
                        {booking.confirm ? (
                          <p>CONFIRMED</p>
                        ) : (
                          <Button
                            className="colored-btn"
                            onClick={() => {
                              handleConfirmBooking(booking._id);
                              booking.confirm = true;
                            }}
                          >
                            Confirm booking
                          </Button>
                        )}
                      </Col>
                      <Col md={2}>
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
