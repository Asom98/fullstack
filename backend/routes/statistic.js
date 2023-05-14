const express = require("express")
const router = express.Router()

const userModel = require("../models/user");
const bookingModel = require("../models/booking");

router.get("/getUsersCount", async(req, res)=>{
    await userModel.count().then(result =>{
        res.json(result)
    })
})

router.get("/getBookingsCount", async(req, res)=>{
    await bookingModel.count().then(result =>{
        res.json(result)
    })
})

router.get("/getMostLoyal", async (req, res)=>{
    try {
        const users = await userModel.find().sort('-bookingAmount')
        const topUsers = users.filter(user => user.bookingAmount === users[0].bookingAmount)
        res.json(topUsers)
      } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Server error' })
      }
})

router.put("/updateUserCoupon", async(req, res)=>{
    const id = req.body.id
    const data = req.body
    try{
        const user = await userModel.findByIdAndUpdate(id, data).then(res.sendStatus(200))
    }catch(e){
        res.sendStatus(404)
    }
    
})

router.put("/updateUserBooking", async(req, res)=>{ ///testing purpose
    const id = req.body.id
    const data = req.body
    try{
        const user = await userModel.findByIdAndUpdate(id, data).then(res.sendStatus(200))
    }catch(e){
        res.sendStatus(404)
    }
    
})


module.exports = router