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

app.get("/", authenticateUser, checkRole(['user']), async (req, res) => {
    await userModel.findOne({username: req.user.username})
    .then(response => {
    res.json(response)
    })
})

app.post('/register', async (req,res) => { 
    try {
        await bcrypt.hash(req.body.password, 10) 
        .then(hashedPassword => {
            const newUser = new userModel({username: req.body.name, password: hashedPassword, role: req.body.role})
            newUser.save()
            .then(console.log("saved succefully ", newUser))
        })
    } catch(error) {
        console.log(error);
    }
})

app.post("/login", async (req, res) => {
    const user = await userModel.findOne({username: req.body.username})
    if (user != null) {
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if(isMatch){
            const accessToken = jwt.sign({username: user.username, role: user.role}, process.env.ACCESS_TOKEN)
            res.json([{accessToken: accessToken}, user])
        } else {
            res.sendStatus(403)
        }
    } else {
        res.sendStatus(404)
    }
})

function checkRole(role) {
    return function(req, res, next) {
      const userRole = req.user.role
      console.log("user:", userRole, "level required:", role);
      if (!role.includes(userRole)) {
        return res.status(403).json({message: 'Forbidden you dont have access to that resource'})
      } 
      next()
    }
}

function authenticateUser(req, res, next) {
    const authHeader = req.headers.authorization
    const token = authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(403)
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}
