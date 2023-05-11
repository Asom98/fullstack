const express = require("express")
const router = express.Router()

const userModel = require("../models/user");
const bookingModel = require("../models/booking");

router.get("/getUsersCount", async(req, res)=>{
    await userModel.count().then(result =>{
        console.log(result)
        res.json(result)
    })
})

router.get("/getBookingsCount", async(req, res)=>{
    await bookingModel.count().then(result =>{
        console.log(result)
        res.json(result)
    })
})


module.exports = router