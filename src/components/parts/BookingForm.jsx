import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

export function BookingForm({ start, end, service, employee, onClose, onTimeSlotsChange}) {
    const [user, setUser] = useState(null)

    useEffect(()=> {
        const fetchUserInfo = async () => {
            await fetch("http://localhost:3000/users/getUserData", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            .then(response => {
                if(response.status === 200) {
                    return response.json()
                }
            })
            .then(user => {
                console.log("hello world");
                setUser(user)
            })
        }
        fetchUserInfo()
    }, [])

    async function postData() {
        const Data = {
          service_id: service._id,
          employee_id: employee._id,
          startTime: start,
          endTime: end,
          status: true,
        };
        await fetch(`http://localhost:3000/bookings/postBooking`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(Data),
        }).then(async (result) => {
          if (result.ok) {
            const timeSlots = {start,end}
            onTimeSlotsChange(timeSlots);
            onClose();
          } else {
            const error = await response.json();
            console.error(error);
          }
        });
      }

  return (
    <Modal className="modal" show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Booking Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {user != null ? (
        <div>
            <p>here are you booking information</p>
            <p>{start}</p>
            <p>{end}</p>
            <p>{service.name}</p>
            <p>{employee.name}</p>
            <p>{user.username}</p> 
        </div>)
    : (<div className="spinner-border"></div>)}
        
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => postData}>
            Submit Booking
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
