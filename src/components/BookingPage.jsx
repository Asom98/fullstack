import React from "react";
import "./css/Booking.css";
import { Button, Row, Col, Container, Table } from "react-bootstrap";

export function BookingPage() {
  const dayTimeSlots = [
    {
      day: "Sunday",
      slots: [
        { time: "10:00", occupied: false },
        { time: "11:00", occupied: false },
        { time: "12:00", occupied: false },
        { time: "13:00", occupied: true },
        { time: "14:00", occupied: true },
        { time: "15:00", occupied: false },
        { time: "16:00", occupied: false },
      ],
    },
    {
      day: "Monday",
      slots: [
        { time: "10:00", occupied: false },
        { time: "11:00", occupied: false },
        { time: "12:00", occupied: true },
        { time: "13:00", occupied: false },
        { time: "14:00", occupied: true },
        { time: "15:00", occupied: false },
        { time: "16:00", occupied: false },
      ],
    },
    {
      day: "Tuesday",
      slots: [
        { time: "10:00", occupied: false },
        { time: "11:00", occupied: true },
        { time: "12:00", occupied: false },
        { time: "13:00", occupied: false },
        { time: "14:00", occupied: false },
        { time: "15:00", occupied: true },
        { time: "16:00", occupied: false },
      ],
    },
    {
      day: "Wednesday",
      slots: [
        { time: "10:00", occupied: true },
        { time: "11:00", occupied: false },
        { time: "12:00", occupied: true },
        { time: "13:00", occupied: false },
        { time: "14:00", occupied: false },
        { time: "15:00", occupied: false },
        { time: "16:00", occupied: true },
      ],
    },
    {
      day: "Thursday",
      slots: [
        { time: "10:00", occupied: true },
        { time: "11:00", occupied: false },
        { time: "12:00", occupied: true },
        { time: "13:00", occupied: false },
        { time: "14:00", occupied: false },
        { time: "15:00", occupied: false },
        { time: "16:00", occupied: true },
      ],
    },
    {
      day: "Friday",
      slots: [
        { time: "10:00", occupied: true },
        { time: "11:00", occupied: false },
        { time: "12:00", occupied: true },
        { time: "13:00", occupied: false },
        { time: "14:00", occupied: false },
        { time: "15:00", occupied: false },
        { time: "16:00", occupied: true },
      ],
    },
    {
      day: "Saturday",
      slots: [
        { time: "10:00", occupied: true },
        { time: "11:00", occupied: false },
        { time: "12:00", occupied: false },
        { time: "13:00", occupied: false },
        { time: "14:00", occupied: false },
        { time: "15:00", occupied: false },
        { time: "16:00", occupied: true },
      ],
    },
  ];

  const dayHeaders = dayTimeSlots.map((item) => (
    <th key={item.day}>{item.day}</th>
  ));

  const timeSlots = dayTimeSlots[0].slots.map((item, index) => (
    <tr key={index} className="justify-content-center">
      {dayTimeSlots.map((day, dayIndex) => (
        <td key={dayIndex} className="justify-content-center">
          <Button
            className={
              (day.slots[index].occupied ? "occupied" : "") +
              " justify-content-center"
            }
            onClick={() =>
              console.log(
                `Clicked ${day.slots[index].day}, ${day.slots[index].time}`
              )
            }
            disabled={day.slots[index].occupied}
          >
            {day.slots[index].time}
          </Button>
        </td>
      ))}
    </tr>
  ));

  return (
    <Table striped bordered hover className="justify-content-center">
      <thead>
        <tr>{dayHeaders}</tr>
      </thead>
      <tbody className="justify-content-center">{timeSlots}</tbody>
    </Table>
  );
}
