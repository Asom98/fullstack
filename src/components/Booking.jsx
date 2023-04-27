import { useEffect, useState } from "react";
import "./Booking.css"

export const Booking = () => {
    const [data, setData] = useState([])
    async function postData() {
        const Data = {
            service_id: "asd", 
            employee_id: "asd", 
            startTime: "2002-12-09", 
            endTime: "2002-12-09", 
            user_id: "sda", 
            contact_email: "asdasd", 
            status: true
        }
        await fetch(`http://localhost:5000/bookings/postAvailableTime`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Data)
        })
        .then(response => {
            return response.json()
        })
        .then(result => {
            setData(result)
        })
    }

    useEffect(() => {
        async function fetchData() {
            await fetch(`http://localhost:5000/bookings/getAvailableTimes`, {
                method: "GET",
            })
            .then(response => {
                return response.json()
            })
            .then(result => {
                setData(result)
            })
        }
        fetchData()
    },[])

    return (
        <div>
        <table>
            <thead>
                <tr>
                    <th>Service id</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                </tr>
            </thead>
            <tbody>
            {data.map((item) => (
                <tr key={item._id}>
                    <td>{item.serviceId}</td>
                    <td>{item.startTime}</td>
                    <td>{item.endTime}</td>
                    <td><button className="btn btn-primary">Book Time Slot</button></td>
                </tr>
            ))}
            </tbody>
        </table>
      </div>
      );
}