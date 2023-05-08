import { useEffect, useRef, useState } from 'react';

function ContactUs() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const mapContainer = useRef(null);


  return (
    <section id="contact-us">
      <h1>Contact Us</h1>
      <div className="contact-info">
        <p>Email: <a href={`mailto:${email}`}>{email}</a></p>
        <p>Phone: <a href={`tel:${phone}`}>{phone}</a></p>
        <address>{address}</address>
      </div>
      <div className="map-container" ref={mapContainer}></div>
    </section>
  );
}

export default ContactUs;