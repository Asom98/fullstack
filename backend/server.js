const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const adminModel = require("./models/admin");
const availableTimeModel = require("./models/availableTime");
const bookingModel = require("./models/booking");
const serviceModel = require("./models/service");
const employeeModel = require("./models/employee");
const authMiddleware = require("./middleware/auth");
const userModel = require("./models/user");

app.use(express.json(), cors({ origin: "http://localhost:5173" }));

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(console.log("Connected to Database"));

app.listen(
  process.env.PORT,
  console.log("Now listening on ", process.env.PORT)
);

app.get("/", (req,res) => {
  res.json("WELCOME TO THE SALOON")
})

app.get("/getUserData", authMiddleware.authenticateUser, authMiddleware.checkRole(["admin", "user"]),
  async (req, res) => {
    await userModel
      .findOne({ username: req.user.username })
      .then((response) => {
        res.json(response);
      });
  }
);

app.post("/register", async (req, res) => {
  try {
    const userExists = await userModel.findOne({ username: req.body.username });
    if (userExists) return res.status(400).send("User already exists");

        await bcrypt.hash(req.body.password, 10) 
        .then(hashedPassword => {
            const newUser = new userModel({email: req.body.email, phoneNumber: req.body.phoneNumber, username: req.body.username, password: hashedPassword, role: "user"})
            newUser.save()
            .then(res.sendStatus(201))
        })
    } catch(error) {
        console.log(error);
    }
})

app.post("/registerAdmin", async (req, res) => {
  try {
    const adminExists = await adminModel.findOne({ username: req.body.username });
    if (adminExists) return res.status(400).send("Admin already exists");

        await bcrypt.hash(req.body.password, 10) 
        .then(hashedPassword => {
            const newAdmin = new adminModel({email: req.body.email, username: req.body.username, password: hashedPassword, role: "admin"})
            newAdmin.save().then(res.sendStatus(201))
            
        })
    } catch(error) {
        console.log(error);
    }
})

app.post("/login", async (req, res) => {
  const user = await userModel.findOne({ username: req.body.username });
  const admin = await adminModel.findOne({ username: req.body.username });
  
  if (user != null) {
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (isMatch) {
      console.log(user.username, ": ", user.role)
      // change to create token in controllers dir
      const accessToken = jwt.sign(
        { username: user.username, role: user.role },
        process.env.ACCESS_TOKEN
      ); // add { expiresIn: '10s' } to add expiration to the token
      res.json([{ accessToken: accessToken }, user]);
    }
  }
  
  if(admin != null){
    console.log(admin.username, ": ", admin.role)
    const isMatch = await bcrypt.compare(req.body.password, admin.password)
    if(isMatch){
      const accessToken = jwt.sign({username: admin.username, role: admin.role}, process.env.ACCESS_TOKEN);
      res.json([{accessToken: accessToken}, admin]);
    }
  } else {
    res.sendStatus(404);
  }
});
