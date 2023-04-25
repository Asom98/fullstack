const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
    }
})

module.exports = mongoose.model('users', userSchema)