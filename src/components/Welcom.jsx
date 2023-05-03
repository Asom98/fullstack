import React from 'react'
import "./css/Welcome.css";
import CarouselComp from './Carousel';

export const Welcom = () => {
  return (
    <div className="main-page">
      <div className="frame">
        <p className="welcome-text">Welcome to our beauty salon!</p>
        <p>
        We offer a wide range of services that cater to all genders and identities! Whether you're looking for a fresh new haircut, a relaxing massage, or a rejuvenating facial, our skilled professionals are here to make you look and feel your best. We use only the highest quality products and the latest techniques to achieve stunning results that will leave you feeling pampered and refreshed. So why wait? Contact us today for a personal consultation and let us help you unleash your inner beauty!
        </p>
      </div>
      <div className='carousel'>
        <CarouselComp />
      </div>
    </div>
  )
}
