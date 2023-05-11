import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';

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

  const {_id} = useParams();
  const navigate = useNavigate();

  const [timeSlots, setTimeSlots] = useState([]);
  const [service, setService] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedDate, setSelectedDate] = useState(tomorrow);

  async function postData(start, end) {
    const token = localStorage.getItem("token")

    const Data = {
      service_id: service._id,
      employee_id: "644a83d1f0a732d4a429ab87",
      startTime: start,
      endTime: end,
      status: true,
    };

    await fetch(`http://localhost:3000/bookings/postBooking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
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
        const token = localStorage.getItem("token")

        if (token == null) {
          navigate("/")
        }

        const response = await fetch(
          `http://localhost:3000/bookings/getAvailableTimeSlots/${_id}/${selectedDate}`,
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${token}`,
            },
          });

        if (response.status === 200) {
          const result = await response.json();
          setTimeSlots(result.timeSlots);
          setService(result.service);
          return
        } else if(response.status === 400) {
          setTimeSlots([]);
          setService([]);
          return;
        } else {
          console.log("you do not have access to that resource");
          navigate(`/`);
          return
        }
      } catch (error) {
        console.error(error);
        // handle the error here
      }
    }
    fetchTimeSlots();

    async function fetchEmployees() {
      const employee_ids = service.employee_ids;
      if (employee_ids == null) {
        return 
      }
      await fetch(
        `http://localhost:3000/employees/getEmployees/${employee_ids.join(",")}`,
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
      <row class="service-name">
        <column xs={12} md={4}>
          <h3 class="service-name-text text-center">{service.name}</h3>
        </column>
      </row>
      <row class="section-row justify-content-center">
        <column>
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
        </column>
      </row>
      <row className="section-row justify-content-center">
        <column>
          <table class="time-table">
            <thead></thead>
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
        </column>
      </row>
    </div>
  );
}
