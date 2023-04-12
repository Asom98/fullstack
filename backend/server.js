const express = require("express")
const app = express()
const mongoose = require("mongoose")
const userModel = require('./models/users')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cors = require("cors")
require("dotenv").config()

app.use(
    express.json(), 
    cors({ origin: "http://localhost:5173", })
);

mongoose.connect(process.env.CONNECTION_URL).then(console.log("Connected to Database"));

app.listen(process.env.PORT, 
    console.log("Now listening on ", process.env.PORT)
)

app.get("/", authenticateUser, checkRole(['admin','user']), async (req, res) => {
    await userModel.findOne({username: req.user.username})
    .then(response => {
    res.json(response)
    })
})
