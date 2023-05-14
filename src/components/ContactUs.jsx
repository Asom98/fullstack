import React, { useState } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import "./css/ContactUs.css"

const email = 'fullstackg10@gmail.com';
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
      <div className='contact-info'>
        <h2 className='main-text'>Contact information</h2>
        <div className="contact-detail">
          <p className='email'>Email:</p>
          <a className='email-link' href={`mailto:${email}`}>{email}</a>
          <p className='phone'>Phone:</p>
          <a className='phone-link' href={`tel:${phone}`}>{phone}</a>
          <p className='phone'>Adress:</p>
          <address onClick={handleAddressClick} className="address-link">{address}</address>
        </div>
        <div className="map-container">
          <GoogleMap zoom={15} center={{ lat, lng }} mapContainerClassName="map-box_img">
            <MarkerF position={{ lat, lng }} />
          </GoogleMap> 
        </div>
      </div>
      
    </section>
  );
}

export default ContactUs;