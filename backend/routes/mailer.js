const express = require("express")
const router = express.Router()
const nodemailer = require("nodemailer");

const bookingModel = require("../models/booking")
const userModel = require("../models/user");
const serviceModel = require("../models/service")
const employeeModel = require("../models/employee")

router.post("/confirmBooking", async(req, res)=>{
    bookingId = req.body.bookingId
    let config = {
        service: "gmail",
        auth:{
            user: process.env.EMAIL,
            pass: process.env.EPASS
        }
    }
    
    let transporter = nodemailer.createTransport(config)
    const currBooking = await bookingModel.findById(bookingId)
    const currUser = await userModel.findById(currBooking.user_id)
    const currService = await serviceModel.findById(currBooking.service_id)
    const currEmployee = await employeeModel.findById(currBooking.employee_id)
    

    let message  = {
        from: process.env.EMAIL,
        to: `${currBooking.contact_email}`,
        subject: "Booking confirmation!",
        text: `Hello ${currUser.username} here comes your booking confirmation.
        
        Date: ${currBooking.startTime}.
        Service: ${currService.name}.
        Service provider: ${currEmployee.name}.

        `
    }

})

function mailerTest(){

   
    
    

    try{
        transporter.sendMail(message)
        console.log("Mail sent!!")
    }catch(e){
        console.log(e)
    }

}

module.exports = router

//module.exports = mailerTest
