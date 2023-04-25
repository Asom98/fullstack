const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
    email: {
        type: String,
    },
    name: {
        type: String,
    },
    phone: {
        type: String,
    },
})

module.exports = mongoose.model('Employee', employeeSchema)