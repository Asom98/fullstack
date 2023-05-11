const nodemailer = require("nodemailer");
const emailValidator = require('deep-email-validator');

const serviceModel = require("../models/service")
const bookingModel = require("../models/booking");
const employeeModel = require("../models/employee")
const userModel = require("../models/user");

async function confirmBooking(bookingId) {
    let config = {
        service: "stmp.gmail.com",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EPASS
        }
    }
    let transporter = nodemailer.createTransport(config)
    const currBooking = await bookingModel.findById(bookingId)
    const currUser = await userModel.findById(currBooking.user_id)
    const currService = await serviceModel.findById(currBooking.service_id)
    const currEmployee = await employeeModel.findById(currBooking.employee_id)
    
  
    let message = {
        from: process.env.EMAIL,
        to: `${currUser.email}`,
        subject: "Booking confirmation!",
        text: `Hello ${currUser.username} here comes your booking confirmation.
    
    Date: ${currBooking.startTime}.
    Service: ${currService.name}.
    Service provider: ${currEmployee.name}.
  
    Thank you for choosing us, see you at the appointment.
    Have a good day.
  
    `
    }
  
    transporter.sendMail(message)
}
  
async function isEmailValid(email) {
return emailValidator.validate(email)
}

module.exports = {confirmBooking, isEmailValid}