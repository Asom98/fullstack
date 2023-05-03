import { useEffect, useState } from "react";
import Calendar from 'react-calendar';
import "./css/Booking.css"
import "react-calendar/dist/Calendar.css";

export const Booking = () => {

    const [timeSlots, setTimeSlots] = useState([])
    const [service, setService] = useState([])
    const [employees, setEmployees] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date());

    async function postData(start, end) {
        const Data = {
            service_id: service._id, 
            employee_id: "644a83d1f0a732d4a429ab87", 
            startTime: start, 
            endTime: end, 
            user_id: "64482117371250416b683ec6", 
            contact_email: "asd@asd.com", 
            status: true
        }
        await fetch(`http://localhost:3000/bookings/postBooking`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Data)
        })
        .then(console.log("hello world"))
    }

    useEffect(() => {
        async function fetchTimeSlots() {
            try {
              const response = await fetch(`http://localhost:5000/bookings/getAvailableTimeSlots/644c378a049948fffb0a19d7/${selectedDate}`, {
                method: "GET",
              });
              
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
        fetchTimeSlots()

        async function fetchEmployees() {
            const employeeIds = ["644a83d1f0a732d4a429ab87", "644a83d1f0a732d4a429ab88"];
            await fetch(`http://localhost:5000/employees/getEmployees/${employeeIds.join(',')}`, {
                method: "GET",
            })
            .then(response => {
                return response.json()
            })
            .then(result => {
                setEmployees(result)
            })
        }
        fetchEmployees()
    },[selectedDate])

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
        <div>

            <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileDisabled={isDateDisabled}
            onClickDay={handleDateClick}
            tileClassName={getTileClassName}
            formatShortWeekday={(locale, value) => new Intl.DateTimeFormat(locale, {weekday: 'short'}).format(value)}
            />
        <table>
            <thead>
                <tr>
                    <th>Service id</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                </tr>
            </thead>
            <tbody>
            {timeSlots.length > 0 ? (
                 timeSlots.map((item) => (
                    
                    item.isAvailable ? (
                        <tr key={item.start}>
                            <td>{service.name}</td>
                            <td>{item.start}</td>
                            <td>{item.end}</td>
                            <td><button className="btn btn-primary" onClick={() => postData(item.start, item.end)} >Book Time Slot</button></td>
                        </tr>
                    ) : null
                ))
            ) : <p>No available times slots</p>} 
            </tbody>
        </table>
      </div>
      );
}