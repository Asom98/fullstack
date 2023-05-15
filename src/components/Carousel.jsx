import Carousel from 'react-bootstrap/Carousel';
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function CarouselComp() {
  return (
    <Carousel slide interval={2000}>
      <Carousel.Item>
        <div className="carousel-image pic1" />
        <div className="carousel-text">
            <h2>Introducing our New Beard Grooming Service!</h2>
            <p>Attention all bearded gentlemen! We are thrilled to announce that we now offer a comprehensive beard grooming service, complete with specialized beard care treatments.</p>
            <p>Book your appointment today and let our team of skilled barbers take care of your beard grooming needs.</p>
            <Button as={Link} to="/services" className="register-button">Go to Services</Button>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-image pic2" />
        <div className="carousel-text">
            <h2>Summer Special Offer!</h2>
            <h3>10% off on all facials</h3>
            <p>Please note that the discount will be applied at our salon.</p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-image pic3">
          <div className="carousel-text">
            <h2>Join our membership program today and get exclusive access to discounts, rewards, and special offers!</h2>
            <p>As a member, you'll receive early access to our latest products and events, and after you've booked services worth $500 with us, you'll get a coupon worth $15 to use on any chosen service! Click the 'Register' button now to become a member and start enjoying the benefits of our program, including the ability to manage all your bookings in one place.</p>
            <Button as={Link} to="/registration" className="register-button">Register Now!</Button>
          </div>    
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-image pic4" />
        <div className="carousel-text">
            <h2>At our salon, we offer eyelash services with the best quality hair on the market.</h2>
            <h6>Our expert technicians are dedicated to providing you with the most luxurious and natural-looking lashes possible.</h6>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselComp;