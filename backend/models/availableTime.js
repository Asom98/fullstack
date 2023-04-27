const mongoose = require("mongoose")

const availableTimeSchema = mongoose.Schema({
    service_id: {
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