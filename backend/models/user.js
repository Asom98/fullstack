const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
    },
    couponAmount :{
        type: Number
    },
    amountSpent: {
        type: Number
    },
    bookingAmount: {
        type: Number
    }
})

module.exports = mongoose.model('User', userSchema)