import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

export function BookingForm({ start, end, service, employee, onClose, onTimeSlotsChange}) {
    const [user, setUser] = useState(null)
    const [error, setError]= useState(false)
    const [useCoupon, setUseCoupon]= useState(false)

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
          useCoupon: useCoupon,
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
          if (result.status === 200) {
            const timeSlots = {start,end}
            onTimeSlotsChange(timeSlots);
            onClose();
          } else{
            setError(true)
          }
        })
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
            {user.couponAmount > 0 && useCoupon == false ? <><p>you have a coupon available do you wish to use it for 15$ off ? </p><button className="btn btn-primary" onClick={() => setUseCoupon(true)}>Apply coupon </button></> : null}
            {useCoupon ? <><p>Coupon applied</p> <button className="btn btn-primary" onClick={() => setUseCoupon(false)}>Remove Coupon </button> </>: null}
            {error ? <div class="alert alert-danger" role="alert">
              An error has occured proccesing your booking
            </div> : null}
        </div>)
    : (<div className="spinner-border"></div>)}
        
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => postData()}>
            Submit Booking
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
