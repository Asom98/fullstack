const express = require('express');
const router = express.Router();
const mongoose = require("mongoose")


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

router.get("/getBookings/:service_id", async (req,res) =>{
  const service_id = new mongoose.Types.ObjectId(req.params.service_id);  // convert to ObjectId
  try {
      const bookings = await bookingModel.find({service_id: service_id});
      res.json(bookings);
  } catch (error) {
    res.status(400).send({message: error});
  }
});

router.delete("/deleteBooking", async (req ,res) => {
  try {
    await bookingModel.findByIdAndDelete(req.body._id)
    .then(res.sendStatus(200)
    )
  } catch (err) {
    console.log(error);
    res.sendStatus(500).send("Internal Server Error");
  }
})

router.put("/updateBooking", async(req, res)=>{
  const id = req.body.id
  const data = req.body
  try{
      await userModel.findByIdAndUpdate(id, data).then(res.sendStatus(200))
  }catch(e){
      res.sendStatus(404)
  }
})


router.post("/postBooking", async (req,res) =>{
  try {
    const bookings = await bookingModel.find().sort({ count: -1 }).limit(1);
    let bookingCount = 0;
    if (bookings.length > 0) {
      bookingCount = bookings[0].count;
    }
    // increment booking count by 1
    bookingCount += 1;
  
    const newBooking = new bookingModel({
      service_id: req.body.service_id,
      employee_id: req.body.employee_id,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      user_id: req.body.user_id,
      contact_email: req.body.contact_email,
      status: true,
      count: bookingCount,
    });
    await newBooking.save();
  
  } catch (error) {
    // handle error
  }
})
  
router.get("/getAvailableTimeSlots/:service_id/:date", async (req, res) => {
  try {
    const service = await serviceModel.findOne({ _id: req.params.service_id });
    if (service == null) {
      return res.status(404).send("Not Found");
    }
  
    const date = new Date(req.params.date);
  
    const totalTime = service.business_hours.close - service.business_hours.open;
    const preparationTime = 15;
    const totalTimeInMinutes = totalTime / 60000;
    const totalSlots = Math.ceil(
      totalTimeInMinutes / (service.duration + preparationTime)
    );
  
    const timeSlots = [];
    for (let i = 0; i < totalSlots; i++) {
      const start = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        service.business_hours.open.getHours(),
        service.business_hours.open.getMinutes() +
          i * (service.duration + preparationTime)
      );
      const end = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        service.business_hours.open.getHours(),
        service.business_hours.open.getMinutes() +
          i * (service.duration + preparationTime) +
          service.duration
      );
  
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
});

router.get("/getAmount/:service_id", async (req, res) => {
  // get the amount of bookings for the choosen service

  const bookings = await bookingModel.find({service_id: req.params.service_id}).sort({count: -1}).limit(1) // sets it into descending order and with a limit of 1
  
  let bookingCount = 0;
  if (bookings.length > 0) {
    bookingCount = bookings[0].count;
  }
  // increment booking count by 1
  res.json(bookingCount)
})

router.get("/getAmount", async (req, res) => {
  // get the booking amount for all services
  
  const bookings = await bookingModel.find().sort({count: -1}).limit(1) // sets it into descending order and with a limit of 1
  
  let bookingCount = 0;
  if (bookings.length > 0) {
    bookingCount = bookings[0].count;
  }
  // increment booking count by 1
  res.json(bookingCount)
})

module.exports = router