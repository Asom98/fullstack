import React, { useState } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import "./css/ContactUs.css"

const email = 'info@example.com';
const phone = '+46123456789';
const address = 'Elmetorpsvägen 15, 291 39 Kristianstad';

const ContactUs = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDdMicN27h-9XOirc_-Wlm3qZm7kOuN53E",
  });

  const lat = 56.04860901159218
  const lng = 14.145359203258858

  const handleAddressClick = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(url, '_blank');
  }

  if (!isLoaded) return "Loading maps";

  return (
    <section id="contact-us">
      <h2>Contact information</h2>
      <div className="contact-info">
        <p>Email: <a href={`mailto:${email}`}>{email}</a></p>
        <p>Phone: <a href={`tel:${phone}`}>{phone}</a></p>
        <address onClick={handleAddressClick} className="address-link">Address: {address}</address>
      </div>
      <div className="map-container">
        <GoogleMap zoom={15} center={{ lat, lng }} mapContainerClassName="map-box_img">
          <MarkerF position={{ lat, lng }} />
        </GoogleMap> 
      </div>
    </section>
  );
}

export default ContactUs;