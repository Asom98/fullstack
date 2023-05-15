const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const adminModel = require("../models/admin");
const authMiddleware = require("../middleware/auth");
const userModel = require("../models/user");
const bookingModel = require("../models/booking");
const serviceModel = require("../models/service");
const authentication = require("../middleware/auth")

router.get("/getUserData", authMiddleware.authenticateUser, async (req, res) => {
    const user = await userModel.findOne({_id: req.user._id})
    const admin = await adminModel.findOne({_id: req.user._id})

    if (user) {
      res.json(user)
    } else if (admin){
      res.json(admin)
    } else {
      res.sendStatus(404)
    }
});

// get user by id
router.get("/getUserData/:_id", async (req, res) => {
  try {
    const user = await userModel.findById(req.params._id)
    res.json(user)
  } catch (error) {
    res.status(404).send({ message: error })
  }
});

router.post("/register", async (req, res) => {
  try {
    const userExists = await userModel.findOne({ username: req.body.username });
    if (userExists) return res.status(400).send("User already exists");

        await bcrypt.hash(req.body.password, 10) 
        .then(hashedPassword => {
            const newUser = new userModel({
              email: req.body.email, 
              phoneNumber: req.body.phoneNumber, 
              username: req.body.username, 
              password: hashedPassword, 
              role: "user",
              couponAmount : 0,
              amountSpent: 0,
              bookingAmount: 0})
            newUser.save()
            .then(res.sendStatus(201))
        })
    } catch(error) {
        console.log(error);
    }
})

router.post("/registerAdmin", authMiddleware.authenticateUser, async (req, res) => {
  try {
    const adminExists = await adminModel.findOne({ username: req.body.username });
    if (adminExists) return res.status(400).send("Admin already exists");

        await bcrypt.hash(req.body.password, 10) 
        .then(hashedPassword => {
            const newAdmin = new adminModel({
              email: req.body.email, 
              phoneNumber: req.body.phoneNumber, 
              username: req.body.username, 
              password: hashedPassword, 
              role: "admin"})
            if(role != "admin"){
              res.send("forbidden!")
            }else{
              newAdmin.save()
              .then(res.sendStatus(201))
            }
        })
    } catch(error) {
        console.log(error);
    }
})

router.post("/newPassword", authMiddleware.authenticateUser, async (req, res) => {
  const user = await userModel.findById(req.user._id);

  let isMatch = await bcrypt.compare(req.body.currentPassword, user.password);
  if (isMatch) {
    user.password = await bcrypt.hash(req.body.password, 10);
    user.save();
    res.sendStatus(200);
  } else {
    res.status(400).send("Incorrect password");
  }
});

router.post("/login", async (req, res) => {
  let user = await userModel.findOne({ username: req.body.username });
  
  if (!user) {
    user = await adminModel.findOne({ username: req.body.username });
  }

  if(user){
    const isMatch = await bcrypt.compare(req.body.password, user.password)
    if(isMatch){
      const accessToken = jwt.sign(
        { _id: user._id, 
          role: user.role }, 
        process.env.ACCESS_TOKEN)
        res.cookie("accessToken", accessToken, { maxAge: 86400000, secure: true,httpOnly: true, sameSite: "None"})
      res.json({accessToken: accessToken, user: user})
    } else {
      res.status(401).json({ error: "Incorrect password" });
    }
  } else {
    res.sendStatus(404);
  }
}); 

router.post("/updateAmountSpent", [authentication.authenticateUser, authentication.checkRole("admin")], async (req, res) => {
  try {
    const booking = await bookingModel.findById(req.body._id);
    const service = await serviceModel.findById(booking.service_id);
    const user = await userModel.findById(booking.user_id);
    if (!booking.confirm) {
      console.log(booking.confirm);
      let amountSpent = user.amountSpent; 
      let servicePrice = service.price;
      if (booking.useCoupon) {
        amountSpent = amountSpent + Number(servicePrice) - 15; // Ensure numerical addition
      } else {
        amountSpent = amountSpent + Number(servicePrice); // Ensure numerical addition
      }
  
      user.amountSpent = amountSpent; 
      booking.confirm = true
      
      await user.save();
      await booking.save()
  
      res.sendStatus(200);
    } else {
      res.sendStatus(403)
    }

  } catch (error) {
    console.log(error);
  }
});



function checkCoupon(couponAmount) {
  if (couponAmount >= 500) {
    couponAmount -= 500;
    return true;
  }
  return false;
}

module.exports = router