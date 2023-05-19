import { useEffect, useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Accordion,
} from "react-bootstrap";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import { BookingForm } from "./parts/BookingForm";

import "./css/Booking.css";
import "react-calendar/dist/Calendar.css";

export function Booking() {
  const currentDate = new Date();
  const tomorrow = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
  const minDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDay() + 1
  );
  const maxDate = new Date(
    currentDate.getFullYear() + 1,
    currentDate.getMonth(),
    currentDate.getDay()
  );

  const { _id } = useParams();
  const navigate = useNavigate();

  const [timeSlots, setTimeSlots] = useState([]);
  const [service, setService] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedDate, setSelectedDate] = useState(tomorrow);
  const [isLoading, setIsLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [error, setError] = useState(false);

  function handleBooking(start, end) {
    setStartTime(start);
    setEndTime(end);
    setShowBookingForm(true);
  }

  const handleNewTimeSlots = (newTimeSlots) => {
    const updatedTimeSlots = timeSlots.map((timeSlot) => {
      if (
        timeSlot.start === newTimeSlots.start &&
        timeSlot.end === newTimeSlots.end
      ) {
        return { ...timeSlot, isAvailable: false };
      } else {
        return timeSlot;
      }
    });

    setTimeSlots(updatedTimeSlots);
  };

  useEffect(() => {
    async function fetchTimeSlots() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/bookings/getAvailableTimeSlots/${_id}/${selectedDate}`,
          {
            method: "GET",
            headers: {},
            credentials: "include",
          }
        );

        if (response.status === 200) {
          const result = await response.json();
          setTimeSlots(result.timeSlots);
          setService(result.service);
          setIsLoading(false);
          setError(false);
          return;
        } else if (response.status === 400) {
          setTimeSlots([]);
          setService([]);
          setError(true);
          setIsLoading(false);
          return;
        } else {
          navigate(`/`);
          return;
        }
      } catch (error) {
        console.error(error);
        // handle the error here
      }
    }
    fetchTimeSlots();
  }, [selectedDate]);

  useEffect(() => {
    async function fetchEmployees() {
      const employee_ids = service.employee_ids;

      if (employee_ids == null) {
        return;
      }
      await fetch(
        `http://localhost:3000/employees/getEmployees/${employee_ids.join(
          ","
        )}`,
        {
          method: "GET",
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          setEmployees(result);
        });
    }
    fetchEmployees();
  }, [service]);

  const isDateDisabled = (date) => {
    return date < new Date();
  };

  const getTileClassName = ({ date }) => {
    return isDateDisabled(date) ? "disabled" : "";
  };

  const handleDateClick = (date) => {
    if (!isDateDisabled(date)) {
      setSelectedDate(date);
    }
  };

  return (
    <Container className="booking-div">
      <Row class="service-name justify-content-center">
        <Col xs={12}>
          <h3 class="service-name-text text-center">{service.name}</h3>
        </Col>
      </Row>
      <Row class="section-row justify-content-center">
        <Col>
          <Calendar
            className={"calendar"}
            onChange={setSelectedDate}
            value={selectedDate}
            minDate={minDate}
            maxDate={maxDate}
            tileDisabled={isDateDisabled}
            onClickDay={handleDateClick}
            tileClassName={getTileClassName}
            formatShortWeekday={(locale, value) =>
              new Intl.DateTimeFormat(locale, { weekday: "short" }).format(
                value
              )
            }
          />
        </Col>
      </Row>
      <Row className="section-row justify-content-center">
        <Col>
          <Container className="employee-item">
            <p class="employee-name">
              <strong>Employee:</strong> &nbsp;
              {employees.length > 0 ? employees[0].name : null}
            </p>
          </Container>
          {showBookingForm ? (
            <BookingForm
              start={startTime}
              end={endTime}
              service={service}
              employee={employees[0]}
              onClose={() => setShowBookingForm(false)}
              onTimeSlotsChange={handleNewTimeSlots}
            />
          ) : null}
          <table class="time-table">
            <thead></thead>
            {isLoading ? (
              <Container className="spinner-border text-primary"></Container>
            ) : (
              <tbody class="table-body justify-content-center">
                {timeSlots.length > 0 ? (
                  timeSlots.map((item) =>
                    item.isAvailable ? (
                      <tr className="isAvailable" key={item.start}>
                        <td class="row-section">
                          {new Date(item.start).toLocaleString("en-UK", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            timeZone: "UTC",
                          })}{" "}
                          -
                          {new Date(item.end).toLocaleString("en-UK", {
                            hour: "numeric",
                            minute: "numeric",
                            timeZone: "UTC",
                          })}
                        </td>
                        <td class="row-section">
                          <button
                            className="timeBooking-btn btn-primary"
                            onClick={() => handleBooking(item.start, item.end)}
                          >
                            Book Time Slot
                          </button>
                        </td>
                      </tr>
                    ) : (
                      <tr className="notAvailable" key={item.start}>
                        <td class="row-section">
                          {new Date(item.start).toLocaleString("en-UK", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            timeZone: "UTC",
                          })}{" "}
                          -
                          {new Date(item.end).toLocaleString("en-UK", {
                            hour: "numeric",
                            minute: "numeric",
                            timeZone: "UTC",
                          })}
                        </td>
                        <td class="row-section">
                          <h2>booked</h2>
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td>
                      <Container class="alert alert-danger" role="alert">
                        {" "}
                        No available Time Slots{" "}
                      </Container>
                    </td>
                  </tr>
                )}
              </tbody>
            )}
          </table>
        </Col>
      </Row>
    </Container>
  );
}
