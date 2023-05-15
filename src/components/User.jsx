import React, {useState,useEffect} from "react";
import { Button,Card, Table, Modal } from "react-bootstrap";
import { useNavigate } from "react-router";
import "./css/User.css"
import { ConfirmationModal } from "./parts/ConfirmationModal";
import ChangePassword from "./parts/ChangePassword";

function User() {

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editEmailMode, setEditEmailMode] = useState(false);
  const [editPhoneNumberMode, setEditPhoneNumberMode] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [userInfo, setUserInfo] = useState({})
  const [Sentence, setSentence] = useState("");
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [coupon, setCoupon] = useState("");
 
  const handleUpdateEmailClick = async () => {
    const response = await fetch("https://backend-saloon.onrender.com/admin/updateUser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userInfo._id,
        email: userInfo.email,
      }),
    });
    if (response.ok) {
      setEditEmailMode(false);
    }
  };

  const handleUpdatePhoneNumberClick = async () => {
    const response = await fetch("https://backend-saloon.onrender.com/admin/updateUser", {
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

  const handleUserBookings = async () => {

    const response = await fetch(`https://backend-saloon.onrender.com/bookings/getBookingsByUserId`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    });
  
    if (response.ok) {
      const data = await response.json();
      const bookingsWithService = await Promise.all(
        data.map(async (booking) => {
          const serviceResponse = await fetch(`https://backend-saloon.onrender.com/services/getServiceById/${booking.service_id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (serviceResponse.ok) {
            const serviceData = await serviceResponse.json();
            const startTime = new Date(booking.startTime);
            const bookingDate = startTime.toLocaleDateString();
            const bookingTime = startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', timeZone: 'UTC'});
            const price = serviceData.price;
            return { ...booking, service: serviceData, bookingDate, bookingTime, price,};
          } else {
            return { ...booking, service: null };
          }
        })
      );
      setBookings(bookingsWithService);
      setIsLoading(false)
    }
  };
  const fetchUserData = async () => {
    const response = await fetch(`https://backend-saloon.onrender.com/users/getUserData`, {
      method: "GET",
      headers: {
      },
      credentials: "include"
    });
    
    if (response.ok) {
      const result = await response.json()
      setUserInfo(result)
      return
    }

    if (response.status === 403) {
      navigate("/")
    }
  };
  
  useEffect(() => {
    handleUserBookings();
    fetchUserData();
  }, []);

  const handleDeleteBooking = async (_id) => {
    setBookingToDelete(_id);
    setShowConfirmationModal(true);
  };

  const handleConfirmDeleteBooking = async () => {
    if (bookingToDelete) {
      const packet = { _id: bookingToDelete };
      const response = await fetch(`https://backend-saloon.onrender.com/bookings/deleteBooking`, {
        method: "DELETE",
        body: JSON.stringify(packet),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      });
      
      if (response.ok) {
        const updatedBookings = bookings.filter((booking) => booking._id !== bookingToDelete);
        await fetchUserData()
        setBookings(updatedBookings);
      } else {
        setSentence("I'm sorry, you are unable to delete bookings within 24 hours of the scheduled time. Please contact us directly to make any necessary changes. Thank you for your understanding.");
        setShowModal(true);
      }
    }
    setShowConfirmationModal(false);
  };

  const handleCancelDeleteBooking = () => {
    setBookingToDelete(null);
    setShowConfirmationModal(false);
  };

return (
    <div className="container-fluid">
      <Card>
        <Card.Body>
          <div className="welcome-text">
            <h1>Welcome, {userInfo.username}!</h1>
          </div>
          <div className="user-details">
            <Table>
              <tbody>
                <tr>
                  <td>Email:</td>
                  <td>
                    {editEmailMode ? (
                      <span>
                        <input className="email-input" type="email" value={userInfo.email} onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} />
                        <Button variant="primary" size="sm" onClick={handleUpdateEmailClick}> Save </Button>
                        <Button variant="secondary" size="sm" onClick={() => setEditEmailMode(false)}> Cancel </Button>
                      </span>
                    ) : (
                      <span>
                        {userInfo.email}{" "}
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
                        <input className="phoneNumber-input" type="email" value={userInfo.phoneNumber} onChange={(e) => setUserInfo({ ...userInfo, phoneNumber: e.target.value })} />
                        <Button variant="primary" size="sm" onClick={handleUpdatePhoneNumberClick}> Save </Button>
                        <Button variant="secondary" size="sm" onClick={() => setEditPhoneNumberMode(false)}> Cancel </Button>
                      </span>
                    ) : (
                      <span>
                        {userInfo.phoneNumber}{" "}
                        <Button variant="link" onClick={() => setEditPhoneNumberMode(true)}> Edit </Button>
                      </span>
                    )}
                  </td>
                </tr>
              </tbody>
            </Table>
            <Button variant="link" onClick={() => setShowPasswordModal(true)}>Change Password</Button>
            <ChangePassword show={showPasswordModal} onClose={() => setShowPasswordModal(false)} />
          </div>
          <div className="bookings">
            <h3>Your Bookings:</h3>
            {isLoading ? <div className="spinner-border"></div> : bookings.length > 0 ? (
              <Table className="bookings-table" bordered hover>
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Price</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking._id}>
                      <td>{booking.service ? booking.service.name : "unknown"}</td>
                      <td>{booking.bookingDate}</td>
                      <td>{booking.bookingTime}</td>
                      {booking.useCoupon ? <td>${booking.price - 15}</td> : <td>${booking.price}</td>}
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
            <Modal className="cancelBooking-modal" show={showConfirmationModal} onHide={handleCancelDeleteBooking}>
              <Modal.Header closeButton>
                <Modal.Title>Confirm Delete Booking</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to cancel this booking?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCancelDeleteBooking}>No</Button>
                <Button variant="danger" onClick={handleConfirmDeleteBooking}>Yes</Button>
              </Modal.Footer>
            </Modal>
            {showModal && (
            <ConfirmationModal className="confirmationModal" sentance={Sentence} onClose={() => setShowModal(false)}/>
            )}
            <div className="card coupon-card">
              <div className="display-coupons">
                <h3>Coupons:</h3>
                <p>If you spend $500, you'll receive a coupon for $15 off your next visit! 
                <br/> To redeem this offer,simply show the coupon to our receptionist during your next appointment
                <br/> or use it with the next online booking.
                <br/> The coupon can only be used once.</p>

                <h4>You have spent: $<span id="amount-spent">{userInfo.amountSpent}</span></h4>
                <h6>Spend ${500-userInfo.amountSpent} more to recieve the next coupon.</h6>
                <h4 className="coupon">You have: <span id="coupon-amount">{userInfo.couponAmount}</span> coupon to use</h4>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default User;