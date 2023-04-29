import React, { useState } from "react";
import "./css/Booking.css";
import { Button, Row, Col, Container, Table } from "react-bootstrap";
import { BookingModal } from "./BookingModal";

export function BookingPage() {
  const [dayTimeSlots, setDayTimeSlots] = useState([]);
  setDayTimeSlots([
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
  ]);

  const [choiceCount, setChoiceCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [warningLine, setWarningLine] = useState("");

  const dayHeaders = dayTimeSlots.map((item) => (
    <th key={item.day}>{item.day}</th>
  ));

  function toggleTimeSelection(slot) {
    if (slot.occupied) {
      return;
    }

    if (slot.selected) {
      diselectTime(slot);
    } else {
      selectTime(slot);
    }
  }

  function diselectTime(slot) {
    slot.selected = false;
    slot.className = "";
    setChoiceCount(0);
  }

  function selectTime(slot) {
    if (choiceCount === 1) {
      setWarningLine("You can only book one appointment at a time");
      setShowModal(true);
      return;
    } else {
      slot.selected = true;
      slot.className = "selected";
      setChoiceCount(1);
    }
  }
  const timeSlots = dayTimeSlots[0].slots.map((item, index) => (
    <tr key={index} className="cells justify-content-center">
      {dayTimeSlots.map((day, dayIndex) => {
        const slot = day.slots[index];

        return (
          <td key={dayIndex} className="cell justify-content-center">
            <Button
              className={`calendar-slot-button justify-content-center ${
                slot.occupied ? "occupied" : ""
              } ${slot.selected ? "selected" : ""}`}
              onClick={() => {
                toggleTimeSelection(slot);
              }}
            >
              {slot.time}
            </Button>
          </td>
        );
      })}
    </tr>
  ));

  return (
    <>
      <Table striped bordered hover className="table justify-content-center">
        <thead>
          <tr className="headers">{dayHeaders}</tr>
        </thead>
        <tbody className="table-body justify-content-center">{timeSlots}</tbody>
      </Table>
      {showModal && (
        <BookingModal
          sentance={warningLine}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
