const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { confirmBooking, isEmailValid } = require("./mail.js");
const serviceModel = require("../models/service");
const bookingModel = require("../models/booking");
const userModel = require("../models/user");

const authentication = require("../middleware/auth");

router.get("/getBookings", async (req, res) => {
  try {
    const bookings = await bookingModel.find();
    res.json(bookings);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

router.get(
  "/getBookings/:service_id",
  authentication.authenticateUser,
  async (req, res) => {
    const service_id = new mongoose.Types.ObjectId(req.params.service_id); // convert to ObjectId
    try {
      const bookings = await bookingModel.find({ service_id: service_id });
      res.json(bookings);
    } catch (error) {
      res.status(400).send({ message: error });
    }
  }
);

// get bookings by user_id

router.get(
  "/getBookingsByUserId",
  authentication.authenticateUser,
  async (req, res) => {
    const user_id = new mongoose.Types.ObjectId(req.user._id);
    try {
      const bookings = await bookingModel.find({ user_id: user_id });
      res.json(bookings);
    } catch (error) {}
  }
);
// delete booking but check time and return

router.delete(
  "/deleteBooking",
  authentication.authenticateUser,
  async (req, res) => {
    try {
      if (req.user.role == "admin") {
        await bookingModel.findByIdAndDelete(req.body._id);
        return res.sendStatus(200);
      } else {
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() + 24);

        const booking = await bookingModel.findById(req.body._id);

        if (booking.startTime < twentyFourHoursAgo) {
          return res.sendStatus(400);
        } else {
          await bookingModel.findByIdAndDelete(req.body._id);
          return res.sendStatus(200);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
);

router.put("/updateBooking", async (req, res) => {
  const id = req.body.id;
  const data = req.body;
  try {
    await userModel.findByIdAndUpdate(id, data).then(res.sendStatus(200));
  } catch (e) {
    res.sendStatus(404);
  }
});

router.post("/postBooking", authentication.authenticateUser, async (req, res) => {
    if (req.user.role == "admin") {
      return res.sendStatus(403)
    }
    try {
      bookingModel.findOne({
          service_id: req.body.service_id,
          employee_id: req.body.employee_id,
          startTime: req.body.startTime,
        })
      .then(async (response) => {
          if (response == null) {
            const newBooking = new bookingModel({
              service_id: req.body.service_id,
              employee_id: req.body.employee_id,
              startTime: req.body.startTime,
              endTime: req.body.endTime,
              user_id: req.user._id,
              status: true,
            });
            const booked = await newBooking.save();
            res.sendStatus(200);
            const currBooking = await bookingModel.findById(booked._id);
            const currUser = await userModel.findById(currBooking.user_id);
            const currService = await serviceModel.findById(
              currBooking.service_id
            );

            const amountToPay = parseInt(currService.price);
            currUser.bookingAmount += 1;
            const couponWorthy = checkCoupon(currUser.amountSpent)
            if (couponWorthy) {
              currUser.amountSpent -= 500
              currUser.couponAmount += 1
            }
            if (req.body.useCoupon && currUser.couponAmount <= 0) {
              res.sendStatus(403)
            } else if (req.body.useCoupon && currUser.couponAmount > 0) {
              currUser.couponAmount -= 1
              currUser.amountSpent += amountToPay - 15;
            } else {
              currUser.amountSpent += amountToPay;
            }
            
            await currUser.save();

            const valid = await isEmailValid(currUser.email);
            if (booked && valid) {
              confirmBooking(booked._id);
            } else {
              await booked.findByIdAndDelete(booked._id);
              res.sendStatus(400);
            }
          } else {
            res.sendStatus(400);
          }
        });
      const booked = await newBooking.save();
      res.sendStatus(200);
      const currBooking = await bookingModel.findById(booked._id);
      const currUser = await userModel.findById(currBooking.user_id);
      const currService = await serviceModel.findById(currBooking.service_id);

      const amountToPay = parseInt(currService.price);
      currUser.amountSpent += amountToPay;
      currUser.bookingAmount += 1;
      const couponWorthy = await checkCoupon(currUser.amountSpent);
      if (couponWorthy) {
        currUser.amountSpent -= 500;
        currUser.couponAmount += 1;
      }
      await currUser.save();

      const valid = await isEmailValid(currUser.email);
      if (booked && valid) {
        confirmBooking(booked._id);
      } else {
        await booked.findByIdAndDelete(booked._id);
        res.sendStatus(400);
      }
    } catch (error) {
      // handle error
    }
  }
);

router.get(
  "/getAvailableTimeSlots/:service_id/:date",
  authentication.authenticateUser,
  async (req, res) => {
    try {
      const service = await serviceModel.findOne({
        _id: req.params.service_id,
      });
      if (service == null) {
        return res.status(404).send("Not Found");
      }

      const date = new Date(req.params.date);
      const currentDate = new Date();

      if (date < currentDate) {
        return res
          .status(400)
          .send("Requested date is before the current date");
      }

      const totalTime =
        service.business_hours.close - service.business_hours.open;

      const preparationTime = 15;
      const totalTimeInMinutes = totalTime / 60000;
      const totalSlots = Math.round(
        totalTimeInMinutes / (service.duration + preparationTime)
      );
      const timeSlots = [];
      for (let i = 0; i < totalSlots; i++) {
        const start = new Date(
          Date.UTC(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            service.business_hours.open.getUTCHours(),
            service.business_hours.open.getUTCMinutes() +
              i * (service.duration + preparationTime)
          )
        );

        const end = new Date(
          Date.UTC(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            service.business_hours.open.getUTCHours(),
            service.business_hours.open.getUTCMinutes() +
              i * (service.duration + preparationTime) +
              service.duration
          )
        );

        const bookings = await bookingModel.find({
          startTime: { $lte: end }, // lesser than
          endTime: { $gte: start }, // greater than
          service_id: service._id,
        });
        const isAvailable = bookings.length === 0;

        timeSlots.push({ start, end, isAvailable });
      }

      res.json({ timeSlots, service });
    } catch (error) {
      console.log(error);
      res.sendStatus(500).send("Internal Server Error");
    }
  }
);

router.get("/getAmount/:service_id", async (req, res) => {
  // get the amount of bookings for the choosen service

  const bookings = await bookingModel
    .find({ service_id: req.params.service_id })
    .sort({ count: -1 })
    .limit(1); // sets it into descending order and with a limit of 1

  let bookingCount = 0;
  if (bookings.length > 0) {
    bookingCount = bookings[0].count;
  }
  // increment booking count by 1
  res.json(bookingCount);
});

router.get("/getAmount", async (req, res) => {
  // get the booking amount for all services

  const bookings = await bookingModel.find().sort({ count: -1 }).limit(1); // sets it into descending order and with a limit of 1

  let bookingCount = 0;
  if (bookings.length > 0) {
    bookingCount = bookings[0].count;
  }
  // increment booking count by 1
  res.json(bookingCount);
});
module.exports = router;

function checkCoupon(couponAmount) {
  if (couponAmount >= 500) {
    couponAmount -= 500;
    return true;
  }
  return false;
}
