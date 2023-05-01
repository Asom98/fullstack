const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
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
    }
})

module.exports = mongoose.model('Admin', adminSchema)