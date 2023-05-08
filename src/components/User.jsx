import React, {useState,useEffect} from "react";
import { Button,Card, Container, Table } from "react-bootstrap";
import "./css/User.css"

function User() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [editEmailMode, setEditEmailMode] = useState(false);
  const [editPhoneNumberMode, setEditPhoneNumberMode] = useState(false);
  const [bookings, setBookings] = useState([]);

  const handleUpdateEmailClick = async () => {
    const response = await fetch("http://localhost:3000/admin/updateUser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user._id,
        email,
      }),
    });

    if (response.ok) {
      setEditEmailMode(false);
      const updatedUser = { ...user, email };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setEmail(email);
    }
  };

  const handleUpdatePhoneNumberClick = async () => {
    const response = await fetch("http://localhost:3000/admin/updateUser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user._id,
        phoneNumber,
      }),
    });

    if (response.ok) {
      setEditPhoneNumberMode(false);
      const updatedUser = { ...user, phoneNumber };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setPhoneNumber(phoneNumber);
    }
  };

  const handleUserBookings = async () => {
    const response = await fetch(`http://localhost:3000/bookings/getBookingsByUserId/${user._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (response.ok) {
      const data = await response.json();
      const bookingsWithService = await Promise.all(
        data.map(async (booking) => {
          const serviceResponse = await fetch(`http://localhost:3000/services/getServiceById/${booking.service_id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (serviceResponse.ok) {
            const serviceData = await serviceResponse.json();
            const startTime = new Date(booking.startTime);
            const bookingDate = startTime.toLocaleDateString();
            const bookingTime = startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            return { ...booking, service: serviceData, bookingDate,
              bookingTime,};
          } else {
            return { ...booking, service: null };
          }
        })
      );
      setBookings(bookingsWithService);
    }
  };

  useEffect(() => {
    handleUserBookings();
    console.log(bookings)
  }, []);

  const handleDeleteBooking = async (bookingId) => {
    console.log('handleDeleteBooking called with bookingId:', bookingId);
    const packet = { bookingId };
    const response = await fetch(`http://localhost:3000/bookings/deleteBooking`, {
      method: "DELETE",
      body: JSON.stringify(packet),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const updatedBookings = bookings.filter((booking) => booking._id !== bookingId);
      console.log('updatedBookings:', updatedBookings);
      setBookings(updatedBookings);
      console.log(bookings)
      console.log('bookings:', bookings);
    } else {
      console.log("Could not delete booking")
    }
  };

  return (
    <div className="container-fluid">
      <Card>
        <Card.Body>
          <div className="welcome-text">
            <h1>Welcome, {user.username}!</h1>
          </div>
          <div className="user-details">
            <Table>
              <tbody>
                <tr>
                  <td>Email:</td>
                  <td>
                    {editEmailMode ? (
                      <span>
                        <input className="email-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Button variant="primary" size="sm" onClick={handleUpdateEmailClick}> Save </Button>
                        <Button variant="secondary" size="sm" onClick={() => setEditEmailMode(false)}> Cancel </Button>
                      </span>
                    ) : (
                      <span>
                        {user.email}{" "}
                        <Button variant="link" onClick={() => setEditEmailMode(true)}> Edit </Button>
                      </span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Phone Number:</td>
                  <td>
                    {editPhoneNumberMode ? (
                      <span>
                        <input className="phoneNumber-input" type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        <Button variant="primary" size="sm" onClick={handleUpdatePhoneNumberClick}> Save </Button>
                        <Button variant="secondary" size="sm" onClick={() => setEditPhoneNumberMode(false)}> Cancel </Button>
                      </span>
                    ) : (
                      <span>
                        {user.phoneNumber}{" "}
                        <Button variant="link" onClick={() => setEditPhoneNumberMode(true)}> Edit </Button>
                      </span>
                    )}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="bookings">
            <h3>Your Bookings:</h3>
            {bookings.length > 0 ? (
              <Table className="bookings-table" bordered hover>
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking._id}>
                      <td>{booking.service ? booking.service.name : "unknown"}</td>
                      <td>{booking.bookingDate}</td>
                      <td>{booking.bookingTime}</td>
                      <td>
                        <Button variant="danger" size="sm" onClick={()=> handleDeleteBooking(booking._id)}>Cancel booking</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>You have no bookings.</p>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default User;