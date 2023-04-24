import React from "react";
import "./css/Booking.css";
import { Button, Row, Col, Container } from "react-bootstrap";

export function BookingPage() {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const dayTimeSlots = [
    {
      day: "Sun",
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
      day: "Mon",
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
      day: "Tue",
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
      day: "Wed",
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
      day: "Thu",
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
      day: "Fri",
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
      day: "Sat",
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
              <div key={timeSlot.time}>
                <Button
                  className={
                    "calendar-slot-button" +
                    (timeSlot.selected ? " calendar-slot-selected" : "") +
                    (timeSlot.occupied ? " calendar-slot-occupied" : "")
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
