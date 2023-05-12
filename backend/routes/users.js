const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const adminModel = require("../models/admin");
const authMiddleware = require("../middleware/auth");
const userModel = require("../models/user");

router.get("/getUserData", authMiddleware.authenticateUser, async (req, res) => {
  console.log(req.user._id);
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
              role: "user"})
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

router.post("/login", async (req, res) => {
  const user = await userModel.findOne({ username: req.body.username });
  const admin = await adminModel.findOne({ username: req.body.username });
  if(admin != null){
    const isMatch = await bcrypt.compare(req.body.password, admin.password)
    if(isMatch){
      const accessToken = jwt.sign(
        { _id: admin._id, 
          role: admin.role }, 
        process.env.ACCESS_TOKEN)
      res.cookie("accessToken", accessToken, { maxAge: 86400000 })
      res.json({accessToken: accessToken, user: admin})
    }
  } else if (user != null) {
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (isMatch) {
      // change to create token in controllers dir
      const accessToken = jwt.sign(
        { _id: user._id, 
          role: user.role },
        process.env.ACCESS_TOKEN
      ); // add { expiresIn: '10s' } to add expiration to the token
      res.cookie("accessToken", accessToken)
      res.json({accessToken: accessToken , user: user});
    }
  } else {
    res.sendStatus(404);
  }
}); 

module.exports = router