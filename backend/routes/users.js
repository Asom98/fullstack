const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const adminModel = require("../models/admin");
const authMiddleware = require("../middleware/auth");
const userModel = require("../models/user");


router.get("/getUserData", authMiddleware.authenticateUser, authMiddleware.checkRole(["admin", "user"]),
  async (req, res) => {
    await userModel.findOne({ username: req.user.username })
      .then((response) => {
        res.json(response).sendStatus(200);
      });
  }
);

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

router.post("/registerAdmin", async (req, res) => {
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
  if (user != null) {
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (isMatch) {
      // change to create token in controllers dir
      const accessToken = jwt.sign(
        { username: user.username, role: user.role },
        process.env.ACCESS_TOKEN
      ); // add { expiresIn: '10s' } to add expiration to the token
      res.json([{ accessToken: accessToken }, user]);
    } else if(admin != null){

      const isMatch = await bcrypt.compare(req.body.password, admin.password)
      if(isMatch){
        const accessToken = jwt.sign({
          username: admin.username, 
          role: admin.role}, 
          process.env.ACCESS_TOKEN)
        res.json([{accessToken: accessToken}, admin])
      }
    }
  } else {
    res.sendStatus(404);
  }
}); 

module.exports = router