const express = require('express');
const router = express.Router();

const availableTimeModel = require("../models/availableTime");
const bookingModel = require("../models/booking");

router.get("/getBookings", async (req,res) =>{
    try {
        const bookings = await bookingModel.find()
        res.json(bookings)
    } catch (error) {
      res.status(400).send({message: error})
    }
})
  
router.post("/postBooking", (req,res) =>{
    try {
      const newBooking = new bookingModel({
        service_id: req.body.service_id, 
        employee_id: req.body.employee_id, 
        startTime: req.body.startTime, 
        endTime: req.body.endTime, 
        user_id: req.body.user_id, 
        contact_email: req.body.contact_email, 
        status: true})    
      newBooking.save()
      .then(result => {
        res.json("Succesufully added booking").sendStatus(201)
      })
    } catch (error ) {
      res.status(400).send({message: error})
    }
})
  
router.get("/getAvailableTimes", async (req,res) =>{
    try {
      const bookings = await bookingModel.find()
      const availableTimes = await availableTimeModel.find()
      const misMatcheTimes = availableTimes.filter((times) => // returns where bookings and available times dont match
        !bookings.some(
          (availableTime) => availableTime.startTime.getTime() === times.startTime.getTime())
      );
      misMatcheTimes.sort((a,b) => a.startTime.getTime() - b.startTime.getTime());
      res.json(misMatcheTimes).sendStatus(200)
    } catch (error) {
      res.status(400)
    }
})
  
router.post("/postAvailableTime", (req,res) => {
    try {
      const newTime = new availableTimeModel({    
        service_id: req.body.service_id,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
      })    
      newTime.save()
      .then(result => {
        res.sendStatus(201)
      })
    } catch (error ) {
      res.status(400).send({message: error})
    }
})


module.exports = router