const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    email: {
        type: String,
    },
    username: {
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