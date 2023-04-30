import Carousel from 'react-bootstrap/Carousel';
import './carousel.css';
import { Link } from "react-router-dom";
import { Navbar, Nav, Button, Modal } from "react-bootstrap";

function CarouselComp() {
  return (
    <Carousel fade interval={3000}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/src/components/Images/allef-vinicius-IvQeAVeJULw-unsplash.jpg"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/src/components/Images/raphael-lovaski-Pe9IXUuC6QU-unsplash.jpg"
        />
      </Carousel.Item>
      <Carousel.Item>
      <div className="carousel-item-with-text">
          <img
            className="d-block w-100 carousel-image"
            src="/src/components/Images/stefan-schauberger-Tper6bHeSUo-unsplash.jpg"
          />
          <div className="carousel-text">
            <h5>Join our membership program today and get exclusive access to discounts, rewards, and special offers!</h5>
            <p>As a member, you'll receive early access to our latest products and events, and after you've booked 10 services with us, you'll get one service for free! Click the 'Register' button now to become a member and start enjoying the benefits of our program, including the ability to manage all your bookings in one place.</p>
            <Button as={Link} to="/registration" className="register-button">Register Now!</Button>
          </div>    
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/src/components/Images/hayley-kim-design-sRSRuxkOuzI-unsplash.jpg"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/src/components/Images/diana-light-pBBxMUCgwuU-unsplash.jpg"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/src/components/Images/lina-verovaya-N4njM45mXFM-unsplash.jpg"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselComp;