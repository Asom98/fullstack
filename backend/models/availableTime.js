const mongoose = require("mongoose")

const availableTimeSchema = mongoose.Schema({
    serviceId: {
        type: String,
    },
    startTime: {
        type: Date,
    },
    endTime: {
        type: Date,
    },
})

module.exports = mongoose.model('Available_Time', availableTimeSchema)