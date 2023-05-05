import { useEffect, useState } from "react";
import Calendar from "react-calendar";
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

  const [timeSlots, setTimeSlots] = useState([]);
  const [service, setService] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedDate, setSelectedDate] = useState(tomorrow);

  async function postData(start, end) {
    const Data = {
      service_id: service._id,
      employee_id: "644a83d1f0a732d4a429ab87",
      startTime: start,
      endTime: end,
      user_id: "64482117371250416b683ec6",
      contact_email: "asd@asd.com",
      status: true,
    };

    await fetch(`http://localhost:3000/bookings/postBooking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Data),
    }).then(async (result) => {
      if (result.ok) {
        const updatedTimeSlots = timeSlots.map((timeSlot) => {
          if (timeSlot.start === start && timeSlot.end === end) {
            return { ...timeSlot, isAvailable: false };
          } else {
            return timeSlot;
          }
        });
        setTimeSlots(updatedTimeSlots);
      } else {
        const error = await response.json();
        console.error(error);
      }
    });
  }

  useEffect(() => {
    async function fetchTimeSlots() {
      try {
        const response = await fetch(
          `http://localhost:3000/bookings/getAvailableTimeSlots/644c378a049948fffb0a19d7/${selectedDate}`,
          {
            method: "GET",
          }
        );

        if (response.status === 400) {
          console.log("Invalid date");
          setTimeSlots([]);
          setService(null);
          return;
        }

        const result = await response.json();
        setTimeSlots(result.timeSlots);
        setService(result.service);
      } catch (error) {
        console.error(error);
        // handle the error here
      }
    }
    fetchTimeSlots();

    async function fetchEmployees() {
      const employee_ids = service.employee_ids;
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
  }, [selectedDate]);

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
    <div className="booking-div justify-content-center">
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
          new Intl.DateTimeFormat(locale, { weekday: "short" }).format(value)
        }
      />
      <table class="time-table">
        <div></div>
        <thead></thead>
        <tbody class="table-body">
          <td class="service-name">{service.name}</td>
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
                      onClick={() => postData(item.start, item.end)}
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
                <p>No available times slots</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
