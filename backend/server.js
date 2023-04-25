const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cors = require("cors")
require("dotenv").config()

const adminModel = require('./models/admin')
const availableTimeModel= require('./models/availableTime')
const bookingModel = require('./models/booking')
const serviceModel = require('./models/service')
const employeeModel = require('./models/employee')
const authMiddleware = require("./middleware/auth")
const userModel = require('./models/user')

app.use(
    express.json(), 
    cors({ origin: "http://localhost:5173", })
);

mongoose.connect(process.env.CONNECTION_URL).then(console.log("Connected to Database"));

app.listen(process.env.PORT, 
    console.log("Now listening on ", process.env.PORT)
)

app.get("/", authMiddleware.authenticateUser, authMiddleware.checkRole(['admin','user']), async (req, res) => {
    await userModel.findOne({username: req.user.username})
    .then(response => {
    res.json(response)
    })
})

app.post('/register', async (req,res) => { 
    try {
        const userExists = await userModel.findOne({ username: req.body.name })
        if (userExists) return res.status(400).send('User already exists');

        await bcrypt.hash(req.body.password, 10) 
        .then(hashedPassword => {
            const newUser = new userModel({email: req.body.email, phone: req.body.phone, username: req.body.name, password: hashedPassword, role: "user"})
            newUser.save()
            .then(res.json(newUser))
        })
    } catch(error) {
        console.log(error);
    }
})

app.post("/login", async (req, res) => {
    const user = await userModel.findOne({username: req.body.username})
    if (user != null) {
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if(isMatch){ // change to create token in controllers dir 
            const accessToken = jwt.sign({username: user.username, role: user.role}, process.env.ACCESS_TOKEN) // add { expiresIn: '10s' } to add expiration to the token
            res.json([{accessToken: accessToken}, user])
        } else {
            res.sendStatus(403)
        }
    } else {
        res.sendStatus(404)
    }
})
