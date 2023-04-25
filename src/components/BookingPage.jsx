import React from "react";
import "./css/Booking.css";
import { Button, Row, Col, Container } from "react-bootstrap";

export function BookingPage() {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const dayTimeSlots = [
    {
      day: "Sunday",
      slots: [
        { time: "10:00", occupied: false, selected: false },
        { time: "11:00", occupied: false, selected: false },
        { time: "12:00", occupied: false, selected: false },
        { time: "13:00", occupied: true, selected: false },
        { time: "14:00", occupied: true, selected: false },
        { time: "15:00", occupied: false, selected: false },
        { time: "16:00", occupied: false, selected: false },
      ],
    },
    {
      day: "Monday",
      slots: [
        { time: "10:00", occupied: false, selected: false },
        { time: "11:00", occupied: false, selected: false },
        { time: "12:00", occupied: true, selected: false },
        { time: "13:00", occupied: false, selected: false },
        { time: "14:00", occupied: true, selected: false },
        { time: "15:00", occupied: false, selected: false },
        { time: "16:00", occupied: false, selected: false },
      ],
    },
    {
      day: "Tuesday",
      slots: [
        { time: "10:00", occupied: false, selected: false },
        { time: "11:00", occupied: true, selected: false },
        { time: "12:00", occupied: false, selected: false },
        { time: "13:00", occupied: false, selected: false },
        { time: "14:00", occupied: false, selected: false },
        { time: "15:00", occupied: true, selected: false },
        { time: "16:00", occupied: false, selected: false },
      ],
    },
    {
      day: "Wednesday",
      slots: [
        { time: "10:00", occupied: true, selected: false },
        { time: "11:00", occupied: false, selected: false },
        { time: "12:00", occupied: true, selected: false },
        { time: "13:00", occupied: false, selected: false },
        { time: "14:00", occupied: false, selected: false },
        { time: "15:00", occupied: false, selected: false },
        { time: "16:00", occupied: true, selected: false },
      ],
    },
    {
      day: "Thursday",
      slots: [
        { time: "10:00", occupied: true, selected: false },
        { time: "11:00", occupied: false, selected: false },
        { time: "12:00", occupied: true, selected: false },
        { time: "13:00", occupied: false, selected: false },
        { time: "14:00", occupied: false, selected: false },
        { time: "15:00", occupied: false, selected: false },
        { time: "16:00", occupied: true, selected: false },
      ],
    },
    {
      day: "Friday",
      slots: [
        { time: "10:00", occupied: true, selected: false },
        { time: "11:00", occupied: false, selected: false },
        { time: "12:00", occupied: true, selected: false },
        { time: "13:00", occupied: false, selected: false },
        { time: "14:00", occupied: false, selected: false },
        { time: "15:00", occupied: false, selected: false },
        { time: "16:00", occupied: true, selected: false },
      ],
    },
    {
      day: "Saturday",
      slots: [
        { time: "10:00", occupied: true, selected: false },
        { time: "11:00", occupied: false, selected: false },
        { time: "12:00", occupied: false, selected: false },
        { time: "13:00", occupied: false, selected: false },
        { time: "14:00", occupied: false, selected: false },
        { time: "15:00", occupied: false, selected: false },
        { time: "16:00", occupied: true, selected: false },
      ],
    },
  ];

  return (
    <Container className="calendar">
      <Row className="calendar-title">
        <Col>
          <h2>April 2023</h2>
        </Col>
      </Row>
      {dayTimeSlots.map((dayTimeSlot) => (
        <Row className="calendar-grid">
          <Col key={dayTimeSlot.day} className="calendar-grid-item">
            <div className="calendar-day-title">{dayTimeSlot.day}</div>
            {dayTimeSlot.slots.map((timeSlot) => (
              <div key={timeSlot.time} className="time-slot">
                <Button
                  className={
                    (timeSlot.selected ? " selected" : "") +
                    (timeSlot.occupied ? " occupied" : "")
                  }
                  onClick={() =>
                    console.log(`Clicked ${dayTimeSlot.day}, ${timeSlot.time}`)
                  }
                  disabled={timeSlot.occupied}
                >
                  {timeSlot.time}
                </Button>
              </div>
            ))}
          </Col>
        </Row>
      ))}
    </Container>
  );
}
