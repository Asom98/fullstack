import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

export function BookingForm({
  start,
  end,
  service,
  employee,
  onClose,
  onTimeSlotsChange,
}) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [useCoupon, setUseCoupon] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      await fetch("https://backend-saloon.onrender.com/users/getUserData", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
        })
        .then((user) => {
          setUser(user);
        });
    };
    fetchUserInfo();
  }, []);

  async function postData() {
    const Data = {
      service_id: service._id,
      employee_id: employee._id,
      startTime: start,
      endTime: end,
      useCoupon: useCoupon,
      status: true,
    };
    await fetch(`https://backend-saloon.onrender.com/bookings/postBooking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(Data),
    }).then(async (result) => {
      if (result.status === 200) {
        const timeSlots = { start, end };
        onTimeSlotsChange(timeSlots);
        onClose();
      } else {
        setError(true);
      }
    });
  }

  return (
    <Modal className="modal" show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Booking Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body class="information-body">
        {user != null ? (
          <div class="information-part text-center rounded">
            <p>
              <strong>Service type:</strong> {service.name}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(start).toLocaleString("en-UK", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p>
              <strong>Start time:</strong>{" "}
              {new Date(start).toLocaleString("en-UK", {
                hour: "numeric",
                minute: "numeric",
                timeZone: "UTC",
              })}{" "}
              <strong>End time:</strong>{" "}
              {new Date(end).toLocaleString("en-UK", {
                hour: "numeric",
                minute: "numeric",
                timeZone: "UTC",
              })}
            </p>
            <p>
              <strong>Employee:</strong> {employee.name}
            </p>
            <p>
              <strong>Booked by:</strong> {user.username}
            </p>
            <p>
              <strong>Confirmation sent to:</strong> {user.email}
            </p>
            {user.couponAmount > 0 && useCoupon == false ? (
              <>
                <p>
                  you have a coupon available do you wish to use it for 15$ off
                  ?{" "}
                </p>
                <button
                  className="submit-btn btn btn-primary"
                  onClick={() => setUseCoupon(true)}
                >
                  Apply coupon{" "}
                </button>
              </>
            ) : null}
            {useCoupon ? (
              <>
                <p>Coupon applied</p>{" "}
                <button
                  className="submit-btn btn btn-primary"
                  onClick={() => setUseCoupon(false)}
                >
                  Remove Coupon{" "}
                </button>{" "}
              </>
            ) : null}
            {error ? (
              <div class="alert alert-danger" role="alert">
                An error has occured proccesing your booking
              </div>
            ) : null}
          </div>
        ) : (
          <div className="spinner-border"></div>
        )}
      </Modal.Body>
      <Modal.Footer class="modal-footer">
        <Button onClick={() => postData()} className="submit-btn">
          Submit Booking
        </Button>
        <Button variant="secondary" onClick={onClose} className="close-btn">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
