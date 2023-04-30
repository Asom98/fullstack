import { useEffect, useState } from "react";
import "./Booking.css"

export const Booking = () => {

    const [timeSlots, setTimeSlots] = useState([])
    const [service, setService] = useState([])
    const [employees, setEmployees] = useState([])

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
        await fetch(`http://localhost:5000/bookings/postBooking`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Data)
        })
    }

    useEffect(() => {
        async function fetchTimeSlots() {
            await fetch(`http://localhost:5000/bookings/getAvailableTimeSlots/644c378a049948fffb0a19d7`, {
                method: "GET",
            })
            .then(response => {
                return response.json()
            })
            .then(result => {
                setTimeSlots(result.timeSlots)
                setService(result.service)
            })
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
    },[])

    return (
        <div>
            <h1>Hello world</h1>
            <h1>{service.name}</h1>
            <h1>{service.duration} minutes</h1>
            <h1>employees: </h1>
            {employees.map(employee => <h1 key={employee._id}>{employee.name}</h1>)}
        <table>
            <thead>
                <tr>
                    <th>Service id</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                </tr>
            </thead>
            <tbody>
            {timeSlots.map((item) => (
                item.isAvailable ? (
                    <tr key={item.start}>
                        <td>{service._id}</td>
                        <td>{item.start}</td>
                        <td>{item.end}</td>
                        <td><button className="btn btn-primary" onClick={() => postData(item.start, item.end)}>Book Time Slot</button></td>
                    </tr>
                ) : null
            ))}
            </tbody>
        </table>
      </div>
      );
}