const express = require('express');
const router = express.Router();

const serviceModel = require("../models/service")
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
        res.json("Succesufully added booking")
      })
    } catch (error ) {
      // res.status(400).send({message: error})
    }
})
  
router.get("/getAvailableTimeSlots/:service_id", async (req, res) => {
  try {
    const service = await serviceModel.findOne({ _id: req.params.service_id });
    if (service == null) {
      return res.status(404).send("Not Found");
    }
  
    const totalTime = service.business_hours.close - service.business_hours.open;
    const preparationTime = 15;
    const totalTimeInMinutes = totalTime / 60000;
    const totalSlots = Math.ceil(
      totalTimeInMinutes / (service.duration + preparationTime)
    );
  
    const timeSlots = [];
    for (let i = 0; i < totalSlots; i++) {
      const start = new Date(
        service.business_hours.open.getTime() +
          i * (service.duration + preparationTime) * 60000
      );
      const end = new Date(start.getTime() + service.duration * 60000);
  
      const bookings = await bookingModel.find({
        startTime: { $lte: end }, // lesser than 
        endTime: { $gte: start }, // greater than 
        service_id: service._id,
      });
      const isAvailable = bookings.length === 0;
  
      timeSlots.push({ start, end, isAvailable });
    }
  
    res.json({timeSlots, service});
  } catch (error) {
    console.log(error);
    res.sendStatus(500).send("Internal Server Error");
  }
})
module.exports = router