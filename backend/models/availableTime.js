const mongoose = require("mongoose")

const availableTimeSchema = mongoose.Schema({
    service_id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    startTime: {
        type: Date,
    },
    endTime: {
        type: Date,
    },
})

module.exports = mongoose.model('Available_Time', availableTimeSchema)