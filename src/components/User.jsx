import React, {useState,useEffect} from "react";
import { Button,Card } from "react-bootstrap";
import { useNavigate } from "react-router";
import "./css/User.css"

function User() {
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const [editEmailMode, setEditEmailMode] = useState(false);
  const [editPhoneNumberMode, setEditPhoneNumberMode] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [userInfo, setUserInfo] = useState({})
 
  const handleUpdateEmailClick = async () => {
    const response = await fetch("http://localhost:3000/admin/updateUser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user._id,
        email: userInfo.email,
      }),
    });

    if (response.ok) {
      setEditEmailMode(false);
    }
  };

  const handleUpdatePhoneNumberClick = async () => {
    const response = await fetch("http://localhost:3000/admin/updateUser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userInfo._id,
        phoneNumber: userInfo.phoneNumber,
      }),
    });

    if (response.ok) {
      setEditPhoneNumberMode(false);
    }
  };

  const handleUserBookings = async (token) => {

    const response = await fetch(`http://localhost:3000/bookings/getBookingsByUserId`, {
      method: "GET",
      headers: {
        "authorization": `Bearer ${token}`,
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

  const fetchUserData = async (token) => {
    const response = await fetch(`http://localhost:3000/users/getUserData`, {
      method: "GET",
      headers: {
        "authorization": `Bearer ${token}`
      }
    });
    
    if (response.ok) {
      const result = await response.json()
      setUserInfo(result)
      return
    }

    if (response.status === 403) {
      navigate("/login")
    }
  };
  
  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token == null) {
      navigate("/login")
    };

    handleUserBookings(token);
    fetchUserData(token);
  }, []);


  return (
    <div className="container">
      <h1 className="welcome-text">Welcome, {userInfo.username}!</h1>
      <Card>
        <Card.Body>

          <Card.Subtitle className="mb-2 text-muted text-center">
            Email:{" "} {editEmailMode ? (
            <span>
              <input type="email" value={userInfo.email} onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} />
              <Button variant="primary" size="sm" onClick={handleUpdateEmailClick}>Save</Button>
              <Button variant="secondary" size="sm" onClick={() => setEditEmailMode(false)}> Cancel </Button>
            </span>

            ) : (

              <span>
                {userInfo.email}{" "}
                <Button variant="link" onClick={() => setEditEmailMode(true)}> Edit </Button>
              </span>
            )}

            Phone Number:{" "}
            {editPhoneNumberMode ? (
              <span>
                <input type="text" value={userInfo.phoneNumber} onChange={(e) => setUserInfo({ ...userInfo, phoneNumber: e.target.value })}/>
                <Button variant="primary" size="sm" onClick={handleUpdatePhoneNumberClick}>Save</Button>
                <Button variant="secondary" size="sm" onClick={() => setEditPhoneNumberMode(false)}>Cancel</Button>
              </span>

            ) : (

              <span>
                {userInfo.phoneNumber}{" "}
                <Button variant="link" onClick={() => setEditPhoneNumberMode(true)}>Edit</Button>
              </span>
            )}
          </Card.Subtitle>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>My Bookings</Card.Title>
          {bookings.length > 0 ? (
          <ul>{bookings.map((booking) => (
            <li key={booking._id}>
            Service: {booking.service ? booking.service.name : "unknown"} <br />
            Date: {booking.bookingDate} <br />
            Time: {booking.bookingTime} <br />
          </li>))}
          </ul>
          ) : (
          <p>You have no bookings yet.</p>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default User;